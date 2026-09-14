/** Passthrough validator for structured legacy section payloads. */
export function validateStructuredContent(data: Record<string, unknown>) {
  return {
    ...data,
    componentKey: typeof data.componentKey === "string" ? data.componentKey : "",
    sourceFile: typeof data.sourceFile === "string" ? data.sourceFile : "",
    sourceComponent:
      typeof data.sourceComponent === "string"
        ? data.sourceComponent
        : typeof data.componentKey === "string"
          ? data.componentKey
          : "",
    title: typeof data.title === "string" ? data.title : "",
    heading: typeof data.heading === "string" ? data.heading : "",
    eyebrow: typeof data.eyebrow === "string" ? data.eyebrow : "",
    description: typeof data.description === "string" ? data.description : "",
    body: typeof data.body === "string" ? data.body : "",
    supportingText: typeof data.supportingText === "string" ? data.supportingText : "",
    strings: Array.isArray(data.strings) ? data.strings.map(String) : [],
    items: Array.isArray(data.items) ? data.items : [],
    paragraphs: Array.isArray(data.paragraphs) ? data.paragraphs.map(String) : [],
    cards: Array.isArray(data.cards) ? data.cards : [],
    stats: Array.isArray(data.stats) ? data.stats : [],
    links: Array.isArray(data.links) ? data.links : [],
    images: Array.isArray(data.images) ? data.images.map(String) : [],
    faqs: Array.isArray(data.faqs) ? data.faqs : [],
    studies: Array.isArray(data.studies) ? data.studies : [],
    sections: Array.isArray(data.sections) ? data.sections : [],
    steps: Array.isArray(data.steps) ? data.steps : [],
    introduction: typeof data.introduction === "string" ? data.introduction : "",
    cta: data.cta && typeof data.cta === "object" ? data.cta : undefined,
    content:
      data.content && typeof data.content === "object"
        ? (data.content as Record<string, unknown>)
        : undefined,
    lockedLayout: true,
  };
}

export const structuredContentDefaults = {
  componentKey: "",
  sourceFile: "",
  sourceComponent: "",
  title: "",
  description: "",
  strings: [],
  items: [],
  paragraphs: [],
  cards: [],
  stats: [],
  links: [],
  images: [],
  lockedLayout: true,
};
