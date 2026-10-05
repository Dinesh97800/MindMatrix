import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { getPublicPageSeoForPath } from "@/lib/cms/public-page-seo";

export async function cmsOrLegacyMetadata(
  path: string,
  fallback: Metadata
): Promise<Metadata> {
  const seo = await getPublicPageSeoForPath(path);
  if (!seo?.title && !seo?.description) {
    return fallback;
  }

  return buildPageMetadata({
    title: seo.title || String(fallback.title ?? ""),
    description: seo.description || String(fallback.description ?? ""),
    path,
    absoluteTitle: true,
    canonical: seo.canonical,
  });
}
