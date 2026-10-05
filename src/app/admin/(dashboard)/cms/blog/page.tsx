"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminBreadcrumbs } from "@/components/admin/AdminSidebar";
import { ConfirmDialog } from "@/components/admin/cms/ConfirmDialog";
import { FormField, inputClassName, selectClassName } from "@/components/admin/cms/FormField";
import { StatusBadge } from "@/components/admin/cms/StatusBadge";
import { useAdminToast } from "@/components/admin/AdminToast";

type BlogItem = {
  id: number;
  title: string;
  slug: string;
  status: "draft" | "published" | "archived";
  updatedAt: string;
};

export default function CmsBlogIndexPage() {
  const { pushToast } = useAdminToast();
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<BlogItem | null>(null);

  const load = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (statusFilter) params.set("status", statusFilter);
    return fetch(`/api/admin/cms/blogs?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setBlogs(data.blogs ?? []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [statusFilter]);

  async function togglePublish(blog: BlogItem) {
    const nextStatus = blog.status === "published" ? "draft" : "published";
    const response = await fetch(`/api/admin/cms/blogs/${blog.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
    if (!response.ok) {
      pushToast("Unable to update blog status.", "error");
      return;
    }
    pushToast(
      nextStatus === "published" ? "Blog published successfully." : "Blog unpublished.",
      "success"
    );
    load();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const response = await fetch(`/api/admin/cms/blogs/${deleteTarget.id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      pushToast("Unable to delete blog.", "error");
      return;
    }
    pushToast("Blog deleted.", "success");
    setDeleteTarget(null);
    load();
  }

  return (
    <div>
      <AdminBreadcrumbs
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Blog" },
        ]}
      />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary">Blog</h1>
          <p className="mt-2 text-on-surface-variant">Create and manage blog posts.</p>
        </div>
        <Link
          href="/admin/cms/blog/new"
          className="rounded-lg bg-primary px-4 py-2 text-white"
        >
          + Create Blog
        </Link>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search blogs"
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
        <p>Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center text-on-surface-variant">
          No blog posts yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-surface-container-low">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Slug</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Updated</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} className="border-t">
                  <td className="px-4 py-3">{blog.title}</td>
                  <td className="px-4 py-3">/{blog.slug}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={blog.status} />
                  </td>
                  <td className="px-4 py-3">
                    {new Date(blog.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/admin/cms/blog/${blog.id}`}
                        className="text-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => togglePublish(blog)}
                        className="text-primary hover:underline"
                      >
                        {blog.status === "published" ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(blog)}
                        className="text-error hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Blog"
        message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
        confirmLabel="Delete"
        destructive
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
