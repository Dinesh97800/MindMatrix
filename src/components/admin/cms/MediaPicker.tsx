"use client";

import { useEffect, useState } from "react";
import { FormField } from "./FormField";
import { MediaLibraryModal, type MediaRecord } from "./MediaLibraryModal";

export function MediaPicker({
  label,
  value,
  onChange,
  helpText,
}: {
  label: string;
  value: number | null;
  onChange: (mediaId: number | null) => void;
  helpText?: string;
}) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<MediaRecord | null>(null);

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }
    fetch(`/api/admin/cms/media/${value}`)
      .then((res) => res.json())
      .then((data) => setPreview(data.media ?? null))
      .catch(() => setPreview(null));
  }, [value]);

  return (
    <FormField label={label} helpText={helpText}>
      <div className="flex flex-wrap items-center gap-3">
        {preview ? (
          <div className="flex items-center gap-3 rounded-lg border p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview.publicUrl}
              alt={preview.altText ?? preview.filename}
              className="h-16 w-24 rounded object-cover"
            />
            <div>
              <p className="text-sm font-medium">{preview.originalFilename}</p>
              <p className="text-xs text-on-surface-variant">
                {preview.width && preview.height
                  ? `${preview.width}×${preview.height}`
                  : "Unknown size"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-on-surface-variant">No image selected</p>
        )}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-lg border px-4 py-2 text-sm hover:border-primary"
        >
          Select Media
        </button>
        {value ? (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-sm text-error hover:underline"
          >
            Remove
          </button>
        ) : null}
      </div>

      <MediaLibraryModal
        open={open}
        onClose={() => setOpen(false)}
        selectedId={value}
        onSelect={(media) => {
          onChange(media.id);
          setPreview(media);
          setOpen(false);
        }}
      />
    </FormField>
  );
}
