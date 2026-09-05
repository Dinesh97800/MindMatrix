import { NextRequest } from "next/server";
import { cmsError, cmsOk, requireCmsAccess } from "@/lib/api/cms-auth";
import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import { requireCapability } from "@/lib/cms/guards";
import { serializePageSection } from "@/lib/cms/serializers";
import { getDbModels } from "@/lib/db/models";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  const capability = requireCapability("canReorderSections");
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
  const order = body.order;

  if (!Array.isArray(order) || order.some((id) => !Number.isFinite(Number(id)))) {
    return cmsError("Invalid section order.");
  }

  const sections = await PageSection.findAll({ where: { pageId } });
  const sectionIds = new Set(sections.map((section) => section.id));

  if (order.length !== sections.length) {
    return cmsError("Section order must include all sections.");
  }

  for (const id of order) {
    if (!sectionIds.has(Number(id))) {
      return cmsError("Invalid section id in order.");
    }
  }

  await Promise.all(
    order.map((id: number, index: number) =>
      PageSection.update({ sortOrder: index }, { where: { id: Number(id), pageId } })
    )
  );

  const updated = await PageSection.findAll({
    where: { pageId },
    order: [["sortOrder", "ASC"]],
  });

  return cmsOk({ sections: updated.map(serializePageSection) });
}
