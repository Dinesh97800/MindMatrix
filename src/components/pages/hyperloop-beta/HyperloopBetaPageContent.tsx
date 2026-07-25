import { HeroSection } from "./sections/HeroSection";
import { Section } from "./sections/Section";
import { ProblemStatementSection } from "./sections/ProblemStatementSection";
import { AbstractArchitectureVisualizationSection } from "./sections/AbstractArchitectureVisualizationSection";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";
import { Block4Section } from "./sections/Block4Section";

export function HyperloopBetaPageContent() {
  return (
    <main>
      <HeroSection />
      <Section />
      <ProblemStatementSection />
      <AbstractArchitectureVisualizationSection />
      <Block2Section />
      <Block3Section />
      <Block4Section />
    </main>
  );
}
