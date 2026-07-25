import { BackgroundAnimationOverlaySection } from "./sections/BackgroundAnimationOverlaySection";
import { Challenge1Section } from "./sections/Challenge1Section";
import { Solution1Section } from "./sections/Solution1Section";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";

export function SmartInfrastructurePageContent() {
  return (
    <main>
      <BackgroundAnimationOverlaySection />
      <Challenge1Section />
      <Solution1Section />
      <Section />
      <Block2Section />
      <Block3Section />
    </main>
  );
}
