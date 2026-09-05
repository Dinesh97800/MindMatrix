"use client";

import { useState } from "react";
import { AdminModal } from "@/components/admin/cms/AdminModal";
import { SectionEditor } from "@/cms/SectionEditor";
import { getSectionDefinition } from "@/cms/sections/registry";
import type { SerializedSection } from "@/cms/sections/types";
import { useAdminToast } from "@/components/admin/AdminToast";

export function SectionList({
  pageId,
  sections,
  onChange,
}: {
  pageId: number;
  sections: SerializedSection[];
  onChange: () => void;
}) {
  const { pushToast } = useAdminToast();
  const [editing, setEditing] = useState<SerializedSection | null>(null);
  const [draftData, setDraftData] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);

  async function handleSaveSection() {
    if (!editing) return;
    setSaving(true);
    const response = await fetch(
      `/api/admin/cms/pages/${pageId}/sections/${editing.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: draftData }),
      }
    );
    const data = await response.json();
    setSaving(false);

    if (!response.ok) {
      pushToast(data.error ?? "Unable to update section.", "error");
      return;
    }

    pushToast("Section content saved successfully.", "success");
    setEditing(null);
    onChange();
  }

  return (
    <>
      <p className="mb-4 text-sm text-on-surface-variant">
        Page structure is locked. You can edit content inside each existing section only.
      </p>

      <div className="space-y-3">
        {sections.length === 0 ? (
          <div className="rounded-xl border border-dashed bg-white p-8 text-center text-on-surface-variant">
            No CMS sections are mapped for this page yet. Run{" "}
            <code className="text-xs">npm run db:seed:cms:content</code> after migration setup,
            or continue using the legacy frontend content for this page.
          </div>
        ) : (
          sections.map((section) => {
            const definition = getSectionDefinition(section.type);
            return (
              <div key={section.id} className="rounded-xl border bg-white p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant">lock</span>
                  <div className="flex-1">
                    <p className="font-medium">{definition?.label ?? section.type}</p>
                    <p className="text-xs text-on-surface-variant">Existing section</p>
                  </div>
                  <button
                    type="button"
                    className="rounded-lg bg-primary px-4 py-2 text-sm text-white"
                    onClick={() => {
                      setEditing(section);
                      setDraftData(section.data ?? {});
                    }}
                  >
                    Edit Content
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* TODO CMS FUTURE: Re-enable Add Section when client requires flexible page composition. */}

      <AdminModal
        open={Boolean(editing)}
        title={`Edit ${editing ? getSectionDefinition(editing.type)?.label ?? editing.type : "Section"}`}
        onClose={() => setEditing(null)}
        size="lg"
      >
        {editing ? (
          <>
            <SectionEditor
              type={editing.type}
              data={draftData}
              onChange={setDraftData}
            />
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-lg border px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveSection}
                disabled={saving}
                className="rounded-lg bg-primary px-4 py-2 text-sm text-white disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Section"}
              </button>
            </div>
          </>
        ) : null}
      </AdminModal>
    </>
  );
}
