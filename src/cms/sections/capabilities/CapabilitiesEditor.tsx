"use client";

import { FormField, inputClassName, textareaClassName } from "@/components/admin/cms/FormField";
import type { CapabilitiesSectionData } from "@/cms/sections/types";

export function CapabilitiesEditor({
  data,
  onChange,
}: {
  data: CapabilitiesSectionData;
  onChange: (data: CapabilitiesSectionData) => void;
}) {
  function update<K extends keyof CapabilitiesSectionData>(
    key: K,
    value: CapabilitiesSectionData[K]
  ) {
    onChange({ ...data, [key]: value });
  }

  return (
    <div className="space-y-4">
      <FormField label="Section Heading">
        <input
          value={data.heading ?? ""}
          onChange={(e) => update("heading", e.target.value)}
          className={inputClassName}
        />
      </FormField>
      <FormField
        label="Capability Items"
        helpText="One item per line. These appear in the capabilities list on the page."
      >
        <textarea
          value={(data.items ?? []).join("\n")}
          onChange={(e) =>
            update(
              "items",
              e.target.value
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean)
            )
          }
          className={textareaClassName}
          rows={8}
        />
      </FormField>
    </div>
  );
}
