/**
 * Restore /services hero page_sections.id=200 from the verified pre-migration backup.
 * Does not change public rendering.
 */
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config({ path: ".env.local" });
dotenv.config();

const ROOT = process.cwd();
const BATCH = "canonical-v4-2026-09-05";
const backupPath = path.join(
  ROOT,
  "backups",
  `cms-canonical-v4-${BATCH}`,
  "services-hero-200.json"
);
const verifiedDir = path.join(ROOT, "backups", `cms-canonical-v4-${BATCH}-verified-original`);

if (!fs.existsSync(backupPath)) {
  throw new Error(`Verified hero backup missing: ${backupPath}`);
}

fs.mkdirSync(verifiedDir, { recursive: true });
fs.copyFileSync(backupPath, path.join(verifiedDir, "services-hero-200.json"));

const backup = JSON.parse(fs.readFileSync(backupPath, "utf8"));
if (backup.id !== 200 || backup.slug !== "services" || backup.type !== "hero") {
  throw new Error("Backup hero file failed identity checks.");
}

const prior = typeof backup.data === "string" ? JSON.parse(backup.data) : backup.data;
if (!prior?.title || prior.title !== "Edge AI and Intelligent Engineering Solutions") {
  throw new Error("Backup hero content failed title check.");
}

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE ?? "",
  process.env.MYSQL_USER ?? "",
  process.env.MYSQL_PASSWORD ?? "",
  {
    host: process.env.MYSQL_HOST ?? "127.0.0.1",
    port: Number(process.env.MYSQL_PORT ?? 3306),
    dialect: "mysql",
    logging: false,
  }
);

await sequelize.authenticate();
const [liveRows] = await sequelize.query(
  "SELECT id, page_id, type, stable_key, model, data FROM page_sections WHERE id = 200"
);
const live = liveRows[0];
if (!live || live.stable_key !== "services.hero") {
  await sequelize.close();
  throw new Error("Live hero 200 is missing or not bound to services.hero.");
}

const liveData = typeof live.data === "string" ? JSON.parse(live.data) : live.data ?? {};
const restored = {
  ...prior,
  _cmsEdited: true,
  _preservedRowId: 200,
  _migration: liveData._migration ?? {
    version: "2026-09-05-canonical-v4",
    preserved: true,
  },
};

await sequelize.query("UPDATE page_sections SET data = :data WHERE id = 200", {
  replacements: { data: JSON.stringify(restored) },
});

const [afterRows] = await sequelize.query("SELECT data FROM page_sections WHERE id = 200");
const after = typeof afterRows[0].data === "string" ? JSON.parse(afterRows[0].data) : afterRows[0].data;
await sequelize.close();

if (after.title !== prior.title || after.imageId !== prior.imageId || after._preservedRowId !== 200) {
  throw new Error("Restore verification failed.");
}

console.log(
  JSON.stringify(
    {
      restored: true,
      id: 200,
      title: after.title,
      imageId: after.imageId,
      ctaText: after.ctaText,
      preservedRowId: after._preservedRowId,
      verifiedCopy: path.join(verifiedDir, "services-hero-200.json"),
    },
    null,
    2
  )
);
