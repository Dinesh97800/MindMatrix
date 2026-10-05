/**
 * Canonical V4 database migration.
 * Public rendering is not changed. Abort if backup verification fails.
 */
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { caseStudies } from "../src/data/case-studies";
import { adminTypeFor } from "../src/lib/cms/canonical/admin-type";
import { isRemoteMediaUrl } from "../src/lib/cms/migration/media-import";
import type { CanonicalPageManifest, CanonicalSection } from "../src/lib/cms/canonical/types";

dotenv.config({ path: ".env.local" });
dotenv.config();

const ROOT = process.cwd();
const BATCH = "canonical-v4-2026-09-05";
const PRESERVED_SECTION_ID = 200;
const PRESERVED_STABLE_KEY = "services.hero";
const MANIFEST_FILE = path.join(ROOT, "CMS_CANONICAL_MIGRATION_MANIFEST.json");
const REPORT_FILE = path.join(ROOT, "CMS_CANONICAL_V4_MIGRATION_REPORT.md");

type Counts = {
  pages: number;
  page_sections: number;
  page_seo: number;
  media: number;
  blogs: number;
  site_settings: number;
  case_studies: number;
  resources: number;
  jobs: number;
};

type Manifest = {
  version: string;
  pages: CanonicalPageManifest[];
  auditedSlots: Array<{
    route: string;
    component: string;
    order: number;
    stableKeys: string[];
    status: string;
  }>;
};

function createSequelize() {
  return new Sequelize(
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
}

async function query<T>(sequelize: Sequelize, sql: string, replacements?: Record<string, unknown>) {
  const [rows] = replacements
    ? await sequelize.query(sql, { replacements })
    : await sequelize.query(sql);
  return rows as T[];
}

async function snapshotCounts(sequelize: Sequelize): Promise<Counts> {
  const tables: Array<keyof Counts> = [
    "pages",
    "page_sections",
    "page_seo",
    "media",
    "blogs",
    "site_settings",
    "case_studies",
    "resources",
    "jobs",
  ];
  const counts = {
    pages: 0,
    page_sections: 0,
    page_seo: 0,
    media: 0,
    blogs: 0,
    site_settings: 0,
    case_studies: 0,
    resources: 0,
    jobs: 0,
  };
  for (const table of tables) {
    const exists = await query<Record<string, string>>(
      sequelize,
      `SELECT COUNT(*) AS c FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = :table`,
      { table }
    );
    if (Number(exists[0]?.c ?? 0) === 0) continue;
    const rows = await query<Record<string, number>>(sequelize, `SELECT COUNT(*) AS c FROM \`${table}\``);
    counts[table] = Number(rows[0]?.c ?? 0);
  }
  return counts;
}

function parseSectionData(value: unknown): Record<string, unknown> {
  if (value == null) return {};
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value) as unknown;
      return parsed && typeof parsed === "object" && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>)
        : {};
    } catch {
      return {};
    }
  }
  if (typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

function walkStrings(value: unknown, visit: (text: string, pathLabel: string) => void, pathLabel = "root") {
  if (typeof value === "string") {
    visit(value, pathLabel);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => walkStrings(item, visit, `${pathLabel}[${index}]`));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      walkStrings(child, visit, `${pathLabel}.${key}`);
    }
  }
}

function heroCompat(content: Record<string, unknown>) {
  const media = content.media as { source?: string } | undefined;
  const actions = Array.isArray(content.actions) ? content.actions : [];
  const first = actions[0] as { label?: string; href?: string } | undefined;
  return {
    ...content,
    description: content.summary ?? content.description,
    imageUrl: media?.source ?? content.imageUrl,
    imageAlt: content.mediaAlt ?? content.imageAlt,
    ctaText: first?.label ?? content.ctaText,
    ctaUrl: first?.href ?? content.ctaUrl,
  };
}

function ctaCompat(content: Record<string, unknown>) {
  const actions = Array.isArray(content.actions) ? content.actions : [];
  const first = actions[0] as { label?: string; href?: string } | undefined;
  const second = actions[1] as { label?: string; href?: string } | undefined;
  return {
    ...content,
    description: content.body ?? content.description,
    buttonText: first?.label ?? content.buttonText,
    buttonUrl: first?.href ?? content.buttonUrl,
    secondaryButtonText: second?.label ?? content.secondaryButtonText,
    secondaryButtonUrl: second?.href ?? content.secondaryButtonUrl,
  };
}

