import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { Sequelize } from "sequelize";
import { createScriptSequelize, printConnectionHelp } from "./db-config.mjs";

const META_TABLE = "sequelize_meta";

async function ensureMetaTable(sequelize) {
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS \`${META_TABLE}\` (
      \`name\` VARCHAR(255) NOT NULL,
      PRIMARY KEY (\`name\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}

async function getAppliedMigrations(sequelize) {
  const [rows] = await sequelize.query(
    `SELECT name FROM \`${META_TABLE}\` ORDER BY name ASC`
  );
  return rows.map((row) => row.name);
}

function getMigrationFiles() {
  const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/lib/db/migrations");
  return fs.readdirSync(dir).filter((file) => file.endsWith(".mjs")).sort();
}

async function main() {
  const sequelize = createScriptSequelize();

  try {
    await sequelize.authenticate();
    console.log("[migrate] Connected to MySQL.");
  } catch (error) {
    printConnectionHelp(error);
    process.exit(1);
  }

  try {
    await ensureMetaTable(sequelize);
    console.log("[migrate] Migration tracking table ready.");

    const applied = new Set(await getAppliedMigrations(sequelize));
    const files = getMigrationFiles();
    const queryInterface = sequelize.getQueryInterface();
    let ran = 0;

    for (const file of files) {
      if (applied.has(file)) {
        console.log(`[migrate] Skip ${file} (already applied)`);
        continue;
      }

      const migrationPath = path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "../src/lib/db/migrations",
        file
      );
      const migration = await import(pathToFileURL(migrationPath).href);

      await sequelize.transaction(async (transaction) => {
        await migration.up(queryInterface, Sequelize);
        await sequelize.query(`INSERT INTO \`${META_TABLE}\` (name) VALUES (:name)`, {
          replacements: { name: file },
          transaction,
        });
      });

      console.log(`[migrate] Applied ${file}`);
      ran += 1;
    }

    if (ran === 0) {
      console.log("[migrate] No pending migrations.");
    } else {
      console.log(`[migrate] Done. Applied ${ran} migration(s).`);
    }
  } catch (error) {
    const code = error?.parent?.code ?? error?.original?.code ?? error?.code;
    if (code === "ER_CANT_CREATE_TABLE" || code === "ER_FK_INCOMPATIBLE_COLUMNS") {
      console.error("\n[migrate] Table creation failed due to foreign key constraints.");
      console.error("If this is a fresh database, run these commands in order:");
      console.error("  1. npm run db:seed");
      console.error("  2. npm run db:migrate");
      console.error("  3. npm run db:seed:cms\n");
    }
    printConnectionHelp(error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

main();
