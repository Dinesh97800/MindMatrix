export const HERO_VARIANTS = [
  { value: "split", label: "Split" },
  { value: "background", label: "Background Image" },
] as const;

export const HERO_ALIGNMENTS = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
] as const;

export function validateHeroData(data: Record<string, unknown>): Record<string, unknown> {
  const variant = data.variant === "background" ? "background" : "split";
  return {
    ...data,
    variant,
    eyebrow: typeof data.eyebrow === "string" ? data.eyebrow : "",
    title: typeof data.title === "string" ? data.title : "",
    titleAccent: typeof data.titleAccent === "string" ? data.titleAccent : "",
    titleAccentClassName:
      typeof data.titleAccentClassName === "string" ? data.titleAccentClassName : "",
    description: typeof data.description === "string" ? data.description : "",
    summary: typeof data.summary === "string" ? data.summary : "",
    supportingText: typeof data.supportingText === "string" ? data.supportingText : "",
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
    overlay: typeof data.overlay === "string" ? data.overlay : Boolean(data.overlay),
    eyebrowIcon: typeof data.eyebrowIcon === "string" ? data.eyebrowIcon : "",
    lockedVariant: Boolean(data.lockedVariant),
  };
}
