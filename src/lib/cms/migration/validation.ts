import type { PageImportBundle } from "@/lib/cms/legacy-content-map";
import { unwrapSettingValue, type SettingSeedSpec } from "./settings-import";
import type { LegacyMediaSpec } from "./media-import";
import { normalizeSectionData } from "./metadata";

export type ContentMismatch = {
  scope: string;
  field: string;
  expected: string;
  actual: string;
};

export type MigrationValidationReport = {
  mismatches: ContentMismatch[];
  warnings: string[];
};

function normalize(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value).replace(/\s+/g, " ").trim();
}

function compareField(
  mismatches: ContentMismatch[],
  scope: string,
  field: string,
  expected: unknown,
  actual: unknown
) {
  const exp = normalize(expected);
  const act = normalize(actual);
  if (!exp && !act) return;
  if (exp !== act) {
    mismatches.push({ scope, field, expected: exp, actual: act });
  }
}

export function validateSeededPages(
  bundles: PageImportBundle[],
  dbPages: Array<{
    slug: string;
    title: string;
    seo: { metaTitle: string | null; metaDescription: string | null; robots: string | null } | null;
    sections: Array<{ type: string; data: Record<string, unknown> }>;
  }>
): MigrationValidationReport {
  const mismatches: ContentMismatch[] = [];
  const warnings: string[] = [];
  const dbBySlug = new Map(dbPages.map((page) => [page.slug, page]));

  for (const bundle of bundles) {
    const dbPage = dbBySlug.get(bundle.slug);
    if (!dbPage) {
      warnings.push(`Page missing in CMS after seed: ${bundle.slug}`);
      continue;
    }

    compareField(mismatches, bundle.slug, "page.title", bundle.title, dbPage.title);
    compareField(
      mismatches,
      bundle.slug,
      "seo.metaTitle",
      bundle.seo.metaTitle,
      dbPage.seo?.metaTitle
    );
    compareField(
      mismatches,
      bundle.slug,
      "seo.metaDescription",
      bundle.seo.metaDescription,
      dbPage.seo?.metaDescription
    );
    compareField(
      mismatches,
      bundle.slug,
      "seo.robots",
      bundle.seo.robots,
      dbPage.seo?.robots
    );

    for (const spec of bundle.sections) {
      const dbSection =
        dbPage.sections.find((section) => {
          const migration = normalizeSectionData(section.data)._migration as
            | { sourceKey?: string }
            | undefined;
          return migration?.sourceKey === spec.sourceKey;
        }) ?? dbPage.sections.find((section) => section.type === spec.type);
      if (!dbSection) {
        warnings.push(`Section type "${spec.type}" missing for page ${bundle.slug}`);
        continue;
      }

      const data = normalizeSectionData(dbSection.data);
      const legacy = spec.data;

      if (spec.type === "hero") {
        compareField(mismatches, `${bundle.slug}:hero`, "title", legacy.title, data.title);
        compareField(mismatches, `${bundle.slug}:hero`, "description", legacy.description, data.description);
        compareField(mismatches, `${bundle.slug}:hero`, "ctaText", legacy.ctaText, data.ctaText);
        compareField(mismatches, `${bundle.slug}:hero`, "ctaUrl", legacy.ctaUrl, data.ctaUrl);
        compareField(mismatches, `${bundle.slug}:hero`, "imageUrl", legacy.imageUrl, data.imageUrl);
      }

      if (spec.type === "capabilities") {
        compareField(mismatches, `${bundle.slug}:capabilities`, "heading", legacy.heading, data.heading);
        const expectedItems = Array.isArray(legacy.items) ? legacy.items.map(String).join("|") : "";
        const actualItems = Array.isArray(data.items) ? data.items.map(String).join("|") : "";
        compareField(mismatches, `${bundle.slug}:capabilities`, "items", expectedItems, actualItems);
      }

      if (spec.type === "cta") {
        compareField(mismatches, `${bundle.slug}:cta`, "title", legacy.title, data.title);
        compareField(mismatches, `${bundle.slug}:cta`, "description", legacy.description, data.description);
        compareField(mismatches, `${bundle.slug}:cta`, "buttonText", legacy.buttonText, data.buttonText);
        compareField(mismatches, `${bundle.slug}:cta`, "buttonUrl", legacy.buttonUrl, data.buttonUrl);
      }
    }
  }

  return { mismatches, warnings };
}

export function validateSeededSettings(
  legacySettings: SettingSeedSpec[],
  dbSettings: Array<{ group: string; key: string; value: unknown }>
): MigrationValidationReport {
  const mismatches: ContentMismatch[] = [];
  const warnings: string[] = [];

  for (const legacy of legacySettings) {
    const existing = dbSettings.find(
      (item) => item.group === legacy.group && item.key === legacy.key
    );
    if (!existing) {
      warnings.push(`Setting missing after seed: ${legacy.group}.${legacy.key}`);
      continue;
    }
    compareField(
      mismatches,
      `${legacy.group}.${legacy.key}`,
      "value",
      legacy.value,
      unwrapSettingValue(existing.value)
    );
  }

  return { mismatches, warnings };
}

export function validateSeededMedia(
  legacyMedia: LegacyMediaSpec[],
  dbMedia: Array<{ storagePath: string; publicUrl: string }>
): MigrationValidationReport {
  const mismatches: ContentMismatch[] = [];
  const warnings: string[] = [];
  const byStorage = new Map(dbMedia.map((item) => [item.storagePath, item]));

  for (const item of legacyMedia) {
    const existing = byStorage.get(item.storagePath);
    if (!existing) {
      warnings.push(`Media missing after seed: ${item.sourceKey}`);
      continue;
    }
    compareField(mismatches, item.sourceKey, "publicUrl", item.publicPath, existing.publicUrl);
  }

  return { mismatches, warnings };
}
