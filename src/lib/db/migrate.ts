import fs from "node:fs";
import path from "node:path";
import { DataTypes, QueryInterface, Sequelize } from "sequelize";
import { getSequelize } from "./sequelize";

const META_TABLE = "sequelize_meta";

type MigrationModule = {
  up: (queryInterface: QueryInterface, SequelizeLib: typeof Sequelize) => Promise<void>;
  down: (queryInterface: QueryInterface) => Promise<void>;
};

async function ensureMetaTable(sequelize: Sequelize) {
  const queryInterface = sequelize.getQueryInterface();
  const tables = await queryInterface.showAllTables();
  const tableNames = tables.map((t) =>
    typeof t === "string" ? t : Object.values(t)[0]
  );

  if (!tableNames.includes(META_TABLE)) {
    await queryInterface.createTable(META_TABLE, {
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
      },
    });
  }
}

async function getAppliedMigrations(sequelize: Sequelize): Promise<string[]> {
  await ensureMetaTable(sequelize);
  const [rows] = await sequelize.query(
    `SELECT name FROM ${META_TABLE} ORDER BY name ASC`
  );
  return (rows as { name: string }[]).map((row) => row.name);
}

function getMigrationFiles() {
  const dir = path.join(process.cwd(), "src/lib/db/migrations");
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mjs"))
    .sort();
}

export async function runMigrations() {
  const sequelize = getSequelize();
  await sequelize.authenticate();
  await ensureMetaTable(sequelize);

  const applied = new Set(await getAppliedMigrations(sequelize));
  const files = getMigrationFiles();
  const queryInterface = sequelize.getQueryInterface();
  const ran: string[] = [];

  for (const file of files) {
    if (applied.has(file)) continue;

    const migrationPath = path.join(process.cwd(), "src/lib/db/migrations", file);
    const migration = (await import(migrationPath)) as MigrationModule;

    await sequelize.transaction(async (transaction) => {
      await migration.up(queryInterface, Sequelize);
      await sequelize.query(`INSERT INTO ${META_TABLE} (name) VALUES (:name)`, {
        replacements: { name: file },
        transaction,
      });
    });

    ran.push(file);
    console.log(`[migrate] Applied ${file}`);
  }

  if (ran.length === 0) {
    console.log("[migrate] No pending migrations.");
  }

  return ran;
}

export async function rollbackLastMigration() {
  const sequelize = getSequelize();
  await sequelize.authenticate();
  await ensureMetaTable(sequelize);

  const applied = await getAppliedMigrations(sequelize);
  const last = applied.at(-1);

  if (!last) {
    console.log("[migrate] No migrations to rollback.");
    return null;
  }

  const migrationPath = path.join(process.cwd(), "src/lib/db/migrations", last);
  const migration = (await import(migrationPath)) as MigrationModule;
  const queryInterface = sequelize.getQueryInterface();

  await sequelize.transaction(async (transaction) => {
    await migration.down(queryInterface);
    await sequelize.query(`DELETE FROM ${META_TABLE} WHERE name = :name`, {
      replacements: { name: last },
      transaction,
    });
  });

  console.log(`[migrate] Rolled back ${last}`);
  return last;
}
