import { Sequelize } from "sequelize";
import mysql2 from "mysql2";
import { areModelsInitialized, initModels } from "./models";

const globalForDb = globalThis as typeof globalThis & {
  sequelize?: Sequelize;
  dbSynced?: boolean;
};

function createSequelize() {
  const database = process.env.MYSQL_DATABASE;
  const username = process.env.MYSQL_USER;
  const password = process.env.MYSQL_PASSWORD;
  const host = process.env.MYSQL_HOST ?? "127.0.0.1";
  const port = Number(process.env.MYSQL_PORT ?? 3306);

  if (!database || !username) {
    throw new Error(
      "MySQL is not configured. Set MYSQL_DATABASE and MYSQL_USER (MYSQL_PASSWORD can be empty for local root)."
    );
  }

  return new Sequelize(database, username, password ?? "", {
    host,
    port,
    dialect: "mysql",
    dialectModule: mysql2,
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
}

export function getSequelize() {
  if (!globalForDb.sequelize) {
    globalForDb.sequelize = createSequelize();
  }
  return globalForDb.sequelize;
}

export function isDatabaseConfigured() {
  return Boolean(process.env.MYSQL_DATABASE && process.env.MYSQL_USER);
}

/**
 * Connects to MySQL and ensures all Sequelize models have tables.
 * Missing tables are created automatically (`sync` without `force`).
 * Set DB_SYNC_ALTER=true only when you intentionally want Sequelize to alter columns.
 */
export async function syncDatabase() {
  const sequelize = getSequelize();

  // Always ensure models are initialized (Next.js HMR can reload modules while
  // dbSynced stays true, leaving an uninitialized Model subclass).
  if (!areModelsInitialized()) {
    initModels(sequelize);
  }

  if (!globalForDb.dbSynced) {
    await sequelize.authenticate();

    await sequelize.sync({
      alter: process.env.DB_SYNC_ALTER === "true",
    });

    globalForDb.dbSynced = true;

    if (process.env.NODE_ENV === "development") {
      console.log("[db] Connected and tables are ready.");
    }
  }

  return sequelize;
}

export type DatabaseHealth = {
  configured: boolean;
  connected: boolean;
  tablesReady: boolean;
  database?: string;
  host?: string;
  tables?: string[];
  error?: string;
};

export async function getDatabaseHealth(): Promise<DatabaseHealth> {
  if (!isDatabaseConfigured()) {
    return {
      configured: false,
      connected: false,
      tablesReady: false,
      error:
        "MySQL env vars missing. Set MYSQL_DATABASE and MYSQL_USER.",
    };
  }

  try {
    const sequelize = await syncDatabase();
    const [rows] = await sequelize.query("SHOW TABLES");
    const tables = (rows as Record<string, string>[]).map(
      (row) => Object.values(row)[0]
    );

    return {
      configured: true,
      connected: true,
      tablesReady: true,
      database: process.env.MYSQL_DATABASE,
      host: process.env.MYSQL_HOST ?? "127.0.0.1",
      tables,
    };
  } catch (error) {
    return {
      configured: true,
      connected: false,
      tablesReady: false,
      database: process.env.MYSQL_DATABASE,
      host: process.env.MYSQL_HOST ?? "127.0.0.1",
      error: error instanceof Error ? error.message : "Database connection failed.",
    };
  }
}
