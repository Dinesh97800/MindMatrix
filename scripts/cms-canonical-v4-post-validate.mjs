/**
 * Read-only post-migration validation. Does not write to the database.
 */
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config({ path: ".env.local" });
dotenv.config();

const ROOT = process.cwd();
const BATCH = "canonical-v4-2026-09-05";
const PRESERVED_ID = 200;
const PRESERVED_KEY = "services.hero";
const MODELS = new Set([
  "HERO",
  "CONTENT",
  "CARDS",
  "MEDIA",
  "METRICS",
  "PROCESS",
  "ARCH",
  "TABLE",
  "LOGOS",
  "CTA",
  "FAQ",
  "LISTING",
  "ARTICLE",
  "FORM",
  "CONTACT",
  "NAV",
  "UTILITY",
]);

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

async function q(sql, replacements) {
  const [rows] = replacements
    ? await sequelize.query(sql, { replacements })
    : await sequelize.query(sql);
  return rows;
}

function parseJson(value) {
  if (value == null) return {};
  if (typeof value === "object") return value;
  try {
    return JSON.parse(String(value));
  } catch {
    return {};
  }
}

await sequelize.authenticate();

const manifest = JSON.parse(
  fs.readFileSync(path.join(ROOT, "CMS_CANONICAL_MIGRATION_MANIFEST.json"), "utf8")
);
const backupDir = path.join(ROOT, "backups", `cms-canonical-v4-${BATCH}`);
const heroBackup = JSON.parse(
  fs.readFileSync(path.join(backupDir, "services-hero-200.json"), "utf8")
);
const backupCounts = JSON.parse(fs.readFileSync(path.join(backupDir, "counts.json"), "utf8"));

const pages = await q("SELECT * FROM pages");
const sections = await q("SELECT * FROM page_sections");
const seo = await q("SELECT * FROM page_seo");
const settings = await q("SELECT * FROM site_settings");
const media = await q("SELECT * FROM media");
const blogs = await q("SELECT slug FROM blogs");
const studies = await q("SELECT slug FROM case_studies");
const jobs = await q("SELECT slug FROM jobs");
const resources = await q("SELECT slug FROM resources");
const archivePages = await q(
  "SELECT COUNT(*) AS c FROM cms_archive_pages WHERE archive_batch = :batch",
  { batch: BATCH }
);
const archiveSections = await q(
  "SELECT COUNT(*) AS c FROM cms_archive_page_sections WHERE archive_batch = :batch",
  { batch: BATCH }
);
const preservedArchive = await q(
  `SELECT archive_reason FROM cms_archive_page_sections
   WHERE archive_batch = :batch AND original_id = :id`,
  { batch: BATCH, id: PRESERVED_ID }
);
const uniqueIndex = await q(
  `SELECT INDEX_NAME, NON_UNIQUE
   FROM information_schema.statistics
   WHERE table_schema = DATABASE()
     AND table_name = 'page_sections'
     AND INDEX_NAME = 'page_sections_page_id_stable_key_unique'`
);
const schemaCols = await q(
  `SELECT COLUMN_NAME FROM information_schema.columns
   WHERE table_schema = DATABASE() AND table_name = 'page_sections'
     AND COLUMN_NAME IN ('stable_key','model','template','source_meta','editor_policy','decorations')`
);
const hero = (
  await q(
    `SELECT ps.*, p.slug FROM page_sections ps JOIN pages p ON p.id = ps.page_id WHERE ps.id = :id`,
    { id: PRESERVED_ID }
  )
)[0];

const active = pages.filter((p) => p.classification === "active");
const redirects = pages.filter((p) => p.classification === "redirect");
const unknown = pages.filter((p) => p.classification !== "active" && p.classification !== "redirect");
const publishableRedirects = redirects.filter((p) => Number(p.publishable) === 1);
const publishedRedirects = redirects.filter((p) => p.status === "published");
const redirectSections = sections.filter((s) =>
  redirects.some((p) => Number(p.id) === Number(s.page_id))
);
const utilityLive = sections.filter((s) => s.model === "UTILITY");
const unsupported = sections.filter((s) => !MODELS.has(String(s.model)));
const missingKeys = sections.filter((s) => !s.stable_key || !s.model || !s.template);
const dupes = await q(
  `SELECT page_id, stable_key, COUNT(*) AS c
   FROM page_sections GROUP BY page_id, stable_key HAVING c > 1`
);

const expectedByPage = new Map();
const utilityExpected = [];
for (const page of manifest.pages) {
  const keys = [];
  for (const section of page.sections) {
    if (section.model === "UTILITY") {
      utilityExpected.push(`${page.slug}:${section.stableKey}`);
      continue;
    }
    if (page.classification === "active") keys.push(section.stableKey);
  }
  expectedByPage.set(page.slug, keys);
}

const liveByPage = new Map();
for (const page of pages) {
  liveByPage.set(
    page.slug,
    sections
      .filter((s) => Number(s.page_id) === Number(page.id))
      .map((s) => s.stable_key)
      .sort()
  );
}

const missingBindings = [];
const extraBindings = [];
for (const page of manifest.pages) {
  const expected = [...(expectedByPage.get(page.slug) ?? [])].sort();
  const live = liveByPage.get(page.slug) ?? [];
  for (const key of expected) if (!live.includes(key)) missingBindings.push(`${page.slug} ${key}`);
  for (const key of live) if (!expected.includes(key)) extraBindings.push(`${page.slug} ${key}`);
}

const slotIssues = [];
for (const slot of manifest.auditedSlots) {
  if (!slot.stableKeys?.length) {
    slotIssues.push(`${slot.route} ${slot.component}#${slot.order}`);
  }
}

