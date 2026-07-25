import { HeroSection } from "./sections/HeroSection";
import { MajorQuickStartCardSection } from "./sections/MajorQuickStartCardSection";
import { NoteCard1Section } from "./sections/NoteCard1Section";
import { Section } from "./sections/Section";
import { SidenavbarSection } from "./sections/SidenavbarSection";

export function ApplicationNotesAndDesignGuidesPageContent() {
  return (
    <>
    <main className={"flex-1 px-margin-desktop py-stack-lg max-w-[1000px]"}>
      <HeroSection />
      <MajorQuickStartCardSection />
      <NoteCard1Section />
      <Section />
    </main>
    <SidenavbarSection />
    </>
  );
}
