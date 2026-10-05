import { HeroSection } from "./sections/HeroSection";
import { LargeFeatureCardSection } from "./sections/LargeFeatureCardSection";
import { Section } from "./sections/Section";
import { App1Section } from "./sections/App1Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";

export function ConnectivityPageContent() {
  return (
    <main className={"w-full"}>
      <HeroSection />
      <LargeFeatureCardSection />
      <Section />
      <App1Section />
      <Block2Section />
      <Block3Section />
    </main>
  );
}
