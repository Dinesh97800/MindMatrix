"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { CanonicalPagePreview } from "@/cms/preview/CanonicalPreview";
import type { PreviewPagePayload } from "@/cms/preview/types";

type Viewport = "desktop" | "mobile";

export default function CanonicalAdminPreviewPage() {
  const params = useParams<{ id: string }>();
  const [payload, setPayload] = useState<PreviewPagePayload | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [showOrigin, setShowOrigin] = useState(true);
  const [showSeo, setShowSeo] = useState(true);

  async function load() {
    setLoading(true);
    const response = await fetch(`/api/admin/cms/pages/${params.id}/preview`, {
      cache: "no-store",
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error ?? "Unable to load canonical preview.");
      setPayload(null);
      setLoading(false);
      return;
    }
    setPayload(data as PreviewPagePayload);
    setError("");
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [params.id]);

  const missingAdapters = useMemo(
    () => payload?.sections.filter((section) => !section.adapterId && section.model !== "UTILITY") ?? [],
    [payload]
  );
  const mediaIssues = useMemo(
    () => payload?.sections.filter((section) => section.media.missing) ?? [],
    [payload]
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <p>Loading canonical preview...</p>
      </div>
    );
  }

  if (error || !payload) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <p>{error || "Preview is unavailable."}</p>
      </div>
    );
  }

  if (payload.page.classification === "redirect") {
    return (
      <div className="min-h-screen bg-surface p-8">
        <p className="font-medium">Redirect routes are not independently previewable CMS pages.</p>
        <p className="mt-2 text-sm text-on-surface-variant">/{payload.page.slug}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-200">
      <div className="sticky top-0 z-50 border-b bg-amber-50 px-4 py-3 text-amber-950">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide">Admin preview only · public rendering unchanged</p>
            <h1 className="font-headline-md">{payload.page.title}</h1>
            <p className="text-xs">
              /{payload.page.slug} · CMS status {payload.page.status} · {payload.sections.length}{" "}
              canonical sections
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setViewport("desktop")}
              className={`rounded border px-3 py-1 text-sm ${viewport === "desktop" ? "bg-white" : ""}`}
            >
              Desktop
            </button>
            <button
              type="button"
              onClick={() => setViewport("mobile")}
              className={`rounded border px-3 py-1 text-sm ${viewport === "mobile" ? "bg-white" : ""}`}
            >
              Mobile
            </button>
            <button
              type="button"
              onClick={() => setShowOrigin((value) => !value)}
              className="rounded border px-3 py-1 text-sm"
            >
              {showOrigin ? "Hide origin" : "Show origin"}
            </button>
            <button
              type="button"
              onClick={() => setShowSeo((value) => !value)}
              className="rounded border px-3 py-1 text-sm"
            >
              {showSeo ? "Hide SEO" : "Show SEO"}
            </button>
            <button type="button" onClick={load} className="rounded border px-3 py-1 text-sm">
              Refresh
            </button>
            <Link
              href={`/admin/cms/pages/${payload.page.id}`}
              className="rounded border bg-white px-3 py-1 text-sm"
            >
              Back to editor
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-2 flex max-w-[1400px] flex-wrap gap-2 text-xs">
          <span className="rounded bg-white px-2 py-1">
            Saved CMS page status: {payload.page.status}
          </span>
          <span className="rounded bg-white px-2 py-1">
            Admin-edited sections:{" "}
            {payload.sections.filter((section) => section.dataOrigin === "admin-edited").length}
          </span>
          <span className="rounded bg-white px-2 py-1">
            Migrated seed sections:{" "}
            {payload.sections.filter((section) => section.dataOrigin === "migrated-seed").length}
          </span>
          <span className="rounded bg-white px-2 py-1">Preview chrome is not public content</span>
        </div>
      </div>

      {showSeo ? (
        <div className="border-b bg-white px-4 py-3 text-sm">
          <div className="mx-auto max-w-[1400px]">
            <p className="text-xs uppercase tracking-wide text-on-surface-variant">SEO preview</p>
            <p className="font-medium">{payload.seo?.metaTitle || "(no meta title)"}</p>
            <p className="text-on-surface-variant">
              {payload.seo?.metaDescription || "(no meta description)"}
            </p>
            <p className="text-xs">
              canonical {payload.seo?.canonicalUrl || "(none)"} · robots {payload.seo?.robots || "(none)"}
            </p>
          </div>
        </div>
      ) : null}

      {missingAdapters.length || mediaIssues.length ? (
        <div className="border-b bg-white px-4 py-3 text-sm">
          <div className="mx-auto max-w-[1400px] space-y-1">
            {missingAdapters.map((section) => (
              <p key={section.id} className="text-error">
                Missing adapter: template {section.template} / stableKey {section.stableKey}
              </p>
            ))}
            {mediaIssues.map((section) => (
              <p key={`media-${section.id}`} className="text-amber-800">
                {section.template}: {section.media.missing}
              </p>
            ))}
          </div>
        </div>
      ) : null}

      <div className="px-4 py-6">
        <div
          className={`mx-auto overflow-hidden bg-surface shadow-xl ${
            viewport === "mobile" ? "w-[390px] max-w-full" : "w-full max-w-[1280px]"
          }`}
        >
          <CanonicalPagePreview sections={payload.sections} showOrigin={showOrigin} />
        </div>
      </div>
    </div>
  );
}
