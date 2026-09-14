import type { SectionType } from "@/cms/sections/types";

/** Maps legacy React component names to CMS section types. */
export const COMPONENT_TO_SECTION_TYPE: Record<string, SectionType> = {
  StatsGridSection: "stats_row",
  Service1Section: "icon_card_grid",
  Card1Section: "icon_card_grid",
  WhyChooseUsSection: "icon_card_grid",
  TinymlCardSection: "icon_card_grid",
  ProgressLineSection: "process_timeline",
  RepeatedLogosForContinuousLoopSection: "logo_marquee",
  SelectedProjectExperienceSection: "case_study_list",
  FaqItem1Section: "faq_list",
  TermsContentSection: "legal_document",
  SideNavigationSection: "legal_document",
  ResourceCard1BlogSection: "resource_cards",
  BentoGridOfPostsSection: "blog_card_grid",
  FeaturedArticleCardAsymmetricLayoutSection: "blog_card_grid",
  SolutionCardIiotGatewaySection: "content_block",
  LeftSideOfficeLocationsSection: "contact_block",
  LeftColumnHighTrustContentSection: "contact_block",
  ConsultationFormSection: "contact_block",
  InteractiveMapPlaceholderSection: "contact_block",
};

export const HERO_COMPONENT_KEYS = new Set([
  "ConfiguredHero",
  "HeroSection",
  "PageContentHero",
  "AnimatedShaderBackgroundSection",
  "StatsGridSection",
  "DecorativeTechnicalLinesSection",
]);

export function resolveSectionType(componentKey: string): SectionType {
  return COMPONENT_TO_SECTION_TYPE[componentKey] ?? "content_block";
}

export function makeSourceKey(slug: string, componentKey: string): string {
  return `${slug}::${componentKey}`;
}
