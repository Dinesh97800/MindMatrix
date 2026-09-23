import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { publicSlugFromPathname } from "@/lib/cms/public-slug";
import { getPublishedPublicPage } from "@/lib/cms/published-public-page";

export async function cmsOrLegacyMetadata(
  path: string,
  fallback: Metadata
): Promise<Metadata> {
  const slug = publicSlugFromPathname(path);
  const published = await getPublishedPublicPage(slug);
  if (!published?.seo?.metaTitle && !published?.seo?.metaDescription) {
    return fallback;
  }

  return buildPageMetadata({
    title: published.seo?.metaTitle || published.page.title,
    description: published.seo?.metaDescription || String(fallback.description ?? ""),
    path,
    canonical: published.seo?.canonicalUrl,
    absoluteTitle: true,
  });
}
