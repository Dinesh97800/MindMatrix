import { isApprovedLayoutPage } from "@/lib/cms/existing-pages";
import type { PageImportBundle } from "@/lib/cms/legacy-content-map";
import type { InventoryBuildResult } from "@/lib/cms/migration/inventory/build-inventory-sections";

export type PageClassification = "fully" | "partial" | "legacy-only";

export function classifyPage(
  slug: string,
  bundle: PageImportBundle | null,
  inventory: InventoryBuildResult
): PageClassification {
  if (inventory.sections.length === 0 && (!bundle || bundle.sections.length === 0)) {
    return "legacy-only";
  }

  if (inventory.unsupported.length === 0 && inventory.sections.length > 0) {
    return "fully";
  }

  if (isApprovedLayoutPage(slug) && inventory.unsupported.length === 0) {
    return "fully";
  }

  if (inventory.sections.length > 0 || (bundle && bundle.sections.length > 0)) {
    return inventory.unsupported.length > 0 ? "partial" : "fully";
  }

  return "legacy-only";
}

export function classificationLabel(status: PageClassification): string {
  switch (status) {
    case "fully":
      return "A — Fully CMS-mapped";
    case "partial":
      return "B — Partially CMS-mapped";
    case "legacy-only":
      return "C — Legacy-only / not yet CMS editable";
  }
}
