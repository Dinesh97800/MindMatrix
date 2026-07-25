import { HeroSection } from "./sections/HeroSection";
import { Bento1SchedulingSection } from "./sections/Bento1SchedulingSection";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";
import { App1Section } from "./sections/App1Section";

export function FreertosPageContent() {
  return (
    <main>
      <HeroSection />
      <Bento1SchedulingSection />
      <Section />
      <Block2Section />
      <App1Section />
    </main>
  );
}
