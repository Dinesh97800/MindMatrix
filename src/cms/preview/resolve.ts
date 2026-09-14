import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import { normalizeJsonObject } from "@/lib/cms/canonical/json";
import { isRemoteMediaUrl } from "@/lib/cms/migration/media-import";
import {
  serializePage,
  serializePageSection,
  serializePageSeo,
} from "@/lib/cms/serializers";
import { getDbModels } from "@/lib/db/models";
import type { PageSection } from "@/lib/db/models/PageSection";
import type { PageSEO } from "@/lib/db/models/PageSEO";
import { resolvePreviewAdapterId } from "./adapter-id";
import {
  asActions,
  asCards,
  asRecord,
  asString,
  firstString,
  mediaCandidate,
} from "./content";
import type {
  PreviewEntity,
  PreviewMedia,
  PreviewPagePayload,
  PreviewSectionPayload,
} from "./types";

function dataOrigin(data: Record<string, unknown>): PreviewSectionPayload["dataOrigin"] {
  if (data._cmsEdited === true || data._preservedRowId) return "admin-edited";
  return "migrated-seed";
}

function collectIssues(data: Record<string, unknown>, model: string): string[] {
  const issues: string[] = [];
  if (model === "HERO" && !firstString(data.title)) issues.push("HERO is missing title");
  if (model === "CTA" && !firstString(data.title, data.heading)) issues.push("CTA is missing title");
  if (model === "UTILITY") issues.push("UTILITY bindings are not previewable CMS content");
  return issues;
}

