import { DecorativeOverlayUiSection } from "./sections/DecorativeOverlayUiSection";
import { Section } from "./sections/Section";
import { EndNodesSection } from "./sections/EndNodesSection";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";
import { SubtleBackgroundDecorationSection } from "./sections/SubtleBackgroundDecorationSection";

export function WirelessSensorNetworkPageContent() {
  return (
    <main className={"tech-grid"}>
      <DecorativeOverlayUiSection />
      <Section />
      <EndNodesSection />
      <Block2Section />
      <Block3Section />
      <SubtleBackgroundDecorationSection />
    </main>
  );
}
