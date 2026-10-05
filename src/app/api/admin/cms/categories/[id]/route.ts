import { NextRequest } from "next/server";
import { cmsError, cmsOk, requireCmsAccess } from "@/lib/api/cms-auth";
import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import { serializeCategory } from "@/lib/cms/serializers";
import { isSlugValid, normalizeSlug } from "@/lib/cms/validation";
import { requireCapability } from "@/lib/cms/guards";
import { getDbModels } from "@/lib/db/models";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  const { error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { PageCategory } = getDbModels();
  const id = Number((await context.params).id);

  if (!Number.isFinite(id)) return cmsError("Invalid category id.");

  const category = await PageCategory.findByPk(id);
  if (!category) return cmsError("Category not found.", 404);

  return cmsOk({ category: serializeCategory(category) });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const capability = requireCapability("canManageCategories");
  if (!capability.ok) return capability.response;

  const { error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { PageCategory, Page } = getDbModels();
  const id = Number((await context.params).id);
  if (!Number.isFinite(id)) return cmsError("Invalid category id.");

  const category = await PageCategory.findByPk(id);
  if (!category) return cmsError("Category not found.", 404);

  const body = await request.json();

  if (body.label !== undefined) {
    const label = String(body.label).trim();
    if (!label) return cmsError("Label cannot be empty.");
    category.label = label;
  }

  if (body.slug !== undefined) {
    const slug = normalizeSlug(String(body.slug));
    if (!slug || !isSlugValid(slug)) return cmsError("Invalid slug.");
    const existing = await PageCategory.findOne({ where: { slug } });
    if (existing && existing.id !== category.id) {
      return cmsError("Slug already exists.", 409);
    }
    category.slug = slug;
  }

  if (body.parentId !== undefined) {
    const parentId = body.parentId ? Number(body.parentId) : null;
    if (parentId === category.id) return cmsError("Category cannot be its own parent.");
    if (parentId) {
      const parent = await PageCategory.findByPk(parentId);
      if (!parent) return cmsError("Parent category not found.", 404);
    }
    category.parentId = parentId;
  }

  if (body.sortOrder !== undefined) {
    category.sortOrder = Number(body.sortOrder) || 0;
  }

  if (body.icon !== undefined) {
    category.icon = body.icon ? String(body.icon).trim() : null;
  }

  await category.save();
  return cmsOk({ category: serializeCategory(category) });
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const capability = requireCapability("canManageCategories");
  if (!capability.ok) return capability.response;

  const { error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { PageCategory, Page } = getDbModels();
  const id = Number((await context.params).id);
  if (!Number.isFinite(id)) return cmsError("Invalid category id.");

  const category = await PageCategory.findByPk(id);
  if (!category) return cmsError("Category not found.", 404);

  const childCount = await PageCategory.count({ where: { parentId: id } });
  if (childCount > 0) {
    return cmsError("Remove or reassign child categories before deleting.", 409);
  }

  const pageCount = await Page.count({ where: { categoryId: id } });
  if (pageCount > 0) {
    return cmsError("Move or delete pages in this category before deleting.", 409);
  }

  await category.destroy();
  return cmsOk({ success: true });
}
