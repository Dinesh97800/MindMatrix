import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { Sequelize, DataTypes } from "sequelize";
import mysql2 from "mysql2";

dotenv.config();

const META_TABLE = "sequelize_meta";

function createSequelize() {
  return new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD ?? "",
    {
      host: process.env.MYSQL_HOST ?? "127.0.0.1",
      port: Number(process.env.MYSQL_PORT ?? 3306),
      dialect: "mysql",
      dialectModule: mysql2,
      logging: console.log,
    }
  );
}

async function main() {
  const sequelize = createSequelize();
  await sequelize.authenticate();
  const [rows] = await sequelize.query(`SELECT name FROM ${META_TABLE} ORDER BY name ASC`);
  const applied = rows.map((row) => row.name);
  const last = applied.at(-1);

  if (!last) {
    console.log("[migrate] No migrations to rollback.");
    await sequelize.close();
    return;
  }

  const migrationPath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "../src/lib/db/migrations",
    last
  );
  const migration = await import(pathToFileURL(migrationPath).href);
  const queryInterface = sequelize.getQueryInterface();

  await sequelize.transaction(async (transaction) => {
    await migration.down(queryInterface);
    await sequelize.query(`DELETE FROM ${META_TABLE} WHERE name = :name`, {
      replacements: { name: last },
      transaction,
    });
  });

  console.log(`[migrate] Rolled back ${last}`);
  await sequelize.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
