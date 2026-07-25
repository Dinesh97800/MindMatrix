import type { MetadataRoute } from "next";
import manifest from "@/data/stitch-manifest.json";
import { SITE_URL } from "@/lib/seo";

/** Required for `output: "export"` (GitHub Pages). */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = manifest.map((entry) => ({
    url: `${SITE_URL}${entry.slug === "home" ? "" : `/${entry.slug}`}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: entry.slug === "home" ? 1 : 0.7,
  }));

  return routes;
}
