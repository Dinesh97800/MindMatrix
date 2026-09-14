const SPECIAL_TEMPLATES: Record<string, string> = {
  "about.working-model": "about-working-model",
  "about.production-transition": "about-production-transition",
  "careers.employee-success": "careers-employee-success",
  "careers.jobs": "careers-jobs",
  "home.hero-with-metrics": "home-hero",
  "home.lifecycle": "process",
  "home.technology-marquee": "logo-marquee",
  "home.industries": "home-industries",
  "home.services": "service-cards",
  "home.why-choose-us": "why-choose-us",
  "services.hero": "hero",
  "services.core-services": "service-cards",
  "services.engineering-approach": "services-engineering-approach",
  "ai.solution-domains": "ai-solution-domains",
  "ai.capability-areas": "ai-capability-areas",
  "ai.platforms": "ai-platforms",
  "ai.solution-categories": "ai-solution-categories",
  "ai.secondary-capability": "ai-secondary-capability",
  "connectivity.rf-design": "connectivity-rf-design",
  "connectivity.deployments": "connectivity-deployments",
  "case-studies.projects": "case-study-listing",
  "shared.why-choose-us": "why-choose-us",
};

const COMPONENT_ADAPTERS: Record<string, string> = {
  StatsGridSection: "home-hero",
  ConfiguredHero: "hero",
  PageContentHero: "hero",
  HeroSection: "hero",
  AnimatedShaderBackgroundSection: "hero",
  DecorativeTechnicalLinesSection: "hero",
  ApprovedTypicalScope: "approved-scope",
  ApprovedInfoCards: "approved-info",
  IndexLinkGrid: "index-grid",
  WhyChooseUsSection: "why-choose-us",
  Card1Section: "service-cards",
  Service1Section: "service-cards",
  ApprovedCta: "approved-cta",
  IndexCta: "approved-cta",
  ApprovedFaqList: "faq",
  FaqItem1Section: "faq",
  SelectedProjectExperienceSection: "case-study-listing",
  ProgressLineSection: "process",
  RepeatedLogosForContinuousLoopSection: "logos",
  SideNavigationSection: "article",
  TermsContentSection: "article",
  ConsultationFormSection: "form",
  FiltersSection: "listing",
};

const MODEL_ADAPTERS: Record<string, string> = {
  HERO: "hero",
  CONTENT: "content",
  CARDS: "cards",
  MEDIA: "media",
  METRICS: "metrics",
  PROCESS: "process",
  ARCH: "arch",
  TABLE: "table",
  LOGOS: "logos",
  CTA: "cta",
  FAQ: "faq",
  LISTING: "listing",
  ARTICLE: "article",
  FORM: "form",
  CONTACT: "contact",
  NAV: "nav",
};

export const PREVIEW_ADAPTER_IDS = [
  "about-working-model",
  "about-production-transition",
  "careers-employee-success",
  "careers-jobs",
  "home-hero",
  "home-industries",
  "logo-marquee",
  "hero",
  "approved-scope",
  "approved-info",
  "index-grid",
  "why-choose-us",
  "service-cards",
  "services-engineering-approach",
  "ai-solution-domains",
  "ai-capability-areas",
  "ai-platforms",
  "ai-solution-categories",
  "ai-secondary-capability",
  "connectivity-rf-design",
  "connectivity-deployments",
  "cards",
  "approved-cta",
  "cta",
  "content",
  "media",
  "metrics",
  "process",
  "arch",
  "table",
  "logos",
  "faq",
  "case-study-listing",
  "listing",
  "article",
  "form",
  "contact",
  "nav",
] as const;

export type PreviewAdapterId = (typeof PREVIEW_ADAPTER_IDS)[number];

