"use client";

import { FormField, inputClassName, selectClassName, textareaClassName } from "@/components/admin/cms/FormField";
import type { CtaSectionData } from "@/cms/sections/types";

export function CTAEditor({
  data,
  onChange,
}: {
  data: CtaSectionData;
  onChange: (data: CtaSectionData) => void;
}) {
  function update<K extends keyof CtaSectionData>(key: K, value: CtaSectionData[K]) {
    onChange({ ...data, [key]: value });
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <FormField label="Title">
        <input
          value={data.title ?? ""}
          onChange={(e) => update("title", e.target.value)}
          className={inputClassName}
        />
      </FormField>
      <FormField label="Style">
        <select
          value={data.variant ?? "primary"}
          onChange={(e) => update("variant", e.target.value as CtaSectionData["variant"])}
          className={selectClassName}
        >
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
          <option value="outline">Outline</option>
        </select>
      </FormField>
      <div className="md:col-span-2">
        <FormField label="Description">
          <textarea
            value={data.description ?? ""}
            onChange={(e) => update("description", e.target.value)}
            className={textareaClassName}
          />
        </FormField>
      </div>
      <FormField label="Button Text">
        <input
          value={data.buttonText ?? ""}
          onChange={(e) => update("buttonText", e.target.value)}
          className={inputClassName}
        />
      </FormField>
      <FormField label="Button URL">
        <input
          value={data.buttonUrl ?? ""}
          onChange={(e) => update("buttonUrl", e.target.value)}
          className={inputClassName}
          placeholder="/contact-us"
        />
      </FormField>
      <FormField label="Secondary Button Text">
        <input
          value={data.secondaryButtonText ?? ""}
          onChange={(e) => update("secondaryButtonText", e.target.value)}
          className={inputClassName}
        />
      </FormField>
      <FormField label="Secondary Button URL">
        <input
          value={data.secondaryButtonUrl ?? ""}
          onChange={(e) => update("secondaryButtonUrl", e.target.value)}
          className={inputClassName}
        />
      </FormField>
    </div>
  );
}
