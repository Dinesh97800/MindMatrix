import { HeroSection } from "./sections/HeroSection";
import { ModbusSection } from "./sections/ModbusSection";
import { VisualDiagramRepresentationSection } from "./sections/VisualDiagramRepresentationSection";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";
import { Block4Section } from "./sections/Block4Section";

export function IndustrialProtocolsPageContent() {
  return (
    <main>
      <HeroSection />
      <ModbusSection />
      <VisualDiagramRepresentationSection />
      <Section />
      <Block2Section />
      <Block3Section />
      <Block4Section />
    </main>
  );
}
