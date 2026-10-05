import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import { buildCanonicalPreviewPayload } from "../src/cms/preview/resolve";
import { ensureCmsDatabaseReady } from "../src/lib/cms/db";
import { getDbModels } from "../src/lib/db/models";

dotenv.config({ path: ".env.local" });
dotenv.config();

async function main() {
  await ensureCmsDatabaseReady();
  const { Page } = getDbModels();
  const pages = await Page.findAll({ order: [["slug", "ASC"]] });
  const active = pages.filter((page) => (page.classification ?? "active") === "active");

  const results = [];
  const missingAdapters: Array<Record<string, unknown>> = [];
  const mediaMissing: Array<Record<string, unknown>> = [];
  const unresolvedEntities: Array<Record<string, unknown>> = [];
  const failedPages: Array<Record<string, unknown>> = [];
  let servicesHero: Record<string, unknown> | null = null;

  for (const page of active) {
    try {
      const payload = await buildCanonicalPreviewPayload(page.id);
      if (!payload) {
        failedPages.push({ slug: page.slug, error: "payload null" });
        continue;
      }
      const pageMissing = payload.sections.filter(
        (section) => !section.adapterId && section.model !== "UTILITY"
      );
      const pageMedia = payload.sections.filter((section) => section.media.missing);
      const pageEntities = payload.sections.flatMap((section) =>
        section.entities.filter((entity) => !entity.resolved)
      );
      missingAdapters.push(
        ...pageMissing.map((section) => ({
          slug: page.slug,
          template: section.template,
          stableKey: section.stableKey,
          model: section.model,
          component: section.sourceComponent,
        }))
      );
      mediaMissing.push(
        ...pageMedia.map((section) => ({
          slug: page.slug,
          template: section.template,
          missing: section.media.missing,
        }))
      );
      unresolvedEntities.push(
        ...pageEntities.map((entity) => ({ slug: page.slug, ...entity }))
      );
      if (page.slug === "services") {
        const hero = payload.sections.find(
          (section) => section.id === 200 || section.stableKey === "services.hero"
        );
        if (hero) {
          servicesHero = {
            id: hero.id,
            stableKey: hero.stableKey,
            template: hero.template,
            adapterId: hero.adapterId,
            dataOrigin: hero.dataOrigin,
            preservedRowId: hero.preservedRowId,
            title: hero.data.title,
            imageId: hero.data.imageId,
            mediaUrl: hero.media.url,
            mediaMissing: hero.media.missing ?? null,
          };
        }
      }
      results.push({
        slug: page.slug,
        id: page.id,
        status: payload.page.status,
        sections: payload.sections.length,
        adapters: payload.sections.filter((section) => section.adapterId).length,
        missing: pageMissing.length,
        seo: Boolean(payload.seo?.metaTitle),
      });
    } catch (error) {
      failedPages.push({
        slug: page.slug,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  const report = {
    activePages: active.length,
    testedPages: results.length,
    failedPages,
    totalSections: results.reduce((sum, item) => sum + item.sections, 0),
    missingAdapters,
    mediaMissing,
    unresolvedEntities,
    servicesHero,
    pages: results,
  };
  fs.writeFileSync(
    path.join(process.cwd(), "CMS_CANONICAL_V4_ADMIN_PREVIEW_AUDIT.json"),
    JSON.stringify(report, null, 2)
  );
  console.log(
    JSON.stringify(
      {
        activePages: report.activePages,
        testedPages: report.testedPages,
        failedPages: report.failedPages,
        totalSections: report.totalSections,
        missingAdapters: report.missingAdapters.length,
        mediaMissing: report.mediaMissing.length,
        unresolvedEntities: report.unresolvedEntities.length,
        servicesHero: report.servicesHero,
      },
      null,
      2
    )
  );
  if (failedPages.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
