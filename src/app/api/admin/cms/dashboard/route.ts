import { cmsOk, requireCmsAccess } from "@/lib/api/cms-auth";
import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import { getDbModels } from "@/lib/db/models";

export async function GET() {
  const { error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { Page, Blog, Media, ContactSubmission } = getDbModels();

  const [
    pagesTotal,
    pagesPublished,
    pagesDraft,
    blogsTotal,
    blogsPublished,
    blogsDraft,
    mediaCount,
    submissionsNew,
  ] = await Promise.all([
    Page.count(),
    Page.count({ where: { status: "published" } }),
    Page.count({ where: { status: "draft" } }),
    Blog.count(),
    Blog.count({ where: { status: "published" } }),
    Blog.count({ where: { status: "draft" } }),
    Media.count(),
    ContactSubmission.count({ where: { status: "new" } }),
  ]);

  const [recentPages, recentBlogs] = await Promise.all([
    Page.findAll({
      order: [["updatedAt", "DESC"]],
      limit: 5,
      attributes: ["id", "title", "slug", "status", "updatedAt"],
    }),
    Blog.findAll({
      order: [["updatedAt", "DESC"]],
      limit: 5,
      attributes: ["id", "title", "slug", "status", "updatedAt"],
    }),
  ]);

  return cmsOk({
    stats: {
      pagesTotal,
      pagesPublished,
      pagesDraft,
      blogsTotal,
      blogsPublished,
      blogsDraft,
      mediaCount,
      submissionsNew,
    },
    recentPages,
    recentBlogs,
  });
}
