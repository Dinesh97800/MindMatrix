import { DynamicDataGridOverlaySection } from "./sections/DynamicDataGridOverlaySection";
import { Section } from "./sections/Section";
import { Solution1Section } from "./sections/Solution1Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";
import { Block4Section } from "./sections/Block4Section";
import { Block5Section } from "./sections/Block5Section";

export function SmartGridPageContent() {
  return (
    <main>
      <DynamicDataGridOverlaySection />
      <Section />
      <Solution1Section />
      <Block2Section />
      <Block3Section />
      <Block4Section />
      <Block5Section />
    </main>
  );
}