const studySlugs = new Set(studies.map((r) => r.slug));
const blogSlugs = new Set(blogs.map((r) => r.slug));
const unresolved = [];
const cssJsx = [];
for (const section of sections) {
  const data = parseJson(section.data);
  const policy = parseJson(section.editor_policy);
  if (section.model === "LISTING") {
    const entityType = String(data.entityType ?? "");
    const refs = Array.isArray(data.references) ? data.references.map(String) : [];
    for (const ref of refs) {
      if (entityType === "case_study" && !studySlugs.has(ref)) {
        unresolved.push(`${section.stable_key}: missing case_study ${ref}`);
      }
      if (entityType === "blog" && !blogSlugs.has(ref)) {
        unresolved.push(`${section.stable_key}: missing blog ${ref}`);
      }
      if (entityType === "job" && refs.length) unresolved.push(`${section.stable_key}: invented job ${ref}`);
      if (entityType === "resource" && refs.length) unresolved.push(`${section.stable_key}: invented resource ${ref}`);
    }
  }
  const blob = JSON.stringify(data);
  if (/(className|styled-jsx|<div|<section|backgroundImage:)/.test(blob) && !/_migration/.test(blob)) {
    cssJsx.push(section.stable_key);
  }
  if (policy.editable && section.model === "UTILITY") {
    cssJsx.push(`${section.stable_key} UTILITY marked editable`);
  }
}

const backupHeroData = parseJson(heroBackup.data);
const liveHeroData = parseJson(hero?.data);
const requiredHeroKeys = [
  "title",
  "description",
  "eyebrow",
  "imageId",
  "imageAlt",
  "ctaText",
  "ctaUrl",
  "variant",
  "alignment",
];
const adminFieldsPreserved =
  backupHeroData.title === "Edge AI and Intelligent Engineering Solutions" &&
  liveHeroData.title === backupHeroData.title &&
  requiredHeroKeys.every(
    (key) => JSON.stringify(backupHeroData[key]) === JSON.stringify(liveHeroData[key])
  ) &&
  liveHeroData._preservedRowId === 200 &&
  liveHeroData._cmsEdited === true;

const activeMissingSeo = active.filter(
  (page) => !seo.some((row) => Number(row.page_id) === Number(page.id))
);

const expectedSections = manifest.pages
  .filter((p) => p.classification === "active")
  .flatMap((p) => p.sections.filter((s) => s.model !== "UTILITY")).length;

const gates = {
  "75 routes classified": pages.length === 75,
  "55 active/effective pages": active.length === 55,
  "20 redirects": redirects.length === 20,
  "0 unknown routes": unknown.length === 0,
  "Every audited slot mapped": slotIssues.length === 0,
  "No duplicate (page_id, stable_key)": dupes.length === 0,
  "No extra/missing canonical sections": missingBindings.length === 0 && extraBindings.length === 0,
  "No unsupported models": unsupported.length === 0 && missingKeys.length === 0,
  "UNIQUE index present": uniqueIndex.length > 0 && Number(uniqueIndex[0].NON_UNIQUE) === 0,
  "Redirects not publishable": publishableRedirects.length === 0 && publishedRedirects.length === 0,
  "Redirects have no live sections": redirectSections.length === 0,
  "UTILITY not live sections": utilityLive.length === 0,
  "Entity refs resolve": unresolved.length === 0,
  "SEO on active pages": activeMissingSeo.length === 0,
  "Settings preserved": settings.length === backupCounts.before.site_settings,
  "Media preserved": media.length === backupCounts.before.media,
  "Blogs preserved": blogs.length === backupCounts.before.blogs,
  "Jobs not invented": jobs.length === 0,
  "Resources not invented": resources.length === 0,
  "Hero 200 preserved":
    Boolean(hero) &&
    hero.slug === "services" &&
    hero.stable_key === PRESERVED_KEY &&
    Number(hero.id) === PRESERVED_ID,
  "Admin-edited hero content kept": adminFieldsPreserved,
  "Archive snapshot present":
    Number(archivePages[0].c) === 75 && Number(archiveSections[0].c) === 540,
  "Hero archive reason": preservedArchive[0]?.archive_reason === "preserved_admin_edited",
  "Live section count matches manifest": sections.length === expectedSections,
};

const failed = Object.entries(gates).filter(([, pass]) => !pass);

console.log(JSON.stringify({
  backupDir,
  backupHeroId: heroBackup.id,
  backupHeroSlug: heroBackup.slug,
  liveHero: hero
    ? {
        id: hero.id,
        slug: hero.slug,
        type: hero.type,
        stable_key: hero.stable_key,
        model: hero.model,
        preservedRowId: liveHeroData._preservedRowId,
        cmsEdited: liveHeroData._cmsEdited,
        title: liveHeroData.title,
        backupTitle: backupHeroData.title,
      }
    : null,
  counts: {
    pages: pages.length,
    active: active.length,
    redirects: redirects.length,
    unknown: unknown.length,
    sections: sections.length,
    expectedSections,
    seo: seo.length,
    settings: settings.length,
    media: media.length,
    blogs: blogs.length,
    caseStudies: studies.length,
    jobs: jobs.length,
    resources: resources.length,
    archivePages: Number(archivePages[0].c),
    archiveSections: Number(archiveSections[0].c),
    utilityExpected: utilityExpected.length,
    utilityLive: utilityLive.length,
    schemaCols: schemaCols.map((c) => c.COLUMN_NAME),
  },
  missingBindings,
  extraBindings,
  slotIssues,
  unresolved,
  cssJsx: [...new Set(cssJsx)],
  failed: failed.map(([name]) => name),
  gates,
}, null, 2));

await sequelize.close();
if (failed.length) process.exitCode = 1;
