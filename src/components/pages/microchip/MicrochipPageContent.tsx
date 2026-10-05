import { HeroSection } from "./sections/HeroSection";
import { PicCardSection } from "./sections/PicCardSection";
import { GlassOverlayInfoSection } from "./sections/GlassOverlayInfoSection";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";

export function MicrochipPageContent() {
  return (
    <main>
      <HeroSection />
      <PicCardSection />
      <GlassOverlayInfoSection />
      <Section />
      <Block2Section />
      <Block3Section />
    </main>
  );
}
