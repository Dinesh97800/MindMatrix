import { syncDatabase } from "@/lib/db/sequelize";

export async function ensureCmsDatabaseReady() {
  await syncDatabase();
}
