"use client";

import { FormEvent, useEffect, useState } from "react";
import { AdminModal } from "./AdminModal";
import { inputClassName } from "./FormField";
import { useAdminToast } from "@/components/admin/AdminToast";

export type MediaRecord = {
  id: number;
  filename: string;
  originalFilename: string;
  mimeType: string;
  fileSize: number;
  width: number | null;
  height: number | null;
  altText: string | null;
  caption: string | null;
  publicUrl: string;
  createdAt?: string;
};

export function MediaLibraryModal({
  open,
  onClose,
  onSelect,
  selectedId,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (media: MediaRecord) => void;
  selectedId?: number | null;
}) {
  const { pushToast } = useAdminToast();
  const [media, setMedia] = useState<MediaRecord[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = async (search = query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/admin/cms/media?q=${encodeURIComponent(search)}&limit=48`
      );
      const data = await response.json();
      setMedia(data.media ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) load();
  }, [open]);

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setUploading(true);
    const response = await fetch("/api/admin/cms/media", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    setUploading(false);

    if (!response.ok) {
      pushToast(data.error ?? "Upload failed.", "error");
      return;
    }

    pushToast("Image uploaded successfully.", "success");
    event.currentTarget.reset();
    await load();
    if (data.media) onSelect(data.media);
  }

  return (
    <AdminModal open={open} title="Media Library" onClose={onClose} size="xl">
      <div className="mb-4 flex flex-wrap gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search media"
          className={inputClassName}
        />
        <button type="button" onClick={() => load(query)} className="rounded-lg border px-4 py-2 text-sm">
          Search
        </button>
      </div>

      <form onSubmit={handleUpload} className="mb-6 rounded-lg border bg-surface-container-low p-4 space-y-3">
        <p className="text-sm font-medium">Upload new image</p>
        <input type="file" name="file" accept="image/jpeg,image/png,image/webp" required />
        <input name="altText" placeholder="Alt text" className={inputClassName} />
        <button
          type="submit"
          disabled={uploading}
          className="rounded-lg bg-primary px-4 py-2 text-sm text-white disabled:opacity-60"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {loading ? (
        <p className="text-sm text-on-surface-variant">Loading media...</p>
      ) : media.length === 0 ? (
        <p className="text-sm text-on-surface-variant">No media found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {media.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item)}
              className={`rounded-lg border p-2 text-left transition-colors hover:border-primary ${
                selectedId === item.id ? "border-primary ring-2 ring-primary/20" : ""
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.publicUrl}
                alt={item.altText ?? item.filename}
                className="aspect-video w-full rounded object-cover"
              />
              <p className="mt-2 truncate text-xs font-medium">{item.originalFilename}</p>
            </button>
          ))}
        </div>
      )}
    </AdminModal>
  );
}
