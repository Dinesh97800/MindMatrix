import { ConfiguredHero } from "@/components/sections/hero/ConfiguredHero";
import { BentoGridForArchitectureSection } from "./sections/BentoGridForArchitectureSection";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";

export function BatteryManagementSystemPageContent() {
  return (
    <main>
      <ConfiguredHero slug="battery-management-system" />
      <BentoGridForArchitectureSection />
      <Section />
      <Block2Section />
      <Block3Section />
    </main>
  );
}
