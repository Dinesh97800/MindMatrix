import type { CanonicalModel } from "./types";

/** Map a canonical model to the existing admin section `type` so current editors still open. */
export function adminTypeFor(
  model: CanonicalModel,
  entityType?: CanonicalSectionEntity
): string {
  switch (model) {
    case "HERO":
      return "hero";
    case "CTA":
      return "cta";
    case "FAQ":
      return "faq_list";
    case "PROCESS":
      return "process_timeline";
    case "LOGOS":
      return "logo_marquee";
    case "METRICS":
      return "stats_row";
    case "ARTICLE":
      return "legal_document";
    case "CONTACT":
    case "FORM":
      return "contact_block";
    case "CARDS":
      return "icon_card_grid";
    case "LISTING":
      if (entityType === "blog") return "blog_card_grid";
      if (entityType === "resource") return "resource_cards";
      if (entityType === "job") return "content_block";
      return "case_study_list";
    default:
      return "content_block";
  }
}

export type CanonicalSectionEntity =
  | "case_study"
  | "blog"
  | "resource"
  | "job"
  | "navigation";

export const STRUCTURAL_SECTION_FIELDS = [
  "stableKey",
  "model",
  "template",
  "source",
  "source_meta",
  "editorPolicy",
  "editor_policy",
  "decorations",
] as const;
