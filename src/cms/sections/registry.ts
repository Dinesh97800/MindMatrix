import { heroDefaults } from "./hero/HeroDefaults";
import { validateHeroData } from "./hero/HeroSchema";
import { richTextDefaults } from "./rich-text/RichTextDefaults";
import { ctaDefaults } from "./cta/CTADefaults";
import {
  capabilitiesDefaults,
  validateCapabilitiesData,
} from "./capabilities/CapabilitiesSchema";
import type { SectionType } from "./types";

export type SectionDefinition = {
  type: SectionType;
  label: string;
  description: string;
  defaults: Record<string, unknown>;
  validate: (data: Record<string, unknown>) => Record<string, unknown>;
};

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
