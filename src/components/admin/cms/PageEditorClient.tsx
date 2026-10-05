"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { AdminBreadcrumbs } from "@/components/admin/AdminSidebar";
import { FormField, inputClassName } from "@/components/admin/cms/FormField";
import { SeoEditor, type SeoFormValues } from "@/components/admin/cms/SeoEditor";
import { SectionList } from "@/components/admin/cms/SectionList";
import { StatusBadge } from "@/components/admin/cms/StatusBadge";
import { useAdminToast } from "@/components/admin/AdminToast";
import { getUnmappedLegacySections } from "@/lib/cms/existing-pages";
import type { SerializedSection } from "@/cms/sections/types";

type PageRecord = {
  id: number;
  title: string;
  slug: string;
  status: "draft" | "published";
  template: string;
  categoryId: number | null;
  updatedAt?: string;
};

const emptySeo: SeoFormValues = {
  metaTitle: "",
  metaDescription: "",
  canonicalUrl: "",
  ogTitle: "",
  ogDescription: "",
  ogImageId: null,
  robots: "index",
  keywords: "",
};

export function PageEditorClient({ pageId }: { pageId: number }) {
  const { pushToast } = useAdminToast();
  const [page, setPage] = useState<PageRecord | null>(null);
  const [sections, setSections] = useState<SerializedSection[]>([]);
  const [seo, setSeo] = useState<SeoFormValues>(emptySeo);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const pageRes = await fetch(`/api/admin/cms/pages/${pageId}`);
    const pageData = await pageRes.json();

    if (!pageRes.ok) {
      setPage(null);
      setLoading(false);
      return;
    }

    setPage(pageData.page ?? null);
    setSections(pageData.sections?.map((i: any) =>({
      ...i,
      data: typeof i.data === 'string' ? JSON.parse(i.data) : i.data
    })) ?? []);
    setSeo({
      metaTitle: pageData.seo?.metaTitle ?? "",
      metaDescription: pageData.seo?.metaDescription ?? "",
      canonicalUrl: pageData.seo?.canonicalUrl ?? "",
      ogTitle: pageData.seo?.ogTitle ?? "",
      ogDescription: pageData.seo?.ogDescription ?? "",
      ogImageId: pageData.seo?.ogImageId ?? null,
      robots: pageData.seo?.robots ?? "index",
      keywords: Array.isArray(pageData.seo?.keywords)
        ? pageData.seo.keywords.join(", ")
        : pageData.seo?.keywords ?? "",
    });
    setLoading(false);
  }, [pageId]);

  useEffect(() => {
    load();
  }, [load]);

  async function savePage(status?: "draft" | "published") {
    if (!page) return;
    setSaving(true);

    const pageResponse = await fetch(`/api/admin/cms/pages/${page.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: page.title,
        status: status ?? page.status,
      }),
    });
    const pageData = await pageResponse.json();

    const seoResponse = await fetch(`/api/admin/cms/pages/${page.id}/seo`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(seo),
    });

    setSaving(false);

    if (!pageResponse.ok) {
      pushToast(pageData.error ?? "Unable to save page.", "error");
      return;
    }
    if (!seoResponse.ok) {
      pushToast("Page saved but SEO update failed.", "error");
      return;
    }

    setPage(pageData.page);
    pushToast(
      status === "published" ? "Changes published successfully." : "Changes saved successfully.",
      "success"
    );
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await savePage("draft");
  }

  if (loading) return <p>Loading page...</p>;
  if (!page) return <p>This page is not available in the website content editor.</p>;

  const unmappedSections = getUnmappedLegacySections(page.slug);

  return (
    <div>
      <AdminBreadcrumbs
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Website Content", href: "/admin/cms/pages" },
          { label: page.title },
        ]}
      />

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary">Edit Website Page</h1>
          <p className="mt-2 text-on-surface-variant">
            Update existing website content. Page structure and layout remain locked.
            Publishing a page serves CMS content on its public URL. Draft pages keep the
            legacy website.
          </p>
          <div className="mt-2 flex items-center gap-3">
            <StatusBadge status={page.status} />
            {page.updatedAt ? (
              <span className="text-sm text-on-surface-variant">
                Updated {new Date(page.updatedAt).toLocaleString()}
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/admin/cms/pages/${page.id}/preview`}
            target="_blank"
            className="rounded-lg border px-4 py-2 text-sm hover:border-primary"
          >
            Preview
          </Link>
          <button
            type="button"
            onClick={() => savePage("draft")}
            disabled={saving}
            className="rounded-lg border px-4 py-2 text-sm disabled:opacity-60"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => savePage("published")}
            disabled={saving}
            className="rounded-lg bg-primary px-4 py-2 text-sm text-white disabled:opacity-60"
          >
            Publish Changes
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="rounded-xl border bg-white p-6">
          <h2 className="mb-4 font-headline-md">Page Details</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField label="Page Title">
              <input
                value={page.title}
                onChange={(e) => setPage({ ...page, title: e.target.value })}
                className={inputClassName}
              />
            </FormField>
            <FormField label="Page URL" helpText="Fixed for existing website pages.">
              <input value={`/${page.slug}`} readOnly className={`${inputClassName} bg-surface-container-low`} />
            </FormField>
          </div>
        </section>

        <section className="rounded-xl border bg-white p-6">
          <h2 className="mb-4 font-headline-md">Website Content</h2>
          <SectionList pageId={page.id} sections={sections} onChange={load} />
          {unmappedSections.length > 0 ? (
            <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
              <p className="font-medium">Additional legacy sections not yet CMS editable</p>
              <ul className="mt-2 list-disc pl-5">
                {unmappedSections.map((section) => (
                  <li key={section}>{section}</li>
                ))}
              </ul>
              <p className="mt-2 text-xs">
                CMS MIGRATION PENDING — these sections remain controlled by the legacy frontend.
              </p>
            </div>
          ) : null}
        </section>

        <section className="rounded-xl border bg-white p-6">
          <h2 className="mb-4 font-headline-md">SEO</h2>
          <SeoEditor values={seo} onChange={setSeo} />
        </section>
      </form>
    </div>
  );
}
