import { isApprovedLayoutPage } from "@/lib/cms/existing-pages";

/**
 * Legacy section components that are NOT represented in CMS for each page slug.
 * CMS MIGRATION PENDING — public frontend still renders these directly.
 */
export const UNMAPPED_LEGACY_SECTIONS: Record<string, string[]> = {
  "oil-and-gas": [
    "ExplosiveEnvironmentsSection",
    "SmallAccentSection",
    "Section",
    "Block2Section",
    "AtmosphericBgElementSection",
  ],
  "about-us": ["HeroSection", "Block2006Section", "Section", "Block2Section", "SideNavigationSection"],
  services: ["HeroSection", "Card1Section", "Block2Section", "Section"],
  connectivity: ["HeroSection", "Section", "Block2Section", "Card1Section", "Block4Section", "Block5Section"],
  industries: ["HeroSection", "Section", "RenewableEnergySection", "Block2Section", "Block3Section"],
  solutions: ["HeroSection", "Section"],
  technologies: ["HeroSection", "Section", "Block2Section", "Card1Section"],
  "ai-enabled-engineering": [
    "HeroSection",
    "Block2Section",
    "Block3Section",
    "Block4Section",
    "Block5Section",
    "Block6Section",
    "Block7Section",
    "Block8Section",
  ],
  "case-studies": ["HeroSection", "SelectedProjectExperienceSection", "Block2Section", "Section"],
  "insights-and-engineering-blog": ["HeroSection", "BentoGridOfPostsSection"],
  "resources-and-blog": [
    "HeroSection",
    "FeaturedArticleCardAsymmetricLayoutSection",
    "ResourceCard1BlogSection",
    "Block2Section",
    "Section",
  ],
  "privacy-policy": ["HeroSection", "SideNavigationSection", "TermsContentSection", "Section"],
  "terms-and-conditions": ["HeroSection", "TermsContentSection", "Section", "Block2Section"],
  "contact-us": ["HeroSection", "ContactUsPageContent.form"],
  "request-consultation": ["HeroSection", "Section", "LeftColumnHighTrustContentSection"],
  "contact-us-and-engineering-consultation": [
    "HeroSection",
    "ConsultationFormSection",
    "FaqItem1Section",
    "Section",
  ],
  careers: ["HeroSection", "Section", "Block2Section", "Block3Section", "Block4Section"],
};

export function getUnmappedLegacySections(slug: string): string[] {
  if (UNMAPPED_LEGACY_SECTIONS[slug]) {
    return UNMAPPED_LEGACY_SECTIONS[slug];
  }
  if (isApprovedLayoutPage(slug)) {
    return [];
  }
  return ["Custom PageContent sections (not mapped to CMS section types)"];
}
