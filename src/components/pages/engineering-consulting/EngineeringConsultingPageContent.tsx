import { HeroSection } from "./sections/HeroSection";
import { Capability1Section } from "./sections/Capability1Section";
import { Step1Section } from "./sections/Step1Section";
import { ToolIconsPlaceholderSection } from "./sections/ToolIconsPlaceholderSection";
import { Section } from "./sections/Section";
import { CaseStudy1Section } from "./sections/CaseStudy1Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";
import { Block4Section } from "./sections/Block4Section";

export function EngineeringConsultingPageContent() {
  return (
    <main>
      <HeroSection />
      <Capability1Section />
      <Step1Section />
      <ToolIconsPlaceholderSection />
      <Section />
      <CaseStudy1Section />
      <Block2Section />
      <Block3Section />
      <Block4Section />
    </main>
  );
}
