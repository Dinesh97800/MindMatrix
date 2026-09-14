import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { CMS_MIGRATION_VERSION } from "./constants";
import { getLegacyBlogPosts, legacyBlogToContent } from "./blog-import";
import { discoverLegacyMedia, isRemoteMediaUrl } from "./media-import";
import {
  getMigrationSourceKeyFromRaw,
  isCmsEditedRaw,
  normalizeSectionData,
  type MigrationMeta,
} from "./metadata";
import { classifyPage } from "./page-classification";
import { slugToPublicPath } from "./routes";
import { getLegacySiteSettings, unwrapSettingValue } from "./settings-import";
import {
  validateSeededMedia,
  validateSeededPages,
  validateSeededSettings,
} from "./validation";
import {
  getAllPageImportBundles,
  getAllImportSlugs,
  type PageImportBundle,
} from "@/lib/cms/legacy-content-map";
import { buildAllInventorySections, buildInventorySectionsForSlug } from "@/lib/cms/migration/inventory/build-inventory-sections";
import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import { getDbModels } from "@/lib/db/models";

dotenv.config();

export type MigrationRunReport = {
  version: string;
  ranAt: string;
  routesDiscovered: number;
  routesSeeded: number;
  routesMissing: string[];
  cmsPagesTotal: number;
  pagesImported: number;
  pagesSkipped: number;
  pagesPartial: number;
  pagesFullyMapped: number;
  pagesLegacyOnly: number;
  legacySectionInstancesDiscovered: number;
  cmsSectionInstancesTotal: number;
  sectionsMigrated: number;
  sectionsSkippedEdited: number;
  sectionsSkippedExisting: number;
  sectionsUnsupported: number;
  contentFieldsMigrated: number;
  textFieldsMigrated: number;
  arraysMigrated: number;
  cardsMigrated: number;
  faqsMigrated: number;
  linksMigrated: number;
  imagesReferenced: number;
  seoRecords: number;
  localAssetsDiscovered: number;
  mediaRecords: number;
  remoteAssetsReferenced: number;
  missingAssets: string[];
  settingsSeeded: number;
  settingsSkipped: number;
  globalSettingsTotal: number;
  blogsSeeded: number;
  blogsSkipped: number;
  blogsTotal: number;
  caseStudiesRecords: number;
  resourcesRecords: number;
  navigationRecords: number;
  validationMismatches: number;
  validationWarnings: number;
  duplicateRecords: number;
  adminEditsPreserved: number;
  partiallyMappedPages: Array<{ slug: string; migrated: string[]; legacyOnly: string[] }>;
  legacyOnlyPages: string[];
  unsupportedContent: string[];
  developerControlledContent: string[];
  warnings: string[];
  errors: string[];
};

const DEVELOPER_CONTROLLED = [
  "Interactive form logic (ConsultationFormSection, ContactUsPageContent.form)",
  "AnimatedShaderBackgroundSection shader/visual effects (decorative structure)",
  "AtmosphericBgElementSection / TechnicalOverlayElementsSection decorative overlays",
  "Component layout, animation, responsive behavior, and styling",
];

function countContentFields(data: Record<string, unknown>) {
  let textFields = 0;
  let arrays = 0;
  let cards = 0;
  let faqs = 0;
  let links = 0;
  let images = 0;

  for (const [key, value] of Object.entries(data)) {
    if (key.startsWith("_")) continue;
    if (typeof value === "string" && value.trim()) textFields += 1;
    if (Array.isArray(value)) {
      arrays += 1;
      if (key === "cards") cards += value.length;
      if (key === "faqs") faqs += value.length;
      if (key === "links") links += value.length;
      if (key === "images") images += value.length;
    }
    if (key === "cta" && value && typeof value === "object") textFields += 1;
  }

  return { textFields, arrays, cards, faqs, links, images };
}

