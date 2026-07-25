import { Card1Stm32Section } from "./sections/Card1Stm32Section";
import { OperatingSystemsSection } from "./sections/OperatingSystemsSection";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";

export function TechnologiesPageContent() {
  return (
    <main className={"max-w-container-max mx-auto px-margin-desktop py-stack-lg space-y-stack-lg"}>
      <Card1Stm32Section />
      <OperatingSystemsSection />
      <Section />
      <Block2Section />
    </main>
  );
}
