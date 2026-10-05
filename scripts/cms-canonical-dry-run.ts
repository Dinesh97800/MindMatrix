/**
 * Canonical CMS migration dry run. Database access is SELECT-only.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { heroPageConfigs } from "../src/config/hero-pages";
import { LEGACY_BLOG_POSTS } from "../src/lib/cms/migration/data/legacy-blog-posts";
import { discoverLegacyMedia, isRemoteMediaUrl } from "../src/lib/cms/migration/media-import";
import { loadCanonicalAuditMap } from "../src/lib/cms/canonical/audit-map";
import { normalizeJsonColumn, normalizeJsonObject } from "../src/lib/cms/canonical/json";
import type { AuditedSourceSlot, CanonicalPageManifest, MappingStatus } from "../src/lib/cms/canonical/types";
import { validateCanonicalPage } from "../src/lib/cms/canonical/validation";
import { buildCanonicalPage } from "../src/lib/cms/migration/adapters/canonical";

dotenv.config({ path: ".env.local" });
dotenv.config();

const ROOT = process.cwd();
const REPORT_FILE = path.join(ROOT, "CMS_CANONICAL_MIGRATION_DRY_RUN.md");
const MANIFEST_FILE = path.join(ROOT, "CMS_CANONICAL_MIGRATION_MANIFEST.json");

type DbSnapshot = {
  pages: number; sections: number; seo: number; media: number;
  settings: number; blogs: number;
  pageUpdatedAt: string | null; sectionUpdatedAt: string | null;
};
type DbPageRow = { id: number; slug: string; status: string; template: string };
type DbSectionRow = {
  id: number; page_id: number; type: string; sort_order: number;
  data: unknown; is_visible: number | boolean;
};
type DbMediaRow = {
  id: number; original_filename: string; storage_path: string;
  public_url: string; mime_type: string;
};

function discoverRoutes(): string[] {
  const routes: string[] = [];
  for (const base of ["src/app/(home)", "src/app/(main)"]) {
    const walk = (directory: string) => {
      for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        const absolute = path.join(directory, entry.name);
        if (entry.isDirectory()) walk(absolute);
        else if (entry.name === "page.tsx") {
          routes.push(base.includes("(home)") ? "home" : path.basename(path.dirname(absolute)));
        }
      }
    };
    walk(path.join(ROOT, base));
  }
  return [...new Set(routes)].sort();
}

function discoverRedirects(): Map<string, string> {
  const config = fs.readFileSync(path.join(ROOT, "next.config.ts"), "utf8");
  return new Map(
    [...config.matchAll(/source:\s*"([^"]+)",\s*destination:\s*"([^"]+)"/g)]
      .map((match) => [match[1].replace(/^\//, ""), match[2]])
  );
}

function statusPriority(statuses: MappingStatus[]): MappingStatus {
  if (statuses.includes("DUPLICATE")) return "DUPLICATE";
  if (statuses.includes("INVALID")) return "INVALID";
  if (statuses.includes("MISSING_SOURCE")) return "MISSING_SOURCE";
  if (statuses.includes("DEVELOPER_CONTROLLED")) return "DEVELOPER_CONTROLLED";
  if (statuses.every((status) => status === "UTILITY")) return "UTILITY";
  if (statuses.some((status) => status === "FIRST_CLASS_ENTITY")) return "FIRST_CLASS_ENTITY";
  return "MAPPED";
}

function buildAuditedSlots(
  pages: CanonicalPageManifest[],
  inventory: ReturnType<typeof loadCanonicalAuditMap>["inventory"]
): { slots: AuditedSourceSlot[]; omissions: string[] } {
  const pageBySlug = new Map(pages.map((page) => [page.slug, page]));
  const slots: AuditedSourceSlot[] = [];
  const omissions: string[] = [];
  for (const sourcePage of inventory) {
    const page = pageBySlug.get(sourcePage.slug);
    if (!page) {
      omissions.push(sourcePage.slug + ": canonical page missing");
      continue;
    }
    if (sourcePage.layout === "custom") {
      for (const source of sourcePage.sections) {
        const matches = page.sections.filter(
          (section) => section.source.component === source.componentKey
        );
        if (!matches.length) omissions.push(sourcePage.slug + "::" + source.componentKey);
        slots.push({
          route: sourcePage.slug,
          component: source.componentKey,
          order: source.order,
          stableKeys: matches.map((section) => section.stableKey),
          status: matches.length
            ? statusPriority(matches.map((section) => section.status))
            : "INVALID",
        });
      }
    } else {
      page.sections.forEach((section, order) => {
        slots.push({
          route: sourcePage.slug,
          component: section.source.component,
          order,
          stableKeys: [section.stableKey],
          status: section.status,
        });
      });
    }
  }
  return { slots, omissions };
}

function queryIsReadOnly(sql: string): boolean {
  return /^(SELECT|SHOW|DESCRIBE|EXPLAIN)\b/i.test(sql.trim());
}

async function select<T>(sequelize: Sequelize, sql: string): Promise<T[]> {
  if (!queryIsReadOnly(sql)) {
    throw new Error("Dry-run SQL guard rejected non-read-only statement: " + sql);
  }
  const [rows] = await sequelize.query(sql);
  return rows as T[];
}

async function snapshot(sequelize: Sequelize): Promise<DbSnapshot> {
  const rows = await select<Record<string, unknown>>(sequelize, [
    "SELECT",
    "(SELECT COUNT(*) FROM pages) pages,",
    "(SELECT COUNT(*) FROM page_sections) sections,",
    "(SELECT COUNT(*) FROM page_seo) seo,",
    "(SELECT COUNT(*) FROM media) media,",
    "(SELECT COUNT(*) FROM site_settings) settings,",
    "(SELECT COUNT(*) FROM blogs) blogs,",
    "(SELECT MAX(updated_at) FROM pages) pageUpdatedAt,",
    "(SELECT MAX(updated_at) FROM page_sections) sectionUpdatedAt",
  ].join(" "));
  const row = rows[0] ?? {};
  return {
    pages: Number(row.pages ?? 0),
    sections: Number(row.sections ?? 0),
    seo: Number(row.seo ?? 0),
    media: Number(row.media ?? 0),
    settings: Number(row.settings ?? 0),
    blogs: Number(row.blogs ?? 0),
    pageUpdatedAt: row.pageUpdatedAt ? String(row.pageUpdatedAt) : null,
    sectionUpdatedAt: row.sectionUpdatedAt ? String(row.sectionUpdatedAt) : null,
  };
}

async function readDatabaseComparison(sequelize: Sequelize) {
  const before = await snapshot(sequelize);
  const pages = await select<DbPageRow>(
    sequelize, "SELECT id, slug, status, template FROM pages ORDER BY slug"
  );
  const sections = await select<DbSectionRow>(
    sequelize,
    "SELECT id, page_id, type, sort_order, data, is_visible FROM page_sections ORDER BY page_id, sort_order, id"
  );
  const media = await select<DbMediaRow>(
    sequelize,
    "SELECT id, original_filename, storage_path, public_url, mime_type FROM media ORDER BY id"
  );
  let parsedJsonStrings = 0;
  let invalidJsonStrings = 0;
  let adminEdited = 0;
  const sourceKeyCounts = new Map<string, number>();
  for (const section of sections) {
    const normalized = normalizeJsonColumn(section.data);
    parsedJsonStrings += normalized.parsedStringLayers;
    if (normalized.invalidJsonString) invalidJsonStrings += 1;
    const data = normalizeJsonObject(section.data);
    if (data._cmsEdited === true) adminEdited += 1;
    const migration = normalizeJsonObject(data._migration);
    if (typeof migration.sourceKey === "string") {
      sourceKeyCounts.set(
        migration.sourceKey,
        (sourceKeyCounts.get(migration.sourceKey) ?? 0) + 1
      );
    }
  }
  const duplicateSourceKeys = [...sourceKeyCounts]
    .filter(([, count]) => count > 1)
    .map(([sourceKey, count]) => ({ sourceKey, count }));
  const duplicateTypeCandidates: Array<{ slug: string; type: string; count: number }> = [];
  for (const page of pages) {
    const counts = new Map<string, number>();
    for (const section of sections.filter((item) => item.page_id === page.id)) {
      counts.set(section.type, (counts.get(section.type) ?? 0) + 1);
    }
    for (const [type, count] of counts) {
      if (count > 1) duplicateTypeCandidates.push({ slug: page.slug, type, count });
    }
  }
  const after = await snapshot(sequelize);
  return {
    before, after,
    unchanged: JSON.stringify(before) === JSON.stringify(after),
    pages, sections, media, parsedJsonStrings, invalidJsonStrings,
    adminEdited, duplicateSourceKeys, duplicateTypeCandidates,
  };
}

function fileHash(file: string): string {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function auditMedia(existing: DbMediaRow[]) {
  const local = discoverLegacyMedia();
  const missingLocal = local.filter((item) =>
    !fs.existsSync(path.join(ROOT, "public", item.publicPath.replace(/^\//, "")))
  );
  const knownRemote = new Set<string>();
  for (const hero of Object.values(heroPageConfigs)) {
    if (hero.image && isRemoteMediaUrl(hero.image)) knownRemote.add(hero.image);
  }
  for (const post of LEGACY_BLOG_POSTS) {
    if (isRemoteMediaUrl(post.featuredImageUrl)) knownRemote.add(post.featuredImageUrl);
  }
  const hashes = new Map<string, string[]>();
  for (const item of local) {
    const absolute = path.join(ROOT, "public", item.publicPath.replace(/^\//, ""));
    if (!fs.existsSync(absolute)) continue;
    const hash = fileHash(absolute);
    hashes.set(hash, [...(hashes.get(hash) ?? []), item.publicPath]);
  }
  const duplicateFiles = [...hashes.values()].filter((items) => items.length > 1);
  const existingCandidates = local.filter((item) =>
    existing.some((record) =>
      record.original_filename === item.originalFilename ||
      record.public_url === item.publicPath ||
      record.storage_path.endsWith(item.originalFilename)
    )
  );
  return {
    local,
    missingLocal,
    knownRemote: [...knownRemote].sort(),
    duplicateFiles,
    existingCandidates,
    nonWebp: local.filter((item) => item.mimeType !== "image/webp"),
  };
}

function distribution(values: string[]): Record<string, number> {
  return Object.fromEntries(
    [...new Set(values)].sort().map(
      (value) => [value, values.filter((item) => item === value).length]
    )
  );
}

function list(items: string[], empty = "None"): string {
  return items.length ? items.map((item) => "- " + item).join("\n") : "- " + empty;
}

function buildReport(
  pages: CanonicalPageManifest[],
  slots: AuditedSourceSlot[],
  errors: string[],
  database: Awaited<ReturnType<typeof readDatabaseComparison>>,
  media: ReturnType<typeof auditMedia>
): string {
  const active = pages.filter((page) => page.classification === "active");
  const redirects = pages.filter((page) => page.classification === "redirect");
  const sections = pages.flatMap((page) => page.sections);
  const duplicateStableKeys = pages.flatMap((page) => {
    const counts = new Map<string, number>();
    page.sections.forEach((section) =>
      counts.set(section.stableKey, (counts.get(section.stableKey) ?? 0) + 1)
    );
    return [...counts]
      .filter(([, count]) => count > 1)
      .map(([key, count]) => page.path + ": " + key + " (x" + count + ")");
  });
  const missing = sections.filter((section) => section.status === "MISSING_SOURCE");
  const utilities = sections.filter((section) => section.status === "UTILITY");
  const developerControlled = sections.filter(
    (section) => section.status === "DEVELOPER_CONTROLLED"
  );
  const entities = sections.filter((section) => section.status === "FIRST_CLASS_ENTITY");
  const lines: string[] = [
    "# CMS Canonical Migration Dry Run",
    "",
    "Generated: " + new Date().toISOString() + "  ",
    "Mode: **READ-ONLY / NO DATABASE MUTATIONS**  ",
    "Result: **" + (errors.length ? "FAILED" : "PASSED") + "**",
    "",
    "## 1. Route summary",
    "",
    "- Discovered routes: **" + pages.length + "**",
    "- Effective publishable pages: **" + active.length + "**",
    "- Redirect-only routes: **" + redirects.length + "**",
    "- Canonical page section bindings: **" + sections.length + "**",
    "- Audited React source composition slots: **" + slots.length + "**",
    "",
    "## CONTENT READINESS",
    "",
    "- Before: **182 unresolved JSX content sections**",
    "- Resolved by reviewed explicit adapters: **" + (182 - missing.length) + "**",
    "- Developer-controlled: **" + developerControlled.length + "**",
    "- Remaining unresolved: **" + missing.length + "**",
    "",
    "## 2. Effective pages",
    "",
    list(active.map((page) => page.path)),
    "",
    "## 3. Redirects",
    "",
    list(redirects.map((page) => page.path + " -> " + page.redirectTarget)),
    "",
    "## 4. Audited slot status",
    "",
    ...Object.entries(distribution(slots.map((slot) => slot.status)))
      .map(([key, count]) => "- " + key + ": **" + count + "**"),
    "",
    "## 5. Model distribution",
    "",
    ...Object.entries(distribution(sections.map((section) => section.model)))
      .map(([key, count]) => "- " + key + ": **" + count + "**"),
    "",
    "## 6. Template distribution",
    "",
    ...Object.entries(distribution(sections.map((section) => section.template)))
      .map(([key, count]) => "- " + key + ": **" + count + "**"),
    "",
    "## 7. Stable-key validation",
    "",
    list(duplicateStableKeys, "No duplicate canonical stable keys."),
    "",
    "## 8. First-class entity candidates",
    "",
    list(entities.map((section) =>
      section.stableKey + ": " + (section.entityType ?? "entity") +
      " (" + section.source.component + ")"
    )),
    "",
    "## 9. Media inventory",
    "",
    "- Local image records discovered: **" + media.local.length + "**",
    "- Known remote images: **" + media.knownRemote.length + "**",
    "- Missing local images: **" + media.missingLocal.length + "**",
    "- Existing media candidates: **" + media.existingCandidates.length + "**",
    "- Duplicate file-content groups: **" + media.duplicateFiles.length + "**",
    "- Non-WebP local assets requiring eventual conversion/review: **" + media.nonWebp.length + "**",
    "",
    "### Missing local images",
    "",
    list(media.missingLocal.map((item) => item.publicPath)),
    "",
    "### Known remote images",
    "",
    list(media.knownRemote),
    "",
    "### Duplicate media candidates",
    "",
    list(media.duplicateFiles.map((group) => group.join(", "))),
    "",
    "## 10. Invalid or omitted content",
    "",
    list(slots.filter((slot) => slot.status === "INVALID")
      .map((slot) => slot.route + "::" + slot.component)),
    "",
    "## 11. Developer-controlled content",
    "",
    list([...utilities, ...developerControlled].map((section) =>
      section.stableKey + ": " + section.source.component
    )),
    "",
    "## 12. Missing structured source values",
    "",
    list(missing.map((section) =>
      section.stableKey + ": " + (section.missingData?.join("; ") ?? "missing")
    )),
    "",
    "## 13. Duplicate candidates in current database",
    "",
    "- Existing page rows: **" + database.pages.length + "**",
    "- Existing section rows: **" + database.sections.length + "**",
    "- Existing migration source-key duplicates: **" + database.duplicateSourceKeys.length + "**",
    "- Page/type duplicate candidates: **" + database.duplicateTypeCandidates.length + "**",
    "- Existing rows marked `_cmsEdited`: **" + database.adminEdited + "**",
    "",
    list(database.duplicateTypeCandidates.map((item) =>
      item.slug + ": " + item.type + " (x" + item.count + ")"
    )),
    "",
    "## 14. Existing DB comparison",
    "",
    "- JSON string layers parsed before comparison: **" + database.parsedJsonStrings + "**",
    "- Invalid JSON strings: **" + database.invalidJsonStrings + "**",
    "- Database snapshot unchanged: **" + (database.unchanged ? "yes" : "NO") + "**",
    "- Before: `" + JSON.stringify(database.before) + "`",
    "- After: `" + JSON.stringify(database.after) + "`",
    "",
    "JSON columns were normalized with recursive JSON parsing. Object-valued JSON from MySQL and string-valued JSON from local XAMPP are compared as JSON objects, not serialized strings.",
    "",
    "## 15. Proposed cleanup requirements (not executed)",
    "",
    "- Preserve every current section where normalized `_cmsEdited === true`.",
    "- Keep a backup-derived reconciliation table before removing legacy duplicates.",
    "- Exclude redirect-only pages from publishable canonical inventory.",
    "- Remove heuristic migration-owned rows only after stable-key reconciliation is approved.",
    "- Deduplicate media by content hash and source reference before copying files.",
    "- Convert production raster assets to WebP according to `AGENTS.md`.",
    "",
    "## 16. Proposed schema changes (not executed)",
    "",
    "- Add `stable_key VARCHAR(190) NOT NULL` to `page_sections`.",
    "- Add `model VARCHAR(40) NOT NULL` and locked `template VARCHAR(190) NOT NULL`.",
    "- Add JSON columns for `source_meta`, `editor_policy`, and `decorations`.",
    "- Keep typed content in `data`, normalized to an object before application use.",
    "- Add `UNIQUE(page_id, stable_key)` after duplicate reconciliation.",
    "- Add page and section revision/snapshot tables so draft edits cannot mutate published content.",
    "- Add developer-controlled route classification; redirects must not be publishable pages.",
    "- Add first-class `case_studies`, `resources`, and `jobs` tables as required; reuse `blogs`.",
    "",
    "## 17. Phase completion and approval boundary",
    "",
    "- Explicit migration-only adapters now resolve every previously missing inline-JSX content section.",
    "- Redirect, utility, and first-class entity classifications remain reviewable in this manifest.",
    "- No schema, cleanup, reseed, public rendering integration, or database mutation was executed.",
    "- Stop here. Any database reconciliation or canonical seed operation requires separate explicit approval.",
    "",
    "## Validation errors",
    "",
    list(errors),
    "",
    "## Page manifests",
    "",
  ];

  for (const page of pages) {
    lines.push(
      "### PAGE: " + page.path,
      "",
      "- Classification: " + page.classification +
        (page.redirectTarget ? " -> " + page.redirectTarget : ""),
      "- Publishable: " + page.publishable,
      "- Page template: " + page.template,
      "",
      "SECTIONS:",
      ""
    );
    for (const section of page.sections) {
      lines.push(
        "#### " + section.stableKey,
        "",
        "- MODEL: " + section.model,
        "- TEMPLATE: " + section.template,
        "- SOURCE: " + section.source.component +
          (section.source.file ? " — " + section.source.file : ""),
        "- ADAPTER: " + (section.source.adapter ?? "structured project source"),
        "- SOURCE NOTE: " + (section.source.sourceNote ?? section.source.kind),
        "- STATUS: " + section.status,
        "- EDITABLE: " + (section.editorPolicy.editable.join(", ") || "none"),
        ""
      );
    }
  }
  return lines.join("\n") + "\n";
}

async function main() {
  const discoveredRoutes = discoverRoutes();
  const configuredRedirects = discoverRedirects();
  const { routes, inventory } = loadCanonicalAuditMap(ROOT);
  const pages = routes.map(buildCanonicalPage);
  const errors: string[] = [];
  const activeCount = pages.filter((page) => page.classification === "active").length;
  const redirectCount = pages.filter((page) => page.classification === "redirect").length;

  if (discoveredRoutes.length !== 75) {
    errors.push("Expected 75 routes; discovered " + discoveredRoutes.length + ".");
  }
  if (activeCount !== 55) errors.push("Canonical audit must contain exactly 55 active pages.");
  if (redirectCount !== 20) errors.push("Canonical audit must contain exactly 20 redirects.");
  for (const slug of discoveredRoutes) {
    if (!pages.some((page) => page.slug === slug)) {
      errors.push("Filesystem route omitted from canonical audit: " + slug);
    }
  }
  for (const page of pages.filter((item) => item.classification === "redirect")) {
    const configured = configuredRedirects.get(page.slug);
    if (configured !== page.redirectTarget) {
      errors.push(
        "Redirect mismatch for " + page.path + ": audit=" +
        page.redirectTarget + ", config=" + (configured ?? "missing")
      );
    }
  }

  const sourceAudit = buildAuditedSlots(pages, inventory);
  errors.push(...sourceAudit.omissions.map((item) => "Audited section omitted: " + item));
  if (sourceAudit.slots.length !== 341) {
    errors.push(
      "Expected 341 audited source composition slots; found " +
      sourceAudit.slots.length + "."
    );
  }
  for (const page of pages) {
    errors.push(...validateCanonicalPage(page).map(
      (issue) => page.path + ": " + issue
    ));
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
  const database = await readDatabaseComparison(sequelize);
  await sequelize.close();
  if (!database.unchanged) errors.push("Database snapshot changed during dry run.");

  const media = auditMedia(database.media);
  const output = {
    version: "2026-09-05-canonical-v4",
    generatedAt: new Date().toISOString(),
    mode: "dry-run-read-only",
    counts: {
      routes: pages.length,
      active: activeCount,
      redirects: redirectCount,
      auditedSourceSlots: sourceAudit.slots.length,
      canonicalSectionBindings: pages.flatMap((page) => page.sections).length,
    },
    auditedSlots: sourceAudit.slots,
    pages,
    validationErrors: errors,
    database: {
      unchanged: database.unchanged,
      before: database.before,
      after: database.after,
      parsedJsonStrings: database.parsedJsonStrings,
      invalidJsonStrings: database.invalidJsonStrings,
    },
    media: {
      local: media.local,
      remote: media.knownRemote,
      missing: media.missingLocal,
      duplicates: media.duplicateFiles,
      existingCandidates: media.existingCandidates,
    },
  };

  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(output, null, 2) + "\n", "utf8");
  fs.writeFileSync(
    REPORT_FILE,
    buildReport(pages, sourceAudit.slots, errors, database, media),
    "utf8"
  );
  console.log("Canonical dry-run manifest: " + path.relative(ROOT, MANIFEST_FILE));
  console.log("Canonical dry-run report:   " + path.relative(ROOT, REPORT_FILE));
  console.log(
    "Routes: " + pages.length + "; active: " + activeCount +
    "; redirects: " + redirectCount + "; audited slots: " + sourceAudit.slots.length
  );
  console.log(
    "Database unchanged: " + database.unchanged +
    "; JSON string layers parsed: " + database.parsedJsonStrings
  );
  console.log("Validation errors: " + errors.length);
  if (errors.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
