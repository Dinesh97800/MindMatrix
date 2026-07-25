import { TechnicalFloatingStatsSection } from "./sections/TechnicalFloatingStatsSection";
import { EdgeIntelligenceSection } from "./sections/EdgeIntelligenceSection";
import { InteractiveLabelsOverlaySection } from "./sections/InteractiveLabelsOverlaySection";
import { Section } from "./sections/Section";
import { AbstractBackgroundDecorationSection } from "./sections/AbstractBackgroundDecorationSection";

export function NxpPageContent() {
  return (
    <main>
      <TechnicalFloatingStatsSection />
      <EdgeIntelligenceSection />
      <InteractiveLabelsOverlaySection />
      <Section />
      <AbstractBackgroundDecorationSection />
    </main>
  );
}
