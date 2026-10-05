import { HeroSection } from "./sections/HeroSection";
import { Challenge1Section } from "./sections/Challenge1Section";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";
import { DecorativeAtmosphericBackgroundSection } from "./sections/DecorativeAtmosphericBackgroundSection";

export function EnvironmentalMonitoringPageContent() {
  return (
    <main>
      <HeroSection />
      <Challenge1Section />
      <Section />
      <Block2Section />
      <DecorativeAtmosphericBackgroundSection />
    </main>
  );
}
