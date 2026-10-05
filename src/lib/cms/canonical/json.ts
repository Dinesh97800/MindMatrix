import type { JsonNormalization } from "./types";

/**
 * XAMPP/MySQL drivers can return JSON columns as objects or as stringified JSON.
 * Normalize nested stringification before rendering, comparison, or validation.
 */
export function normalizeJsonColumn(value: unknown, maxDepth = 5): JsonNormalization {
  let current = value;
  let parsedStringLayers = 0;

  while (typeof current === "string" && parsedStringLayers < maxDepth) {
    const trimmed = current.trim();
    if (!trimmed || (!trimmed.startsWith("{") && !trimmed.startsWith("["))) {
      break;
    }

    try {
      current = JSON.parse(trimmed);
      parsedStringLayers += 1;
    } catch {
      return { value: current, parsedStringLayers, invalidJsonString: true };
    }
  }

  return { value: current, parsedStringLayers, invalidJsonString: false };
}

export function normalizeJsonObject(value: unknown): Record<string, unknown> {
  const normalized = normalizeJsonColumn(value);
  return normalized.value &&
    typeof normalized.value === "object" &&
    !Array.isArray(normalized.value)
    ? (normalized.value as Record<string, unknown>)
    : {};
}

export function normalizeJsonArray(value: unknown): unknown[] {
  const normalized = normalizeJsonColumn(value);
  return Array.isArray(normalized.value) ? normalized.value : [];
}

