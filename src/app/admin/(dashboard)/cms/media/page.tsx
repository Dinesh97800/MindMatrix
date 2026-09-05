"use client";

import { FormEvent, useEffect, useState } from "react";
import { AdminBreadcrumbs } from "@/components/admin/AdminSidebar";
import { AdminModal } from "@/components/admin/cms/AdminModal";
import { ConfirmDialog } from "@/components/admin/cms/ConfirmDialog";
import { FormField, inputClassName, textareaClassName } from "@/components/admin/cms/FormField";
import { useAdminToast } from "@/components/admin/AdminToast";
import type { MediaRecord } from "@/components/admin/cms/MediaLibraryModal";

export default function CmsMediaPage() {
  const { pushToast } = useAdminToast();
  const [media, setMedia] = useState<MediaRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [uploading, setUploading] = useState(false);
  const [editTarget, setEditTarget] = useState<MediaRecord | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MediaRecord | null>(null);
  const [forceDeleteOpen, setForceDeleteOpen] = useState(false);
  const [forceMessage, setForceMessage] = useState("");
  const [deleting, setDeleting] = useState(false);

  const load = (search = query) => {
    setLoading(true);
    return fetch(`/api/admin/cms/media?q=${encodeURIComponent(search)}&limit=48`)
      .then((res) => res.json())
      .then((data) => setMedia(data.media ?? []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

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
    load();
  }

  async function saveMetadata() {
    if (!editTarget) return;
    const response = await fetch(`/api/admin/cms/media/${editTarget.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        altText: editTarget.altText,
        caption: editTarget.caption,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      pushToast(data.error ?? "Unable to save metadata.", "error");
      return;
    }
    pushToast("Media metadata saved.", "success");
    setEditTarget(null);
    load();
  }

  async function deleteMedia(force = false) {
    if (!deleteTarget) return;
    setDeleting(true);
    const response = await fetch(
      `/api/admin/cms/media/${deleteTarget.id}${force ? "?force=true" : ""}`,
      { method: "DELETE" }
    );
    const data = await response.json();
    setDeleting(false);

    if (response.status === 409 && !force) {
      setForceMessage(data.message ?? "This image is in use.");
      setForceDeleteOpen(true);
      return;
    }

    if (!response.ok) {
      pushToast(data.error ?? "Unable to delete media.", "error");
      return;
    }

    pushToast("Media deleted.", "success");
    setDeleteTarget(null);
    setForceDeleteOpen(false);
    load();
  }

  return (
    <div>
      <AdminBreadcrumbs
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Media Library" },
        ]}
      />
      <h1 className="font-headline-lg text-headline-lg text-primary">Media Library</h1>

      <form onSubmit={handleUpload} className="my-6 rounded-xl border bg-white p-6 space-y-4">
        <h2 className="font-headline-md">Upload Image</h2>
        <input type="file" name="file" accept="image/jpeg,image/png,image/webp" required />
        <FormField label="Alt Text">
          <input name="altText" className={inputClassName} />
        </FormField>
        <FormField label="Caption">
          <input name="caption" className={inputClassName} />
        </FormField>
        <button
          type="submit"
          disabled={uploading}
          className="rounded-lg bg-primary px-4 py-2 text-white disabled:opacity-60"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <div className="mb-4 flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search media"
          className={inputClassName}
        />
        <button type="button" onClick={() => load(query)} className="rounded-lg border px-4 py-2">
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading media...</p>
      ) : media.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center text-on-surface-variant">
          No media uploaded yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {media.map((item) => (
            <div key={item.id} className="rounded-xl border bg-white p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.publicUrl}
                alt={item.altText ?? item.filename}
                className="aspect-video w-full rounded-lg object-cover"
              />
              <p className="mt-3 truncate text-sm font-medium">{item.originalFilename}</p>
              <p className="text-xs text-on-surface-variant">
                {item.width && item.height ? `${item.width}×${item.height}` : "—"} ·{" "}
                {Math.round(item.fileSize / 1024)} KB
              </p>
              <p className="text-xs text-on-surface-variant">
                {new Date(item.createdAt ?? Date.now()).toLocaleDateString()}
              </p>
              <div className="mt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditTarget(item)}
                  className="text-sm text-primary hover:underline"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(item)}
                  className="text-sm text-error hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminModal
        open={Boolean(editTarget)}
        title="Edit Media Metadata"
        onClose={() => setEditTarget(null)}
      >
        {editTarget ? (
          <>
            <FormField label="Alt Text">
              <input
                value={editTarget.altText ?? ""}
                onChange={(e) =>
                  setEditTarget({ ...editTarget, altText: e.target.value })
                }
                className={inputClassName}
              />
            </FormField>
            <FormField label="Caption">
              <textarea
                value={editTarget.caption ?? ""}
                onChange={(e) =>
                  setEditTarget({ ...editTarget, caption: e.target.value })
                }
                className={textareaClassName}
              />
            </FormField>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditTarget(null)}
                className="rounded-lg border px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveMetadata}
                className="rounded-lg bg-primary px-4 py-2 text-sm text-white"
              >
                Save
              </button>
            </div>
          </>
        ) : null}
      </AdminModal>

      <ConfirmDialog
        open={Boolean(deleteTarget) && !forceDeleteOpen}
        title="Delete Media"
        message={`Are you sure you want to delete "${deleteTarget?.originalFilename}"?`}
        confirmLabel="Delete"
        destructive
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => deleteMedia(false)}
      />

      <ConfirmDialog
        open={forceDeleteOpen}
        title="Media In Use"
        message={`${forceMessage}\n\nForce delete anyway? This may break CMS content using this image.`}
        confirmLabel="Force Delete"
        destructive
        loading={deleting}
        onCancel={() => {
          setForceDeleteOpen(false);
          setDeleteTarget(null);
        }}
        onConfirm={() => deleteMedia(true)}
      />
    </div>
  );
}
