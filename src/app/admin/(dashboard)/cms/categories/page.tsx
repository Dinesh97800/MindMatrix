"use client";

import { useEffect, useState } from "react";
import { AdminBreadcrumbs } from "@/components/admin/AdminSidebar";

type Category = {
  id: number;
  slug: string;
  label: string;
  parentId: number | null;
  sortOrder: number;
};

export default function CmsCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/cms/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <AdminBreadcrumbs
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Website Content", href: "/admin/cms/pages" },
          { label: "Structure" },
        ]}
      />
      <h1 className="font-headline-lg text-headline-lg text-primary">Website Structure</h1>
      <p className="mt-2 mb-6 text-on-surface-variant">
        Categories reflect the existing website navigation. Category management is disabled in the
        current CMS phase.
      </p>

      {/* TODO CMS FUTURE: Re-enable category management when client requires IA changes. */}

      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-surface-container-low">
              <tr>
                <th className="px-4 py-3 text-left">Label</th>
                <th className="px-4 py-3 text-left">Slug</th>
                <th className="px-4 py-3 text-left">Parent</th>
                <th className="px-4 py-3 text-left">Sort</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-t">
                  <td className="px-4 py-3">{category.label}</td>
                  <td className="px-4 py-3">{category.slug}</td>
                  <td className="px-4 py-3">
                    {categories.find((item) => item.id === category.parentId)?.label ?? "—"}
                  </td>
                  <td className="px-4 py-3">{category.sortOrder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
