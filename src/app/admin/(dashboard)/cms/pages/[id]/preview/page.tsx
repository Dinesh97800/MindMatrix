"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SectionRenderer } from "@/cms/SectionRenderer";
import type { SerializedSection } from "@/cms/sections/types";

/**
 * CMS preview route — isolated from public website rendering.
 * TODO CMS MIGRATION: Public routes must NOT use this until explicit migration.
 */
export default function CmsPagePreviewPage() {
  const params = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [sections, setSections] = useState<SerializedSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/cms/pages/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.page?.title ?? "Preview");
        setSections(data.sections ?? []);
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <p>Loading preview...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="border-b bg-amber-50 px-4 py-2 text-center text-sm text-amber-900">
        CMS Preview — this view is isolated and does not replace the public website.
      </div>
      <div className="border-b bg-white px-4 py-3">
        <p className="text-xs uppercase tracking-wide text-on-surface-variant">Preview</p>
        <h1 className="font-headline-md text-primary">{title}</h1>
      </div>
      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
}
