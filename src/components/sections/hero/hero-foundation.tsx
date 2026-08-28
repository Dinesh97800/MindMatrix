import type { ReactNode } from "react";

export type HeroTone = "dark" | "light";

export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Shared layout/spacing tokens for all hero variants. */
export const heroLayout = {
  sectionDark:
    "relative flex items-center overflow-hidden bg-primary-container min-h-[640px] md:min-h-[921px] py-stack-lg lg:py-20",
  sectionLight: "relative flex items-center overflow-hidden min-h-[640px] md:min-h-[819px] py-stack-lg lg:py-20",
  container: "relative z-10 w-full mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop",
  grid: "grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-8 items-center",
  content: "col-span-1 lg:col-span-7 min-w-0",
  contentWide: "col-span-1 lg:col-span-12 min-w-0 max-w-3xl",
  visual: "col-span-1 lg:col-span-5 relative mt-stack-md lg:mt-0",
  visualHiddenMobile: "hidden lg:block",
  imageFrame: "aspect-[4/3] sm:aspect-square glass-card rounded-xl overflow-hidden border-white/10 p-2",
  imageInner: "h-full w-full relative overflow-hidden rounded-lg bg-cover bg-center",
} as const;

export const heroTypography = {
  eyebrow: {
    dark: "inline-block px-3 py-1 bg-secondary-container text-on-secondary-container font-label-sm text-label-sm mb-6 rounded-sm uppercase tracking-widest",
    light:
      "inline-block px-3 py-1 mb-6 rounded-full bg-primary-container/10 font-label-sm text-label-sm uppercase tracking-widest text-primary",
  },
  title: {
    dark: "font-display-lg text-display-lg text-white mb-6 leading-tight [text-wrap:wrap]",
    light: "font-display-lg text-display-lg text-primary mb-6 leading-tight [text-wrap:wrap]",
  },
  description: {
    dark: "font-body-lg text-body-lg text-white/70 mb-6 max-w-xl",
    light: "font-body-lg text-body-lg text-on-surface-variant mb-6 max-w-xl",
  },
  supporting: {
    dark: "font-body-md text-body-md text-white/60 mb-10 max-w-xl",
    light: "font-body-md text-body-md text-on-surface-variant mb-10 max-w-xl",
  },
} as const;

interface HeroSectionProps {
  children: ReactNode;
  className?: string;
  tone?: HeroTone;
}

export function HeroSection({ children, className, tone = "dark" }: HeroSectionProps) {
  return (
    <section
      className={cn(tone === "dark" ? heroLayout.sectionDark : heroLayout.sectionLight, className)}
    >
      {children}
    </section>
  );
}

interface HeroContainerProps {
  children: ReactNode;
  className?: string;
}

export function HeroContainer({ children, className }: HeroContainerProps) {
  return <div className={cn(heroLayout.container, className)}>{children}</div>;
}

interface HeroGridProps {
  children: ReactNode;
  className?: string;
}

export function HeroGrid({ children, className }: HeroGridProps) {
  return <div className={cn(heroLayout.grid, className)}>{children}</div>;
}

interface HeroContentProps {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}

export function HeroContent({ children, className, wide }: HeroContentProps) {
  return <div className={cn(wide ? heroLayout.contentWide : heroLayout.content, className)}>{children}</div>;
}

interface HeroVisualProps {
  children: ReactNode;
  className?: string;
  hideOnMobile?: boolean;
}

export function HeroVisual({ children, className, hideOnMobile = true }: HeroVisualProps) {
  return (
    <div
      className={cn(heroLayout.visual, hideOnMobile && heroLayout.visualHiddenMobile, className)}
    >
      {children}
    </div>
  );
}

interface HeroEyebrowProps {
  children: ReactNode;
  tone?: HeroTone;
  className?: string;
}

export function HeroEyebrow({ children, tone = "dark", className }: HeroEyebrowProps) {
  return <span className={cn(heroTypography.eyebrow[tone], className)}>{children}</span>;
}

interface HeroTitleProps {
  children: ReactNode;
  tone?: HeroTone;
  className?: string;
}

export function HeroTitle({ children, tone = "dark", className }: HeroTitleProps) {
  return <h1 className={cn(heroTypography.title[tone], className)}>{children}</h1>;
}

interface HeroDescriptionProps {
  children: ReactNode;
  tone?: HeroTone;
  className?: string;
}

export function HeroDescription({ children, tone = "dark", className }: HeroDescriptionProps) {
  return <p className={cn(heroTypography.description[tone], className)}>{children}</p>;
}

interface HeroSupportingTextProps {
  children: ReactNode;
  tone?: HeroTone;
  className?: string;
}

export function HeroSupportingText({ children, tone = "dark", className }: HeroSupportingTextProps) {
  return <p className={cn(heroTypography.supporting[tone], className)}>{children}</p>;
}

interface HeroActionsProps {
  children: ReactNode;
  className?: string;
}

export function HeroActions({ children, className }: HeroActionsProps) {
  return <div className={cn("flex flex-wrap gap-4", className)}>{children}</div>;
}
