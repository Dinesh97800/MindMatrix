import { DataPipsSection } from "./sections/DataPipsSection";
import { PowerSection } from "./sections/PowerSection";
import { CenterFocusImageSection } from "./sections/CenterFocusImageSection";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";

export function Stm32PageContent() {
  return (
    <main>
      <DataPipsSection />
      <PowerSection />
      <CenterFocusImageSection />
      <Section />
      <Block2Section />
      <Block3Section />
    </main>
  );
}
