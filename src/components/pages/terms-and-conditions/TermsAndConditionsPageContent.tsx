import { HeroSection } from "./sections/HeroSection";
import { FloatingNavigationSidebarStickySection } from "./sections/FloatingNavigationSidebarStickySection";
import { Section } from "./sections/Section";

export function TermsAndConditionsPageContent() {
  return (
    <main className={"technical-grid min-h-screen"}>
      <HeroSection />
      <FloatingNavigationSidebarStickySection />
      <Section />
    </main>
  );
}
