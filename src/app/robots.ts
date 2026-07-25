import type { MetadataRoute } from "next";
import { IS_PRELAUNCH, SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (IS_PRELAUNCH) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
