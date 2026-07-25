import { HeroSection } from "./sections/HeroSection";
import { Section } from "./sections/Section";
import { TheProblemSection } from "./sections/TheProblemSection";
import { HardwareSection } from "./sections/HardwareSection";
import { VisualRepresentationOfArchitectureSection } from "./sections/VisualRepresentationOfArchitectureSection";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";

export function CognitiveCoreOsPageContent() {
  return (
    <main>
      <HeroSection />
      <Section />
      <TheProblemSection />
      <HardwareSection />
      <VisualRepresentationOfArchitectureSection />
      <Block2Section />
      <Block3Section />
    </main>
  );
}
