import { DecorativeTechnicalLinesSection } from "./sections/DecorativeTechnicalLinesSection";
import { Rl78CardSection } from "./sections/Rl78CardSection";
import { Section } from "./sections/Section";
import { UseCase1Section } from "./sections/UseCase1Section";
import { Block2Section } from "./sections/Block2Section";

export function RenesasPageContent() {
  return (
    <main>
      <DecorativeTechnicalLinesSection />
      <Rl78CardSection />
      <Section />
      <UseCase1Section />
      <Block2Section />
    </main>
  );
}
