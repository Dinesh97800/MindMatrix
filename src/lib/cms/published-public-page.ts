import { buildCanonicalPreviewPayload } from "@/cms/preview/resolve";
import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import { getDbModels } from "@/lib/db/models";
import type { PreviewPagePayload } from "@/cms/preview/types";

export async function getPublishedPublicPage(
  slug: string | null
): Promise<PreviewPagePayload | null> {
  if (!slug) return null;

  try {
    await ensureCmsDatabaseReady();
    const { Page } = getDbModels();
    const page = await Page.findOne({
      where: {
        slug,
        status: "published",
        classification: "active",
        publishable: true,
      },
    });
    if (!page) return null;

    const payload = await buildCanonicalPreviewPayload(page.id);
    if (!payload || payload.page.classification === "redirect") return null;
    if (payload.sections.length === 0) return null;
    return payload;
  } catch {
    return null;
  }
}
