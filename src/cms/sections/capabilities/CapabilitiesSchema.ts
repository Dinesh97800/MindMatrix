import type { CapabilitiesSectionData } from "../types";

export const capabilitiesDefaults: CapabilitiesSectionData = {
  heading: "Typical Scope",
  items: [],
};

export function validateCapabilitiesData(
  data: Record<string, unknown>
): CapabilitiesSectionData {
  const items = Array.isArray(data.items)
    ? data.items.map(String).filter(Boolean)
    : [];
  return {
    heading: typeof data.heading === "string" ? data.heading : "Typical Scope",
    items,
  };
}
