import { HeroSection } from "./sections/HeroSection";
import { Step1Section } from "./sections/Step1Section";
import { SensorIntegrationSection } from "./sections/SensorIntegrationSection";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";
import { Block4Section } from "./sections/Block4Section";
import { Block5Section } from "./sections/Block5Section";

export function IndustrialIotSolutionsPageContent() {
  return (
    <main>
      <HeroSection />
      <Step1Section />
      <SensorIntegrationSection />
      <Section />
      <Block2Section />
      <Block3Section />
      <Block4Section />
      <Block5Section />
    </main>
  );
}
