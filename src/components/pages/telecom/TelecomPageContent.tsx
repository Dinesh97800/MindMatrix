import { HeroSection } from "./sections/HeroSection";
import { ChallengeCard1Section } from "./sections/ChallengeCard1Section";
import { SolutionItemSection } from "./sections/SolutionItemSection";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";

export function TelecomPageContent() {
  return (
    <main>
      <HeroSection />
      <ChallengeCard1Section />
      <SolutionItemSection />
      <Section />
      <Block2Section />
      <Block3Section />
    </main>
  );
}
