import { HeroSection } from "./sections/HeroSection";
import { Section } from "./sections/Section";
import { SidebarNavigationSection } from "./sections/SidebarNavigationSection";
import { Block2Section } from "./sections/Block2Section";

export function TechnicalDownloadsAndSdksPageContent() {
  return (
    <>
    <main className={"flex-1 min-w-0 bg-background technical-grid-pattern min-h-screen"}>
      <HeroSection />
      <Section />
    </main>
    <SidebarNavigationSection />
    <Block2Section />
    </>
  );
}
