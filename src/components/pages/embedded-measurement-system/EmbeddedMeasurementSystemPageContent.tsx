import { GlassmorphicCardOverlayingHardwareSection } from "./sections/GlassmorphicCardOverlayingHardwareSection";
import { FeatureSamplingSection } from "./sections/FeatureSamplingSection";
import { App1Section } from "./sections/App1Section";
import { Section } from "./sections/Section";
import { BackgroundDecorativeElementSection } from "./sections/BackgroundDecorativeElementSection";

export function EmbeddedMeasurementSystemPageContent() {
  return (
    <main>
      <GlassmorphicCardOverlayingHardwareSection />
      <FeatureSamplingSection />
      <App1Section />
      <Section />
      <BackgroundDecorativeElementSection />
    </main>
  );
}