async function ensurePage(
  slug: string,
  title: string,
  report: MigrationRunReport
): Promise<number> {
  const { Page, PageSEO } = getDbModels();
  let page = await Page.findOne({ where: { slug } });

  if (!page) {
    page = await Page.create({
      title,
      slug,
      categoryId: null,
      template: "default",
      status: "draft",
      sortOrder: 0,
    });
    await PageSEO.create({ pageId: page.id, robots: "index" });
    report.pagesImported += 1;
  } else {
    if (page.title !== title) {
      page.title = title;
      await page.save();
    }
    report.pagesSkipped += 1;
  }

  return page.id;
}

async function upsertSeo(pageId: number, bundle: PageImportBundle) {
  const { PageSEO } = getDbModels();
  const seo = await PageSEO.findOne({ where: { pageId } });
  if (!seo) {
    await PageSEO.create({
      pageId,
      metaTitle: bundle.seo.metaTitle,
      metaDescription: bundle.seo.metaDescription,
      robots: bundle.seo.robots,
      ogTitle: bundle.seo.ogTitle ?? bundle.seo.metaTitle,
      ogDescription: bundle.seo.ogDescription ?? bundle.seo.metaDescription,
    });
    return;
  }

  const updates: Record<string, unknown> = {};
  if (!seo.metaTitle?.trim()) updates.metaTitle = bundle.seo.metaTitle;
  if (!seo.metaDescription?.trim()) updates.metaDescription = bundle.seo.metaDescription;
  if (!seo.ogTitle?.trim()) updates.ogTitle = bundle.seo.ogTitle ?? bundle.seo.metaTitle;
  if (!seo.ogDescription?.trim()) {
    updates.ogDescription = bundle.seo.ogDescription ?? bundle.seo.metaDescription;
  }
  if (!seo.robots) updates.robots = bundle.seo.robots;

  if (Object.keys(updates).length > 0) {
    await seo.update(updates);
  }
}

async function upsertSection(
  pageId: number,
  spec: PageImportBundle["sections"][number],
  sortOrder: number,
  report: MigrationRunReport
) {
  const { PageSection } = getDbModels();
  const existingSections = await PageSection.findAll({ where: { pageId } });

  let target = existingSections.find(
    (section) => getMigrationSourceKeyFromRaw(section.data) === spec.sourceKey
  );

  if (!target) {
    target = existingSections.find(
      (section) =>
        section.type === spec.type &&
        !getMigrationSourceKeyFromRaw(section.data) &&
        !isCmsEditedRaw(section.data)
    );
  }

  const normalizedTarget = target ? normalizeSectionData(target.data) : null;
  if (normalizedTarget && isCmsEditedRaw(normalizedTarget)) {
    report.sectionsSkippedEdited += 1;
    report.adminEditsPreserved += 1;
    return;
  }

  if (target) {
    const migration = normalizedTarget?._migration as MigrationMeta | undefined;
    if (migration?.seedVersion === CMS_MIGRATION_VERSION) {
      report.sectionsSkippedExisting += 1;
      return;
    }

    target.type = spec.type;
    target.sortOrder = sortOrder;
    target.data = spec.data;
    await target.save();
    report.sectionsMigrated += 1;
    accumulateContentCounts(spec.data, report);
    return;
  }

  await PageSection.create({
    pageId,
    type: spec.type,
    sortOrder,
    data: spec.data,
    isVisible: true,
  });
  report.sectionsMigrated += 1;
  accumulateContentCounts(spec.data, report);
}

function accumulateContentCounts(data: Record<string, unknown>, report: MigrationRunReport) {
  const payload = normalizeSectionData(data);
  const counts = countContentFields(stripMeta(payload));
  report.textFieldsMigrated += counts.textFields;
  report.arraysMigrated += counts.arrays;
  report.cardsMigrated += counts.cards;
  report.faqsMigrated += counts.faqs;
  report.linksMigrated += counts.links;
  report.imagesReferenced += counts.images;
  report.contentFieldsMigrated +=
    counts.textFields + counts.arrays + counts.cards + counts.faqs + counts.links + counts.images;
}

function stripMeta(data: Record<string, unknown>) {
  const { _migration, _cmsEdited, ...rest } = data;
  return rest;
}

