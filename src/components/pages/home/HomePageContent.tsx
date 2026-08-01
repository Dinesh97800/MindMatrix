import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { StatsGridSection } from "./sections/StatsGridSection";
import { Service1Section } from "./sections/Service1Section";
import { AiSolutionsHighlightSection } from "./sections/AiSolutionsHighlightSection";
import { ProgressLineSection } from "./sections/ProgressLineSection";
import { Section } from "./sections/Section";
import { RepeatedLogosForContinuousLoopSection } from "./sections/RepeatedLogosForContinuousLoopSection";
import { Block2Section } from "./sections/Block2Section";

export function HomePageContent() {
  return (
    <main>
      <StatsGridSection />
      <Service1Section />
      <AiSolutionsHighlightSection />
      <ProgressLineSection />
      <Section />
      <RepeatedLogosForContinuousLoopSection />
      <WhyChooseUsSection />
      <Block2Section />
    </main>
  );
}