export async function buildCanonicalPreviewPayload(pageId: number): Promise<PreviewPagePayload | null> {
  await ensureCmsDatabaseReady();
  const { Page, PageSection, PageSEO, Media, CaseStudy, Blog, Job, Resource } =
    getDbModels();

  const page = await Page.findByPk(pageId, {
    include: [
      { model: PageSection, as: "sections" },
      { model: PageSEO, as: "seo" },
    ],
    order: [[{ model: PageSection, as: "sections" }, "sortOrder", "ASC"]],
  });
  if (!page) return null;

  const serializedPage = serializePage(page);
  if (serializedPage.classification === "redirect") {
    return {
      page: {
        id: serializedPage.id,
        title: serializedPage.title,
        slug: serializedPage.slug,
        status: serializedPage.status,
        template: serializedPage.template,
        classification: serializedPage.classification,
        publishable: serializedPage.publishable,
        updatedAt: serializedPage.updatedAt?.toISOString?.() ?? String(serializedPage.updatedAt ?? ""),
      },
      seo: null,
      sections: [],
      publicRenderingUnchanged: true,
    };
  }

  const sections = ((page.get("sections") as PageSection[] | undefined) ?? []).map(serializePageSection);
  const seoRecord = page.get("seo") as PageSEO | null | undefined;
  const seo = seoRecord ? serializePageSeo(seoRecord) : null;

  const mediaIds = new Set<number>();
  for (const section of sections) {
    const data = normalizeJsonObject(section.data);
    const candidate = mediaCandidate(data);
    if (candidate.id) mediaIds.add(candidate.id);
    if (typeof seo?.ogImageId === "number") mediaIds.add(seo.ogImageId);
  }

  const mediaRows = mediaIds.size
    ? await Media.findAll({ where: { id: [...mediaIds] } })
    : [];
  const mediaById = new Map(mediaRows.map((row) => [row.id, row]));

  const studies = await CaseStudy.findAll();
  const blogs = await Blog.findAll();
  const jobs = await Job.findAll();
  const resources = await Resource.findAll();
  const studyBySlug = new Map(studies.map((row) => [row.slug, row]));
  const blogBySlug = new Map(blogs.map((row) => [row.slug, row]));
  const jobBySlug = new Map(jobs.map((row) => [row.slug, row]));
  const resourceBySlug = new Map(resources.map((row) => [row.slug, row]));

  const previewSections: PreviewSectionPayload[] = [];
  for (const section of sections) {
    const data = normalizeJsonObject(section.data);
    const model = section.model ?? "";
    const source = asRecord(section.source);
    const sourceComponent = firstString(source.component, data.sourceComponent) ?? "";
    const adapterId = resolvePreviewAdapterId({
      template: section.template,
      model,
      sourceComponent,
    });
    const candidate = mediaCandidate(data);
    const media: PreviewMedia = {
      alt: candidate.alt,
      mediaId: candidate.id,
    };
    if (candidate.id) {
      const row = mediaById.get(candidate.id);
      if (row) {
        media.url =
          row.publicUrl && row.publicUrl.startsWith("/")
            ? row.publicUrl
            : `/api/cms/media/${row.id}`;
        media.alt = candidate.alt ?? row.altText ?? undefined;
      } else if (candidate.url) {
        media.url = candidate.url;
        media.remote = isRemoteMediaUrl(candidate.url);
      } else {
        media.missing = `CMS media id ${candidate.id} was not found`;
      }
    } else if (candidate.url) {
      media.url = candidate.url;
      media.remote = isRemoteMediaUrl(candidate.url);
    }

    const entities: PreviewEntity[] = [];
    const entityType = firstString(data.entityType) ?? "";
    const refs = Array.isArray(data.references) ? data.references.map(String) : [];
    for (const slug of refs) {
      if (entityType === "case_study") {
        const row = studyBySlug.get(slug);
        entities.push({
          entityType,
          slug,
          title: row?.title ?? slug,
          resolved: Boolean(row),
          fields: row
            ? {
                requirement: row.requirement ?? "",
                responsibility: row.responsibility ?? "",
                technology: row.technology ?? "",
                challenge: row.challenge ?? "",
                solution: row.solution ?? "",
                result: row.result ?? "",
              }
            : {},
        });
      } else if (entityType === "blog") {
        const row = blogBySlug.get(slug);
        entities.push({
          entityType,
          slug,
          title: row?.title ?? slug,
          resolved: Boolean(row),
          fields: row ? { excerpt: row.excerpt ?? "" } : {},
        });
      } else if (entityType === "job") {
        const row = jobBySlug.get(slug);
        entities.push({
          entityType,
          slug,
          title: row?.title ?? slug,
          resolved: Boolean(row),
          fields: {},
        });
      } else if (entityType === "resource") {
        const row = resourceBySlug.get(slug);
        entities.push({
          entityType,
          slug,
          title: row?.title ?? slug,
          resolved: Boolean(row),
          fields: {},
        });
      }
    }

    const issues = collectIssues(data, model);
    if (!adapterId && model !== "UTILITY") {
      issues.push(
        `No preview adapter for template ${section.template ?? "(missing)"} / ${sourceComponent || "unknown component"}`
      );
    }
    if (media.missing) issues.push(media.missing);
    for (const entity of entities) {
      if (!entity.resolved) issues.push(`Unresolved ${entity.entityType} reference: ${entity.slug}`);
    }

    previewSections.push({
      id: section.id,
      stableKey: section.stableKey ?? "",
      model,
      template: section.template ?? "",
      sourceComponent,
      sourceFile: asString(source.file) ?? null,
      adapterId,
      isVisible: section.isVisible,
      dataOrigin: dataOrigin(data),
      preservedRowId:
        typeof data._preservedRowId === "number" ? data._preservedRowId : undefined,
      data,
      media,
      actions: asActions(data),
      cards: asCards(data),
      entities,
      issues,
    });
  }

  let ogImageUrl: string | undefined;
  if (typeof seo?.ogImageId === "number") {
    ogImageUrl = mediaById.has(seo.ogImageId) ? `/api/cms/media/${seo.ogImageId}` : undefined;
  }

  return {
    page: {
      id: serializedPage.id,
      title: serializedPage.title,
      slug: serializedPage.slug,
      status: serializedPage.status,
      template: serializedPage.template,
      classification: serializedPage.classification,
      publishable: serializedPage.publishable,
      updatedAt:
        serializedPage.updatedAt instanceof Date
          ? serializedPage.updatedAt.toISOString()
          : serializedPage.updatedAt
            ? String(serializedPage.updatedAt)
            : undefined,
    },
    seo: seo
      ? {
          metaTitle: seo.metaTitle ?? "",
          metaDescription: seo.metaDescription ?? "",
          canonicalUrl: seo.canonicalUrl ?? "",
          robots: seo.robots ?? "index",
          ogTitle: seo.ogTitle ?? "",
          ogDescription: seo.ogDescription ?? "",
          ogImageUrl,
        }
      : null,
    sections: previewSections,
    publicRenderingUnchanged: true,
  };
}
