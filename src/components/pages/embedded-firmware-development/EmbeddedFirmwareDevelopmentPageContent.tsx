import { HeroSection } from "./sections/HeroSection";
import { RtosSection } from "./sections/RtosSection";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";
import { Block4Section } from "./sections/Block4Section";

export function EmbeddedFirmwareDevelopmentPageContent() {
  return (
    <main className={"flex-grow"}>
      <HeroSection />
      <RtosSection />
      <Section />
      <Block2Section />
      <Block3Section />
      <Block4Section />
    </main>
  );
}
