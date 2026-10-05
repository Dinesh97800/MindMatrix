import { HeroSection } from "./sections/HeroSection";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";
import { FiltersSection } from "./sections/FiltersSection";
import { Block3Section } from "./sections/Block3Section";

export function CareersPageContent() {
  return (
    <main>
      <HeroSection />
      <Section />
      <Block2Section />
      <FiltersSection />
      <Block3Section />
    </main>
  );
}
