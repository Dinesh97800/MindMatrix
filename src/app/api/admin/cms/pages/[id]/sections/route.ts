import { NextRequest } from "next/server";
import { cmsError, cmsOk, requireCmsAccess } from "@/lib/api/cms-auth";
import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import { requireCapability } from "@/lib/cms/guards";
import {
  getDefaultSectionData,
  getSectionDefinition,
} from "@/cms/sections/registry";
import { serializePageSection } from "@/lib/cms/serializers";
import { getDbModels } from "@/lib/db/models";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  const { error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { Page, PageSection } = getDbModels();
  const pageId = Number((await context.params).id);
  if (!Number.isFinite(pageId)) return cmsError("Invalid page id.");

  const page = await Page.findByPk(pageId);
  if (!page) return cmsError("Page not found.", 404);

  const sections = await PageSection.findAll({
    where: { pageId },
    order: [["sortOrder", "ASC"]],
  });

  return cmsOk({ sections: sections.map(serializePageSection) });
}

export async function POST(request: NextRequest, context: RouteContext) {
  const capability = requireCapability("canCreateSections");
  if (!capability.ok) return capability.response;

  const { error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { Page, PageSection } = getDbModels();
  const pageId = Number((await context.params).id);
  if (!Number.isFinite(pageId)) return cmsError("Invalid page id.");

  const page = await Page.findByPk(pageId);
  if (!page) return cmsError("Page not found.", 404);

  const body = await request.json();
  const type = String(body.type ?? "").trim();
  const definition = getSectionDefinition(type);
  if (!definition) return cmsError("Invalid section type.");

  const maxSort = (await PageSection.max("sortOrder", { where: { pageId } })) as
    | number
    | null;
  const sortOrder = Number.isFinite(maxSort) ? (maxSort as number) + 1 : 0;

  const section = await PageSection.create({
    pageId,
    type,
    sortOrder,
    data: getDefaultSectionData(type),
    isVisible: true,
  });

  return cmsOk({ section: serializePageSection(section) }, 201);
}
