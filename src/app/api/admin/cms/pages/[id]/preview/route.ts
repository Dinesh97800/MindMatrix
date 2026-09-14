import { NextRequest } from "next/server";
import { cmsError, cmsOk, requireCmsAccess } from "@/lib/api/cms-auth";
import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import { isExistingWebsiteSlug } from "@/lib/cms/existing-pages";
import { buildCanonicalPreviewPayload } from "@/cms/preview/resolve";
import { getDbModels } from "@/lib/db/models";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  const { error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const id = Number((await context.params).id);
  if (!Number.isFinite(id)) return cmsError("Invalid page id.");

  const { Page } = getDbModels();
  const page = await Page.findByPk(id);
  if (!page) return cmsError("Page not found.", 404);
  if (!isExistingWebsiteSlug(page.slug)) {
    return cmsError("This page is not part of the existing website CMS scope.", 404);
  }

  const payload = await buildCanonicalPreviewPayload(id);
  if (!payload) return cmsError("Page not found.", 404);

  return cmsOk(payload);
}
