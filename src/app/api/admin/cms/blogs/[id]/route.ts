import { NextRequest } from "next/server";
import { cmsError, cmsOk, requireCmsAccess } from "@/lib/api/cms-auth";
import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import { serializeBlog } from "@/lib/cms/serializers";
import { isSlugValid, normalizeSlug } from "@/lib/cms/validation";
import { getDbModels } from "@/lib/db/models";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  const { error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { Blog } = getDbModels();
  const id = Number((await context.params).id);
  if (!Number.isFinite(id)) return cmsError("Invalid blog id.");

  const blog = await Blog.findByPk(id);
  if (!blog) return cmsError("Blog not found.", 404);

  return cmsOk({ blog: serializeBlog(blog) });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { Blog, BlogCategory } = getDbModels();
  const id = Number((await context.params).id);
  if (!Number.isFinite(id)) return cmsError("Invalid blog id.");

  const blog = await Blog.findByPk(id);
  if (!blog) return cmsError("Blog not found.", 404);

  const body = await request.json();

  if (body.title !== undefined) {
    const title = String(body.title).trim();
    if (!title) return cmsError("Title cannot be empty.");
    blog.title = title;
  }

  if (body.slug !== undefined) {
    const slug = normalizeSlug(String(body.slug));
    if (!slug || !isSlugValid(slug)) return cmsError("Invalid slug.");
    const existing = await Blog.findOne({ where: { slug } });
    if (existing && existing.id !== blog.id) {
      return cmsError("Slug already exists.", 409);
    }
    blog.slug = slug;
  }

  if (body.excerpt !== undefined) blog.excerpt = String(body.excerpt).trim() || null;
  if (body.content !== undefined) blog.content = body.content;
  if (body.featuredMediaId !== undefined) {
    blog.featuredMediaId = body.featuredMediaId ? Number(body.featuredMediaId) : null;
  }
  if (body.featuredImageAlt !== undefined) {
    blog.featuredImageAlt = String(body.featuredImageAlt).trim() || null;
  }
  if (body.categoryId !== undefined) {
    const categoryId = body.categoryId ? Number(body.categoryId) : null;
    if (categoryId) {
      const category = await BlogCategory.findByPk(categoryId);
      if (!category) return cmsError("Category not found.", 404);
    }
    blog.categoryId = categoryId;
  }
  if (body.tags !== undefined) {
    blog.tags = Array.isArray(body.tags) ? body.tags.map(String) : [];
  }
  if (body.status !== undefined) {
    if (!["draft", "published", "archived"].includes(body.status)) {
      return cmsError("Invalid status.");
    }
    blog.status = body.status;
    if (body.status === "published") {
      blog.publishedAt = blog.publishedAt ?? new Date();
    } else if (body.status === "draft") {
      blog.publishedAt = null;
    }
  }
  if (body.publishedAt !== undefined) {
    blog.publishedAt = body.publishedAt ? new Date(body.publishedAt) : null;
  }
  if (body.metaTitle !== undefined) blog.metaTitle = String(body.metaTitle).trim() || null;
  if (body.metaDescription !== undefined) {
    blog.metaDescription = String(body.metaDescription).trim() || null;
  }
  if (body.metaKeywords !== undefined) {
    blog.metaKeywords = String(body.metaKeywords).trim() || null;
  }
  if (body.ogTitle !== undefined) blog.ogTitle = String(body.ogTitle).trim() || null;
  if (body.ogDescription !== undefined) {
    blog.ogDescription = String(body.ogDescription).trim() || null;
  }
  if (body.ogImageId !== undefined) {
    blog.ogImageId = body.ogImageId ? Number(body.ogImageId) : null;
  }

  await blog.save();
  return cmsOk({ blog: serializeBlog(blog) });
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const { error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { Blog } = getDbModels();
  const id = Number((await context.params).id);
  if (!Number.isFinite(id)) return cmsError("Invalid blog id.");

  const blog = await Blog.findByPk(id);
  if (!blog) return cmsError("Blog not found.", 404);

  await blog.destroy();
  return cmsOk({ success: true });
}
