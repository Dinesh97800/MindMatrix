import { NextRequest } from "next/server";
import { cmsError, cmsOk } from "@/lib/api/cms-auth";
import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import { getPublishedPage } from "@/lib/cms/public-page-loader";

type RouteContext = { params: Promise<{ slug: string }> };

/**
 * Public read-only CMS API — published pages only.
 * NOT wired to existing public routes during Phase 2.
 */
export async function GET(_request: NextRequest, context: RouteContext) {
  await ensureCmsDatabaseReady();
  const slug = (await context.params).slug;

  const result = await getPublishedPage(slug);
  if (!result) return cmsError("Page not found.", 404);

  return cmsOk(result);
}
