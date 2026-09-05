import { NextRequest } from "next/server";
import { Op, type WhereOptions } from "sequelize";
import { cmsError, cmsOk, requireCmsAccess } from "@/lib/api/cms-auth";
import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import { getExistingWebsiteSlugs } from "@/lib/cms/existing-pages";
import { requireCapability } from "@/lib/cms/guards";
import { serializePage } from "@/lib/cms/serializers";
import { isSlugValid, normalizeSlug } from "@/lib/cms/validation";
import { getDbModels } from "@/lib/db/models";

export async function GET(request: NextRequest) {
  const { error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { Page } = getDbModels();

  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("categoryId");
  const status = searchParams.get("status");
  const q = searchParams.get("q")?.trim();

  const conditions: WhereOptions[] = [];
  if (categoryId) conditions.push({ categoryId: Number(categoryId) });
  if (status === "draft" || status === "published") conditions.push({ status });
  if (q) {
    conditions.push({
      [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { slug: { [Op.like]: `%${q}%` } },
      ],
    });
  }

  const where: WhereOptions = conditions.length ? { [Op.and]: conditions } : {};

  const pages = await Page.findAll({
    where,
    order: [
      ["sortOrder", "ASC"],
      ["title", "ASC"],
    ],
  });

  const allowedSlugs = new Set(getExistingWebsiteSlugs());
  const filtered = pages.filter((page) => allowedSlugs.has(page.slug));

  return cmsOk({ pages: filtered.map(serializePage) });
}

export async function POST(request: NextRequest) {
  const capability = requireCapability("canCreatePages");
  if (!capability.ok) return capability.response;

  const { session, error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { Page, PageCategory, PageSEO } = getDbModels();
  const body = await request.json();

  const title = String(body.title ?? "").trim();
  const slug = normalizeSlug(String(body.slug ?? title));
  const categoryId = body.categoryId ? Number(body.categoryId) : null;
  const template = String(body.template ?? "default").trim() || "default";
  const status = body.status === "published" ? "published" : "draft";
  const sortOrder = Number(body.sortOrder ?? 0);

  if (!title) return cmsError("Title is required.");
  if (!slug || !isSlugValid(slug)) return cmsError("A valid slug is required.");

  const existing = await Page.findOne({ where: { slug } });
  if (existing) return cmsError("Slug already exists.", 409);

  if (categoryId) {
    const category = await PageCategory.findByPk(categoryId);
    if (!category) return cmsError("Category not found.", 404);
  }

  const page = await Page.create({
    title,
    slug,
    categoryId,
    template,
    status,
    sortOrder,
    publishedAt: status === "published" ? new Date() : null,
    createdBy: Number(session!.user.id),
    updatedBy: Number(session!.user.id),
  });

  await PageSEO.create({ pageId: page.id });

  return cmsOk({ page: serializePage(page) }, 201);
}
