import { HeroSection } from "./sections/HeroSection";
import { Section } from "./sections/Section";
import { HardwareSection } from "./sections/HardwareSection";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";
import { Block4Section } from "./sections/Block4Section";
import { Block5Section } from "./sections/Block5Section";

export function QuantumReadyDataArchitecturePageContent() {
  return (
    <main>
      <HeroSection />
      <Section />
      <HardwareSection />
      <Block2Section />
      <Block3Section />
      <Block4Section />
      <Block5Section />
    </main>
  );
}
