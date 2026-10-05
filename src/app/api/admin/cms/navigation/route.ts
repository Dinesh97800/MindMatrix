import { cmsOk, requireCmsAccess } from "@/lib/api/cms-auth";
import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import { serializePage } from "@/lib/cms/serializers";
import { getExistingWebsiteSlugs } from "@/lib/cms/existing-pages";
import { getDbModels } from "@/lib/db/models";

type NavCategory = {
  id: number;
  label: string;
  slug: string;
  sortOrder: number;
  pages: ReturnType<typeof serializePage>[];
  children: NavCategory[];
};

function buildNavTree(
  categories: Array<{
    id: number;
    label: string;
    slug: string;
    parentId: number | null;
    sortOrder: number;
  }>,
  pages: Array<ReturnType<typeof serializePage>>
): NavCategory[] {
  const pagesByCategory = new Map<number, ReturnType<typeof serializePage>[]>();
  for (const page of pages) {
    if (!page.categoryId) continue;
    const list = pagesByCategory.get(page.categoryId) ?? [];
    list.push(page);
    pagesByCategory.set(page.categoryId, list);
  }

  const byParent = new Map<number | null, typeof categories>();
  for (const category of categories) {
    const list = byParent.get(category.parentId) ?? [];
    list.push(category);
    byParent.set(category.parentId, list);
  }

  const walk = (parentId: number | null): NavCategory[] =>
    (byParent.get(parentId) ?? [])
      .sort((a, b) => a.sortOrder - b.sortOrder || a.label.localeCompare(b.label))
      .map((category) => ({
        id: category.id,
        label: category.label,
        slug: category.slug,
        sortOrder: category.sortOrder,
        pages: (pagesByCategory.get(category.id) ?? []).sort(
          (a, b) => a.sortOrder - b.sortOrder || a.title.localeCompare(b.title)
        ),
        children: walk(category.id),
      }));

  return walk(null);
}

export async function GET() {
  const { error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { PageCategory, Page } = getDbModels();

  const [categories, pages] = await Promise.all([
    PageCategory.findAll({
      attributes: ["id", "label", "slug", "parentId", "sortOrder"],
      order: [
        ["sortOrder", "ASC"],
        ["label", "ASC"],
      ],
    }),
    Page.findAll({
      order: [
        ["sortOrder", "ASC"],
        ["title", "ASC"],
      ],
    }),
  ]);

  const allowedSlugs = new Set(getExistingWebsiteSlugs());
  const filteredPages = pages.filter((page) => allowedSlugs.has(page.slug));

  return cmsOk({
    navigation: buildNavTree(
      categories.map((c) => ({
        id: c.id,
        label: c.label,
        slug: c.slug,
        parentId: c.parentId,
        sortOrder: c.sortOrder,
      })),
      filteredPages.map(serializePage)
    ),
  });
}
