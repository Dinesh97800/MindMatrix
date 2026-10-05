import { HeroSection } from "./sections/HeroSection";
import { MainFeaturedSection } from "./sections/MainFeaturedSection";
import { DirectoryItemSection } from "./sections/DirectoryItemSection";
import { SidenavbarTheTechnicalHierarchySection } from "./sections/SidenavbarTheTechnicalHierarchySection";

export function TechnicalKnowledgeBasePageContent() {
  return (
    <>
    <main className={"flex-1 px-margin-desktop py-stack-lg"}>
      <HeroSection />
      <MainFeaturedSection />
      <DirectoryItemSection />
    </main>
    <SidenavbarTheTechnicalHierarchySection />
    </>
  );
}
