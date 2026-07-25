import { FloatingTechnicalOverlaySection } from "./sections/FloatingTechnicalOverlaySection";
import { Section } from "./sections/Section";
import { DataIngestionSection } from "./sections/DataIngestionSection";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";
import { DecorativeRadialGlowSection } from "./sections/DecorativeRadialGlowSection";

export function RemoteMonitoringPageContent() {
  return (
    <main>
      <FloatingTechnicalOverlaySection />
      <Section />
      <DataIngestionSection />
      <Block2Section />
      <Block3Section />
      <DecorativeRadialGlowSection />
    </main>
  );
}
