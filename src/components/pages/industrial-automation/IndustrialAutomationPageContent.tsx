import { HeroSection } from "./sections/HeroSection";
import { Challenge1Section } from "./sections/Challenge1Section";
import { PlcSection } from "./sections/PlcSection";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";

export function IndustrialAutomationPageContent() {
  return (
    <main>
      <HeroSection />
      <Challenge1Section />
      <PlcSection />
      <Section />
      <Block2Section />
      <Block3Section />
    </main>
  );
}
