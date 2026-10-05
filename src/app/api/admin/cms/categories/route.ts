import { NextRequest } from "next/server";
import { cmsError, cmsOk, requireCmsAccess } from "@/lib/api/cms-auth";
import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import { serializeCategory } from "@/lib/cms/serializers";
import { isSlugValid, normalizeSlug } from "@/lib/cms/validation";
import { requireCapability } from "@/lib/cms/guards";
import { getDbModels } from "@/lib/db/models";

export async function GET() {
  const { error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { PageCategory } = getDbModels();

  const categories = await PageCategory.findAll({
    order: [
      ["sortOrder", "ASC"],
      ["label", "ASC"],
    ],
  });

  return cmsOk({ categories: categories.map(serializeCategory) });
}

export async function POST(request: NextRequest) {
  const capability = requireCapability("canManageCategories");
  if (!capability.ok) return capability.response;

  const { error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { PageCategory } = getDbModels();
  const body = await request.json();

  const label = String(body.label ?? "").trim();
  const slug = normalizeSlug(String(body.slug ?? label));
  const parentId = body.parentId ? Number(body.parentId) : null;
  const sortOrder = Number(body.sortOrder ?? 0);
  const icon = body.icon ? String(body.icon).trim() : null;

  if (!label) return cmsError("Label is required.");
  if (!slug || !isSlugValid(slug)) return cmsError("A valid slug is required.");

  const existing = await PageCategory.findOne({ where: { slug } });
  if (existing) return cmsError("Slug already exists.", 409);

  if (parentId) {
    const parent = await PageCategory.findByPk(parentId);
    if (!parent) return cmsError("Parent category not found.", 404);
  }

  const category = await PageCategory.create({
    label,
    slug,
    parentId,
    sortOrder,
    icon,
  });

  return cmsOk({ category: serializeCategory(category) }, 201);
}
