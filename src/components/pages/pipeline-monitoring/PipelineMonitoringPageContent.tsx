import { AnimatedShaderOverlayForFlowSection } from "./sections/AnimatedShaderOverlayForFlowSection";
import { Section } from "./sections/Section";
import { Solution1Section } from "./sections/Solution1Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";
import { Block4Section } from "./sections/Block4Section";

export function PipelineMonitoringPageContent() {
  return (
    <main>
      <AnimatedShaderOverlayForFlowSection />
      <Section />
      <Solution1Section />
      <Block2Section />
      <Block3Section />
      <Block4Section />
    </main>
  );
}
