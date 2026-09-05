import { NextRequest } from "next/server";
import { cmsError, cmsOk } from "@/lib/api/cms-auth";
import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import { serializeBlog } from "@/lib/cms/serializers";
import { getDbModels } from "@/lib/db/models";

type RouteContext = { params: Promise<{ slug: string }> };

/**
 * Public read-only CMS API — published blogs only.
 * NOT wired to existing public routes during Phase 2.
 */
export async function GET(_request: NextRequest, context: RouteContext) {
  await ensureCmsDatabaseReady();
  const { Blog } = getDbModels();
  const slug = (await context.params).slug;

  const blog = await Blog.findOne({
    where: { slug, status: "published" },
  });

  if (!blog) return cmsError("Blog not found.", 404);

  return cmsOk({ blog: serializeBlog(blog) });
}
