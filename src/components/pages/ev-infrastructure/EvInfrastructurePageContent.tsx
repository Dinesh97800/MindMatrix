import { GlassmorphismStatsOverlaySection } from "./sections/GlassmorphismStatsOverlaySection";
import { ThermalCardSection } from "./sections/ThermalCardSection";
import { Solution1Section } from "./sections/Solution1Section";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";

export function EvInfrastructurePageContent() {
  return (
    <main>
      <GlassmorphismStatsOverlaySection />
      <ThermalCardSection />
      <Solution1Section />
      <Section />
      <Block2Section />
    </main>
  );
}
