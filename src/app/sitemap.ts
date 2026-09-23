import type { MetadataRoute } from "next";
import manifest from "@/data/stitch-manifest.json";
import { SITE_URL } from "@/lib/seo";

/** Required for `output: "export"` (GitHub Pages). */
export const dynamic = "force-static";

// These legacy paths issue permanent redirects in next.config.ts. Search engines
// should discover only their destination URLs, which provide the canonical tag.
const REDIRECTED_SLUGS = new Set([
  "hyperloop-beta",
  "atacama-solar-reserve",
  "metropolis-ev-transit",
  "nanolithography-cluster-control",
  "building-automation",
  "smart-grid",
  "renewable-energy",
  "engineering-whitepapers",
  "application-notes-and-design-guides",
  "technical-downloads-and-sdks",
  "technical-knowledge-base",
  "insights-and-engineering-blog",
  "resources-and-blog",
  "the-future-of-deterministic-edge-computing",
  "stm32",
  "freertos",
  "aws-iot",
  "azure-iot",
  "industrial-iot-solutions",
  "industrial-iot-gateway",
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = manifest
    .filter((entry) => !REDIRECTED_SLUGS.has(entry.slug))
    .map((entry) => ({
      url: `${SITE_URL}${entry.slug === "home" ? "" : `/${entry.slug}`}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: entry.slug === "home" ? 1 : 0.7,
    }));

  return routes;
}
