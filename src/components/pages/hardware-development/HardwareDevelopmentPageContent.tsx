import { DataChipsOverlaySection } from "./sections/DataChipsOverlaySection";
import { MultiLayerPcbSection } from "./sections/MultiLayerPcbSection";
import { WorkflowConnectorLineSection } from "./sections/WorkflowConnectorLineSection";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";
import { Block4Section } from "./sections/Block4Section";
import { Block5Section } from "./sections/Block5Section";

export function HardwareDevelopmentPageContent() {
  return (
    <main>
      <DataChipsOverlaySection />
      <MultiLayerPcbSection />
      <WorkflowConnectorLineSection />
      <Section />
      <Block2Section />
      <Block3Section />
      <Block4Section />
      <Block5Section />
    </main>
  );
}
