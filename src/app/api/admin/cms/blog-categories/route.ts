import { NextRequest } from "next/server";
import { cmsError, cmsOk, requireCmsAccess } from "@/lib/api/cms-auth";
import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import { serializeBlogCategory } from "@/lib/cms/serializers";
import { isSlugValid, normalizeSlug } from "@/lib/cms/validation";
import { getDbModels } from "@/lib/db/models";

export async function GET() {
  const { error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { BlogCategory } = getDbModels();

  const categories = await BlogCategory.findAll({
    order: [
      ["sortOrder", "ASC"],
      ["name", "ASC"],
    ],
  });

  return cmsOk({ categories: categories.map(serializeBlogCategory) });
}

export async function POST(request: NextRequest) {
  const { error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { BlogCategory } = getDbModels();
  const body = await request.json();

  const name = String(body.name ?? "").trim();
  const slug = normalizeSlug(String(body.slug ?? name));
  const description = body.description ? String(body.description).trim() : null;
  const sortOrder = Number(body.sortOrder ?? 0);

  if (!name) return cmsError("Name is required.");
  if (!slug || !isSlugValid(slug)) return cmsError("A valid slug is required.");

  const existing = await BlogCategory.findOne({ where: { slug } });
  if (existing) return cmsError("Slug already exists.", 409);

  const category = await BlogCategory.create({ name, slug, description, sortOrder });
  return cmsOk({ category: serializeBlogCategory(category) }, 201);
}
