import { ConfiguredHero } from "@/components/sections/hero/ConfiguredHero";
import { ProcessingCoreSection } from "./sections/ProcessingCoreSection";
import { Section } from "./sections/Section";
import { SubtleTechBackgroundEffectSection } from "./sections/SubtleTechBackgroundEffectSection";

export function IndustrialControllerPageContent() {
  return (
    <main className={"technical-grid min-h-screen"}>
      <ConfiguredHero slug="industrial-controller" />
      <ProcessingCoreSection />
      <Section />
      <SubtleTechBackgroundEffectSection />
    </main>
  );
}