export function resolvePreviewAdapterId(input: {
  template?: string | null;
  model?: string | null;
  sourceComponent?: string | null;
}): PreviewAdapterId | null {
  if (input.model === "UTILITY") return null;
  const template = input.template ?? "";
  if (template && SPECIAL_TEMPLATES[template]) {
    return SPECIAL_TEMPLATES[template] as PreviewAdapterId;
  }
  const component = input.sourceComponent ?? "";
  if (component && COMPONENT_ADAPTERS[component]) {
    return COMPONENT_ADAPTERS[component] as PreviewAdapterId;
  }
  const model = input.model ?? "";
  if (model && MODEL_ADAPTERS[model]) {
    return MODEL_ADAPTERS[model] as PreviewAdapterId;
  }
  return null;
}

export function previewReactTemplate(adapterId: string | null): string {
  switch (adapterId) {
    case "about-working-model":
      return "src/components/pages/about-us/sections/Section.tsx";
    case "about-production-transition":
      return "src/components/pages/about-us/sections/Block2006Section.tsx";
    case "careers-employee-success":
      return "src/components/pages/careers/sections/Block2Section.tsx";
    case "careers-jobs":
      return "src/components/pages/careers/sections/FiltersSection.tsx";
    case "home-hero":
      return "src/components/pages/home/sections/StatsGridSection.tsx";
    case "home-industries":
      return "src/components/pages/home/sections/Section.tsx";
    case "logo-marquee":
      return "src/components/pages/home/sections/RepeatedLogosForContinuousLoopSection.tsx";
    case "hero":
      return "src/components/sections/hero/ConfiguredHero.tsx → SplitHero | BackgroundImageHero";
    case "approved-scope":
    case "approved-info":
    case "approved-cta":
      return "src/components/pages/shared/ApprovedPageLayout.tsx";
    case "index-grid":
      return "src/components/pages/shared/IndexPageLayout.tsx";
    case "why-choose-us":
      return "src/components/sections/WhyChooseUsSection.tsx";
    case "service-cards":
      return "src/components/pages/services/sections/Card1Section.tsx";
    case "services-engineering-approach":
      return "src/components/pages/services/sections/Section.tsx";
    case "ai-solution-domains":
      return "src/components/pages/ai-enabled-engineering/sections/TinymlCardSection.tsx";
    case "ai-capability-areas":
      return "src/components/pages/ai-enabled-engineering/sections/Section.tsx";
    case "ai-platforms":
      return "src/components/pages/ai-enabled-engineering/sections/Block2Section.tsx";
    case "ai-solution-categories":
      return "src/components/pages/ai-enabled-engineering/sections/Block3Section.tsx";
    case "ai-secondary-capability":
      return "src/components/pages/ai-enabled-engineering/sections/Block4Section.tsx";
    case "connectivity-rf-design":
      return "src/components/pages/connectivity/sections/Section.tsx";
    case "connectivity-deployments":
      return "src/components/pages/connectivity/sections/App1Section.tsx";
    case "cta":
      return "src/components/pages/services/sections/Block2Section.tsx";
    case "process":
      return "src/components/pages/home/sections/ProgressLineSection.tsx";
    case "logos":
      return "src/components/pages/home/sections/RepeatedLogosForContinuousLoopSection.tsx";
    case "case-study-listing":
      return "src/components/pages/case-studies/sections/SelectedProjectExperienceSection.tsx";
    case "faq":
      return "src/components/pages/shared/ApprovedPageLayout.tsx (FAQ)";
    case "cards":
      return "src/components/pages/services/sections/Card1Section.tsx (card grid)";
    case "content":
    case "media":
      return "existing page content/media section markup";
    case "metrics":
      return "src/components/pages/home/sections/StatsGridSection.tsx (metrics row)";
    case "article":
      return "legal document section markup";
    case "form":
      return "consultation form copy only";
    case "contact":
      return "contact locations markup";
    case "nav":
      return "legal/document navigation labels";
    case "arch":
      return "architecture nodes from CMS (no invented geometry)";
    case "table":
      return "structured table from CMS columns/rows";
    case "listing":
      return "first-class entity listing";
    default:
      return "unmapped";
  }
}
