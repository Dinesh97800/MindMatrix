import { HeroSection } from "./sections/HeroSection";
import { Section } from "./sections/Section";
import { HorizontalTimelineBentoGridSection } from "./sections/HorizontalTimelineBentoGridSection";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";

export function EngineeringProcessPageContent() {
  return (
    <main>
      <HeroSection />
      <Section />
      <HorizontalTimelineBentoGridSection />
      <Block2Section />
      <Block3Section />
    </main>
  );
}
