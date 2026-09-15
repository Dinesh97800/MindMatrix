import type { PreviewAction, PreviewCard } from "./types";

export function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export function asString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

export function firstString(...values: unknown[]): string | undefined {
  for (const value of values) {
    const text = asString(value);
    if (text) return text;
  }
  return undefined;
}

export function asActions(data: Record<string, unknown>): PreviewAction[] {
  const fromArray = Array.isArray(data.actions)
    ? data.actions
        .map((item) => {
          const record = asRecord(item);
          const label = firstString(record.label, record.text);
          const href = firstString(record.href, record.url);
          if (!label || !href) return null;
          const variant = asString(record.variant);
          return { label, href, ...(variant ? { variant } : {}) };
        })
        .filter((item): item is PreviewAction => Boolean(item))
    : [];

  if (fromArray.length) return fromArray;

  const fromLinks = Array.isArray(data.links)
    ? data.links
        .map((item) => {
          const record = asRecord(item);
          const label = firstString(record.label, record.text);
          const href = firstString(record.href, record.url);
          if (!label || !href) return null;
          const variant = asString(record.variant);
          return { label, href, ...(variant ? { variant } : {}) };
        })
        .filter((item): item is PreviewAction => Boolean(item))
    : [];

  if (fromLinks.length) return fromLinks;

  const primaryLabel = firstString(data.ctaText, data.buttonText);
  const primaryHref = firstString(data.ctaUrl, data.buttonUrl);
  const actions: PreviewAction[] = [];
  if (primaryLabel && primaryHref) actions.push({ label: primaryLabel, href: primaryHref });

  const secondaryLabel = asString(data.secondaryButtonText);
  const secondaryHref = asString(data.secondaryButtonUrl);
  if (secondaryLabel && secondaryHref) {
    actions.push({ label: secondaryLabel, href: secondaryHref });
  }
  return actions;
}

export function asCards(data: Record<string, unknown>): PreviewCard[] {
  const source = Array.isArray(data.cards)
    ? data.cards
    : Array.isArray(data.items)
      ? data.items
      : Array.isArray(data.bullets)
        ? data.bullets
        : Array.isArray(data.studies)
          ? data.studies
          : [];

  return source
    .map((item) => {
      if (typeof item === "string") {
        return { title: item };
      }
      const record = asRecord(item);
      const title = firstString(
        record.title,
        record.label,
        record.heading,
        record.name,
        record.body,
        record.description,
        record.summary,
        record.text
      );
      if (!title) return null;
      const body = firstString(record.body, record.description, record.summary, record.text);
      const media = asRecord(record.media);
      const link = asRecord(record.link);
      const listItems = Array.isArray(record.items)
        ? record.items
            .map((entry) =>
              typeof entry === "string"
                ? entry
                : firstString(asRecord(entry).title, asRecord(entry).label, asRecord(entry).text)
            )
            .filter((entry): entry is string => Boolean(entry))
        : [];
      const badges = Array.isArray(record.badges)
        ? record.badges.map((entry) => String(entry).trim()).filter(Boolean)
        : [];
      const metrics = Array.isArray(record.metrics)
        ? record.metrics
            .map((entry) => {
              const metric = asRecord(entry);
              const value = firstString(metric.value, metric.stat);
              const label = firstString(metric.label, metric.title);
              if (!value && !label) return null;
              return { value: value ?? "", label: label ?? "" };
            })
            .filter((item): item is { value: string; label: string } => Boolean(item))
        : [];
      const protocolLabel = asString(record.label);
      return {
        title,
        body: body && body !== title ? body : undefined,
        href: firstString(record.href, record.url, link.href, link.url),
        label: firstString(
          link.label,
          record.ctaLabel,
          protocolLabel && protocolLabel !== title ? protocolLabel : undefined
        ),
        eyebrow: asString(record.eyebrow),
        icon: asString(record.icon),
        imageUrl: firstString(media.source, record.imageUrl, record.image),
        imageAlt: firstString(record.mediaAlt, record.imageAlt, media.alt),
        items: listItems.length ? listItems : undefined,
        badges: badges.length ? badges : undefined,
        metrics: metrics.length ? metrics : undefined,
      };
    })
    .filter((item): item is PreviewCard => Boolean(item));
}

export function headingOf(data: Record<string, unknown>): string | undefined {
  return firstString(data.heading, data.title);
}

export function bodyOf(data: Record<string, unknown>): string | undefined {
  return firstString(data.body, data.summary, data.description, data.introduction, data.supportingCopy);
}

export function eyebrowOf(data: Record<string, unknown>): string | undefined {
  return asString(data.eyebrow);
}

export function paragraphsOf(data: Record<string, unknown>): string[] {
  if (Array.isArray(data.paragraphs)) {
    return data.paragraphs.map(asString).filter((item): item is string => Boolean(item));
  }
  const body = bodyOf(data);
  return body ? [body] : [];
}

export function mediaCandidate(data: Record<string, unknown>): {
  id?: number;
  url?: string;
  alt?: string;
} {
  const media = asRecord(data.media);
  const lead = asRecord(data.leadMedia);
  const idCandidate =
    data.imageId ?? data.backgroundImageId ?? media.id ?? lead.id ?? media.imageId;
  const parsedId = Number(idCandidate);
  const id = Number.isFinite(parsedId) && parsedId > 0 ? parsedId : undefined;
  const url = firstString(
    media.source,
    lead.source,
    data.imageUrl,
    data.backgroundImageUrl
  );
  const alt = firstString(data.mediaAlt, data.imageAlt, media.alt, lead.alt);
  return { id, url, alt };
}
