import { LeftColumnHighTrustContentSection } from "./sections/LeftColumnHighTrustContentSection";
import { Section } from "./sections/Section";

export function RequestConsultationPageContent() {
  return (
    <>
    <main className={"max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg"}>
      <LeftColumnHighTrustContentSection />
    </main>
    <Section />
    </>
  );
}
