"use client";

/**
 * Legacy generic CMS preview renderer.
 * Admin preview now uses src/cms/preview/CanonicalPreview.tsx.
 * Do NOT use this on public pages.
 */
import Link from "next/link";
import { BackgroundImageHero, SplitHero } from "@/components/sections/hero";
import { getSectionDefinition } from "@/cms/sections/registry";
import type { HeroSectionData, CtaSectionData, CapabilitiesSectionData } from "@/cms/sections/types";
import type { SerializedSection } from "@/cms/sections/types";

function mediaUrl(data: HeroSectionData, kind: "image" | "background") {
  if (kind === "background") {
    return data.backgroundImageId
      ? `/api/cms/media/${data.backgroundImageId}`
      : data.backgroundImageUrl || data.imageUrl || "";
  }
  return data.imageId ? `/api/cms/media/${data.imageId}` : data.imageUrl || "";
}

function HeroPreview({ data }: { data: HeroSectionData }) {
  const cta =
    data.ctaText && data.ctaUrl ? (
      <Link href={data.ctaUrl} className="rounded-full bg-primary px-8 py-3 font-label-sm text-white">
        {data.ctaText}
      </Link>
    ) : null;

  if (data.variant === "background") {
    return (
      <BackgroundImageHero
        eyebrow={data.eyebrow}
        title={data.title}
        description={data.description}
        backgroundImage={mediaUrl(data, "background") || "/images/placeholder.webp"}
        backgroundAlt={data.imageAlt}
        overlay={data.overlay ? "dark" : undefined}
      >
        {cta}
      </BackgroundImageHero>
    );
  }

  return (
    <SplitHero
      eyebrow={data.eyebrow}
      title={data.title}
      description={data.description}
      image={mediaUrl(data, "image") || "/images/placeholder.webp"}
      imageAlt={data.imageAlt ?? ""}
      imagePosition={data.alignment === "right" ? "left" : "right"}
    >
      {cta}
    </SplitHero>
  );
}

function CapabilitiesPreview({ data }: { data: CapabilitiesSectionData }) {
  return (
    <section className="border-y border-outline-variant/10 bg-surface-container-low px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-8 font-headline-lg text-headline-lg">{data.heading ?? "Typical Scope"}</h2>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {(data.items ?? []).map((item) => (
            <li key={item} className="rounded-lg border bg-white p-4 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function RichTextPreview({ content }: { content: Record<string, unknown> | null }) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <pre className="whitespace-pre-wrap text-sm text-on-surface-variant">
        {JSON.stringify(content, null, 2)}
      </pre>
    </section>
  );
}

function CtaPreview({ data }: { data: CtaSectionData }) {
  return (
    <section className="bg-primary/5 px-4 py-16">
      <div className="mx-auto max-w-4xl text-center">
        {data.title ? <h2 className="font-headline-lg text-primary">{data.title}</h2> : null}
        {data.description ? (
          <p className="mt-3 text-on-surface-variant">{data.description}</p>
        ) : null}
        {data.buttonText && data.buttonUrl ? (
          <Link
            href={data.buttonUrl}
            className="mt-6 inline-flex rounded-lg bg-primary px-6 py-3 text-white"
          >
            {data.buttonText}
          </Link>
        ) : null}
      </div>
    </section>
  );
}

function StructuredPreview({ data }: { data: Record<string, unknown> }) {
  const title = String(data.title ?? "");
  const description = String(data.description ?? "");
  const items = Array.isArray(data.items) ? data.items : [];
  const cards = Array.isArray(data.cards) ? data.cards : [];
  const stats = Array.isArray(data.stats) ? data.stats : [];
  const faqs = Array.isArray(data.faqs) ? data.faqs : [];
  const studies = Array.isArray(data.studies) ? data.studies : [];

  return (
    <section className="border-y border-outline-variant/10 bg-surface-container-low px-4 py-12">
      <div className="mx-auto max-w-5xl space-y-4">
        {data.componentKey ? (
          <p className="text-xs uppercase tracking-wide text-on-surface-variant">
            {String(data.componentKey)}
          </p>
        ) : null}
        {title ? <h2 className="font-headline-lg text-headline-lg">{title}</h2> : null}
        {description ? <p className="text-on-surface-variant">{description}</p> : null}
        {stats.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {stats.map((stat, index) => (
              <div key={index} className="rounded-lg border bg-white p-4 text-sm">
                {typeof stat === "object" && stat
                  ? JSON.stringify(stat)
                  : String(stat)}
              </div>
            ))}
          </div>
        ) : null}
        {items.length > 0 ? (
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {items.slice(0, 8).map((item, index) => (
              <li key={index} className="rounded-lg border bg-white p-4 text-sm">
                {typeof item === "object" && item ? JSON.stringify(item) : String(item)}
              </li>
            ))}
          </ul>
        ) : null}
        {cards.length > 0 ? (
          <p className="text-sm text-on-surface-variant">{cards.length} card(s) in CMS data.</p>
        ) : null}
        {faqs.length > 0 ? (
          <p className="text-sm text-on-surface-variant">{faqs.length} FAQ item(s) in CMS data.</p>
        ) : null}
        {studies.length > 0 ? (
          <p className="text-sm text-on-surface-variant">{studies.length} case study record(s) in CMS data.</p>
        ) : null}
      </div>
    </section>
  );
}

export function SectionRenderer({ section }: { section: SerializedSection }) {
  if (!section.isVisible) return null;

  const definition = getSectionDefinition(section.type);
  if (!definition) {
    return (
      <div className="border border-dashed p-6 text-sm text-on-surface-variant">
        Unknown section type: {section.type}
      </div>
    );
  }

  const data = definition.validate(section.data ?? {});

  switch (section.type) {
    case "hero":
      return <HeroPreview data={data as HeroSectionData} />;
    case "capabilities":
      return <CapabilitiesPreview data={data as CapabilitiesSectionData} />;
    case "rich_text":
      return (
        <RichTextPreview
          content={(data as { content: Record<string, unknown> | null }).content}
        />
      );
    case "cta":
      return <CtaPreview data={data as CtaSectionData} />;
    default:
      return <StructuredPreview data={data} />;
  }
}
