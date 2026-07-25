import { HeroSection } from "./sections/HeroSection";
import { PowerManagementSection } from "./sections/PowerManagementSection";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";
import { MedicalSection } from "./sections/MedicalSection";
import { Block3Section } from "./sections/Block3Section";
import { Block4Section } from "./sections/Block4Section";

export function TexasInstrumentsPageContent() {
  return (
    <main className={"grid-bg"}>
      <HeroSection />
      <PowerManagementSection />
      <Section />
      <Block2Section />
      <MedicalSection />
      <Block3Section />
      <Block4Section />
    </main>
  );
}
