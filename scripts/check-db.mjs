import { config as loadEnv } from "dotenv";
import { Sequelize } from "sequelize";

loadEnv({ path: ".env.local" });
loadEnv();

async function main() {
  const database = process.env.MYSQL_DATABASE;
  const username = process.env.MYSQL_USER;
  const password = process.env.MYSQL_PASSWORD;
  const host = process.env.MYSQL_HOST ?? "127.0.0.1";
  const port = Number(process.env.MYSQL_PORT ?? 3306);

  if (!database || !username) {
    console.error("❌ MySQL is not configured in .env / .env.local");
    console.error("   Required: MYSQL_DATABASE, MYSQL_USER");
    process.exit(1);
  }

  const sequelize = new Sequelize(database, username, password ?? "", {
    host,
    port,
    dialect: "mysql",
    logging: false,
  });

  console.log("Checking database connection...\n");

  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");
    console.log(`   Host:     ${host}`);
    console.log(`   Database: ${database}`);

    const [rows] = await sequelize.query("SHOW TABLES");
    const tables = rows.map((row) => Object.values(row)[0]);
    console.log(`   Tables:   ${tables.join(", ") || "(none)"}`);

    const expected = [
      "admin_users",
      "contact_submissions",
      "newsletter_subscriptions",
    ];
    const missing = expected.filter((t) => !tables.includes(t));

    if (missing.length === 0) {
      console.log("\n✅ All required tables exist.");
      console.log("   (Tables are auto-created on first API request if missing.)");
    } else {
      console.log(`\n⚠️  Missing tables: ${missing.join(", ")}`);
      console.log("   Start the app or submit a form — tables will be created automatically.");
    }

    if (tables.includes("admin_users")) {
      const [admins] = await sequelize.query(
        "SELECT email, role, isActive FROM admin_users"
      );
      console.log(`\n   Admin users: ${admins.length}`);
      for (const admin of admins) {
        console.log(`   - ${admin.email} (${admin.role}, active: ${admin.isActive})`);
      }
      if (admins.length === 0) {
        console.log("\n⚠️  No admin users yet. Run: npm run db:seed");
      }
    }
  } catch (error) {
    console.error("❌ Connection failed");
    console.error(`   ${error instanceof Error ? error.message : error}`);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

main();
