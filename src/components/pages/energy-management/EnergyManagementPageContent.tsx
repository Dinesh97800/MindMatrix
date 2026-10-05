import { HeroSection } from "./sections/HeroSection";
import { Challenge1Section } from "./sections/Challenge1Section";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";
import { Block4Section } from "./sections/Block4Section";
import { Block5Section } from "./sections/Block5Section";

export function EnergyManagementPageContent() {
  return (
    <main>
      <HeroSection />
      <Challenge1Section />
      <Section />
      <Block2Section />
      <Block3Section />
      <Block4Section />
      <Block5Section />
    </main>
  );
}
