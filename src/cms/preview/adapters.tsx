"use client";

import { useState } from "react";
import Link from "next/link";
import { StitchImage } from "@/components/ui/StitchImage";
import {
  BackgroundImageHero,
  HeroActions,
  HeroContainer,
  HeroContent,
  HeroDescription,
  HeroEyebrow,
  HeroSection,
  HeroTitle,
  SplitHero,
  type HeroTone,
} from "@/components/sections/hero";
import { ContactUsForm } from "@/components/forms/ContactUsForm";
import { EngineeringConsultationForm } from "@/components/forms/EngineeringConsultationForm";
import { RequestConsultationForm } from "@/components/forms/RequestConsultationForm";
import { asRecord, asString, bodyOf, eyebrowOf, firstString, headingOf, paragraphsOf } from "./content";
import type { PreviewSectionPayload } from "./types";

function MissingMedia({ message }: { message: string }) {
  return (
    <div className="border border-dashed border-amber-400 bg-amber-50 px-4 py-3 text-sm text-amber-950">
      Missing media: {message}. No placeholder was invented.
    </div>
  );
}

function MissingOptional({ label }: { label: string }) {
  return (
    <p className="text-sm italic text-on-surface-variant">Optional {label} is empty in CMS data.</p>
  );
}

function ActionLinks({
  actions,
  primaryClass,
  secondaryClass,
}: {
  actions: PreviewSectionPayload["actions"];
  primaryClass: string;
  secondaryClass: string;
}) {
  if (!actions.length) return null;
  return (
    <>
      {actions.map((action, index) => (
        <Link
          key={`${action.href}-${action.label}`}
          href={action.href}
          className={index === 0 ? primaryClass : secondaryClass}
        >
          {action.label}
        </Link>
      ))}
    </>
  );
}

function renderHeroTitle(
  title: string,
  titleAccent?: string,
  titleAccentClassName?: string
) {
  const base =
    title.includes("\n")
      ? title.split("\n").map((line, index) => (
          <span key={`${line}-${index}`}>
            {index > 0 ? <br /> : null}
            {line}
          </span>
        ))
      : title;

  if (!titleAccent) return base;

  return (
    <>
      {base}
      {titleAccent.startsWith("\n") ? null : " "}
      <span className={titleAccentClassName ?? "text-secondary-fixed"}>
        {titleAccent.replace(/^\n/, "")}
      </span>
    </>
  );
}

function heroCtaClass(variant: string | undefined, index: number) {
  const resolved = variant ?? (index === 0 ? "primary" : "secondary-dark");
  if (resolved === "primary") {
    return "group flex items-center gap-2 bg-white px-8 py-4 font-label-sm text-label-sm font-bold text-primary-container transition-all";
  }
  if (resolved === "secondary-dark") {
    return "border border-white/20 px-8 py-4 font-label-sm text-label-sm font-bold text-white hover:bg-white/5";
  }
  if (resolved === "outline") {
    return "border border-outline px-8 py-4 font-label-sm text-label-sm font-bold transition-all hover:bg-surface-container";
  }
  return "rounded-full bg-primary px-8 py-3 font-label-sm text-label-sm font-bold text-on-primary transition-colors hover:bg-primary/90";
}

function HeroActionLinks({ actions }: { actions: PreviewSectionPayload["actions"] }) {
  if (!actions.length) return null;
  return (
    <>
      {actions.map((action, index) => (
        <Link
          key={`${action.href}-${action.label}`}
          href={action.href}
          className={heroCtaClass(action.variant, index)}
        >
          {action.label}
        </Link>
      ))}
    </>
  );
}

export function HomeHeroAdapter({ section }: { section: PreviewSectionPayload }) {
  const title = headingOf(section.data);
  const eyebrow = eyebrowOf(section.data);
  const summary = bodyOf(section.data);
  const supporting = asString(section.data.supportingText);
  const metrics = Array.isArray(section.data.metrics)
    ? section.data.metrics.map(asRecord)
    : [];

  return (
    <section className="relative flex min-h-[640px] items-center overflow-x-clip bg-primary-container md:min-h-[921px]">
      {section.media.url ? (
        <div
          className="absolute inset-0 z-0 opacity-40 mix-blend-overlay"
          role="img"
          aria-label={section.media.alt ?? ""}
          style={{ backgroundImage: `url('${section.media.url}')` }}
        />
      ) : (
        <div className="absolute inset-x-0 top-0 z-20 p-4">
          <MissingMedia message={section.media.missing ?? "home hero has no resolved image"} />
        </div>
      )}
      <div className="relative z-10 mx-auto w-full max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
        <div className="flex w-full min-w-0 max-w-4xl flex-col items-start space-y-stack-md">
          {eyebrow ? (
            <p className="font-label-sm text-label-sm uppercase tracking-widest text-on-primary-container">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h1 className="w-full text-left font-display-lg text-display-lg leading-tight text-white [text-wrap:wrap]">
              {title.split("\n").map((line, index) => (
                <span key={`${line}-${index}`}>
                  {index > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </h1>
          ) : (
            <MissingOptional label="title" />
          )}
          {summary ? (
            <p className="max-w-2xl font-body-lg text-body-lg text-on-primary-container/80">{summary}</p>
          ) : null}
          {supporting ? (
            <p className="font-label-sm text-label-sm uppercase tracking-wide text-on-primary-container/70">
              {supporting}
            </p>
          ) : null}
          <div className="flex flex-col flex-wrap gap-4 pt-4 sm:flex-row">
            <ActionLinks
              actions={section.actions}
              primaryClass="w-full sm:w-auto bg-white text-primary px-6 sm:px-8 py-4 rounded-full font-label-sm text-label-sm font-bold hover:bg-primary-fixed transition-all flex items-center justify-center gap-2"
              secondaryClass="w-full sm:w-auto border border-white/20 text-white px-6 sm:px-8 py-4 rounded-full font-label-sm text-label-sm font-bold hover:bg-white/10 backdrop-blur-sm transition-all text-center"
            />
          </div>
        </div>
        {metrics.length ? (
          <div className="mt-16 grid grid-cols-1 gap-gutter border-t border-white/10 pt-12 sm:grid-cols-3 md:mt-32">
            {metrics.map((metric, index) => (
              <div key={index} className="space-y-1">
                <div className="font-display-lg text-headline-lg text-white">
                  {firstString(metric.value, metric.title)}
                </div>
                <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-primary-container">
                  {firstString(metric.label, metric.body)}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function HeroAdapter({ section }: { section: PreviewSectionPayload }) {
  const title = headingOf(section.data);
  const eyebrow = eyebrowOf(section.data);
  const description = bodyOf(section.data);
  const supportingText = asString(section.data.supportingText);
  const titleAccent = asString(section.data.titleAccent);
  const titleAccentClassName = asString(section.data.titleAccentClassName);
  const overlayRaw = asString(section.data.overlay);
  const overlay =
    overlayRaw === "dark" || overlayRaw === "gradient-left-light" || overlayRaw === "gradient-left-dark"
      ? overlayRaw
      : undefined;
  const variant =
    asString(section.data.variant) === "background" || Boolean(overlay)
      ? "background"
      : "split";
  const explicitTone = asString(section.data.tone);
  const tone: HeroTone =
    explicitTone === "light" || (!explicitTone && overlay === "gradient-left-light")
      ? "light"
      : "dark";
  const imagePosition =
    asString(section.data.imagePosition) === "left" || asString(section.data.alignment) === "right"
      ? "left"
      : "right";
  const titleNode = title
    ? renderHeroTitle(title, titleAccent, titleAccentClassName)
    : null;
  const cta = <HeroActionLinks actions={section.actions} />;

  if (!title || !titleNode) {
    return (
      <section className="px-margin-mobile py-stack-lg md:px-margin-desktop">
        <p className="text-sm text-error">Hero template {section.template} is missing a title.</p>
        {section.media.missing ? <MissingMedia message={section.media.missing} /> : null}
      </section>
    );
  }

  if (variant === "background") {
    if (!section.media.url) {
      return (
        <HeroSection tone={tone}>
          <HeroContainer>
            <HeroContent>
              <MissingMedia message={section.media.missing ?? "background image not resolved"} />
              {eyebrow ? <HeroEyebrow tone={tone}>{eyebrow}</HeroEyebrow> : null}
              <HeroTitle tone={tone}>{titleNode}</HeroTitle>
              {description ? <HeroDescription tone={tone}>{description}</HeroDescription> : null}
              {cta ? <HeroActions>{cta}</HeroActions> : null}
            </HeroContent>
          </HeroContainer>
        </HeroSection>
      );
    }
    return (
      <BackgroundImageHero
        eyebrow={eyebrow}
        title={titleNode}
        description={description}
        supportingText={supportingText}
        backgroundImage={section.media.url}
        backgroundAlt={section.media.alt}
        overlay={overlay}
        tone={tone}
      >
        {cta}
      </BackgroundImageHero>
    );
  }

  if (!section.media.url) {
    return (
      <HeroSection tone={tone}>
        <HeroContainer>
          <HeroContent>
            <MissingMedia message={section.media.missing ?? "hero image not resolved"} />
            {eyebrow ? <HeroEyebrow tone={tone}>{eyebrow}</HeroEyebrow> : null}
            <HeroTitle tone={tone}>{titleNode}</HeroTitle>
            {description ? <HeroDescription tone={tone}>{description}</HeroDescription> : null}
            {cta ? <HeroActions>{cta}</HeroActions> : null}
          </HeroContent>
        </HeroContainer>
      </HeroSection>
    );
  }

  return (
    <SplitHero
      eyebrow={eyebrow}
      title={titleNode}
      description={description}
      supportingText={supportingText}
      image={section.media.url}
      imageAlt={section.media.alt ?? ""}
      tone={tone}
      imagePosition={imagePosition}
    >
      {cta}
    </SplitHero>
  );
}

export function ApprovedScopeAdapter({ section }: { section: PreviewSectionPayload }) {
  const items = section.cards
    .map((card) => card.title || card.body)
    .filter((item): item is string => Boolean(item));

  return (
    <section className="border-y border-outline-variant/10 bg-surface-container-low px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="mx-auto max-w-container-max">
        {headingOf(section.data) ? (
          <h2 className="mb-8 font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
        ) : (
          <MissingOptional label="heading" />
        )}
        {items.length === 0 ? (
          <MissingOptional label="scope items" />
        ) : (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {items.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-lg border border-outline-variant/30 bg-surface-container-lowest p-4"
              >
                <span className="material-symbols-outlined shrink-0 text-primary" aria-hidden>
                  check_circle
                </span>
                <span className="font-body-md text-on-surface">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export function ApprovedInfoAdapter({ section }: { section: PreviewSectionPayload }) {
  const cards = section.cards;
  return (
    <section className="px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="mx-auto grid max-w-container-max grid-cols-1 gap-gutter lg:grid-cols-2">
        {cards.length === 0 ? <MissingOptional label="info cards" /> : null}
        {cards.map((card, index) => (
          <div
            key={`${card.title}-${index}`}
            className={
              index === 1
                ? "rounded-xl border border-outline-variant/30 bg-primary-container p-stack-md text-on-primary-container"
                : "rounded-xl border border-outline-variant/30 p-stack-md"
            }
          >
            <h3
              className={
                index === 1
                  ? "mb-3 font-headline-md text-headline-md text-on-primary"
                  : "mb-3 font-headline-md text-headline-md"
              }
            >
              {card.title}
            </h3>
            {card.body ? <p className="font-body-md">{card.body}</p> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

export function IndexGridAdapter({ section }: { section: PreviewSectionPayload }) {
  const items = section.cards.filter((card) => card.href);
  return (
    <section className="border-y border-outline-variant/10 bg-surface-container-low px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="mx-auto max-w-container-max">
        {items.length === 0 ? <MissingOptional label="index links" /> : null}
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href!}
              className="group flex flex-col rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-stack-md transition-colors hover:border-primary/30 hover:bg-surface"
            >
              <h2 className="mb-3 font-headline-md text-headline-md group-hover:text-primary">
                {item.title}
              </h2>
              <span className="mt-auto inline-flex items-center gap-2 font-label-sm text-label-sm text-primary">
                Learn more
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUsAdapter({ section }: { section: PreviewSectionPayload }) {
  return (
    <section className="bg-surface py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          {eyebrowOf(section.data) ? (
            <span className="inline-block font-label-sm text-label-sm uppercase tracking-widest text-secondary">
              {eyebrowOf(section.data)}
            </span>
          ) : null}
          {headingOf(section.data) ? (
            <h2 className="font-display-lg text-headline-lg text-primary">{headingOf(section.data)}</h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {bodyOf(section.data) ? (
            <p className="font-body-lg text-on-surface-variant">{bodyOf(section.data)}</p>
          ) : null}
        </div>
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
          {section.cards.map((item) => (
            <div key={item.title} className="glass-card flex h-full flex-col rounded-xl p-8">
              {item.icon ? (
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                  <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                </div>
              ) : null}
              <h3 className="mb-3 font-headline-md text-headline-md text-primary">{item.title}</h3>
              {item.body ? (
                <p className="flex-grow font-body-md text-on-surface-variant">{item.body}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceCardsAdapter({ section }: { section: PreviewSectionPayload }) {
  return (
    <section className="bg-surface-container-lowest px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="mx-auto max-w-container-max">
        <div className="mb-16 flex max-w-xl flex-col gap-6">
          {headingOf(section.data) ? (
            <h2 className="mb-4 font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {bodyOf(section.data) ? (
            <p className="font-body-md text-body-md text-on-surface-variant">{bodyOf(section.data)}</p>
          ) : null}
        </div>
        {section.cards.length === 0 ? <MissingOptional label="cards" /> : null}
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 xl:grid-cols-3">
          {section.cards.map((item) => (
            <div
              key={item.title}
              className="technical-glow group flex h-full flex-col border border-outline-variant bg-white p-8"
            >
              <div className="mb-6">
                {item.icon ? (
                  <span className="material-symbols-outlined text-4xl font-thin text-primary">
                    {item.icon}
                  </span>
                ) : null}
              </div>
              <h3 className="mb-4 font-headline-md text-headline-md">{item.title}</h3>
              {item.body ? (
                <p className="mb-4 font-body-md text-on-surface-variant">{item.body}</p>
              ) : null}
              {item.href ? (
                <Link
                  href={item.href}
                  className="mt-auto flex items-center gap-2 font-label-sm text-label-sm text-primary transition-all group-hover:gap-4"
                >
                  View service
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CardsAdapter({ section }: { section: PreviewSectionPayload }) {
  return <ServiceCardsAdapter section={section} />;
}

export function HomeIndustriesAdapter({ section }: { section: PreviewSectionPayload }) {
  const explore = section.actions[0];
  return (
    <section className="bg-white py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="space-y-6 self-start lg:col-span-4">
            {headingOf(section.data) ? (
              <h2 className="font-display-lg text-headline-lg text-primary">
                {headingOf(section.data)}
              </h2>
            ) : (
              <MissingOptional label="heading" />
            )}
            {bodyOf(section.data) ? (
              <p className="font-body-lg text-on-surface-variant">{bodyOf(section.data)}</p>
            ) : null}
            {explore ? (
              <Link
                href={explore.href}
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-on-primary transition-colors hover:bg-primary/90"
              >
                {explore.label}
              </Link>
            ) : null}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
            {section.cards.length === 0 ? <MissingOptional label="industry cards" /> : null}
            {section.cards.map((card) => (
              <div key={card.title} className="group relative h-64 overflow-hidden rounded-xl">
                <div className="absolute inset-0 z-10 bg-primary/40 transition-all group-hover:bg-primary/20" />
                {card.imageUrl ? (
                  <StitchImage
                    src={card.imageUrl}
                    alt={card.imageAlt ?? card.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="relative z-20 p-4">
                    <MissingMedia message={`${card.title} has no image`} />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 z-20 p-6">
                  <h4 className="font-headline-md text-headline-md text-white">{card.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function LogoMarqueeAdapter({ section }: { section: PreviewSectionPayload }) {
  const logos = Array.isArray(section.data.items)
    ? section.data.items
        .map((item) =>
          typeof item === "string"
            ? item
            : firstString(asRecord(item).label, asRecord(item).title) ?? ""
        )
        .filter(Boolean)
    : section.cards.map((card) => card.title).filter(Boolean);

  if (logos.length === 0) {
    return (
      <section className="border-y border-outline-variant/10 bg-surface-container py-stack-md">
        <MissingOptional label="logo items" />
      </section>
    );
  }

  return (
    <section className="overflow-hidden border-y border-outline-variant/10 bg-surface-container py-stack-md">
      <div className="flex animate-scroll-x whitespace-nowrap">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-20 px-10">
            {logos.map((logo) => (
              <span
                key={`${copy}-${logo}`}
                className="font-display-lg text-headline-md text-outline-variant opacity-50"
              >
                {logo}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export function ApprovedCtaAdapter({ section }: { section: PreviewSectionPayload }) {
  return (
    <section className="px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="mx-auto max-w-container-max rounded-3xl border border-outline-variant bg-surface py-stack-lg text-center">
        {headingOf(section.data) ? (
          <h2 className="mb-4 font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
        ) : (
          <MissingOptional label="heading" />
        )}
        {bodyOf(section.data) ? (
          <p className="mx-auto mb-8 max-w-2xl font-body-md text-on-surface-variant">
            {bodyOf(section.data)}
          </p>
        ) : null}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <ActionLinks
            actions={section.actions}
            primaryClass="rounded-full bg-primary px-8 py-3 font-label-sm text-label-sm text-on-primary transition-colors hover:bg-primary/90"
            secondaryClass="rounded-full border border-outline px-8 py-3 font-label-sm text-label-sm transition-colors hover:bg-surface-container-low"
          />
        </div>
      </div>
    </section>
  );
}

export function CtaAdapter({ section }: { section: PreviewSectionPayload }) {
  return (
    <section className="relative overflow-hidden px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="absolute inset-0 blueprint-pattern opacity-5" />
      <div className="relative z-10 mx-auto max-w-container-max overflow-hidden rounded-3xl border border-outline-variant bg-surface py-stack-lg text-center">
        <h2 className="mb-6 font-display-lg text-headline-lg">{headingOf(section.data)}</h2>
        {bodyOf(section.data) ? (
          <p className="mx-auto mb-12 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
            {bodyOf(section.data)}
          </p>
        ) : null}
        <div className="flex flex-col justify-center gap-6 sm:flex-row">
          <ActionLinks
            actions={section.actions}
            primaryClass="rounded-full bg-primary px-10 py-4 font-label-sm text-label-sm text-on-primary shadow-lg shadow-primary/10 transition-all hover:bg-primary-container hover:text-on-primary-container"
            secondaryClass="rounded-full border border-outline bg-transparent px-10 py-4 font-label-sm text-label-sm transition-all hover:bg-surface-container-low"
          />
        </div>
      </div>
    </section>
  );
}

export function AboutWorkingModelAdapter({ section }: { section: PreviewSectionPayload }) {
  const paragraphs = paragraphsOf(section.data);
  const cards = section.cards;

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 items-start gap-gutter md:grid-cols-12">
          <div className="space-y-stack-md md:col-span-5">
            {headingOf(section.data) ? (
              <h2 className="mb-stack-md font-headline-lg text-headline-lg text-primary">
                {headingOf(section.data)}
              </h2>
            ) : (
              <MissingOptional label="heading" />
            )}
            {paragraphs.length ? (
              paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="font-body-md text-body-md text-on-surface-variant"
                >
                  {paragraph}
                </p>
              ))
            ) : (
              <MissingOptional label="paragraphs" />
            )}
          </div>
          <div className="grid grid-cols-1 gap-base md:col-span-6 md:col-start-7">
            {cards.length ? (
              cards.map((card) => (
                <div
                  key={card.title}
                  className="glass-card rounded-lg border border-outline-variant/30 p-8 md:p-10"
                >
                  {card.icon ? (
                    <span className="material-symbols-outlined mb-4 block text-4xl text-primary">
                      {card.icon}
                    </span>
                  ) : null}
                  <h3 className="mb-2 font-headline-md text-headline-md">{card.title}</h3>
                  {card.body ? (
                    <p className="font-body-md text-body-md text-on-surface-variant">{card.body}</p>
                  ) : null}
                </div>
              ))
            ) : (
              <MissingOptional label="cards" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutProductionTransitionAdapter({ section }: { section: PreviewSectionPayload }) {
  const supporting = asString(section.data.supportingText);
  const cards = section.cards;

  return (
    <section className="bg-surface-container py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 items-center gap-gutter lg:grid-cols-2">
          <div>
            {headingOf(section.data) ? (
              <h2 className="mb-4 font-headline-lg text-headline-lg text-primary">
                {headingOf(section.data)}
              </h2>
            ) : (
              <MissingOptional label="heading" />
            )}
            {bodyOf(section.data) ? (
              <p className="mb-6 font-body-lg text-on-surface-variant">{bodyOf(section.data)}</p>
            ) : (
              <MissingOptional label="body" />
            )}
            {supporting ? (
              <p className="font-body-md text-on-surface-variant">{supporting}</p>
            ) : (
              <MissingOptional label="supporting text" />
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {cards.length ? (
              cards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-lg border border-outline-variant/20 bg-white p-5 text-sm text-on-surface-variant"
                >
                  {card.title}
                </div>
              ))
            ) : (
              <MissingOptional label="cards" />
            )}
          </div>
        </div>
        <div className="mt-12 text-center">
          {section.actions.length ? (
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              {section.actions.map((action, index) => (
                <Link
                  key={`${action.href}-${action.label}`}
                  href={action.href}
                  className={
                    index === 0
                      ? "inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-label-sm text-label-sm font-bold text-on-primary transition-all hover:bg-primary-container"
                      : "inline-flex items-center gap-2 rounded-full border border-outline px-8 py-4 font-label-sm text-label-sm transition-all hover:bg-surface-container-low"
                  }
                >
                  {action.label}
                  {index === 0 ? (
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  ) : null}
                </Link>
              ))}
            </div>
          ) : (
            <MissingOptional label="action" />
          )}
        </div>
      </div>
    </section>
  );
}

export function ConnectivityDeploymentsAdapter({ section }: { section: PreviewSectionPayload }) {
  return (
    <section className="mx-auto max-w-container-max px-margin-desktop py-stack-lg">
      <div className="mb-stack-lg text-center">
        {headingOf(section.data) ? (
          <h2 className="mb-4 font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
        ) : (
          <MissingOptional label="heading" />
        )}
        {firstString(section.data.introduction, section.data.body) ? (
          <p className="font-body-md text-on-surface-variant">
            {firstString(section.data.introduction, section.data.body)}
          </p>
        ) : (
          <MissingOptional label="introduction" />
        )}
      </div>
      {section.cards.length ? (
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
          {section.cards.map((card) => (
            <div
              key={card.title}
              className="group relative h-96 overflow-hidden rounded-lg border border-outline-variant/20"
            >
              {card.imageUrl ? (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${card.imageUrl}')` }}
                />
              ) : (
                <div className="absolute inset-0 p-4">
                  <MissingMedia message={`${card.title} image`} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-stack-md text-white">
                {card.eyebrow ? (
                  <span className="mb-2 block font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed">
                    {card.eyebrow}
                  </span>
                ) : null}
                <h3 className="mb-2 font-headline-md text-headline-md">{card.title}</h3>
                {card.body ? (
                  <p className="max-w-sm font-body-md opacity-80">{card.body}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <MissingOptional label="deployment cards" />
      )}
    </section>
  );
}

export function ConnectivityRfDesignAdapter({ section }: { section: PreviewSectionPayload }) {
  const background = asRecord(section.data.background);
  const backgroundUrl = firstString(background.source, background.url);
  const cards = section.cards;

  return (
    <section className="relative overflow-hidden bg-primary py-stack-lg text-on-primary">
      {backgroundUrl ? (
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url('${backgroundUrl}')` }}
          />
        </div>
      ) : null}
      <div className="relative z-10 mx-auto grid max-w-container-max grid-cols-12 items-center gap-gutter px-margin-desktop">
        <div className="col-span-12 lg:col-span-6">
          {headingOf(section.data) ? (
            <h2 className="mb-stack-md font-display-lg text-headline-lg">{headingOf(section.data)}</h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {bodyOf(section.data) ? (
            <p className="mb-stack-lg font-body-lg leading-relaxed text-on-primary-container">
              {bodyOf(section.data)}
            </p>
          ) : (
            <MissingOptional label="body" />
          )}
          {cards.length ? (
            <ul className="space-y-4">
              {cards.map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  {item.icon ? (
                    <span className="material-symbols-outlined text-on-primary-fixed-variant">
                      {item.icon}
                    </span>
                  ) : null}
                  <div>
                    <strong className="block font-headline-md text-body-lg">{item.title}</strong>
                    {item.body ? <span className="font-body-md opacity-70">{item.body}</span> : null}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <MissingOptional label="certification items" />
          )}
        </div>
        <div className="col-span-12 lg:col-span-6">
          <div className="glass-panel aspect-video overflow-hidden rounded-lg border border-white/10">
            {section.media.url ? (
              <StitchImage
                src={section.media.url}
                alt={section.media.alt ?? headingOf(section.data) ?? ""}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="p-4">
                <MissingMedia message={section.media.missing ?? "RF visualization"} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesEngineeringApproachAdapter({ section }: { section: PreviewSectionPayload }) {
  const cards = section.cards;
  const imageUrl = section.media.url;
  const imageAlt = section.media.alt ?? headingOf(section.data) ?? "";

  return (
    <section className="bg-primary-container px-margin-mobile py-stack-lg text-on-primary md:px-margin-desktop">
      <div className="mx-auto grid max-w-container-max grid-cols-1 items-center gap-stack-lg lg:grid-cols-2 lg:gap-gutter">
        <div>
          {headingOf(section.data) ? (
            <h2 className="mb-8 font-display-lg text-headline-lg-mobile md:text-headline-lg">
              {headingOf(section.data)}
            </h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {cards.length ? (
            <div className="space-y-8">
              {cards.map((item) => (
                <div key={item.title} className="flex gap-6">
                  {item.icon ? (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-on-primary/20">
                      <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                  ) : null}
                  <div>
                    <h4 className="mb-2 font-headline-md text-xl">{item.title}</h4>
                    {item.body ? (
                      <p className="font-body-md text-on-primary-container">{item.body}</p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <MissingOptional label="approach points" />
          )}
        </div>
        <div className="group relative h-[420px] w-full overflow-hidden rounded-2xl border border-on-primary/10">
          {imageUrl ? (
            <StitchImage
              src={imageUrl}
              alt={imageAlt}
              className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 p-4">
              <MissingMedia message={section.media.missing ?? "engineering approach image"} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/20 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            {bodyOf(section.data) ? (
              <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                <p className="font-body-md text-on-primary">{bodyOf(section.data)}</p>
              </div>
            ) : (
              <MissingOptional label="overlay copy" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function BulletList({
  items,
  className,
  dotClassName,
}: {
  items?: string[];
  className: string;
  dotClassName: string;
}) {
  if (!items?.length) return null;
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <span className={`mt-2 h-1 w-1 shrink-0 rounded-full ${dotClassName}`} />
          {item}
        </li>
      ))}
    </ul>
  );
}

function bodyParagraphs(data: Record<string, unknown>): string[] {
  if (Array.isArray(data.body)) {
    return data.body.map(asString).filter((item): item is string => Boolean(item));
  }
  return paragraphsOf(data);
}

export function AiSolutionDomainsAdapter({ section }: { section: PreviewSectionPayload }) {
  const [edge, custom, agentic, knowledge] = section.cards;
  const extraParagraphs = bodyParagraphs(section.data);

  return (
    <section
      id="capabilities"
      className="mx-auto max-w-container-max px-margin-desktop py-stack-lg"
    >
      <div className="mb-16 max-w-3xl">
        {headingOf(section.data) ? (
          <h2 className="mb-4 font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
        ) : (
          <MissingOptional label="heading" />
        )}
        {asString(section.data.introduction) ? (
          <p className="mb-4 font-body-md text-on-surface-variant">
            {asString(section.data.introduction)}
          </p>
        ) : null}
        {extraParagraphs.length
          ? extraParagraphs.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 40)}
                className={`font-body-md text-on-surface-variant ${index === extraParagraphs.length - 1 && extraParagraphs.length > 1 ? "mt-4" : ""}`}
              >
                {paragraph}
              </p>
            ))
          : null}
      </div>

      <div className="grid grid-cols-12 gap-gutter">
        {edge ? (
          <div className="glass-card group col-span-12 rounded-xl border border-outline-variant/20 p-8 transition-all hover:border-primary md:col-span-4">
            {edge.icon ? (
              <span className="material-symbols-outlined mb-6 text-4xl text-primary">{edge.icon}</span>
            ) : null}
            <h3 className="mb-4 font-headline-md text-headline-md">{edge.title}</h3>
            {edge.body ? <p className="mb-6 text-on-surface-variant">{edge.body}</p> : null}
            <BulletList
              items={edge.items}
              className="space-y-2 font-label-sm text-label-sm text-on-surface-variant"
              dotClassName="bg-primary"
            />
          </div>
        ) : (
          <div className="col-span-12 md:col-span-4">
            <MissingOptional label="Edge AI card" />
          </div>
        )}

        {custom ? (
          <div className="technical-glow group col-span-12 flex flex-col items-center gap-8 overflow-hidden rounded-xl border border-outline-variant/20 bg-white p-8 md:col-span-8 md:flex-row">
            <div className="flex-1">
              {custom.icon ? (
                <span className="material-symbols-outlined mb-6 text-4xl text-primary">
                  {custom.icon}
                </span>
              ) : null}
              <h3 className="mb-4 font-headline-md text-headline-md">{custom.title}</h3>
              {custom.body ? <p className="mb-6 text-on-surface-variant">{custom.body}</p> : null}
              <BulletList
                items={custom.items}
                className="space-y-2 font-label-sm text-label-sm text-on-surface-variant"
                dotClassName="bg-primary"
              />
            </div>
            <div className="relative min-h-[12rem] h-48 w-full flex-1 overflow-hidden rounded-lg bg-surface-container md:h-full">
              {custom.imageUrl ? (
                <StitchImage
                  src={custom.imageUrl}
                  alt={custom.imageAlt ?? custom.title}
                  className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                />
              ) : (
                <div className="p-4">
                  <MissingMedia message="Custom AI Applications image" />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="col-span-12 md:col-span-8">
            <MissingOptional label="Custom AI Applications card" />
          </div>
        )}

        {agentic ? (
          <div className="relative col-span-12 overflow-hidden rounded-xl bg-primary-container p-10 text-white md:col-span-6">
            <div className="relative z-10">
              <h3 className="mb-4 font-headline-md text-headline-md">{agentic.title}</h3>
              {agentic.body ? <p className="mb-6 text-white/70">{agentic.body}</p> : null}
              <BulletList
                items={agentic.items}
                className="mb-8 space-y-2 font-label-sm text-label-sm text-white/80"
                dotClassName="bg-secondary-fixed"
              />
              {agentic.href ? (
                <Link
                  href={agentic.href}
                  className="border-b border-white font-label-sm text-label-sm font-bold transition-opacity hover:opacity-70"
                >
                  {agentic.label ?? "Discuss Workflow Integration"}
                </Link>
              ) : (
                <MissingOptional label="action" />
              )}
            </div>
          </div>
        ) : (
          <div className="col-span-12 md:col-span-6">
            <MissingOptional label="Agentic AI card" />
          </div>
        )}

        {knowledge ? (
          <div className="col-span-12 rounded-xl border border-outline-variant/20 bg-surface-container p-10 md:col-span-6">
            <h3 className="mb-4 font-headline-md text-headline-md">{knowledge.title}</h3>
            {knowledge.body ? <p className="mb-6 text-on-surface-variant">{knowledge.body}</p> : null}
            <BulletList
              items={knowledge.items}
              className="space-y-2 font-label-sm text-label-sm text-on-surface-variant"
              dotClassName="bg-primary"
            />
          </div>
        ) : (
          <div className="col-span-12 md:col-span-6">
            <MissingOptional label="AI Knowledge card" />
          </div>
        )}
      </div>
    </section>
  );
}

export function AiCapabilityAreasAdapter({ section }: { section: PreviewSectionPayload }) {
  return (
    <section className="grid-pattern bg-surface py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          {headingOf(section.data) ? (
            <h2 className="mb-4 font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {firstString(section.data.introduction, section.data.body) ? (
            <p className="font-body-md text-on-surface-variant">
              {firstString(section.data.introduction, section.data.body)}
            </p>
          ) : (
            <MissingOptional label="introduction" />
          )}
        </div>
        {section.cards.length ? (
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
            {section.cards.map((card) => (
              <div
                key={card.title}
                className="technical-glow rounded-lg border border-outline-variant/20 bg-white p-8"
              >
                {card.icon ? (
                  <span className="material-symbols-outlined mb-4 text-3xl text-primary">
                    {card.icon}
                  </span>
                ) : null}
                <h4 className="mb-3 font-headline-md text-headline-md">{card.title}</h4>
                {card.body ? <p className="mb-4 text-sm text-on-surface-variant">{card.body}</p> : null}
                <BulletList
                  items={card.items}
                  className="space-y-2 text-sm text-on-surface-variant"
                  dotClassName="bg-primary"
                />
              </div>
            ))}
          </div>
        ) : (
          <MissingOptional label="capability cards" />
        )}
      </div>
    </section>
  );
}

export function AiPlatformsAdapter({ section }: { section: PreviewSectionPayload }) {
  const rows = Array.isArray(section.data.rows) ? section.data.rows.map(asRecord) : [];

  return (
    <section className="mx-auto max-w-container-max px-margin-desktop py-stack-lg">
      <div className="grid grid-cols-12 items-start gap-gutter">
        <div className="col-span-12 lg:col-span-5">
          {headingOf(section.data) ? (
            <h2 className="mb-6 font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {firstString(section.data.introduction, section.data.body) ? (
            <p className="font-body-md text-on-surface-variant">
              {firstString(section.data.introduction, section.data.body)}
            </p>
          ) : (
            <MissingOptional label="introduction" />
          )}
        </div>
        <div className="col-span-12 lg:col-span-7">
          {rows.length ? (
            <div className="overflow-x-auto rounded-xl border border-outline-variant/20 bg-white">
              <table className="w-full min-w-[32rem] text-left">
                <thead>
                  <tr className="border-b border-outline-variant/20 bg-surface-container">
                    <th className="px-6 py-4 font-label-sm text-label-sm uppercase tracking-wider text-primary">
                      Area
                    </th>
                    <th className="px-6 py-4 font-label-sm text-label-sm uppercase tracking-wider text-primary">
                      Capabilities
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={firstString(row.area, row.title)}
                      className="border-b border-outline-variant/10 last:border-0"
                    >
                      <td className="whitespace-nowrap px-6 py-4 align-top font-headline-md text-body-md font-semibold text-primary">
                        {firstString(row.area, row.title)}
                      </td>
                      <td className="px-6 py-4 font-body-md text-sm text-on-surface-variant">
                        {firstString(row.capabilities, row.body)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <MissingOptional label="platform rows" />
          )}
        </div>
      </div>
    </section>
  );
}

export function AiSolutionCategoriesAdapter({ section }: { section: PreviewSectionPayload }) {
  const whitepaper = section.actions[0];

  return (
    <section className="bg-primary-container py-stack-lg text-white">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="mb-16 flex flex-col items-end justify-between gap-8 lg:flex-row">
          <div className="max-w-2xl">
            {headingOf(section.data) ? (
              <h2 className="mb-4 font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
            ) : (
              <MissingOptional label="heading" />
            )}
            {firstString(section.data.introduction, section.data.body) ? (
              <p className="text-white/70">
                {firstString(section.data.introduction, section.data.body)}
              </p>
            ) : (
              <MissingOptional label="introduction" />
            )}
          </div>
          {whitepaper ? (
            <Link
              href={whitepaper.href}
              className="shrink-0 rounded bg-secondary-fixed px-8 py-3 font-label-sm text-label-sm font-bold text-primary transition-opacity hover:opacity-90"
            >
              {whitepaper.label}
            </Link>
          ) : (
            <MissingOptional label="action" />
          )}
        </div>
        {section.cards.length ? (
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
            {section.cards.map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10"
              >
                {card.icon ? (
                  <span className="material-symbols-outlined mb-4 text-4xl text-secondary-fixed">
                    {card.icon}
                  </span>
                ) : null}
                <h4 className="mb-3 font-headline-md text-headline-md">{card.title}</h4>
                {card.body ? (
                  <p className="text-sm leading-relaxed text-white/60">{card.body}</p>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <MissingOptional label="solution cards" />
        )}
      </div>
    </section>
  );
}

export function AiSecondaryCapabilityAdapter({ section }: { section: PreviewSectionPayload }) {
  const paragraphs = paragraphsOf(section.data);
  const items = recordItems(section.data);
  const cards = items.length
    ? items
    : section.cards.map((card) => ({
        title: card.title,
        body: card.body,
        icon: card.icon,
      }));

  return (
    <section className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="grid grid-cols-12 gap-gutter">
        <div className="col-span-12 lg:col-span-5">
          {headingOf(section.data) ? (
            <h2 className="mb-6 font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {paragraphs.length ? (
            paragraphs.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 40)}
                className={`font-body-md text-on-surface-variant ${index === 0 ? "mb-8" : ""}`}
              >
                {paragraph}
              </p>
            ))
          ) : (
            <MissingOptional label="paragraphs" />
          )}
        </div>
        <div className="col-span-12 lg:col-span-7">
          {cards.length ? (
            <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2">
              {cards.map((item) => (
                <div
                  key={firstString(item.title)}
                  className="flex gap-4 rounded-xl border border-outline-variant/10 bg-surface-container p-6"
                >
                  {asString(item.icon) ? (
                    <span
                      className="material-symbols-outlined shrink-0 text-3xl text-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {asString(item.icon)}
                    </span>
                  ) : null}
                  <div>
                    <h5 className="mb-2 font-bold">{firstString(item.title)}</h5>
                    {firstString(item.body, item.description) ? (
                      <p className="font-body-md text-sm text-on-surface-variant">
                        {firstString(item.body, item.description)}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <MissingOptional label="capability cards" />
          )}
        </div>
      </div>
    </section>
  );
}

function recordItems(data: Record<string, unknown>): Record<string, unknown>[] {
  if (Array.isArray(data.items) && data.items.some((item) => item && typeof item === "object")) {
    return data.items.map(asRecord);
  }
  return [];
}

export function CareersEmployeeSuccessAdapter({ section }: { section: PreviewSectionPayload }) {
  const records = recordItems(section.data);
  const featuredRecord = asRecord(section.data.featured);
  const hasFeatured = Boolean(firstString(featuredRecord.title, featuredRecord.body));
  const featured = hasFeatured ? featuredRecord : records.at(-1) ?? {};
  const items = hasFeatured ? records : records.slice(0, Math.max(0, records.length - 1));

  return (
    <section className="overflow-hidden bg-primary-container py-stack-lg text-on-primary-container">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="grid grid-cols-1 items-center gap-stack-lg lg:grid-cols-2">
          <div>
            {headingOf(section.data) ? (
              <h2 className="mb-stack-md font-headline-lg text-headline-lg">
                {headingOf(section.data)}
              </h2>
            ) : (
              <MissingOptional label="heading" />
            )}
            {items.length ? (
              <div className="space-y-stack-md">
                {items.map((item, index) => (
                  <div
                    key={firstString(item.title) ?? `item-${index}`}
                    className={
                      index < items.length - 1
                        ? "flex gap-stack-md border-b border-outline-variant/20 pb-stack-md"
                        : "flex gap-stack-md"
                    }
                  >
                    {asString(item.icon) ? (
                      <span className="material-symbols-outlined shrink-0 text-3xl">
                        {asString(item.icon)}
                      </span>
                    ) : null}
                    <div>
                      <h4 className="font-headline-md text-lg text-headline-md text-on-primary">
                        {firstString(item.title)}
                      </h4>
                      {firstString(item.body, item.description) ? (
                        <p className="font-body-md text-body-md opacity-70">
                          {firstString(item.body, item.description)}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <MissingOptional label="items" />
            )}
          </div>
          <div className="relative">
            {firstString(featured.title, featured.body) ? (
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border-white/5 glass-card">
                <div className="relative z-10 p-stack-lg text-center">
                  {asString(featured.icon) ? (
                    <span
                      className="material-symbols-outlined mb-stack-md text-7xl text-on-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {asString(featured.icon)}
                    </span>
                  ) : null}
                  <p className="mb-base font-headline-md text-headline-md text-white">
                    {firstString(featured.title)}
                  </p>
                  {firstString(featured.body, featured.description) ? (
                    <p className="font-body-md text-body-md opacity-60">
                      {firstString(featured.body, featured.description)}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : (
              <MissingOptional label="featured card" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CareersJobsAdapter({ section }: { section: PreviewSectionPayload }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const filters = Array.isArray(section.data.filters)
    ? section.data.filters.map(asRecord)
    : [];
  const jobs = Array.isArray(section.data.jobs)
    ? section.data.jobs.map(asRecord)
    : section.entities
        .filter((entity) => entity.entityType === "job")
        .map((entity) => ({
          title: entity.title,
          body: entity.fields.description ?? "",
          location: entity.fields.location ?? "",
          category: "",
          categoryLabel: entity.entityType,
          type: "",
        }));
  const visibleJobs = jobs.filter((job) => {
    if (activeFilter === "all") return true;
    return asString(job.category) === activeFilter;
  });

  return (
    <section className="mx-auto max-w-container-max px-margin-desktop py-stack-lg" id="positions">
      <div className="mb-stack-lg text-center">
        {headingOf(section.data) ? (
          <h2 className="mb-stack-sm font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
        ) : (
          <MissingOptional label="heading" />
        )}
        {firstString(section.data.introduction, section.data.body) ? (
          <p className="mx-auto max-w-xl font-body-md text-body-md text-on-surface-variant">
            {firstString(section.data.introduction, section.data.body)}
          </p>
        ) : (
          <MissingOptional label="introduction" />
        )}
      </div>
      {filters.length ? (
        <div className="mb-stack-lg flex flex-wrap justify-center gap-base">
          {filters.map((filter) => {
            const value = firstString(filter.value, filter.label) ?? "all";
            const active = activeFilter === value;
            return (
              <button
                key={value}
                type="button"
                className={
                  active
                    ? "job-filter-btn rounded-full border border-primary bg-primary px-6 py-2 font-label-sm text-label-sm uppercase tracking-wider text-on-primary transition-all"
                    : "job-filter-btn rounded-full border border-outline-variant bg-white px-6 py-2 font-label-sm text-label-sm uppercase tracking-wider text-on-surface transition-all hover:border-primary"
                }
                onClick={() => setActiveFilter(value)}
              >
                {firstString(filter.label, filter.value)}
              </button>
            );
          })}
        </div>
      ) : null}
      <div className="space-y-base">
        {visibleJobs.length ? (
          visibleJobs.map((job, index) => (
            <div
              key={firstString(job.title) ?? `job-${index}`}
              className="job-card group flex flex-col justify-between rounded-xl border border-outline-variant/30 bg-white p-stack-md transition-all hover:border-primary/50 technical-glow md:flex-row md:items-center"
            >
              <div className="mb-stack-sm md:mb-0">
                <div className="mb-2 flex items-center gap-2">
                  {firstString(job.categoryLabel, job.category) ? (
                    <span className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-primary">
                      {firstString(job.categoryLabel, job.category)}
                    </span>
                  ) : null}
                  {firstString(job.type) ? (
                    <>
                      <span className="h-1 w-1 rounded-full bg-outline-variant" />
                      <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                        {firstString(job.type)}
                      </span>
                    </>
                  ) : null}
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface transition-colors group-hover:text-primary">
                  {firstString(job.title)}
                </h3>
                {firstString(job.body, job.description) ? (
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {firstString(job.body, job.description)}
                  </p>
                ) : null}
              </div>
              <div className="flex items-center gap-stack-md">
                {asString(job.location) ? (
                  <div className="hidden text-right md:block">
                    <p className="font-label-sm text-label-sm font-bold uppercase">Location</p>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {asString(job.location)}
                    </p>
                  </div>
                ) : null}
                <button
                  type="button"
                  className="rounded bg-surface-container px-6 py-3 font-label-sm text-label-sm uppercase tracking-wider text-on-surface transition-all group-hover:bg-primary group-hover:text-on-primary"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center font-body-md text-on-surface-variant">
            {firstString(section.data.emptyState) ?? "No openings are stored in CMS data."}
          </p>
        )}
      </div>
    </section>
  );
}

export function ContentAdapter({ section }: { section: PreviewSectionPayload }) {
  const paragraphs = paragraphsOf(section.data);
  const items = Array.isArray(section.data.items)
    ? section.data.items.filter((item): item is string => typeof item === "string")
    : [];
  return (
    <section className="px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="mx-auto max-w-4xl space-y-4">
        {eyebrowOf(section.data) ? (
          <p className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
            {eyebrowOf(section.data)}
          </p>
        ) : null}
        {headingOf(section.data) ? (
          <h2 className="font-headline-lg text-headline-lg text-primary">{headingOf(section.data)}</h2>
        ) : (
          <MissingOptional label="heading" />
        )}
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="font-body-md text-on-surface-variant whitespace-pre-wrap">
            {paragraph}
          </p>
        ))}
        {items.length ? (
          <ul className="list-disc space-y-2 pl-5 font-body-md text-on-surface">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

export function MediaAdapter({ section }: { section: PreviewSectionPayload }) {
  return (
    <section className="px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="mx-auto grid max-w-container-max grid-cols-1 items-center gap-gutter lg:grid-cols-2">
        <div className="space-y-4">
          {headingOf(section.data) ? (
            <h2 className="font-headline-lg text-headline-lg text-primary">{headingOf(section.data)}</h2>
          ) : null}
          {bodyOf(section.data) ? (
            <p className="font-body-md text-on-surface-variant whitespace-pre-wrap">
              {bodyOf(section.data)}
            </p>
          ) : null}
          <ActionLinks
            actions={section.actions}
            primaryClass="inline-flex rounded-full bg-primary px-8 py-3 font-label-sm text-on-primary"
            secondaryClass="inline-flex rounded-full border px-8 py-3 font-label-sm"
          />
        </div>
        {section.media.url ? (
          <div
            className="min-h-[280px] rounded-xl bg-cover bg-center"
            role="img"
            aria-label={section.media.alt ?? ""}
            style={{ backgroundImage: `url('${section.media.url}')` }}
          />
        ) : (
          <MissingMedia message={section.media.missing ?? "media source not resolved"} />
        )}
      </div>
    </section>
  );
}

export function MetricsAdapter({ section }: { section: PreviewSectionPayload }) {
  const items = Array.isArray(section.data.items)
    ? section.data.items.map(asRecord)
    : Array.isArray(section.data.stats)
      ? section.data.stats.map(asRecord)
      : [];
  return (
    <section className="bg-primary-container px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="mx-auto max-w-container-max">
        {headingOf(section.data) ? (
          <h2 className="mb-10 font-headline-lg text-headline-lg text-white">
            {headingOf(section.data)}
          </h2>
        ) : null}
        <div className="grid grid-cols-1 gap-gutter sm:grid-cols-3">
          {items.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="font-display-lg text-headline-lg text-white">
                {firstString(item.value, item.title)}
              </div>
              <div className="font-label-sm uppercase tracking-wider text-on-primary-container">
                {firstString(item.label, item.body)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessAdapter({ section }: { section: PreviewSectionPayload }) {
  const steps = Array.isArray(section.data.steps)
    ? section.data.steps.map(asRecord)
    : Array.isArray(section.data.items)
      ? section.data.items.map((item) =>
          typeof item === "string" ? { title: item } : asRecord(item)
        )
      : [];
  return (
    <section className="overflow-hidden bg-surface-container-low py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="font-display-lg text-headline-lg text-primary">{headingOf(section.data)}</h2>
          {bodyOf(section.data) ? (
            <p className="mx-auto max-w-xl text-on-surface-variant">{bodyOf(section.data)}</p>
          ) : null}
        </div>
        <div className="relative">
          <div className="absolute left-0 top-1/2 hidden h-px w-full -translate-y-1/2 bg-outline-variant lg:block" />
          <div className="relative grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-8">
            {steps.map((step, index) => (
              <div key={index} className="group flex flex-col items-center text-center">
                <div className="z-10 mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-white">
                  <span className="text-sm font-bold">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h4 className="mb-2 font-label-sm text-label-sm font-bold uppercase text-primary">
                  {firstString(step.title, step.label)}
                </h4>
                <p className="px-2 text-xs text-on-surface-variant">
                  {firstString(step.body, step.description)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ArchAdapter({ section }: { section: PreviewSectionPayload }) {
  const nodes = Array.isArray(section.data.nodes)
    ? section.data.nodes.map(asRecord)
    : Array.isArray(section.data.items)
      ? section.data.items.map((item) =>
          typeof item === "string" ? { title: item } : asRecord(item)
        )
      : [];
  return (
    <section className="px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="mx-auto max-w-container-max space-y-6">
        <h2 className="font-headline-lg text-headline-lg text-primary">{headingOf(section.data)}</h2>
        {bodyOf(section.data) ? (
          <p className="font-body-md text-on-surface-variant">{bodyOf(section.data)}</p>
        ) : null}
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
          {nodes.map((node, index) => (
            <article key={index} className="rounded-xl border border-outline-variant/30 bg-white p-6">
              <h3 className="font-headline-md text-headline-md">
                {firstString(node.title, node.label, node.name)}
              </h3>
              {firstString(node.body, node.description) ? (
                <p className="mt-2 font-body-md text-on-surface-variant">
                  {firstString(node.body, node.description)}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TableAdapter({ section }: { section: PreviewSectionPayload }) {
  const columnConfigs = Array.isArray(section.data.columns)
    ? section.data.columns.map((item) => {
        if (typeof item === "string") return { key: item, label: item };
        const record = asRecord(item);
        const key = firstString(record.key, record.label, record.title) ?? "";
        const label = firstString(record.label, record.title, record.key) ?? key;
        return { key, label };
      })
    : [];
  const rows = Array.isArray(section.data.rows) ? section.data.rows : [];
  return (
    <section className="px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="mx-auto max-w-container-max">
        <h2 className="mb-6 font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
        {columnConfigs.length === 0 ? (
          <MissingOptional label="table columns" />
        ) : (
          <div className="overflow-x-auto rounded-xl border">
            <table className="min-w-full text-sm">
              <thead className="bg-surface-container-low">
                <tr>
                  {columnConfigs.map((column) => (
                    <th key={column.key} className="px-4 py-3 text-left">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => {
                  const record = asRecord(row);
                  const cells = Array.isArray(row)
                    ? row
                    : columnConfigs.map((column) => record[column.key] ?? record[column.label]);
                  return (
                    <tr key={index} className="border-t">
                      {cells.map((cell, cellIndex) => (
                        <td key={cellIndex} className="px-4 py-3">
                          {typeof cell === "string" ? cell : JSON.stringify(cell ?? "")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export function LogosAdapter({ section }: { section: PreviewSectionPayload }) {
  const items = Array.isArray(section.data.items)
    ? section.data.items.map((item) =>
        typeof item === "string" ? item : firstString(asRecord(item).label, asRecord(item).title) ?? ""
      )
    : section.cards.map((card) => card.title);
  return (
    <section className="bg-surface-container-low px-margin-mobile py-10 md:px-margin-desktop">
      <div className="mx-auto max-w-container-max">
        {headingOf(section.data) ? (
          <h2 className="mb-6 text-center font-headline-md text-headline-md">
            {headingOf(section.data)}
          </h2>
        ) : null}
        <div className="flex flex-wrap justify-center gap-6">
          {items.filter(Boolean).map((item) => (
            <span key={item} className="font-label-sm uppercase tracking-widest text-on-surface-variant">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqAdapter({ section }: { section: PreviewSectionPayload }) {
  const items = Array.isArray(section.data.items)
    ? section.data.items.map(asRecord)
    : Array.isArray(section.data.faqs)
      ? section.data.faqs.map(asRecord)
      : [];
  return (
    <section className="border-y border-outline-variant/10 bg-surface-container-low px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="mx-auto max-w-3xl space-y-stack-md">
        {headingOf(section.data) ? (
          <h2 className="font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
        ) : null}
        {items.length === 0 ? <MissingOptional label="FAQ items" /> : null}
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-stack-md"
          >
            <h3 className="mb-2 font-headline-md text-headline-md">
              {firstString(item.question, item.title)}
            </h3>
            <p className="font-body-md text-on-surface-variant">
              {firstString(item.answer, item.body)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CaseStudyListingAdapter({ section }: { section: PreviewSectionPayload }) {
  const fieldLabels: Record<string, string> = {
    requirement: "Customer requirement",
    responsibility: "MMIS responsibility",
    technology: "Technology",
    challenge: "Engineering challenge",
    solution: "Solution",
    result: "Result / status",
  };
  const footnote = firstString(section.data.footnote);

  return (
    <section className="space-y-stack-lg px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="max-w-3xl">
        {headingOf(section.data) ? (
          <p className="mb-3 font-label-sm text-label-sm uppercase tracking-widest text-secondary">
            {headingOf(section.data)}
          </p>
        ) : (
          <MissingOptional label="heading" />
        )}
        {bodyOf(section.data) ? (
          <p className="font-body-lg text-on-surface-variant">{bodyOf(section.data)}</p>
        ) : (
          <MissingOptional label="introduction" />
        )}
      </div>
      {section.entities.length === 0 ? (
        <p className="text-sm text-on-surface-variant">
          {firstString(section.data.emptyState) ?? "No case-study references are stored for this listing."}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-2">
          {section.entities.map((entity) => (
            <article
              key={entity.slug}
              className="space-y-4 rounded-xl border border-outline-variant/20 bg-white p-6 md:p-8"
            >
              <h2 className="font-headline-md text-headline-md text-primary">{entity.title}</h2>
              {!entity.resolved ? (
                <p className="text-sm text-error">Unresolved case study: {entity.slug}</p>
              ) : (
                <div className="space-y-3 text-sm md:text-base">
                  {Object.entries(entity.fields).map(([label, value]) =>
                    value ? (
                      <div key={label}>
                        <h3 className="mb-1 font-label-sm text-label-sm uppercase tracking-wide text-on-surface-variant">
                          {fieldLabels[label] ?? label}
                        </h3>
                        <p className="text-on-surface-variant">{value}</p>
                      </div>
                    ) : null
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
      {footnote ? (
        <p className="border-l-2 border-primary/30 pl-4 text-sm italic text-on-surface-variant">
          {footnote}
        </p>
      ) : (
        <MissingOptional label="footnote" />
      )}
    </section>
  );
}

export function ListingAdapter({ section }: { section: PreviewSectionPayload }) {
  if (section.entities.some((entity) => entity.entityType === "case_study")) {
    return <CaseStudyListingAdapter section={section} />;
  }
  return (
    <section className="px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="mx-auto max-w-container-max space-y-4">
        <h2 className="font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
        {bodyOf(section.data) ? (
          <p className="font-body-md text-on-surface-variant">{bodyOf(section.data)}</p>
        ) : null}
        {section.entities.length === 0 ? (
          <p className="text-sm text-on-surface-variant">
            {firstString(section.data.emptyState) ??
              "No first-class entity records are referenced. None were invented."}
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {section.entities.map((entity) => (
              <li key={entity.slug} className="rounded-xl border bg-white p-6">
                <p className="text-xs uppercase text-on-surface-variant">{entity.entityType}</p>
                <h3 className="font-headline-md">{entity.title}</h3>
                {entity.resolved ? null : (
                  <p className="text-sm text-error">Unresolved reference: {entity.slug}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export function ArticleAdapter({ section }: { section: PreviewSectionPayload }) {
  const articleSections = Array.isArray(section.data.sections)
    ? section.data.sections.map(asRecord)
    : [];
  return (
    <section className="px-margin-mobile py-stack-lg md:px-margin-desktop">
      <article className="mx-auto max-w-3xl space-y-6">
        <h1 className="font-headline-lg text-headline-lg text-primary">{headingOf(section.data)}</h1>
        {bodyOf(section.data) ? (
          <p className="font-body-lg text-on-surface-variant whitespace-pre-wrap">{bodyOf(section.data)}</p>
        ) : null}
        {articleSections.map((item, index) => (
          <section key={index} className="space-y-2">
            <h2 className="font-headline-md text-headline-md">
              {firstString(item.heading, item.title)}
            </h2>
            <p className="font-body-md text-on-surface-variant whitespace-pre-wrap">
              {firstString(item.body, item.content)}
            </p>
          </section>
        ))}
      </article>
    </section>
  );
}

export function FormAdapter({ section }: { section: PreviewSectionPayload }) {
  return (
    <section className="px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="mx-auto max-w-xl space-y-4 rounded-xl border bg-white p-8">
        <h2 className="font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
        {bodyOf(section.data) ? (
          <p className="font-body-md text-on-surface-variant">{bodyOf(section.data)}</p>
        ) : null}
        {asString(section.data.successCopy) ? (
          <p className="text-sm text-on-surface-variant">{asString(section.data.successCopy)}</p>
        ) : null}
        {asString(section.data.privacyCopy) ? (
          <p className="text-xs text-on-surface-variant">{asString(section.data.privacyCopy)}</p>
        ) : null}
        <p className="rounded-lg border border-dashed p-4 text-sm text-on-surface-variant">
          Form fields remain developer-controlled. They are not editable CMS content and were not
          invented for preview.
        </p>
      </div>
    </section>
  );
}

export function ContactAdapter({ section }: { section: PreviewSectionPayload }) {
  const addresses = Array.isArray(section.data.addresses)
    ? section.data.addresses.map((item) =>
        typeof item === "string" ? item : firstString(asRecord(item).label, asRecord(item).value)
      )
    : [];
  const methods = Array.isArray(section.data.communicationMethods)
    ? section.data.communicationMethods.map((item) =>
        typeof item === "string" ? item : firstString(asRecord(item).label, asRecord(item).value)
      )
    : [];
  return (
    <section className="px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="mx-auto max-w-container-max space-y-4">
        <h2 className="font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
        {addresses.filter(Boolean).map((item) => (
          <p key={item} className="font-body-md text-on-surface-variant">
            {item}
          </p>
        ))}
        {methods.filter(Boolean).map((item) => (
          <p key={item} className="font-body-md">
            {item}
          </p>
        ))}
        {addresses.length === 0 && methods.length === 0 ? (
          <MissingOptional label="contact details" />
        ) : null}
      </div>
    </section>
  );
}

export function NavAdapter({ section }: { section: PreviewSectionPayload }) {
  const links = Array.isArray(section.data.staticLinks)
    ? section.data.staticLinks.map(asRecord)
    : Array.isArray(section.data.items)
      ? section.data.items.map((item) =>
          typeof item === "string" ? { label: item } : asRecord(item)
        )
      : [];
  return (
    <nav className="border-b px-margin-mobile py-6 md:px-margin-desktop">
      <div className="mx-auto flex max-w-container-max flex-wrap gap-4">
        {links.map((link, index) =>
          firstString(link.href) ? (
            <Link key={index} href={firstString(link.href)!} className="font-label-sm text-primary">
              {firstString(link.label, link.title)}
            </Link>
          ) : (
            <span key={index} className="font-label-sm">
              {firstString(link.label, link.title)}
            </span>
          )
        )}
      </div>
    </nav>
  );
}

export function EvInfrastructureChallengesAdapter({ section }: { section: PreviewSectionPayload }) {
  const heading = headingOf(section.data);
  const introduction = firstString(section.data.introduction, section.data.body);

  return (
    <section className="bg-surface py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="mb-16 grid grid-cols-1 items-end gap-stack-lg md:grid-cols-2">
          <div>
            {heading ? (
              <h2 className="mb-4 font-headline-lg text-headline-lg">
                {heading.startsWith("Critical Infrastructure") ? (
                  <>
                    Critical Infrastructure <br />
                    {heading.replace(/^Critical Infrastructure\s*/, "") || "Challenges"}
                  </>
                ) : (
                  heading
                )}
              </h2>
            ) : (
              <MissingOptional label="heading" />
            )}
            <div className="h-1 w-24 bg-primary" />
          </div>
          {introduction ? (
            <p className="max-w-lg font-body-md text-body-md text-on-surface-variant">{introduction}</p>
          ) : (
            <MissingOptional label="introduction" />
          )}
        </div>
        {section.cards.length === 0 ? <MissingOptional label="cards" /> : null}
        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
          {section.cards.map((card) => (
            <div
              key={card.title}
              className="technical-glow rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-8"
            >
              {card.icon ? (
                <span className="material-symbols-outlined mb-6 text-4xl text-primary">{card.icon}</span>
              ) : null}
              <h3 className="mb-4 font-headline-md text-headline-md">{card.title}</h3>
              {card.body ? (
                <p className="font-body-md text-body-md text-on-surface-variant">{card.body}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EvInfrastructureSolutionsAdapter({ section }: { section: PreviewSectionPayload }) {
  const [featured, sic, v2g, billing] = section.cards;

  return (
    <section className="bg-primary-container py-stack-lg text-on-primary">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="mb-16">
          {headingOf(section.data) ? (
            <h2 className="mb-4 font-headline-lg text-headline-lg text-white">
              {headingOf(section.data)}
            </h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {firstString(section.data.introduction, section.data.body) ? (
            <p className="max-w-2xl font-body-md text-body-md text-on-primary-container">
              {firstString(section.data.introduction, section.data.body)}
            </p>
          ) : (
            <MissingOptional label="introduction" />
          )}
        </div>
        {section.cards.length === 0 ? <MissingOptional label="cards" /> : null}
        <div className="bento-grid">
          {featured ? (
            <div className="group relative col-span-12 flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-surface/5 p-10 md:col-span-8">
              <div className="relative z-10">
                <h3 className="mb-4 font-headline-md text-headline-md text-white">{featured.title}</h3>
                {featured.body ? (
                  <p className="mb-8 max-w-md font-body-md text-body-md text-on-primary-container">
                    {featured.body}
                  </p>
                ) : null}
                {featured.badges?.length ? (
                  <ul className="flex flex-wrap gap-3">
                    {featured.badges.map((badge) => (
                      <li
                        key={badge}
                        className="rounded-full bg-white/10 px-4 py-2 font-label-sm text-label-sm"
                      >
                        {badge}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 opacity-20 transition-transform duration-700 group-hover:scale-110">
                <span
                  className="material-symbols-outlined text-[300px] text-white"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  electric_bolt
                </span>
              </div>
            </div>
          ) : null}
          {sic ? (
            <div className="col-span-12 flex flex-col items-center justify-center rounded-2xl bg-white p-10 text-center md:col-span-4">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-container">
                <span className="material-symbols-outlined text-3xl text-white">
                  {sic.icon ?? "memory"}
                </span>
              </div>
              <h4 className="mb-2 font-headline-md text-headline-md text-primary">{sic.title}</h4>
              {sic.body ? (
                <p className="font-body-md text-body-md text-on-surface-variant">{sic.body}</p>
              ) : null}
            </div>
          ) : null}
          {v2g ? (
            <div className="col-span-12 rounded-2xl border border-white/10 bg-surface/5 p-10 md:col-span-4">
              <h4 className="mb-4 font-headline-md text-headline-md text-white">{v2g.title}</h4>
              {v2g.body ? (
                <p className="font-body-md text-body-md text-on-primary-container">{v2g.body}</p>
              ) : null}
              <div className="mt-8 flex items-center justify-between">
                {v2g.label ? (
                  <span className="font-label-sm text-label-sm text-white">{v2g.label}</span>
                ) : (
                  <span />
                )}
                <span className="material-symbols-outlined text-white">{v2g.icon ?? "sync_alt"}</span>
              </div>
            </div>
          ) : null}
          {billing ? (
            <div className="relative col-span-12 overflow-hidden rounded-2xl border border-white/10 bg-surface/5 p-10 md:col-span-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 font-headline-md text-headline-md text-white">{billing.title}</h3>
                  {billing.body ? (
                    <p className="font-body-md text-body-md text-on-primary-container">{billing.body}</p>
                  ) : null}
                  {billing.href && billing.label ? (
                    <Link
                      href={billing.href}
                      className="mt-8 flex items-center gap-2 border-b border-white/50 pb-1 font-label-sm text-label-sm text-white transition-all hover:border-white"
                    >
                      {billing.label}
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </Link>
                  ) : null}
                </div>
                <div className="hidden items-center justify-center md:flex">
                  {billing.imageUrl ? (
                    <div
                      className="h-48 w-full rounded-xl border border-white/10 bg-cover bg-center"
                      role="img"
                      aria-label={billing.imageAlt ?? ""}
                      style={{ backgroundImage: `url('${billing.imageUrl}')` }}
                    />
                  ) : (
                    <MissingMedia message="billing dashboard image not resolved" />
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function EvInfrastructureCaseStudyAdapter({ section }: { section: PreviewSectionPayload }) {
  const callouts = Array.isArray(section.data.callouts)
    ? section.data.callouts.map(asRecord)
    : [];
  const metrics = callouts.filter((item) => firstString(item.value));
  const quote = callouts.find((item) => firstString(item.quote));

  return (
    <section className="py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="flex flex-col overflow-hidden rounded-3xl border border-outline-variant/10 bg-surface-container-low lg:flex-row">
          <div className="relative h-64 min-h-[400px] lg:h-auto lg:w-1/2">
            {section.media.url ? (
              <div
                className="absolute inset-0 bg-cover bg-center"
                role="img"
                aria-label={section.media.alt ?? ""}
                style={{ backgroundImage: `url('${section.media.url}')` }}
              />
            ) : (
              <div className="absolute inset-0 p-6">
                <MissingMedia message={section.media.missing ?? "case study image not resolved"} />
              </div>
            )}
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-10">
              <div className="text-white">
                {eyebrowOf(section.data) ? (
                  <span className="font-label-sm text-label-sm uppercase tracking-widest opacity-80">
                    {eyebrowOf(section.data)}
                  </span>
                ) : null}
                {headingOf(section.data) ? (
                  <h3 className="mt-2 font-headline-lg text-headline-lg">{headingOf(section.data)}</h3>
                ) : (
                  <MissingOptional label="heading" />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center p-12 lg:w-1/2 lg:p-16">
            <div className="mb-10">
              <h4 className="mb-4 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                The Objective
              </h4>
              {bodyOf(section.data) ? (
                <p className="font-body-lg text-body-lg">{bodyOf(section.data)}</p>
              ) : (
                <MissingOptional label="body" />
              )}
            </div>
            {metrics.length ? (
              <div className="mb-10 grid grid-cols-2 gap-8">
                {metrics.map((metric) => (
                  <div key={`${metric.value}-${metric.label}`}>
                    <div className="font-headline-md text-headline-md text-primary">
                      {firstString(metric.value)}
                    </div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant">
                      {firstString(metric.label)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <MissingOptional label="metrics" />
            )}
            {quote && firstString(quote.quote) ? (
              <div className="border-l-4 border-primary bg-surface-container p-6">
                <p className="font-body-md text-body-md italic text-on-surface-variant">
                  “{firstString(quote.quote)}”
                </p>
                {firstString(quote.author) ? (
                  <div className="mt-4 font-label-sm text-label-sm font-bold">
                    — {firstString(quote.author)}
                  </div>
                ) : null}
              </div>
            ) : (
              <MissingOptional label="quote" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function EvInfrastructureSustainabilityAdapter({ section }: { section: PreviewSectionPayload }) {
  const heading = headingOf(section.data);
  const highlights = Array.isArray(section.data.highlights)
    ? section.data.highlights.map(asRecord)
    : [];
  const defaultIcons = ["bolt", "system_update"];
  const action = section.actions[0];

  return (
    <section className="relative overflow-hidden bg-surface py-stack-lg">
      <div className="relative z-10 mx-auto max-w-container-max px-margin-desktop">
        <div className="mx-auto max-w-4xl text-center">
          {heading ? (
            <h2 className="mb-8 font-headline-lg text-headline-lg">
              {heading.startsWith("Engineering Excellence for") ? (
                <>
                  Engineering Excellence for <br />
                  {heading.replace(/^Engineering Excellence for\s*/, "") || "Sustainable Frontiers"}
                </>
              ) : (
                heading
              )}
            </h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {bodyOf(section.data) ? (
            <p className="mb-12 font-body-lg text-body-lg text-on-surface-variant">
              {bodyOf(section.data)}
            </p>
          ) : (
            <MissingOptional label="body" />
          )}
          {highlights.length ? (
            <div className="mb-16 grid grid-cols-1 gap-gutter text-left md:grid-cols-2">
              {highlights.map((item, index) => (
                <div key={firstString(item.title) ?? index} className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary-container p-3 text-white">
                    <span className="material-symbols-outlined">
                      {firstString(item.icon) ?? defaultIcons[index] ?? "bolt"}
                    </span>
                  </div>
                  <div>
                    <h5 className="mb-2 font-headline-md text-headline-md">{firstString(item.title)}</h5>
                    {firstString(item.body) ? (
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        {firstString(item.body)}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <MissingOptional label="highlights" />
          )}
          <div className="inline-flex flex-col items-center">
            {action ? (
              <Link
                href={action.href}
                className="rounded-xl bg-primary px-12 py-6 font-label-sm text-label-sm text-xl text-on-primary shadow-xl transition-transform duration-300 hover:scale-105"
              >
                {action.label}
              </Link>
            ) : (
              <MissingOptional label="action" />
            )}
            {asString(section.data.footnote) ? (
              <p className="mt-6 font-label-sm text-label-sm text-on-surface-variant">
                {asString(section.data.footnote)}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function cardByTitle(cards: PreviewSectionPayload["cards"], needle: string) {
  return cards.find((card) => card.title.toLowerCase().includes(needle.toLowerCase()));
}

function parseBadgePair(badge: string) {
  const index = badge.indexOf(":");
  if (index === -1) return { label: badge, value: "" };
  return { label: badge.slice(0, index).trim(), value: badge.slice(index + 1).trim() };
}

function parseSensitivity(label?: string) {
  const cleaned = (label ?? "").replace(/Â±/g, "±").replace(/Âµ/g, "µ").trim();
  const match = cleaned.match(/^(.+?)\s+([±+\d].*)$/);
  if (match) return { name: match[1].trim(), value: match[2].trim() };
  return { name: cleaned || "SENSITIVITY", value: "" };
}

function quotedBody(body?: string) {
  if (!body) return "";
  const trimmed = body.trim();
  if (trimmed.startsWith('"') || trimmed.startsWith("“")) return trimmed;
  return `"${trimmed}"`;
}

function labeledActions(section: PreviewSectionPayload) {
  const fromData = Array.isArray(section.data.actions)
    ? section.data.actions
        .map((item) => {
          const record = asRecord(item);
          const label = firstString(record.label, record.text);
          if (!label) return null;
          return { label, href: firstString(record.href, record.url) };
        })
        .filter((item): item is { label: string; href?: string } => Boolean(item))
    : [];
  if (fromData.length) return fromData;
  return section.actions.map((action) => ({ label: action.label, href: action.href }));
}

function decodeMojibake(value?: string) {
  return (value ?? "")
    .replace(/Â®/g, "®")
    .replace(/Â°/g, "°")
    .replace(/Â²/g, "²")
    .replace(/Â±/g, "±")
    .replace(/Âµ/g, "µ")
    .replace(/â€”/g, "—")
    .replace(/â€"/g, "—");
}

function labeledEntries(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === "string") {
        const title = decodeMojibake(item);
        return title ? { title } : null;
      }
      const record = asRecord(item);
      const title = decodeMojibake(firstString(record.title, record.label, record.value));
      if (!title) return null;
      return {
        title,
        icon: firstString(record.icon),
        body: decodeMojibake(firstString(record.body)) || undefined,
      };
    })
    .filter((item): item is { title: string; icon?: string; body?: string } => Boolean(item));
}

export function OilGasChallengesAdapter({ section }: { section: PreviewSectionPayload }) {
  const heading = headingOf(section.data);
  const introduction = firstString(section.data.introduction, section.data.body);
  const explosive = cardByTitle(section.cards, "Explosive") ?? section.cards[0];
  const asset = cardByTitle(section.cards, "Asset") ?? section.cards[1];
  const remote = cardByTitle(section.cards, "Remote") ?? section.cards[2];
  const sensitivity = parseSensitivity(asset?.label);

  return (
    <section className="bg-surface py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="mb-16">
          {heading ? (
            <h2 className="mb-4 font-headline-lg text-headline-lg text-primary">{heading}</h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {introduction ? (
            <p className="max-w-xl font-body-md text-body-md text-on-surface-variant">
              {introduction}
            </p>
          ) : (
            <MissingOptional label="introduction" />
          )}
        </div>
        {section.cards.length === 0 ? <MissingOptional label="cards" /> : null}
        <div className="grid grid-cols-12 gap-gutter">
          {explosive ? (
            <div className="col-span-12 flex flex-col justify-between border border-outline-variant bg-white p-10 md:col-span-7">
              <div>
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center bg-primary-container">
                    <span
                      className="material-symbols-outlined text-white"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      warning
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md">{explosive.title}</h3>
                </div>
                {explosive.body ? (
                  <p className="mb-6 font-body-lg text-body-lg text-on-surface-variant">
                    {explosive.body}
                  </p>
                ) : null}
              </div>
              {explosive.badges?.length ? (
                <div className="grid grid-cols-2 gap-4 border-t border-outline-variant pt-8">
                  {explosive.badges.map((badge) => {
                    const pair = parseBadgePair(badge);
                    return (
                      <div key={badge}>
                        <span className="block font-label-sm text-label-sm font-bold text-primary">
                          {pair.label}
                        </span>
                        {pair.value ? (
                          <span className="font-body-md text-body-md text-on-surface-variant">
                            {pair.value}
                          </span>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ) : null}
          {asset ? (
            <div className="col-span-12 flex flex-col justify-between bg-primary-container p-10 md:col-span-5">
              <div className="mb-8">
                <span
                  className="material-symbols-outlined mb-6 text-4xl text-white"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  biotech
                </span>
                <h3 className="mb-4 font-headline-md text-headline-md text-white">{asset.title}</h3>
                {asset.body ? (
                  <p className="font-body-md text-body-md text-white/70">{asset.body}</p>
                ) : null}
              </div>
              <div className="border border-white/10 bg-white/5 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-white">{sensitivity.name}</span>
                  {sensitivity.value ? (
                    <span className="font-label-sm text-label-sm text-white">{sensitivity.value}</span>
                  ) : null}
                </div>
                <div className="h-1 bg-white/10">
                  <div className="h-full w-2/3 bg-white" />
                </div>
              </div>
            </div>
          ) : null}
          {remote ? (
            <div className="col-span-12 grid grid-cols-1 border border-outline-variant bg-white md:grid-cols-2">
              <div className="border-b border-outline-variant p-10 md:border-b-0 md:border-r">
                <h3 className="mb-4 font-headline-md text-headline-md">{remote.title}</h3>
                {remote.body ? (
                  <p className="mb-6 font-body-md text-body-md text-on-surface-variant">{remote.body}</p>
                ) : null}
                {remote.items?.length ? (
                  <ul className="space-y-3">
                    {remote.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 font-body-md text-body-md text-on-surface-variant"
                      >
                        <span
                          className="material-symbols-outlined text-sm text-primary"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <div className="relative min-h-[350px]">
                {remote.imageUrl ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    role="img"
                    aria-label={remote.imageAlt ?? ""}
                    style={{ backgroundImage: `url('${remote.imageUrl}')` }}
                  />
                ) : (
                  <div className="absolute inset-0 p-6">
                    <MissingMedia message="remote connectivity image not resolved" />
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function OilGasSolutionsAdapter({ section }: { section: PreviewSectionPayload }) {
  const featured =
    section.cards.find((card) => Boolean(card.metrics?.length || card.eyebrow)) ??
    section.cards[section.cards.length - 1];
  const list = section.cards.filter((card) => card !== featured);

  return (
    <section className="bg-surface-container-low py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="grid grid-cols-12 items-center gap-gutter">
          <div className="col-span-12 lg:col-span-5">
            {headingOf(section.data) ? (
              <h2 className="mb-8 font-headline-lg text-headline-lg text-primary">
                {headingOf(section.data)}
              </h2>
            ) : (
              <MissingOptional label="heading" />
            )}
            {list.length ? (
              <div className="space-y-12">
                {list.map((card) => (
                  <div key={card.title}>
                    <h4 className="mb-2 font-headline-md text-headline-md">{card.title}</h4>
                    {card.body ? (
                      <p className="font-body-md text-body-md text-on-surface-variant">{card.body}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <MissingOptional label="cards" />
            )}
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            {featured ? (
              <div className="relative">
                <div className="technical-glow aspect-square border border-outline-variant bg-white p-12">
                  <div className="flex h-full flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div>
                        {featured.eyebrow ? (
                          <span className="mb-2 block font-label-sm text-label-sm uppercase tracking-tighter text-on-primary-container">
                            {featured.eyebrow}
                          </span>
                        ) : null}
                        <h3 className="font-headline-lg text-headline-lg">{featured.title}</h3>
                      </div>
                      <span
                        className="material-symbols-outlined text-4xl text-primary"
                        style={{ fontVariationSettings: "'FILL' 0" }}
                      >
                        battery_charging_full
                      </span>
                    </div>
                    <div className="space-y-6">
                      {featured.body ? (
                        <p className="font-body-lg text-body-lg italic text-on-surface-variant">
                          {quotedBody(featured.body)}
                        </p>
                      ) : null}
                      {featured.metrics?.length ? (
                        <div className="grid grid-cols-3 gap-4 border-t border-outline-variant pt-6">
                          {featured.metrics.map((metric) => (
                            <div key={`${metric.label}-${metric.value}`}>
                              <span className="block font-label-sm text-label-sm text-primary opacity-50">
                                {metric.label}
                              </span>
                              <span className="font-headline-md text-headline-md">
                                {metric.value.replace(/Âµ/g, "µ")}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 hidden h-32 w-32 bg-primary-container md:block" />
              </div>
            ) : (
              <MissingOptional label="featured card" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function OilGasStackMarqueeAdapter({ section }: { section: PreviewSectionPayload }) {
  const items = Array.isArray(section.data.items)
    ? section.data.items
        .map((item) =>
          typeof item === "string"
            ? item
            : firstString(asRecord(item).label, asRecord(item).title) ?? ""
        )
        .filter(Boolean)
    : section.cards.map((card) => card.title).filter(Boolean);

  return (
    <section className="overflow-hidden border-y border-outline-variant/10 py-stack-lg">
      <div className="mx-auto mb-10 max-w-container-max px-margin-desktop">
        {headingOf(section.data) ? (
          <span className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-on-primary-container">
            {headingOf(section.data)}
          </span>
        ) : (
          <MissingOptional label="heading" />
        )}
      </div>
      {items.length ? (
        <div className="flex animate-marquee-slower items-center gap-12 whitespace-nowrap px-10">
          {items.map((item, index) => (
            <span key={item} className="flex items-center gap-12">
              <span
                className={`font-display-lg text-4xl uppercase tracking-tighter md:text-6xl ${
                  index % 2 === 0 ? "text-outline-variant" : "text-primary"
                }`}
              >
                {item}
              </span>
              {index < items.length - 1 ? (
                <span
                  className={`h-4 w-4 rounded-full ${
                    index % 2 === 0 ? "bg-primary" : "bg-outline-variant"
                  }`}
                />
              ) : null}
            </span>
          ))}
        </div>
      ) : (
        <MissingOptional label="stack items" />
      )}
    </section>
  );
}

export function OilGasQuantumReadyAdapter({ section }: { section: PreviewSectionPayload }) {
  const bullets = Array.isArray(section.data.bullets)
    ? section.data.bullets.map(asRecord)
    : [];
  const callouts = Array.isArray(section.data.callouts)
    ? section.data.callouts.map(asRecord)
    : [];
  const calloutLabel = firstString(...callouts.map((item) => firstString(item.label, item.title)));
  const action = section.actions[0];

  return (
    <section className="bg-primary-container py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          <div>
            {eyebrowOf(section.data) ? (
              <span className="mb-4 block font-label-sm text-label-sm uppercase tracking-widest text-on-primary-container">
                {eyebrowOf(section.data)}
              </span>
            ) : null}
            {headingOf(section.data) ? (
              <h2 className="mb-6 font-headline-lg text-headline-lg text-white">
                {headingOf(section.data)}
              </h2>
            ) : (
              <MissingOptional label="heading" />
            )}
            {bodyOf(section.data) ? (
              <p className="mb-8 font-body-lg text-body-lg leading-relaxed text-white/70">
                {bodyOf(section.data)}
              </p>
            ) : (
              <MissingOptional label="body" />
            )}
            {bullets.length ? (
              <div className="flex items-center gap-10">
                {bullets.map((item) => (
                  <div key={`${firstString(item.label)}-${firstString(item.value)}`}>
                    <span className="block font-headline-lg text-4xl text-white">
                      {firstString(item.value)}
                    </span>
                    <span className="font-label-sm text-label-sm text-white/50">
                      {firstString(item.label)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <MissingOptional label="metrics" />
            )}
            {action ? (
              <Link
                href={action.href}
                className="group mt-12 inline-flex items-center gap-4 font-label-sm text-label-sm text-white"
              >
                {action.label}
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">
                  arrow_forward
                </span>
              </Link>
            ) : (
              <MissingOptional label="link" />
            )}
          </div>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-white/5">
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="flex h-3/4 w-3/4 flex-col items-center justify-center bg-black/40 p-8 backdrop-blur-md border border-white/20">
                  <span
                    className="material-symbols-outlined mb-6 text-6xl text-white"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    hub
                  </span>
                  {calloutLabel ? (
                    <span className="text-center font-label-sm text-label-sm text-white">
                      {calloutLabel}
                    </span>
                  ) : (
                    <MissingOptional label="callout" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function OilGasHardeningAdapter({ section }: { section: PreviewSectionPayload }) {
  return (
    <section className="relative overflow-hidden bg-white py-stack-lg">
      <div className="relative z-10 mx-auto max-w-container-max px-margin-desktop text-center">
        {headingOf(section.data) ? (
          <h2 className="mb-8 font-display-lg text-headline-lg tracking-tighter text-primary md:text-display-lg">
            {headingOf(section.data)}
          </h2>
        ) : (
          <MissingOptional label="heading" />
        )}
        {bodyOf(section.data) ? (
          <p className="mx-auto mb-12 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
            {bodyOf(section.data)}
          </p>
        ) : (
          <MissingOptional label="body" />
        )}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <ActionLinks
            actions={section.actions}
            primaryClass="bg-primary px-12 py-5 font-label-sm text-label-sm font-bold text-on-primary shadow-lg transition-transform active:scale-95"
            secondaryClass="bg-surface-container px-12 py-5 font-label-sm text-label-sm font-bold text-primary transition-transform active:scale-95"
          />
        </div>
      </div>
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary-container/5 blur-[100px]" />
    </section>
  );
}

export function SmartInfrastructureChallengesAdapter({
  section,
}: {
  section: PreviewSectionPayload;
}) {
  const structural = cardByTitle(section.cards, "Structural") ?? section.cards[0];
  const safety = cardByTitle(section.cards, "Public Safety") ?? section.cards[1];
  const traffic = cardByTitle(section.cards, "Traffic") ?? section.cards[2];

  return (
    <section className="grid-line bg-surface py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="mb-stack-lg">
          {headingOf(section.data) ? (
            <h2 className="mb-base font-headline-lg text-headline-lg text-primary">
              {headingOf(section.data)}
            </h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          <div className="h-1 w-24 bg-primary" />
        </div>
        {section.cards.length === 0 ? <MissingOptional label="cards" /> : null}
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-12">
          {structural ? (
            <div className="rounded-xl border border-outline-variant/20 bg-white p-stack-lg md:col-span-8">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <span className="material-symbols-outlined mb-stack-md text-4xl text-accent-blue">
                    architecture
                  </span>
                  <h3 className="mb-stack-sm font-headline-md text-headline-md text-primary">
                    {structural.title}
                  </h3>
                  {structural.body ? (
                    <p className="max-w-xl text-on-surface-variant">{structural.body}</p>
                  ) : null}
                </div>
                {structural.badges?.length ? (
                  <div className="mt-stack-lg flex gap-stack-md">
                    {structural.badges.map((badge) => (
                      <div
                        key={badge}
                        className="rounded bg-surface-container px-3 py-1 font-label-sm text-label-sm text-secondary"
                      >
                        {badge}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
          {safety ? (
            <div className="flex flex-col justify-between rounded-xl bg-primary-container p-stack-lg text-on-primary md:col-span-4">
              <div>
                <span className="material-symbols-outlined mb-stack-md text-4xl text-innovation-cyan">
                  security
                </span>
                <h3 className="mb-stack-sm font-headline-md text-headline-md">{safety.title}</h3>
                {safety.body ? (
                  <p className="text-body-md text-on-primary-container/80">{safety.body}</p>
                ) : null}
              </div>
              {safety.label ? (
                <div className="mt-stack-lg border-t border-on-primary-container/20 pt-stack-sm">
                  <p className="font-label-sm text-label-sm">{safety.label}</p>
                </div>
              ) : null}
            </div>
          ) : null}
          {traffic ? (
            <div className="flex flex-col items-center gap-stack-lg rounded-xl border border-outline-variant/20 bg-white p-stack-lg md:col-span-12 md:flex-row">
              <div className="flex-1">
                <span className="material-symbols-outlined mb-stack-md text-4xl text-accent-blue">
                  traffic
                </span>
                <h3 className="mb-stack-sm font-headline-md text-headline-md text-primary">
                  {traffic.title}
                </h3>
                {traffic.body ? (
                  <p className="text-body-md text-on-surface-variant">{traffic.body}</p>
                ) : null}
              </div>
              <div className="relative h-48 w-full flex-1 overflow-hidden rounded-lg bg-surface-container-low" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function SmartInfrastructureSolutionsAdapter({
  section,
}: {
  section: PreviewSectionPayload;
}) {
  return (
    <section className="bg-surface-container-lowest py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="mb-stack-lg text-center">
          {eyebrowOf(section.data) ? (
            <p className="mb-base font-label-sm text-label-sm uppercase tracking-widest text-accent-blue">
              {eyebrowOf(section.data)}
            </p>
          ) : null}
          {headingOf(section.data) ? (
            <h2 className="font-headline-lg text-headline-lg text-primary">
              {headingOf(section.data)}
            </h2>
          ) : (
            <MissingOptional label="heading" />
          )}
        </div>
        {section.cards.length === 0 ? <MissingOptional label="cards" /> : null}
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {section.cards.map((card) => (
            <div
              key={card.title}
              className="group rounded border border-outline-variant/10 p-stack-md transition-all duration-500 hover:bg-white"
            >
              <div className="mb-stack-md overflow-hidden rounded">
                {card.imageUrl ? (
                  <div
                    className="h-56 w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    role="img"
                    aria-label={card.imageAlt ?? ""}
                    style={{ backgroundImage: `url('${card.imageUrl}')` }}
                  />
                ) : (
                  <div className="h-56 w-full bg-surface-container-highest p-4">
                    <MissingMedia message={`${card.title} image not resolved`} />
                  </div>
                )}
              </div>
              <h4 className="mb-2 font-headline-md text-headline-md text-primary">{card.title}</h4>
              {card.body ? (
                <p className="mb-stack-md text-body-md text-on-surface-variant">{card.body}</p>
              ) : null}
              {card.badges?.length ? (
                <ul className="space-y-2">
                  {card.badges.map((badge) => (
                    <li key={badge} className="flex items-center gap-2 font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-sm text-accent-blue">
                        check_circle
                      </span>
                      {badge}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SmartInfrastructureExpertiseAdapter({
  section,
}: {
  section: PreviewSectionPayload;
}) {
  const features = [
    cardByTitle(section.cards, "Ruggedized"),
    cardByTitle(section.cards, "High-Security"),
  ].filter((card): card is NonNullable<typeof card> => Boolean(card));
  const tiles = ["Wi-SUN", "LTE-M", "Edge AI", "Mesh"]
    .map((title) => cardByTitle(section.cards, title))
    .filter((card): card is NonNullable<typeof card> => Boolean(card));
  const visualization =
    section.cards.find((card) => Boolean(card.imageUrl)) ??
    cardByTitle(section.cards, "Architecture");
  const featureIcons = ["settings_input_component", "shield_lock"];

  return (
    <section className="bg-primary-container py-stack-lg text-on-primary">
      <div className="mx-auto flex max-w-container-max flex-col gap-stack-lg px-margin-desktop lg:flex-row">
        <div className="lg:w-1/3">
          {headingOf(section.data) ? (
            <h2 className="mb-stack-md font-headline-lg text-headline-lg">
              {headingOf(section.data)}
            </h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {firstString(section.data.introduction, section.data.body) ? (
            <p className="mb-stack-lg text-on-primary-container">
              {firstString(section.data.introduction, section.data.body)}
            </p>
          ) : (
            <MissingOptional label="introduction" />
          )}
          {features.length ? (
            <div className="space-y-stack-md">
              {features.map((card, index) => (
                <div
                  key={card.title}
                  className="flex items-start gap-stack-md rounded border border-on-primary/10 bg-on-primary/5 p-stack-md"
                >
                  <span className="material-symbols-outlined text-innovation-cyan">
                    {featureIcons[index] ?? "verified"}
                  </span>
                  <div>
                    <p className="mb-1 font-headline-md text-headline-md">{card.title}</p>
                    {card.body ? (
                      <p className="text-body-md text-on-primary-container/80">
                        {decodeMojibake(card.body)}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <MissingOptional label="expertise cards" />
          )}
        </div>
        <div className="grid h-full grid-cols-2 gap-gutter md:grid-cols-4 lg:w-2/3">
          {tiles.length ? (
            tiles.map((card) => (
              <div
                key={card.title}
                className="flex aspect-square flex-col items-center justify-center border border-on-primary/10 bg-surface/5 p-base"
              >
                <span className="mb-2 font-display-lg text-headline-md text-on-primary">
                  {card.title}
                </span>
                {card.body ? (
                  <span className="font-label-sm text-label-sm text-on-primary-container/60">
                    {card.body}
                  </span>
                ) : null}
              </div>
            ))
          ) : (
            <MissingOptional label="stack tiles" />
          )}
          <div className="relative col-span-2 min-h-[300px] overflow-hidden rounded-lg md:col-span-4">
            {visualization?.imageUrl ? (
              <div
                className="absolute inset-0 bg-cover bg-center"
                role="img"
                aria-label={visualization.imageAlt ?? ""}
                style={{ backgroundImage: `url('${visualization.imageUrl}')` }}
              />
            ) : (
              <div className="absolute inset-0 p-6">
                <MissingMedia message="architecture visualization image not resolved" />
              </div>
            )}
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary-container to-transparent p-stack-lg">
              {visualization ? (
                <div className="w-full rounded border border-on-primary/10 p-stack-md">
                  <p className="mb-1 font-label-sm text-label-sm uppercase text-innovation-cyan">
                    {visualization.title}
                  </p>
                  {visualization.body ? (
                    <p className="text-body-md">{visualization.body}</p>
                  ) : null}
                </div>
              ) : (
                <MissingOptional label="visualization" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SmartInfrastructureEvGridAdapter({
  section,
}: {
  section: PreviewSectionPayload;
}) {
  const callouts = Array.isArray(section.data.callouts)
    ? section.data.callouts.map(asRecord)
    : [];
  const action = labeledActions(section)[0];

  return (
    <section className="bg-surface py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="flex flex-col items-center gap-stack-lg md:flex-row">
          <div className="order-2 flex-1 md:order-1">
            {eyebrowOf(section.data) ? (
              <span className="mb-base inline-block font-label-sm text-label-sm uppercase tracking-widest text-accent-blue">
                {eyebrowOf(section.data)}
              </span>
            ) : null}
            {headingOf(section.data) ? (
              <h2 className="mb-stack-md font-headline-lg text-headline-lg text-primary">
                {headingOf(section.data)}
              </h2>
            ) : (
              <MissingOptional label="heading" />
            )}
            {bodyOf(section.data) ? (
              <p className="mb-stack-md text-body-lg text-on-surface-variant">
                {bodyOf(section.data)}
              </p>
            ) : (
              <MissingOptional label="body" />
            )}
            {callouts.length ? (
              <div className="mb-stack-lg grid grid-cols-2 gap-stack-md">
                {callouts.map((item) => (
                  <div
                    key={`${firstString(item.value)}-${firstString(item.label)}`}
                    className="border-l-2 border-innovation-cyan pl-stack-md"
                  >
                    <p className="font-display-lg text-display-lg leading-none text-primary">
                      {firstString(item.value)}
                    </p>
                    <p className="font-label-sm text-label-sm text-secondary">
                      {firstString(item.label)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <MissingOptional label="metrics" />
            )}
            {action ? (
              action.href ? (
                <Link
                  href={action.href}
                  className="group flex items-center gap-base font-label-sm text-label-sm text-primary transition-colors hover:text-accent-blue"
                >
                  {action.label}
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                    trending_flat
                  </span>
                </Link>
              ) : (
                <button
                  type="button"
                  className="group flex items-center gap-base font-label-sm text-label-sm text-primary transition-colors hover:text-accent-blue"
                >
                  {action.label}
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                    trending_flat
                  </span>
                </button>
              )
            ) : (
              <MissingOptional label="action" />
            )}
          </div>
          <div className="order-1 h-[500px] w-full flex-1 overflow-hidden rounded-2xl shadow-2xl md:order-2">
            {section.media.url ? (
              <div
                className="h-full w-full bg-cover bg-center"
                role="img"
                aria-label={section.media.alt ?? ""}
                style={{ backgroundImage: `url('${section.media.url}')` }}
              />
            ) : (
              <div className="flex h-full items-center p-6">
                <MissingMedia message={section.media.missing ?? "case study image not resolved"} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SmartInfrastructureModernizationAdapter({
  section,
}: {
  section: PreviewSectionPayload;
}) {
  const actions = labeledActions(section);

  return (
    <section className="relative overflow-hidden bg-primary py-32">
      <div className="relative z-10 mx-auto max-w-container-max px-margin-desktop text-center">
        {headingOf(section.data) ? (
          <h2 className="mb-stack-md font-display-lg text-display-lg text-white">
            {headingOf(section.data)}
          </h2>
        ) : (
          <MissingOptional label="heading" />
        )}
        {bodyOf(section.data) ? (
          <p className="mx-auto mb-stack-lg max-w-2xl text-body-lg text-on-primary-container">
            {bodyOf(section.data)}
          </p>
        ) : (
          <MissingOptional label="body" />
        )}
        <div className="flex flex-col justify-center gap-stack-md sm:flex-row">
          {actions.length ? (
            actions.map((action, index) =>
              action.href ? (
                <Link
                  key={`${action.href}-${action.label}`}
                  href={action.href}
                  className={
                    index === 0
                      ? "bg-white px-10 py-5 font-headline-md text-headline-md text-primary shadow-xl transition-all hover:bg-innovation-cyan hover:text-white"
                      : "border border-white/20 px-10 py-5 font-headline-md text-headline-md text-white transition-all hover:bg-white/10"
                  }
                >
                  {action.label}
                </Link>
              ) : (
                <button
                  key={action.label}
                  type="button"
                  className={
                    index === 0
                      ? "bg-white px-10 py-5 font-headline-md text-headline-md text-primary shadow-xl transition-all hover:bg-innovation-cyan hover:text-white"
                      : "border border-white/20 px-10 py-5 font-headline-md text-headline-md text-white transition-all hover:bg-white/10"
                  }
                >
                  {action.label}
                </button>
              )
            )
          ) : (
            <MissingOptional label="actions" />
          )}
        </div>
      </div>
    </section>
  );
}

function contactOfficeDetails(section: PreviewSectionPayload) {
  const list = Array.isArray(section.data.addresses)
    ? section.data.addresses
    : Array.isArray(section.data.locations)
      ? section.data.locations
      : [];
  const first = asRecord(list[0]);
  const city = firstString(first.city);
  const state = firstString(first.state);
  return {
    legalName: firstString(section.data.legalName, first.label),
    registeredOfficeLabel: firstString(section.data.registeredOfficeLabel),
    line1: firstString(first.line1),
    cityState: [city, state].filter(Boolean).join(", ") || undefined,
    email: firstString(section.data.email),
    gstinLabel: firstString(section.data.gstinLabel),
    enquiryTitle: firstString(section.data.enquiryTitle),
    enquiryBody: firstString(section.data.enquiryBody),
  };
}

function ContactUsHeader({ section }: { section: PreviewSectionPayload }) {
  const eyebrow = eyebrowOf(section.data);
  const title = headingOf(section.data);
  const summary = bodyOf(section.data);

  return (
    <header className="mb-stack-lg max-w-3xl">
      {eyebrow ? (
        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
          {eyebrow}
        </span>
      ) : (
        <MissingOptional label="eyebrow" />
      )}
      {title ? (
        <h1 className="font-display-lg text-display-lg text-primary mt-2 mb-4">{title}</h1>
      ) : (
        <MissingOptional label="heading" />
      )}
      {summary ? (
        <p className="font-body-lg text-on-surface-variant">{summary}</p>
      ) : (
        <MissingOptional label="summary" />
      )}
    </header>
  );
}

function ContactUsOfficeColumn({ section }: { section: PreviewSectionPayload }) {
  const office = contactOfficeDetails(section);

  return (
    <>
      <div className="glass-card rounded-lg border border-outline-variant/30 p-stack-md technical-glow transition-all">
        <div className="mb-stack-md flex items-start gap-stack-sm">
          <span className="material-symbols-outlined text-3xl text-primary">location_on</span>
          <div className="space-y-4">
            <div>
              {office.legalName ? (
                <h3 className="mb-1 font-headline-md text-headline-md text-primary">
                  {office.legalName}
                </h3>
              ) : (
                <MissingOptional label="legal name" />
              )}
              {office.registeredOfficeLabel ? (
                <p className="font-label-sm uppercase tracking-wider text-on-secondary-container">
                  {office.registeredOfficeLabel}
                </p>
              ) : (
                <MissingOptional label="registered office label" />
              )}
            </div>
            {office.line1 || office.cityState ? (
              <address className="not-italic flex flex-col gap-1 border-l-2 border-primary/20 pl-4 font-body-md text-on-surface">
                {office.line1 ? <span>{office.line1}</span> : null}
                {office.cityState ? <span>{office.cityState}</span> : null}
              </address>
            ) : (
              <MissingOptional label="address" />
            )}
            <div className="space-y-3">
              {office.email ? (
                <Link
                  href={`mailto:${office.email}`}
                  className="inline-flex min-h-[44px] items-center gap-2 font-label-sm text-primary transition-colors hover:text-secondary"
                >
                  <span className="material-symbols-outlined text-lg">mail</span>
                  {office.email}
                </Link>
              ) : (
                <MissingOptional label="email" />
              )}
              {office.gstinLabel ? (
                <p className="font-label-sm text-on-surface-variant">{office.gstinLabel}</p>
              ) : (
                <MissingOptional label="GSTIN" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-outline-variant/30 bg-primary-container p-stack-md">
        {office.enquiryTitle ? (
          <h4 className="mb-stack-sm font-label-sm uppercase tracking-widest text-on-primary-container">
            {office.enquiryTitle}
          </h4>
        ) : (
          <MissingOptional label="enquiry title" />
        )}
        {office.enquiryBody ? (
          <p className="font-body-md text-on-primary-container/80">
            {office.enquiryBody}
            {office.email ? (
              <>
                {" "}
                <a
                  href={`mailto:${office.email}`}
                  className="font-semibold text-secondary underline-offset-2 hover:underline"
                >
                  {office.email}
                </a>
                .
              </>
            ) : null}
          </p>
        ) : (
          <MissingOptional label="enquiry copy" />
        )}
      </div>
    </>
  );
}

export function ContactUsLocationsAdapter({ section }: { section: PreviewSectionPayload }) {
  return (
    <div className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
      <ContactUsHeader section={section} />
      <div className="grid grid-cols-12 gap-gutter">
        <div className="col-span-12 flex flex-col gap-stack-md lg:col-span-5">
          <ContactUsOfficeColumn section={section} />
        </div>
      </div>
    </div>
  );
}

export function ContactUsInquiryAdapter({ section }: { section: PreviewSectionPayload }) {
  const heading = headingOf(section.data);
  const supporting = firstString(section.data.supportingCopy, section.data.body);

  return (
    <div className="rounded-xl border border-outline-variant/40 bg-surface-container-lowest p-stack-lg shadow-xl">
      <div className="mb-stack-lg">
        {heading ? (
          <h2 className="font-headline-lg text-headline-lg text-primary">{heading}</h2>
        ) : (
          <MissingOptional label="heading" />
        )}
        {supporting ? (
          <p className="mt-2 font-body-md text-on-surface-variant">{supporting}</p>
        ) : (
          <MissingOptional label="supporting copy" />
        )}
      </div>
      <ContactUsForm />
    </div>
  );
}

export function ContactUsPagePreview({
  locations,
  inquiry,
}: {
  locations: PreviewSectionPayload;
  inquiry: PreviewSectionPayload;
}) {
  return (
    <div className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
      <ContactUsHeader section={locations} />
      <div className="grid grid-cols-12 gap-gutter">
        <div className="col-span-12 flex flex-col gap-stack-md lg:col-span-5">
          <ContactUsOfficeColumn section={locations} />
        </div>
        <div className="col-span-12 lg:col-span-7">
          <ContactUsInquiryAdapter section={inquiry} />
        </div>
      </div>
    </div>
  );
}

function ConsultationOfficeBlock({
  section,
  tone = "default",
}: {
  section: PreviewSectionPayload;
  tone?: "default" | "inverse";
}) {
  const office = contactOfficeDetails(section);
  const inverse = tone === "inverse";

  return (
    <div className="space-y-4">
      <div>
        {office.legalName ? (
          <h3
            className={`mb-1 font-headline-md text-headline-md ${
              inverse ? "text-on-primary-container" : "text-primary"
            }`}
          >
            {office.legalName}
          </h3>
        ) : (
          <MissingOptional label="legal name" />
        )}
        {office.registeredOfficeLabel ? (
          <p
            className={`font-label-sm uppercase tracking-wider ${
              inverse ? "text-on-primary-container/70" : "text-on-secondary-container"
            }`}
          >
            {office.registeredOfficeLabel}
          </p>
        ) : (
          <MissingOptional label="registered office label" />
        )}
      </div>
      {office.line1 || office.cityState ? (
        <address
          className={`not-italic flex flex-col gap-1 border-l-2 pl-4 font-body-md ${
            inverse
              ? "border-on-primary-container/30 text-on-primary-container/90"
              : "border-primary/20 text-on-surface"
          }`}
        >
          {office.line1 ? <span>{office.line1}</span> : null}
          {office.cityState ? <span>{office.cityState}</span> : null}
        </address>
      ) : (
        <MissingOptional label="address" />
      )}
      <div className="space-y-3">
        {office.email ? (
          <Link
            href={`mailto:${office.email}`}
            className={`inline-flex min-h-[44px] items-center gap-2 font-label-sm transition-colors ${
              inverse
                ? "text-on-primary-container hover:text-secondary"
                : "text-primary hover:text-secondary"
            }`}
          >
            <span className="material-symbols-outlined text-lg">mail</span>
            {office.email}
          </Link>
        ) : (
          <MissingOptional label="email" />
        )}
        {office.gstinLabel ? (
          <p
            className={`font-label-sm ${
              inverse ? "text-on-primary-container/70" : "text-on-surface-variant"
            }`}
          >
            {office.gstinLabel}
          </p>
        ) : (
          <MissingOptional label="GSTIN" />
        )}
      </div>
    </div>
  );
}

export function ConsultationEnquiryAdapter({ section }: { section: PreviewSectionPayload }) {
  const heading = headingOf(section.data);
  const supporting = firstString(section.data.supportingCopy, section.data.body);
  const contactHeading = firstString(section.data.contactHeading);
  const confidentialityHeading = firstString(section.data.confidentialityHeading);
  const privacyCopy = firstString(section.data.privacyCopy);

  return (
    <section className="bg-surface-container-low px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="mx-auto grid max-w-container-max grid-cols-1 gap-stack-lg lg:grid-cols-12">
        <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-stack-lg shadow-sm lg:col-span-8">
          <div className="mb-stack-md">
            {heading ? (
              <h2 className="mb-2 font-headline-lg text-headline-lg">{heading}</h2>
            ) : (
              <MissingOptional label="heading" />
            )}
            {supporting ? (
              <p className="font-body-md text-on-surface-variant">{supporting}</p>
            ) : (
              <MissingOptional label="supporting copy" />
            )}
          </div>
          <EngineeringConsultationForm />
        </div>

        <div className="space-y-stack-md lg:col-span-4">
          <div className="rounded-xl border border-primary-container bg-primary-container p-stack-md text-on-primary-fixed">
            {contactHeading ? (
              <h3 className="mb-stack-sm font-headline-md text-headline-md text-surface-bright">
                {contactHeading}
              </h3>
            ) : (
              <MissingOptional label="contact heading" />
            )}
            <ConsultationOfficeBlock section={section} tone="inverse" />
          </div>

          <div className="rounded-xl border border-outline-variant/30 bg-surface-container-highest p-stack-md">
            {confidentialityHeading ? (
              <h3 className="mb-stack-sm font-headline-md text-headline-md">
                {confidentialityHeading}
              </h3>
            ) : (
              <MissingOptional label="confidentiality heading" />
            )}
            {privacyCopy ? (
              <p className="font-body-md text-on-surface-variant">{privacyCopy}</p>
            ) : (
              <MissingOptional label="privacy copy" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ConsultationOfficeAdapter({ section }: { section: PreviewSectionPayload }) {
  const heading = headingOf(section.data);
  const description = firstString(section.data.description, section.data.summary, section.data.body);

  return (
    <section className="bg-white px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="mx-auto max-w-container-max">
        <div className="mb-stack-lg">
          {heading ? (
            <h2 className="mb-2 font-headline-lg text-headline-lg">{heading}</h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {description ? (
            <p className="max-w-xl font-body-md text-on-surface-variant">{description}</p>
          ) : (
            <MissingOptional label="description" />
          )}
        </div>
        <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-stack-lg md:p-stack-md">
          <ConsultationOfficeBlock section={section} />
        </div>
      </div>
    </section>
  );
}

export function ConsultationFaqAdapter({ section }: { section: PreviewSectionPayload }) {
  const items = Array.isArray(section.data.items)
    ? section.data.items.map(asRecord)
    : Array.isArray(section.data.faqs)
      ? section.data.faqs.map(asRecord)
      : [];
  const [openIndex, setOpenIndex] = useState<number | null>(items.length ? 0 : null);
  const heading = headingOf(section.data);
  const introduction = firstString(section.data.introduction, section.data.body);

  return (
    <section className="border-y border-outline-variant/10 bg-surface-container-low px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="mx-auto max-w-3xl">
        <div className="mb-stack-lg text-center">
          {heading ? (
            <h2 className="mb-2 font-headline-lg text-headline-lg">{heading}</h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {introduction ? (
            <p className="font-body-md text-on-surface-variant">{introduction}</p>
          ) : (
            <MissingOptional label="introduction" />
          )}
        </div>
        <div className="space-y-stack-sm">
          {items.length === 0 ? <MissingOptional label="FAQ items" /> : null}
          {items.map((item, index) => {
            const question = firstString(item.question, item.title);
            const answer = firstString(item.answer, item.body);
            const isOpen = openIndex === index;
            return (
              <div
                key={question ?? index}
                className="overflow-hidden rounded-lg border border-outline-variant/40 bg-surface-container-lowest"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 p-stack-md text-left transition-colors hover:bg-surface"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-headline-md text-headline-md text-sm md:text-lg">
                    {question ?? <MissingOptional label="question" />}
                  </span>
                  <span
                    className={`material-symbols-outlined shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {isOpen && answer ? (
                  <div className="border-t border-outline-variant/10 p-stack-md pt-0">
                    <p className="pt-stack-md font-body-md text-on-surface-variant">{answer}</p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ConsultationLinksAdapter({ section }: { section: PreviewSectionPayload }) {
  return (
    <section className="bg-primary px-margin-mobile py-stack-lg text-on-primary md:px-margin-desktop">
      <div className="mx-auto grid max-w-container-max grid-cols-1 gap-stack-lg md:grid-cols-2">
        {section.cards.length === 0 ? <MissingOptional label="cards" /> : null}
        {section.cards.map((card) => {
          const href = card.href;
          const label = card.label;
          const content = (
            <>
              {card.icon ? (
                <span className="material-symbols-outlined mb-stack-sm text-3xl text-primary-fixed">
                  {card.icon}
                </span>
              ) : null}
              <h3 className="mb-2 font-headline-md text-headline-md">{card.title}</h3>
              {card.body ? (
                <p className="mb-stack-md font-body-md text-on-primary/70">{card.body}</p>
              ) : (
                <MissingOptional label="card body" />
              )}
              {label ? (
                <span className="font-label-sm uppercase tracking-widest text-primary-fixed group-hover:underline">
                  {label}
                </span>
              ) : (
                <MissingOptional label="card link" />
              )}
            </>
          );

          if (!href) {
            return (
              <div
                key={card.title}
                className="rounded-2xl border border-on-primary/10 bg-white/5 p-stack-lg"
              >
                {content}
              </div>
            );
          }

          return (
            <Link
              key={card.title}
              href={href}
              className="group cursor-pointer rounded-2xl border border-on-primary/10 bg-white/5 p-stack-lg transition-colors hover:bg-white/10"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function RequestConsultationTrustColumn({ section }: { section: PreviewSectionPayload }) {
  const eyebrow = eyebrowOf(section.data);
  const eyebrowIcon = firstString(section.data.eyebrowIcon);
  const title = headingOf(section.data);
  const titleAccent = asString(section.data.titleAccent);
  const titleAccentClassName = asString(section.data.titleAccentClassName);
  const body = bodyOf(section.data);
  const items = section.cards.length
    ? section.cards
    : Array.isArray(section.data.items)
      ? section.data.items.map((item) => {
          const record = asRecord(item);
          return {
            title: firstString(record.title, record.label) ?? "",
            body: firstString(record.body, record.text, record.description),
            icon: asString(record.icon),
          };
        }).filter((item) => item.title)
      : [];

  return (
    <div className="flex flex-col justify-center gap-stack-md">
      {eyebrow ? (
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-container/10 px-3 py-1 text-on-primary-container">
          {eyebrowIcon ? (
            <span className="material-symbols-outlined text-[16px]">{eyebrowIcon}</span>
          ) : null}
          <span className="font-label-sm text-label-sm">{eyebrow}</span>
        </div>
      ) : (
        <MissingOptional label="eyebrow" />
      )}
      {title ? (
        <h1 className="font-display-lg text-display-lg leading-tight">
          {renderHeroTitle(title, titleAccent, titleAccentClassName)}
        </h1>
      ) : (
        <MissingOptional label="title" />
      )}
      {body ? (
        <p className="max-w-xl font-body-lg text-body-lg text-on-surface-variant">{body}</p>
      ) : (
        <MissingOptional label="body" />
      )}
      <div className="mt-4 flex flex-col gap-6">
        {items.length === 0 ? <MissingOptional label="trust items" /> : null}
        {items.map((item) => (
          <div key={item.title} className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-outline-variant bg-white">
              {item.icon ? (
                <span className="material-symbols-outlined text-primary">{item.icon}</span>
              ) : (
                <MissingOptional label="icon" />
              )}
            </div>
            <div>
              <h3 className="font-headline-md text-body-md font-bold">{item.title}</h3>
              {item.body ? (
                <p className="font-body-md text-on-surface-variant">{item.body}</p>
              ) : (
                <MissingOptional label="item body" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RequestConsultationTrustAdapter({ section }: { section: PreviewSectionPayload }) {
  return (
    <div className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="grid grid-cols-12 gap-gutter">
        <div className="col-span-12 lg:col-span-5">
          <RequestConsultationTrustColumn section={section} />
        </div>
      </div>
    </div>
  );
}

export function RequestConsultationFormAdapter({ section }: { section: PreviewSectionPayload }) {
  return (
    <div className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="glass-card rounded-xl border border-outline-variant/20 p-stack-md shadow-sm md:p-10">
        <RequestConsultationForm />
      </div>
    </div>
  );
}

export function RequestConsultationPagePreview({
  trust,
  form,
}: {
  trust: PreviewSectionPayload;
  form: PreviewSectionPayload;
}) {
  return (
    <div className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="grid grid-cols-12 gap-gutter">
        <div className="col-span-12 lg:col-span-5">
          <RequestConsultationTrustColumn section={trust} />
        </div>
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <div className="glass-card rounded-xl border border-outline-variant/20 p-stack-md shadow-sm md:p-10">
            <RequestConsultationForm />
          </div>
        </div>
      </div>
    </div>
  );
}

function stringItems(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) =>
      typeof item === "string"
        ? item
        : firstString(asRecord(item).text, asRecord(item).label, asRecord(item).body, asRecord(item).content)
    )
    .filter((item): item is string => Boolean(item));
}

function tocLinksOf(data?: Record<string, unknown>): Array<{ href: string; label: string }> {
  if (!data) return [];
  const sources = [data.toc, data.staticLinks, data.items];
  for (const source of sources) {
    if (!Array.isArray(source) || source.length === 0) continue;
    const links = source
      .map((item) => {
        if (typeof item === "string") return { href: "", label: item };
        const record = asRecord(item);
        return {
          href: firstString(record.href, record.url, record.anchor) ?? "",
          label: firstString(record.label, record.title) ?? "",
        };
      })
      .filter((link) => link.label);
    if (links.length) return links;
  }
  return [];
}

function isFeaturedLegalSection(
  item: Record<string, unknown>,
  index: number,
  total: number
): boolean {
  if (asString(item.variant) === "featured") return true;
  if (asString(item.id) === "contact") return true;
  const heading = firstString(item.heading, item.title) ?? "";
  return index === total - 1 && /contact/i.test(heading);
}

function PrivacyLinkedCopy({
  text,
  email,
  className = "underline",
}: {
  text: string;
  email?: string;
  className?: string;
}) {
  if (!email || !text.includes(email)) return <>{text}</>;
  const [before, after] = text.split(email);
  return (
    <>
      {before}
      <Link href={`mailto:${email}`} className={className}>
        {email}
      </Link>
      {after}
    </>
  );
}

function PrivacyPolicyTocAside({
  heading,
  links,
}: {
  heading: string;
  links: Array<{ href: string; label: string }>;
}) {
  if (!links.length) return null;
  return (
    <aside className="hidden md:block col-span-3">
      <div className="sticky top-28">
        <h3 className="font-headline-md text-headline-md mb-6">{heading}</h3>
        <nav className="flex flex-col gap-2">
          {links.map((link) =>
            link.href ? (
              <a
                key={link.href}
                className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary px-4 py-2 border-l border-outline-variant/30 transition-all"
                href={link.href}
              >
                {link.label}
              </a>
            ) : (
              <span
                key={link.label}
                className="font-label-sm text-label-sm text-on-surface-variant px-4 py-2 border-l border-outline-variant/30"
              >
                {link.label}
              </span>
            )
          )}
        </nav>
      </div>
    </aside>
  );
}

function PrivacyPolicyArticle({ data }: { data: Record<string, unknown> }) {
  const articleSections = Array.isArray(data.sections) ? data.sections.map(asRecord) : [];
  const intro = bodyOf(data);

  return (
    <article className="col-span-12 md:col-span-9 privacy-content space-y-10">
      <header className="mb-4">
        <h1 className="font-display-lg text-display-lg text-primary mb-6">{headingOf(data)}</h1>
        {intro ? (
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">{intro}</p>
        ) : (
          <MissingOptional label="introduction" />
        )}
      </header>
      {articleSections.map((item, index) => {
        const heading = firstString(item.heading, item.title);
        const id = asString(item.id) || undefined;
        const paragraphs = stringItems(item.paragraphs);
        const bullets = stringItems(item.bullets);
        const body = firstString(item.body, item.content);
        const email = asString(item.email);
        const featured = isFeaturedLegalSection(item, index, articleSections.length);

        if (featured) {
          return (
            <section
              key={id ?? heading ?? index}
              id={id}
              className="bg-primary text-on-primary p-8 md:p-12 rounded-2xl space-y-4"
            >
              {heading ? (
                <h2 className="font-headline-lg text-headline-lg !mt-0">{heading}</h2>
              ) : (
                <MissingOptional label="contact heading" />
              )}
              {paragraphs.map((paragraph, paragraphIndex) => {
                const isFootnote = paragraphIndex === paragraphs.length - 1 && paragraphs.length > 1;
                const className = isFootnote
                  ? "text-on-primary/70 text-sm"
                  : paragraphIndex === 0
                    ? "text-on-primary/80 max-w-xl"
                    : "text-on-primary/80";
                return (
                  <p key={`${paragraph}-${paragraphIndex}`} className={className}>
                    <PrivacyLinkedCopy text={paragraph} email={email} />
                  </p>
                );
              })}
            </section>
          );
        }

        return (
          <section key={id ?? heading ?? index} id={id} className="space-y-4">
            {heading ? (
              <h2 className="font-headline-lg text-headline-lg text-primary">{heading}</h2>
            ) : (
              <MissingOptional label="section heading" />
            )}
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="font-body-md text-on-surface-variant">
                {paragraph}
              </p>
            ))}
            {body && paragraphs.length === 0 ? (
              <p className="font-body-md text-on-surface-variant whitespace-pre-wrap">{body}</p>
            ) : null}
            {bullets.length ? (
              <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
                {bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </section>
        );
      })}
    </article>
  );
}

function PrivacyPolicyLayout({
  document,
  toc,
}: {
  document: PreviewSectionPayload;
  toc?: PreviewSectionPayload;
}) {
  const links = tocLinksOf(toc?.data).length ? tocLinksOf(toc?.data) : tocLinksOf(document.data);
  const tocHeading =
    firstString(toc?.data.heading, document.data.tocHeading) ?? "Contents";

  return (
    <div className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="grid grid-cols-12 gap-gutter">
        <PrivacyPolicyTocAside heading={tocHeading} links={links} />
        <PrivacyPolicyArticle data={document.data} />
      </div>
    </div>
  );
}

export function PrivacyPolicyPagePreview({
  document,
  toc,
}: {
  document: PreviewSectionPayload;
  toc: PreviewSectionPayload;
}) {
  return <PrivacyPolicyLayout document={document} toc={toc} />;
}

export function PrivacyPolicyDocumentAdapter({
  section,
}: {
  section: PreviewSectionPayload;
}) {
  return <PrivacyPolicyLayout document={section} />;
}

export function PrivacyPolicyTocAdapter({
  section,
}: {
  section: PreviewSectionPayload;
}) {
  const links = tocLinksOf(section.data);
  const heading = headingOf(section.data) || "Contents";
  if (!links.length) {
    return (
      <div className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
        <MissingOptional label="contents links" />
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="grid grid-cols-12 gap-gutter">
        <PrivacyPolicyTocAside heading={heading} links={links} />
      </div>
    </div>
  );
}

export function TermsDocumentAdapter({
  section,
}: {
  section: PreviewSectionPayload;
}) {
  const articleSections = Array.isArray(section.data.sections)
    ? section.data.sections.map(asRecord)
    : [];

  return (
    <section className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="rounded-xl border border-outline-variant/30 bg-white p-8 md:p-12">
        <div className="prose prose-slate max-w-none space-y-stack-lg font-body-md text-on-surface-variant">
          {articleSections.map((item, index) => {
            const heading = firstString(item.heading, item.title);
            const id = asString(item.id) || undefined;
            const paragraphs = stringItems(item.paragraphs);
            const body = firstString(item.body, item.content);
            const email = asString(item.email);
            const copy = paragraphs.length ? paragraphs : body ? [body] : [];

            return (
              <div key={id ?? heading ?? index} id={id}>
                {heading ? (
                  <h2 className="font-headline-md text-headline-md text-primary mb-4">{heading}</h2>
                ) : (
                  <MissingOptional label="section heading" />
                )}
                {copy.map((paragraph) => (
                  <p key={paragraph}>
                    <PrivacyLinkedCopy
                      text={paragraph}
                      email={email}
                      className="text-primary hover:underline"
                    />
                  </p>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function BessChallengesAdapter({ section }: { section: PreviewSectionPayload }) {
  return (
    <section className="bg-surface-container-lowest py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="mb-stack-lg">
          {eyebrowOf(section.data) ? (
            <p className="mb-2 font-label-sm text-label-sm uppercase tracking-widest text-primary">
              {eyebrowOf(section.data)}
            </p>
          ) : (
            <MissingOptional label="eyebrow" />
          )}
          {headingOf(section.data) ? (
            <h2 className="font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
          ) : (
            <MissingOptional label="heading" />
          )}
        </div>
        {section.cards.length === 0 ? <MissingOptional label="cards" /> : null}
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {section.cards.map((card) => (
            <div
              key={card.title}
              className="border-l-2 border-primary bg-white p-stack-md transition-colors hover:bg-surface-container"
            >
              {card.icon ? (
                <span className="material-symbols-outlined mb-4 text-4xl">{card.icon}</span>
              ) : null}
              <h3 className="mb-2 font-headline-md text-headline-md">{card.title}</h3>
              {card.body ? (
                <p className="font-body-md text-body-md text-on-surface-variant">{card.body}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BessHardwareSoftwareAdapter({
  section,
}: {
  section: PreviewSectionPayload;
}) {
  const callouts = Array.isArray(section.data.callouts)
    ? section.data.callouts.map(asRecord)
    : [];
  const control = callouts[0];
  const hub = callouts[1];
  const grid = callouts[2];
  const solutions = Array.isArray(section.data.bullets)
    ? section.data.bullets.map(asRecord)
    : section.cards.map((card) => ({ title: card.title, body: card.body }));

  return (
    <section className="overflow-hidden py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="grid grid-cols-1 items-center gap-stack-lg lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="bento-grid h-[600px]">
              <div className="relative col-span-7 row-span-4 flex flex-col justify-end overflow-hidden border-outline-variant/20 p-stack-md glass-panel group">
                {section.media.url ? (
                  <StitchImage
                    src={section.media.url}
                    alt={section.media.alt ?? firstString(control?.title) ?? ""}
                    className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 z-0 p-4">
                    <MissingMedia message={section.media.missing ?? "control-layer image not resolved"} />
                  </div>
                )}
                <div className="relative z-10 bg-white/90 p-4">
                  {firstString(control?.eyebrow) ? (
                    <p className="font-label-sm text-label-sm font-bold">{firstString(control?.eyebrow)}</p>
                  ) : (
                    <MissingOptional label="control eyebrow" />
                  )}
                  {firstString(control?.title) ? (
                    <p className="font-body-md text-body-md">{firstString(control?.title)}</p>
                  ) : (
                    <MissingOptional label="control title" />
                  )}
                </div>
              </div>
              <div className="col-span-5 row-span-2 flex flex-col items-center justify-center bg-primary p-stack-md text-on-primary">
                <span className="material-symbols-outlined mb-2 text-5xl">
                  {firstString(hub?.icon) ?? "hub"}
                </span>
                {firstString(hub?.title) ? (
                  <p className="font-label-sm text-label-sm uppercase tracking-tighter">
                    {firstString(hub?.title)}
                  </p>
                ) : (
                  <MissingOptional label="hub title" />
                )}
              </div>
              <div className="col-span-5 row-span-2 flex flex-col justify-center border border-outline-variant bg-surface-container p-stack-md">
                {firstString(grid?.title) ? (
                  <h4 className="mb-2 font-headline-md text-headline-md leading-tight">
                    {firstString(grid?.title)}
                  </h4>
                ) : (
                  <MissingOptional label="grid title" />
                )}
                {firstString(grid?.body) ? (
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    {firstString(grid?.body)}
                  </p>
                ) : (
                  <MissingOptional label="grid body" />
                )}
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            {eyebrowOf(section.data) ? (
              <p className="mb-2 font-label-sm text-label-sm uppercase tracking-widest text-primary">
                {eyebrowOf(section.data)}
              </p>
            ) : (
              <MissingOptional label="eyebrow" />
            )}
            {headingOf(section.data) ? (
              <h2 className="mb-stack-md font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
            ) : (
              <MissingOptional label="heading" />
            )}
            {solutions.length ? (
              <ul className="space-y-stack-md">
                {solutions.map((item, index) => {
                  const title = firstString(item.title);
                  const body = firstString(item.body);
                  return (
                    <li key={title ?? index} className="flex gap-4">
                      <span className="flex h-6 w-6 items-center justify-center bg-primary-container text-xs text-on-primary-container">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        {title ? (
                          <h4 className="font-headline-md text-body-lg font-bold">{title}</h4>
                        ) : (
                          <MissingOptional label="solution title" />
                        )}
                        {body ? (
                          <p className="font-body-md text-body-md text-on-surface-variant">{body}</p>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <MissingOptional label="solutions" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function BessArsenalAdapter({ section }: { section: PreviewSectionPayload }) {
  const items = Array.isArray(section.data.items)
    ? section.data.items.map(asRecord)
    : section.cards.map((card) => ({
        category: card.eyebrow,
        label: card.title,
        description: card.body,
      }));

  return (
    <section className="bg-primary-container py-stack-lg text-on-primary-container">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="mb-stack-lg text-center">
          {headingOf(section.data) ? (
            <h2 className="font-headline-lg text-headline-lg text-white">{headingOf(section.data)}</h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          <div className="mx-auto mt-4 h-1 w-24 bg-white/20" />
        </div>
        {items.length === 0 ? <MissingOptional label="arsenal items" /> : null}
        <div className="grid grid-cols-2 gap-gutter md:grid-cols-4">
          {items.map((item, index) => {
            const category = firstString(item.category, item.eyebrow);
            const label = firstString(item.label, item.title);
            const description = firstString(item.description, item.body);
            return (
              <div
                key={label ?? index}
                className="p-stack-md text-center transition-all hover:bg-white/5 border border-white/10"
              >
                {category ? (
                  <p className="mb-2 font-label-sm text-label-sm text-white/60">{category}</p>
                ) : (
                  <MissingOptional label="category" />
                )}
                {label ? (
                  <h5 className="font-headline-md text-headline-md text-white">{label}</h5>
                ) : (
                  <MissingOptional label="label" />
                )}
                {description ? (
                  <p className="font-label-sm text-label-sm text-white/40">{description}</p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function BessCaseStudyAdapter({ section }: { section: PreviewSectionPayload }) {
  const metrics = Array.isArray(section.data.callouts)
    ? section.data.callouts.map(asRecord).filter((item) => firstString(item.value))
    : [];
  const action = section.actions[0];

  return (
    <section className="relative py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="grid grid-cols-1 items-center gap-gutter lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="group relative">
              {section.media.url ? (
                <StitchImage
                  src={section.media.url}
                  alt={section.media.alt ?? ""}
                  className="aspect-video w-full object-cover"
                />
              ) : (
                <MissingMedia message={section.media.missing ?? "case study image not resolved"} />
              )}
              {eyebrowOf(section.data) ? (
                <div className="absolute left-4 top-4 bg-primary px-4 py-2 font-label-sm text-label-sm text-on-primary">
                  {eyebrowOf(section.data)}
                </div>
              ) : (
                <MissingOptional label="eyebrow" />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-stack-md lg:col-span-5">
            {headingOf(section.data) ? (
              <h3 className="font-headline-lg text-headline-lg">{headingOf(section.data)}</h3>
            ) : (
              <MissingOptional label="heading" />
            )}
            {bodyOf(section.data) ? (
              <p className="font-body-md text-body-md text-on-surface-variant">{bodyOf(section.data)}</p>
            ) : (
              <MissingOptional label="body" />
            )}
            {metrics.length ? (
              <div className="grid grid-cols-2 gap-4">
                {metrics.map((metric) => (
                  <div key={`${metric.value}-${metric.label}`} className="bg-surface-container p-4">
                    <span className="font-display-lg text-3xl font-bold">{firstString(metric.value)}</span>
                    <p className="font-label-sm text-xs uppercase opacity-60">{firstString(metric.label)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <MissingOptional label="metrics" />
            )}
            {action ? (
              <Link
                href={action.href}
                className="w-fit border border-primary px-8 py-4 font-label-sm text-label-sm text-primary transition-all hover:bg-primary hover:text-white"
              >
                {action.label}
              </Link>
            ) : (
              <MissingOptional label="action" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function BessEngineeringCoreAdapter({
  section,
}: {
  section: PreviewSectionPayload;
}) {
  return (
    <section className="bg-surface py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop text-center">
        {eyebrowOf(section.data) ? (
          <p className="mb-2 font-label-sm text-label-sm uppercase tracking-widest text-primary">
            {eyebrowOf(section.data)}
          </p>
        ) : (
          <MissingOptional label="eyebrow" />
        )}
        {headingOf(section.data) ? (
          <h2 className="mb-stack-lg font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
        ) : (
          <MissingOptional label="heading" />
        )}
        {section.cards.length === 0 ? <MissingOptional label="cards" /> : null}
        <div className="grid grid-cols-1 gap-stack-lg md:grid-cols-2">
          {section.cards.map((card) => (
            <div key={card.title} className="tech-card relative overflow-hidden bg-white p-stack-lg text-left">
              <div className="absolute right-0 top-0 z-0 -mr-8 -mt-8 h-24 w-24 rotate-45 bg-surface-container" />
              <div className="relative z-10">
                <h4 className="mb-4 font-headline-md text-headline-md">{card.title}</h4>
                {card.body ? (
                  <p className="mb-4 font-body-md text-body-md text-on-surface-variant">{card.body}</p>
                ) : null}
                {card.badges?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {card.badges.map((badge) => (
                      <span
                        key={badge}
                        className="rounded-full bg-surface-container-high px-3 py-1 font-label-sm text-[10px]"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                ) : (
                  <MissingOptional label="tags" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BessCtaAdapter({ section }: { section: PreviewSectionPayload }) {
  const [primary, secondary] = section.actions;

  return (
    <section className="relative overflow-hidden py-stack-lg">
      <div className="relative z-10 mx-auto max-w-container-max px-margin-desktop text-center">
        <div className="mx-auto max-w-3xl">
          {headingOf(section.data) ? (
            <h2 className="mb-stack-md font-display-lg text-display-lg">{headingOf(section.data)}</h2>
          ) : (
            <MissingOptional label="title" />
          )}
          {bodyOf(section.data) ? (
            <p className="mb-stack-lg font-body-lg text-body-lg text-on-surface-variant">
              {bodyOf(section.data)}
            </p>
          ) : (
            <MissingOptional label="body" />
          )}
          <div className="flex flex-col justify-center gap-stack-md sm:flex-row">
            {primary ? (
              <Link
                href={primary.href}
                className="bg-primary px-12 py-5 font-label-sm text-label-sm text-on-primary transition-all hover:bg-primary/90"
              >
                {primary.label}
              </Link>
            ) : (
              <MissingOptional label="primary action" />
            )}
            {secondary ? (
              <Link
                href={secondary.href}
                className="border border-outline bg-transparent px-12 py-5 font-label-sm text-label-sm transition-all hover:border-primary"
              >
                {secondary.label}
              </Link>
            ) : (
              <MissingOptional label="secondary action" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const BMS_SOX_BARS = [
  "h-[60%] bg-primary/20",
  "h-[75%] bg-primary/30 delay-75",
  "h-[45%] bg-primary/10 delay-150",
  "h-[90%] bg-primary/40 delay-200",
  "h-[65%] bg-primary/25 delay-300",
];

export function BmsArchitectureAdapter({ section }: { section: PreviewSectionPayload }) {
  const [monitoring, balancing, sox, thermal] = section.cards;

  return (
    <section className="bg-surface py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="mb-24 flex flex-col items-center text-center">
          {headingOf(section.data) ? (
            <h2 className="mb-6 font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          <div className="mb-8 h-1 w-24 bg-primary" />
          {bodyOf(section.data) ? (
            <p className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
              {bodyOf(section.data)}
            </p>
          ) : (
            <MissingOptional label="introduction" />
          )}
        </div>
        <div className="grid grid-cols-12 gap-gutter">
          {monitoring ? (
            <div className="col-span-12 flex flex-col justify-between p-10 glass-card lg:col-span-4">
              <div>
                {monitoring.icon ? (
                  <span className="material-symbols-outlined mb-6 text-4xl text-primary">
                    {monitoring.icon}
                  </span>
                ) : null}
                <h3 className="mb-4 font-headline-md text-headline-md">{monitoring.title}</h3>
                {monitoring.body ? (
                  <p className="font-body-md text-body-md text-on-surface-variant">{monitoring.body}</p>
                ) : (
                  <MissingOptional label="cell monitoring body" />
                )}
              </div>
              {monitoring.label ? (
                <div className="mt-12 flex cursor-pointer items-center gap-2 font-label-sm text-label-sm text-primary group">
                  {monitoring.label}{" "}
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                    north_east
                  </span>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="col-span-12 lg:col-span-4">
              <MissingOptional label="cell monitoring card" />
            </div>
          )}
          {balancing ? (
            <div className="relative col-span-12 overflow-hidden bg-primary-container p-10 text-on-primary-container group lg:col-span-8">
              <div className="relative z-10">
                <h3 className="mb-4 font-headline-md text-headline-md text-on-primary">
                  {balancing.title}
                </h3>
                {balancing.body ? (
                  <p className="mb-8 max-w-lg font-body-md text-body-md opacity-80">{balancing.body}</p>
                ) : (
                  <MissingOptional label="active balancing body" />
                )}
                {balancing.metrics?.length ? (
                  <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                    {balancing.metrics.map((metric) => (
                      <div key={`${metric.value}-${metric.label}`} className="border border-outline-variant/20 p-4">
                        <p className="mb-1 font-headline-md text-headline-md text-on-primary">{metric.value}</p>
                        <p className="font-label-sm text-label-sm opacity-60">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <MissingOptional label="balancing metrics" />
                )}
              </div>
              <div className="absolute top-0 right-0 h-full w-1/2 opacity-10 transition-opacity group-hover:opacity-20" />
            </div>
          ) : (
            <div className="col-span-12 lg:col-span-8">
              <MissingOptional label="active balancing card" />
            </div>
          )}
          {sox ? (
            <div className="col-span-12 p-10 glass-card group lg:col-span-6">
              <h3 className="mb-4 font-headline-md text-headline-md">{sox.title}</h3>
              {sox.body ? (
                <p className="mb-6 font-body-md text-body-md text-on-surface-variant">{sox.body}</p>
              ) : (
                <MissingOptional label="SoX body" />
              )}
              <div className="flex h-48 w-full items-end gap-1 overflow-hidden bg-surface-container-low p-4">
                {BMS_SOX_BARS.map((barClass) => (
                  <div key={barClass} className={`w-full animate-pulse ${barClass}`} />
                ))}
              </div>
            </div>
          ) : (
            <div className="col-span-12 lg:col-span-6">
              <MissingOptional label="SoX card" />
            </div>
          )}
          {thermal ? (
            <div className="col-span-12 flex flex-col justify-between p-10 glass-card lg:col-span-6">
              <div>
                <h3 className="mb-4 font-headline-md text-headline-md">{thermal.title}</h3>
                {thermal.body ? (
                  <p className="font-body-md text-body-md text-on-surface-variant">{thermal.body}</p>
                ) : (
                  <MissingOptional label="thermal body" />
                )}
              </div>
              {thermal.badges?.length ? (
                <div className="mt-8 flex gap-4">
                  {thermal.badges.map((badge, index) => (
                    <div
                      key={badge}
                      className="flex items-center gap-2 rounded-full bg-surface-container-high px-3 py-1 font-label-sm text-label-sm"
                    >
                      <span className={`h-2 w-2 rounded-full ${index === 0 ? "bg-error" : "bg-primary"}`} />
                      {badge}
                    </div>
                  ))}
                </div>
              ) : (
                <MissingOptional label="thermal badges" />
              )}
            </div>
          ) : (
            <div className="col-span-12 lg:col-span-6">
              <MissingOptional label="thermal card" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function BmsSiliconAdapter({ section }: { section: PreviewSectionPayload }) {
  const items = Array.isArray(section.data.items)
    ? section.data.items
        .map((item) =>
          typeof item === "string"
            ? item
            : firstString(asRecord(item).label, asRecord(item).title) ?? ""
        )
        .filter(Boolean)
    : section.cards.map((card) => card.title).filter(Boolean);

  return (
    <section className="bg-surface-container-lowest py-stack-md">
      <div className="mx-auto max-w-container-max border-y border-outline-variant/10 px-margin-desktop py-12">
        <div className="flex flex-wrap items-center justify-between gap-gutter opacity-60 transition-opacity hover:opacity-100">
          {headingOf(section.data) ? (
            <p className="mb-6 w-full text-center font-label-sm text-label-sm uppercase tracking-widest lg:mb-0 lg:w-auto lg:text-left">
              {headingOf(section.data)}
            </p>
          ) : (
            <MissingOptional label="heading" />
          )}
          {items.length ? (
            <div className="mx-auto flex items-center gap-12 lg:mx-0">
              {items.map((item) => (
                <span key={item} className="font-headline-md text-headline-md tracking-tighter">
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <MissingOptional label="silicon platforms" />
          )}
        </div>
      </div>
    </section>
  );
}

export function BmsApplicationsAdapter({ section }: { section: PreviewSectionPayload }) {
  const callouts = Array.isArray(section.data.callouts)
    ? section.data.callouts.map(asRecord)
    : [];
  const [first, second] = callouts;
  const firstImage = section.media.url;
  const firstAlt = section.media.alt ?? firstString(first?.mediaAlt, first?.title) ?? "";
  const secondMedia = asRecord(second?.media);
  const secondImage = firstString(secondMedia.source, second?.imageUrl, second?.image);
  const secondAlt = firstString(second?.mediaAlt, secondMedia.alt, second?.title) ?? "";
  const studies = [
    {
      title: firstString(first?.title),
      body: firstString(first?.body),
      image: firstImage,
      alt: firstAlt,
      missing: section.media.missing ?? "BESS image not resolved",
    },
    {
      title: firstString(second?.title),
      body: firstString(second?.body),
      image: secondImage,
      alt: secondAlt,
      missing: "automotive image not resolved",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-surface py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="mb-20 grid grid-cols-12 gap-gutter">
          <div className="col-span-12 lg:col-span-6">
            {headingOf(section.data) ? (
              <h2 className="mb-4 font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
            ) : (
              <MissingOptional label="heading" />
            )}
            {bodyOf(section.data) ? (
              <p className="font-body-lg text-body-lg text-on-surface-variant">{bodyOf(section.data)}</p>
            ) : (
              <MissingOptional label="body" />
            )}
          </div>
        </div>
        {callouts.length ? (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {studies.map((study) => (
              <div key={study.title ?? study.missing} className="group cursor-pointer">
                <div className="relative mb-8 h-[400px] overflow-hidden">
                  {study.image ? (
                    <StitchImage
                      src={study.image}
                      alt={study.alt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <MissingMedia message={study.missing} />
                  )}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                {study.title ? (
                  <h4 className="mb-2 font-headline-md text-headline-md">{study.title}</h4>
                ) : (
                  <MissingOptional label="application title" />
                )}
                {study.body ? (
                  <p className="font-body-md text-body-md text-on-surface-variant">{study.body}</p>
                ) : (
                  <MissingOptional label="application body" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <MissingOptional label="application callouts" />
        )}
      </div>
    </section>
  );
}

export function BmsCtaAdapter({ section }: { section: PreviewSectionPayload }) {
  const [primary, secondary] = section.actions;

  return (
    <section className="relative overflow-hidden bg-primary py-stack-lg text-on-primary">
      <div className="relative z-10 mx-auto flex max-w-container-max flex-col items-center px-margin-desktop text-center">
        {headingOf(section.data) ? (
          <h2 className="mb-8 font-display-lg text-headline-lg-mobile tracking-tighter md:text-display-lg">
            {headingOf(section.data)}
          </h2>
        ) : (
          <MissingOptional label="title" />
        )}
        {bodyOf(section.data) ? (
          <p className="mb-12 max-w-2xl font-body-lg text-body-lg opacity-80">{bodyOf(section.data)}</p>
        ) : (
          <MissingOptional label="body" />
        )}
        <div className="flex flex-col gap-gutter sm:flex-row">
          {primary ? (
            <Link
              href={primary.href}
              className="bg-on-primary px-12 py-6 font-label-sm text-label-sm font-bold text-primary transition-all hover:bg-on-primary-fixed-variant hover:text-on-primary active:scale-95"
            >
              {primary.label}
            </Link>
          ) : (
            <MissingOptional label="primary action" />
          )}
          {secondary ? (
            <Link
              href={secondary.href}
              className="border border-on-primary px-12 py-6 font-label-sm text-label-sm font-bold transition-all hover:bg-on-primary hover:text-primary active:scale-95"
            >
              {secondary.label}
            </Link>
          ) : (
            <MissingOptional label="secondary action" />
          )}
        </div>
      </div>
    </section>
  );
}

export function ErmBenefitsAdapter({ section }: { section: PreviewSectionPayload }) {
  return (
    <section className="bg-surface-container-lowest py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        {section.cards.length === 0 ? <MissingOptional label="benefit cards" /> : null}
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {section.cards.map((card) => (
            <div key={card.title} className="space-y-stack-sm">
              <div className="font-headline-md text-headline-md text-primary">{card.title}</div>
              {card.body ? (
                <p className="font-body-md text-body-md text-on-surface-variant">{card.body}</p>
              ) : (
                <MissingOptional label={`${card.title} body`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ErmArchitectureAdapter({ section }: { section: PreviewSectionPayload }) {
  const nodes = Array.isArray(section.data.nodes)
    ? section.data.nodes.map(asRecord)
    : [];
  const [afe, processing, connectivity, verification] = nodes;

  return (
    <section className="bg-background py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="mb-stack-md">
          {headingOf(section.data) ? (
            <h2 className="font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {bodyOf(section.data) ? (
            <p className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
              {bodyOf(section.data)}
            </p>
          ) : (
            <MissingOptional label="introduction" />
          )}
        </div>
        {nodes.length === 0 ? <MissingOptional label="architecture nodes" /> : null}
        <div className="bento-grid">
          {afe ? (
            <div className="col-span-12 flex flex-col justify-between rounded-xl border-outline-variant/30 p-8 glass-card technical-glow md:col-span-8">
              <div className="space-y-4">
                {firstString(afe.icon) ? (
                  <span className="material-symbols-outlined text-4xl text-primary">
                    {firstString(afe.icon)}
                  </span>
                ) : null}
                <h3 className="font-headline-md text-headline-md">
                  {firstString(afe.label, afe.title)}
                </h3>
                {firstString(afe.description, afe.body) ? (
                  <p className="max-w-xl font-body-md text-body-md text-on-surface-variant">
                    {firstString(afe.description, afe.body)}
                  </p>
                ) : (
                  <MissingOptional label="front-end body" />
                )}
              </div>
              {Array.isArray(afe.badges) && afe.badges.length ? (
                <div className="mt-8 flex items-center gap-4">
                  {afe.badges.map((badge) => (
                    <span
                      key={String(badge)}
                      className="rounded bg-surface-container px-3 py-1 font-label-sm text-label-sm text-on-surface"
                    >
                      {String(badge)}
                    </span>
                  ))}
                </div>
              ) : (
                <MissingOptional label="front-end badges" />
              )}
            </div>
          ) : (
            <MissingOptional label="analog front-end node" />
          )}
          {processing ? (
            <div className="col-span-12 flex flex-col justify-between rounded-xl bg-primary-container p-8 technical-glow md:col-span-4">
              <div className="space-y-4">
                {firstString(processing.icon) ? (
                  <span className="material-symbols-outlined text-4xl text-on-primary-container">
                    {firstString(processing.icon)}
                  </span>
                ) : null}
                <h3 className="font-headline-md text-headline-md text-on-primary">
                  {firstString(processing.label, processing.title)}
                </h3>
                {firstString(processing.description, processing.body) ? (
                  <p className="font-body-md text-body-md text-on-primary-container">
                    {firstString(processing.description, processing.body)}
                  </p>
                ) : (
                  <MissingOptional label="processing body" />
                )}
              </div>
              {firstString(processing.annotation) ? (
                <div className="mt-8 border-t border-on-primary-container/20 pt-4">
                  {firstString(processing.eyebrow) ? (
                    <div className="font-label-sm text-label-sm uppercase text-on-primary-container">
                      {firstString(processing.eyebrow)}
                    </div>
                  ) : (
                    <MissingOptional label="processing eyebrow" />
                  )}
                  <div className="font-headline-md text-headline-md text-on-primary">
                    {firstString(processing.annotation)}
                  </div>
                </div>
              ) : (
                <MissingOptional label="processing annotation" />
              )}
            </div>
          ) : (
            <MissingOptional label="processing node" />
          )}
          {connectivity ? (
            <div className="col-span-12 rounded-xl bg-surface-container-highest p-8 technical-glow md:col-span-4">
              <div className="space-y-4">
                {firstString(connectivity.icon) ? (
                  <span className="material-symbols-outlined text-4xl text-primary">
                    {firstString(connectivity.icon)}
                  </span>
                ) : null}
                <h3 className="font-headline-md text-headline-md">
                  {firstString(connectivity.label, connectivity.title)}
                </h3>
                {firstString(connectivity.description, connectivity.body) ? (
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {firstString(connectivity.description, connectivity.body)}
                  </p>
                ) : (
                  <MissingOptional label="connectivity body" />
                )}
              </div>
            </div>
          ) : (
            <MissingOptional label="connectivity node" />
          )}
          {verification ? (
            <div className="col-span-12 flex gap-stack-md rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-8 technical-glow md:col-span-8">
              <div className="w-2/3 space-y-4">
                <h3 className="font-headline-md text-headline-md">
                  {firstString(verification.label, verification.title)}
                </h3>
                {firstString(verification.description, verification.body) ? (
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {firstString(verification.description, verification.body)}
                  </p>
                ) : (
                  <MissingOptional label="verification body" />
                )}
              </div>
              <div className="flex w-1/3 items-center justify-center" />
            </div>
          ) : (
            <MissingOptional label="verification node" />
          )}
        </div>
      </div>
    </section>
  );
}

export function ErmApplicationsAdapter({ section }: { section: PreviewSectionPayload }) {
  return (
    <section className="bg-surface-container-low py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="mb-stack-lg text-center">
          {headingOf(section.data) ? (
            <h2 className="font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {bodyOf(section.data) ? (
            <p className="font-body-lg text-body-lg text-on-surface-variant">{bodyOf(section.data)}</p>
          ) : (
            <MissingOptional label="introduction" />
          )}
        </div>
        {section.cards.length === 0 ? <MissingOptional label="application cards" /> : null}
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
          {section.cards.map((card) => (
            <div key={card.title} className="group relative aspect-[16/9] overflow-hidden rounded-xl">
              {card.imageUrl ? (
                <StitchImage
                  src={card.imageUrl}
                  alt={card.imageAlt ?? card.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <MissingMedia message={`${card.title} has no image`} />
              )}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8">
                <h4 className="font-headline-md text-headline-md text-white">{card.title}</h4>
                {card.body ? (
                  <p className="font-body-md text-body-md text-white/70">{card.body}</p>
                ) : (
                  <MissingOptional label={`${card.title} body`} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ErmOperationalAdapter({ section }: { section: PreviewSectionPayload }) {
  const benefits = section.cards.filter((card) => !card.rows?.length);
  const specs = section.cards.find((card) => card.rows?.length);

  return (
    <section className="bg-background py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="flex flex-col gap-stack-lg lg:flex-row">
          <div className="w-full lg:w-1/2">
            {headingOf(section.data) ? (
              <h2 className="mb-8 font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
            ) : (
              <MissingOptional label="heading" />
            )}
            {benefits.length ? (
              <ul className="space-y-6">
                {benefits.map((card) => (
                  <li key={card.title} className="flex gap-4">
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {card.icon ?? "check_circle"}
                    </span>
                    <div>
                      <h5 className="mb-1 font-headline-md text-[18px]">{card.title}</h5>
                      {card.body ? (
                        <p className="font-body-md text-body-md text-on-surface-variant">{card.body}</p>
                      ) : (
                        <MissingOptional label={`${card.title} body`} />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <MissingOptional label="operational benefits" />
            )}
          </div>
          <div className="w-full rounded-xl border border-outline-variant/30 p-8 glass-card lg:w-1/2">
            <div className="mb-4 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
              {specs?.title ?? "Technical Specifications"}
            </div>
            {specs?.rows?.length ? (
              <table className="w-full font-body-md text-body-md">
                <tbody>
                  {specs.rows.map((row, index) => (
                    <tr
                      key={`${row.label}-${row.value}`}
                      className={index < specs.rows!.length - 1 ? "border-b border-outline-variant/20" : undefined}
                    >
                      <td className="py-4 font-semibold">{row.label}</td>
                      <td className="py-4 text-right text-on-surface-variant">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <MissingOptional label="specification rows" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ErmCtaAdapter({ section }: { section: PreviewSectionPayload }) {
  const [primary, secondary] = section.actions;
  const title = headingOf(section.data);
  const splitAt = title?.indexOf("Your ") ?? -1;
  const titleNode =
    title && splitAt >= 0 ? (
      <>
        {title.slice(0, splitAt + 4)} <br />
        {title.slice(splitAt + 5)}
      </>
    ) : (
      title
    );

  return (
    <section className="py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="relative overflow-hidden rounded-2xl bg-primary p-12 text-center text-on-primary shadow-2xl">
          <div className="relative z-10 mx-auto max-w-2xl space-y-stack-md">
            {titleNode ? (
              <h2 className="font-display-lg text-headline-lg text-white">{titleNode}</h2>
            ) : (
              <MissingOptional label="title" />
            )}
            {bodyOf(section.data) ? (
              <p className="font-body-lg text-body-lg text-on-primary-container">
                {bodyOf(section.data)}
              </p>
            ) : (
              <MissingOptional label="body" />
            )}
            <div className="flex justify-center gap-base">
              {primary ? (
                <Link
                  href={primary.href}
                  className="rounded-lg bg-white px-8 py-4 font-label-sm text-label-sm text-primary transition-all hover:bg-white/90"
                >
                  {primary.label}
                </Link>
              ) : (
                <MissingOptional label="primary action" />
              )}
              {secondary ? (
                <Link
                  href={secondary.href}
                  className="rounded-lg border border-white/20 px-8 py-4 font-label-sm text-label-sm text-white transition-all hover:bg-white/10"
                >
                  {secondary.label}
                </Link>
              ) : (
                <MissingOptional label="secondary action" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CcoMetricsAdapter({ section }: { section: PreviewSectionPayload }) {
  const items = Array.isArray(section.data.items)
    ? section.data.items.map(asRecord)
    : [];

  return (
    <section className="bg-primary-container py-stack-lg text-on-primary">
      <div className="mx-auto grid max-w-container-max grid-cols-1 gap-gutter px-margin-desktop md:grid-cols-3">
        {items.length === 0 ? <MissingOptional label="metrics" /> : null}
        {items.map((item, index) => {
          const progress = Number(item.progress);
          const hasProgress = Number.isFinite(progress);
          return (
            <div key={`${firstString(item.label, item.value)}-${index}`} className="flex flex-col gap-2">
              {firstString(item.label) ? (
                <span className="font-label-sm text-label-sm uppercase text-on-primary-container/60">
                  {firstString(item.label)}
                </span>
              ) : (
                <MissingOptional label="metric label" />
              )}
              {firstString(item.value) ? (
                <span className="font-display-lg text-headline-lg">{firstString(item.value)}</span>
              ) : (
                <MissingOptional label="metric value" />
              )}
              {hasProgress ? (
                <div className="h-1 w-full overflow-hidden bg-primary-fixed-dim/20">
                  <div
                    className="h-full bg-on-primary-container"
                    style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                  />
                </div>
              ) : (
                <MissingOptional label="metric progress" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function CcoRisksAdapter({ section }: { section: PreviewSectionPayload }) {
  const eyebrow = eyebrowOf(section.data);
  const heading = headingOf(section.data);
  const introduction = bodyOf(section.data);
  const challengesEyebrow = asString(section.data.supportingText);
  const quote = asString(section.data.quote);
  const quoted =
    quote && (quote.startsWith('"') || quote.startsWith("“")) ? quote : quote ? `"${quote}"` : undefined;

  return (
    <section className="bg-surface py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="grid grid-cols-12 gap-gutter">
          <div className="group relative col-span-12 overflow-hidden border border-outline-variant/30 bg-surface-container-lowest p-stack-lg lg:col-span-8">
            <div className="relative z-10">
              {eyebrow ? (
                <span className="mb-4 block font-label-sm text-label-sm text-primary">{eyebrow}</span>
              ) : (
                <MissingOptional label="problem eyebrow" />
              )}
              {heading ? (
                <h2 className="mb-stack-md font-headline-lg text-headline-lg">{heading}</h2>
              ) : (
                <MissingOptional label="heading" />
              )}
              {introduction ? (
                <p className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant">{introduction}</p>
              ) : (
                <MissingOptional label="introduction" />
              )}
            </div>
            <div className="absolute -bottom-20 -right-20 opacity-5 transition-transform duration-700 group-hover:scale-110">
              <span className="material-symbols-outlined text-[300px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                warning
              </span>
            </div>
          </div>
          <div className="col-span-12 flex flex-col justify-between border border-primary bg-primary-container p-stack-lg text-on-primary lg:col-span-4">
            <div>
              {challengesEyebrow ? (
                <span className="mb-4 block font-label-sm text-label-sm text-on-primary-container/60">
                  {challengesEyebrow}
                </span>
              ) : (
                <MissingOptional label="challenges eyebrow" />
              )}
              {section.cards.length === 0 ? <MissingOptional label="challenge cards" /> : null}
              <ul className="space-y-stack-md">
                {section.cards.map((card) => (
                  <li key={card.title} className="flex items-start gap-4">
                    {card.icon ? (
                      <span
                        className="material-symbols-outlined text-on-primary-container"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {card.icon}
                      </span>
                    ) : (
                      <MissingOptional label={`${card.title} icon`} />
                    )}
                    <div>
                      <p className="mb-1 font-label-sm text-label-sm font-bold uppercase">{card.title}</p>
                      {card.body ? (
                        <p className="font-body-md text-on-primary-container">{card.body}</p>
                      ) : (
                        <MissingOptional label={`${card.title} body`} />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-stack-lg border-t border-on-primary-container/20 pt-stack-md">
              {quoted ? (
                <p className="font-label-sm text-label-sm italic opacity-70">{quoted}</p>
              ) : (
                <MissingOptional label="quote" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function cardNamed(cards: PreviewSectionPayload["cards"], title: string) {
  return cards.find((card) => card.title.toLowerCase() === title.toLowerCase());
}

export function CcoHardwareAdapter({ section }: { section: PreviewSectionPayload }) {
  const [action] = section.actions;
  const hardware = cardNamed(section.cards, "Hardware") ?? section.cards[0];
  const firmware = cardNamed(section.cards, "Firmware") ?? section.cards[1];
  const connectivity = cardNamed(section.cards, "Connectivity") ?? section.cards[2];
  const hardwareImage = hardware?.imageUrl ?? section.media.url;
  const hardwareAlt = hardware?.imageAlt ?? section.media.alt ?? "";
  const hardwareBadge = hardware?.badges?.[0];
  const [microkernel, spaceA, spaceB] = firmware?.items ?? [];

  return (
    <section className="bg-surface-container py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="mb-stack-lg flex flex-col items-end justify-between md:flex-row">
          <div className="max-w-xl">
            {eyebrowOf(section.data) ? (
              <span className="mb-4 block font-label-sm text-label-sm text-primary">
                {eyebrowOf(section.data)}
              </span>
            ) : (
              <MissingOptional label="eyebrow" />
            )}
            {headingOf(section.data) ? (
              <h2 className="font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
            ) : (
              <MissingOptional label="heading" />
            )}
          </div>
          <div className="mt-stack-md md:mt-0">
            {action ? (
              <Link
                href={action.href}
                className="border border-primary px-6 py-2 font-label-sm text-label-sm transition-all hover:bg-primary hover:text-on-primary"
              >
                {action.label}
              </Link>
            ) : (
              <MissingOptional label="schematics action" />
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {hardware ? (
            <div className="glass-panel p-stack-md tech-glow transition-all duration-300">
              <div className="group relative mb-stack-md aspect-square overflow-hidden bg-surface-container-highest">
                {hardwareImage ? (
                  <StitchImage
                    src={hardwareImage}
                    alt={hardwareAlt}
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  />
                ) : (
                  <MissingMedia message={section.media.missing ?? "hardware image"} />
                )}
                {hardwareBadge ? (
                  <div className="absolute right-4 top-4 bg-primary px-2 py-1 font-label-sm text-[10px] text-on-primary">
                    {hardwareBadge}
                  </div>
                ) : (
                  <MissingOptional label="hardware badge" />
                )}
              </div>
              <h3 className="mb-2 font-headline-md text-headline-md">{hardware.title}</h3>
              {hardware.body ? (
                <p className="font-body-md text-on-surface-variant">{hardware.body}</p>
              ) : (
                <MissingOptional label="hardware body" />
              )}
            </div>
          ) : (
            <MissingOptional label="hardware card" />
          )}
          {firmware ? (
            <div className="glass-panel p-stack-md tech-glow transition-all duration-300">
              <div className="relative mb-stack-md flex aspect-square items-center justify-center overflow-hidden bg-surface-container-highest p-stack-lg">
                <div className="relative z-10 flex h-full w-full flex-col border border-primary/20 p-4">
                  <div className="mb-2 flex h-1/3 w-full items-center justify-center border-b border-primary/20 bg-primary/10 font-label-sm text-[10px]">
                    {microkernel ?? <MissingOptional label="microkernel label" />}
                  </div>
                  <div className="flex flex-1 gap-2">
                    <div className="flex w-1/2 items-center justify-center border border-primary/10 bg-primary/5 font-label-sm text-[10px]">
                      {spaceA ?? <MissingOptional label="space A label" />}
                    </div>
                    <div className="flex w-1/2 items-center justify-center border border-primary/10 bg-primary/5 font-label-sm text-[10px]">
                      {spaceB ?? <MissingOptional label="space B label" />}
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="mb-2 font-headline-md text-headline-md">{firmware.title}</h3>
              {firmware.body ? (
                <p className="font-body-md text-on-surface-variant">{firmware.body}</p>
              ) : (
                <MissingOptional label="firmware body" />
              )}
            </div>
          ) : (
            <MissingOptional label="firmware card" />
          )}
          {connectivity ? (
            <div className="glass-panel p-stack-md tech-glow transition-all duration-300">
              <div className="group mb-stack-md flex aspect-square flex-col overflow-hidden bg-surface-container-highest">
                {connectivity.imageUrl ? (
                  <div
                    className="flex-1 bg-cover bg-center"
                    role="img"
                    aria-label={connectivity.imageAlt ?? ""}
                    style={{ backgroundImage: `url('${connectivity.imageUrl}')` }}
                  />
                ) : (
                  <MissingMedia message="connectivity image" />
                )}
                <div className="bg-primary p-4 text-on-primary">
                  <div className="flex items-center justify-between">
                    {connectivity.eyebrow ? (
                      <span className="font-label-sm text-[10px]">{connectivity.eyebrow}</span>
                    ) : (
                      <MissingOptional label="sync status" />
                    )}
                    <div className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                      {connectivity.label ? (
                        <span className="font-label-sm text-[10px]">{connectivity.label}</span>
                      ) : (
                        <MissingOptional label="live label" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="mb-2 font-headline-md text-headline-md">{connectivity.title}</h3>
              {connectivity.body ? (
                <p className="font-body-md text-on-surface-variant">{connectivity.body}</p>
              ) : (
                <MissingOptional label="connectivity body" />
              )}
            </div>
          ) : (
            <MissingOptional label="connectivity card" />
          )}
        </div>
      </div>
    </section>
  );
}

export function CcoStackAdapter({ section }: { section: PreviewSectionPayload }) {
  const annotations = Array.isArray(section.data.annotations)
    ? section.data.annotations.map(asRecord)
    : [];
  const nodes = Array.isArray(section.data.nodes) ? section.data.nodes.map(asRecord) : [];
  const diagramLabel = asString(section.data.introduction);
  const application = nodes[0];
  const safety = nodes[1];
  const microkernel = nodes[2];
  const hal = nodes[3];

  return (
    <section className="border-y border-outline-variant/10 bg-surface py-stack-lg">
      <div className="mx-auto grid max-w-container-max grid-cols-12 items-center gap-gutter px-margin-desktop">
        <div className="col-span-12 lg:col-span-5">
          {headingOf(section.data) ? (
            <h2 className="mb-stack-md font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {annotations.length === 0 ? <MissingOptional label="stack annotations" /> : null}
          <div className="space-y-stack-md">
            {annotations.map((item, index) => (
              <div
                key={`${firstString(item.label, item.value)}-${index}`}
                className="flex items-center justify-between border-b border-outline-variant/20 p-4"
              >
                {firstString(item.label) ? (
                  <span className="font-label-sm text-label-sm">{firstString(item.label)}</span>
                ) : (
                  <MissingOptional label="annotation label" />
                )}
                {firstString(item.value) ? (
                  <span className="font-headline-md text-headline-md">{firstString(item.value)}</span>
                ) : (
                  <MissingOptional label="annotation value" />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-12 pl-0 lg:col-span-7 lg:pl-stack-lg">
          <div className="relative bg-primary-container p-stack-lg">
            <div className="absolute left-0 top-0 h-full w-1 bg-on-primary-container/20" />
            {diagramLabel ? (
              <span className="mb-4 block font-label-sm text-label-sm text-on-primary-container/60">
                {diagramLabel}
              </span>
            ) : (
              <MissingOptional label="diagram label" />
            )}
            <div className="flex h-64 items-center justify-center border border-on-primary-container/10 p-8">
              <div className="flex w-full flex-col gap-4">
                <div className="flex h-24 gap-4">
                  <div className="flex flex-1 items-center justify-center border border-on-primary-container/30 font-label-sm text-label-sm">
                    {firstString(application?.label, application?.title) ?? (
                      <MissingOptional label="application node" />
                    )}
                  </div>
                  <div className="flex flex-1 items-center justify-center border border-on-primary-container/30 font-label-sm text-label-sm">
                    {firstString(safety?.label, safety?.title) ?? <MissingOptional label="safety node" />}
                  </div>
                </div>
                <div className="h-1 bg-on-primary-container/50" />
                <div className="flex h-20 items-center justify-center border border-on-primary-container/30 bg-on-primary-container/5 font-headline-md text-headline-md">
                  {firstString(microkernel?.label, microkernel?.title) ?? (
                    <MissingOptional label="microkernel node" />
                  )}
                </div>
                <div className="flex h-12 items-center justify-center border border-dashed border-on-primary-container/30 font-label-sm text-label-sm">
                  {firstString(hal?.label, hal?.title) ?? <MissingOptional label="HAL node" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CcoCtaAdapter({ section }: { section: PreviewSectionPayload }) {
  const [primary, secondary] = section.actions;
  const title = headingOf(section.data) ?? "";
  const split = title.match(/^(.*? your)\s+(.+)$/i);
  const watermark = asString(section.data.watermark);

  return (
    <section className="relative overflow-hidden bg-background py-stack-lg">
      <div className="relative z-10 mx-auto max-w-container-max px-margin-desktop text-center">
        {title ? (
          <h2 className="mb-stack-md font-display-lg text-headline-lg md:text-display-lg">
            {split ? (
              <>
                {split[1]}
                <br />
                {split[2]}
              </>
            ) : (
              title
            )}
          </h2>
        ) : (
          <MissingOptional label="title" />
        )}
        <div className="mt-stack-lg flex flex-col justify-center gap-stack-md md:flex-row">
          {primary ? (
            <Link
              href={primary.href}
              className="bg-primary px-10 py-4 font-label-sm text-label-sm text-on-primary transition-all hover:scale-[1.02]"
            >
              {primary.label}
            </Link>
          ) : (
            <MissingOptional label="primary action" />
          )}
          {secondary ? (
            <Link
              href={secondary.href}
              className="border border-outline px-10 py-4 font-label-sm text-label-sm transition-all hover:bg-surface-container"
            >
              {secondary.label}
            </Link>
          ) : (
            <MissingOptional label="secondary action" />
          )}
        </div>
      </div>
      <div className="pointer-events-none absolute left-0 top-0 flex h-full w-full justify-center opacity-[0.03]">
        {watermark ? (
          <span className="select-none text-[400px] font-bold">{watermark}</span>
        ) : (
          <MissingOptional label="watermark" />
        )}
      </div>
    </section>
  );
}

export function CcoRelatedAdapter({ section }: { section: PreviewSectionPayload }) {
  const navHref = section.actions[0]?.href ?? section.cards[0]?.href;

  return (
    <section className="border-t border-outline-variant/10 py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="mb-stack-lg flex items-center justify-between">
          {headingOf(section.data) ? (
            <h3 className="font-headline-md text-headline-md">{headingOf(section.data)}</h3>
          ) : (
            <MissingOptional label="heading" />
          )}
          <div className="flex gap-2">
            {navHref ? (
              <>
                <Link
                  href={navHref}
                  className="border border-outline-variant p-2 transition-colors hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </Link>
                <Link
                  href={navHref}
                  className="border border-outline-variant p-2 transition-colors hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </Link>
              </>
            ) : (
              <MissingOptional label="related navigation" />
            )}
          </div>
        </div>
        {section.cards.length === 0 ? <MissingOptional label="related project cards" /> : null}
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
          {section.cards.map((card) => (
            <div key={card.title} className="group cursor-pointer">
              <div className="mb-4 h-48 overflow-hidden">
                {card.imageUrl ? (
                  <StitchImage
                    src={card.imageUrl}
                    alt={card.imageAlt ?? ""}
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105"
                  />
                ) : (
                  <MissingMedia message={`${card.title} image`} />
                )}
              </div>
              <h4 className="mb-1 font-headline-md text-headline-md">{card.title}</h4>
              {card.body ? (
                <p className="font-body-md text-on-surface-variant">{card.body}</p>
              ) : (
                <MissingOptional label={`${card.title} body`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EmChallengesAdapter({ section }: { section: PreviewSectionPayload }) {
  const featured = section.cards.find((card) => card.metrics?.length) ?? section.cards[2];
  const rest = section.cards.filter((card) => card !== featured);
  const [peak, carbon] = rest;

  return (
    <section className="bg-surface-container-low py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="mb-stack-md">
          {eyebrowOf(section.data) ? (
            <p className="mb-2 font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary">
              {eyebrowOf(section.data)}
            </p>
          ) : (
            <MissingOptional label="eyebrow" />
          )}
          {headingOf(section.data) ? (
            <h2 className="max-w-2xl font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
          ) : (
            <MissingOptional label="heading" />
          )}
        </div>
        <div className="grid grid-cols-12 gap-gutter">
          {peak ? (
            <div className="group relative col-span-12 overflow-hidden border border-outline-variant/20 bg-white p-10 transition-all hover:border-primary technical-glow md:col-span-8">
              <div className="flex h-full flex-col justify-between gap-12">
                <div>
                  {peak.icon ? (
                    <span className="material-symbols-outlined mb-6 text-4xl text-primary">{peak.icon}</span>
                  ) : (
                    <MissingOptional label="peak icon" />
                  )}
                  <h3 className="mb-4 font-headline-md text-headline-md">{peak.title}</h3>
                  {peak.body ? (
                    <p className="max-w-md font-body-md text-body-md text-on-surface-variant">{peak.body}</p>
                  ) : (
                    <MissingOptional label="peak body" />
                  )}
                </div>
                {peak.badges?.length ? (
                  <div className="flex items-center gap-4">
                    {peak.badges.map((badge) => (
                      <span
                        key={badge}
                        className="bg-surface-container px-3 py-1 font-label-sm text-label-sm text-on-surface"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                ) : (
                  <MissingOptional label="peak badges" />
                )}
              </div>
              <div className="absolute bottom-0 right-0 opacity-10 transition-opacity group-hover:opacity-20">
                <span className="material-symbols-outlined translate-x-1/4 translate-y-1/4 text-[120px]">speed</span>
              </div>
            </div>
          ) : (
            <MissingOptional label="peak shaving card" />
          )}
          {carbon ? (
            <div className="col-span-12 flex flex-col justify-center border border-outline-variant/20 bg-white p-10 md:col-span-4">
              <h3 className="mb-4 font-headline-md text-headline-md">{carbon.title}</h3>
              {carbon.body ? (
                <p className="font-body-md text-body-md text-on-surface-variant">{carbon.body}</p>
              ) : (
                <MissingOptional label="carbon body" />
              )}
            </div>
          ) : (
            <MissingOptional label="carbon reporting card" />
          )}
          {featured ? (
            <div className="col-span-12 flex flex-col items-center justify-between gap-8 bg-primary p-12 text-on-primary lg:flex-row">
              <div className="max-w-xl">
                <h3 className="mb-4 font-headline-md text-headline-md">{featured.title}</h3>
                {featured.body ? (
                  <p className="font-body-md text-body-md opacity-70">{featured.body}</p>
                ) : (
                  <MissingOptional label="featured body" />
                )}
              </div>
              {featured.metrics?.length ? (
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                  {featured.metrics.map((metric) => (
                    <div key={`${metric.value}-${metric.label}`} className="text-center">
                      <div className="font-display-lg text-headline-lg text-secondary-fixed">{metric.value}</div>
                      <div className="font-label-sm text-label-sm opacity-50">{metric.label}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <MissingOptional label="featured metrics" />
              )}
            </div>
          ) : (
            <MissingOptional label="featured challenge" />
          )}
        </div>
      </div>
    </section>
  );
}

export function EmHardwareAdapter({ section }: { section: PreviewSectionPayload }) {
  const callouts = Array.isArray(section.data.callouts)
    ? section.data.callouts.map(asRecord)
    : [];
  const badge = firstString(callouts[0]?.label, callouts[0]?.title);

  return (
    <section className="py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="grid grid-cols-12 items-center gap-gutter">
          <div className="col-span-12 space-y-stack-md lg:col-span-5">
            {eyebrowOf(section.data) ? (
              <p className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary">
                {eyebrowOf(section.data)}
              </p>
            ) : (
              <MissingOptional label="eyebrow" />
            )}
            {headingOf(section.data) ? (
              <h2 className="font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
            ) : (
              <MissingOptional label="heading" />
            )}
            {section.cards.length === 0 ? <MissingOptional label="framework items" /> : null}
            <div className="space-y-8">
              {section.cards.map((card) => (
                <div key={card.title} className="flex gap-6">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-primary text-on-primary">
                    {card.icon ? (
                      <span className="material-symbols-outlined">{card.icon}</span>
                    ) : (
                      <MissingOptional label={`${card.title} icon`} />
                    )}
                  </div>
                  <div>
                    <h4 className="mb-2 font-label-sm text-label-sm font-bold">{card.title}</h4>
                    {card.body ? (
                      <p className="text-on-surface-variant">{card.body}</p>
                    ) : (
                      <MissingOptional label={`${card.title} body`} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <div className="relative aspect-video overflow-hidden bg-surface-container">
              {section.media.url ? (
                <StitchImage
                  src={section.media.url}
                  alt={section.media.alt ?? ""}
                  className="h-full w-full object-cover"
                />
              ) : (
                <MissingMedia message={section.media.missing ?? "hardware image"} />
              )}
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
              <div className="absolute left-8 top-8">
                {badge ? (
                  <div className="glass-card border border-white/20 px-4 py-2">
                    <span className="font-mono font-label-sm text-label-sm text-primary">{badge}</span>
                  </div>
                ) : (
                  <MissingOptional label="hardware badge" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EmTechAdapter({ section }: { section: PreviewSectionPayload }) {
  const nodes = Array.isArray(section.data.nodes)
    ? section.data.nodes.map(asRecord)
    : [];

  return (
    <section className="border-y border-outline-variant/10 py-stack-md">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        {nodes.length === 0 ? <MissingOptional label="technology nodes" /> : null}
        <div className="flex flex-wrap items-center justify-between gap-8 opacity-40 grayscale transition-all duration-700 hover:grayscale-0">
          {nodes.map((node) => {
            const label = firstString(node.label, node.title);
            const icon = firstString(node.icon);
            return (
              <div key={firstString(node.id, label)} className="flex items-center gap-3">
                {icon ? (
                  <span className="material-symbols-outlined text-4xl">{icon}</span>
                ) : (
                  <MissingOptional label={`${label} icon`} />
                )}
                {label ? (
                  <span className="font-display-lg text-headline-md">{label}</span>
                ) : (
                  <MissingOptional label="technology label" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function EmCaseAdapter({ section }: { section: PreviewSectionPayload }) {
  const action = section.actions[0];

  return (
    <section className="py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="group relative cursor-pointer overflow-hidden bg-primary text-on-primary">
          <div className="absolute inset-0 opacity-40 transition-transform duration-1000 group-hover:scale-105">
            {section.media.url ? (
              <StitchImage
                src={section.media.url}
                alt={section.media.alt ?? ""}
                className="h-full w-full object-cover"
              />
            ) : (
              <MissingMedia message={section.media.missing ?? "case study image"} />
            )}
          </div>
          <div className="relative z-10 grid grid-cols-12 gap-gutter p-margin-desktop">
            <div className="col-span-12 space-y-stack-md lg:col-span-6">
              {eyebrowOf(section.data) ? (
                <span className="inline-block bg-secondary px-3 py-1 font-label-sm text-label-sm text-on-secondary">
                  {eyebrowOf(section.data)}
                </span>
              ) : (
                <MissingOptional label="eyebrow" />
              )}
              {headingOf(section.data) ? (
                <h2 className="font-display-lg text-headline-lg leading-none">{headingOf(section.data)}</h2>
              ) : (
                <MissingOptional label="heading" />
              )}
              {bodyOf(section.data) ? (
                <p className="font-body-lg text-body-lg opacity-80">{bodyOf(section.data)}</p>
              ) : (
                <MissingOptional label="body" />
              )}
              {action ? (
                <Link
                  href={action.href}
                  className="flex items-center gap-2 font-label-sm text-label-sm transition-all group-hover:gap-4"
                >
                  {action.label}
                  <span className="material-symbols-outlined">north_east</span>
                </Link>
              ) : (
                <MissingOptional label="action" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EmCapabilitiesAdapter({ section }: { section: PreviewSectionPayload }) {
  return (
    <section className="bg-surface py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        {section.cards.length === 0 ? <MissingOptional label="capability cards" /> : null}
        <div className="grid grid-cols-1 gap-stack-lg md:grid-cols-2">
          {section.cards.map((card) => (
            <div key={card.title} className="space-y-4">
              <h3 className="border-b border-outline-variant/30 pb-4 font-headline-md text-headline-md">
                {card.title}
              </h3>
              {card.body ? (
                <p className="font-body-md text-on-surface-variant">{card.body}</p>
              ) : (
                <MissingOptional label={`${card.title} body`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EmCtaAdapter({ section }: { section: PreviewSectionPayload }) {
  const [primary, secondary] = section.actions;

  return (
    <section className="py-stack-lg">
      <div className="mx-auto max-w-container-max bg-primary-container p-stack-lg px-margin-desktop text-center text-on-primary-container">
        <div className="mx-auto max-w-2xl space-y-stack-md">
          {headingOf(section.data) ? (
            <h2 className="font-display-lg text-display-lg leading-tight">{headingOf(section.data)}</h2>
          ) : (
            <MissingOptional label="title" />
          )}
          {bodyOf(section.data) ? (
            <p className="text-body-lg opacity-70">{bodyOf(section.data)}</p>
          ) : (
            <MissingOptional label="body" />
          )}
          <div className="flex flex-col justify-center gap-4 pt-8 sm:flex-row">
            {primary ? (
              <Link
                href={primary.href}
                className="bg-surface px-10 py-5 font-label-sm text-label-sm text-primary transition-all hover:bg-secondary-container"
              >
                {primary.label}
              </Link>
            ) : (
              <MissingOptional label="primary action" />
            )}
            {secondary ? (
              <Link
                href={secondary.href}
                className="border border-white/20 px-10 py-5 font-label-sm text-label-sm text-white transition-all hover:bg-white/10"
              >
                {secondary.label}
              </Link>
            ) : (
              <MissingOptional label="secondary action" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function EnvChallengesAdapter({ section }: { section: PreviewSectionPayload }) {
  return (
    <section className="mx-auto max-w-container-max px-margin-desktop py-stack-lg">
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-12">
        <div className="mb-stack-md md:col-span-12">
          {headingOf(section.data) ? (
            <h2 className="font-headline-lg text-headline-lg text-primary">{headingOf(section.data)}</h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          <div className="mt-4 h-1 w-24 bg-primary" />
        </div>
        {section.cards.length === 0 ? <MissingOptional label="cards" /> : null}
        {section.cards.map((card) => (
          <div
            key={card.title}
            className="technical-glow group flex flex-col justify-between border border-outline-variant/20 bg-white p-8 transition-all duration-300 md:col-span-4"
          >
            <div>
              {card.icon ? (
                <span className="material-symbols-outlined mb-6 text-4xl text-primary">{card.icon}</span>
              ) : (
                <MissingOptional label="icon" />
              )}
              <h3 className="mb-4 font-headline-md text-headline-md text-primary">{card.title}</h3>
              {card.body ? (
                <p className="font-body-md text-body-md text-on-surface-variant">{card.body}</p>
              ) : (
                <MissingOptional label="body" />
              )}
            </div>
            <div className="mt-8 text-primary transition-transform group-hover:translate-x-2">
              <span className="material-symbols-outlined">arrow_forward</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function envProgressWidth(value?: string): string | undefined {
  if (!value) return undefined;
  const match = value.match(/(\d+(?:\.\d+)?)\s*%/);
  return match ? `${match[1]}%` : undefined;
}

export function EnvInfrastructureAdapter({ section }: { section: PreviewSectionPayload }) {
  const nodes = Array.isArray(section.data.nodes) ? section.data.nodes.map(asRecord) : [];
  const probes = nodes.filter((node) => firstString(node.description));
  const architecture = nodes.filter(
    (node) => firstString(node.annotation) && !firstString(node.description)
  );
  const annotations = Array.isArray(section.data.annotations)
    ? section.data.annotations.map(asRecord)
    : [];
  const integrity = annotations[0];
  const integrityLabel = firstString(integrity?.label);
  const integrityWidth = envProgressWidth(firstString(integrity?.value));

  return (
    <section className="overflow-hidden bg-surface-container py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="flex flex-col items-center gap-gutter lg:flex-row">
          <div className="space-y-stack-md lg:w-1/2">
            {headingOf(section.data) ? (
              <h2 className="font-headline-lg text-headline-lg text-primary">
                {headingOf(section.data)}
              </h2>
            ) : (
              <MissingOptional label="heading" />
            )}
            {firstString(section.data.introduction, section.data.body) ? (
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                {firstString(section.data.introduction, section.data.body)}
              </p>
            ) : (
              <MissingOptional label="introduction" />
            )}
            {probes.length === 0 ? <MissingOptional label="probe nodes" /> : null}
            <ul className="space-y-4">
              {probes.map((node, index) => (
                <li
                  key={firstString(node.id, node.label) ?? index}
                  className={`flex items-start gap-4 border-l-4 bg-white p-4 ${
                    index === 0 ? "border-primary" : "border-outline-variant"
                  }`}
                >
                  {firstString(node.icon) ? (
                    <span className="material-symbols-outlined mt-1">{firstString(node.icon)}</span>
                  ) : (
                    <MissingOptional label="probe icon" />
                  )}
                  <div>
                    {firstString(node.label, node.title) ? (
                      <h4 className="font-headline-md text-[18px] font-bold">
                        {firstString(node.label, node.title)}
                      </h4>
                    ) : (
                      <MissingOptional label="probe label" />
                    )}
                    {firstString(node.description) ? (
                      <p className="text-label-sm text-on-surface-variant">
                        {firstString(node.description)}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative lg:w-1/2">
            <div className="relative flex aspect-square items-center justify-center bg-primary-container p-8">
              <div className="glass-card flex h-full w-full flex-col p-12 text-on-primary">
                <h4 className="mb-8 font-label-sm uppercase tracking-widest opacity-60">
                  System Architecture
                </h4>
                {architecture.length === 0 ? <MissingOptional label="architecture nodes" /> : null}
                <div className="flex-1 space-y-8">
                  {architecture.map((node, index) => (
                    <div
                      key={firstString(node.id, node.label) ?? index}
                      className="flex justify-between border-b border-white/10 pb-4"
                    >
                      {firstString(node.label, node.title) ? (
                        <span className="font-label-sm">{firstString(node.label, node.title)}</span>
                      ) : (
                        <MissingOptional label="architecture label" />
                      )}
                      {firstString(node.annotation) ? (
                        <span className="font-label-sm text-secondary-fixed">
                          {firstString(node.annotation)}
                        </span>
                      ) : (
                        <MissingOptional label="architecture annotation" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-primary p-6">
                  {integrityLabel ? (
                    <p className="mb-2 font-label-sm uppercase tracking-tighter">{integrityLabel}</p>
                  ) : (
                    <MissingOptional label="integrity label" />
                  )}
                  <div className="h-1 w-full bg-white/20">
                    {integrityWidth ? (
                      <div className="h-full bg-secondary-fixed" style={{ width: integrityWidth }} />
                    ) : (
                      <MissingOptional label="integrity value" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EnvCaseAdapter({ section }: { section: PreviewSectionPayload }) {
  const callouts = Array.isArray(section.data.callouts)
    ? section.data.callouts.map(asRecord)
    : [];
  const metrics = callouts.filter((item) => firstString(item.value));
  const expertise = callouts.filter((item) => firstString(item.title));
  const [action] = section.actions;

  return (
    <section className="mx-auto max-w-container-max px-margin-desktop py-stack-lg">
      <div className="grid grid-cols-1 gap-stack-lg md:grid-cols-2">
        <div>
          {eyebrowOf(section.data) ? (
            <span className="font-label-sm uppercase tracking-widest text-on-primary-container">
              {eyebrowOf(section.data)}
            </span>
          ) : (
            <MissingOptional label="eyebrow" />
          )}
          {headingOf(section.data) ? (
            <h2 className="mb-6 mt-4 font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {section.media.url ? (
            <div
              className="mb-6 aspect-video w-full border border-outline-variant bg-cover bg-center"
              role="img"
              aria-label={section.media.alt ?? ""}
              style={{ backgroundImage: `url('${section.media.url}')` }}
            />
          ) : (
            <MissingMedia message={section.media.missing ?? "case study image not resolved"} />
          )}
          {bodyOf(section.data) ? (
            <p className="mb-6 font-body-md text-body-md text-on-surface-variant">
              {bodyOf(section.data)}
            </p>
          ) : (
            <MissingOptional label="body" />
          )}
          {metrics.length === 0 ? <MissingOptional label="metrics" /> : null}
          <div className="grid grid-cols-3 gap-4 border-t border-outline-variant/30 pt-6">
            {metrics.map((item, index) => (
              <div key={`${firstString(item.label)}-${index}`}>
                <p className="text-headline-md font-bold text-primary">{firstString(item.value)}</p>
                {firstString(item.label) ? (
                  <p className="text-label-sm text-on-surface-variant">{firstString(item.label)}</p>
                ) : (
                  <MissingOptional label="metric label" />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col bg-primary-container p-12 text-on-primary">
          <h3 className="mb-8 font-headline-lg text-headline-lg">Technical Expertise</h3>
          {expertise.length === 0 ? <MissingOptional label="expertise items" /> : null}
          <div className="flex-1 space-y-10">
            {expertise.map((item, index) => (
              <div key={`${firstString(item.title)}-${index}`} className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/20">
                  {firstString(item.icon) ? (
                    <span className="material-symbols-outlined">{firstString(item.icon)}</span>
                  ) : (
                    <MissingOptional label="expertise icon" />
                  )}
                </div>
                <div>
                  <h4 className="mb-2 font-headline-md text-headline-md">{firstString(item.title)}</h4>
                  {firstString(item.body) ? (
                    <p className="font-body-md text-on-primary-container">{firstString(item.body)}</p>
                  ) : (
                    <MissingOptional label="expertise body" />
                  )}
                </div>
              </div>
            ))}
          </div>
          {action ? (
            <Link
              href={action.href}
              className="mt-12 w-full bg-white py-4 font-label-sm text-label-sm uppercase tracking-widest text-primary transition-colors hover:bg-secondary-fixed"
            >
              {action.label}
            </Link>
          ) : (
            <MissingOptional label="action" />
          )}
        </div>
      </div>
    </section>
  );
}

export function EnvCtaAdapter({ section }: { section: PreviewSectionPayload }) {
  const [primary] = section.actions;

  return (
    <section className="relative overflow-hidden bg-surface py-24">
      <div className="relative z-10 mx-auto max-w-container-max px-margin-desktop text-center">
        {headingOf(section.data) ? (
          <h2 className="mb-8 font-display-lg text-display-lg text-primary">
            {headingOf(section.data)}
          </h2>
        ) : (
          <MissingOptional label="title" />
        )}
        {bodyOf(section.data) ? (
          <p className="mx-auto mb-12 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
            {bodyOf(section.data)}
          </p>
        ) : (
          <MissingOptional label="body" />
        )}
        {primary ? (
          <Link
            href={primary.href}
            className="technical-glow bg-primary px-12 py-5 font-label-sm text-label-sm text-on-primary transition-all duration-300 hover:scale-105"
          >
            {primary.label}
          </Link>
        ) : (
          <MissingOptional label="action" />
        )}
      </div>
      <div className="absolute left-1/2 top-1/2 -z-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-fixed/30 blur-[120px]" />
    </section>
  );
}

export function IcArchitectureAdapter({ section }: { section: PreviewSectionPayload }) {
  const records = Array.isArray(section.data.cards) ? section.data.cards.map(asRecord) : [];
  const [core, galvanic, cycle, safety] = records;
  const coreImage = firstString(asRecord(core?.media).source, core?.imageUrl);
  const coreAlt = firstString(core?.mediaAlt, asRecord(core?.media).alt) ?? "";
  const cycleValue = firstString(cycle?.value);
  const safetyValue = firstString(safety?.value);

  return (
    <section className="bg-surface-container-lowest py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="mb-stack-lg text-center">
          {headingOf(section.data) ? (
            <h2 className="mb-stack-sm font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {firstString(section.data.introduction, section.data.body) ? (
            <p className="mx-auto max-w-2xl font-body-md text-body-md text-on-surface-variant">
              {firstString(section.data.introduction, section.data.body)}
            </p>
          ) : (
            <MissingOptional label="introduction" />
          )}
        </div>
        <div className="grid h-auto grid-cols-1 grid-rows-2 gap-gutter md:h-[600px] md:grid-cols-12">
          {core ? (
            <div className="glass-card flex flex-col justify-between rounded-xl p-stack-lg md:col-span-7">
              <div>
                {firstString(core.icon) ? (
                  <span className="material-symbols-outlined mb-stack-sm text-primary">
                    {firstString(core.icon)}
                  </span>
                ) : (
                  <MissingOptional label="core icon" />
                )}
                {firstString(core.title) ? (
                  <h3 className="mb-stack-sm font-headline-md text-headline-md">
                    {firstString(core.title)}
                  </h3>
                ) : (
                  <MissingOptional label="core title" />
                )}
                {firstString(core.body) ? (
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {firstString(core.body)}
                  </p>
                ) : (
                  <MissingOptional label="core body" />
                )}
              </div>
              <div className="mt-stack-lg h-48 overflow-hidden rounded-lg border border-outline-variant/30">
                {coreImage ? (
                  <StitchImage
                    src={coreImage}
                    alt={coreAlt}
                    className="h-full w-full object-cover opacity-80"
                  />
                ) : (
                  <MissingMedia message="processing core image not resolved" />
                )}
              </div>
            </div>
          ) : (
            <MissingOptional label="processing core card" />
          )}
          {galvanic ? (
            <div className="glass-card flex flex-col rounded-xl p-stack-lg md:col-span-5">
              {firstString(galvanic.icon) ? (
                <span className="material-symbols-outlined mb-stack-sm text-primary">
                  {firstString(galvanic.icon)}
                </span>
              ) : (
                <MissingOptional label="galvanic icon" />
              )}
              {firstString(galvanic.title) ? (
                <h3 className="mb-stack-sm font-headline-md text-headline-md">
                  {firstString(galvanic.title)}
                </h3>
              ) : (
                <MissingOptional label="galvanic title" />
              )}
              {firstString(galvanic.body) ? (
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {firstString(galvanic.body)}
                </p>
              ) : (
                <MissingOptional label="galvanic body" />
              )}
              <div className="mt-auto flex gap-2 pt-stack-md">
                <div className="h-1 w-full overflow-hidden rounded-full bg-primary/20">
                  <div className="h-full w-3/4 bg-primary" />
                </div>
              </div>
            </div>
          ) : (
            <MissingOptional label="galvanic card" />
          )}
          {cycle ? (
            <div className="glass-card rounded-xl p-stack-lg md:col-span-4">
              {firstString(cycle.title) ? (
                <h4 className="mb-base font-label-sm text-label-sm uppercase text-on-surface-variant">
                  {firstString(cycle.title)}
                </h4>
              ) : (
                <MissingOptional label="cycle label" />
              )}
              {cycleValue ? (
                <p className="text-[48px] font-display-lg font-semibold text-primary">{cycleValue}</p>
              ) : (
                <MissingOptional label="cycle value" />
              )}
              {firstString(cycle.body) ? (
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {firstString(cycle.body)}
                </p>
              ) : (
                <MissingOptional label="cycle body" />
              )}
            </div>
          ) : (
            <MissingOptional label="cycle time card" />
          )}
          {safety ? (
            <div className="glass-card flex items-center gap-gutter rounded-xl p-stack-lg md:col-span-8">
              <div className="flex-1">
                {firstString(safety.title) ? (
                  <h3 className="mb-base font-headline-md text-headline-md">{firstString(safety.title)}</h3>
                ) : (
                  <MissingOptional label="safety title" />
                )}
                {firstString(safety.body) ? (
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {firstString(safety.body)}
                  </p>
                ) : (
                  <MissingOptional label="safety body" />
                )}
              </div>
              <div className="flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary/10">
                {safetyValue ? (
                  <span className="font-display-lg text-primary">{safetyValue}</span>
                ) : (
                  <MissingOptional label="safety value" />
                )}
              </div>
            </div>
          ) : (
            <MissingOptional label="safety card" />
          )}
        </div>
      </div>
    </section>
  );
}

export function IcConnectivityAdapter({ section }: { section: PreviewSectionPayload }) {
  const items = Array.isArray(section.data.items) ? section.data.items.map(asRecord) : [];
  const protocols = items.filter((item) => !firstString(item.description, item.body));
  const applications = items.filter((item) => firstString(item.description, item.body));

  return (
    <section className="py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="mb-stack-lg flex flex-col items-end justify-between gap-stack-md md:flex-row">
          <div className="max-w-xl">
            {headingOf(section.data) ? (
              <h2 className="mb-stack-sm font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
            ) : (
              <MissingOptional label="heading" />
            )}
            {firstString(section.data.introduction, section.data.body) ? (
              <p className="font-body-md text-body-md text-on-surface-variant">
                {firstString(section.data.introduction, section.data.body)}
              </p>
            ) : (
              <MissingOptional label="introduction" />
            )}
          </div>
          <div className="flex gap-stack-sm">
            {protocols.length === 0 ? <MissingOptional label="protocols" /> : null}
            {protocols.map((item, index) => (
              <span
                key={`${firstString(item.label)}-${index}`}
                className="rounded border border-outline-variant px-stack-md py-stack-sm font-label-sm text-label-sm"
              >
                {firstString(item.label, item.title)}
              </span>
            ))}
          </div>
        </div>
        {applications.length === 0 ? <MissingOptional label="applications" /> : null}
        <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4">
          {applications.map((item, index) => (
            <div
              key={`${firstString(item.label)}-${index}`}
              className="border-l border-outline-variant p-stack-md transition-colors hover:border-primary"
            >
              {firstString(item.label, item.title) ? (
                <h4 className="mb-base font-headline-md text-headline-md">
                  {firstString(item.label, item.title)}
                </h4>
              ) : (
                <MissingOptional label="application title" />
              )}
              {firstString(item.description, item.body) ? (
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {firstString(item.description, item.body)}
                </p>
              ) : (
                <MissingOptional label="application body" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IcCtaAdapter({ section }: { section: PreviewSectionPayload }) {
  const actions = labeledActions(section);
  const [primary, secondary] = actions;

  return (
    <section className="py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="relative overflow-hidden rounded-3xl bg-primary-container p-stack-lg text-on-primary-container">
          <div className="pointer-events-none absolute inset-0 technical-grid opacity-10" />
          <div className="relative z-10 grid items-center gap-stack-lg md:grid-cols-2">
            <div>
              {eyebrowOf(section.data) ? (
                <h2 className="mb-stack-sm font-headline-lg text-headline-lg text-on-surface-variant/20">
                  {eyebrowOf(section.data)}
                </h2>
              ) : (
                <MissingOptional label="eyebrow" />
              )}
              {headingOf(section.data) ? (
                <p className="mb-stack-md font-display-lg text-headline-lg text-white">
                  {headingOf(section.data)}
                </p>
              ) : (
                <MissingOptional label="title" />
              )}
              <div className="flex gap-stack-sm">
                {primary ? (
                  primary.href ? (
                    <Link
                      href={primary.href}
                      className="rounded-lg bg-surface-container-lowest px-stack-lg py-stack-sm font-label-sm text-label-sm text-primary transition-transform hover:scale-105"
                    >
                      {primary.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="rounded-lg bg-surface-container-lowest px-stack-lg py-stack-sm font-label-sm text-label-sm text-primary transition-transform hover:scale-105"
                    >
                      {primary.label}
                    </button>
                  )
                ) : (
                  <MissingOptional label="primary action" />
                )}
                {secondary ? (
                  secondary.href ? (
                    <Link
                      href={secondary.href}
                      className="rounded-lg border border-on-primary-container/30 px-stack-lg py-stack-sm font-label-sm text-label-sm text-white transition-colors hover:bg-white/10"
                    >
                      {secondary.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="rounded-lg border border-on-primary-container/30 px-stack-lg py-stack-sm font-label-sm text-label-sm text-white transition-colors hover:bg-white/10"
                    >
                      {secondary.label}
                    </button>
                  )
                ) : (
                  <MissingOptional label="secondary action" />
                )}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="glass-card aspect-video overflow-hidden rounded-xl border-white/10 p-stack-sm">
                {section.media.url ? (
                  <StitchImage
                    src={section.media.url}
                    alt={section.media.alt ?? ""}
                    className="h-full w-full rounded-lg object-cover"
                  />
                ) : (
                  <MissingMedia message={section.media.missing ?? "upgrade image not resolved"} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function splitStat(value?: string): { amount: string; unit: string } | undefined {
  if (!value) return undefined;
  const match = value.match(/^(-?[\d.]+)(.*)$/);
  if (!match) return { amount: value, unit: "" };
  return { amount: match[1], unit: match[2] };
}

function mediaEntries(data: Record<string, unknown>): { url: string; alt?: string }[] {
  if (Array.isArray(data.media)) {
    return data.media
      .map((item) => {
        const record = asRecord(item);
        const url = firstString(record.source, record.url, record.imageUrl);
        if (!url) return null;
        return { url, alt: firstString(record.alt, record.mediaAlt) };
      })
      .filter((item): item is { url: string; alt?: string } => Boolean(item));
  }
  const single = asRecord(data.media);
  const url = firstString(single.source, single.url, data.imageUrl);
  return url ? [{ url, alt: firstString(data.mediaAlt, data.imageAlt, single.alt) }] : [];
}

export function EspCapabilitiesAdapter({ section }: { section: PreviewSectionPayload }) {
  const [dual, core, power, rf, peripherals] = section.cards;

  return (
    <section className="bg-surface-container-low py-stack-lg">
      <div className="container mx-auto max-w-container-max px-margin-desktop">
        <div className="mb-stack-lg">
          {headingOf(section.data) ? (
            <h2 className="mb-2 font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          <div className="h-1 w-24 bg-primary" />
        </div>
        {section.cards.length === 0 ? <MissingOptional label="cards" /> : null}
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3 lg:grid-cols-4">
          {dual ? (
            <div className="technical-glow flex flex-col justify-between border border-outline-variant/10 bg-surface-container-highest p-stack-md transition-all md:col-span-2 lg:col-span-2">
              <div>
                {dual.icon ? (
                  <span className="material-symbols-outlined mb-4 text-4xl text-primary">{dual.icon}</span>
                ) : (
                  <MissingOptional label="dual icon" />
                )}
                <h3 className="mb-2 font-headline-md text-headline-md">{dual.title}</h3>
                {dual.body ? (
                  <p className="font-body-md text-on-surface-variant">{dual.body}</p>
                ) : (
                  <MissingOptional label="dual body" />
                )}
              </div>
              {dual.badges?.length ? (
                <div className="mt-8 flex gap-4">
                  {dual.badges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded border border-outline-variant/30 bg-surface px-2 py-1 font-label-sm text-[10px] uppercase"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              ) : (
                <MissingOptional label="dual badges" />
              )}
            </div>
          ) : (
            <MissingOptional label="dual connectivity card" />
          )}
          {core ? (
            <div className="technical-glow border border-outline-variant/10 bg-surface-container-highest p-stack-md transition-all">
              {core.icon ? (
                <span className="material-symbols-outlined mb-4 text-4xl text-primary">{core.icon}</span>
              ) : (
                <MissingOptional label="core icon" />
              )}
              <h3 className="mb-2 font-headline-md text-headline-md">{core.title}</h3>
              {core.body ? (
                <p className="font-body-md text-on-surface-variant">{core.body}</p>
              ) : (
                <MissingOptional label="core body" />
              )}
            </div>
          ) : (
            <MissingOptional label="dual-core card" />
          )}
          {power ? (
            <div className="technical-glow border border-outline-variant/10 bg-surface-container-highest p-stack-md transition-all">
              {power.icon ? (
                <span className="material-symbols-outlined mb-4 text-4xl text-primary">{power.icon}</span>
              ) : (
                <MissingOptional label="power icon" />
              )}
              <h3 className="mb-2 font-headline-md text-headline-md">{power.title}</h3>
              {power.body ? (
                <p className="font-body-md text-on-surface-variant">{power.body}</p>
              ) : (
                <MissingOptional label="power body" />
              )}
            </div>
          ) : (
            <MissingOptional label="ultra-low power card" />
          )}
          {rf ? (
            <div className="flex flex-col justify-between bg-primary p-stack-md text-on-primary lg:col-span-2">
              <div>
                <h3 className="mb-4 font-headline-md text-headline-md">{rf.title}</h3>
                {rf.body ? (
                  <p className="mb-6 font-body-md opacity-80">{rf.body}</p>
                ) : (
                  <MissingOptional label="rf body" />
                )}
              </div>
              {rf.metrics?.length ? (
                <div className="flex items-center gap-4">
                  {rf.metrics.map((metric, index) => (
                    <div key={`${metric.label}-${index}`} className="flex items-center gap-4">
                      {index > 0 ? <div className="h-8 w-px bg-on-primary/20" /> : null}
                      <div className="flex flex-col">
                        <span className="font-label-sm text-[10px] uppercase opacity-60">{metric.label}</span>
                        <span className="font-headline-md">{metric.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <MissingOptional label="rf metrics" />
              )}
            </div>
          ) : (
            <MissingOptional label="rf card" />
          )}
          {peripherals ? (
            <div className="relative overflow-hidden border border-outline-variant/10 bg-surface-container-highest p-stack-md group md:col-span-2 lg:col-span-2">
              <div className="relative z-10">
                <h3 className="mb-2 font-headline-md text-headline-md">{peripherals.title}</h3>
                {peripherals.body ? (
                  <p className="mb-4 font-body-md text-on-surface-variant">{peripherals.body}</p>
                ) : (
                  <MissingOptional label="peripherals body" />
                )}
                {peripherals.items?.length ? (
                  <ul className="grid grid-cols-2 gap-2 font-label-sm text-label-sm">
                    {peripherals.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <MissingOptional label="peripheral items" />
                )}
              </div>
            </div>
          ) : (
            <MissingOptional label="peripherals card" />
          )}
        </div>
      </div>
    </section>
  );
}

export function EspCoreAdapter({ section }: { section: PreviewSectionPayload }) {
  const bullets = Array.isArray(section.data.bullets)
    ? section.data.bullets.map(asRecord)
    : section.cards.map((card) => ({ title: card.title, body: card.body }));
  const callouts = Array.isArray(section.data.callouts)
    ? section.data.callouts.map(asRecord)
    : [];
  const overlay = callouts[0];
  const overlayEyebrow = firstString(overlay?.eyebrow);
  const overlayTitle = firstString(overlay?.title);

  return (
    <section className="border-y border-outline-variant/20 py-stack-lg">
      <div className="container mx-auto grid max-w-container-max grid-cols-12 gap-gutter px-margin-desktop">
        <div className="col-span-12 lg:col-span-5">
          {headingOf(section.data) ? (
            <h2 className="mb-stack-md font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {bullets.length === 0 ? <MissingOptional label="bullets" /> : null}
          <div className="space-y-stack-md">
            {bullets.map((item, index) => (
              <div
                key={`${firstString(item.title)}-${index}`}
                className="flex gap-stack-sm bg-surface p-4 transition-colors hover:bg-surface-container"
              >
                <span className="font-headline-md text-primary/30">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  {firstString(item.title) ? (
                    <h4 className="mb-1 font-label-sm text-label-sm font-bold">{firstString(item.title)}</h4>
                  ) : (
                    <MissingOptional label="bullet title" />
                  )}
                  {firstString(item.body) ? (
                    <p className="font-body-md text-on-surface-variant">{firstString(item.body)}</p>
                  ) : (
                    <MissingOptional label="bullet body" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative col-span-12 lg:col-span-7">
          <div className="rounded-xl bg-primary-container p-base">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              {section.media.url ? (
                <StitchImage
                  src={section.media.url}
                  alt={section.media.alt ?? ""}
                  className="h-full w-full object-cover"
                />
              ) : (
                <MissingMedia message={section.media.missing ?? "SoC visualization not resolved"} />
              )}
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary/60 to-transparent p-stack-md">
                <div className="text-on-primary">
                  {overlayEyebrow ? (
                    <p className="mb-2 font-label-sm text-[10px] uppercase tracking-widest opacity-80">
                      {overlayEyebrow}
                    </p>
                  ) : (
                    <MissingOptional label="diagram eyebrow" />
                  )}
                  {overlayTitle ? (
                    <h5 className="font-headline-md text-headline-md">{overlayTitle}</h5>
                  ) : (
                    <MissingOptional label="diagram title" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EspDeploymentAdapter({ section }: { section: PreviewSectionPayload }) {
  const items = Array.isArray(section.data.items) ? section.data.items.map(asRecord) : [];

  return (
    <section className="py-stack-lg">
      <div className="container mx-auto max-w-container-max px-margin-desktop">
        <div className="mx-auto mb-stack-lg max-w-2xl text-center">
          {headingOf(section.data) ? (
            <h2 className="mb-4 font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
          ) : (
            <MissingOptional label="title" />
          )}
          {bodyOf(section.data) ? (
            <p className="font-body-md text-on-surface-variant">{bodyOf(section.data)}</p>
          ) : (
            <MissingOptional label="body" />
          )}
        </div>
        {items.length === 0 ? <MissingOptional label="metrics" /> : null}
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const stat = splitStat(firstString(item.value));
            return (
              <div
                key={`${firstString(item.label)}-${index}`}
                className="border-l-2 border-primary bg-surface-container-low p-stack-md"
              >
                {stat ? (
                  <div className="mb-2 text-[48px] font-display-lg text-primary">
                    {stat.amount}
                    {stat.unit ? <span className="text-[24px]">{stat.unit}</span> : null}
                  </div>
                ) : (
                  <MissingOptional label="metric value" />
                )}
                {firstString(item.label) ? (
                  <p className="font-label-sm text-label-sm font-bold uppercase text-secondary">
                    {firstString(item.label)}
                  </p>
                ) : (
                  <MissingOptional label="metric label" />
                )}
                {firstString(item.description, item.body) ? (
                  <p className="mt-2 font-body-md text-on-surface-variant">
                    {firstString(item.description, item.body)}
                  </p>
                ) : (
                  <MissingOptional label="metric body" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function EspApplicationsAdapter({ section }: { section: PreviewSectionPayload }) {
  const images = mediaEntries(section.data);
  const [factory, home] = images;

  return (
    <section className="overflow-hidden bg-primary-container py-stack-lg text-on-primary">
      <div className="container relative mx-auto max-w-container-max px-margin-desktop">
        <div className="grid grid-cols-12 items-center gap-gutter">
          <div className="col-span-12 lg:col-span-4">
            {headingOf(section.data) ? (
              <h2 className="mb-6 font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
            ) : (
              <MissingOptional label="heading" />
            )}
            {section.cards.length === 0 ? <MissingOptional label="cards" /> : null}
            <div className="space-y-stack-sm">
              {section.cards.map((card, index) => {
                const className =
                  index === 0
                    ? "w-full border-l-4 border-on-primary bg-on-primary/10 p-4 text-left transition-all"
                    : "w-full border-l-4 border-transparent p-4 text-left transition-all hover:bg-on-primary/5";
                const inner = (
                  <>
                    <h4 className="font-label-sm text-label-sm font-bold uppercase">{card.title}</h4>
                    {card.body ? <p className="text-sm opacity-70">{card.body}</p> : null}
                  </>
                );
                return card.href ? (
                  <Link key={card.title} href={card.href} className={className}>
                    {inner}
                  </Link>
                ) : (
                  <div key={card.title} className={className}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square overflow-hidden rounded-xl shadow-xl">
                {factory?.url ? (
                  <StitchImage
                    src={factory.url}
                    alt={factory.alt ?? ""}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <MissingMedia message="factory application image not resolved" />
                )}
              </div>
              <div className="relative mt-stack-md aspect-[3/4] overflow-hidden rounded-xl shadow-xl">
                {home?.url ? (
                  <StitchImage src={home.url} alt={home.alt ?? ""} className="h-full w-full object-cover" />
                ) : (
                  <MissingMedia message="home application image not resolved" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EspCtaAdapter({ section }: { section: PreviewSectionPayload }) {
  const [primary, secondary] = section.actions;

  return (
    <section className="relative py-stack-lg text-center">
      <div className="container relative z-10 mx-auto max-w-container-max px-margin-desktop">
        {headingOf(section.data) ? (
          <h2 className="mb-6 font-display-lg text-display-lg">{headingOf(section.data)}</h2>
        ) : (
          <MissingOptional label="title" />
        )}
        {bodyOf(section.data) ? (
          <p className="mx-auto mb-stack-md max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
            {bodyOf(section.data)}
          </p>
        ) : (
          <MissingOptional label="body" />
        )}
        <div className="flex justify-center gap-stack-sm">
          {primary ? (
            <Link
              href={primary.href}
              className="bg-primary px-10 py-5 font-label-sm text-label-sm uppercase tracking-widest text-on-primary transition-all hover:bg-secondary"
            >
              {primary.label}
            </Link>
          ) : (
            <MissingOptional label="primary action" />
          )}
          {secondary ? (
            <Link
              href={secondary.href}
              className="border border-outline px-10 py-5 font-label-sm text-label-sm uppercase tracking-widest transition-all hover:bg-surface-container"
            >
              {secondary.label}
            </Link>
          ) : (
            <MissingOptional label="secondary action" />
          )}
        </div>
      </div>
    </section>
  );
}

export function McFamiliesAdapter({ section }: { section: PreviewSectionPayload }) {
  const heading = decodeMojibake(headingOf(section.data));
  const introduction = decodeMojibake(firstString(section.data.introduction, section.data.body));

  return (
    <section className="mx-auto max-w-container-max px-margin-desktop py-stack-lg">
      <div className="mb-16">
        {heading ? (
          <h2 className="mb-4 font-headline-lg text-headline-lg text-primary">{heading}</h2>
        ) : (
          <MissingOptional label="heading" />
        )}
        {introduction ? (
          <p className="max-w-xl text-on-surface-variant">{introduction}</p>
        ) : (
          <MissingOptional label="introduction" />
        )}
      </div>
      {section.cards.length === 0 ? <MissingOptional label="cards" /> : null}
      <div className="grid grid-cols-12 gap-gutter">
        {section.cards.map((card, index) => (
          <div
            key={`${card.title}-${index}`}
            className="technical-glow col-span-12 rounded-xl border border-outline-variant/30 bg-white p-8 transition-all md:col-span-4"
          >
            <div className="mb-12 flex items-start justify-between">
              <span className="font-display-lg text-3xl text-primary/20">
                {String(index + 1).padStart(2, "0")}
              </span>
              {card.icon ? (
                <span className="material-symbols-outlined text-4xl text-primary">{card.icon}</span>
              ) : (
                <MissingOptional label="card icon" />
              )}
            </div>
            {card.title ? (
              <h3 className="mb-4 font-headline-md text-headline-md">{decodeMojibake(card.title)}</h3>
            ) : (
              <MissingOptional label="card title" />
            )}
            {card.body ? (
              <p className="mb-6 text-on-surface-variant">{decodeMojibake(card.body)}</p>
            ) : (
              <MissingOptional label="card body" />
            )}
            {card.items?.length ? (
              <ul className="space-y-3 font-label-sm text-label-sm text-on-surface-variant">
                {card.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {decodeMojibake(item)}
                  </li>
                ))}
              </ul>
            ) : (
              <MissingOptional label="card items" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function McMixedAdapter({ section }: { section: PreviewSectionPayload }) {
  const callouts = Array.isArray(section.data.callouts)
    ? section.data.callouts.map(asRecord)
    : [];
  const metrics = callouts.filter((item) => firstString(item.value));
  const overlay = callouts.find((item) => !firstString(item.value) && firstString(item.label, item.title));

  return (
    <section className="overflow-hidden bg-primary-container py-24 text-white">
      <div className="mx-auto grid max-w-container-max grid-cols-12 items-center gap-gutter px-margin-desktop">
        <div className="col-span-12 md:col-span-6">
          {eyebrowOf(section.data) ? (
            <span className="mb-4 block font-label-sm text-label-sm tracking-[0.2em] text-on-primary-container">
              {eyebrowOf(section.data)}
            </span>
          ) : (
            <MissingOptional label="eyebrow" />
          )}
          {headingOf(section.data) ? (
            <h2 className="mb-8 font-display-lg text-headline-lg leading-tight">
              {headingOf(section.data)}
            </h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {bodyOf(section.data) ? (
            <p className="mb-8 font-body-lg text-body-lg text-on-primary-container">
              {bodyOf(section.data)}
            </p>
          ) : (
            <MissingOptional label="body" />
          )}
          {metrics.length === 0 ? <MissingOptional label="metrics" /> : null}
          <div className="grid grid-cols-2 gap-8">
            {metrics.map((item, index) => (
              <div key={`${firstString(item.label)}-${index}`}>
                <div className="mb-2 font-display-lg text-3xl text-white">{firstString(item.value)}</div>
                {firstString(item.label) ? (
                  <p className="font-label-sm text-label-sm text-on-primary-container">
                    {firstString(item.label)}
                  </p>
                ) : (
                  <MissingOptional label="metric label" />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="relative col-span-12 h-[400px] md:col-span-6">
          <div className="absolute inset-0 overflow-hidden rounded-2xl border border-outline/20">
            {section.media.url ? (
              <StitchImage
                src={section.media.url}
                alt={section.media.alt ?? ""}
                className="h-full w-full object-cover"
              />
            ) : (
              <MissingMedia message={section.media.missing ?? "mixed-signal image not resolved"} />
            )}
          </div>
          <div className="glass-panel absolute -bottom-6 -left-6 max-w-xs rounded-xl p-6">
            {firstString(overlay?.label, overlay?.title) ? (
              <p className="mb-2 font-label-sm text-label-sm text-white">
                {firstString(overlay?.label, overlay?.title)}
              </p>
            ) : (
              <MissingOptional label="oscilloscope overlay" />
            )}
            <div className="flex h-12 w-full items-end gap-1 bg-primary px-2 py-1">
              <div className="h-4 w-1 animate-pulse bg-on-primary-container" />
              <div className="h-8 w-1 animate-pulse delay-75 bg-on-primary-container" />
              <div className="h-6 w-1 animate-pulse delay-150 bg-on-primary-container" />
              <div className="h-10 w-1 animate-pulse bg-on-primary-container" />
              <div className="h-5 w-1 animate-pulse delay-75 bg-on-primary-container" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function McRuggednessAdapter({ section }: { section: PreviewSectionPayload }) {
  const heading = decodeMojibake(headingOf(section.data));
  const body = decodeMojibake(bodyOf(section.data));
  const bullets = labeledEntries(section.data.bullets);
  const cards = section.cards.length
    ? section.cards
    : labeledEntries(section.data.items).map((item) => ({
        title: item.title,
        body: item.body,
        icon: item.icon,
      }));

  return (
    <section className="mx-auto max-w-container-max border-b border-outline-variant/10 px-margin-desktop py-stack-lg">
      <div className="grid grid-cols-12 gap-gutter">
        <div className="col-span-12 border-r border-outline-variant/20 pr-gutter md:col-span-4">
          {heading ? (
            <h2 className="mb-8 font-headline-lg text-headline-lg">{heading}</h2>
          ) : (
            <MissingOptional label="title" />
          )}
          {body ? (
            <p className="mb-12 text-on-surface-variant">{body}</p>
          ) : (
            <MissingOptional label="body" />
          )}
          {bullets.length === 0 ? <MissingOptional label="pills" /> : null}
          <div className="flex flex-col gap-4">
            {bullets.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="flex items-center gap-4 rounded-lg bg-surface-container-low p-4"
              >
                {item.icon ? (
                  <span className="material-symbols-outlined text-primary">{item.icon}</span>
                ) : (
                  <MissingOptional label="pill icon" />
                )}
                <span className="font-label-sm text-label-sm">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-12 md:col-span-8">
          {cards.length === 0 ? <MissingOptional label="cards" /> : null}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {cards.map((card, index) => (
              <div key={`${card.title}-${index}`} className="rounded-xl border border-outline-variant/20 p-6">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded bg-primary-fixed">
                  {card.icon ? (
                    <span className="material-symbols-outlined text-primary">{card.icon}</span>
                  ) : (
                    <MissingOptional label="card icon" />
                  )}
                </div>
                {card.title ? (
                  <h4 className="mb-2 font-headline-md text-headline-md">{decodeMojibake(card.title)}</h4>
                ) : (
                  <MissingOptional label="card title" />
                )}
                {card.body ? (
                  <p className="font-body-md text-on-surface-variant">{decodeMojibake(card.body)}</p>
                ) : (
                  <MissingOptional label="card body" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function McImpactAdapter({ section }: { section: PreviewSectionPayload }) {
  const [action] = labeledActions(section);

  return (
    <section className="bg-surface py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="mb-16 flex items-end justify-between">
          <div>
            {eyebrowOf(section.data) ? (
              <span className="mb-2 block font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                {eyebrowOf(section.data)}
              </span>
            ) : (
              <MissingOptional label="eyebrow" />
            )}
            {headingOf(section.data) ? (
              <h2 className="font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
            ) : (
              <MissingOptional label="heading" />
            )}
          </div>
          {action?.href ? (
            <Link
              href={action.href}
              className="flex items-center gap-2 border-b border-primary pb-1 font-label-sm text-label-sm text-primary"
            >
              {action.label} <span className="material-symbols-outlined text-sm">open_in_new</span>
            </Link>
          ) : (
            <MissingOptional label="case studies action" />
          )}
        </div>
        {section.cards.length === 0 ? <MissingOptional label="cards" /> : null}
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {section.cards.map((card) => (
            <div key={card.title} className="group cursor-pointer">
              <div className="relative mb-6 h-64 overflow-hidden rounded-xl">
                <div className="absolute inset-0 z-10 bg-primary/20 transition-colors duration-500 group-hover:bg-primary/0" />
                {card.imageUrl ? (
                  <StitchImage
                    src={card.imageUrl}
                    alt={card.imageAlt ?? ""}
                    className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                  />
                ) : (
                  <MissingMedia message={`${card.title} image not resolved`} />
                )}
              </div>
              {card.title ? (
                <h4 className="mb-2 font-headline-md text-headline-md">{card.title}</h4>
              ) : (
                <MissingOptional label="card title" />
              )}
              {card.body ? (
                <p className="text-on-surface-variant">{card.body}</p>
              ) : (
                <MissingOptional label="card body" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function McCtaAdapter({ section }: { section: PreviewSectionPayload }) {
  const [primary, secondary] = labeledActions(section);

  return (
    <section className="mx-auto max-w-container-max px-margin-desktop py-24 text-center">
      <div className="mx-auto max-w-2xl">
        {headingOf(section.data) ? (
          <h2 className="mb-8 font-display-lg text-headline-lg">{headingOf(section.data)}</h2>
        ) : (
          <MissingOptional label="title" />
        )}
        {bodyOf(section.data) ? (
          <p className="mb-12 text-body-lg text-on-surface-variant">{bodyOf(section.data)}</p>
        ) : (
          <MissingOptional label="body" />
        )}
        <div className="flex flex-wrap justify-center gap-6">
          {primary?.href ? (
            <Link
              href={primary.href}
              className="rounded-lg bg-primary px-10 py-4 font-label-sm text-label-sm text-on-primary transition-transform hover:scale-105"
            >
              {primary.label}
            </Link>
          ) : (
            <MissingOptional label="primary action" />
          )}
          {secondary?.href ? (
            <Link
              href={secondary.href}
              className="rounded-lg border border-outline bg-white px-10 py-4 font-label-sm text-label-sm transition-colors hover:bg-surface-container"
            >
              {secondary.label}
            </Link>
          ) : (
            <MissingOptional label="secondary action" />
          )}
        </div>
      </div>
    </section>
  );
}

export function NdBenefitsAdapter({ section }: { section: PreviewSectionPayload }) {
  const [power, security, proto, dual, direction] = section.cards;
  const lowerCards = [proto, dual, direction];

  return (
    <section className="mx-auto max-w-container-max px-margin-desktop py-stack-lg">
      {section.cards.length === 0 ? <MissingOptional label="cards" /> : null}
      <div className="grid grid-cols-12 gap-gutter">
        {power ? (
          <div className="relative col-span-12 overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-8 lg:col-span-8">
            <div className="relative z-10">
              {power.icon ? (
                <span className="material-symbols-outlined mb-4 text-4xl text-innovation-cyan">
                  {power.icon}
                </span>
              ) : (
                <MissingOptional label="power icon" />
              )}
              {power.title ? (
                <h3 className="mb-4 font-headline-lg text-headline-lg">{power.title}</h3>
              ) : (
                <MissingOptional label="power title" />
              )}
              {power.body ? (
                <p className="mb-8 max-w-lg font-body-md text-body-md text-on-surface-variant">
                  {power.body}
                </p>
              ) : (
                <MissingOptional label="power body" />
              )}
              {power.metrics?.length ? (
                <div className="flex gap-stack-lg border-t border-outline-variant pt-8">
                  {power.metrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="font-headline-md text-headline-md text-primary">
                        {decodeMojibake(metric.value)}
                      </div>
                      {metric.label ? (
                        <div className="font-label-sm text-label-sm text-on-surface-variant">
                          {metric.label}
                        </div>
                      ) : (
                        <MissingOptional label="metric label" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <MissingOptional label="power metrics" />
              )}
            </div>
          </div>
        ) : (
          <MissingOptional label="power card" />
        )}
        {security ? (
          <div className="col-span-12 flex flex-col justify-between rounded-xl bg-primary-container p-8 text-on-primary-container lg:col-span-4">
            <div>
              {security.icon ? (
                <span className="material-symbols-outlined mb-4 text-4xl text-innovation-cyan">
                  {security.icon}
                </span>
              ) : (
                <MissingOptional label="security icon" />
              )}
              {security.title ? (
                <h3 className="mb-2 font-headline-md text-headline-md">{security.title}</h3>
              ) : (
                <MissingOptional label="security title" />
              )}
              {security.body ? (
                <p className="font-body-md text-body-md text-on-primary-container/70">{security.body}</p>
              ) : (
                <MissingOptional label="security body" />
              )}
            </div>
            {security.label ? (
              <div className="mt-8 flex items-center gap-2 font-label-sm text-label-sm text-innovation-cyan">
                {security.label} <span className="material-symbols-outlined">chevron_right</span>
              </div>
            ) : (
              <MissingOptional label="security action" />
            )}
          </div>
        ) : (
          <MissingOptional label="security card" />
        )}
        {lowerCards.map((card, index) =>
          card ? (
            <div
              key={`${card.title}-${index}`}
              className="col-span-12 rounded-xl border border-outline-variant bg-surface p-8 transition-colors hover:border-innovation-cyan md:col-span-4"
            >
              {card.icon ? (
                <span
                  className="material-symbols-outlined mb-4 text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {card.icon}
                </span>
              ) : (
                <MissingOptional label="card icon" />
              )}
              {card.title ? (
                <h4 className="mb-2 font-headline-md text-headline-md">{card.title}</h4>
              ) : (
                <MissingOptional label="card title" />
              )}
              {card.body ? (
                <p className="text-on-surface-variant">{card.body}</p>
              ) : (
                <MissingOptional label="card body" />
              )}
            </div>
          ) : (
            <MissingOptional key={`missing-lower-${index}`} label="feature card" />
          )
        )}
      </div>
    </section>
  );
}

export function NdStackAdapter({ section }: { section: PreviewSectionPayload }) {
  const bullets = labeledEntries(section.data.bullets);
  const callouts = Array.isArray(section.data.callouts)
    ? section.data.callouts.map(asRecord)
    : [];
  const overlay = firstString(callouts[0]?.label, callouts[0]?.title);

  return (
    <section className="bg-surface-container-low py-stack-lg">
      <div className="mx-auto grid max-w-container-max grid-cols-12 items-center gap-gutter px-margin-desktop">
        <div className="col-span-12 lg:col-span-5">
          {eyebrowOf(section.data) ? (
            <div className="mb-4 inline-block rounded bg-primary px-3 py-1 font-label-sm text-label-sm text-on-primary">
              {eyebrowOf(section.data)}
            </div>
          ) : (
            <MissingOptional label="eyebrow" />
          )}
          {headingOf(section.data) ? (
            <h2 className="mb-6 font-headline-lg text-headline-lg leading-tight">
              {headingOf(section.data)}
            </h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {bullets.length === 0 ? <MissingOptional label="bullets" /> : null}
          <div className="space-y-6">
            {bullets.map((item, index) => (
              <div key={`${item.title}-${index}`} className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-surface-container-highest">
                  {item.icon ? (
                    <span className="material-symbols-outlined text-primary">{item.icon}</span>
                  ) : (
                    <MissingOptional label="bullet icon" />
                  )}
                </div>
                <div>
                  <h5 className="mb-1 font-bold">{item.title}</h5>
                  {item.body ? (
                    <p className="text-sm text-on-surface-variant">{item.body}</p>
                  ) : (
                    <MissingOptional label="bullet body" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative col-span-12 lg:col-span-7">
          <div className="glass-panel overflow-hidden rounded-2xl border border-outline-variant p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              {overlay ? (
                <div className="font-label-sm text-label-sm uppercase tracking-tighter opacity-50">
                  {overlay}
                </div>
              ) : (
                <MissingOptional label="viewer overlay" />
              )}
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg bg-primary-container">
              {section.media.url ? (
                <StitchImage
                  src={section.media.url}
                  alt={section.media.alt ?? ""}
                  className="h-full w-full object-cover opacity-80"
                />
              ) : (
                <MissingMedia message={section.media.missing ?? "stack visualization not resolved"} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NdDeploymentsAdapter({ section }: { section: PreviewSectionPayload }) {
  return (
    <section className="overflow-hidden py-stack-lg">
      <div className="mx-auto mb-stack-md max-w-container-max px-margin-desktop">
        {headingOf(section.data) ? (
          <h2 className="font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
        ) : (
          <MissingOptional label="heading" />
        )}
      </div>
      {section.cards.length === 0 ? <MissingOptional label="cards" /> : null}
      <div className="no-scrollbar flex snap-x gap-6 overflow-x-auto px-margin-desktop pb-8">
        {section.cards.map((card) => (
          <div
            key={card.title}
            className="group min-w-[400px] snap-start overflow-hidden rounded-xl border border-outline-variant bg-surface transition-all hover:border-innovation-cyan"
          >
            <div className="h-64 overflow-hidden">
              {card.imageUrl ? (
                <StitchImage
                  src={card.imageUrl}
                  alt={card.imageAlt ?? ""}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <MissingMedia message={`${card.title} image not resolved`} />
              )}
            </div>
            <div className="p-8">
              {card.title ? (
                <h4 className="mb-2 font-headline-md text-headline-md">{card.title}</h4>
              ) : (
                <MissingOptional label="card title" />
              )}
              {card.body ? (
                <p className="mb-4 text-sm text-on-surface-variant">{card.body}</p>
              ) : (
                <MissingOptional label="card body" />
              )}
              {card.badges?.length ? (
                <div className="flex flex-wrap gap-2">
                  {card.badges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full bg-surface-container-high px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              ) : (
                <MissingOptional label="card badges" />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function NdCtaAdapter({ section }: { section: PreviewSectionPayload }) {
  const highlights = labeledEntries(section.data.highlights);
  const callouts = Array.isArray(section.data.callouts)
    ? section.data.callouts.map(asRecord)
    : [];
  const metric = callouts[0];
  const [action] = labeledActions(section);
  const buttonClassName =
    "rounded-lg bg-innovation-cyan px-10 py-5 font-bold text-primary transition-all hover:brightness-110";

  return (
    <section className="bg-primary py-stack-lg text-on-primary">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="grid grid-cols-1 items-center gap-stack-lg md:grid-cols-2">
          <div>
            {headingOf(section.data) ? (
              <h2 className="mb-6 font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
            ) : (
              <MissingOptional label="title" />
            )}
            {highlights.length === 0 ? <MissingOptional label="highlights" /> : null}
            <ul className="mb-stack-lg space-y-4">
              {highlights.map((item) => (
                <li key={item.title} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-innovation-cyan">check_circle</span>
                  <span className="font-body-md">{item.title}</span>
                </li>
              ))}
            </ul>
            {action ? (
              action.href ? (
                <Link href={action.href} className={buttonClassName}>
                  {action.label}
                </Link>
              ) : (
                <button type="button" className={buttonClassName}>
                  {action.label}
                </button>
              )
            ) : (
              <MissingOptional label="primary action" />
            )}
          </div>
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-innovation-cyan/20 blur-xl" />
            <div className="relative rounded-2xl border border-white/10 bg-primary-container p-8">
              {firstString(metric?.value) ? (
                <div className="mb-4 font-display-lg text-6xl text-innovation-cyan">
                  {firstString(metric?.value)}
                </div>
              ) : (
                <MissingOptional label="metric value" />
              )}
              {firstString(metric?.label) ? (
                <p className="font-headline-md text-on-primary-container">{firstString(metric?.label)}</p>
              ) : (
                <MissingOptional label="metric label" />
              )}
              <div className="mt-8 border-t border-white/10 pt-8">
                {firstString(metric?.description, metric?.body) ? (
                  <p className="text-sm opacity-60">{firstString(metric?.description, metric?.body)}</p>
                ) : (
                  <MissingOptional label="metric footnote" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NxpExpertiseAdapter({ section }: { section: PreviewSectionPayload }) {
  const [ml, safety, realtime, linux] = section.cards;

  return (
    <section className="mx-auto max-w-container-max px-margin-desktop py-stack-lg">
      <div className="mb-12">
        {headingOf(section.data) ? (
          <h2 className="font-headline-lg text-headline-lg text-primary">{headingOf(section.data)}</h2>
        ) : (
          <MissingOptional label="heading" />
        )}
        <div className="mt-4 h-1 w-24 bg-primary" />
      </div>
      {section.cards.length === 0 ? <MissingOptional label="cards" /> : null}
      <div className="grid grid-cols-12 gap-gutter">
        {ml ? (
          <div className="technical-glow relative col-span-12 overflow-hidden rounded-2xl border border-outline-variant bg-white p-8 md:col-span-8">
            <div className="flex h-full flex-col justify-between">
              <div>
                {ml.icon ? (
                  <span className="material-symbols-outlined mb-6 text-4xl text-primary">{ml.icon}</span>
                ) : (
                  <MissingOptional label="ml icon" />
                )}
                {ml.title ? (
                  <h3 className="mb-4 font-headline-md text-headline-md text-primary">{ml.title}</h3>
                ) : (
                  <MissingOptional label="ml title" />
                )}
                {ml.body ? (
                  <p className="max-w-lg font-body-md text-on-surface-variant">{ml.body}</p>
                ) : (
                  <MissingOptional label="ml body" />
                )}
              </div>
              {ml.badges?.length ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {ml.badges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full bg-surface-container px-3 py-1 font-label-sm text-label-sm text-on-surface-variant"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              ) : (
                <MissingOptional label="ml badges" />
              )}
            </div>
          </div>
        ) : (
          <MissingOptional label="ml card" />
        )}
        {safety ? (
          <div className="col-span-12 flex flex-col justify-between rounded-2xl bg-primary p-8 text-on-primary md:col-span-4">
            <div>
              {safety.icon ? (
                <span className="material-symbols-outlined mb-6 text-4xl text-on-primary-fixed-variant">
                  {safety.icon}
                </span>
              ) : (
                <MissingOptional label="safety icon" />
              )}
              {safety.title ? (
                <h3 className="mb-4 font-headline-md text-headline-md">{safety.title}</h3>
              ) : (
                <MissingOptional label="safety title" />
              )}
              {safety.body ? (
                <p className="font-body-md text-on-primary-container">{safety.body}</p>
              ) : (
                <MissingOptional label="safety body" />
              )}
            </div>
            {safety.items?.length ? (
              <ul className="mt-8 space-y-3">
                {safety.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 font-label-sm text-label-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary-fixed" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <MissingOptional label="safety items" />
            )}
          </div>
        ) : (
          <MissingOptional label="safety card" />
        )}
        {realtime ? (
          <div className="technical-glow col-span-12 rounded-2xl border border-outline-variant bg-white p-8 md:col-span-6 lg:col-span-4">
            {realtime.icon ? (
              <span className="material-symbols-outlined mb-6 text-4xl text-primary">{realtime.icon}</span>
            ) : (
              <MissingOptional label="realtime icon" />
            )}
            {realtime.title ? (
              <h3 className="mb-4 font-headline-md text-headline-md text-primary">{realtime.title}</h3>
            ) : (
              <MissingOptional label="realtime title" />
            )}
            {realtime.body ? (
              <p className="mb-6 font-body-md text-on-surface-variant">{realtime.body}</p>
            ) : (
              <MissingOptional label="realtime body" />
            )}
            <div className="border-t border-outline-variant/30 pt-6">
              {realtime.label ? (
                <div className="mb-2 font-label-sm text-xs uppercase text-secondary">{realtime.label}</div>
              ) : (
                <MissingOptional label="latency label" />
              )}
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container">
                <div className="h-full w-[92%] bg-primary" />
              </div>
            </div>
          </div>
        ) : (
          <MissingOptional label="realtime card" />
        )}
        {linux ? (
          <div className="col-span-12 flex flex-col gap-8 rounded-2xl border border-outline-variant bg-surface-container-low p-8 md:col-span-6 lg:col-span-8 lg:flex-row">
            <div className="flex-1">
              {linux.icon ? (
                <span className="material-symbols-outlined mb-6 text-4xl text-primary">{linux.icon}</span>
              ) : (
                <MissingOptional label="linux icon" />
              )}
              {linux.title ? (
                <h3 className="mb-4 font-headline-md text-headline-md text-primary">{linux.title}</h3>
              ) : (
                <MissingOptional label="linux title" />
              )}
              {linux.body ? (
                <p className="mb-4 font-body-md text-on-surface-variant">{linux.body}</p>
              ) : (
                <MissingOptional label="linux body" />
              )}
              {linux.href && linux.label ? (
                <Link
                  href={linux.href}
                  className="mt-4 flex items-center gap-2 font-label-sm text-label-sm font-bold text-primary hover:underline"
                >
                  {linux.label} <span className="material-symbols-outlined text-sm">open_in_new</span>
                </Link>
              ) : (
                <MissingOptional label="case studies action" />
              )}
            </div>
            {linux.badges?.length ? (
              <div className="flex w-full items-center justify-center lg:w-48">
                <div className="grid w-full grid-cols-2 gap-4">
                  {linux.badges.map((badge) => (
                    <div
                      key={badge}
                      className="flex aspect-square items-center justify-center rounded-lg border border-outline-variant bg-white shadow-sm"
                    >
                      <span className="font-display-lg text-xl font-bold">{badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <MissingOptional label="stack tiles" />
            )}
          </div>
        ) : (
          <MissingOptional label="linux card" />
        )}
      </div>
    </section>
  );
}

export function NxpHardwareAdapter({ section }: { section: PreviewSectionPayload }) {
  const nodes = Array.isArray(section.data.nodes) ? section.data.nodes.map(asRecord) : [];
  const listed = nodes.filter((node) => !firstString(node.annotation));
  const floating = nodes.filter((node) => firstString(node.annotation));

  return (
    <section className="bg-primary-container py-stack-lg text-on-primary">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="grid grid-cols-12 items-center gap-gutter">
          <div className="col-span-12 lg:col-span-5">
            {headingOf(section.data) ? (
              <h2 className="mb-6 font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
            ) : (
              <MissingOptional label="heading" />
            )}
            {firstString(section.data.introduction, section.data.body) ? (
              <p className="mb-8 font-body-lg text-on-primary-container">
                {decodeMojibake(firstString(section.data.introduction, section.data.body))}
              </p>
            ) : (
              <MissingOptional label="introduction" />
            )}
            {listed.length === 0 ? <MissingOptional label="nodes" /> : null}
            <div className="space-y-6">
              {listed.map((node, index) => (
                <div key={`${firstString(node.id, node.label)}-${index}`} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-white/10">
                    {firstString(node.icon) ? (
                      <span className="material-symbols-outlined text-on-primary-fixed-variant">
                        {firstString(node.icon)}
                      </span>
                    ) : (
                      <MissingOptional label="node icon" />
                    )}
                  </div>
                  <div>
                    {firstString(node.label) ? (
                      <h4 className="font-headline-md text-lg text-white">
                        {decodeMojibake(firstString(node.label))}
                      </h4>
                    ) : (
                      <MissingOptional label="node label" />
                    )}
                    {firstString(node.description) ? (
                      <p className="text-sm text-on-primary-container">{firstString(node.description)}</p>
                    ) : (
                      <MissingOptional label="node description" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative col-span-12 mt-12 h-[500px] lg:col-span-7 lg:mt-0">
            {floating.length === 0 ? <MissingOptional label="overlay nodes" /> : null}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="relative h-full w-full">
                {floating[0] ? (
                  <div className="absolute left-1/4 top-1/4 rounded border border-white/20 bg-white/5 p-3 backdrop-blur-xl">
                    <div className="font-label-sm text-[10px] uppercase tracking-tighter text-on-primary-container">
                      {firstString(floating[0].annotation)}
                    </div>
                    <div className="text-xs font-bold text-white">{firstString(floating[0].label)}</div>
                  </div>
                ) : null}
                {floating[1] ? (
                  <div className="absolute bottom-1/3 right-1/4 rounded border border-white/20 bg-white/5 p-3 backdrop-blur-xl">
                    <div className="font-label-sm text-[10px] uppercase tracking-tighter text-on-primary-container">
                      {firstString(floating[1].annotation)}
                    </div>
                    <div className="text-xs font-bold text-white">{firstString(floating[1].label)}</div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NxpImplementationAdapter({ section }: { section: PreviewSectionPayload }) {
  const callouts = Array.isArray(section.data.callouts)
    ? section.data.callouts.map(asRecord)
    : [];

  return (
    <section className="mx-auto max-w-container-max px-margin-desktop py-stack-lg">
      <div className="mb-16 text-center">
        {headingOf(section.data) ? (
          <h2 className="font-headline-lg text-headline-lg text-primary">{headingOf(section.data)}</h2>
        ) : (
          <MissingOptional label="heading" />
        )}
        {bodyOf(section.data) ? (
          <p className="mx-auto mt-4 max-w-2xl font-body-md text-on-surface-variant">
            {bodyOf(section.data)}
          </p>
        ) : (
          <MissingOptional label="body" />
        )}
      </div>
      {callouts.length === 0 ? <MissingOptional label="sectors" /> : null}
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
        {callouts.map((item, index) => {
          const media = asRecord(item.media);
          const imageUrl =
            firstString(media.source, media.url, item.imageUrl) ??
            (index === 0 ? section.media.url : undefined);
          const imageAlt = firstString(item.mediaAlt, media.alt, item.imageAlt) ?? section.media.alt;
          return (
            <div key={`${firstString(item.title)}-${index}`} className="group cursor-pointer">
              <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-xl">
                {imageUrl ? (
                  <StitchImage
                    src={imageUrl}
                    alt={imageAlt ?? ""}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <MissingMedia message={`${firstString(item.title) ?? "sector"} image not resolved`} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  {firstString(item.eyebrow) ? (
                    <div className="font-label-sm text-xs uppercase tracking-widest opacity-80">
                      {firstString(item.eyebrow)}
                    </div>
                  ) : (
                    <MissingOptional label="sector eyebrow" />
                  )}
                  {firstString(item.title) ? (
                    <div className="font-headline-md text-xl">{firstString(item.title)}</div>
                  ) : (
                    <MissingOptional label="sector title" />
                  )}
                </div>
              </div>
              {firstString(item.body) ? (
                <p className="font-body-md text-on-surface-variant">{firstString(item.body)}</p>
              ) : (
                <MissingOptional label="sector body" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function NxpCtaAdapter({ section }: { section: PreviewSectionPayload }) {
  const [primary, secondary] = labeledActions(section);

  return (
    <section className="mx-auto mb-20 max-w-container-max px-margin-desktop py-stack-lg">
      <div className="relative flex flex-col items-center overflow-hidden rounded-3xl bg-surface-container-high p-12 text-center lg:p-20">
        <div className="relative z-10 max-w-3xl">
          {headingOf(section.data) ? (
            <h2 className="mb-8 font-display-lg text-headline-lg leading-tight text-primary lg:text-display-lg">
              {headingOf(section.data)}
            </h2>
          ) : (
            <MissingOptional label="title" />
          )}
          {bodyOf(section.data) ? (
            <p className="mb-12 font-body-lg text-on-surface-variant">{bodyOf(section.data)}</p>
          ) : (
            <MissingOptional label="body" />
          )}
          <div className="flex flex-col justify-center gap-6 sm:flex-row">
            {primary?.href ? (
              <Link
                href={primary.href}
                className="rounded-lg bg-primary px-10 py-5 font-label-sm text-label-sm font-bold text-on-primary shadow-xl shadow-primary/10 transition-all hover:bg-secondary"
              >
                {primary.label}
              </Link>
            ) : primary ? (
              <button
                type="button"
                className="rounded-lg bg-primary px-10 py-5 font-label-sm text-label-sm font-bold text-on-primary shadow-xl shadow-primary/10 transition-all hover:bg-secondary"
              >
                {primary.label}
              </button>
            ) : (
              <MissingOptional label="primary action" />
            )}
            {secondary ? (
              secondary.href ? (
                <Link
                  href={secondary.href}
                  className="rounded-lg border border-outline-variant bg-white px-10 py-5 font-label-sm text-label-sm font-bold transition-all hover:bg-surface"
                >
                  {secondary.label}
                </Link>
              ) : (
                <button
                  type="button"
                  className="rounded-lg border border-outline-variant bg-white px-10 py-5 font-label-sm text-label-sm font-bold transition-all hover:bg-surface"
                >
                  {secondary.label}
                </button>
              )
            ) : (
              <MissingOptional label="secondary action" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PlVulnerabilitiesAdapter({ section }: { section: PreviewSectionPayload }) {
  const [remote, sync] = section.cards;

  return (
    <section className="mx-auto max-w-container-max px-margin-desktop py-stack-lg">
      <div className="mb-stack-lg">
        {eyebrowOf(section.data) ? (
          <span className="mb-2 block font-label-sm text-label-sm uppercase tracking-widest text-primary-container/60">
            {eyebrowOf(section.data)}
          </span>
        ) : (
          <MissingOptional label="eyebrow" />
        )}
        {headingOf(section.data) ? (
          <h2 className="font-headline-lg text-headline-lg text-primary">{headingOf(section.data)}</h2>
        ) : (
          <MissingOptional label="heading" />
        )}
      </div>
      {section.cards.length === 0 ? <MissingOptional label="cards" /> : null}
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-12">
        {remote ? (
          <div className="technical-glow group flex flex-col justify-between rounded-xl border border-outline-variant bg-surface-container-lowest p-stack-lg transition-all duration-500 md:col-span-8">
            <div>
              {remote.icon ? (
                <span className="material-symbols-outlined mb-4 text-4xl text-primary">{remote.icon}</span>
              ) : (
                <MissingOptional label="remote icon" />
              )}
              {remote.title ? (
                <h3 className="mb-stack-sm font-headline-md text-headline-md text-primary">{remote.title}</h3>
              ) : (
                <MissingOptional label="remote title" />
              )}
              {remote.body ? (
                <p className="font-body-md text-body-md text-on-surface-variant">{remote.body}</p>
              ) : (
                <MissingOptional label="remote body" />
              )}
            </div>
            {remote.metrics?.length ? (
              <div className="mt-stack-lg grid grid-cols-3 gap-4 border-t border-outline-variant/30 pt-6">
                {remote.metrics.map((metric) => (
                  <div key={metric.label}>
                    <div className="font-display-lg text-headline-lg leading-none text-primary">
                      {metric.value}
                    </div>
                    {metric.label ? (
                      <div className="mt-1 font-label-sm text-label-sm uppercase text-on-surface-variant">
                        {metric.label}
                      </div>
                    ) : (
                      <MissingOptional label="metric label" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <MissingOptional label="metrics" />
            )}
          </div>
        ) : (
          <MissingOptional label="remote infrastructure card" />
        )}
        {sync ? (
          <div className="technical-glow group flex flex-col rounded-xl bg-primary-container p-stack-lg text-on-primary transition-all duration-500 md:col-span-4">
            {sync.icon ? (
              <span className="material-symbols-outlined mb-4 text-4xl text-on-primary">{sync.icon}</span>
            ) : (
              <MissingOptional label="sync icon" />
            )}
            {sync.title ? (
              <h3 className="mb-stack-sm font-headline-md text-headline-md text-on-primary">{sync.title}</h3>
            ) : (
              <MissingOptional label="sync title" />
            )}
            {sync.body ? (
              <p className="font-body-md text-body-md text-on-primary-container">{sync.body}</p>
            ) : (
              <MissingOptional label="sync body" />
            )}
            <div className="mt-auto pt-stack-lg">
              <div className="relative h-32 w-full overflow-hidden rounded-lg bg-surface/10" />
            </div>
          </div>
        ) : (
          <MissingOptional label="sensor synchronization card" />
        )}
      </div>
    </section>
  );
}

export function PlSolutionsAdapter({ section }: { section: PreviewSectionPayload }) {
  const rawCards = Array.isArray(section.data.cards) ? section.data.cards.map(asRecord) : [];

  return (
    <section className="bg-surface-container py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="mb-stack-lg flex flex-col items-end justify-between gap-stack-md md:flex-row">
          <div className="max-w-2xl">
            {eyebrowOf(section.data) ? (
              <span className="mb-2 block font-label-sm text-label-sm uppercase tracking-widest text-primary-container/60">
                {eyebrowOf(section.data)}
              </span>
            ) : (
              <MissingOptional label="eyebrow" />
            )}
            {headingOf(section.data) ? (
              <h2 className="font-headline-lg text-headline-lg text-primary">{headingOf(section.data)}</h2>
            ) : (
              <MissingOptional label="heading" />
            )}
          </div>
          {firstString(section.data.introduction, section.data.body) ? (
            <p className="max-w-sm font-body-md text-body-md text-on-surface-variant">
              {firstString(section.data.introduction, section.data.body)}
            </p>
          ) : (
            <MissingOptional label="introduction" />
          )}
        </div>
        {section.cards.length === 0 ? <MissingOptional label="cards" /> : null}
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {section.cards.map((card, index) => {
            const raw = rawCards[index] ?? {};
            const badge = card.badges?.[0] ?? firstString(raw.badge, raw.eyebrow, card.eyebrow);
            const icon = card.icon ?? firstString(raw.icon);
            const items = card.items?.length
              ? card.items
              : Array.isArray(raw.items)
                ? raw.items
                    .map((entry) =>
                      typeof entry === "string"
                        ? entry.trim()
                        : firstString(asRecord(entry).title, asRecord(entry).label, asRecord(entry).text)
                    )
                    .filter((entry): entry is string => Boolean(entry))
                : [];
            return (
              <div
                key={`${card.title}-${index}`}
                className="group relative overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-8 transition-colors hover:border-primary"
              >
                {icon ? (
                  <div className="absolute right-0 top-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
                    <span className="material-symbols-outlined text-8xl">{icon}</span>
                  </div>
                ) : (
                  <MissingOptional label="module icon" />
                )}
                {badge ? (
                  <span className="mb-4 block text-sm font-bold tracking-widest text-primary">{badge}</span>
                ) : (
                  <MissingOptional label="module badge" />
                )}
                {card.title ? (
                  <h3 className="mb-4 font-headline-md text-headline-md text-primary">{card.title}</h3>
                ) : (
                  <MissingOptional label="module title" />
                )}
                {card.body ? (
                  <p className="mb-6 font-body-md text-body-md text-on-surface-variant">{card.body}</p>
                ) : (
                  <MissingOptional label="module body" />
                )}
                {items.length ? (
                  <ul className="space-y-3">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {item.trim()}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <MissingOptional label="module items" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function PlSuperiorityAdapter({ section }: { section: PreviewSectionPayload }) {
  const bullets = labeledEntries(section.data.bullets);
  const callouts = Array.isArray(section.data.callouts)
    ? section.data.callouts.map(asRecord)
    : [];
  const panel = callouts[0];

  return (
    <section className="mx-auto max-w-container-max px-margin-desktop py-stack-lg">
      <div className="grid grid-cols-1 items-center gap-stack-lg lg:grid-cols-2">
        <div>
          {headingOf(section.data) ? (
            <h2 className="mb-stack-md font-headline-lg text-headline-lg text-primary">
              {headingOf(section.data)}
            </h2>
          ) : (
            <MissingOptional label="title" />
          )}
          {bullets.length === 0 ? <MissingOptional label="bullets" /> : null}
          <div className="space-y-6">
            {bullets.map((bullet) => (
              <div key={bullet.title} className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-surface-container">
                  {bullet.icon ? (
                    <span className="material-symbols-outlined text-primary">{bullet.icon}</span>
                  ) : (
                    <MissingOptional label="bullet icon" />
                  )}
                </div>
                <div>
                  {bullet.title ? (
                    <h4 className="font-headline-md text-body-lg font-bold text-primary">{bullet.title}</h4>
                  ) : (
                    <MissingOptional label="bullet title" />
                  )}
                  {bullet.body ? (
                    <p className="font-body-md text-body-md text-on-surface-variant">{bullet.body}</p>
                  ) : (
                    <MissingOptional label="bullet body" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="group relative aspect-square overflow-hidden rounded-2xl bg-primary-container">
          {panel ? (
            <div className="glass-panel absolute bottom-6 left-6 right-6 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  {firstString(panel.eyebrow) ? (
                    <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-white/60">
                      {firstString(panel.eyebrow)}
                    </span>
                  ) : (
                    <MissingOptional label="panel eyebrow" />
                  )}
                  {firstString(panel.title) ? (
                    <span className="font-headline-md text-headline-md text-white">
                      {firstString(panel.title)}
                    </span>
                  ) : (
                    <MissingOptional label="panel title" />
                  )}
                </div>
                {firstString(panel.icon) ? (
                  <span
                    className="material-symbols-outlined text-white"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {firstString(panel.icon)}
                  </span>
                ) : (
                  <MissingOptional label="panel icon" />
                )}
              </div>
            </div>
          ) : (
            <MissingOptional label="hardware panel" />
          )}
        </div>
      </div>
    </section>
  );
}

export function PlAssetAdapter({ section }: { section: PreviewSectionPayload }) {
  const [primary] = labeledActions(section);
  const bullets = labeledEntries(section.data.bullets);

  return (
    <section className="bg-primary py-stack-lg text-on-primary">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="grid grid-cols-1 gap-stack-lg md:grid-cols-2">
          <div>
            {eyebrowOf(section.data) ? (
              <span className="mb-4 block font-label-sm text-label-sm uppercase tracking-widest text-on-primary-container">
                {eyebrowOf(section.data)}
              </span>
            ) : (
              <MissingOptional label="eyebrow" />
            )}
            {headingOf(section.data) ? (
              <h2 className="mb-stack-md font-display-lg text-headline-lg text-on-primary">
                {headingOf(section.data)}
              </h2>
            ) : (
              <MissingOptional label="heading" />
            )}
            {bodyOf(section.data) ? (
              <p className="mb-stack-lg font-body-lg text-body-lg text-on-primary-container">
                {bodyOf(section.data)}
              </p>
            ) : (
              <MissingOptional label="body" />
            )}
            {primary?.href ? (
              <Link
                href={primary.href}
                className="inline-flex items-center gap-2 border-b border-on-primary pb-1 font-label-sm text-label-sm font-bold text-on-primary transition-all hover:gap-4"
              >
                {primary.label}
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </Link>
            ) : primary ? (
              <span className="inline-flex items-center gap-2 border-b border-on-primary pb-1 font-label-sm text-label-sm font-bold text-on-primary">
                {primary.label}
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </span>
            ) : (
              <MissingOptional label="case study action" />
            )}
          </div>
          {bullets.length === 0 ? <MissingOptional label="case study cards" /> : null}
          <div className="grid grid-cols-2 gap-gutter">
            {bullets.map((bullet) => (
              <div key={bullet.title} className="rounded-xl border border-on-primary-container/20 p-6">
                {bullet.icon ? (
                  <span className="material-symbols-outlined mb-4 text-on-primary">{bullet.icon}</span>
                ) : (
                  <MissingOptional label="card icon" />
                )}
                {bullet.title ? (
                  <h4 className="mb-2 font-headline-md text-body-lg font-bold">{bullet.title}</h4>
                ) : (
                  <MissingOptional label="card title" />
                )}
                {bullet.body ? (
                  <p className="font-body-md text-sm text-on-primary-container">{bullet.body}</p>
                ) : (
                  <MissingOptional label="card body" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PlCtaAdapter({ section }: { section: PreviewSectionPayload }) {
  const [primary] = labeledActions(section);

  return (
    <section className="relative overflow-hidden py-stack-lg">
      <div className="relative z-10 mx-auto max-w-container-max px-margin-desktop text-center">
        {headingOf(section.data) ? (
          <h2 className="mb-stack-md font-display-lg text-headline-lg text-primary">
            {headingOf(section.data)}
          </h2>
        ) : (
          <MissingOptional label="title" />
        )}
        {bodyOf(section.data) ? (
          <p className="mx-auto mb-stack-lg max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
            {bodyOf(section.data)}
          </p>
        ) : (
          <MissingOptional label="body" />
        )}
        {primary?.href ? (
          <Link
            href={primary.href}
            className="rounded-lg bg-primary px-10 py-5 font-label-sm text-label-sm font-extrabold uppercase tracking-widest text-on-primary shadow-xl transition-all hover:bg-[#0095a4] hover:shadow-[#0095a433]"
          >
            {primary.label}
          </Link>
        ) : primary ? (
          <button
            type="button"
            className="rounded-lg bg-primary px-10 py-5 font-label-sm text-label-sm font-extrabold uppercase tracking-widest text-on-primary shadow-xl transition-all hover:bg-[#0095a4] hover:shadow-[#0095a433]"
          >
            {primary.label}
          </button>
        ) : (
          <MissingOptional label="primary action" />
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 z-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, black 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>
    </section>
  );
}

export function QrRisksAdapter({ section }: { section: PreviewSectionPayload }) {
  const problem = section.cards.find((card) => Boolean(card.body)) ?? section.cards[0];
  const challenge =
    section.cards.find((card) => card !== problem && Boolean(card.body)) ?? section.cards[1];
  const simulation = section.cards.find((card) => !card.body && Boolean(card.title));

  return (
    <section className="grid-bg bg-surface py-stack-lg">
      <div className="mx-auto grid max-w-container-max grid-cols-12 gap-gutter px-margin-desktop">
        <div className="col-span-12 md:col-span-5">
          {headingOf(section.data) ? (
            <h2 className="mb-stack-md font-headline-lg text-headline-lg text-primary">
              {headingOf(section.data)}
            </h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {firstString(section.data.introduction, section.data.body) ? (
            <p className="mb-stack-md font-body-md text-body-md text-on-surface-variant">
              {firstString(section.data.introduction, section.data.body)}
            </p>
          ) : (
            <MissingOptional label="introduction" />
          )}
          <div className="mt-stack-lg space-y-stack-md">
            {problem ? (
              <div className="tech-glow border border-outline-variant/30 bg-white p-stack-md transition-all">
                <h3 className="mb-2 flex items-center gap-2 font-headline-md text-headline-md">
                  {problem.icon ? (
                    <span className="material-symbols-outlined text-error">{problem.icon}</span>
                  ) : (
                    <MissingOptional label="problem icon" />
                  )}
                  {problem.title}
                </h3>
                {problem.body ? (
                  <p className="font-body-md text-on-surface-variant">{problem.body}</p>
                ) : (
                  <MissingOptional label="problem body" />
                )}
              </div>
            ) : (
              <MissingOptional label="problem card" />
            )}
            {challenge ? (
              <div className="tech-glow border border-outline-variant/30 bg-white p-stack-md transition-all">
                <h3 className="mb-2 flex items-center gap-2 font-headline-md text-headline-md">
                  {challenge.icon ? (
                    <span className="material-symbols-outlined text-secondary">{challenge.icon}</span>
                  ) : (
                    <MissingOptional label="challenge icon" />
                  )}
                  {challenge.title}
                </h3>
                {challenge.body ? (
                  <p className="font-body-md text-on-surface-variant">{challenge.body}</p>
                ) : (
                  <MissingOptional label="challenge body" />
                )}
              </div>
            ) : (
              <MissingOptional label="challenge card" />
            )}
          </div>
        </div>
        <div className="col-span-12 flex items-center justify-center md:col-span-7">
          <div className="glass-panel relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl md:aspect-video">
            {simulation?.title ? (
              <div className="absolute bottom-base right-base rounded bg-primary/90 p-stack-sm font-label-sm text-label-sm text-on-primary">
                {simulation.title}
              </div>
            ) : (
              <MissingOptional label="simulation label" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function QrArchitectureAdapter({ section }: { section: PreviewSectionPayload }) {
  const nodes = Array.isArray(section.data.nodes) ? section.data.nodes.map(asRecord) : [];
  const hardware =
    nodes.find((node) => firstString(node.id) === "hardware") ??
    nodes.find((node) => Boolean(asRecord(node.media).source)) ??
    nodes[0];
  const firmware =
    nodes.find((node) => firstString(node.id) === "firmware") ??
    nodes.find((node) => node !== hardware && firstString(node.icon) === "terminal") ??
    nodes[1];
  const cloud =
    nodes.find((node) => firstString(node.id) === "cloud") ??
    nodes.find((node) => node !== hardware && node !== firmware) ??
    nodes[2];
  const annotations = Array.isArray(section.data.annotations)
    ? section.data.annotations.map(asRecord)
    : [];
  const hardwareMedia = asRecord(hardware?.media);
  const hardwareImage = firstString(hardwareMedia.source, hardwareMedia.url, hardware?.imageUrl);
  const hardwareAlt = firstString(hardware?.mediaAlt, hardwareMedia.alt, hardware?.imageAlt);
  const hardwareBadges = Array.isArray(hardware?.badges)
    ? hardware.badges.map((entry) => String(entry).trim()).filter(Boolean)
    : [];

  return (
    <section className="bg-white py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="mb-stack-lg text-center">
          {headingOf(section.data) ? (
            <h2 className="font-headline-lg text-headline-lg text-primary">{headingOf(section.data)}</h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {firstString(section.data.introduction, section.data.body) ? (
            <p className="mt-2 font-body-md text-on-surface-variant">
              {firstString(section.data.introduction, section.data.body)}
            </p>
          ) : (
            <MissingOptional label="introduction" />
          )}
        </div>
        <div className="grid grid-cols-12 gap-gutter">
          {hardware ? (
            <div className="group relative col-span-12 overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-stack-lg md:col-span-8">
              <div className="relative z-10">
                {firstString(hardware.eyebrow) ? (
                  <span className="mb-4 inline-block bg-primary px-3 py-1 font-label-sm text-[10px] text-on-primary">
                    {firstString(hardware.eyebrow)}
                  </span>
                ) : (
                  <MissingOptional label="hardware eyebrow" />
                )}
                {firstString(hardware.label, hardware.title) ? (
                  <h3 className="mb-4 font-headline-lg text-headline-lg">
                    {firstString(hardware.label, hardware.title)}
                  </h3>
                ) : (
                  <MissingOptional label="hardware title" />
                )}
                {firstString(hardware.description, hardware.body) ? (
                  <p className="mb-stack-md max-w-md font-body-md text-on-surface-variant">
                    {firstString(hardware.description, hardware.body)}
                  </p>
                ) : (
                  <MissingOptional label="hardware body" />
                )}
                {hardwareBadges.length ? (
                  <ul className="space-y-2 font-label-sm text-label-sm uppercase tracking-tighter text-primary">
                    {hardwareBadges.map((badge) => (
                      <li key={badge} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                        {badge}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <MissingOptional label="hardware badges" />
                )}
              </div>
              {hardwareImage ? (
                <div className="absolute right-0 top-0 hidden h-full w-1/2 opacity-20 transition-opacity group-hover:opacity-40 lg:block">
                  <StitchImage
                    src={hardwareImage}
                    alt={hardwareAlt ?? ""}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <MissingMedia message="hardware image not resolved" />
              )}
            </div>
          ) : (
            <MissingOptional label="hardware node" />
          )}
          <div className="col-span-12 flex flex-col justify-between rounded-xl bg-primary-container p-stack-lg text-on-primary-container md:col-span-4">
            <div>
              <h3 className="mb-stack-md font-headline-md text-headline-md text-on-primary-fixed">
                Tech Stack
              </h3>
              {annotations.length === 0 ? <MissingOptional label="annotations" /> : null}
              <div className="space-y-4">
                {annotations.map((item, index) => (
                  <div
                    key={`${firstString(item.label)}-${index}`}
                    className="flex items-center justify-between border-b border-on-primary-container/20 pb-2"
                  >
                    {firstString(item.label) ? (
                      <span className="font-body-md">{firstString(item.label)}</span>
                    ) : (
                      <MissingOptional label="stack label" />
                    )}
                    {firstString(item.value) ? (
                      <span className="font-label-sm font-bold">{firstString(item.value)}</span>
                    ) : (
                      <MissingOptional label="stack value" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-stack-lg border-t border-on-primary-container/20 pt-4">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded bg-on-primary-container/10">
                  <span className="material-symbols-outlined">cloud</span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded bg-on-primary-container/10">
                  <span className="material-symbols-outlined">security</span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded bg-on-primary-container/10">
                  <span className="material-symbols-outlined">memory</span>
                </div>
              </div>
            </div>
          </div>
          {firmware ? (
            <div className="col-span-12 rounded-xl border border-outline-variant/10 bg-surface-container p-stack-lg md:col-span-6">
              {firstString(firmware.icon) ? (
                <span className="material-symbols-outlined mb-4 text-4xl text-primary">
                  {firstString(firmware.icon)}
                </span>
              ) : (
                <MissingOptional label="firmware icon" />
              )}
              {firstString(firmware.label, firmware.title) ? (
                <h3 className="mb-2 font-headline-md text-headline-md">
                  {firstString(firmware.label, firmware.title)}
                </h3>
              ) : (
                <MissingOptional label="firmware title" />
              )}
              {firstString(firmware.description, firmware.body) ? (
                <p className="font-body-md text-on-surface-variant">
                  {firstString(firmware.description, firmware.body)}
                </p>
              ) : (
                <MissingOptional label="firmware body" />
              )}
            </div>
          ) : (
            <MissingOptional label="firmware node" />
          )}
          {cloud ? (
            <div className="col-span-12 rounded-xl border border-outline-variant/10 bg-surface-container p-stack-lg md:col-span-6">
              {firstString(cloud.icon) ? (
                <span className="material-symbols-outlined mb-4 text-4xl text-primary">
                  {firstString(cloud.icon)}
                </span>
              ) : (
                <MissingOptional label="cloud icon" />
              )}
              {firstString(cloud.label, cloud.title) ? (
                <h3 className="mb-2 font-headline-md text-headline-md">
                  {firstString(cloud.label, cloud.title)}
                </h3>
              ) : (
                <MissingOptional label="cloud title" />
              )}
              {firstString(cloud.description, cloud.body) ? (
                <p className="font-body-md text-on-surface-variant">
                  {firstString(cloud.description, cloud.body)}
                </p>
              ) : (
                <MissingOptional label="cloud body" />
              )}
            </div>
          ) : (
            <MissingOptional label="cloud node" />
          )}
        </div>
      </div>
    </section>
  );
}

export function QrMetricsAdapter({ section }: { section: PreviewSectionPayload }) {
  const items = Array.isArray(section.data.items)
    ? section.data.items.map(asRecord)
    : [];

  return (
    <section className="bg-primary-container py-stack-lg text-on-primary-container">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="grid grid-cols-12 items-center gap-gutter">
          <div className="col-span-12 space-y-stack-md md:col-span-4">
            {headingOf(section.data) ? (
              <h2 className="font-headline-lg text-headline-lg text-on-primary-fixed">
                {headingOf(section.data)}
              </h2>
            ) : (
              <MissingOptional label="heading" />
            )}
            {firstString(section.data.introduction, section.data.body) ? (
              <p className="font-body-md text-on-primary-container/80">
                {firstString(section.data.introduction, section.data.body)}
              </p>
            ) : (
              <MissingOptional label="introduction" />
            )}
          </div>
          <div className="col-span-12 md:col-span-8">
            {items.length === 0 ? <MissingOptional label="metrics" /> : null}
            <div className="grid grid-cols-1 gap-stack-md md:grid-cols-3">
              {items.map((item, index) => (
                <div
                  key={`${firstString(item.label)}-${index}`}
                  className="rounded border border-white/10 bg-white/5 p-stack-lg text-center backdrop-blur-sm"
                >
                  {firstString(item.value) ? (
                    <div className="mb-2 font-display-lg text-display-lg text-on-primary-fixed">
                      {firstString(item.value)}
                    </div>
                  ) : (
                    <MissingOptional label="metric value" />
                  )}
                  {firstString(item.label) ? (
                    <div className="font-label-sm text-label-sm uppercase tracking-widest">
                      {firstString(item.label)}
                    </div>
                  ) : (
                    <MissingOptional label="metric label" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function QrOutcomesAdapter({ section }: { section: PreviewSectionPayload }) {
  const navHref = labeledActions(section)[0]?.href ?? section.cards[0]?.href;

  return (
    <section className="bg-surface py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="mb-stack-lg flex flex-col items-end justify-between gap-gutter md:flex-row">
          <div className="max-w-xl">
            {headingOf(section.data) ? (
              <h2 className="mb-4 font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
            ) : (
              <MissingOptional label="heading" />
            )}
            {firstString(section.data.introduction, section.data.body) ? (
              <p className="font-body-md text-on-surface-variant">
                {firstString(section.data.introduction, section.data.body)}
              </p>
            ) : (
              <MissingOptional label="introduction" />
            )}
          </div>
          <div className="flex gap-2">
            <Link
              href={navHref || "/iot"}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-outline transition-colors hover:bg-surface-container-high"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </Link>
            <Link
              href={navHref || "/iot"}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-outline transition-colors hover:bg-surface-container-high"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </Link>
          </div>
        </div>
        {section.cards.length === 0 ? <MissingOptional label="outcome cards" /> : null}
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
          {section.cards.map((card) => (
            <div key={card.title} className="border-l-4 border-secondary bg-white p-stack-lg shadow-sm">
              {card.title ? (
                <h4 className="mb-2 font-headline-md text-headline-md">{card.title}</h4>
              ) : (
                <MissingOptional label="outcome title" />
              )}
              {card.body ? (
                <p className="font-body-md text-on-surface-variant">{card.body}</p>
              ) : (
                <MissingOptional label="outcome body" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function QrCtaAdapter({ section }: { section: PreviewSectionPayload }) {
  const [primary, secondary] = labeledActions(section);

  return (
    <section className="relative overflow-hidden bg-primary py-24">
      <div className="relative z-10 mx-auto max-w-container-max px-margin-desktop text-center">
        {headingOf(section.data) ? (
          <h2 className="mb-stack-md font-display-lg text-headline-lg text-on-primary md:text-display-lg">
            {headingOf(section.data)}
          </h2>
        ) : (
          <MissingOptional label="title" />
        )}
        {bodyOf(section.data) ? (
          <p className="mx-auto mb-stack-lg max-w-2xl font-body-lg text-body-lg text-on-primary/70">
            {bodyOf(section.data)}
          </p>
        ) : (
          <MissingOptional label="body" />
        )}
        <div className="flex flex-col justify-center gap-stack-md md:flex-row">
          {primary?.href ? (
            <Link
              href={primary.href}
              className="bg-white px-10 py-5 font-label-sm text-label-sm uppercase tracking-widest text-primary shadow-xl transition-all hover:bg-secondary hover:text-white"
            >
              {primary.label}
            </Link>
          ) : primary ? (
            <button
              type="button"
              className="bg-white px-10 py-5 font-label-sm text-label-sm uppercase tracking-widest text-primary shadow-xl transition-all hover:bg-secondary hover:text-white"
            >
              {primary.label}
            </button>
          ) : (
            <MissingOptional label="primary action" />
          )}
          {secondary?.href ? (
            <Link
              href={secondary.href}
              className="border border-white/30 px-10 py-5 font-label-sm text-label-sm uppercase tracking-widest text-on-primary transition-all hover:bg-white/10"
            >
              {secondary.label}
            </Link>
          ) : secondary ? (
            <button
              type="button"
              className="border border-white/30 px-10 py-5 font-label-sm text-label-sm uppercase tracking-widest text-on-primary transition-all hover:bg-white/10"
            >
              {secondary.label}
            </button>
          ) : (
            <MissingOptional label="secondary action" />
          )}
        </div>
      </div>
    </section>
  );
}

export function QrRelatedAdapter({ section }: { section: PreviewSectionPayload }) {
  return (
    <section className="bg-white py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        {headingOf(section.data) ? (
          <h3 className="mb-stack-md font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
            {headingOf(section.data)}
          </h3>
        ) : (
          <MissingOptional label="heading" />
        )}
        {section.cards.length === 0 ? <MissingOptional label="related projects" /> : null}
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
          {section.cards.map((card) => {
            const inner = (
              <>
                {card.imageUrl ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${card.imageUrl}')` }}
                  />
                ) : (
                  <MissingMedia message={`${card.title} image not resolved`} />
                )}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-stack-lg">
                  {card.eyebrow ? (
                    <span className="font-label-sm text-label-sm text-white/60">{card.eyebrow}</span>
                  ) : (
                    <MissingOptional label="project eyebrow" />
                  )}
                  {card.title ? (
                    <h4 className="font-headline-md text-headline-md text-white">{card.title}</h4>
                  ) : (
                    <MissingOptional label="project title" />
                  )}
                </div>
              </>
            );
            const className = "group relative aspect-[16/7] overflow-hidden rounded-xl";
            return card.href ? (
              <Link key={card.title} href={card.href} className={className}>
                {inner}
              </Link>
            ) : (
              <div key={card.title} className={className}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function RnHeroAdapter({ section }: { section: PreviewSectionPayload }) {
  const [primary, secondary] = labeledActions(section);
  const title = headingOf(section.data);
  const titleParts = title?.split(/(?<=\.)\s+/).filter(Boolean) ?? [];
  const callouts = Array.isArray(section.data.callouts)
    ? section.data.callouts.map(asRecord)
    : [];
  const highlight = callouts[0];
  const eyebrowIcon = firstString(section.data.eyebrowIcon);

  return (
    <header className="relative overflow-hidden pb-32 pt-24">
      <div className="relative z-10 mx-auto grid max-w-container-max grid-cols-12 gap-gutter px-margin-desktop">
        <div className="col-span-12 flex flex-col justify-center lg:col-span-7">
          {eyebrowOf(section.data) ? (
            <div className="mb-stack-sm inline-flex w-fit items-center gap-2 rounded-full bg-primary-fixed px-3 py-1 text-on-primary-fixed">
              {eyebrowIcon ? (
                <span className="material-symbols-outlined text-[14px]">{eyebrowIcon}</span>
              ) : (
                <MissingOptional label="eyebrow icon" />
              )}
              <span className="font-label-sm text-label-sm uppercase tracking-widest">
                {eyebrowOf(section.data)}
              </span>
            </div>
          ) : (
            <MissingOptional label="eyebrow" />
          )}
          {title ? (
            <h1 className="mb-stack-md font-display-lg text-display-lg leading-tight text-primary">
              {titleParts.length > 1 ? (
                <>
                  {titleParts[0]} <br />
                  {titleParts.slice(1).join(" ")}
                </>
              ) : (
                title
              )}
            </h1>
          ) : (
            <MissingOptional label="title" />
          )}
          {bodyOf(section.data) ? (
            <p className="mb-stack-lg max-w-xl font-body-lg text-body-lg text-on-surface-variant">
              {bodyOf(section.data)}
            </p>
          ) : (
            <MissingOptional label="summary" />
          )}
          <div className="flex gap-4">
            {primary?.href ? (
              <Link
                href={primary.href}
                className="group flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-label-sm text-label-sm text-on-primary transition-all hover:gap-4"
              >
                {primary.label}
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            ) : primary ? (
              <button
                type="button"
                className="group flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-label-sm text-label-sm text-on-primary"
              >
                {primary.label}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            ) : (
              <MissingOptional label="primary action" />
            )}
            {secondary?.href ? (
              <Link
                href={secondary.href}
                className="rounded-full border border-outline-variant px-8 py-4 font-label-sm text-label-sm transition-all hover:bg-surface-container"
              >
                {secondary.label}
              </Link>
            ) : secondary ? (
              <button
                type="button"
                className="rounded-full border border-outline-variant px-8 py-4 font-label-sm text-label-sm"
              >
                {secondary.label}
              </button>
            ) : (
              <MissingOptional label="secondary action" />
            )}
          </div>
        </div>
        <div className="relative col-span-12 hidden lg:col-span-5 lg:block">
          <div className="glass group relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-fixed/20 to-transparent" />
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center rounded-2xl border border-outline-variant/30 bg-surface/50 p-8 text-center backdrop-blur-md">
              {firstString(highlight?.icon) ? (
                <span
                  className="material-symbols-outlined mb-4 text-[64px] text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {firstString(highlight?.icon)}
                </span>
              ) : (
                <MissingOptional label="highlight icon" />
              )}
              {firstString(highlight?.title) ? (
                <div className="mb-2 font-headline-md text-headline-md text-primary">
                  {firstString(highlight?.title)}
                </div>
              ) : (
                <MissingOptional label="highlight title" />
              )}
              {firstString(highlight?.body) ? (
                <div className="font-label-sm text-label-sm text-on-surface-variant">
                  {firstString(highlight?.body)}
                </div>
              ) : (
                <MissingOptional label="highlight body" />
              )}
            </div>
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-4 -translate-y-4 border-r-2 border-t-2 border-primary/20" />
            <div className="absolute bottom-0 left-0 h-32 w-32 -translate-x-4 translate-y-4 border-b-2 border-l-2 border-primary/20" />
          </div>
        </div>
      </div>
    </header>
  );
}

export function RnFamiliesAdapter({ section }: { section: PreviewSectionPayload }) {
  const rawCards = Array.isArray(section.data.cards) ? section.data.cards.map(asRecord) : [];

  return (
    <section className="bg-surface-container-low py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="mb-stack-lg">
          {headingOf(section.data) ? (
            <h2 className="mb-4 text-center font-headline-lg text-headline-lg text-primary">
              {headingOf(section.data)}
            </h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {firstString(section.data.introduction, section.data.body) ? (
            <p className="mx-auto max-w-2xl text-center font-body-md text-body-md text-on-surface-variant">
              {firstString(section.data.introduction, section.data.body)}
            </p>
          ) : (
            <MissingOptional label="introduction" />
          )}
        </div>
        {section.cards.length === 0 ? <MissingOptional label="cards" /> : null}
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {section.cards.map((card, index) => {
            const raw = rawCards[index] ?? {};
            const badge = decodeMojibake(card.badges?.[0] ?? firstString(raw.badge));
            const featured = index === 1;
            return (
              <div
                key={`${card.title}-${index}`}
                className={
                  featured
                    ? "technical-glow rounded-xl border border-outline bg-primary-container p-8 text-on-primary-container transition-all hover:shadow-xl"
                    : "technical-glow rounded-xl border border-outline-variant bg-surface p-8 transition-all hover:shadow-xl"
                }
              >
                <div className="mb-12 flex items-start justify-between">
                  <div
                    className={
                      featured
                        ? "flex h-12 w-12 items-center justify-center rounded-lg bg-on-primary-container/10"
                        : "flex h-12 w-12 items-center justify-center rounded-lg bg-surface-container"
                    }
                  >
                    {card.icon ? (
                      <span
                        className={
                          featured
                            ? "material-symbols-outlined text-on-primary-fixed"
                            : "material-symbols-outlined text-primary"
                        }
                      >
                        {card.icon}
                      </span>
                    ) : (
                      <MissingOptional label="family icon" />
                    )}
                  </div>
                  {badge ? (
                    <span
                      className={
                        featured
                          ? "rounded border border-on-primary-container/30 px-2 py-1 font-label-sm text-label-sm text-on-primary-container/80"
                          : "rounded border border-outline-variant px-2 py-1 font-label-sm text-label-sm text-outline"
                      }
                    >
                      {badge}
                    </span>
                  ) : (
                    <MissingOptional label="family badge" />
                  )}
                </div>
                {card.title ? (
                  <h3
                    className={
                      featured
                        ? "mb-4 font-headline-md text-headline-md text-on-primary-fixed"
                        : "mb-4 font-headline-md text-headline-md text-primary"
                    }
                  >
                    {decodeMojibake(card.title)}
                  </h3>
                ) : (
                  <MissingOptional label="family title" />
                )}
                {card.body ? (
                  <p
                    className={
                      featured
                        ? "mb-8 font-body-md text-body-md text-on-primary-container/70"
                        : "mb-8 font-body-md text-body-md text-on-surface-variant"
                    }
                  >
                    {card.body}
                  </p>
                ) : (
                  <MissingOptional label="family body" />
                )}
                {card.items?.length ? (
                  <ul className="space-y-3 font-label-sm text-label-sm">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span
                          className={
                            featured
                              ? "h-1.5 w-1.5 rounded-full bg-on-primary-fixed"
                              : "h-1.5 w-1.5 rounded-full bg-primary"
                          }
                        />
                        {decodeMojibake(item)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <MissingOptional label="family items" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function RnExperienceAdapter({ section }: { section: PreviewSectionPayload }) {
  const bullets = labeledEntries(section.data.bullets);
  const callouts = Array.isArray(section.data.callouts)
    ? section.data.callouts.map(asRecord)
    : [];
  const overlay = callouts[0];

  return (
    <section className="relative overflow-hidden bg-surface py-stack-lg">
      <div className="mx-auto grid max-w-container-max grid-cols-12 items-center gap-gutter px-margin-desktop">
        <div className="col-span-12 lg:col-span-6">
          <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl">
            {section.media.url ? (
              <StitchImage
                src={section.media.url}
                alt={section.media.alt ?? ""}
                className="h-full w-full object-cover"
              />
            ) : (
              <MissingMedia message={section.media.missing ?? "engineering image not resolved"} />
            )}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-8">
              {firstString(overlay?.title) ? (
                <div className="font-headline-md text-headline-md text-on-primary">
                  {firstString(overlay?.title)}
                </div>
              ) : (
                <MissingOptional label="overlay title" />
              )}
              {firstString(overlay?.body) ? (
                <p className="font-body-md text-body-md text-on-primary/80">
                  {firstString(overlay?.body)}
                </p>
              ) : (
                <MissingOptional label="overlay body" />
              )}
            </div>
          </div>
        </div>
        <div className="col-span-12 space-y-stack-md lg:col-span-6 lg:pl-12">
          {headingOf(section.data) ? (
            <h2 className="font-headline-lg text-headline-lg text-primary">
              {headingOf(section.data)}
            </h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {bullets.length === 0 ? <MissingOptional label="bullets" /> : null}
          <div className="space-y-6">
            {bullets.map((bullet) => (
              <div key={bullet.title} className="flex gap-4">
                {bullet.icon ? (
                  <span
                    className="material-symbols-outlined shrink-0 text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {bullet.icon}
                  </span>
                ) : (
                  <MissingOptional label="bullet icon" />
                )}
                <div>
                  {bullet.title ? (
                    <h4 className="mb-1 font-headline-md text-[20px] text-primary">{bullet.title}</h4>
                  ) : (
                    <MissingOptional label="bullet title" />
                  )}
                  {bullet.body ? (
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {decodeMojibake(bullet.body)}
                    </p>
                  ) : (
                    <MissingOptional label="bullet body" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function RnVerticalsAdapter({ section }: { section: PreviewSectionPayload }) {
  const rawCards = Array.isArray(section.data.cards) ? section.data.cards.map(asRecord) : [];

  return (
    <section className="overflow-hidden bg-surface-container-high py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        {headingOf(section.data) ? (
          <h2 className="mb-12 font-headline-lg text-headline-lg text-primary">
            {headingOf(section.data)}
          </h2>
        ) : (
          <MissingOptional label="heading" />
        )}
        {section.cards.length === 0 ? <MissingOptional label="cards" /> : null}
        <div className="flex flex-col gap-gutter md:flex-row">
          {section.cards.map((card, index) => {
            const raw = rawCards[index] ?? {};
            const badge = card.badges?.[0] ?? firstString(raw.badge, card.eyebrow);
            return (
              <div
                key={`${card.title}-${index}`}
                className="group flex-1 overflow-hidden rounded-2xl bg-surface shadow-sm transition-transform duration-500 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-64 overflow-hidden">
                  {card.imageUrl ? (
                    <StitchImage
                      src={card.imageUrl}
                      alt={card.imageAlt ?? ""}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <MissingMedia message={`${card.title} image not resolved`} />
                  )}
                  {badge ? (
                    <div className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 font-label-sm text-label-sm text-on-primary">
                      {badge}
                    </div>
                  ) : (
                    <MissingOptional label="vertical badge" />
                  )}
                </div>
                <div className="p-8">
                  {card.title ? (
                    <h3 className="mb-4 font-headline-md text-headline-md text-primary">{card.title}</h3>
                  ) : (
                    <MissingOptional label="vertical title" />
                  )}
                  {card.body ? (
                    <p className="mb-6 font-body-md text-body-md text-on-surface-variant">{card.body}</p>
                  ) : (
                    <MissingOptional label="vertical body" />
                  )}
                  {card.href && card.label ? (
                    <Link
                      href={card.href}
                      className="inline-flex items-center gap-2 font-label-sm text-label-sm text-primary transition-all hover:gap-3"
                    >
                      {card.label}
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </Link>
                  ) : card.label ? (
                    <span className="inline-flex items-center gap-2 font-label-sm text-label-sm text-primary">
                      {card.label}
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </span>
                  ) : (
                    <MissingOptional label="vertical action" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function RnCtaAdapter({ section }: { section: PreviewSectionPayload }) {
  const [primary] = labeledActions(section);
  const items = Array.isArray(section.data.items) ? section.data.items.map(asRecord) : [];
  const title = headingOf(section.data);
  const eyebrow = eyebrowOf(section.data);
  const showEyebrow = eyebrow && eyebrow !== title;

  return (
    <section className="relative py-stack-lg">
      <div className="relative z-10 mx-auto max-w-4xl px-margin-mobile text-center">
        {showEyebrow ? (
          <span className="mb-4 block font-label-sm text-label-sm uppercase tracking-widest text-primary">
            {eyebrow}
          </span>
        ) : null}
        {title ? (
          <h2 className="mb-stack-md font-display-lg text-headline-lg text-primary lg:text-display-lg">
            {title}
          </h2>
        ) : (
          <MissingOptional label="title" />
        )}
        {bodyOf(section.data) ? (
          <p className="mb-stack-lg font-body-lg text-body-lg text-on-surface-variant">
            {bodyOf(section.data)}
          </p>
        ) : (
          <MissingOptional label="body" />
        )}
        {items.length === 0 ? <MissingOptional label="metrics" /> : null}
        <div className="mb-stack-lg grid grid-cols-2 gap-gutter md:grid-cols-4">
          {items.map((item, index) => (
            <div
              key={`${firstString(item.label)}-${index}`}
              className="rounded-xl border border-outline-variant bg-surface p-6"
            >
              {firstString(item.value) ? (
                <div className="font-display-lg text-[32px] text-primary">
                  {decodeMojibake(firstString(item.value))}
                </div>
              ) : (
                <MissingOptional label="metric value" />
              )}
              {firstString(item.label) ? (
                <div className="font-label-sm text-label-sm text-on-surface-variant">
                  {firstString(item.label)}
                </div>
              ) : (
                <MissingOptional label="metric label" />
              )}
            </div>
          ))}
        </div>
        {primary?.href ? (
          <Link
            href={primary.href}
            className="rounded-full bg-primary px-12 py-5 font-headline-md text-headline-md text-on-primary transition-transform hover:scale-105"
          >
            {primary.label}
          </Link>
        ) : primary ? (
          <button
            type="button"
            className="rounded-full bg-primary px-12 py-5 font-headline-md text-headline-md text-on-primary"
          >
            {primary.label}
          </button>
        ) : (
          <MissingOptional label="primary action" />
        )}
      </div>
    </section>
  );
}

export function RequestConsultationResponsibilityAdapter({
  section,
}: {
  section: PreviewSectionPayload;
}) {
  const eyebrow = eyebrowOf(section.data);
  const title = headingOf(section.data);
  const body = bodyOf(section.data);

  return (
    <section className="mt-16 bg-surface-container py-16 md:mt-24 md:py-24">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          {eyebrow ? (
            <p className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
              {eyebrow}
            </p>
          ) : (
            <MissingOptional label="eyebrow" />
          )}
          {title ? (
            <h2 className="font-headline-lg text-headline-lg">{title}</h2>
          ) : (
            <MissingOptional label="title" />
          )}
          {body ? (
            <p className="font-body-lg text-on-surface-variant">{body}</p>
          ) : (
            <MissingOptional label="body" />
          )}
        </div>
      </div>
    </section>
  );
}

function solutionCatalogCards(section: PreviewSectionPayload) {
  return Array.isArray(section.data.cards) ? section.data.cards.map(asRecord) : [];
}

function solutionCardItems(card: Record<string, unknown>) {
  return stringItems(card.items).map((item) => decodeMojibake(item)).filter(Boolean);
}

function solutionCardMedia(card: Record<string, unknown>) {
  const media = asRecord(card.media);
  return firstString(media.source, card.imageUrl, card.image);
}

function solutionCardActions(card: Record<string, unknown>) {
  const nested = Array.isArray(card.actions)
    ? card.actions
        .map((item) => {
          const record = asRecord(item);
          const label = firstString(record.label, record.text);
          if (!label) return null;
          return { label, href: firstString(record.href, record.url) };
        })
        .filter((item): item is { label: string; href?: string } => Boolean(item))
    : [];
  if (nested.length) return nested;
  const link = asRecord(card.link);
  const label = firstString(link.label, card.label);
  const href = firstString(link.href, link.url, card.href, card.url);
  return label ? [{ label, href }] : [];
}

export function SolutionsCatalogAdapter({ section }: { section: PreviewSectionPayload }) {
  const cards = solutionCatalogCards(section);
  const gateway = cards[0] ?? {};
  const bms = cards[1] ?? {};
  const charger = cards[2] ?? {};
  const tracking = cards[3] ?? {};
  const gatewayItems = solutionCardItems(gateway);
  const gatewayFeatures = stringItems(gateway.features).length
    ? stringItems(gateway.features)
    : gatewayItems.slice(0, 3);
  const gatewayApplications = stringItems(gateway.applications).length
    ? stringItems(gateway.applications)
    : gatewayItems.slice(3);
  const gatewayAction = solutionCardActions(gateway)[0];
  const gatewayBadge = firstString(gateway.badge, ...(Array.isArray(gateway.badges) ? gateway.badges : []));
  const bmsHighlight = asRecord(bms.highlight);
  const bmsItems = solutionCardItems(bms).filter(
    (item) => !/state of health|accuracy/i.test(item)
  );
  const sohTitle = firstString(bmsHighlight.title) ?? "State of Health (SoH)";
  const sohAccuracy =
    decodeMojibake(firstString(bmsHighlight.body, bmsHighlight.accuracy)) ||
    decodeMojibake(
      solutionCardItems(bms).find((item) => /accuracy|state of health/i.test(item))
    );
  const sohProgress = Number(bmsHighlight.progress);
  const chargerImage = solutionCardMedia(charger);
  const trackingActions = solutionCardActions(tracking);
  const trackingMap = solutionCardMedia(tracking);
  const coordinates = decodeMojibake(firstString(tracking.coordinates, tracking.location));

  return (
    <div className="mx-auto max-w-container-max px-margin-desktop py-stack-lg">
      {cards.length === 0 ? <MissingOptional label="solution cards" /> : null}
      <div className="grid grid-cols-12 gap-gutter">
        <div className="col-span-12 flex flex-col gap-stack-md rounded-xl p-8 glass-card group md:col-span-7">
          <div className="flex items-start justify-between">
            <div className="rounded-lg bg-primary p-4 text-on-primary">
              <span className="material-symbols-outlined text-3xl">
                {firstString(gateway.icon) ?? "router"}
              </span>
            </div>
            {gatewayBadge ? (
              <span className="rounded border border-outline-variant px-2 py-1 font-label-sm text-label-sm text-on-surface-variant">
                {gatewayBadge}
              </span>
            ) : (
              <MissingOptional label="gateway badge" />
            )}
          </div>
          <div>
            {firstString(gateway.title) ? (
              <h2 className="mb-base font-headline-lg text-headline-lg">{firstString(gateway.title)}</h2>
            ) : (
              <MissingOptional label="gateway title" />
            )}
            {firstString(gateway.body) ? (
              <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">
                {firstString(gateway.body)}
              </p>
            ) : (
              <MissingOptional label="gateway body" />
            )}
          </div>
          <div className="grid grid-cols-2 gap-stack-md">
            <div>
              <span className="mb-2 block font-label-sm text-label-sm font-bold uppercase tracking-tighter text-primary">
                Key Features
              </span>
              {gatewayFeatures.length === 0 ? <MissingOptional label="key features" /> : (
                <ul className="space-y-1 font-label-sm text-label-sm text-on-surface-variant">
                  {gatewayFeatures.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <span className="mb-2 block font-label-sm text-label-sm font-bold uppercase tracking-tighter text-primary">
                Applications
              </span>
              {gatewayApplications.length === 0 ? <MissingOptional label="applications" /> : (
                <ul className="space-y-1 font-label-sm text-label-sm text-on-surface-variant">
                  {gatewayApplications.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {gatewayAction?.href ? (
            <Link
              href={gatewayAction.href}
              className="mt-auto flex items-center gap-2 font-label-sm text-label-sm font-bold text-primary transition-transform group-hover:translate-x-2"
            >
              {gatewayAction.label}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          ) : gatewayAction ? (
            <span className="mt-auto flex items-center gap-2 font-label-sm text-label-sm font-bold text-primary">
              {gatewayAction.label}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </span>
          ) : (
            <MissingOptional label="datasheet action" />
          )}
        </div>

        <div className="col-span-12 flex flex-col gap-stack-md rounded-xl border border-outline-variant bg-white p-8 transition-colors hover:border-primary md:col-span-5">
          <div className="w-fit rounded-lg bg-secondary-container p-4 text-on-secondary-container">
            <span className="material-symbols-outlined text-3xl">
              {firstString(bms.icon) ?? "battery_charging_full"}
            </span>
          </div>
          <div>
            {firstString(bms.title) ? (
              <h2 className="mb-base font-headline-md text-headline-md">{firstString(bms.title)}</h2>
            ) : (
              <MissingOptional label="BMS title" />
            )}
            {firstString(bms.body) ? (
              <p className="font-body-md text-body-md text-on-surface-variant">{firstString(bms.body)}</p>
            ) : (
              <MissingOptional label="BMS body" />
            )}
          </div>
          <div className="space-y-4">
            <div className="rounded-lg bg-surface-container-low p-4">
              <span className="mb-1 block font-label-sm text-label-sm font-bold">{sohTitle}</span>
              <div className="h-1 w-full overflow-hidden rounded-full bg-outline-variant">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: `${Number.isFinite(sohProgress) ? Math.min(100, Math.max(0, sohProgress)) : 94}%`,
                  }}
                />
              </div>
              {sohAccuracy ? (
                <span className="mt-1 block font-label-sm text-[10px] text-on-surface-variant">
                  {sohAccuracy.startsWith("ACCURACY") ? sohAccuracy : `ACCURACY: ${sohAccuracy.replace(/.*accuracy:\s*/i, "")}`}
                </span>
              ) : (
                <MissingOptional label="SoH accuracy" />
              )}
            </div>
            {bmsItems.length === 0 ? <MissingOptional label="BMS checks" /> : (
              <ul className="space-y-2 font-label-sm text-label-sm text-on-surface-variant">
                {bmsItems.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="col-span-12 flex flex-col overflow-hidden rounded-xl glass-card group md:col-span-5">
          <div className="relative h-48 overflow-hidden">
            {chargerImage ? (
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                role="img"
                aria-label={firstString(charger.mediaAlt, charger.imageAlt) ?? ""}
                style={{ backgroundImage: `url('${chargerImage}')` }}
              />
            ) : (
              <MissingMedia message="EV charger image not resolved" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-6 text-white">
              {firstString(charger.eyebrow) ? (
                <span className="font-label-sm text-label-sm uppercase text-white/80">
                  {firstString(charger.eyebrow)}
                </span>
              ) : (
                <MissingOptional label="charger eyebrow" />
              )}
              {firstString(charger.title) ? (
                <h3 className="font-headline-md text-headline-md">{firstString(charger.title)}</h3>
              ) : (
                <MissingOptional label="charger title" />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-stack-sm p-8">
            {firstString(charger.body) ? (
              <p className="font-body-md text-body-md text-on-surface-variant">{firstString(charger.body)}</p>
            ) : (
              <MissingOptional label="charger body" />
            )}
            {Array.isArray(charger.badges) && charger.badges.length ? (
              <div className="flex flex-wrap gap-2">
                {charger.badges.map((badge) => (
                  <span
                    key={String(badge)}
                    className="rounded bg-surface-container px-2 py-1 font-label-sm text-[10px] uppercase text-on-surface-variant"
                  >
                    {String(badge)}
                  </span>
                ))}
              </div>
            ) : (
              <MissingOptional label="charger badges" />
            )}
          </div>
        </div>

        <div className="col-span-12 flex flex-col gap-8 rounded-xl p-8 glass-card md:col-span-7 md:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-4">
            <div className="inline-flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined">{firstString(tracking.icon) ?? "location_on"}</span>
              {firstString(tracking.eyebrow) ? (
                <span className="font-label-sm text-label-sm font-bold uppercase tracking-widest">
                  {firstString(tracking.eyebrow)}
                </span>
              ) : (
                <MissingOptional label="tracking eyebrow" />
              )}
            </div>
            {firstString(tracking.title) ? (
              <h2 className="font-headline-lg text-headline-lg">{firstString(tracking.title)}</h2>
            ) : (
              <MissingOptional label="tracking title" />
            )}
            {firstString(tracking.body) ? (
              <p className="font-body-md text-body-md text-on-surface-variant">{firstString(tracking.body)}</p>
            ) : (
              <MissingOptional label="tracking body" />
            )}
            <div className="flex items-center gap-4">
              {trackingActions.length === 0 ? <MissingOptional label="tracking actions" /> : null}
              {trackingActions.map((action, index) =>
                action.href ? (
                  <Link
                    key={`${action.label}-${action.href}`}
                    href={action.href}
                    className={
                      index === 0
                        ? "rounded bg-primary px-6 py-3 font-label-sm text-label-sm text-on-primary transition-all hover:bg-primary/90"
                        : "rounded border border-outline-variant px-6 py-3 font-label-sm text-label-sm transition-all hover:bg-surface-container"
                    }
                  >
                    {action.label}
                  </Link>
                ) : (
                  <span key={action.label} className="rounded border border-outline-variant px-6 py-3 font-label-sm text-label-sm">
                    {action.label}
                  </span>
                )
              )}
            </div>
          </div>
          <div className="flex w-full flex-col justify-center gap-4 rounded-lg border border-outline-variant/30 bg-surface-container-high p-4 md:w-1/3">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="font-label-sm text-[10px]">GNSS LOCK</span>
              <span className="material-symbols-outlined text-sm text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                signal_cellular_alt
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase text-on-surface-variant">Coordinates</div>
              {coordinates ? (
                <div className="font-label-sm text-label-sm text-primary">{coordinates}</div>
              ) : (
                <MissingOptional label="coordinates" />
              )}
            </div>
            <div className="relative h-24 overflow-hidden rounded border border-outline-variant bg-white">
              {trackingMap ? (
                <div
                  className="h-full w-full bg-cover bg-center grayscale opacity-50"
                  style={{ backgroundImage: `url('${trackingMap}')` }}
                />
              ) : (
                <MissingMedia message="asset tracking map not resolved" />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-3 w-3 animate-ping rounded-full bg-primary" />
                <div className="absolute h-2 w-2 rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SolutionsInquiryAdapter({ section }: { section: PreviewSectionPayload }) {
  const title = headingOf(section.data);
  const accent = "Matrix-Core Systems.";
  const accentIndex = title?.indexOf(accent) ?? -1;
  const callouts = Array.isArray(section.data.callouts)
    ? section.data.callouts.map(asRecord)
    : [];
  const inquiry = callouts.find((item) => firstString(item.title) === "Technical Inquiry") ?? callouts[2];
  const trust = callouts.filter((item) => firstString(item.title) !== "Technical Inquiry");
  const options = Array.isArray(inquiry?.options) ? inquiry.options.map(String) : [];
  const [submit] = labeledActions(section);

  return (
    <section className="relative overflow-hidden bg-primary-container py-stack-lg text-on-primary-container">
      <div className="pointer-events-none absolute inset-0 opacity-10" />
      <div className="relative z-10 mx-auto grid max-w-container-max grid-cols-12 gap-gutter px-margin-desktop">
        <div className="col-span-12 flex flex-col justify-center gap-stack-md lg:col-span-6">
          {title ? (
            <h2 className="font-display-lg text-headline-lg text-white">
              {accentIndex >= 0 ? (
                <>
                  {title.slice(0, accentIndex).trimEnd()}
                  <br />
                  <span className="text-on-primary-container">{accent}</span>
                </>
              ) : (
                title
              )}
            </h2>
          ) : (
            <MissingOptional label="title" />
          )}
          {bodyOf(section.data) ? (
            <p className="max-w-lg font-body-lg text-body-lg text-on-primary-container/70">
              {bodyOf(section.data)}
            </p>
          ) : (
            <MissingOptional label="body" />
          )}
          <div className="flex flex-wrap gap-stack-md">
            {trust.length === 0 ? <MissingOptional label="trust callouts" /> : null}
            {trust.map((item) => (
              <div key={firstString(item.title)} className="flex items-center gap-3">
                <span className="material-symbols-outlined text-4xl opacity-50">
                  {firstString(item.icon) ?? "verified"}
                </span>
                <div>
                  <span className="block font-label-sm text-label-sm text-white">
                    {firstString(item.title)}
                  </span>
                  {firstString(item.body) ? (
                    <span className="block font-label-sm text-[10px] opacity-60">
                      {firstString(item.body)}
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <div className="flex flex-col gap-6 rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
            <h3 className="font-headline-md text-headline-md text-white">
              {firstString(inquiry?.title) ?? "Technical Inquiry"}
            </h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="rounded border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition-all placeholder:text-white/40 focus:border-transparent focus:ring-2 focus:ring-primary"
                  placeholder="Full Name"
                  type="text"
                  readOnly
                />
                <input
                  className="rounded border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition-all placeholder:text-white/40 focus:border-transparent focus:ring-2 focus:ring-primary"
                  placeholder="Work Email"
                  type="email"
                  readOnly
                />
              </div>
              <select className="w-full rounded border-white/20 bg-white/10 px-4 py-3 text-white/40 outline-none transition-all focus:ring-2 focus:ring-primary">
                <option>Select Solution Category</option>
                {options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <textarea
                className="w-full rounded border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition-all placeholder:text-white/40 focus:ring-2 focus:ring-primary"
                placeholder="Project requirements"
                rows={3}
                readOnly
              />
              {submit?.href ? (
                <Link
                  href={submit.href}
                  className="w-full rounded bg-white py-4 text-center font-bold uppercase tracking-widest text-primary text-label-sm transition-all hover:bg-white/90"
                >
                  {submit.label}
                </Link>
              ) : submit ? (
                <span className="block w-full rounded bg-white py-4 text-center font-bold uppercase tracking-widest text-primary text-label-sm">
                  {submit.label}
                </span>
              ) : (
                <MissingOptional label="inquiry action" />
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function tiCards(section: PreviewSectionPayload) {
  return Array.isArray(section.data.cards) ? section.data.cards.map(asRecord) : [];
}

function tiCardMedia(card: Record<string, unknown>) {
  const media = asRecord(card.media);
  return firstString(media.source, card.imageUrl, card.image);
}

function tiMetrics(card: Record<string, unknown>) {
  return Array.isArray(card.metrics)
    ? card.metrics
        .map((item) => {
          const record = asRecord(item);
          const value = firstString(record.value, record.stat);
          const label = firstString(record.label, record.title);
          if (!value && !label) return null;
          return { value: value ?? "", label: label ?? "" };
        })
        .filter((item): item is { value: string; label: string } => Boolean(item))
    : [];
}

export function TiDomainsAdapter({ section }: { section: PreviewSectionPayload }) {
  const cards = tiCards(section);
  const power = cards[0] ?? {};
  const analog = cards[1] ?? {};
  const rest = cards.slice(2);
  const analogImage = tiCardMedia(analog);
  const domainIcons = ["memory", "router", "radar"];

  return (
    <section className="mx-auto max-w-container-max px-margin-desktop py-stack-lg">
      <div className="mb-16 flex items-end justify-between">
        <div>
          {headingOf(section.data) ? (
            <h2 className="mb-4 font-headline-lg text-headline-lg text-primary">
              {headingOf(section.data)}
            </h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {firstString(section.data.introduction) ? (
            <p className="max-w-lg font-body-md text-body-md text-on-surface-variant">
              {firstString(section.data.introduction)}
            </p>
          ) : (
            <MissingOptional label="introduction" />
          )}
        </div>
        <div className="mx-12 hidden h-[1px] flex-grow bg-outline-variant/30 md:block" />
      </div>
      {cards.length === 0 ? <MissingOptional label="domain cards" /> : null}
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-12">
        <div className="technical-glow group relative overflow-hidden border border-outline-variant bg-white p-12 transition-all duration-500 hover:border-primary md:col-span-8">
          <div className="absolute right-0 top-0 p-8 opacity-10 transition-opacity group-hover:opacity-100">
            <span className="material-symbols-outlined text-6xl">{firstString(power.icon) ?? "bolt"}</span>
          </div>
          <span className="mb-6 block font-label-sm text-label-sm uppercase tracking-widest text-on-primary-container">
            {firstString(power.eyebrow) ?? "Efficiency & Density"}
          </span>
          {firstString(power.title) ? (
            <h3 className="mb-6 font-headline-md text-headline-md text-primary">{firstString(power.title)}</h3>
          ) : (
            <MissingOptional label="power title" />
          )}
          {firstString(power.body) ? (
            <p className="mb-8 max-w-md font-body-md text-body-md text-on-surface-variant">
              {decodeMojibake(firstString(power.body))}
            </p>
          ) : (
            <MissingOptional label="power body" />
          )}
          <div className="grid grid-cols-2 gap-8 border-t border-outline-variant/20 pt-8">
            {tiMetrics(power).length === 0 ? <MissingOptional label="power metrics" /> : null}
            {tiMetrics(power).map((metric) => (
              <div key={metric.label}>
                <div className="mb-1 font-display-lg text-2xl text-primary">{metric.value}</div>
                <div className="font-label-sm text-label-sm text-on-surface-variant">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="group relative overflow-hidden bg-primary-container p-10 text-on-primary md:col-span-4">
          <span className="mb-6 block font-label-sm text-label-sm uppercase tracking-widest text-on-primary-container">
            {firstString(analog.eyebrow) ?? "Data Integrity"}
          </span>
          {firstString(analog.title) ? (
            <h3 className="mb-6 font-headline-md text-headline-md">{firstString(analog.title)}</h3>
          ) : (
            <MissingOptional label="analog title" />
          )}
          {firstString(analog.body) ? (
            <p className="mb-12 font-body-md text-body-md text-on-primary-container">
              {firstString(analog.body)}
            </p>
          ) : (
            <MissingOptional label="analog body" />
          )}
          <div className="mt-auto">
            {analogImage ? (
              <StitchImage
                src={analogImage}
                alt={firstString(analog.mediaAlt, analog.imageAlt) ?? ""}
                className="h-32 w-full object-cover opacity-50 transition-opacity group-hover:opacity-80"
              />
            ) : (
              <MissingMedia message="precision analog image not resolved" />
            )}
          </div>
        </div>
        {rest.map((card, index) => (
          <div
            key={firstString(card.title) ?? index}
            className={
              index === 0
                ? "glass-panel group p-10 transition-all duration-300 hover:bg-white md:col-span-4"
                : "group border border-outline-variant p-10 transition-all duration-300 hover:border-primary md:col-span-4"
            }
          >
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-sm bg-surface-container">
              <span className="material-symbols-outlined text-primary">
                {firstString(card.icon) ?? domainIcons[index] ?? "memory"}
              </span>
            </div>
            {firstString(card.title) ? (
              <h3 className="mb-4 font-headline-md text-headline-md text-primary">{firstString(card.title)}</h3>
            ) : (
              <MissingOptional label="domain title" />
            )}
            {firstString(card.body) ? (
              <p className="font-body-md text-body-md text-on-surface-variant">
                {decodeMojibake(firstString(card.body))}
              </p>
            ) : (
              <MissingOptional label="domain body" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function TiIntegrityAdapter({ section }: { section: PreviewSectionPayload }) {
  const bullets = stringItems(section.data.bullets);
  const image = section.media.url ?? firstString(asRecord(section.data.media).source);

  return (
    <section className="relative overflow-hidden bg-primary-container py-24">
      <div className="absolute inset-0 opacity-10" />
      <div className="relative z-10 mx-auto grid max-w-container-max grid-cols-12 gap-gutter px-margin-desktop">
        <div className="col-span-12 text-on-primary md:col-span-5">
          {eyebrowOf(section.data) ? (
            <span className="mb-4 block font-label-sm text-label-sm uppercase tracking-widest text-on-primary-container">
              {eyebrowOf(section.data)}
            </span>
          ) : (
            <MissingOptional label="eyebrow" />
          )}
          {headingOf(section.data) ? (
            <h2 className="mb-8 font-display-lg text-headline-lg">{headingOf(section.data)}</h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {bullets.length === 0 ? <MissingOptional label="architecture bullets" /> : (
            <ul className="space-y-6">
              {bullets.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="material-symbols-outlined mt-1 text-on-primary-container">check_circle</span>
                  <p className="font-body-md text-body-md text-on-primary-container">{item}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-span-12 mt-12 md:col-span-7 md:mt-0">
          <div className="glass-panel flex aspect-video items-center justify-center overflow-hidden border-white/10 p-4">
            {image ? (
              <StitchImage
                src={image}
                alt={section.media.alt ?? firstString(section.data.mediaAlt) ?? ""}
                className="h-full w-full object-cover"
              />
            ) : (
              <MissingMedia message="signal integrity diagram not resolved" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function TiFusionAdapter({ section }: { section: PreviewSectionPayload }) {
  const paragraphs = decodeMojibake(bodyOf(section.data))
    .split(/\n\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
  const [action] = labeledActions(section);
  const chipImage = section.media.url ?? firstString(asRecord(section.data.media).source);
  const callout = asRecord(Array.isArray(section.data.callouts) ? section.data.callouts[0] : undefined);
  const factoryImage = firstString(asRecord(callout.media).source);

  return (
    <section className="mx-auto max-w-container-max px-margin-desktop py-stack-lg">
      <div className="grid grid-cols-1 items-center gap-stack-lg md:grid-cols-2">
        <div className="order-2 md:order-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex aspect-square items-center justify-center border border-outline-variant bg-surface-container p-8">
              <span className="material-symbols-outlined text-5xl text-primary/20">developer_board</span>
            </div>
            <div className="flex aspect-square items-center justify-center overflow-hidden border border-outline-variant bg-white">
              {chipImage ? (
                <StitchImage
                  src={chipImage}
                  alt={section.media.alt ?? firstString(section.data.mediaAlt) ?? ""}
                  className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                />
              ) : (
                <MissingMedia message="sensor fusion chip image not resolved" />
              )}
            </div>
            <div className="flex aspect-square items-center justify-center overflow-hidden border border-outline-variant bg-white">
              {factoryImage ? (
                <StitchImage
                  src={factoryImage}
                  alt={firstString(callout.mediaAlt) ?? ""}
                  className="h-full w-full object-cover"
                />
              ) : (
                <MissingMedia message="sensor fusion factory image not resolved" />
              )}
            </div>
            <div className="flex aspect-square items-center justify-center border border-outline-variant bg-surface-container-high">
              <span className="material-symbols-outlined text-5xl text-primary/40">settings_input_component</span>
            </div>
          </div>
        </div>
        <div className="order-1 pl-0 md:order-2 md:pl-16">
          {eyebrowOf(section.data) ? (
            <span className="mb-6 block font-label-sm text-label-sm uppercase tracking-widest text-on-primary-container">
              {eyebrowOf(section.data)}
            </span>
          ) : (
            <MissingOptional label="eyebrow" />
          )}
          {headingOf(section.data) ? (
            <h2 className="mb-8 font-headline-lg text-headline-lg leading-tight text-primary">
              {headingOf(section.data)}
            </h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {paragraphs.length === 0 ? <MissingOptional label="body" /> : null}
          {paragraphs.map((paragraph, index) => (
            <p
              key={paragraph.slice(0, 24)}
              className={index === paragraphs.length - 1 ? "mb-10 font-body-md text-body-md text-on-surface-variant" : "mb-6 font-body-md text-body-md text-on-surface-variant"}
            >
              {paragraph}
            </p>
          ))}
          {action?.href ? (
            <Link
              href={action.href}
              className="inline-flex items-center gap-2 border-b border-primary pb-1 font-label-sm text-label-sm font-bold text-primary transition-all hover:gap-4"
            >
              {action.label}
              <span className="material-symbols-outlined text-sm">north_east</span>
            </Link>
          ) : action ? (
            <span className="inline-flex items-center gap-2 border-b border-primary pb-1 font-label-sm text-label-sm font-bold text-primary">
              {action.label}
              <span className="material-symbols-outlined text-sm">north_east</span>
            </span>
          ) : (
            <MissingOptional label="design resources action" />
          )}
        </div>
      </div>
    </section>
  );
}

export function TiInfrastructureAdapter({ section }: { section: PreviewSectionPayload }) {
  const cards = tiCards(section);
  const fallbackIcons = ["medical_services", "ev_station", "factory"];

  return (
    <section className="bg-surface-container px-margin-desktop py-24">
      <div className="mx-auto mb-16 max-w-container-max text-center">
        {headingOf(section.data) ? (
          <h2 className="mb-4 font-headline-lg text-headline-lg text-primary">{headingOf(section.data)}</h2>
        ) : (
          <MissingOptional label="heading" />
        )}
        {firstString(section.data.introduction) ? (
          <p className="mx-auto max-w-2xl font-body-md text-body-md text-on-surface-variant">
            {firstString(section.data.introduction)}
          </p>
        ) : (
          <MissingOptional label="introduction" />
        )}
      </div>
      {cards.length === 0 ? <MissingOptional label="infrastructure cards" /> : null}
      <div className="mx-auto grid max-w-container-max grid-cols-1 gap-gutter md:grid-cols-3">
        {cards.map((card, index) => {
          const image = tiCardMedia(card);
          return (
            <div key={firstString(card.title) ?? index} className="group relative h-[500px] overflow-hidden">
              {image ? (
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                  role="img"
                  aria-label={firstString(card.mediaAlt, card.imageAlt) ?? ""}
                  style={{ backgroundImage: `url('${image}')` }}
                />
              ) : (
                <MissingMedia message={`${firstString(card.title) ?? "infrastructure"} image not resolved`} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
              <div className="absolute bottom-0 p-10 text-on-primary">
                <span className="mb-4 text-3xl material-symbols-outlined">
                  {firstString(card.icon) ?? fallbackIcons[index] ?? "factory"}
                </span>
                {firstString(card.title) ? (
                  <h4 className="mb-4 font-headline-md text-headline-md">{firstString(card.title)}</h4>
                ) : (
                  <MissingOptional label="vertical title" />
                )}
                {firstString(card.body) ? (
                  <p className="font-body-md text-body-md text-on-primary-container opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {firstString(card.body)}
                  </p>
                ) : (
                  <MissingOptional label="vertical body" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function TiAdvantageAdapter({ section }: { section: PreviewSectionPayload }) {
  const items = Array.isArray(section.data.items) ? section.data.items.map(asRecord) : [];

  return (
    <section className="border-t border-outline-variant/10 bg-white px-margin-desktop py-stack-lg">
      <div className="mx-auto max-w-container-max">
        <div className="flex flex-col gap-stack-lg md:flex-row">
          <div className="md:w-1/3">
            {headingOf(section.data) ? (
              <h2 className="mb-8 font-headline-lg text-headline-lg text-primary">{headingOf(section.data)}</h2>
            ) : (
              <MissingOptional label="title" />
            )}
            {bodyOf(section.data) ? (
              <p className="font-body-md text-body-md text-on-surface-variant">{bodyOf(section.data)}</p>
            ) : (
              <MissingOptional label="body" />
            )}
          </div>
          <div className="grid grid-cols-1 gap-x-gutter gap-y-12 md:w-2/3 md:grid-cols-2">
            {items.length === 0 ? <MissingOptional label="advantage items" /> : null}
            {items.map((item) => (
              <div key={firstString(item.title)}>
                {firstString(item.title) ? (
                  <h5 className="mb-3 font-headline-md text-headline-md text-primary">{firstString(item.title)}</h5>
                ) : (
                  <MissingOptional label="item title" />
                )}
                {firstString(item.body) ? (
                  <p className="font-body-md text-body-md text-on-surface-variant">{firstString(item.body)}</p>
                ) : (
                  <MissingOptional label="item body" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function TiCtaAdapter({ section }: { section: PreviewSectionPayload }) {
  const [action] = labeledActions(section);

  return (
    <section className="px-margin-desktop py-24 text-center">
      <div className="group relative mx-auto max-w-3xl overflow-hidden glass-panel p-16">
        <div className="absolute inset-0 translate-y-full bg-primary transition-transform duration-500 ease-in-out group-hover:translate-y-0" />
        <div className="relative z-10 transition-colors duration-500 group-hover:text-on-primary">
          {headingOf(section.data) ? (
            <h2 className="mb-8 font-display-lg text-headline-lg">{headingOf(section.data)}</h2>
          ) : (
            <MissingOptional label="title" />
          )}
          {bodyOf(section.data) ? (
            <p className="mb-10 font-body-lg text-body-lg opacity-70">{bodyOf(section.data)}</p>
          ) : (
            <MissingOptional label="body" />
          )}
          {action?.href ? (
            <Link
              href={action.href}
              className="rounded-none bg-primary px-10 py-5 font-label-sm text-label-sm uppercase tracking-[0.2em] text-on-primary transition-colors group-hover:bg-white group-hover:text-primary"
            >
              {action.label}
            </Link>
          ) : action ? (
            <span className="rounded-none bg-primary px-10 py-5 font-label-sm text-label-sm uppercase tracking-[0.2em] text-on-primary">
              {action.label}
            </span>
          ) : (
            <MissingOptional label="cta action" />
          )}
        </div>
      </div>
    </section>
  );
}

const WSN_OVERVIEW_ICONS: Record<string, string> = {
  "Heterogeneous Mesh Architecture": "grid_view",
  "5-Year Lifespan": "battery_charging_full",
  "AES-128 Encryption": "security",
  "Sub-GHz Range": "dynamic_feed",
};

function wsnOverviewItems(section: PreviewSectionPayload) {
  return Array.isArray(section.data.items) ? section.data.items.map(asRecord) : [];
}

function wsnItemIcon(item: Record<string, unknown>) {
  const title = firstString(item.title, item.label);
  return firstString(item.icon) ?? (title ? WSN_OVERVIEW_ICONS[title] : undefined);
}

function wsnMediaList(data: Record<string, unknown>) {
  if (Array.isArray(data.media)) {
    return data.media
      .map((item) => {
        if (typeof item === "string") return { source: item, alt: "" };
        const record = asRecord(item);
        const source = firstString(record.source, record.url);
        if (!source) return null;
        return { source, alt: firstString(record.alt, record.mediaAlt) ?? "" };
      })
      .filter((item): item is { source: string; alt: string } => Boolean(item));
  }
  const record = asRecord(data.media);
  const source = firstString(record.source, record.url, data.imageUrl);
  return source ? [{ source, alt: firstString(data.mediaAlt, record.alt) ?? "" }] : [];
}

function wsnStrategyTitle(title?: string) {
  if (!title) return null;
  const marker = "Your ";
  const index = title.indexOf(marker);
  if (index === -1) return title;
  return (
    <>
      {title.slice(0, index + marker.length)}
      <br />
      {title.slice(index + marker.length)}
    </>
  );
}

export function WsnOverviewAdapter({ section }: { section: PreviewSectionPayload }) {
  const items = wsnOverviewItems(section);
  const feature = items[0] ?? {};
  const metric = items[1] ?? {};
  const rest = items.slice(2);
  const featureIcon = wsnItemIcon(feature) ?? "grid_view";
  const quote = quotedBody(firstString(metric.quote));

  return (
    <section className="bg-surface-container-low py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="mb-stack-md border-l-4 border-primary pl-6">
          {headingOf(section.data) ? (
            <h2 className="mb-2 font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
          ) : (
            <MissingOptional label="title" />
          )}
          {bodyOf(section.data) ? (
            <p className="max-w-2xl font-body-md text-on-surface-variant">{bodyOf(section.data)}</p>
          ) : (
            <MissingOptional label="body" />
          )}
        </div>
        <div className="grid grid-cols-12 gap-gutter">
          <div className="col-span-12 rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-10 transition-colors hover:border-primary/40 md:col-span-8">
            <span className="material-symbols-outlined mb-6 text-4xl text-primary">{featureIcon}</span>
            {firstString(feature.title) ? (
              <h3 className="mb-4 font-headline-md text-headline-md">{firstString(feature.title)}</h3>
            ) : (
              <MissingOptional label="mesh title" />
            )}
            {firstString(feature.body) ? (
              <p className="font-body-md leading-relaxed text-on-surface-variant">{firstString(feature.body)}</p>
            ) : (
              <MissingOptional label="mesh body" />
            )}
          </div>
          <div className="col-span-12 flex flex-col justify-between rounded-xl bg-primary p-10 text-on-primary md:col-span-4">
            <div>
              {firstString(metric.value) ? (
                <h3 className="mb-2 font-headline-md text-headline-md">{firstString(metric.value)}</h3>
              ) : (
                <MissingOptional label="uptime value" />
              )}
              {firstString(metric.label) ? (
                <p className="font-label-sm text-label-sm uppercase tracking-widest opacity-80">
                  {firstString(metric.label)}
                </p>
              ) : (
                <MissingOptional label="uptime label" />
              )}
            </div>
            <div className="mt-8">
              {quote ? (
                <p className="font-body-md italic opacity-90">{quote}</p>
              ) : (
                <MissingOptional label="uptime quote" />
              )}
            </div>
          </div>
          {rest.length === 0 ? <MissingOptional label="capability cards" /> : null}
          {rest.map((item, index) => (
            <div
              key={`${firstString(item.title)}-${index}`}
              className="col-span-12 rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-8 md:col-span-4"
            >
              <span className="material-symbols-outlined mb-4 text-3xl text-primary">
                {wsnItemIcon(item) ?? "sensors"}
              </span>
              {firstString(item.title) ? (
                <h4 className="mb-2 font-headline-md text-headline-md">{firstString(item.title)}</h4>
              ) : (
                <MissingOptional label="capability title" />
              )}
              {firstString(item.body) ? (
                <p className="font-body-md text-on-surface-variant">{firstString(item.body)}</p>
              ) : (
                <MissingOptional label="capability body" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WsnTopologyAdapter({ section }: { section: PreviewSectionPayload }) {
  const nodes = Array.isArray(section.data.nodes) ? section.data.nodes.map(asRecord) : [];
  const sensors = nodes.filter(
    (node) => firstString(node.group) === "Distributed Sensors" || /^node/i.test(firstString(node.id, node.label) ?? "")
  );
  const gateway =
    nodes.find((node) => Array.isArray(node.protocols) || firstString(node.id) === "gateway") ?? {};
  const enterprise = nodes.filter((node) => firstString(node.group) === "Enterprise Layer");
  const sensorGroup = firstString(...sensors.map((node) => node.group)) ?? "Distributed Sensors";
  const enterpriseGroup = firstString(...enterprise.map((node) => node.group)) ?? "Enterprise Layer";
  const protocols = Array.isArray(gateway.protocols)
    ? gateway.protocols.map((item) => String(item)).filter(Boolean)
    : [];
  const enterpriseIcon = (label?: string) => {
    if (label && /analytics/i.test(label)) return "analytics";
    if (label && /control/i.test(label)) return "dashboard";
    return "hub";
  };

  return (
    <section className="overflow-hidden py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="mx-auto mb-stack-md max-w-3xl text-center">
          {headingOf(section.data) ? (
            <h2 className="mb-4 font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {firstString(section.data.introduction, section.data.body) ? (
            <p className="font-body-md text-on-surface-variant">
              {firstString(section.data.introduction, section.data.body)}
            </p>
          ) : (
            <MissingOptional label="introduction" />
          )}
        </div>
        <div className="relative rounded-2xl border border-outline-variant/20 bg-surface-container p-4 md:p-12">
          <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-3">
            <div className="space-y-6">
              <div className="mb-4 text-center font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                {sensorGroup}
              </div>
              {sensors.length === 0 ? <MissingOptional label="sensor nodes" /> : null}
              {sensors.map((node, index) => (
                <div
                  key={firstString(node.id, node.label) ?? index}
                  className={`flex items-center gap-4 rounded-lg border border-primary/20 p-6 glass-panel${index === 1 ? " translate-x-4" : ""}`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10">
                    <span className="material-symbols-outlined text-primary">
                      {firstString(node.icon) ?? "sensors"}
                    </span>
                  </div>
                  <div>
                    {firstString(node.label, node.title) ? (
                      <p className="font-label-sm font-bold">{firstString(node.label, node.title)}</p>
                    ) : (
                      <MissingOptional label="node label" />
                    )}
                    {firstString(node.description, node.body) ? (
                      <p className="text-[10px] text-on-surface-variant">
                        {firstString(node.description, node.body)}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center">
              <div className="relative flex h-48 w-48 flex-col items-center justify-center rounded-full bg-primary text-on-primary shadow-2xl">
                <div className="absolute inset-0 animate-ping rounded-full border-4 border-primary/30" />
                <span className="material-symbols-outlined mb-2 text-5xl">
                  {firstString(gateway.icon) ?? "router"}
                </span>
                {firstString(gateway.label, gateway.title) ? (
                  <span className="font-label-sm text-label-sm font-bold">
                    {firstString(gateway.label, gateway.title)}
                  </span>
                ) : (
                  <MissingOptional label="gateway label" />
                )}
                {firstString(gateway.description, gateway.body) ? (
                  <span className="text-[10px] opacity-70">
                    {firstString(gateway.description, gateway.body)}
                  </span>
                ) : null}
              </div>
              <div className="mt-8 flex gap-4">
                {protocols.length === 0 ? <MissingOptional label="gateway protocols" /> : null}
                {protocols.map((protocol) => (
                  <div
                    key={protocol}
                    className="rounded border border-outline-variant bg-surface px-3 py-1 font-label-sm text-[10px]"
                  >
                    {protocol}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="mb-4 text-center font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                {enterpriseGroup}
              </div>
              {enterprise.length === 0 ? <MissingOptional label="enterprise nodes" /> : null}
              {enterprise.map((node, index) => {
                const label = firstString(node.label, node.title);
                const isControl = /control/i.test(label ?? "");
                return (
                  <div
                    key={firstString(node.id, label) ?? index}
                    className="rounded-xl border border-outline-variant/30 bg-white p-8 shadow-sm"
                  >
                    <h4 className="mb-4 flex items-center gap-2 font-label-sm text-label-sm font-bold">
                      <span className="material-symbols-outlined text-primary">
                        {firstString(node.icon) ?? enterpriseIcon(label)}
                      </span>
                      {label ?? <MissingOptional label="enterprise label" />}
                    </h4>
                    {isControl ? (
                      <div className="grid grid-cols-4 gap-2">
                        <div className="aspect-square rounded bg-primary-container" />
                        <div className="aspect-square rounded bg-surface-container" />
                        <div className="aspect-square rounded bg-primary-container" />
                        <div className="aspect-square rounded bg-surface-container" />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="h-2 w-full rounded-full bg-surface-container" />
                        <div className="h-2 w-3/4 rounded-full bg-surface-container" />
                        <div className="h-2 w-5/6 rounded-full bg-surface-container" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20" preserveAspectRatio="none">
            <line stroke="black" strokeDasharray="8 4" strokeWidth="2" x1="30%" x2="45%" y1="50%" y2="50%" />
            <line stroke="black" strokeDasharray="8 4" strokeWidth="2" x1="55%" x2="70%" y1="50%" y2="50%" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export function WsnStandardsAdapter({ section }: { section: PreviewSectionPayload }) {
  const items = Array.isArray(section.data.items) ? section.data.items.map(asRecord) : [];
  const protocols = items.filter((item) => !firstString(item.description, item.body));
  const capabilities = items.filter((item) => firstString(item.description, item.body));

  return (
    <section className="bg-primary-container py-stack-lg text-on-primary-container">
      <div className="mx-auto grid max-w-container-max grid-cols-12 items-center gap-gutter px-margin-desktop">
        <div className="col-span-12 mb-10 lg:col-span-5 lg:mb-0">
          {headingOf(section.data) ? (
            <h2 className="mb-6 font-headline-lg text-headline-lg text-white">{headingOf(section.data)}</h2>
          ) : (
            <MissingOptional label="heading" />
          )}
          {firstString(section.data.body, section.data.introduction) ? (
            <p className="mb-8 font-body-md leading-relaxed opacity-80">
              {decodeMojibake(firstString(section.data.body, section.data.introduction))}
            </p>
          ) : (
            <MissingOptional label="body" />
          )}
          <div className="grid grid-cols-2 gap-4">
            {protocols.length === 0 ? <MissingOptional label="protocol checklist" /> : null}
            {protocols.map((item, index) => (
              <div key={`${firstString(item.label)}-${index}`} className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-primary-container">check_circle</span>
                <span className="font-label-sm">{decodeMojibake(firstString(item.label, item.title))}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-7">
          {capabilities.length === 0 ? <MissingOptional label="capability cards" /> : null}
          {capabilities.map((item, index) => (
            <div key={`${firstString(item.label)}-${index}`} className="rounded-lg border border-white/10 bg-white/5 p-6">
              {firstString(item.label, item.title) ? (
                <h4 className="mb-2 font-headline-md text-headline-md text-white">
                  {firstString(item.label, item.title)}
                </h4>
              ) : (
                <MissingOptional label="capability title" />
              )}
              {firstString(item.description, item.body) ? (
                <p className="font-body-md text-sm opacity-70">
                  {decodeMojibake(firstString(item.description, item.body))}
                </p>
              ) : (
                <MissingOptional label="capability body" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WsnApplicationsAdapter({ section }: { section: PreviewSectionPayload }) {
  const [nav] = labeledActions(section);
  const cards = Array.isArray(section.data.cards) ? section.data.cards.map(asRecord) : [];

  return (
    <section className="py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop">
        <div className="mb-stack-md flex items-end justify-between">
          <div className="max-w-xl">
            {headingOf(section.data) ? (
              <h2 className="mb-4 font-headline-lg text-headline-lg">{headingOf(section.data)}</h2>
            ) : (
              <MissingOptional label="heading" />
            )}
            {firstString(section.data.introduction, section.data.body) ? (
              <p className="font-body-md text-on-surface-variant">
                {firstString(section.data.introduction, section.data.body)}
              </p>
            ) : (
              <MissingOptional label="introduction" />
            )}
          </div>
          {nav?.href ? (
            <Link
              href={nav.href}
              className="hidden border-b border-primary pb-1 font-label-sm text-label-sm text-primary md:block"
            >
              {nav.label}
            </Link>
          ) : nav ? (
            <span className="hidden border-b border-primary pb-1 font-label-sm text-label-sm text-primary md:block">
              {nav.label}
            </span>
          ) : (
            <MissingOptional label="case studies link" />
          )}
        </div>
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
          {cards.length === 0 ? <MissingOptional label="application cards" /> : null}
          {cards.map((card, index) => {
            const preview = section.cards[index];
            const image = firstString(asRecord(card.media).source, preview?.imageUrl, card.imageUrl);
            const alt =
              firstString(asRecord(card.media).alt, card.mediaAlt, preview?.imageAlt, card.imageAlt) ?? "";
            return (
              <div
                key={`${firstString(card.title)}-${index}`}
                className="group relative aspect-[16/10] overflow-hidden rounded-xl bg-surface-container"
              >
                {image ? (
                  <StitchImage
                    src={image}
                    alt={alt}
                    className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <MissingMedia message="application image not resolved" />
                )}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10 text-white">
                  {firstString(card.eyebrow, preview?.eyebrow) ? (
                    <span className="mb-2 font-label-sm text-label-sm uppercase tracking-widest opacity-70">
                      {firstString(card.eyebrow, preview?.eyebrow)}
                    </span>
                  ) : (
                    <MissingOptional label="application eyebrow" />
                  )}
                  {firstString(card.title, preview?.title) ? (
                    <h3 className="font-headline-md text-headline-md">
                      {firstString(card.title, preview?.title)}
                    </h3>
                  ) : (
                    <MissingOptional label="application title" />
                  )}
                  {firstString(card.body, preview?.body) ? (
                    <p className="mt-4 font-body-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {firstString(card.body, preview?.body)}
                    </p>
                  ) : (
                    <MissingOptional label="application body" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function WsnCtaAdapter({ section }: { section: PreviewSectionPayload }) {
  const [primary, secondary] = labeledActions(section);
  const partners = wsnMediaList(section.data);
  const title = headingOf(section.data);

  return (
    <section className="border-t border-outline-variant/20 py-stack-lg">
      <div className="mx-auto max-w-container-max px-margin-desktop text-center">
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-outline-variant bg-surface p-12 shadow-sm md:p-20">
          <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
          {title ? (
            <h2 className="mb-6 font-display-lg text-headline-lg">{wsnStrategyTitle(title)}</h2>
          ) : (
            <MissingOptional label="title" />
          )}
          {bodyOf(section.data) ? (
            <p className="mb-10 font-body-lg text-on-surface-variant">{bodyOf(section.data)}</p>
          ) : (
            <MissingOptional label="body" />
          )}
          <div className="flex flex-col justify-center gap-4 md:flex-row">
            {primary?.href ? (
              <Link
                href={primary.href}
                className="rounded-lg bg-primary px-10 py-5 font-label-sm text-label-sm text-on-primary shadow-lg transition-opacity hover:opacity-90"
              >
                {primary.label}
              </Link>
            ) : primary ? (
              <span className="rounded-lg bg-primary px-10 py-5 font-label-sm text-label-sm text-on-primary shadow-lg">
                {primary.label}
              </span>
            ) : (
              <MissingOptional label="primary action" />
            )}
            {secondary?.href ? (
              <Link
                href={secondary.href}
                className="rounded-lg border border-outline-variant bg-white px-10 py-5 font-label-sm text-label-sm transition-colors hover:bg-surface-container-low"
              >
                {secondary.label}
              </Link>
            ) : secondary ? (
              <span className="rounded-lg border border-outline-variant bg-white px-10 py-5 font-label-sm text-label-sm">
                {secondary.label}
              </span>
            ) : (
              <MissingOptional label="secondary action" />
            )}
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 opacity-60">
            {partners.length === 0 ? <MissingOptional label="partner logos" /> : null}
            {partners.map((partner, index) => (
              <StitchImage
                key={`${partner.source}-${index}`}
                src={partner.source}
                alt={partner.alt}
                className="h-6 grayscale"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function MissingAdapter({ section }: { section: PreviewSectionPayload }) {
  return (
    <section className="px-margin-mobile py-8 md:px-margin-desktop">
      <div className="rounded-xl border border-dashed border-error/40 bg-error/5 p-6 text-sm">
        <p className="font-medium">Preview adapter missing</p>
        <p>template: {section.template || "(missing)"}</p>
        <p>stableKey: {section.stableKey || "(missing)"}</p>
        <p>model: {section.model || "(missing)"}</p>
        <p>source.component: {section.sourceComponent || "(missing)"}</p>
        <p className="mt-2 text-on-surface-variant">
          This section was not approximated with a generic renderer.
        </p>
      </div>
    </section>
  );
}
