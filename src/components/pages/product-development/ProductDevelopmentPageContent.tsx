import { HeroSection } from "./sections/HeroSection";
import { LargeFeatureCardSection } from "./sections/LargeFeatureCardSection";
import { ProgressLineDesktopSection } from "./sections/ProgressLineDesktopSection";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";
import { Block4Section } from "./sections/Block4Section";
import { Block5Section } from "./sections/Block5Section";

export function ProductDevelopmentPageContent() {
  return (
    <main>
      <HeroSection />
      <LargeFeatureCardSection />
      <ProgressLineDesktopSection />
      <Section />
      <Block2Section />
      <Block3Section />
      <Block4Section />
      <Block5Section />
    </main>
  );
}
