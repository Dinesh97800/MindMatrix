"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AdminBreadcrumbs } from "@/components/admin/AdminSidebar";
import { FormField, inputClassName, selectClassName } from "@/components/admin/cms/FormField";
import { StatusBadge } from "@/components/admin/cms/StatusBadge";

type PageItem = {
  id: number;
  title: string;
  slug: string;
  status: "draft" | "published";
  categoryId: number | null;
  updatedAt: string;
};

type Category = { id: number; label: string };

export function CmsPagesClient() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId") ?? "";
  const [pages, setPages] = useState<PageItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const categoryMap = useMemo(
    () => new Map(categories.map((category) => [category.id, category.label])),
    [categories]
  );

  const load = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (categoryId) params.set("categoryId", categoryId);
    if (statusFilter) params.set("status", statusFilter);
    if (query.trim()) params.set("q", query.trim());

    const [pagesRes, categoriesRes] = await Promise.all([
      fetch(`/api/admin/cms/pages?${params.toString()}`),
      fetch("/api/admin/cms/categories"),
    ]);
    const pagesData = await pagesRes.json();
    const categoriesData = await categoriesRes.json();
    setPages(pagesData.pages ?? []);
    setCategories(categoriesData.categories ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [categoryId, statusFilter]);

  return (
    <div>
      <AdminBreadcrumbs
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Website Content" },
        ]}
      />
      <h1 className="font-headline-lg text-headline-lg text-primary">Website Content</h1>
      <p className="mt-2 mb-6 text-on-surface-variant">
        Edit content for existing website pages. Page structure and new page creation are disabled
        in the current CMS phase.
      </p>

      {/* TODO CMS FUTURE: Re-enable page creation when client requires dynamic page creation. */}

      <div className="mb-4 flex flex-wrap gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search website pages"
          className={inputClassName}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={selectClassName}
        >
          <option value="">All statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <button type="button" onClick={load} className="rounded-lg border px-4 py-2 text-sm">
          Apply Filters
        </button>
      </div>

      {loading ? (
        <p>Loading website pages...</p>
      ) : pages.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center text-on-surface-variant">
          No mapped website pages found. Run{" "}
          <code className="text-xs">npm run db:seed:cms:content</code> to import existing website
          content into the CMS.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-surface-container-low">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">URL</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Updated</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id} className="border-t">
                  <td className="px-4 py-3">{page.title}</td>
                  <td className="px-4 py-3">
                    {page.categoryId ? categoryMap.get(page.categoryId) ?? "—" : "—"}
                  </td>
                  <td className="px-4 py-3">/{page.slug}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={page.status} />
                  </td>
                  <td className="px-4 py-3">
                    {new Date(page.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/admin/cms/pages/${page.id}`}
                        className="text-primary hover:underline"
                      >
                        Edit Content
                      </Link>
                      <Link
                        href={`/admin/cms/pages/${page.id}/preview`}
                        target="_blank"
                        className="text-primary hover:underline"
                      >
                        Preview
                      </Link>
                      <Link
                        href={`/${page.slug}`}
                        target="_blank"
                        className="text-primary hover:underline"
                      >
                        View Live
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
