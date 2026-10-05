import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

dotenv.config({ path: ".env.local" });
dotenv.config();

export function getDbConfig() {
  const database = process.env.MYSQL_DATABASE;
  const username = process.env.MYSQL_USER;
  const password = process.env.MYSQL_PASSWORD ?? "";
  const host = process.env.MYSQL_HOST ?? "127.0.0.1";
  const port = Number(process.env.MYSQL_PORT ?? 3306);

  if (!database || !username) {
    throw new Error(
      "MySQL is not configured. Set MYSQL_DATABASE and MYSQL_USER in .env"
    );
  }

  return { database, username, password, host, port };
}

export function createScriptSequelize(options = {}) {
  const { database, username, password, host, port } = getDbConfig();

  return new Sequelize(database, username, password, {
    host,
    port,
    dialect: "mysql",
    dialectModule: mysql2,
    logging: options.logging ?? console.log,
    pool: {
      max: 2,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      connectTimeout: 60000,
    },
  });
}

export function printConnectionHelp(error) {
  const { host, port, database, username } = getDbConfig();
  const code = error?.parent?.code ?? error?.code ?? "UNKNOWN";

  console.error("\n[migrate] Database connection failed.");
  console.error(`  Host:     ${host}:${port}`);
  console.error(`  Database: ${database}`);
  console.error(`  User:     ${username}`);
  console.error(`  Error:    ${code} — ${error.message}\n`);

  if (code === "ECONNREFUSED") {
    console.error("MySQL is not reachable at this host/port.");
    console.error("- Start local MySQL (Windows Services / XAMPP), OR");
    console.error("- Run migrations ON the Hostinger VPS where MySQL runs:");
    console.error("    cd /var/www/mindmatrix/frontend && npm run db:migrate");
    console.error("- Do not point MYSQL_HOST to 127.0.0.1 unless MySQL runs locally.\n");
  } else if (code === "ECONNRESET" || code === "PROTOCOL_CONNECTION_LOST") {
    console.error("MySQL closed the connection mid-query. Common causes:");
    console.error("- MySQL service crashed or restarted (check MySQL error log)");
    console.error("- Unstable remote DB connection — run migrations on the VPS instead");
    console.error("- Firewall/VPN dropped the connection\n");
  } else if (code === "ER_ACCESS_DENIED_ERROR") {
    console.error("Wrong username/password. Check MYSQL_USER and MYSQL_PASSWORD in .env");
    console.error('Quote passwords with special chars: MYSQL_PASSWORD="your#pass"\n');
  }
}
