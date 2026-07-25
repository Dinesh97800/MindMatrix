import { HeroSection } from "./sections/HeroSection";
import { Section } from "./sections/Section";
import { SideNavigationLinksJumpToCategorySection } from "./sections/SideNavigationLinksJumpToCategorySection";

export function FaqPageContent() {
  return (
    <main className={"max-w-container-max mx-auto px-margin-desktop py-stack-lg"}>
      <HeroSection />
      <Section />
      <SideNavigationLinksJumpToCategorySection />
    </main>
  );
}
