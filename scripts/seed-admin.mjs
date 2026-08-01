import bcrypt from "bcryptjs";
import { config as loadEnv } from "dotenv";
import { DataTypes, Sequelize } from "sequelize";

loadEnv({ path: ".env.local" });
loadEnv();

async function main() {
  const database = process.env.MYSQL_DATABASE;
  const username = process.env.MYSQL_USER;
  const password = process.env.MYSQL_PASSWORD;
  const host = process.env.MYSQL_HOST ?? "127.0.0.1";
  const port = Number(process.env.MYSQL_PORT ?? 3306);

  if (!database || !username) {
    throw new Error("Set MYSQL_DATABASE and MYSQL_USER.");
  }

  const sequelize = new Sequelize(database, username, password ?? "", {
    host,
    port,
    dialect: "mysql",
    logging: false,
  });

  const AdminUser = sequelize.define(
    "AdminUser",
    {
      name: DataTypes.STRING(120),
      email: DataTypes.STRING(255),
      passwordHash: DataTypes.STRING(255),
      role: DataTypes.ENUM("admin", "super_admin"),
      isActive: DataTypes.BOOLEAN,
    },
    { tableName: "admin_users" }
  );

  sequelize.define(
    "ContactSubmission",
    {
      source: DataTypes.ENUM(
        "contact-us",
        "engineering-consultation",
        "request-consultation"
      ),
      name: DataTypes.STRING(120),
      email: DataTypes.STRING(255),
      phone: DataTypes.STRING(40),
      company: DataTypes.STRING(160),
      subject: DataTypes.STRING(255),
      message: DataTypes.TEXT,
      metadata: DataTypes.JSON,
      status: DataTypes.ENUM("new", "read", "archived"),
    },
    { tableName: "contact_submissions" }
  );

  sequelize.define(
    "NewsletterSubscription",
    {
      email: DataTypes.STRING(255),
      status: DataTypes.ENUM("active", "unsubscribed"),
      source: DataTypes.STRING(80),
    },
    { tableName: "newsletter_subscriptions" }
  );

  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  console.log("Database tables synced.");

  const seedEmail = (process.env.ADMIN_SEED_EMAIL ?? "admin@mindmatrix.com")
    .toLowerCase()
    .trim();
  const seedPassword = process.env.ADMIN_SEED_PASSWORD ?? "ChangeMe123!";
  const seedName = process.env.ADMIN_SEED_NAME ?? "Super Admin";
  const passwordHash = await bcrypt.hash(seedPassword, 12);

  const existing = await AdminUser.findOne({ where: { email: seedEmail } });

  if (existing) {
    existing.passwordHash = passwordHash;
    existing.isActive = true;
    existing.name = seedName;
    existing.role = "super_admin";
    await existing.save();
    console.log(`Updated admin credentials for: ${seedEmail}`);
    console.log("Password now matches ADMIN_SEED_PASSWORD in your .env file.");
  } else {
    await AdminUser.create({
      name: seedName,
      email: seedEmail,
      passwordHash,
      role: "super_admin",
      isActive: true,
    });
    console.log(`Created super admin: ${seedEmail}`);
  }

  console.log("\nLogin at /admin/login with:");
  console.log(`  Email:    ${seedEmail}`);
  console.log("  Password: (value of ADMIN_SEED_PASSWORD in .env)");

  await sequelize.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
