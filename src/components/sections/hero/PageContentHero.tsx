import type { ReactNode } from "react";
import { BackgroundImageHero, SplitHero } from "@/components/sections/hero";
import { ConfiguredHero } from "@/components/sections/hero/ConfiguredHero";
import { getPageContent, type PageContentKey } from "@/config/page-content";
import { getHeroPageConfig } from "@/config/hero-pages";
import { getHeroVisual } from "@/config/hero-content";

export interface PageContentHeroProps {
  pageKey: PageContentKey;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

/** Renders a reusable hero from page-content plus shared visual config. */
export function PageContentHero({
  pageKey,
  eyebrow,
  title,
  description,
  children,
}: PageContentHeroProps) {
  const heroConfig = getHeroPageConfig(pageKey);
  if (heroConfig && !eyebrow && !title && !description && !children) {
    return <ConfiguredHero slug={pageKey} />;
  }

  const content = getPageContent(pageKey);
  if (!content) return null;

  const visual = getHeroVisual(pageKey);
  const resolvedEyebrow = eyebrow ?? content.eyebrow;
  const resolvedTitle = title ?? content.title;
  const resolvedDescription = description ?? content.description;

  if (visual.variant === "background") {
    return (
      <BackgroundImageHero
        eyebrow={resolvedEyebrow}
        title={resolvedTitle}
        description={resolvedDescription}
        backgroundImage={visual.image}
        backgroundAlt={visual.imageAlt}
        overlay={visual.overlay}
        tone={visual.tone}
      >
        {children}
      </BackgroundImageHero>
    );
  }

  return (
    <SplitHero
      eyebrow={resolvedEyebrow}
      title={resolvedTitle}
      description={resolvedDescription}
      image={visual.image}
      imageAlt={visual.imageAlt}
      tone={visual.tone ?? "dark"}
    >
      {children}
    </SplitHero>
  );
}
