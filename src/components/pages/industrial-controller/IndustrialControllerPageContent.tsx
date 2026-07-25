import { TechnicalOverlayTagSection } from "./sections/TechnicalOverlayTagSection";
import { ProcessingCoreSection } from "./sections/ProcessingCoreSection";
import { Section } from "./sections/Section";
import { SubtleTechBackgroundEffectSection } from "./sections/SubtleTechBackgroundEffectSection";

export function IndustrialControllerPageContent() {
  return (
    <main className={"technical-grid min-h-screen"}>
      <TechnicalOverlayTagSection />
      <ProcessingCoreSection />
      <Section />
      <SubtleTechBackgroundEffectSection />
    </main>
  );
}