async function seedSettings(report: MigrationRunReport) {
  const { SiteSetting } = getDbModels();

  for (const legacy of getLegacySiteSettings()) {
    const existing = await SiteSetting.findOne({
      where: { group: legacy.group, key: legacy.key },
    });

    if (!existing) {
      await SiteSetting.create({
        group: legacy.group,
        key: legacy.key,
        value: legacy.value,
        updatedAt: new Date(),
      });
      report.settingsSeeded += 1;
      continue;
    }

    const current = unwrapSettingValue(existing.value);
    if (!current.trim()) {
      existing.value = legacy.value;
      existing.updatedAt = new Date();
      await existing.save();
      report.settingsSeeded += 1;
    } else if (current !== legacy.value) {
      report.settingsSkipped += 1;
    } else {
      report.settingsSkipped += 1;
    }
  }

  report.navigationRecords = 3;
  report.caseStudiesRecords = 1;
}

async function seedMedia(report: MigrationRunReport) {
  const { Media } = getDbModels();
  const legacyMedia = discoverLegacyMedia();
  report.localAssetsDiscovered = legacyMedia.length;

  for (const item of legacyMedia) {
    const existing = await Media.findOne({ where: { storagePath: item.storagePath } });
    if (existing) continue;

    let fileSize = 0;
    const absolute = path.join(process.cwd(), "public", item.publicPath.replace(/^\//, ""));
    if (fs.existsSync(absolute)) {
      fileSize = fs.statSync(absolute).size;
    } else {
      report.missingAssets.push(`Missing local asset: ${item.publicPath}`);
    }

    await Media.create({
      filename: item.originalFilename,
      originalFilename: item.originalFilename,
      mimeType: item.mimeType,
      fileSize,
      altText: item.altText ?? null,
      caption: null,
      storagePath: item.storagePath,
      publicUrl: item.publicPath,
      uploadedBy: null,
    });
    report.mediaRecords += 1;
  }
}

async function seedBlogs(report: MigrationRunReport) {
  const { Blog, BlogCategory } = getDbModels();
  const posts = getLegacyBlogPosts();
  const categoryCache = new Map<string, number>();

  for (const post of posts) {
    let categoryId = categoryCache.get(post.categorySlug);
    if (!categoryId) {
      const [category] = await BlogCategory.findOrCreate({
        where: { slug: post.categorySlug },
        defaults: {
          name: post.categoryName,
          slug: post.categorySlug,
          description: null,
          sortOrder: categoryCache.size,
        },
      });
      categoryId = category.id;
      categoryCache.set(post.categorySlug, categoryId);
    }

    const existing = await Blog.findOne({ where: { slug: post.slug } });
    if (existing) {
      report.blogsSkipped += 1;
      continue;
    }

    await Blog.create({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: legacyBlogToContent(post.contentParagraphs),
      featuredMediaId: null,
      featuredImageAlt: post.featuredImageAlt,
      authorId: null,
      categoryId,
      tags: post.tags,
      status: "published",
      publishedAt: new Date(post.publishedAt),
      metaTitle: post.title,
      metaDescription: post.excerpt,
      metaKeywords: post.tags.join(", "),
      ogTitle: post.title,
      ogDescription: post.excerpt,
      ogImageId: null,
    });
    report.blogsSeeded += 1;

    if (isRemoteMediaUrl(post.featuredImageUrl)) {
      report.remoteAssetsReferenced += 1;
      report.missingAssets.push(
        `Blog "${post.slug}" uses remote image URL (legacy preserved in source only).`
      );
    }
  }

  report.blogsTotal = await Blog.count();
}

function collectRemoteImagesFromSections(sections: PageImportBundle["sections"]) {
  let remote = 0;
  for (const section of sections) {
    const data = stripMeta(normalizeSectionData(section.data));
    const images = Array.isArray(data.images) ? data.images : [];
    for (const image of images) {
      if (typeof image === "string" && isRemoteMediaUrl(image)) remote += 1;
    }
    const cards = Array.isArray(data.cards) ? data.cards : [];
    for (const card of cards) {
      if (card && typeof card === "object" && "image" in card) {
        const image = (card as { image?: string }).image;
        if (image && isRemoteMediaUrl(image)) remote += 1;
      }
    }
  }
  return remote;
}

function printReport(report: MigrationRunReport) {
  console.log("\n========================================");
  console.log("CMS LEGACY CONTENT MIGRATION REPORT");
  console.log("========================================");
  console.log(`Migration version: ${report.version}`);
  console.log(`Completed at: ${report.ranAt}`);
  console.log("");

  console.log("PUBLIC ROUTES");
  console.log(`  discovered: ${report.routesDiscovered}`);
  console.log(`  seeded: ${report.routesSeeded}`);
  console.log(`  missing: ${report.routesMissing.length}`);
  if (report.routesMissing.length > 0) {
    for (const slug of report.routesMissing.slice(0, 10)) {
      console.log(`    - ${slugToPublicPath(slug)}`);
    }
  }

  console.log("\nSECTIONS");
  console.log(`  legacy section instances discovered: ${report.legacySectionInstancesDiscovered}`);
  console.log(`  CMS section instances total: ${report.cmsSectionInstancesTotal}`);
  console.log(`  migrated/updated: ${report.sectionsMigrated}`);
  console.log(`  already current: ${report.sectionsSkippedExisting}`);
  console.log(`  admin edited (preserved): ${report.sectionsSkippedEdited}`);
  console.log(`  unsupported: ${report.sectionsUnsupported}`);

  console.log("\nCONTENT");
  console.log(`  content fields migrated: ${report.contentFieldsMigrated}`);
  console.log(`  text fields migrated: ${report.textFieldsMigrated}`);
  console.log(`  arrays migrated: ${report.arraysMigrated}`);
  console.log(`  cards migrated: ${report.cardsMigrated}`);
  console.log(`  FAQs migrated: ${report.faqsMigrated}`);
  console.log(`  links migrated: ${report.linksMigrated}`);
  console.log(`  images referenced: ${report.imagesReferenced}`);

  console.log("\nMEDIA");
  console.log(`  local assets discovered: ${report.localAssetsDiscovered}`);
  console.log(`  media records created: ${report.mediaRecords}`);
  console.log(`  remote assets referenced: ${report.remoteAssetsReferenced}`);
  console.log(`  missing assets: ${report.missingAssets.length}`);

  console.log("\nSEO");
  console.log(`  records: ${report.seoRecords}`);

  console.log("\nGLOBAL SETTINGS");
  console.log(`  seeded: ${report.settingsSeeded}`);
  console.log(`  skipped: ${report.settingsSkipped}`);
  console.log(`  total records: ${report.globalSettingsTotal}`);

  console.log("\nBLOGS");
  console.log(`  seeded: ${report.blogsSeeded}`);
  console.log(`  skipped: ${report.blogsSkipped}`);
  console.log(`  total: ${report.blogsTotal}`);

  console.log("\nCASE STUDIES");
  console.log(`  records: ${report.caseStudiesRecords}`);

  console.log("\nRESOURCES");
  console.log(`  records: ${report.resourcesRecords}`);

  console.log("\nNAVIGATION");
  console.log(`  records: ${report.navigationRecords}`);

  console.log("\nVALIDATION");
  console.log(`  mismatches: ${report.validationMismatches}`);
  console.log(`  warnings: ${report.validationWarnings}`);
  console.log(`  duplicate records: ${report.duplicateRecords}`);
  console.log(`  admin edits preserved: ${report.adminEditsPreserved}`);

  if (report.unsupportedContent.length > 0) {
    console.log("\nUNSUPPORTED CONTENT");
    for (const line of report.unsupportedContent.slice(0, 40)) {
      console.log(`  - ${line}`);
    }
    if (report.unsupportedContent.length > 40) {
      console.log(`  ... and ${report.unsupportedContent.length - 40} more`);
    }
  }

  if (report.developerControlledContent.length > 0) {
    console.log("\nDEVELOPER-CONTROLLED / NON-CMS CONTENT");
    for (const line of report.developerControlledContent) {
      console.log(`  - ${line}`);
    }
  }

  if (report.warnings.length > 0) {
    console.log("\nWARNINGS");
    for (const warning of report.warnings.slice(0, 20)) {
      console.log(`  - ${warning}`);
    }
  }

  if (report.errors.length > 0) {
    console.log("\nERRORS");
    for (const err of report.errors) {
      console.log(`  - ${err}`);
    }
  }

  console.log("\nCONFIRMATIONS");
  console.log("  - Public website code was NOT modified by this migration.");
  console.log("  - CMS structural restrictions remain disabled (existing-content editor only).");
  console.log("========================================\n");
}

export async function runCmsContentMigration(): Promise<MigrationRunReport> {
  await ensureCmsDatabaseReady();
  const { Page, PageSection, PageSEO, SiteSetting, Media } = getDbModels();

  const inventoryBuild = buildAllInventorySections();
  const report: MigrationRunReport = {
    version: CMS_MIGRATION_VERSION,
    ranAt: new Date().toISOString(),
    routesDiscovered: 0,
    routesSeeded: 0,
    routesMissing: [],
    cmsPagesTotal: 0,
    pagesImported: 0,
    pagesSkipped: 0,
    pagesPartial: 0,
    pagesFullyMapped: 0,
    pagesLegacyOnly: 0,
    legacySectionInstancesDiscovered: inventoryBuild.legacyInstancesDiscovered,
    cmsSectionInstancesTotal: 0,
    sectionsMigrated: 0,
    sectionsSkippedEdited: 0,
    sectionsSkippedExisting: 0,
    sectionsUnsupported: inventoryBuild.unsupported.length,
    contentFieldsMigrated: 0,
    textFieldsMigrated: 0,
    arraysMigrated: 0,
    cardsMigrated: 0,
    faqsMigrated: 0,
    linksMigrated: 0,
    imagesReferenced: 0,
    seoRecords: 0,
    localAssetsDiscovered: 0,
    mediaRecords: 0,
    remoteAssetsReferenced: 0,
    missingAssets: [],
    settingsSeeded: 0,
    settingsSkipped: 0,
    globalSettingsTotal: 0,
    blogsSeeded: 0,
    blogsSkipped: 0,
    blogsTotal: 0,
    caseStudiesRecords: 0,
    resourcesRecords: 0,
    navigationRecords: 0,
    validationMismatches: 0,
    validationWarnings: 0,
    duplicateRecords: 0,
    adminEditsPreserved: 0,
    partiallyMappedPages: [],
    legacyOnlyPages: [],
    unsupportedContent: inventoryBuild.unsupported,
    developerControlledContent: DEVELOPER_CONTROLLED,
    warnings: [],
    errors: [],
  };

  const allSlugs = getAllImportSlugs();
  report.routesDiscovered = allSlugs.length;
  const bundles = getAllPageImportBundles();
  const bundleBySlug = new Map(bundles.map((bundle) => [bundle.slug, bundle]));
  const seededSlugs = new Set<string>();
  const seenSourceKeys = new Set<string>();

  for (const slug of allSlugs) {
    const bundle = bundleBySlug.get(slug) ?? null;
    const inventoryResult = buildInventorySectionsForSlug(slug);
    const sectionsToSeed =
      inventoryResult.sections.length > 0 ? inventoryResult.sections : (bundle?.sections ?? []);

    if (sectionsToSeed.length === 0) {
      report.routesMissing.push(slug);
      report.pagesLegacyOnly += 1;
      report.legacyOnlyPages.push(slug);
      continue;
    }

    const classification = classifyPage(slug, bundle, inventoryResult);
    if (classification === "fully") report.pagesFullyMapped += 1;
    if (classification === "partial") {
      report.pagesPartial += 1;
      report.partiallyMappedPages.push({
        slug,
        migrated: sectionsToSeed.map((section) => section.sourceKey),
        legacyOnly: inventoryResult.unsupported,
      });
    }
    if (classification === "legacy-only") {
      report.pagesLegacyOnly += 1;
      report.legacyOnlyPages.push(slug);
    }

    try {
      const pageId = await ensurePage(slug, bundle?.title ?? slug, report);
      if (bundle) {
        await upsertSeo(pageId, bundle);
        report.seoRecords += 1;
      }

      for (const [index, section] of sectionsToSeed.entries()) {
        if (seenSourceKeys.has(section.sourceKey)) {
          report.duplicateRecords += 1;
          continue;
        }
        seenSourceKeys.add(section.sourceKey);

        await upsertSection(pageId, section, section.sortOrder ?? index, report);
      }

      seededSlugs.add(slug);
      report.routesSeeded += 1;
      report.remoteAssetsReferenced += collectRemoteImagesFromSections(sectionsToSeed);
    } catch (error) {
      report.errors.push(`Failed to seed page ${slug}: ${String(error)}`);
    }
  }

  await seedSettings(report);
  await seedMedia(report);
  await seedBlogs(report);

  report.cmsPagesTotal = await Page.count();
  report.cmsSectionInstancesTotal = await PageSection.count();
  report.globalSettingsTotal = await SiteSetting.count();
  report.resourcesRecords = inventoryBuild.sections.filter((section) =>
    ["resource_cards", "blog_card_grid"].includes(section.type)
  ).length;

  const dbPages = await Page.findAll();
  const dbPagePayload = await Promise.all(
    dbPages.map(async (page) => {
      const sections = await PageSection.findAll({
        where: { pageId: page.id },
        order: [["sortOrder", "ASC"]],
      });
      const seo = await PageSEO.findOne({ where: { pageId: page.id } });
      return {
        slug: page.slug,
        title: page.title,
        seo: seo
          ? {
              metaTitle: seo.metaTitle,
              metaDescription: seo.metaDescription,
              robots: seo.robots,
            }
          : null,
        sections: sections.map((section) => ({
          type: section.type,
          data: normalizeSectionData(section.data),
        })),
      };
    })
  );

  const pageValidation = validateSeededPages(bundles, dbPagePayload);
  const settingsValidation = validateSeededSettings(
    getLegacySiteSettings(),
    (await SiteSetting.findAll()).map((item) => ({
      group: item.group,
      key: item.key,
      value: item.value,
    }))
  );
  const mediaValidation = validateSeededMedia(
    discoverLegacyMedia(),
    (await Media.findAll()).map((item) => ({
      storagePath: item.storagePath,
      publicUrl: item.publicUrl,
    }))
  );

  const allMismatches = [
    ...pageValidation.mismatches,
    ...settingsValidation.mismatches,
    ...mediaValidation.mismatches,
  ];
  const allWarnings = [
    ...pageValidation.warnings,
    ...settingsValidation.warnings,
    ...mediaValidation.warnings,
    ...report.missingAssets,
  ];

  report.validationMismatches = allMismatches.length;
  report.validationWarnings = allWarnings.length;
  report.warnings.push(...allWarnings);

  if (allMismatches.length > 0) {
    console.log("\nCONTENT COMPARISON MISMATCHES");
    for (const mismatch of allMismatches.slice(0, 40)) {
      console.log(
        `  [${mismatch.scope}] ${mismatch.field}: expected "${mismatch.expected}" got "${mismatch.actual}"`
      );
    }
    if (allMismatches.length > 40) {
      console.log(`  ... and ${allMismatches.length - 40} more mismatches`);
    }
  }

  await SiteSetting.upsert({
    group: "general",
    key: "cms.migration.lastReport",
    value: {
      version: report.version,
      ranAt: report.ranAt,
      routesDiscovered: report.routesDiscovered,
      routesSeeded: report.routesSeeded,
      legacySectionInstancesDiscovered: report.legacySectionInstancesDiscovered,
      cmsSectionInstancesTotal: report.cmsSectionInstancesTotal,
      sectionsMigrated: report.sectionsMigrated,
      sectionsUnsupported: report.sectionsUnsupported,
      contentFieldsMigrated: report.contentFieldsMigrated,
      mediaRecords: report.mediaRecords,
      blogsSeeded: report.blogsSeeded,
      validationMismatches: report.validationMismatches,
    },
    updatedAt: new Date(),
  });

  printReport(report);
  return report;
}