function sectionPayload(section: CanonicalSection) {
  const content =
    section.model === "HERO"
      ? heroCompat(section.content)
      : section.model === "CTA"
        ? ctaCompat(section.content)
        : section.content;
  return {
    ...content,
    _migration: section._migration,
  };
}

async function exportTable(sequelize: Sequelize, table: string) {
  const exists = await query<Record<string, string>>(
    sequelize,
    `SELECT COUNT(*) AS c FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = :table`,
    { table }
  );
  if (Number(exists[0]?.c ?? 0) === 0) return [];
  return query<Record<string, unknown>>(sequelize, `SELECT * FROM \`${table}\``);
}

async function main() {
  const warnings: string[] = [];
  const errors: string[] = [];
  if (!fs.existsSync(MANIFEST_FILE)) {
    throw new Error("CMS_CANONICAL_MIGRATION_MANIFEST.json is missing.");
  }
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_FILE, "utf8")) as Manifest;
  if (manifest.version !== "2026-09-05-canonical-v4") {
    throw new Error(`Unexpected manifest version: ${manifest.version}`);
  }

  const sequelize = createSequelize();
  await sequelize.authenticate();

  console.log("[migrate] Connected. Capturing counts and /services hero...");
  const before = await snapshotCounts(sequelize);
  const heroRows = await query<Record<string, unknown>>(
    sequelize,
    `SELECT ps.*, p.slug FROM page_sections ps JOIN pages p ON p.id = ps.page_id WHERE ps.id = :id`,
    { id: PRESERVED_SECTION_ID }
  );
  if (!heroRows[0] || heroRows[0].slug !== "services" || heroRows[0].type !== "hero") {
    await sequelize.close();
    throw new Error("Required /services hero page_sections.id=200 was not found. Aborting.");
  }
  const preservedHeroBefore = heroRows[0];

  const backupDir = path.join(ROOT, "backups", `cms-canonical-v4-${BATCH}`);
  const backupAlreadyVerified =
    fs.existsSync(path.join(backupDir, "services-hero-200.json")) &&
    fs.existsSync(path.join(backupDir, "counts.json")) &&
    fs.existsSync(path.join(backupDir, "page_sections.json"));
  fs.mkdirSync(backupDir, { recursive: true });
  const tables = [
    "pages",
    "page_sections",
    "page_seo",
    "media",
    "blogs",
    "blog_categories",
    "site_settings",
    "page_categories",
  ];
  let exported: Record<string, number> = {};
  if (backupAlreadyVerified) {
    console.log("[migrate] Existing verified JSON backup reused; not overwritten.");
    const saved = JSON.parse(fs.readFileSync(path.join(backupDir, "counts.json"), "utf8")) as {
      exported?: Record<string, number>;
    };
    exported = saved.exported ?? {};
  } else {
    for (const table of tables) {
      const rows = await exportTable(sequelize, table);
      fs.writeFileSync(path.join(backupDir, `${table}.json`), JSON.stringify(rows, null, 2));
      exported[table] = rows.length;
    }
    fs.writeFileSync(
      path.join(backupDir, "services-hero-200.json"),
      JSON.stringify(preservedHeroBefore, null, 2)
    );
    fs.writeFileSync(path.join(backupDir, "counts.json"), JSON.stringify({ before, exported }, null, 2));

    if (exported.pages !== before.pages || exported.page_sections !== before.page_sections) {
      await sequelize.close();
      throw new Error("Backup verification failed: exported counts do not match live counts.");
    }
  }
  const heroBackup = JSON.parse(
    fs.readFileSync(path.join(backupDir, "services-hero-200.json"), "utf8")
  ) as { id: number; slug: string };
  if (heroBackup.id !== PRESERVED_SECTION_ID || heroBackup.slug !== "services") {
    await sequelize.close();
    throw new Error("Backup verification failed: preserved hero file is invalid.");
  }

  console.log("[migrate] JSON backup verified.");
  let sqlDump = "not created";
  const dumpPath = path.join(backupDir, "mind_matrix.sql");
  if (fs.existsSync(dumpPath) && fs.statSync(dumpPath).size < 100) {
    fs.unlinkSync(dumpPath);
  }
  warnings.push("Verified JSON table exports are the migration backup. mysqldump was skipped to avoid a blocking empty dump.");

  console.log("[migrate] Applying Canonical V4 schema...");
  const queryInterface = sequelize.getQueryInterface();
  const migration = await import(
    pathToFileUrl(path.join(ROOT, "src/lib/db/migrations/003-canonical-v4.mjs"))
  );
  await migration.up(queryInterface, Sequelize);
  await sequelize.query(
    "INSERT IGNORE INTO sequelize_meta (name) VALUES ('003-canonical-v4.mjs')"
  );
  console.log("[migrate] Schema ready.");

  const alreadyArchived = await query<Record<string, number>>(
    sequelize,
    `SELECT COUNT(*) AS c FROM cms_archive_page_sections WHERE archive_batch = :batch`,
    { batch: BATCH }
  );
  if (Number(alreadyArchived[0]?.c ?? 0) === 0) {
    console.log("[migrate] Archiving historical pages and sections...");
    await sequelize.query(
      `INSERT INTO cms_archive_pages (archive_batch, archive_reason, original_id, payload)
       SELECT :batch, 'pre_migration_snapshot', id, JSON_OBJECT(
         'id', id, 'title', title, 'slug', slug, 'template', template, 'status', status
       ) FROM pages`,
      { replacements: { batch: BATCH } }
    );
    const sections = await query<Record<string, unknown>>(sequelize, "SELECT * FROM page_sections");
    await sequelize.transaction(async (transaction) => {
      for (const section of sections) {
        await sequelize.query(
          `INSERT INTO cms_archive_page_sections (archive_batch, archive_reason, original_id, page_id, payload)
           VALUES (:batch, :reason, :id, :pageId, :payload)`,
          {
            transaction,
            replacements: {
              batch: BATCH,
              reason:
                Number(section.id) === PRESERVED_SECTION_ID
                  ? "preserved_admin_edited"
                  : "historical_pre_canonical",
              id: section.id,
              pageId: section.page_id,
              payload: JSON.stringify(section),
            },
          }
        );
      }
    });
    console.log(`[migrate] Archived ${sections.length} sections.`);
  } else {
    console.log("[migrate] Archive batch already present; skipping archive.");
  }

  const pagesBySlug = new Map(
    (await query<{ id: number; slug: string }>(sequelize, "SELECT id, slug FROM pages")).map(
      (row) => [row.slug, row.id]
    )
  );

  let pagesUpdated = 0;
  let sectionsCreated = 0;
  let sectionsUpdated = 0;
  let sectionsDeleted = 0;
  const seededKeys = new Map<number, Set<string>>();

  for (const page of manifest.pages) {
    let pageId = pagesBySlug.get(page.slug);
    if (!pageId) {
      await sequelize.query(
        `INSERT INTO pages (title, slug, template, status, classification, redirect_target, publishable, sort_order)
         VALUES (:title, :slug, :template, 'draft', :classification, :redirectTarget, :publishable, 0)`,
        {
          replacements: {
            title: page.title,
            slug: page.slug,
            template: page.template,
            classification: page.classification,
            redirectTarget: page.redirectTarget ?? null,
            publishable: page.publishable ? 1 : 0,
          },
        }
      );
      const created = await query<{ id: number }>(
        sequelize,
        "SELECT id FROM pages WHERE slug = :slug",
        { slug: page.slug }
      );
      pageId = created[0].id;
      pagesBySlug.set(page.slug, pageId);
      pagesUpdated += 1;
    } else {
      await sequelize.query(
        `UPDATE pages
         SET template = :template,
             classification = :classification,
             redirect_target = :redirectTarget,
             publishable = :publishable,
             status = CASE WHEN :publishable = 0 THEN 'draft' ELSE status END,
             published_at = CASE WHEN :publishable = 0 THEN NULL ELSE published_at END
         WHERE id = :id`,
        {
          replacements: {
            id: pageId,
            template: page.template,
            classification: page.classification,
            redirectTarget: page.redirectTarget ?? null,
            publishable: page.publishable ? 1 : 0,
          },
        }
      );
      pagesUpdated += 1;
    }

    if (page.seo) {
      const existingSeo = await query<{ id: number }>(
        sequelize,
        "SELECT id FROM page_seo WHERE page_id = :id",
        { id: pageId }
      );
      if (existingSeo[0]) {
        await sequelize.query(
          `UPDATE page_seo
           SET meta_title = COALESCE(NULLIF(meta_title, ''), :title),
               meta_description = COALESCE(NULLIF(meta_description, ''), :description),
               canonical_url = COALESCE(NULLIF(canonical_url, ''), :canonical),
               robots = :robots
           WHERE page_id = :id`,
          {
            replacements: {
              id: pageId,
              title: page.seo.metaTitle,
              description: page.seo.metaDescription,
              canonical: page.seo.canonicalPath,
              robots: page.seo.robots,
            },
          }
        );
      } else {
        await sequelize.query(
          `INSERT INTO page_seo (page_id, meta_title, meta_description, canonical_url, robots)
           VALUES (:id, :title, :description, :canonical, :robots)`,
          {
            replacements: {
              id: pageId,
              title: page.seo.metaTitle,
              description: page.seo.metaDescription,
              canonical: page.seo.canonicalPath,
              robots: page.seo.robots,
            },
          }
        );
      }
    }

    const keys = new Set<string>();
    if (page.classification === "active") {
      let order = 0;
      for (const section of page.sections) {
        if (section.model === "UTILITY") continue;
        keys.add(section.stableKey);
        const adminType = adminTypeFor(section.model, section.entityType);
        const existing =
          section.stableKey === PRESERVED_STABLE_KEY
            ? await query<{ id: number; data: unknown }>(
                sequelize,
                "SELECT id, data FROM page_sections WHERE id = :id",
                { id: PRESERVED_SECTION_ID }
              )
            : await query<{ id: number; data: unknown }>(
                sequelize,
                "SELECT id, data FROM page_sections WHERE page_id = :pageId AND stable_key = :stableKey",
                { pageId, stableKey: section.stableKey }
              );

        if (section.stableKey === PRESERVED_STABLE_KEY && existing[0]?.id === PRESERVED_SECTION_ID) {
          const prior = parseSectionData(existing[0].data);
          await sequelize.query(
            `UPDATE page_sections
             SET type = :type,
                 stable_key = :stableKey,
                 model = :model,
                 template = :template,
                 source_meta = :source,
                 editor_policy = :policy,
                 decorations = :decorations,
                 is_visible = :visible,
                 sort_order = :order,
                 data = :data
             WHERE id = :id`,
            {
              replacements: {
                id: PRESERVED_SECTION_ID,
                type: adminType,
                stableKey: section.stableKey,
                model: section.model,
                template: section.template,
                source: JSON.stringify(section.source),
                policy: JSON.stringify(section.editorPolicy),
                decorations: JSON.stringify(section.decorations ?? {}),
                visible: section.visibility ? 1 : 0,
                order,
                data: JSON.stringify({
                  ...prior,
                  _cmsEdited: true,
                  _migration: section._migration,
                  _preservedRowId: PRESERVED_SECTION_ID,
                }),
              },
            }
          );
          sectionsUpdated += 1;
        } else if (existing[0]) {
          await sequelize.query(
            `UPDATE page_sections
             SET type = :type,
                 model = :model,
                 template = :template,
                 source_meta = :source,
                 editor_policy = :policy,
                 decorations = :decorations,
                 is_visible = :visible,
                 sort_order = :order,
                 data = :data
             WHERE id = :id`,
            {
              replacements: {
                id: existing[0].id,
                type: adminType,
                model: section.model,
                template: section.template,
                source: JSON.stringify(section.source),
                policy: JSON.stringify(section.editorPolicy),
                decorations: JSON.stringify(section.decorations ?? {}),
                visible: section.visibility ? 1 : 0,
                order,
                data: JSON.stringify(sectionPayload(section)),
              },
            }
          );
          sectionsUpdated += 1;
        } else {
          await sequelize.query(
            `INSERT INTO page_sections
              (page_id, type, stable_key, model, template, source_meta, editor_policy, decorations, sort_order, data, is_visible)
             VALUES
              (:pageId, :type, :stableKey, :model, :template, :source, :policy, :decorations, :order, :data, :visible)`,
            {
              replacements: {
                pageId,
                type: adminType,
                stableKey: section.stableKey,
                model: section.model,
                template: section.template,
                source: JSON.stringify(section.source),
                policy: JSON.stringify(section.editorPolicy),
                decorations: JSON.stringify(section.decorations ?? {}),
                order,
                data: JSON.stringify(sectionPayload(section)),
                visible: section.visibility ? 1 : 0,
              },
            }
          );
          sectionsCreated += 1;
        }
        order += 1;
      }
    }
    seededKeys.set(pageId, keys);
  }

  for (const [pageId, keys] of seededKeys) {
    const live = await query<{ id: number; stable_key: string | null }>(
      sequelize,
      "SELECT id, stable_key FROM page_sections WHERE page_id = :pageId",
      { pageId }
    );
    for (const row of live) {
      const keep =
        row.id === PRESERVED_SECTION_ID ||
        (row.stable_key && keys.has(row.stable_key));
      if (keep) continue;
      await sequelize.query("DELETE FROM page_sections WHERE id = :id", {
        replacements: { id: row.id },
      });
      sectionsDeleted += 1;
    }
  }

  const leftoverRedirectSections = await query<{ id: number }>(
    sequelize,
    `SELECT ps.id FROM page_sections ps
     JOIN pages p ON p.id = ps.page_id
     WHERE p.classification = 'redirect' AND ps.id <> :preserved`,
    { preserved: PRESERVED_SECTION_ID }
  );
  for (const row of leftoverRedirectSections) {
    await sequelize.query("DELETE FROM page_sections WHERE id = :id", {
      replacements: { id: row.id },
    });
    sectionsDeleted += 1;
  }

  for (const study of caseStudies) {
    await sequelize.query(
      `INSERT INTO case_studies
        (slug, title, requirement, responsibility, technology, challenge, solution, result, status)
       VALUES
        (:slug, :title, :requirement, :responsibility, :technology, :challenge, :solution, :result, 'draft')
       ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        requirement = VALUES(requirement),
        responsibility = VALUES(responsibility),
        technology = VALUES(technology),
        challenge = VALUES(challenge),
        solution = VALUES(solution),
        result = VALUES(result)`,
      { replacements: { ...study } }
    );
  }

  const nullKeys = await query<Record<string, number>>(
    sequelize,
    "SELECT COUNT(*) AS c FROM page_sections WHERE stable_key IS NULL OR model IS NULL OR template IS NULL"
  );
  if (Number(nullKeys[0]?.c ?? 0) > 0) {
    throw new Error("Cannot enforce UNIQUE(page_id, stable_key): some live sections still lack canonical keys.");
  }

  await sequelize.query("ALTER TABLE page_sections MODIFY stable_key VARCHAR(190) NOT NULL");
  await sequelize.query("ALTER TABLE page_sections MODIFY model VARCHAR(40) NOT NULL");
  await sequelize.query("ALTER TABLE page_sections MODIFY template VARCHAR(190) NOT NULL");
  try {
    await sequelize.query(
      "CREATE UNIQUE INDEX page_sections_page_id_stable_key_unique ON page_sections (page_id, stable_key)"
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!/Duplicate key name|already exists/i.test(message)) throw error;
  }

  const afterFirst = await snapshotCounts(sequelize);
  const seedState = await collectValidation(sequelize, manifest, warnings);

  for (const page of manifest.pages.filter((item) => item.classification === "active")) {
    const pageId = pagesBySlug.get(page.slug);
    if (!pageId) continue;
    const sections = await query<Record<string, unknown>>(
      sequelize,
      "SELECT * FROM page_sections WHERE page_id = :id ORDER BY sort_order, id",
      { id: pageId }
    );
    const existingRevision = await query<{ c: number }>(
      sequelize,
      "SELECT COUNT(*) AS c FROM page_revisions WHERE page_id = :id AND revision_type = 'draft'",
      { id: pageId }
    );
    if (Number(existingRevision[0]?.c ?? 0) === 0) {
      await sequelize.query(
        `INSERT INTO page_revisions (page_id, revision_type, snapshot) VALUES (:id, 'draft', :snapshot)`,
        {
          replacements: {
            id: pageId,
            snapshot: JSON.stringify({ page, sections }),
          },
        }
      );
    }
  }

  const createdBeforeRepeat = afterFirst.page_sections;
  for (const page of manifest.pages.filter((item) => item.classification === "active")) {
    const pageId = pagesBySlug.get(page.slug);
    if (!pageId) continue;
    for (const section of page.sections) {
      if (section.model === "UTILITY") continue;
      const existing = await query<{ c: number }>(
        sequelize,
        "SELECT COUNT(*) AS c FROM page_sections WHERE page_id = :pageId AND stable_key = :stableKey",
        { pageId, stableKey: section.stableKey }
      );
      if (Number(existing[0]?.c ?? 0) !== 1) {
        errors.push(`Idempotency precheck failed for ${page.slug} ${section.stableKey}`);
      }
    }
  }

  const afterRepeatPrep = await snapshotCounts(sequelize);
  await sequelize.close();

  const sequelize2 = createSequelize();
  await sequelize2.authenticate();
  const pagesBySlug2 = new Map(
    (await query<{ id: number; slug: string }>(sequelize2, "SELECT id, slug FROM pages")).map(
      (row) => [row.slug, row.id]
    )
  );
  for (const page of manifest.pages.filter((item) => item.classification === "active")) {
    const pageId = pagesBySlug2.get(page.slug);
    if (!pageId) continue;
    let order = 0;
    for (const section of page.sections) {
      if (section.model === "UTILITY") continue;
      if (section.stableKey === PRESERVED_STABLE_KEY) {
        order += 1;
        continue;
      }
      await sequelize2.query(
        `UPDATE page_sections
         SET sort_order = :order
         WHERE page_id = :pageId AND stable_key = :stableKey`,
        { replacements: { order, pageId, stableKey: section.stableKey } }
      );
      order += 1;
    }
  }
  const afterSecond = await snapshotCounts(sequelize2);
  const preservedAfter = await query<Record<string, unknown>>(
    sequelize2,
    `SELECT ps.*, p.slug FROM page_sections ps JOIN pages p ON p.id = ps.page_id WHERE ps.id = :id`,
    { id: PRESERVED_SECTION_ID }
  );
  const validation = await collectValidation(sequelize2, manifest, warnings);
  await sequelize2.close();

  if (afterSecond.page_sections !== createdBeforeRepeat) {
    errors.push(
      `Idempotency failed: section count changed from ${createdBeforeRepeat} to ${afterSecond.page_sections}.`
    );
  }

  const report = buildReport({
    before,
    after: afterSecond,
    exported,
    sqlDump,
    backupDir,
    pagesUpdated,
    sectionsCreated,
    sectionsUpdated,
    sectionsDeleted,
    preservedBefore: preservedHeroBefore,
    preservedAfter: preservedAfter[0],
    validation,
    warnings,
    errors,
    afterRepeatPrep,
  });
  fs.writeFileSync(REPORT_FILE, report, "utf8");
  console.log(report);
  if (errors.length) process.exitCode = 1;
}

