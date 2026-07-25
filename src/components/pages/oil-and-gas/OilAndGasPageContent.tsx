import { TechnicalOverlayElementsSection } from "./sections/TechnicalOverlayElementsSection";
import { ExplosiveEnvironmentsSection } from "./sections/ExplosiveEnvironmentsSection";
import { SmallAccentSection } from "./sections/SmallAccentSection";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";
import { AtmosphericBgElementSection } from "./sections/AtmosphericBgElementSection";

export function OilAndGasPageContent() {
  return (
    <main>
      <TechnicalOverlayElementsSection />
      <ExplosiveEnvironmentsSection />
      <SmallAccentSection />
      <Section />
      <Block2Section />
      <AtmosphericBgElementSection />
    </main>
  );
}
