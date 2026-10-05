import { NextRequest } from "next/server";
import { Op, type WhereOptions } from "sequelize";
import { cmsError, cmsOk, requireCmsAccess } from "@/lib/api/cms-auth";
import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import { serializeBlog, serializeBlogCategory } from "@/lib/cms/serializers";
import { isSlugValid, normalizeSlug } from "@/lib/cms/validation";
import { getDbModels } from "@/lib/db/models";

export async function GET(request: NextRequest) {
  const { error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { Blog, BlogCategory } = getDbModels();

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const categoryId = searchParams.get("categoryId");
  const q = searchParams.get("q")?.trim();
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? 20)));
  const offset = (page - 1) * limit;

  const conditions: WhereOptions[] = [];
  if (status === "draft" || status === "published" || status === "archived") {
    conditions.push({ status });
  }
  if (categoryId) conditions.push({ categoryId: Number(categoryId) });
  if (q) {
    conditions.push({
      [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { slug: { [Op.like]: `%${q}%` } },
      ],
    });
  }

  const where: WhereOptions = conditions.length ? { [Op.and]: conditions } : {};

  const { rows, count } = await Blog.findAndCountAll({
    where,
    include: [{ model: BlogCategory, as: "category", attributes: ["id", "name", "slug"] }],
    order: [["updatedAt", "DESC"]],
    limit,
    offset,
  });

  return cmsOk({
    blogs: rows.map(serializeBlog),
    pagination: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
    },
  });
}

export async function POST(request: NextRequest) {
  const { session, error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { Blog, BlogCategory } = getDbModels();
  const body = await request.json();

  const title = String(body.title ?? "").trim();
  const slug = normalizeSlug(String(body.slug ?? title));
  const status = body.status === "published" ? "published" : "draft";
  const categoryId = body.categoryId ? Number(body.categoryId) : null;

  if (!title) return cmsError("Title is required.");
  if (!slug || !isSlugValid(slug)) return cmsError("A valid slug is required.");

  const existing = await Blog.findOne({ where: { slug } });
  if (existing) return cmsError("Slug already exists.", 409);

  if (categoryId) {
    const category = await BlogCategory.findByPk(categoryId);
    if (!category) return cmsError("Category not found.", 404);
  }

  const blog = await Blog.create({
    title,
    slug,
    excerpt: body.excerpt ? String(body.excerpt).trim() : null,
    content: body.content ?? { type: "doc", content: [{ type: "paragraph" }] },
    featuredMediaId: body.featuredMediaId ? Number(body.featuredMediaId) : null,
    featuredImageAlt: body.featuredImageAlt ? String(body.featuredImageAlt).trim() : null,
    authorId: Number(session!.user.id),
    categoryId,
    tags: Array.isArray(body.tags) ? body.tags.map(String) : [],
    status,
    publishedAt: status === "published" ? new Date() : null,
    metaTitle: body.metaTitle ? String(body.metaTitle).trim() : null,
    metaDescription: body.metaDescription ? String(body.metaDescription).trim() : null,
    metaKeywords: body.metaKeywords ? String(body.metaKeywords).trim() : null,
    ogTitle: body.ogTitle ? String(body.ogTitle).trim() : null,
    ogDescription: body.ogDescription ? String(body.ogDescription).trim() : null,
    ogImageId: body.ogImageId ? Number(body.ogImageId) : null,
  });

  return cmsOk({ blog: serializeBlog(blog) }, 201);
}