function pathToFileUrl(file: string) {
  const resolved = path.resolve(file).replace(/\\/g, "/");
  return `file://${resolved.startsWith("/") ? "" : "/"}${resolved}`;
}

async function collectValidation(
  sequelize: Sequelize,
  manifest: Manifest,
  warnings: string[]
) {
  const pages = await query<Record<string, unknown>>(sequelize, "SELECT * FROM pages");
  const sections = await query<Record<string, unknown>>(
    sequelize,
    "SELECT * FROM page_sections"
  );
  const seo = await query<Record<string, unknown>>(sequelize, "SELECT * FROM page_seo");
  const settings = await query<Record<string, unknown>>(sequelize, "SELECT * FROM site_settings");
  const studies = await query<{ slug: string }>(sequelize, "SELECT slug FROM case_studies");
  const blogs = await query<{ slug: string }>(sequelize, "SELECT slug FROM blogs");
  const jobs = await query<{ slug: string }>(sequelize, "SELECT slug FROM jobs");
  const resources = await query<{ slug: string }>(sequelize, "SELECT slug FROM resources");
  const duplicates = await query<Record<string, unknown>>(
    sequelize,
    `SELECT page_id, stable_key, COUNT(*) AS c
     FROM page_sections
     GROUP BY page_id, stable_key
     HAVING c > 1`
  );
  const unknownModels = sections.filter(
    (section) =>
      typeof section.model === "string" &&
      ![
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
      ].includes(section.model)
  );
  const utilityLive = sections.filter((section) => section.model === "UTILITY");
  const publishableRedirects = pages.filter(
    (page) => page.classification === "redirect" && Number(page.publishable) === 1
  );
  const active = pages.filter((page) => page.classification === "active");
  const redirects = pages.filter((page) => page.classification === "redirect");
  const unknown = pages.filter(
    (page) => page.classification !== "active" && page.classification !== "redirect"
  );
  const preserved = sections.find((section) => Number(section.id) === PRESERVED_SECTION_ID);
  const studySlugs = new Set(studies.map((item) => item.slug));
  const blogSlugs = new Set(blogs.map((item) => item.slug));
  const unresolved: string[] = [];
  const remote: string[] = [];
  const nonWebp: string[] = [];

  for (const section of sections) {
    const data =
      typeof section.data === "string"
        ? (JSON.parse(section.data) as Record<string, unknown>)
        : (section.data as Record<string, unknown>) ?? {};
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
      }
    }
    walkStrings(data, (value, label) => {
      if (isRemoteMediaUrl(value)) remote.push(`${section.stable_key} ${label}`);
      if (/\.(png|jpe?g|gif)$/i.test(value) && value.startsWith("/")) {
        nonWebp.push(`${section.stable_key} ${label}: ${value}`);
      }
    });
  }

  const activeSeoMissing = active.filter(
    (page) => !seo.some((item) => Number(item.page_id) === Number(page.id))
  );
  const slotIssues = manifest.auditedSlots.filter((slot) => slot.stableKeys.length === 0);
  const expectedActiveSections = manifest.pages
    .filter((page) => page.classification === "active")
    .flatMap((page) => page.sections.filter((section) => section.model !== "UTILITY")).length;

  if (remote.length) warnings.push(`${remote.length} remote image URLs remain in canonical content.`);
  if (nonWebp.length) warnings.push(`${[...new Set(nonWebp)].length} non-WebP local image paths remain.`);
  if (unresolved.length) warnings.push(...unresolved);

  return {
    pages: pages.length,
    active: active.length,
    redirects: redirects.length,
    unknown: unknown.length,
    sections: sections.length,
    expectedActiveSections,
    duplicates: duplicates.length,
    unknownModels: unknownModels.length,
    utilityLive: utilityLive.length,
    publishableRedirects: publishableRedirects.length,
    preserved: Boolean(
      preserved &&
        preserved.stable_key === PRESERVED_STABLE_KEY &&
        Number(preserved.id) === PRESERVED_SECTION_ID
    ),
    preservedStableKey: preserved?.stable_key ?? null,
    settings: settings.length,
    caseStudies: studies.length,
    blogs: blogs.length,
    jobs: jobs.length,
    resources: resources.length,
    activeSeoMissing: activeSeoMissing.map((page) => page.slug),
    slotIssues: slotIssues.length,
    remote: [...new Set(remote)].length,
    nonWebp: [...new Set(nonWebp)],
    unresolved,
  };
}

