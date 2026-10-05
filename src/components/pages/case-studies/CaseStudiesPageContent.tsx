import { HeroSection } from "./sections/HeroSection";
import { SelectedProjectExperienceSection } from "./sections/SelectedProjectExperienceSection";

export function CaseStudiesPageContent() {
  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
      <HeroSection />
      <SelectedProjectExperienceSection />
    </main>
  );
}
