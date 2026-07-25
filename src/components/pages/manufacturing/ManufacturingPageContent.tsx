import { TechnicalBadgeSection } from "./sections/TechnicalBadgeSection";
import { HeaderSection } from "./sections/HeaderSection";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";

export function ManufacturingPageContent() {
  return (
    <main>
      <TechnicalBadgeSection />
      <HeaderSection />
      <Section />
      <Block2Section />
      <Block3Section />
    </main>
  );
}
