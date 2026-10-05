import { HeroSection } from "./sections/HeroSection";
import { MainFeatureCardSection } from "./sections/MainFeatureCardSection";
import { Section } from "./sections/Section";
import { ApplicationCard1Section } from "./sections/ApplicationCard1Section";
import { Block2Section } from "./sections/Block2Section";

export function NordicPageContent() {
  return (
    <main className={"relative overflow-hidden"}>
      <HeroSection />
      <MainFeatureCardSection />
      <Section />
      <ApplicationCard1Section />
      <Block2Section />
    </main>
  );
}
