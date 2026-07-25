import { LogosOfCertificationsOrPartnersSection } from "./sections/LogosOfCertificationsOrPartnersSection";
import { BentoGridForArchitectureSection } from "./sections/BentoGridForArchitectureSection";
import { Section } from "./sections/Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";

export function BatteryManagementSystemPageContent() {
  return (
    <main>
      <LogosOfCertificationsOrPartnersSection />
      <BentoGridForArchitectureSection />
      <Section />
      <Block2Section />
      <Block3Section />
    </main>
  );
}
