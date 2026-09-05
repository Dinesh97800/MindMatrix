import type { Page } from "@/lib/db/models/Page";
import { getDbModels } from "@/lib/db/models";

export type MediaUsageReference = {
  type: "page_section" | "page_seo" | "blog_featured" | "blog_og";
  id: number;
  label: string;
};

export async function findMediaUsage(mediaId: number): Promise<MediaUsageReference[]> {
  const { Page, PageSection, PageSEO, Blog } = getDbModels();
  const references: MediaUsageReference[] = [];

  const seoRows = await PageSEO.findAll({
    where: { ogImageId: mediaId },
    include: [{ model: Page, as: "page", attributes: ["id", "title", "slug"] }],
  });

  for (const seo of seoRows) {
    const page = seo.get("page") as InstanceType<typeof Page> | undefined;
    references.push({
      type: "page_seo",
      id: seo.pageId,
      label: page ? `Page SEO: ${page.title}` : `Page SEO #${seo.pageId}`,
    });
  }

  const blogFeatured = await Blog.findAll({
    where: { featuredMediaId: mediaId },
    attributes: ["id", "title", "slug"],
  });
  for (const blog of blogFeatured) {
    references.push({
      type: "blog_featured",
      id: blog.id,
      label: `Blog featured image: ${blog.title}`,
    });
  }

  const blogOg = await Blog.findAll({
    where: { ogImageId: mediaId },
    attributes: ["id", "title", "slug"],
  });
  for (const blog of blogOg) {
    references.push({
      type: "blog_og",
      id: blog.id,
      label: `Blog OG image: ${blog.title}`,
    });
  }

  const sections = await PageSection.findAll({
    include: [{ model: Page, as: "page", attributes: ["id", "title", "slug"] }],
  });

  for (const section of sections) {
    if (sectionReferencesMedia(section.data, mediaId)) {
      const page = section.get("page") as InstanceType<typeof Page> | undefined;
      references.push({
        type: "page_section",
        id: section.id,
        label: page
          ? `Section "${section.type}" on ${page.title}`
          : `Section #${section.id}`,
      });
    }
  }

  return references;
}

function sectionReferencesMedia(
  data: Record<string, unknown> | null | undefined,
  mediaId: number
): boolean {
  if (!data) return false;

  const keys = [
    "imageId",
    "mediaId",
    "backgroundImageId",
    "ogImageId",
    "featuredMediaId",
  ];

  for (const key of keys) {
    if (data[key] === mediaId) return true;
  }

  if (Array.isArray(data.images)) {
    for (const item of data.images) {
      if (typeof item === "object" && item && "mediaId" in item) {
        if ((item as { mediaId?: number }).mediaId === mediaId) return true;
      }
      if (typeof item === "number" && item === mediaId) return true;
    }
  }

  if (Array.isArray(data.items)) {
    for (const item of data.items) {
      if (typeof item === "object" && item && sectionReferencesMedia(item as Record<string, unknown>, mediaId)) {
        return true;
      }
    }
  }

  return false;
}

export function isSlugValid(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug === "";
}

export function normalizeSlug(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
