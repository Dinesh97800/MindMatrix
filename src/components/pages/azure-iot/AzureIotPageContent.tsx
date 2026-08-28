import { HeroSection } from "./sections/HeroSection";
import { LargeFeatureIotCentralSection } from "./sections/LargeFeatureIotCentralSection";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";
import { TechnicalCalloutOverlaySection } from "./sections/TechnicalCalloutOverlaySection";

export function AzureIotPageContent() {
  return (
    <main>
      <HeroSection />
      <LargeFeatureIotCentralSection />
      <Section />
      <Block2Section />
      <Block3Section />
      <TechnicalCalloutOverlaySection />
    </main>
  );
}
