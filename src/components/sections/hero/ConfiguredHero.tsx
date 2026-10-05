import type { ReactNode } from "react";
import Link from "next/link";
import { BackgroundImageHero, SplitHero } from "@/components/sections/hero";
import { getHeroPageConfig, type HeroPageConfig } from "@/config/hero-pages";

function renderTitle(config: HeroPageConfig): ReactNode {
  if (config.titleLines?.length) {
    return config.titleLines.map((line, index) => (
      <span key={`${line}-${index}`}>
        {index > 0 ? <br /> : null}
        {line}
      </span>
    ));
  }

  if (config.titleAccent) {
    return (
      <>
        {config.title}
        {config.titleAccent.startsWith("\n") ? null : " "}
        <span className={config.titleAccentClassName ?? "text-secondary-fixed"}>
          {config.titleAccent}
        </span>
      </>
    );
  }

  return config.title;
}

function renderCtas(config: HeroPageConfig) {
  if (!config.ctas?.length) return null;

  return config.ctas.map((cta) => {
    const primary =
      cta.variant === "primary"
        ? "group flex items-center gap-2 bg-white px-8 py-4 font-label-sm text-label-sm font-bold text-primary-container transition-all"
        : cta.variant === "secondary-dark"
          ? "border border-white/20 px-8 py-4 font-label-sm text-label-sm font-bold text-white hover:bg-white/5"
          : cta.variant === "outline"
            ? "border border-outline px-8 py-4 font-label-sm text-label-sm font-bold transition-all hover:bg-surface-container"
            : "rounded-full bg-primary px-8 py-3 font-label-sm text-label-sm font-bold text-on-primary transition-colors hover:bg-primary/90";

    return (
      <Link key={`${cta.href}-${cta.label}`} href={cta.href} className={primary}>
        {cta.label}
        {cta.icon ? (
          <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
            {cta.icon}
          </span>
        ) : null}
      </Link>
    );
  });
}

export function ConfiguredHero({ slug }: { slug: string }) {
  const config = getHeroPageConfig(slug);
  if (!config) return null;

  const ctas = renderCtas(config);

  if (config.variant === "background") {
    return (
      <BackgroundImageHero
        eyebrow={config.eyebrow}
        title={renderTitle(config)}
        description={config.description}
        supportingText={config.supportingText}
        backgroundImage={config.image}
        backgroundAlt={config.imageAlt}
        overlay={config.overlay}
        tone={config.tone}
      >
        {ctas}
      </BackgroundImageHero>
    );
  }

  return (
    <SplitHero
      eyebrow={config.eyebrow}
      title={renderTitle(config)}
      description={config.description}
      supportingText={config.supportingText}
      image={config.image}
      imageAlt={config.imageAlt}
      tone={config.tone ?? "dark"}
      imagePosition={config.imagePosition}
    >
      {ctas}
    </SplitHero>
  );
}
