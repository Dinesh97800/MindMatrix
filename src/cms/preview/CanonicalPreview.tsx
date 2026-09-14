"use client";

import { Component, type ReactNode } from "react";
import {
  AboutProductionTransitionAdapter,
  AboutWorkingModelAdapter,
  AiCapabilityAreasAdapter,
  AiPlatformsAdapter,
  AiSecondaryCapabilityAdapter,
  AiSolutionCategoriesAdapter,
  AiSolutionDomainsAdapter,
  ApprovedCtaAdapter,
  ApprovedInfoAdapter,
  ApprovedScopeAdapter,
  ArchAdapter,
  ArticleAdapter,
  CardsAdapter,
  CareersEmployeeSuccessAdapter,
  CareersJobsAdapter,
  CaseStudyListingAdapter,
  ConnectivityDeploymentsAdapter,
  ConnectivityRfDesignAdapter,
  ContactAdapter,
  ContentAdapter,
  CtaAdapter,
  FaqAdapter,
  FormAdapter,
  HeroAdapter,
  HomeHeroAdapter,
  HomeIndustriesAdapter,
  IndexGridAdapter,
  ListingAdapter,
  LogoMarqueeAdapter,
  LogosAdapter,
  MediaAdapter,
  MetricsAdapter,
  MissingAdapter,
  NavAdapter,
  ProcessAdapter,
  ServiceCardsAdapter,
  ServicesEngineeringApproachAdapter,
  TableAdapter,
  WhyChooseUsAdapter,
} from "./adapters";
import { previewReactTemplate } from "./adapter-id";
import type { PreviewSectionPayload } from "./types";

const ADAPTERS: Record<
  string,
  (props: { section: PreviewSectionPayload }) => ReactNode
> = {
  "about-working-model": AboutWorkingModelAdapter,
  "ai-solution-domains": AiSolutionDomainsAdapter,
  "ai-capability-areas": AiCapabilityAreasAdapter,
  "ai-platforms": AiPlatformsAdapter,
  "ai-solution-categories": AiSolutionCategoriesAdapter,
  "ai-secondary-capability": AiSecondaryCapabilityAdapter,
  "about-production-transition": AboutProductionTransitionAdapter,
  "careers-employee-success": CareersEmployeeSuccessAdapter,
  "careers-jobs": CareersJobsAdapter,
  "connectivity-rf-design": ConnectivityRfDesignAdapter,
  "connectivity-deployments": ConnectivityDeploymentsAdapter,
  "home-hero": HomeHeroAdapter,
  "home-industries": HomeIndustriesAdapter,
  "logo-marquee": LogoMarqueeAdapter,
  hero: HeroAdapter,
  "approved-scope": ApprovedScopeAdapter,
  "approved-info": ApprovedInfoAdapter,
  "index-grid": IndexGridAdapter,
  "why-choose-us": WhyChooseUsAdapter,
  "service-cards": ServiceCardsAdapter,
  "services-engineering-approach": ServicesEngineeringApproachAdapter,
  cards: CardsAdapter,
  "approved-cta": ApprovedCtaAdapter,
  cta: CtaAdapter,
  content: ContentAdapter,
  media: MediaAdapter,
  metrics: MetricsAdapter,
  process: ProcessAdapter,
  arch: ArchAdapter,
  table: TableAdapter,
  logos: LogosAdapter,
  faq: FaqAdapter,
  "case-study-listing": CaseStudyListingAdapter,
  listing: ListingAdapter,
  article: ArticleAdapter,
  form: FormAdapter,
  contact: ContactAdapter,
  nav: NavAdapter,
};

class SectionBoundary extends Component<
  { section: PreviewSectionPayload; children: ReactNode },
  { error: string | null }
> {
  state = { error: null as string | null };

  static getDerivedStateFromError(error: Error) {
    return { error: error.message };
  }

  render() {
    if (this.state.error) {
      return (
        <section className="px-margin-mobile py-8 md:px-margin-desktop">
          <div className="rounded-xl border border-error/40 bg-error/5 p-6 text-sm">
            <p className="font-medium">Preview failed for this section</p>
            <p>template: {this.props.section.template}</p>
            <p>stableKey: {this.props.section.stableKey}</p>
            <p className="mt-2 text-on-surface-variant">{this.state.error}</p>
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}

function OriginChip({ section }: { section: PreviewSectionPayload }) {
  const label =
    section.preservedRowId === 200
      ? "admin-edited · preserved id=200"
      : section.dataOrigin === "admin-edited"
        ? "admin-edited / draft-saved"
        : "migrated seed";
  return (
    <div className="flex flex-wrap items-center gap-2 bg-black/70 px-3 py-1 text-[11px] text-white">
      <span>{label}</span>
      <span>template {section.template}</span>
      <span>→ {previewReactTemplate(section.adapterId)}</span>
    </div>
  );
}

export function CanonicalSectionPreview({
  section,
  showOrigin,
}: {
  section: PreviewSectionPayload;
  showOrigin: boolean;
}) {
  if (!section.isVisible) return null;
  if (section.model === "UTILITY") {
    return (
      <section className="px-margin-mobile py-4 md:px-margin-desktop">
        <div className="rounded-lg border border-dashed p-4 text-sm text-on-surface-variant">
          UTILITY binding `{section.stableKey}` is developer-owned and is not previewed as CMS
          content.
        </div>
      </section>
    );
  }

  const Adapter = section.adapterId ? ADAPTERS[section.adapterId] : null;
  return (
    <SectionBoundary section={section}>
      <div>
        {showOrigin ? <OriginChip section={section} /> : null}
        {Adapter ? <Adapter section={section} /> : <MissingAdapter section={section} />}
      </div>
    </SectionBoundary>
  );
}

export function CanonicalPagePreview({
  sections,
  showOrigin,
}: {
  sections: PreviewSectionPayload[];
  showOrigin: boolean;
}) {
  return (
    <main>
      {sections.map((section) => (
        <CanonicalSectionPreview key={section.id} section={section} showOrigin={showOrigin} />
      ))}
    </main>
  );
}
