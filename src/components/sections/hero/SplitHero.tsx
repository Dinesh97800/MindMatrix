import type { ReactNode } from "react";
import {
  cn,
  HeroActions,
  HeroContainer,
  HeroContent,
  HeroDescription,
  HeroEyebrow,
  HeroGrid,
  HeroSection,
  HeroSupportingText,
  HeroTitle,
  HeroVisual,
  heroLayout,
  type HeroTone,
} from "./hero-foundation";

export interface SplitHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  supportingText?: ReactNode;
  image: string;
  imageAlt: string;
  imageOverlay?: ReactNode;
  imagePosition?: "left" | "right";
  tone?: HeroTone;
  children?: ReactNode;
  className?: string;
}

export function SplitHero({
  eyebrow,
  title,
  description,
  supportingText,
  image,
  imageAlt,
  imageOverlay,
  imagePosition = "right",
  tone = "dark",
  children,
  className,
}: SplitHeroProps) {
  const imageOnLeft = imagePosition === "left";

  return (
    <HeroSection tone={tone} className={className}>
      <HeroContainer>
        <HeroGrid>
          <HeroContent
            className={cn(imageOnLeft && "lg:order-2", !imageOnLeft && "lg:order-1")}
          >
            {eyebrow ? <HeroEyebrow tone={tone}>{eyebrow}</HeroEyebrow> : null}
            <HeroTitle tone={tone}>{title}</HeroTitle>
            {description ? <HeroDescription tone={tone}>{description}</HeroDescription> : null}
            {supportingText ? (
              <HeroSupportingText tone={tone}>{supportingText}</HeroSupportingText>
            ) : null}
            {children ? <HeroActions>{children}</HeroActions> : null}
          </HeroContent>

          <HeroVisual
            hideOnMobile={false}
            className={cn(imageOnLeft && "lg:order-1", !imageOnLeft && "lg:order-2")}
          >
            <div className={heroLayout.imageFrame}>
              <div
                className={heroLayout.imageInner}
                role="img"
                aria-label={imageAlt}
                style={{ backgroundImage: `url('${image}')` }}
              >
                {tone === "dark" ? (
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 to-transparent" />
                ) : null}
                {imageOverlay}
              </div>
            </div>
          </HeroVisual>
        </HeroGrid>
      </HeroContainer>
    </HeroSection>
  );
}
