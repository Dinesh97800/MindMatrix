import { AnimatedShaderBackgroundSection } from "./sections/AnimatedShaderBackgroundSection";
import { TinymlCardSection } from "./sections/TinymlCardSection";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";
import { Block4Section } from "./sections/Block4Section";
import { Block5Section } from "./sections/Block5Section";
import { Block6Section } from "./sections/Block6Section";

export function AiEnabledEngineeringPageContent() {
  return (
    <main>
      <AnimatedShaderBackgroundSection />
      <TinymlCardSection />
      <Section />
      <Block2Section />
      <Block3Section />
      <Block4Section />
      <Block5Section />
      <Block6Section />
    </main>
  );
}
