import { DecorativeDataOverlaySection } from "./sections/DecorativeDataOverlaySection";
import { YoctoCardSection } from "./sections/YoctoCardSection";
import { ContextualLabelsOverlaySection } from "./sections/ContextualLabelsOverlaySection";
import { SimplifiedBarChartSimulationSection } from "./sections/SimplifiedBarChartSimulationSection";
import { App1Section } from "./sections/App1Section";
import { Section } from "./sections/Section";

export function EmbeddedLinuxPageContent() {
  return (
    <main className={"pt-20"}>
      <DecorativeDataOverlaySection />
      <YoctoCardSection />
      <ContextualLabelsOverlaySection />
      <SimplifiedBarChartSimulationSection />
      <App1Section />
      <Section />
    </main>
  );
}
