import { DecorativeFloatingElementSection } from "./sections/DecorativeFloatingElementSection";
import { Section } from "./sections/Section";
import { DiagramMockupSection } from "./sections/DiagramMockupSection";
import { Feature1Section } from "./sections/Feature1Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";
import { Block4Section } from "./sections/Block4Section";

export function SnmpAlarmGatewayPageContent() {
  return (
    <main>
      <DecorativeFloatingElementSection />
      <Section />
      <DiagramMockupSection />
      <Feature1Section />
      <Block2Section />
      <Block3Section />
      <Block4Section />
    </main>
  );
}
