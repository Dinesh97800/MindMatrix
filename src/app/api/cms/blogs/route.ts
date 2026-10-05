import { NextRequest } from "next/server";
import { cmsOk } from "@/lib/api/cms-auth";
import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import { serializeBlog } from "@/lib/cms/serializers";
import { getDbModels } from "@/lib/db/models";

/**
 * Public read-only CMS API — published blogs only.
 * NOT wired to existing public routes during Phase 2.
 */
export async function GET(request: NextRequest) {
  await ensureCmsDatabaseReady();
  const { Blog } = getDbModels();

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") ?? 12)));
  const offset = (page - 1) * limit;

  const { rows, count } = await Blog.findAndCountAll({
    where: { status: "published" },
    order: [["publishedAt", "DESC"]],
    limit,
    offset,
    attributes: {
      exclude: [],
    },
  });

  return cmsOk({
    blogs: rows.map(serializeBlog),
    pagination: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
    },
  });
}
