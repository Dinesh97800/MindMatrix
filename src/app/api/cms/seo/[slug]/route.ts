import { NextRequest, NextResponse } from "next/server";
import { cmsError } from "@/lib/api/cms-auth";
import { getPublicPageSeo } from "@/lib/cms/public-page-seo";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  const slug = decodeURIComponent((await context.params).slug || "").trim();
  if (!slug || slug.startsWith("admin") || slug.startsWith("api")) {
    return cmsError("Page not found.", 404);
  }

  const seo = await getPublicPageSeo(slug);
  if (!seo) return cmsError("Page SEO not found.", 404);

  return NextResponse.json(seo, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
