"use client";

import { HeroEditor } from "@/cms/sections/hero/HeroEditor";
import { RichTextEditor } from "@/cms/sections/rich-text/RichTextEditor";
import { CTAEditor } from "@/cms/sections/cta/CTAEditor";
import { getSectionDefinition } from "@/cms/sections/registry";
import { CapabilitiesEditor } from "@/cms/sections/capabilities/CapabilitiesEditor";
import { StructuredContentEditor } from "@/cms/sections/structured/StructuredContentEditor";
import { isStructuredSectionType } from "@/cms/sections/registry";
import type {
  CapabilitiesSectionData,
  CtaSectionData,
  HeroSectionData,
  RichTextSectionData,
} from "@/cms/sections/types";

export function SectionEditor({
  type,
  data,
  onChange,
}: {
  type: string;
  data: Record<string, unknown>;
  onChange: (data: Record<string, unknown>) => void;
}) {
  const definition = getSectionDefinition(type);
  if (!definition) {
    return <p className="text-sm text-error">Unsupported section type.</p>;
  }

  const validated = definition.validate(data);

  switch (type) {
    case "hero":
      return (
        <HeroEditor
          data={validated as HeroSectionData}
          onChange={(next) => onChange(next)}
        />
      );
    case "rich_text":
      return (
        <RichTextEditor
          content={(validated as RichTextSectionData).content}
          onChange={(content) => onChange({ content })}
        />
      );
    case "capabilities":
      return (
        <CapabilitiesEditor
          data={validated as CapabilitiesSectionData}
          onChange={(next) => onChange(next)}
        />
      );
    case "cta":
      return (
        <CTAEditor
          data={validated as CtaSectionData}
          onChange={(next) => onChange(next)}
        />
      );
    default:
      if (isStructuredSectionType(type)) {
        return (
          <StructuredContentEditor
            data={validated}
            onChange={(next) => onChange(next)}
          />
        );
      }
      return null;
  }
}
