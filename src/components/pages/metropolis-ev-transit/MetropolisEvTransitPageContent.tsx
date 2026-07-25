import { HeroSection } from "./sections/HeroSection";
import { HardwareCardSection } from "./sections/HardwareCardSection";
import { SubstationSection } from "./sections/SubstationSection";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";

export function MetropolisEvTransitPageContent() {
  return (
    <main className={"technical-grid"}>
      <HeroSection />
      <HardwareCardSection />
      <SubstationSection />
      <Section />
      <Block2Section />
    </main>
  );
}
