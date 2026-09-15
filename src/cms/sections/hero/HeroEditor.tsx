"use client";

import Link from "next/link";
import { FormField, inputClassName, selectClassName, textareaClassName } from "@/components/admin/cms/FormField";
import { MediaPicker } from "@/components/admin/cms/MediaPicker";
import { HERO_ALIGNMENTS, HERO_VARIANTS } from "@/cms/sections/hero/HeroSchema";
import type { HeroSectionData } from "@/cms/sections/types";

export function HeroEditor({
  data,
  onChange,
}: {
  data: HeroSectionData;
  onChange: (data: HeroSectionData) => void;
}) {
  function update<K extends keyof HeroSectionData>(key: K, value: HeroSectionData[K]) {
    onChange({ ...data, [key]: value });
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {!data.lockedVariant ? (
        <FormField label="Variant">
          <select
            value={data.variant}
            onChange={(e) => update("variant", e.target.value as HeroSectionData["variant"])}
            className={selectClassName}
          >
            {HERO_VARIANTS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>
      ) : (
        <FormField label="Layout" helpText="This layout is fixed for the existing website page.">
          <input
            value={data.variant === "background" ? "Background Image" : "Split"}
            readOnly
            className={`${inputClassName} bg-surface-container-low`}
          />
        </FormField>
      )}
      <FormField label="Alignment">
        <select
          value={data.alignment ?? "left"}
          onChange={(e) =>
            update("alignment", e.target.value as HeroSectionData["alignment"])
          }
          className={selectClassName}
        >
          {HERO_ALIGNMENTS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FormField>
      <FormField label="Eyebrow">
        <input
          value={data.eyebrow ?? ""}
          onChange={(e) => update("eyebrow", e.target.value)}
          className={inputClassName}
        />
      </FormField>
      <FormField label="Title">
        <input
          value={data.title ?? ""}
          onChange={(e) => update("title", e.target.value)}
          className={inputClassName}
        />
      </FormField>
      <FormField label="Title accent">
        <input
          value={data.titleAccent ?? ""}
          onChange={(e) => update("titleAccent", e.target.value)}
          className={inputClassName}
        />
      </FormField>
      <div className="md:col-span-2">
        <FormField label="Description">
          <textarea
            value={data.summary ?? data.description ?? ""}
            onChange={(e) =>
              onChange({
                ...data,
                summary: e.target.value,
                description: e.target.value,
              })
            }
            className={textareaClassName}
          />
        </FormField>
      </div>
      {data.variant === "split" ? (
        <>
          <MediaPicker
            label="Hero Image"
            value={data.imageId ?? null}
            onChange={(id) => update("imageId", id)}
            helpText={
              data.imageUrl && !data.imageId
                ? "Current website image is imported from legacy content. Select media to replace it."
                : undefined
            }
          />
          {data.imageUrl && !data.imageId ? (
            <FormField label="Current Website Image URL">
              <input value={data.imageUrl} readOnly className={`${inputClassName} bg-surface-container-low`} />
            </FormField>
          ) : null}
          <FormField label="Image Alt Text">
            <input
              value={data.imageAlt ?? ""}
              onChange={(e) => update("imageAlt", e.target.value)}
              className={inputClassName}
            />
          </FormField>
        </>
      ) : (
        <>
          <MediaPicker
            label="Background Image"
            value={data.backgroundImageId ?? null}
            onChange={(id) => update("backgroundImageId", id)}
            helpText={
              data.backgroundImageUrl && !data.backgroundImageId
                ? "Current website image is imported from legacy content. Select media to replace it."
                : undefined
            }
          />
          {data.backgroundImageUrl && !data.backgroundImageId ? (
            <FormField label="Current Website Background URL">
              <input
                value={data.backgroundImageUrl}
                readOnly
                className={`${inputClassName} bg-surface-container-low`}
              />
            </FormField>
          ) : null}
          <FormField label="Overlay">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={Boolean(data.overlay)}
                onChange={(e) => update("overlay", e.target.checked)}
              />
              Show dark overlay
            </label>
          </FormField>
        </>
      )}
      <FormField label="CTA Text">
        <input
          value={data.ctaText ?? ""}
          onChange={(e) => update("ctaText", e.target.value)}
          className={inputClassName}
        />
      </FormField>
      <FormField label="CTA URL">
        <input
          value={data.ctaUrl ?? ""}
          onChange={(e) => update("ctaUrl", e.target.value)}
          className={inputClassName}
          placeholder="/contact-us"
        />
      </FormField>
      {data.ctaUrl ? (
        <div className="md:col-span-2">
          <Link href={data.ctaUrl} target="_blank" className="text-sm text-primary hover:underline">
            Preview CTA link
          </Link>
        </div>
      ) : null}
    </div>
  );
}
