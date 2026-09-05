import type { HeroSectionData } from "../types";

export const HERO_VARIANTS = [
  { value: "split", label: "Split" },
  { value: "background", label: "Background Image" },
] as const;

export const HERO_ALIGNMENTS = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
] as const;

export function validateHeroData(data: Record<string, unknown>): HeroSectionData {
  const variant = data.variant === "background" ? "background" : "split";
  return {
    variant,
    eyebrow: typeof data.eyebrow === "string" ? data.eyebrow : "",
    title: typeof data.title === "string" ? data.title : "",
    description: typeof data.description === "string" ? data.description : "",
    imageId: typeof data.imageId === "number" ? data.imageId : null,
    imageUrl: typeof data.imageUrl === "string" ? data.imageUrl : undefined,
    imageAlt: typeof data.imageAlt === "string" ? data.imageAlt : "",
    backgroundImageId:
      typeof data.backgroundImageId === "number" ? data.backgroundImageId : null,
    backgroundImageUrl:
      typeof data.backgroundImageUrl === "string" ? data.backgroundImageUrl : undefined,
    ctaText: typeof data.ctaText === "string" ? data.ctaText : "",
    ctaUrl: typeof data.ctaUrl === "string" ? data.ctaUrl : "",
    alignment:
      data.alignment === "center" || data.alignment === "right"
        ? data.alignment
        : "left",
    overlay: Boolean(data.overlay),
    lockedVariant: Boolean(data.lockedVariant),
  };
}
