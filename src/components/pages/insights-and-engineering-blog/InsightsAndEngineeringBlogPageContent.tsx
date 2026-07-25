import { HeroSection } from "./sections/HeroSection";
import { BentoGridOfPostsSection } from "./sections/BentoGridOfPostsSection";

export function InsightsAndEngineeringBlogPageContent() {
  return (
    <main className={"max-w-container-max mx-auto px-margin-desktop py-stack-lg grid grid-cols-12 gap-gutter"}>
      <HeroSection />
      <BentoGridOfPostsSection />
    </main>
  );
}
