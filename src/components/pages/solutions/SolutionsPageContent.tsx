import { SolutionCardIiotGatewaySection } from "./sections/SolutionCardIiotGatewaySection";
import { BackgroundTechLinesAnimationPlaceholderSection } from "./sections/BackgroundTechLinesAnimationPlaceholderSection";

export function SolutionsPageContent() {
  return (
    <>
    <main className={"max-w-container-max mx-auto px-margin-desktop py-stack-lg"}>
      <SolutionCardIiotGatewaySection />
    </main>
    <BackgroundTechLinesAnimationPlaceholderSection />
    </>
  );
}
