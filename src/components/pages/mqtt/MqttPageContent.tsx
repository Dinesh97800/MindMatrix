import { HeroSection } from "./sections/HeroSection";
import { Feature1PubSubSection } from "./sections/Feature1PubSubSection";
import { Section } from "./sections/Section";
import { App1Section } from "./sections/App1Section";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";

export function MqttPageContent() {
  return (
    <main className={"relative"}>
      <HeroSection />
      <Feature1PubSubSection />
      <Section />
      <App1Section />
      <Block2Section />
      <Block3Section />
    </main>
  );
}
