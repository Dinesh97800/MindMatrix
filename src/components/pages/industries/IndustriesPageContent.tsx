import { AbstractBackgroundElementSection } from "./sections/AbstractBackgroundElementSection";
import { RenewableEnergyLargeSection } from "./sections/RenewableEnergyLargeSection";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";

export function IndustriesPageContent() {
  return (
    <main className={"technical-grid min-h-screen"}>
      <AbstractBackgroundElementSection />
      <RenewableEnergyLargeSection />
      <Section />
      <Block2Section />
      <Block3Section />
    </main>
  );
}
