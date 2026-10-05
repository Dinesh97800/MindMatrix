import { NextRequest } from "next/server";
import { cmsError, cmsOk, requireCmsAccess } from "@/lib/api/cms-auth";
import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import { requireCapability } from "@/lib/cms/guards";
import { serializePageSeo } from "@/lib/cms/serializers";
import { getDbModels } from "@/lib/db/models";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: RouteContext) {
  const capability = requireCapability("canEditSeo");
  if (!capability.ok) return capability.response;

  const { error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { Page, PageSEO } = getDbModels();
  const pageId = Number((await context.params).id);
  if (!Number.isFinite(pageId)) return cmsError("Invalid page id.");

  const page = await Page.findByPk(pageId);
  if (!page) return cmsError("Page not found.", 404);

  let seo = await PageSEO.findOne({ where: { pageId } });
  if (!seo) {
    seo = await PageSEO.create({ pageId });
  }

  const body = await request.json();

  if (body.metaTitle !== undefined) seo.metaTitle = String(body.metaTitle).trim() || null;
  if (body.metaDescription !== undefined) {
    seo.metaDescription = String(body.metaDescription).trim() || null;
  }
  if (body.canonicalUrl !== undefined) {
    seo.canonicalUrl = String(body.canonicalUrl).trim() || null;
  }
  if (body.ogTitle !== undefined) seo.ogTitle = String(body.ogTitle).trim() || null;
  if (body.ogDescription !== undefined) {
    seo.ogDescription = String(body.ogDescription).trim() || null;
  }
  if (body.ogImageId !== undefined) {
    seo.ogImageId = body.ogImageId ? Number(body.ogImageId) : null;
  }
  if (body.robots !== undefined) {
    const robots = String(body.robots).trim();
    seo.robots = robots === "noindex" ? "noindex" : "index";
  }
  if (body.keywords !== undefined) {
    if (Array.isArray(body.keywords)) {
      seo.keywords = body.keywords.map(String);
    } else {
      const text = String(body.keywords).trim();
      seo.keywords = text
        ? text.split(",").map((item) => item.trim()).filter(Boolean)
        : null;
    }
  }

  await seo.save();
  return cmsOk({ seo: serializePageSeo(seo) });
}