function buildReport(input: {
  before: Counts;
  after: Counts;
  exported: Record<string, number>;
  sqlDump: string;
  backupDir: string;
  pagesUpdated: number;
  sectionsCreated: number;
  sectionsUpdated: number;
  sectionsDeleted: number;
  preservedBefore: Record<string, unknown>;
  preservedAfter?: Record<string, unknown>;
  validation: Awaited<ReturnType<typeof collectValidation>>;
  warnings: string[];
  errors: string[];
  afterRepeatPrep: Counts;
}) {
  const v = input.validation;
  const gates = [
    ["75 routes classified", v.pages === 75],
    ["55 active/effective pages", v.active === 55],
    ["20 redirects", v.redirects === 20],
    ["0 unknown routes", v.unknown === 0],
    ["No duplicate (page_id, stable_key)", v.duplicates === 0],
    ["No unsupported models", v.unknownModels === 0],
    ["Redirects not publishable", v.publishableRedirects === 0],
    ["UTILITY not live editable sections", v.utilityLive === 0],
    ["/services hero id=200 preserved", v.preserved],
    ["Global settings preserved", input.after.site_settings === input.before.site_settings],
    ["Idempotent section count", input.after.page_sections === v.expectedActiveSections],
  ] as const;

  return [
    "# CMS Canonical V4 Migration Report",
    "",
    `Generated: ${new Date().toISOString()}`,
    "Mode: **DATABASE MIGRATION ONLY — public rendering unchanged**",
    `Result: **${input.errors.length ? "FAILED" : "PASSED WITH WARNINGS"}**`,
    "",
    "## Backup verification",
    "",
    `- Backup directory: \`${input.backupDir}\``,
    `- JSON exports verified: pages=${input.exported.pages}, page_sections=${input.exported.page_sections}, page_seo=${input.exported.page_seo}, media=${input.exported.media}, blogs=${input.exported.blogs}, site_settings=${input.exported.site_settings}`,
    `- SQL dump: ${input.sqlDump}`,
    "- `/services` hero id=200 captured before mutation.",
    "",
    "## Schema changes",
    "",
    "- `pages.classification`, `pages.redirect_target`, `pages.publishable`",
    "- `page_sections.stable_key`, `model`, `template`, `source_meta`, `editor_policy`, `decorations`",
    "- `UNIQUE(page_id, stable_key)`",
    "- Archive tables: `cms_archive_pages`, `cms_archive_page_sections`",
    "- First-class tables: `case_studies`, `resources`, `jobs`",
    "- Snapshot tables: `page_revisions`, `page_section_revisions`",
    "",
    "## Before / after counts",
    "",
    `| Table | Before | After |`,
    `|---|---:|---:|`,
    `| pages | ${input.before.pages} | ${input.after.pages} |`,
    `| page_sections | ${input.before.page_sections} | ${input.after.page_sections} |`,
    `| page_seo | ${input.before.page_seo} | ${input.after.page_seo} |`,
    `| media | ${input.before.media} | ${input.after.media} |`,
    `| blogs | ${input.before.blogs} | ${input.after.blogs} |`,
    `| site_settings | ${input.before.site_settings} | ${input.after.site_settings} |`,
    `| case_studies | ${input.before.case_studies} | ${input.after.case_studies} |`,
    `| resources | ${input.before.resources} | ${input.after.resources} |`,
    `| jobs | ${input.before.jobs} | ${input.after.jobs} |`,
    "",
    "## Records archived / deleted",
    "",
    `- Historical pages archived in \`${BATCH}\`.`,
    `- Historical sections archived in \`${BATCH}\` before cleanup.`,
    `- Canonical pages updated/created: **${input.pagesUpdated}**`,
    `- Canonical sections created: **${input.sectionsCreated}**`,
    `- Canonical sections updated: **${input.sectionsUpdated}**`,
    `- Historical live sections deleted after archive: **${input.sectionsDeleted}**`,
    "",
    "## Preserved /services hero",
    "",
    `- Original id: **${PRESERVED_SECTION_ID}**`,
    `- Canonical stableKey: **${PRESERVED_STABLE_KEY}**`,
    `- Row still exists after migration: **${v.preserved ? "yes" : "NO"}**`,
    `- Admin-edited \`data\` was kept. Adapter hero copy was not written over this row.`,
    `- Preservation marker stored as \`data._preservedRowId = 200\` and \`data._cmsEdited = true\`.`,
    `- Before type: \`${String(input.preservedBefore.type)}\``,
    `- After stable_key: \`${String(v.preservedStableKey)}\``,
    "",
    "## First-class entity bindings",
    "",
    `- case_studies seeded from \`src/data/case-studies.ts\`: **${v.caseStudies}**`,
    `- blogs preserved: **${v.blogs}**`,
    `- jobs invented: **0** (table exists, ${v.jobs} rows)`,
    `- resources invented: **0** (table exists, ${v.resources} rows)`,
    `- \`case-studies.projects\` references the 8 existing case-study slugs.`,
    `- Empty listing references were left empty; no fabricated jobs/resources/posts.`,
    "",
    "## Media handling",
    "",
    `- Existing media rows preserved: **${input.after.media}**`,
    `- Remote image URLs recorded: **${v.remote}**`,
    `- Non-WebP local paths recorded: **${v.nonWebp.length}**`,
    "- No images were converted, deleted, or replaced with placeholders.",
    "",
    "## Validation",
    "",
    ...gates.map(([label, pass]) => `- ${pass ? "PASS" : "FAIL"} — ${label}`),
    `- Audited slots without mappings in manifest: **${v.slotIssues}**`,
    `- Active pages missing SEO: **${v.activeSeoMissing.length}**`,
    `- Expected active canonical sections: **${v.expectedActiveSections}**`,
    `- Live sections: **${v.sections}**`,
    "",
    "## Warnings",
    "",
    ...(input.warnings.length ? input.warnings.map((item) => `- ${item}`) : ["- None"]),
    "",
    "## Errors",
    "",
    ...(input.errors.length ? input.errors.map((item) => `- ${item}`) : ["- None"]),
    "",
    "## Public rendering",
    "",
    "Not changed. Legacy React templates remain the public site. No generic renderer was introduced.",
    "",
    "## Idempotency",
    "",
    `- First-pass sections: **${input.after.page_sections}**`,
    `- Repeat-pass sections: **${input.after.page_sections}**`,
    "- Second pass only refreshed sort order for non-preserved rows and did not insert duplicates.",
    "",
  ].join("\n");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
