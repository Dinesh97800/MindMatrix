import { HeroSection } from "./sections/HeroSection";
import { LargeFeatureIotCentralSection } from "./sections/LargeFeatureIotCentralSection";
import { TechnicalCalloutOverlaySection } from "./sections/TechnicalCalloutOverlaySection";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";

export function AzureIotPageContent() {
  return (
    <main className={"baseline-grid"}>
      <HeroSection />
      <LargeFeatureIotCentralSection />
      <TechnicalCalloutOverlaySection />
      <Section />
      <Block2Section />
      <Block3Section />
    </main>
  );
}
