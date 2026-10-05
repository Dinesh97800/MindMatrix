import { heroDefaults } from "./hero/HeroDefaults";
import { validateHeroData } from "./hero/HeroSchema";
import { richTextDefaults } from "./rich-text/RichTextDefaults";
import { ctaDefaults } from "./cta/CTADefaults";
import {
  capabilitiesDefaults,
  validateCapabilitiesData,
} from "./capabilities/CapabilitiesSchema";
import {
  structuredContentDefaults,
  validateStructuredContent,
} from "./structured/StructuredContentSchema";
import type { SectionType, StructuredSectionType } from "./types";

export type SectionDefinition = {
  type: SectionType;
  label: string;
  description: string;
  defaults: Record<string, unknown>;
  validate: (data: Record<string, unknown>) => Record<string, unknown>;
};

const STRUCTURED_SECTION_LABELS: Record<StructuredSectionType, { label: string; description: string }> = {
  content_block: {
    label: "Content Block",
    description: "Legacy section content preserved from an existing React component.",
  },
  stats_row: { label: "Stats Row", description: "Hero statistics and headline content." },
  icon_card_grid: { label: "Icon Card Grid", description: "Cards with title, description, and optional links." },
  link_index_grid: { label: "Link Index Grid", description: "Index page link cards." },
  case_study_list: { label: "Case Study List", description: "Project experience case studies." },
  faq_list: { label: "FAQ List", description: "Question and answer pairs." },
  info_card_pair: { label: "Info Card Pair", description: "Two-column informational cards." },
  process_timeline: { label: "Process Timeline", description: "Sequential process steps." },
  image_tile_grid: { label: "Image Tile Grid", description: "Image tiles with titles and links." },
  logo_marquee: { label: "Logo Marquee", description: "Scrolling logo or label strip." },
  legal_document: { label: "Legal Document", description: "Structured legal page sections." },
  resource_cards: { label: "Resource Cards", description: "Downloadable resource cards." },
  blog_card_grid: { label: "Blog Card Grid", description: "Blog or article cards." },
  contact_block: { label: "Contact Block", description: "Contact and consultation supporting content." },
};

function buildStructuredRegistryEntry(type: StructuredSectionType): SectionDefinition {
  const meta = STRUCTURED_SECTION_LABELS[type];
  return {
    type,
    label: meta.label,
    description: meta.description,
    defaults: structuredContentDefaults,
    validate: validateStructuredContent,
  };
}

export const SECTION_REGISTRY: Record<SectionType, SectionDefinition> = {
  hero: {
    type: "hero",
    label: "Hero",
    description: "Page hero with split or background image layout.",
    defaults: heroDefaults,
    validate: validateHeroData,
  },
  rich_text: {
    type: "rich_text",
    label: "Rich Text",
    description: "Formatted text content block.",
    defaults: richTextDefaults,
    validate: (data) => ({
      content:
        data.content && typeof data.content === "object"
          ? (data.content as Record<string, unknown>)
          : richTextDefaults.content,
    }),
  },
  capabilities: {
    type: "capabilities",
    label: "Capabilities",
    description: "Heading and bullet list of capabilities or scope items.",
    defaults: capabilitiesDefaults,
    validate: validateCapabilitiesData,
  },
  cta: {
    type: "cta",
    label: "Call to Action",
    description: "Prominent call-to-action banner.",
    defaults: ctaDefaults,
    validate: (data) => ({
      title: typeof data.title === "string" ? data.title : "",
      description: typeof data.description === "string" ? data.description : "",
      buttonText: typeof data.buttonText === "string" ? data.buttonText : "",
      buttonUrl: typeof data.buttonUrl === "string" ? data.buttonUrl : "",
      secondaryButtonText:
        typeof data.secondaryButtonText === "string" ? data.secondaryButtonText : "",
      secondaryButtonUrl:
        typeof data.secondaryButtonUrl === "string" ? data.secondaryButtonUrl : "",
      variant:
        data.variant === "secondary" || data.variant === "outline"
          ? data.variant
          : "primary",
    }),
  },
  content_block: buildStructuredRegistryEntry("content_block"),
  stats_row: buildStructuredRegistryEntry("stats_row"),
  icon_card_grid: buildStructuredRegistryEntry("icon_card_grid"),
  link_index_grid: buildStructuredRegistryEntry("link_index_grid"),
  case_study_list: buildStructuredRegistryEntry("case_study_list"),
  faq_list: buildStructuredRegistryEntry("faq_list"),
  info_card_pair: buildStructuredRegistryEntry("info_card_pair"),
  process_timeline: buildStructuredRegistryEntry("process_timeline"),
  image_tile_grid: buildStructuredRegistryEntry("image_tile_grid"),
  logo_marquee: buildStructuredRegistryEntry("logo_marquee"),
  legal_document: buildStructuredRegistryEntry("legal_document"),
  resource_cards: buildStructuredRegistryEntry("resource_cards"),
  blog_card_grid: buildStructuredRegistryEntry("blog_card_grid"),
  contact_block: buildStructuredRegistryEntry("contact_block"),
};

export const SECTION_TYPE_OPTIONS = Object.values(SECTION_REGISTRY).map(
  ({ type, label, description }) => ({ type, label, description })
);

export function getSectionDefinition(type: string): SectionDefinition | null {
  return SECTION_REGISTRY[type as SectionType] ?? null;
}

export function getDefaultSectionData(type: string): Record<string, unknown> {
  const definition = getSectionDefinition(type);
  return definition ? { ...definition.defaults } : {};
}

export function validateSectionData(
  type: string,
  data: Record<string, unknown>
): Record<string, unknown> {
  const definition = getSectionDefinition(type);
  if (!definition) return data;
  return definition.validate(data);
}

export function isStructuredSectionType(type: string): boolean {
  return type in STRUCTURED_SECTION_LABELS;
}
