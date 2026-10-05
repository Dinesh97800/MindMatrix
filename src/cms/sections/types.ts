export type HeroVariant = "split" | "background";

export type HeroSectionData = {
  variant: HeroVariant;
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  titleAccentClassName?: string;
  description?: string;
  summary?: string;
  supportingText?: string;
  imageId?: number | null;
  imageUrl?: string;
  imageAlt?: string;
  backgroundImageId?: number | null;
  backgroundImageUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  alignment?: "left" | "center" | "right";
  overlay?: boolean | string;
  tone?: "light" | "dark";
  eyebrowIcon?: string;
  callouts?: Array<{ title?: string; body?: string; icon?: string }>;
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

export type StructuredSectionType =
  | "content_block"
  | "stats_row"
  | "icon_card_grid"
  | "link_index_grid"
  | "case_study_list"
  | "faq_list"
  | "info_card_pair"
  | "process_timeline"
  | "image_tile_grid"
  | "logo_marquee"
  | "legal_document"
  | "resource_cards"
  | "blog_card_grid"
  | "contact_block";

export type SectionType =
  | "hero"
  | "rich_text"
  | "capabilities"
  | "cta"
  | StructuredSectionType;

export type StructuredSectionData = {
  componentKey?: string;
  sourceFile?: string;
  sourceComponent?: string;
  title?: string;
  eyebrow?: string;
  description?: string;
  supportingText?: string;
  strings?: string[];
  items?: unknown[];
  cards?: unknown[];
  stats?: unknown[];
  links?: Array<{ label?: string; href: string }>;
  images?: string[];
  faqs?: Array<{ question: string; answer: string }>;
  studies?: unknown[];
  sections?: unknown[];
  cta?: Record<string, unknown>;
  content?: Record<string, unknown>;
  lockedLayout?: boolean;
};

export type SectionDataMap = {
  hero: HeroSectionData;
  rich_text: RichTextSectionData;
  capabilities: CapabilitiesSectionData;
  cta: CtaSectionData;
} & Record<StructuredSectionType, StructuredSectionData>;

export type RichTextSectionData = {
  content: Record<string, unknown> | null;
};

export type SerializedSection = {
  id: number;
  pageId: number;
  type: string;
  stableKey?: string | null;
  model?: string | null;
  template?: string | null;
  source?: Record<string, unknown>;
  editorPolicy?: Record<string, unknown>;
  decorations?: Record<string, unknown>;
  sortOrder: number;
  data: Record<string, unknown>;
  isVisible: boolean;
};
