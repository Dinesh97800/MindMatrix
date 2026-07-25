import { HeroSection } from "./sections/HeroSection";
import { FeaturedCaseStudyAtacamaGridExpansionLargeSpanSection } from "./sections/FeaturedCaseStudyAtacamaGridExpansionLargeSpanSection";
import { Section } from "./sections/Section";

export function CaseStudiesPageContent() {
  return (
    <main className={"max-w-container-max mx-auto px-margin-desktop py-stack-lg"}>
      <HeroSection />
      <FeaturedCaseStudyAtacamaGridExpansionLargeSpanSection />
      <Section />
    </main>
  );
}
