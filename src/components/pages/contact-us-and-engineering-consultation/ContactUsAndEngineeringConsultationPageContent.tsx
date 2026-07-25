import { HeroSection } from "./sections/HeroSection";
import { ConsultationFormSection } from "./sections/ConsultationFormSection";
import { InteractiveMapPlaceholderSection } from "./sections/InteractiveMapPlaceholderSection";
import { FaqItem1Section } from "./sections/FaqItem1Section";
import { Section } from "./sections/Section";

export function ContactUsAndEngineeringConsultationPageContent() {
  return (
    <main className={"pt-24"}>
      <HeroSection />
      <ConsultationFormSection />
      <InteractiveMapPlaceholderSection />
      <FaqItem1Section />
      <Section />
    </main>
  );
}
