import { NextRequest } from "next/server";
import { cmsError, cmsOk, requireCmsAccess } from "@/lib/api/cms-auth";
import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import { isExistingWebsiteSlug } from "@/lib/cms/existing-pages";
import { requireCapability } from "@/lib/cms/guards";
import {
  serializePage,
  serializePageSection,
  serializePageSeo,
} from "@/lib/cms/serializers";
import { isSlugValid, normalizeSlug } from "@/lib/cms/validation";
import type { PageSection } from "@/lib/db/models/PageSection";
import type { PageSEO } from "@/lib/db/models/PageSEO";
import { getDbModels } from "@/lib/db/models";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  const { error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { Page, PageSection, PageSEO } = getDbModels();
  const id = Number((await context.params).id);
  if (!Number.isFinite(id)) return cmsError("Invalid page id.");

  const page = await Page.findByPk(id, {
    include: [
      { model: PageSection, as: "sections" },
      { model: PageSEO, as: "seo" },
    ],
    order: [[{ model: PageSection, as: "sections" }, "sortOrder", "ASC"]],
  });

  if (!page) return cmsError("Page not found.", 404);
  if (!isExistingWebsiteSlug(page.slug)) {
    return cmsError("This page is not part of the existing website CMS scope.", 404);
  }

  const sections = (page.get("sections") as PageSection[] | undefined) ?? [];
  const seo = page.get("seo") as PageSEO | null | undefined;

  return cmsOk({
    page: serializePage(page),
    sections: sections.map(serializePageSection),
    seo: seo ? serializePageSeo(seo) : null,
  });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { session, error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { Page } = getDbModels();
  const id = Number((await context.params).id);
  if (!Number.isFinite(id)) return cmsError("Invalid page id.");

  const page = await Page.findByPk(id);
  if (!page) return cmsError("Page not found.", 404);
  if (!isExistingWebsiteSlug(page.slug)) {
    return cmsError("This page is not part of the existing website CMS scope.", 404);
  }

  const body = await request.json();

  if (body.template !== undefined) {
    const templateCapability = requireCapability("canChangeTemplates");
    if (!templateCapability.ok) return templateCapability.response;
  }

  if (body.title !== undefined) {
    const title = String(body.title).trim();
    if (!title) return cmsError("Title cannot be empty.");
    page.title = title;
  }

  if (body.slug !== undefined) {
    return cmsError("Page URL cannot be changed in the current CMS configuration.", 403);
  }

  if (body.categoryId !== undefined) {
    return cmsError("Page category cannot be changed in the current CMS configuration.", 403);
  }

  if (body.template !== undefined) {
    page.template = String(body.template).trim() || "default";
  }

  if (body.sortOrder !== undefined) {
    page.sortOrder = Number(body.sortOrder) || 0;
  }

  if (body.status !== undefined) {
    if (body.status !== "draft" && body.status !== "published") {
      return cmsError("Invalid status.");
    }
    page.status = body.status;
    page.publishedAt =
      body.status === "published" ? page.publishedAt ?? new Date() : null;
  }

  page.updatedBy = Number(session!.user.id);
  await page.save();

  return cmsOk({ page: serializePage(page) });
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const capability = requireCapability("canDeletePages");
  if (!capability.ok) return capability.response;

  const { error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { Page } = getDbModels();
  const id = Number((await context.params).id);
  if (!Number.isFinite(id)) return cmsError("Invalid page id.");

  const page = await Page.findByPk(id);
  if (!page) return cmsError("Page not found.", 404);

  await page.destroy();
  return cmsOk({ success: true });
}
