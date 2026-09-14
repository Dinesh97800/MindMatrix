import type { Blog } from "@/lib/db/models/Blog";
import type { BlogCategory } from "@/lib/db/models/BlogCategory";
import type { Media } from "@/lib/db/models/Media";
import type { Page } from "@/lib/db/models/Page";
import type { PageCategory } from "@/lib/db/models/PageCategory";
import type { PageSection } from "@/lib/db/models/PageSection";
import type { PageSEO } from "@/lib/db/models/PageSEO";
import type { SiteSetting } from "@/lib/db/models/SiteSetting";
import {
  normalizeJsonArray,
  normalizeJsonColumn,
  normalizeJsonObject,
} from "@/lib/cms/canonical/json";

export function serializeCategory(category: PageCategory) {
  return {
    id: category.id,
    slug: category.slug,
    label: category.label,
    parentId: category.parentId,
    sortOrder: category.sortOrder,
    icon: category.icon,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
}

export function serializePage(page: Page) {
  return {
    id: page.id,
    title: page.title,
    slug: page.slug,
    categoryId: page.categoryId,
    template: page.template,
    status: page.status,
    classification: page.classification ?? "active",
    redirectTarget: page.redirectTarget ?? null,
    publishable: page.publishable !== false,
    sortOrder: page.sortOrder,
    publishedAt: page.publishedAt,
    createdBy: page.createdBy,
    updatedBy: page.updatedBy,
    createdAt: page.createdAt,
    updatedAt: page.updatedAt,
  };
}

export function serializePageSection(section: PageSection) {
  return {
    id: section.id,
    pageId: section.pageId,
    type: section.type,
    stableKey: section.stableKey ?? null,
    model: section.model ?? null,
    template: section.template ?? null,
    source: normalizeJsonObject(section.sourceMeta),
    editorPolicy: normalizeJsonObject(section.editorPolicy),
    decorations: normalizeJsonObject(section.decorations),
    sortOrder: section.sortOrder,
    data: normalizeJsonObject(section.data),
    isVisible: section.isVisible,
    createdAt: section.createdAt,
    updatedAt: section.updatedAt,
  };
}

export function serializePageSeo(seo: PageSEO) {
  return {
    id: seo.id,
    pageId: seo.pageId,
    metaTitle: seo.metaTitle,
    metaDescription: seo.metaDescription,
    canonicalUrl: seo.canonicalUrl,
    ogTitle: seo.ogTitle,
    ogDescription: seo.ogDescription,
    ogImageId: seo.ogImageId,
    robots: seo.robots,
    keywords: normalizeJsonArray(seo.keywords).map(String),
    createdAt: seo.createdAt,
    updatedAt: seo.updatedAt,
  };
}

export function serializeMedia(media: Media) {
  return {
    id: media.id,
    filename: media.filename,
    originalFilename: media.originalFilename,
    mimeType: media.mimeType,
    fileSize: media.fileSize,
    width: media.width,
    height: media.height,
    altText: media.altText,
    caption: media.caption,
    publicUrl: media.publicUrl,
    uploadedBy: media.uploadedBy,
    createdAt: media.createdAt,
    updatedAt: media.updatedAt,
  };
}

export function serializeSiteSetting(setting: SiteSetting) {
  const normalizedValue = normalizeJsonColumn(setting.value).value;
  return {
    id: setting.id,
    group: setting.group,
    key: setting.key,
    value: normalizedValue,
    updatedBy: setting.updatedBy,
    updatedAt: setting.updatedAt,
  };
}

export function serializeBlogCategory(category: BlogCategory) {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    sortOrder: category.sortOrder,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
}

export function serializeBlog(blog: Blog) {
  const normalizedContent = normalizeJsonColumn(blog.content).value;
  return {
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    content:
      normalizedContent &&
      typeof normalizedContent === "object" &&
      !Array.isArray(normalizedContent)
        ? normalizedContent
        : null,
    featuredMediaId: blog.featuredMediaId,
    featuredImageAlt: blog.featuredImageAlt,
    authorId: blog.authorId,
    categoryId: blog.categoryId,
    tags: normalizeJsonArray(blog.tags).map(String),
    status: blog.status,
    publishedAt: blog.publishedAt,
    metaTitle: blog.metaTitle,
    metaDescription: blog.metaDescription,
    metaKeywords: blog.metaKeywords,
    ogTitle: blog.ogTitle,
    ogDescription: blog.ogDescription,
    ogImageId: blog.ogImageId,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
  };
}
