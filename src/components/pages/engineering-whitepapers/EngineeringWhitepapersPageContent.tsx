import { HeroSection } from "./sections/HeroSection";
import { Section } from "./sections/Section";
import { Card1FeaturedSection } from "./sections/Card1FeaturedSection";
import { Block2Section } from "./sections/Block2Section";
import { SidenavbarSection } from "./sections/SidenavbarSection";

export function EngineeringWhitepapersPageContent() {
  return (
    <>
    <main className={"flex-1 px-margin-desktop py-stack-lg min-h-screen"}>
      <HeroSection />
      <Section />
      <Card1FeaturedSection />
      <Block2Section />
    </main>
    <SidenavbarSection />
    </>
  );
}
