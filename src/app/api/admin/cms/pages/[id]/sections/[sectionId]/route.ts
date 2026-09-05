import { NextRequest } from "next/server";
import { cmsError, cmsOk, requireCmsAccess } from "@/lib/api/cms-auth";
import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import { validateSectionData } from "@/cms/sections/registry";
import { requireCapability } from "@/lib/cms/guards";
import { serializePageSection } from "@/lib/cms/serializers";
import { getDbModels } from "@/lib/db/models";

type RouteContext = { params: Promise<{ id: string; sectionId: string }> };

function bodyWillToggleVisibility(body: unknown): boolean {
  return (
    typeof body === "object" &&
    body !== null &&
    "isVisible" in body &&
    (body as { isVisible?: unknown }).isVisible !== undefined
  );
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { error } = await requireCmsAccess();
  if (error) return error;

  const body = await request.json();

  if (bodyWillToggleVisibility(body)) {
    const capability = requireCapability("canToggleSectionVisibility");
    if (!capability.ok) return capability.response;
  }

  const contentCapability = requireCapability("canEditContent");
  if (!contentCapability.ok) return contentCapability.response;

  await ensureCmsDatabaseReady();
  const { Page, PageSection } = getDbModels();
  const pageId = Number((await context.params).id);
  const sectionId = Number((await context.params).sectionId);
  if (!Number.isFinite(pageId) || !Number.isFinite(sectionId)) {
    return cmsError("Invalid id.");
  }

  const page = await Page.findByPk(pageId);
  if (!page) return cmsError("Page not found.", 404);

  const section = await PageSection.findOne({ where: { id: sectionId, pageId } });
  if (!section) return cmsError("Section not found.", 404);

  if (body.data !== undefined) {
    if (typeof body.data !== "object" || body.data === null) {
      return cmsError("Invalid section data.");
    }
    let nextData = body.data as Record<string, unknown>;
    if (
      section.type === "hero" &&
      section.data &&
      typeof section.data === "object" &&
      (section.data as Record<string, unknown>).lockedVariant
    ) {
      nextData = {
        ...nextData,
        variant: (section.data as Record<string, unknown>).variant,
        lockedVariant: true,
      };
    }
    section.data = validateSectionData(section.type, nextData);
  }

  if (body.isVisible !== undefined) {
    section.isVisible = Boolean(body.isVisible);
  }

  await section.save();
  return cmsOk({ section: serializePageSection(section) });
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const capability = requireCapability("canDeleteSections");
  if (!capability.ok) return capability.response;

  const { error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { PageSection } = getDbModels();
  const pageId = Number((await context.params).id);
  const sectionId = Number((await context.params).sectionId);
  if (!Number.isFinite(pageId) || !Number.isFinite(sectionId)) {
    return cmsError("Invalid id.");
  }

  const section = await PageSection.findOne({ where: { id: sectionId, pageId } });
  if (!section) return cmsError("Section not found.", 404);

  await section.destroy();
  return cmsOk({ success: true });
}
