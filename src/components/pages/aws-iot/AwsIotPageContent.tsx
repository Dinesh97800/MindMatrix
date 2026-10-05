import { HeroSection } from "./sections/HeroSection";
import { Feature1Section } from "./sections/Feature1Section";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";
import { BackgroundVisualizationSection } from "./sections/BackgroundVisualizationSection";

export function AwsIotPageContent() {
  return (
    <main>
      <HeroSection />
      <Feature1Section />
      <Section />
      <Block2Section />
      <Block3Section />
      <BackgroundVisualizationSection />
    </main>
  );
}
