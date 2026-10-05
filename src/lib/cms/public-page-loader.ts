/**
 * TODO CMS MIGRATION:
 * Once public pages are migrated to CMS, replace legacy config-driven content
 * with getPublishedPage(slug) + SectionRenderer on each route.
 *
 * Current production implementation intentionally remains active.
 * Do NOT import this module from existing public page components yet.
 */

import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import {
  serializePage,
  serializePageSection,
  serializePageSeo,
} from "@/lib/cms/serializers";
import { getDbModels } from "@/lib/db/models";
import type { PageSection } from "@/lib/db/models/PageSection";
import type { PageSEO } from "@/lib/db/models/PageSEO";

export async function getPublishedPage(slug: string) {
  await ensureCmsDatabaseReady();
  const { Page, PageSection, PageSEO } = getDbModels();

  const page = await Page.findOne({
    where: { slug, status: "published" },
    include: [
      {
        model: PageSection,
        as: "sections",
        where: { isVisible: true },
        required: false,
      },
      { model: PageSEO, as: "seo" },
    ],
    order: [[{ model: PageSection, as: "sections" }, "sortOrder", "ASC"]],
  });

  if (!page) return null;

  const sections = (page.get("sections") as PageSection[] | undefined) ?? [];
  const seo = page.get("seo") as PageSEO | null | undefined;

  return {
    page: serializePage(page),
    sections: sections.map(serializePageSection),
    seo: seo ? serializePageSeo(seo) : null,
  };
}
