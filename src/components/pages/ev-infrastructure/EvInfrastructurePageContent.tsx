import { ConfiguredHero } from "@/components/sections/hero/ConfiguredHero";
import { ThermalCardSection } from "./sections/ThermalCardSection";
import { Solution1Section } from "./sections/Solution1Section";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";

export function EvInfrastructurePageContent() {
  return (
    <main>
      <ConfiguredHero slug="ev-infrastructure" />
      <ThermalCardSection />
      <Solution1Section />
      <Section />
      <Block2Section />
    </main>
  );
}
