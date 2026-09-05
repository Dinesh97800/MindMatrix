import { NextRequest } from "next/server";
import { cmsError, cmsOk, requireCmsAccess } from "@/lib/api/cms-auth";
import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import { requireCapability } from "@/lib/cms/guards";
import { serializePageSection } from "@/lib/cms/serializers";
import { getDbModels } from "@/lib/db/models";

type RouteContext = { params: Promise<{ id: string; sectionId: string }> };

export async function POST(_request: NextRequest, context: RouteContext) {
  const capability = requireCapability("canDuplicateSections");
  if (!capability.ok) return capability.response;

  const { error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { Page, PageSection } = getDbModels();
  const pageId = Number((await context.params).id);
  const sectionId = Number((await context.params).sectionId);
  if (!Number.isFinite(pageId) || !Number.isFinite(sectionId)) {
    return cmsError("Invalid id.");
  }

  const page = await Page.findByPk(pageId);
  if (!page) return cmsError("Page not found.", 404);

  const source = await PageSection.findOne({ where: { id: sectionId, pageId } });
  if (!source) return cmsError("Section not found.", 404);

  const maxSort = (await PageSection.max("sortOrder", { where: { pageId } })) as
    | number
    | null;
  const sortOrder = Number.isFinite(maxSort) ? (maxSort as number) + 1 : 0;

  const duplicate = await PageSection.create({
    pageId,
    type: source.type,
    sortOrder,
    data: { ...(source.data ?? {}) },
    isVisible: source.isVisible,
  });

  return cmsOk({ section: serializePageSection(duplicate) }, 201);
}
