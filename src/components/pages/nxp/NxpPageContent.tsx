import { ConfiguredHero } from "@/components/sections/hero/ConfiguredHero";
import { EdgeIntelligenceSection } from "./sections/EdgeIntelligenceSection";
import { InteractiveLabelsOverlaySection } from "./sections/InteractiveLabelsOverlaySection";
import { Section } from "./sections/Section";
import { AbstractBackgroundDecorationSection } from "./sections/AbstractBackgroundDecorationSection";

export function NxpPageContent() {
  return (
    <main>
      <ConfiguredHero slug="nxp" />
      <EdgeIntelligenceSection />
      <InteractiveLabelsOverlaySection />
      <Section />
      <AbstractBackgroundDecorationSection />
    </main>
  );
}
