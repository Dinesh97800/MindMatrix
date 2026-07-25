import { HeroSection } from "./sections/HeroSection";
import { Section } from "./sections/Section";
import { Block2006Section } from "./sections/Block2006Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";

export function AboutUsPageContent() {
  return (
    <main>
      <HeroSection />
      <Section />
      <Block2006Section />
      <Block2Section />
      <Block3Section />
    </main>
  );
}
