export type HeroVariant = "split" | "background";

export type HeroSectionData = {
  variant: HeroVariant;
  eyebrow?: string;
  title?: string;
  description?: string;
  imageId?: number | null;
  imageUrl?: string;
  imageAlt?: string;
  backgroundImageId?: number | null;
  backgroundImageUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  alignment?: "left" | "center" | "right";
  overlay?: boolean;
  /** When true, variant cannot be changed in admin UI. */
  lockedVariant?: boolean;
};

export type CapabilitiesSectionData = {
  heading?: string;
  items: string[];
};

export type CtaSectionData = {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  variant?: "primary" | "secondary" | "outline";
};

export type SectionType = "hero" | "rich_text" | "capabilities" | "cta";

export type SectionDataMap = {
  hero: HeroSectionData;
  rich_text: RichTextSectionData;
  capabilities: CapabilitiesSectionData;
  cta: CtaSectionData;
};

export type RichTextSectionData = {
  content: Record<string, unknown> | null;
};

export type SerializedSection = {
  id: number;
  pageId: number;
  type: string;
  sortOrder: number;
  data: Record<string, unknown>;
  isVisible: boolean;
};
