import { HeroSection } from "./sections/HeroSection";
import { HvacSection } from "./sections/HvacSection";
import { ColumnLeftSection } from "./sections/ColumnLeftSection";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";

export function BuildingAutomationPageContent() {
  return (
    <main className={"pt-20"}>
      <HeroSection />
      <HvacSection />
      <ColumnLeftSection />
      <Section />
      <Block2Section />
      <Block3Section />
    </main>
  );
}
