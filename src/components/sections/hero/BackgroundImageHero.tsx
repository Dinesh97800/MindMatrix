import type { ReactNode } from "react";
import {
  cn,
  HeroActions,
  HeroContainer,
  HeroContent,
  HeroDescription,
  HeroEyebrow,
  HeroSection,
  HeroSupportingText,
  HeroTitle,
  heroLayout,
  type HeroTone,
} from "./hero-foundation";

export type BackgroundImageHeroOverlay = "dark" | "gradient-left-light" | "gradient-left-dark";

const overlayClasses: Record<BackgroundImageHeroOverlay, string> = {
  dark: "absolute inset-0 bg-primary-container/70",
  "gradient-left-light":
    "absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/20",
  "gradient-left-dark":
    "absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/80 to-primary-container/30",
};

export interface BackgroundImageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  supportingText?: ReactNode;
  backgroundImage: string;
  backgroundAlt?: string;
  backgroundPosition?: string;
  overlay?: BackgroundImageHeroOverlay;
  tone?: HeroTone;
  children?: ReactNode;
  className?: string;
}

export function BackgroundImageHero({
  eyebrow,
  title,
  description,
  supportingText,
  backgroundImage,
  backgroundAlt,
  backgroundPosition = "center",
  overlay = "gradient-left-light",
  tone = "light",
  children,
  className,
}: BackgroundImageHeroProps) {
  return (
    <HeroSection tone={tone} className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0 z-0" aria-hidden>
        <div
          className="h-full w-full bg-cover opacity-90"
          data-alt={backgroundAlt}
          style={{
            backgroundImage: `url('${backgroundImage}')`,
            backgroundPosition,
          }}
        />
        <div className={overlayClasses[overlay]} />
      </div>

      <HeroContainer>
        <HeroContent wide>
          {eyebrow ? <HeroEyebrow tone={tone}>{eyebrow}</HeroEyebrow> : null}
          <HeroTitle tone={tone}>{title}</HeroTitle>
          {description ? <HeroDescription tone={tone}>{description}</HeroDescription> : null}
          {supportingText ? (
            <HeroSupportingText tone={tone}>{supportingText}</HeroSupportingText>
          ) : null}
          {children ? <HeroActions>{children}</HeroActions> : null}
        </HeroContent>
      </HeroContainer>
    </HeroSection>
  );
}
