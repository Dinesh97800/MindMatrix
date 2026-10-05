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
  "ev-infrastructure.challenges": "ev-infrastructure-challenges",
  "ev-infrastructure.solutions": "ev-infrastructure-solutions",
  "ev-infrastructure.case-study": "ev-infrastructure-case-study",
  "ev-infrastructure.sustainability": "ev-infrastructure-sustainability",
  "oil-gas.challenges": "oil-gas-challenges",
  "oil-gas.solutions": "oil-gas-solutions",
  "oil-gas.stack-marquee": "oil-gas-stack-marquee",
  "oil-gas.quantum-ready": "oil-gas-quantum-ready",
  "oil-gas.hardening": "oil-gas-hardening",
  "smart-infrastructure.challenges": "smart-infrastructure-challenges",
  "smart-infrastructure.solutions": "smart-infrastructure-solutions",
  "smart-infrastructure.expertise": "smart-infrastructure-expertise",
  "smart-infrastructure.ev-grid": "smart-infrastructure-ev-grid",
  "smart-infrastructure.modernization": "smart-infrastructure-modernization",
  "contact-us.locations": "contact-us-locations",
  "contact-us.project-inquiry": "contact-us-inquiry",
  "consultation.enquiry": "consultation-enquiry",
  "consultation.office-map": "consultation-office",
  "consultation.technical-faq": "consultation-faq",
  "consultation.supporting-links": "consultation-links",
  "request-consultation.trust-copy": "request-consultation-trust",
  "request-consultation.form": "request-consultation-form",
  "request-consultation.responsibility": "request-consultation-responsibility",
  "privacy-policy.legal-document": "privacy-policy-document",
  "legal.toc": "privacy-policy-toc",
  "terms.legal-document": "terms-document",
  "bess.challenges": "bess-challenges",
  "bess.hardware-software": "bess-hardware-software",
  "bess.technology-arsenal": "bess-arsenal",
  "bess.case-study": "bess-case-study",
  "bess.engineering-core": "bess-engineering-core",
  "bess.energy-future": "bess-cta",
  "bms.architecture": "bms-architecture",
  "bms.silicon-platforms": "bms-silicon",
  "bms.industrial-applications": "bms-applications",
  "bms.power-solution": "bms-cta",
  "earth-resistance.benefits": "erm-benefits",
  "earth-resistance.system": "erm-architecture",
  "earth-resistance.applications": "erm-applications",
  "earth-resistance.operational-benefits": "erm-operational",
  "earth-resistance.security": "erm-cta",
  "cognitive-core.performance": "cco-metrics",
  "cognitive-core.risks": "cco-risks",
  "cognitive-core.hardware-rtos": "cco-hardware",
  "cognitive-core.stack": "cco-stack",
  "cognitive-core.optimization": "cco-cta",
  "cognitive-core.related-projects": "cco-related",
  "energy-management.challenges": "em-challenges",
  "energy-management.hardware-software": "em-hardware",
  "energy-management.system": "em-tech",
  "energy-management.transit-case": "em-case",
  "energy-management.capabilities": "em-capabilities",
  "energy-management.audit": "em-cta",
  "environmental.challenges": "env-challenges",
  "environmental.infrastructure": "env-infrastructure",
  "environmental.case-study": "env-case",
  "environmental.ecological-data": "env-cta",
  "industrial-controller.architecture": "ic-architecture",
  "industrial-controller.connectivity": "ic-connectivity",
  "industrial-controller.upgrade": "ic-cta",
  "esp32.capabilities": "esp-capabilities",
  "esp32.engineering-core": "esp-core",
  "esp32.deployment": "esp-deployment",
  "esp32.applications": "esp-applications",
  "esp32.scale": "esp-cta",
  "microchip.product-families": "mc-families",
  "microchip.mixed-signal": "mc-mixed",
  "microchip.ruggedness": "mc-ruggedness",
  "microchip.impact-areas": "mc-impact",
  "microchip.innovation": "mc-cta",
  "nordic.platform-benefits": "nd-benefits",
  "nordic.wireless-stack": "nd-stack",
  "nordic.deployments": "nd-deployments",
  "nordic.authority": "nd-cta",
  "nxp.domain-expertise": "nxp-expertise",
  "nxp.hardware": "nxp-hardware",
  "nxp.implementation": "nxp-implementation",
  "nxp.future": "nxp-cta",
  "pipeline.vulnerabilities": "pl-vulnerabilities",
  "pipeline.solutions": "pl-solutions",
  "pipeline.technical-superiority": "pl-superiority",
  "pipeline.asset-tracking": "pl-asset",
  "pipeline.security": "pl-cta",
  "quantum-ready.risks": "qr-risks",
  "quantum-ready.architecture": "qr-architecture",
  "quantum-ready.success": "qr-metrics",
  "quantum-ready.outcomes": "qr-outcomes",
  "quantum-ready.security": "qr-cta",
  "quantum-ready.related-projects": "qr-related",
  "renesas.hero": "rn-hero",
  "renesas.families": "rn-families",
  "renesas.engineering-experience": "rn-experience",
  "renesas.verticals": "rn-verticals",
  "renesas.ruggedness": "rn-cta",
  "solutions.solution-catalog": "sol-catalog",
  "solutions.technical-inquiry": "sol-inquiry",
  "ti.technology-domains": "ti-domains",
  "ti.signal-integrity": "ti-integrity",
  "ti.sensor-fusion": "ti-fusion",
  "ti.critical-infrastructure": "ti-infrastructure",
  "ti.advantage": "ti-advantage",
  "ti.system-design": "ti-cta",
  "wsn.overview": "wsn-overview",
  "wsn.topology": "wsn-topology",
  "wsn.standards": "wsn-standards",
  "wsn.applications": "wsn-applications",
  "wsn.strategy": "wsn-cta",
  "case-studies.projects": "case-study-listing",
  "shared.why-choose-us": "why-choose-us",
};

