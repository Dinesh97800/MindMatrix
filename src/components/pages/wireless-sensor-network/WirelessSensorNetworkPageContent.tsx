import { ConfiguredHero } from "@/components/sections/hero/ConfiguredHero";
import { Section } from "./sections/Section";
import { EndNodesSection } from "./sections/EndNodesSection";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";
import { SubtleBackgroundDecorationSection } from "./sections/SubtleBackgroundDecorationSection";

export function WirelessSensorNetworkPageContent() {
  return (
    <main className={"tech-grid"}>
      <ConfiguredHero slug="wireless-sensor-network" />
      <Section />
      <EndNodesSection />
      <Block2Section />
      <Block3Section />
      <SubtleBackgroundDecorationSection />
    </main>
  );
}
