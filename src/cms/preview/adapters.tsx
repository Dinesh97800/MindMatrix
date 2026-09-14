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
  HeroGrid,
  HeroSection,
  HeroTitle,
  HeroVisual,
  cn,
  heroLayout,
} from "@/components/sections/hero";
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
  const variant = asString(section.data.variant) === "background" ? "background" : "split";
  const cta = (
    <ActionLinks
      actions={section.actions}
      primaryClass="rounded-full bg-primary px-8 py-3 font-label-sm text-label-sm font-bold text-on-primary transition-colors hover:bg-primary/90"
      secondaryClass="rounded-full border border-outline px-8 py-3 font-label-sm text-label-sm transition-all hover:bg-surface-container"
    />
  );

  if (!title) {
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
        <HeroSection tone="dark">
          <HeroContainer>
            <HeroContent>
              {section.media.missing || !section.media.url ? (
                <MissingMedia message={section.media.missing ?? "background image not resolved"} />
              ) : null}
              {eyebrow ? <HeroEyebrow tone="dark">{eyebrow}</HeroEyebrow> : null}
              <HeroTitle tone="dark">{title}</HeroTitle>
              {description ? <HeroDescription tone="dark">{description}</HeroDescription> : null}
              {cta ? <HeroActions>{cta}</HeroActions> : null}
            </HeroContent>
          </HeroContainer>
        </HeroSection>
      );
    }
    return (
      <BackgroundImageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        backgroundImage={section.media.url}
        backgroundAlt={section.media.alt}
      >
        {cta}
      </BackgroundImageHero>
    );
  }

  if (!section.media.url) {
    return (
      <HeroSection tone="dark">
        <HeroContainer>
          <HeroContent>
            <MissingMedia message={section.media.missing ?? "hero image not resolved"} />
            {eyebrow ? <HeroEyebrow tone="dark">{eyebrow}</HeroEyebrow> : null}
            <HeroTitle tone="dark">{title}</HeroTitle>
            {description ? <HeroDescription tone="dark">{description}</HeroDescription> : null}
            {cta ? <HeroActions>{cta}</HeroActions> : null}
          </HeroContent>
        </HeroContainer>
      </HeroSection>
    );
  }

  const imageOnLeft = asString(section.data.alignment) === "right";
  return (
    <HeroSection tone="dark">
      <HeroContainer>
        <HeroGrid>
          <HeroContent className={cn(imageOnLeft && "lg:order-2", !imageOnLeft && "lg:order-1")}>
            {eyebrow ? <HeroEyebrow tone="dark">{eyebrow}</HeroEyebrow> : null}
            <HeroTitle tone="dark">{title}</HeroTitle>
            {description ? <HeroDescription tone="dark">{description}</HeroDescription> : null}
            {asString(section.data.supportingText) ? (
              <p className="mb-10 max-w-xl font-body-md text-body-md text-white/60">
                {asString(section.data.supportingText)}
              </p>
            ) : null}
            {cta ? <HeroActions>{cta}</HeroActions> : null}
          </HeroContent>
          <HeroVisual
            hideOnMobile={false}
            className={cn(imageOnLeft && "lg:order-1", !imageOnLeft && "lg:order-2")}
          >
            <div className={heroLayout.imageFrame}>
              <img
                src={section.media.url}
                alt={section.media.alt ?? ""}
                className="h-full min-h-[220px] w-full rounded-lg object-cover"
              />
            </div>
          </HeroVisual>
        </HeroGrid>
      </HeroContainer>
    </HeroSection>
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
        ) : null}
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
                Object.entries(entity.fields).map(([label, value]) =>
                  value ? (
                    <div key={label}>
                      <h3 className="mb-1 font-label-sm text-label-sm uppercase tracking-wide text-on-surface-variant">
                        {label}
                      </h3>
                      <p className="text-on-surface-variant">{value}</p>
                    </div>
                  ) : null
                )
              )}
            </article>
          ))}
        </div>
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
