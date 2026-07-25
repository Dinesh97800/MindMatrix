import { FloatingDataChipsSection } from "./sections/FloatingDataChipsSection";
import { Section } from "./sections/Section";
import { TechnicalGridAnimationPlaceholderSection } from "./sections/TechnicalGridAnimationPlaceholderSection";
import { BentoGridLayoutSection } from "./sections/BentoGridLayoutSection";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";

export function IndustrialIotGatewayPageContent() {
  return (
    <main>
      <FloatingDataChipsSection />
      <Section />
      <TechnicalGridAnimationPlaceholderSection />
      <BentoGridLayoutSection />
      <Block2Section />
      <Block3Section />
    </main>
  );
}
