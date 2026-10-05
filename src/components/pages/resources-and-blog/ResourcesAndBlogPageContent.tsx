import { FeaturedArticleCardAsymmetricLayoutSection } from "./sections/FeaturedArticleCardAsymmetricLayoutSection";
import { Section } from "./sections/Section";
import { ResourceCard1BlogSection } from "./sections/ResourceCard1BlogSection";
import { Block2Section } from "./sections/Block2Section";
import { Block3Section } from "./sections/Block3Section";

export function ResourcesAndBlogPageContent() {
  return (
    <>
    <main className={"max-w-container-max mx-auto px-margin-desktop py-stack-lg"}>
      <FeaturedArticleCardAsymmetricLayoutSection />
      <Section />
      <ResourceCard1BlogSection />
      <Block2Section />
    </main>
    <Block3Section />
    </>
  );
}
