import { ChallengeLeftSection } from "./sections/ChallengeLeftSection";
import { TechColumn1Section } from "./sections/TechColumn1Section";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";

export function NanolithographyClusterControlPageContent() {
  return (
    <main className={"relative z-20"}>
      <ChallengeLeftSection />
      <TechColumn1Section />
      <Section />
      <Block2Section />
      <Block3Section />
    </main>
  );
}
