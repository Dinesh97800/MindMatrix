"use client";

import { FormField, inputClassName, textareaClassName } from "./FormField";
import { MediaPicker } from "./MediaPicker";

export type SeoFormValues = {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImageId: number | null;
  robots: string;
  keywords: string;
};

export function SeoEditor({
  values,
  onChange,
}: {
  values: SeoFormValues;
  onChange: (values: SeoFormValues) => void;
}) {
  function update<K extends keyof SeoFormValues>(key: K, value: SeoFormValues[K]) {
    onChange({ ...values, [key]: value });
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <FormField label="SEO Title">
        <input
          value={values.metaTitle}
          onChange={(e) => update("metaTitle", e.target.value)}
          className={inputClassName}
        />
      </FormField>
      <FormField label="Robots">
        <select
          value={values.robots}
          onChange={(e) => update("robots", e.target.value)}
          className={inputClassName}
        >
          <option value="index">Index</option>
          <option value="noindex">No Index</option>
        </select>
      </FormField>
      <div className="md:col-span-2">
        <FormField label="Meta Description">
          <textarea
            value={values.metaDescription}
            onChange={(e) => update("metaDescription", e.target.value)}
            className={textareaClassName}
            rows={3}
          />
        </FormField>
      </div>
      <FormField label="Canonical URL">
        <input
          value={values.canonicalUrl}
          onChange={(e) => update("canonicalUrl", e.target.value)}
          className={inputClassName}
          placeholder="https://mmisindia.com/page"
        />
      </FormField>
      <FormField label="Keywords">
        <input
          value={values.keywords}
          onChange={(e) => update("keywords", e.target.value)}
          className={inputClassName}
          placeholder="keyword, keyword"
        />
      </FormField>
      <FormField label="OG Title">
        <input
          value={values.ogTitle}
          onChange={(e) => update("ogTitle", e.target.value)}
          className={inputClassName}
        />
      </FormField>
      <FormField label="OG Description">
        <textarea
          value={values.ogDescription}
          onChange={(e) => update("ogDescription", e.target.value)}
          className={textareaClassName}
          rows={2}
        />
      </FormField>
      <div className="md:col-span-2">
        <MediaPicker
          label="OG Image"
          value={values.ogImageId}
          onChange={(id) => update("ogImageId", id)}
        />
      </div>
    </div>
  );
}