const COMPONENT_ADAPTERS: Record<string, string> = {
  StatsGridSection: "home-hero",
  ConfiguredHero: "hero",
  PageContentHero: "hero",
  HeroSection: "hero",
  AnimatedShaderBackgroundSection: "hero",
  DecorativeTechnicalLinesSection: "rn-hero",
  ApprovedTypicalScope: "approved-scope",
  ApprovedInfoCards: "approved-info",
  IndexLinkGrid: "index-grid",
  WhyChooseUsSection: "why-choose-us",
  BentoGridForArchitectureSection: "bms-architecture",
  Card1Section: "service-cards",
  Service1Section: "service-cards",
  ApprovedCta: "approved-cta",
  IndexCta: "approved-cta",
  ApprovedFaqList: "faq",
  FaqItem1Section: "faq",
  SelectedProjectExperienceSection: "case-study-listing",
  TheProblemSection: "cco-risks",
  VisualRepresentationOfArchitectureSection: "cco-stack",
  ExplosiveEnvironmentsSection: "oil-gas-challenges",
  SmallAccentSection: "oil-gas-solutions",
  AtmosphericBgElementSection: "oil-gas-hardening",
  DecorativeAtmosphericBackgroundSection: "env-cta",
  ProcessingCoreSection: "ic-architecture",
  SubtleTechBackgroundEffectSection: "ic-cta",
  PicCardSection: "mc-families",
  GlassOverlayInfoSection: "mc-mixed",
  MainFeatureCardSection: "nd-benefits",
  ApplicationCard1Section: "nd-deployments",
  EdgeIntelligenceSection: "nxp-expertise",
  InteractiveLabelsOverlaySection: "nxp-hardware",
  AbstractBackgroundDecorationSection: "nxp-cta",
  Rl78CardSection: "rn-families",
  UseCase1Section: "rn-verticals",
  SolutionCardIiotGatewaySection: "sol-catalog",
  BackgroundTechLinesAnimationPlaceholderSection: "sol-inquiry",
  PowerManagementSection: "ti-domains",
  MedicalSection: "ti-infrastructure",
  EndNodesSection: "wsn-topology",
  SubtleBackgroundDecorationSection: "wsn-cta",
  ProgressLineSection: "process",
  RepeatedLogosForContinuousLoopSection: "logos",
  SideNavigationSection: "article",
  TermsContentSection: "terms-document",
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
  "ev-infrastructure-challenges",
  "ev-infrastructure-solutions",
  "ev-infrastructure-case-study",
  "ev-infrastructure-sustainability",
  "oil-gas-challenges",
  "oil-gas-solutions",
  "oil-gas-stack-marquee",
  "oil-gas-quantum-ready",
  "oil-gas-hardening",
  "smart-infrastructure-challenges",
  "smart-infrastructure-solutions",
  "smart-infrastructure-expertise",
  "smart-infrastructure-ev-grid",
  "smart-infrastructure-modernization",
  "contact-us-locations",
  "contact-us-inquiry",
  "consultation-enquiry",
  "consultation-office",
  "consultation-faq",
  "consultation-links",
  "request-consultation-trust",
  "request-consultation-form",
  "request-consultation-responsibility",
  "privacy-policy-document",
  "privacy-policy-toc",
  "terms-document",
  "bess-challenges",
  "bess-hardware-software",
  "bess-arsenal",
  "bess-case-study",
  "bess-engineering-core",
  "bess-cta",
  "bms-architecture",
  "bms-silicon",
  "bms-applications",
  "bms-cta",
  "erm-benefits",
  "erm-architecture",
  "erm-applications",
  "erm-operational",
  "erm-cta",
  "cco-metrics",
  "cco-risks",
  "cco-hardware",
  "cco-stack",
  "cco-cta",
  "cco-related",
  "em-challenges",
  "em-hardware",
  "em-tech",
  "em-case",
  "em-capabilities",
  "em-cta",
  "env-challenges",
  "env-infrastructure",
  "env-case",
  "env-cta",
  "ic-architecture",
  "ic-connectivity",
  "ic-cta",
  "esp-capabilities",
  "esp-core",
  "esp-deployment",
  "esp-applications",
  "esp-cta",
  "mc-families",
  "mc-mixed",
  "mc-ruggedness",
  "mc-impact",
  "mc-cta",
  "nd-benefits",
  "nd-stack",
  "nd-deployments",
  "nd-cta",
  "nxp-expertise",
  "nxp-hardware",
  "nxp-implementation",
  "nxp-cta",
  "pl-vulnerabilities",
  "pl-solutions",
  "pl-superiority",
  "pl-asset",
  "pl-cta",
  "qr-risks",
  "qr-architecture",
  "qr-metrics",
  "qr-outcomes",
  "qr-cta",
  "qr-related",
  "rn-hero",
  "rn-families",
  "rn-experience",
  "rn-verticals",
  "rn-cta",
  "sol-catalog",
  "sol-inquiry",
  "ti-domains",
  "ti-integrity",
  "ti-fusion",
  "ti-infrastructure",
  "ti-advantage",
  "ti-cta",
  "wsn-overview",
  "wsn-topology",
  "wsn-standards",
  "wsn-applications",
  "wsn-cta",
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
    case "ev-infrastructure-challenges":
      return "src/components/pages/ev-infrastructure/sections/ThermalCardSection.tsx";
    case "ev-infrastructure-solutions":
      return "src/components/pages/ev-infrastructure/sections/Solution1Section.tsx";
    case "ev-infrastructure-case-study":
      return "src/components/pages/ev-infrastructure/sections/Section.tsx";
    case "ev-infrastructure-sustainability":
      return "src/components/pages/ev-infrastructure/sections/Block2Section.tsx";
    case "oil-gas-challenges":
      return "src/components/pages/oil-and-gas/sections/ExplosiveEnvironmentsSection.tsx";
    case "oil-gas-solutions":
      return "src/components/pages/oil-and-gas/sections/SmallAccentSection.tsx";
    case "oil-gas-stack-marquee":
      return "src/components/pages/oil-and-gas/sections/Section.tsx";
    case "oil-gas-quantum-ready":
      return "src/components/pages/oil-and-gas/sections/Block2Section.tsx";
    case "oil-gas-hardening":
      return "src/components/pages/oil-and-gas/sections/AtmosphericBgElementSection.tsx";
    case "smart-infrastructure-challenges":
      return "src/components/pages/smart-infrastructure/sections/Challenge1Section.tsx";
    case "smart-infrastructure-solutions":
      return "src/components/pages/smart-infrastructure/sections/Solution1Section.tsx";
    case "smart-infrastructure-expertise":
      return "src/components/pages/smart-infrastructure/sections/Section.tsx";
    case "smart-infrastructure-ev-grid":
      return "src/components/pages/smart-infrastructure/sections/Block2Section.tsx";
    case "smart-infrastructure-modernization":
      return "src/components/pages/smart-infrastructure/sections/Block3Section.tsx";
    case "contact-us-locations":
    case "contact-us-inquiry":
      return "src/components/pages/contact-us/sections/LeftSideOfficeLocationsSection.tsx";
    case "consultation-enquiry":
      return "src/components/pages/contact-us-and-engineering-consultation/sections/ConsultationFormSection.tsx";
    case "consultation-office":
      return "src/components/pages/contact-us-and-engineering-consultation/sections/InteractiveMapPlaceholderSection.tsx";
    case "consultation-faq":
      return "src/components/pages/contact-us-and-engineering-consultation/sections/FaqItem1Section.tsx";
    case "consultation-links":
      return "src/components/pages/contact-us-and-engineering-consultation/sections/Section.tsx";
    case "request-consultation-trust":
    case "request-consultation-form":
      return "src/components/pages/request-consultation/sections/LeftColumnHighTrustContentSection.tsx";
    case "request-consultation-responsibility":
      return "src/components/pages/request-consultation/sections/Section.tsx";
    case "privacy-policy-document":
    case "privacy-policy-toc":
      return "src/components/pages/privacy-policy/sections/SideNavigationSection.tsx";
    case "terms-document":
      return "src/components/pages/terms-and-conditions/sections/TermsContentSection.tsx";
    case "bess-challenges":
      return "src/components/pages/battery-energy-storage/sections/Section.tsx";
    case "bess-hardware-software":
      return "src/components/pages/battery-energy-storage/sections/Block2Section.tsx";
    case "bess-arsenal":
      return "src/components/pages/battery-energy-storage/sections/Block3Section.tsx";
    case "bess-case-study":
      return "src/components/pages/battery-energy-storage/sections/Block4Section.tsx";
    case "bess-engineering-core":
      return "src/components/pages/battery-energy-storage/sections/Block5Section.tsx";
    case "bess-cta":
      return "src/components/pages/battery-energy-storage/sections/Block6Section.tsx";
    case "bms-architecture":
      return "src/components/pages/battery-management-system/sections/BentoGridForArchitectureSection.tsx";
    case "bms-silicon":
      return "src/components/pages/battery-management-system/sections/Section.tsx";
    case "bms-applications":
      return "src/components/pages/battery-management-system/sections/Block2Section.tsx";
    case "bms-cta":
      return "src/components/pages/battery-management-system/sections/Block3Section.tsx";
    case "erm-benefits":
      return "src/components/pages/earth-resistance-monitoring/sections/Section.tsx";
    case "erm-architecture":
      return "src/components/pages/earth-resistance-monitoring/sections/Feature1Section.tsx";
    case "erm-applications":
      return "src/components/pages/earth-resistance-monitoring/sections/Block2Section.tsx";
    case "erm-operational":
      return "src/components/pages/earth-resistance-monitoring/sections/Block3Section.tsx";
    case "erm-cta":
      return "src/components/pages/earth-resistance-monitoring/sections/Block4Section.tsx";
    case "cco-metrics":
      return "src/components/pages/cognitive-core-os/sections/Section.tsx";
    case "cco-risks":
      return "src/components/pages/cognitive-core-os/sections/TheProblemSection.tsx";
    case "cco-hardware":
      return "src/components/pages/cognitive-core-os/sections/HardwareSection.tsx";
    case "cco-stack":
      return "src/components/pages/cognitive-core-os/sections/VisualRepresentationOfArchitectureSection.tsx";
    case "cco-cta":
      return "src/components/pages/cognitive-core-os/sections/Block2Section.tsx";
    case "cco-related":
      return "src/components/pages/cognitive-core-os/sections/Block3Section.tsx";
    case "em-challenges":
      return "src/components/pages/energy-management/sections/Challenge1Section.tsx";
    case "em-hardware":
      return "src/components/pages/energy-management/sections/Section.tsx";
    case "em-tech":
      return "src/components/pages/energy-management/sections/Block2Section.tsx";
    case "em-case":
      return "src/components/pages/energy-management/sections/Block3Section.tsx";
    case "em-capabilities":
      return "src/components/pages/energy-management/sections/Block4Section.tsx";
    case "em-cta":
      return "src/components/pages/energy-management/sections/Block5Section.tsx";
    case "env-challenges":
      return "src/components/pages/environmental-monitoring/sections/Challenge1Section.tsx";
    case "env-infrastructure":
      return "src/components/pages/environmental-monitoring/sections/Section.tsx";
    case "env-case":
      return "src/components/pages/environmental-monitoring/sections/Block2Section.tsx";
    case "env-cta":
      return "src/components/pages/environmental-monitoring/sections/DecorativeAtmosphericBackgroundSection.tsx";
    case "ic-architecture":
      return "src/components/pages/industrial-controller/sections/ProcessingCoreSection.tsx";
    case "ic-connectivity":
      return "src/components/pages/industrial-controller/sections/Section.tsx";
    case "ic-cta":
      return "src/components/pages/industrial-controller/sections/SubtleTechBackgroundEffectSection.tsx";
    case "esp-capabilities":
      return "src/components/pages/esp32/sections/Feature1Section.tsx";
    case "esp-core":
      return "src/components/pages/esp32/sections/Section.tsx";
    case "esp-deployment":
      return "src/components/pages/esp32/sections/Block2Section.tsx";
    case "esp-applications":
      return "src/components/pages/esp32/sections/Block3Section.tsx";
    case "esp-cta":
      return "src/components/pages/esp32/sections/Block4Section.tsx";
    case "mc-families":
      return "src/components/pages/microchip/sections/PicCardSection.tsx";
    case "mc-mixed":
      return "src/components/pages/microchip/sections/GlassOverlayInfoSection.tsx";
    case "mc-ruggedness":
      return "src/components/pages/microchip/sections/Section.tsx";
    case "mc-impact":
      return "src/components/pages/microchip/sections/Block2Section.tsx";
    case "mc-cta":
      return "src/components/pages/microchip/sections/Block3Section.tsx";
    case "nd-benefits":
      return "src/components/pages/nordic/sections/MainFeatureCardSection.tsx";
    case "nd-stack":
      return "src/components/pages/nordic/sections/Section.tsx";
    case "nd-deployments":
      return "src/components/pages/nordic/sections/ApplicationCard1Section.tsx";
    case "nd-cta":
      return "src/components/pages/nordic/sections/Block2Section.tsx";
    case "nxp-expertise":
      return "src/components/pages/nxp/sections/EdgeIntelligenceSection.tsx";
    case "nxp-hardware":
      return "src/components/pages/nxp/sections/InteractiveLabelsOverlaySection.tsx";
    case "nxp-implementation":
      return "src/components/pages/nxp/sections/Section.tsx";
    case "nxp-cta":
      return "src/components/pages/nxp/sections/AbstractBackgroundDecorationSection.tsx";
    case "pl-vulnerabilities":
      return "src/components/pages/pipeline-monitoring/sections/Section.tsx";
    case "pl-solutions":
      return "src/components/pages/pipeline-monitoring/sections/Solution1Section.tsx";
    case "pl-superiority":
      return "src/components/pages/pipeline-monitoring/sections/Block2Section.tsx";
    case "pl-asset":
      return "src/components/pages/pipeline-monitoring/sections/Block3Section.tsx";
    case "pl-cta":
      return "src/components/pages/pipeline-monitoring/sections/Block4Section.tsx";
    case "qr-risks":
      return "src/components/pages/quantum-ready-data-architecture/sections/Section.tsx";
    case "qr-architecture":
      return "src/components/pages/quantum-ready-data-architecture/sections/HardwareSection.tsx";
    case "qr-metrics":
      return "src/components/pages/quantum-ready-data-architecture/sections/Block2Section.tsx";
    case "qr-outcomes":
      return "src/components/pages/quantum-ready-data-architecture/sections/Block3Section.tsx";
    case "qr-cta":
      return "src/components/pages/quantum-ready-data-architecture/sections/Block4Section.tsx";
    case "qr-related":
      return "src/components/pages/quantum-ready-data-architecture/sections/Block5Section.tsx";
    case "rn-hero":
      return "src/components/pages/renesas/sections/DecorativeTechnicalLinesSection.tsx";
    case "rn-families":
      return "src/components/pages/renesas/sections/Rl78CardSection.tsx";
    case "rn-experience":
      return "src/components/pages/renesas/sections/Section.tsx";
    case "rn-verticals":
      return "src/components/pages/renesas/sections/UseCase1Section.tsx";
    case "rn-cta":
      return "src/components/pages/renesas/sections/Block2Section.tsx";
    case "sol-catalog":
      return "src/components/pages/solutions/sections/SolutionCardIiotGatewaySection.tsx";
    case "sol-inquiry":
      return "src/components/pages/solutions/sections/BackgroundTechLinesAnimationPlaceholderSection.tsx";
    case "ti-domains":
      return "src/components/pages/texas-instruments/sections/PowerManagementSection.tsx";
    case "ti-integrity":
      return "src/components/pages/texas-instruments/sections/Section.tsx";
    case "ti-fusion":
      return "src/components/pages/texas-instruments/sections/Block2Section.tsx";
    case "ti-infrastructure":
      return "src/components/pages/texas-instruments/sections/MedicalSection.tsx";
    case "ti-advantage":
      return "src/components/pages/texas-instruments/sections/Block3Section.tsx";
    case "ti-cta":
      return "src/components/pages/texas-instruments/sections/Block4Section.tsx";
    case "wsn-overview":
      return "src/components/pages/wireless-sensor-network/sections/Section.tsx";
    case "wsn-topology":
      return "src/components/pages/wireless-sensor-network/sections/EndNodesSection.tsx";
    case "wsn-standards":
      return "src/components/pages/wireless-sensor-network/sections/Block2Section.tsx";
    case "wsn-applications":
      return "src/components/pages/wireless-sensor-network/sections/Block3Section.tsx";
    case "wsn-cta":
      return "src/components/pages/wireless-sensor-network/sections/SubtleBackgroundDecorationSection.tsx";
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
