import { InteractiveWebglShaderPlaceholderSection } from "./sections/InteractiveWebglShaderPlaceholderSection";
import { ChallengesSection } from "./sections/ChallengesSection";
import { Solution1Section } from "./sections/Solution1Section";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";

export function RenewableEnergyPageContent() {
  return (
    <main>
      <InteractiveWebglShaderPlaceholderSection />
      <ChallengesSection />
      <Solution1Section />
      <Section />
      <Block2Section />
    </main>
  );
}
