import { HeroSection } from "./sections/HeroSection";
import { Challenge1Section } from "./sections/Challenge1Section";
import { HardwareSection } from "./sections/HardwareSection";
import { Node1PvArraysSection } from "./sections/Node1PvArraysSection";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";

export function AtacamaSolarReservePageContent() {
  return (
    <main>
      <HeroSection />
      <Challenge1Section />
      <HardwareSection />
      <Node1PvArraysSection />
      <Section />
      <Block2Section />
    </main>
  );
}
