"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminBreadcrumbs } from "@/components/admin/AdminSidebar";
import { StatusBadge } from "@/components/admin/cms/StatusBadge";

type DashboardStats = {
  pagesTotal: number;
  pagesPublished: number;
  pagesDraft: number;
  blogsTotal: number;
  blogsPublished: number;
  blogsDraft: number;
  mediaCount: number;
  submissionsNew: number;
};

type RecentItem = {
  id: number;
  title: string;
  slug: string;
  status: "draft" | "published" | "archived";
  updatedAt: string;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentPages, setRecentPages] = useState<RecentItem[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<RecentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/cms/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setStats(data.stats ?? null);
        setRecentPages(data.recentPages ?? []);
        setRecentBlogs(data.recentBlogs ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <AdminBreadcrumbs items={[{ label: "Dashboard" }]} />
      <div className="mb-8">
        <h1 className="font-headline-lg text-headline-lg text-primary">Dashboard</h1>
        <p className="mt-2 text-on-surface-variant">
          Manage website content, media, settings, and inbound inquiries.
        </p>
      </div>

      {loading ? (
        <p className="text-on-surface-variant">Loading dashboard...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Pages",
                value: stats?.pagesTotal ?? 0,
                sub: `${stats?.pagesPublished ?? 0} published · ${stats?.pagesDraft ?? 0} draft`,
              },
              {
                label: "Blogs",
                value: stats?.blogsTotal ?? 0,
                sub: `${stats?.blogsPublished ?? 0} published · ${stats?.blogsDraft ?? 0} draft`,
              },
              {
                label: "Media",
                value: stats?.mediaCount ?? 0,
                sub: "Uploaded assets",
              },
              {
                label: "New Submissions",
                value: stats?.submissionsNew ?? 0,
                sub: "Inbox",
              },
            ].map((card) => (
              <div key={card.label} className="rounded-xl border bg-white p-5">
                <p className="text-sm text-on-surface-variant">{card.label}</p>
                <p className="mt-2 font-headline-lg text-headline-lg text-primary">{card.value}</p>
                <p className="mt-1 text-sm text-on-surface-variant">{card.sub}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Link
              href="/admin/cms/pages"
              className="rounded-xl border bg-white p-5 hover:border-primary/30"
            >
              <span className="material-symbols-outlined text-primary">edit_note</span>
              <h2 className="mt-3 font-headline-md">Edit Website Content</h2>
              <p className="mt-1 text-sm text-on-surface-variant">
                Update text, images, and SEO on existing website pages.
              </p>
            </Link>
            <Link
              href="/admin/cms/blog/new"
              className="rounded-xl border bg-white p-5 hover:border-primary/30"
            >
              <span className="material-symbols-outlined text-primary">post_add</span>
              <h2 className="mt-3 font-headline-md">Create Blog</h2>
              <p className="mt-1 text-sm text-on-surface-variant">Write a new blog post.</p>
            </Link>
            <Link
              href="/admin/cms/media"
              className="rounded-xl border bg-white p-5 hover:border-primary/30"
            >
              <span className="material-symbols-outlined text-primary">upload</span>
              <h2 className="mt-3 font-headline-md">Upload Media</h2>
              <p className="mt-1 text-sm text-on-surface-variant">Add images to the media library.</p>
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
            <section className="rounded-xl border bg-white p-6">
              <h2 className="font-headline-md">Recently Updated Pages</h2>
              {recentPages.length === 0 ? (
                <p className="mt-4 text-sm text-on-surface-variant">No pages yet.</p>
              ) : (
                <ul className="mt-4 divide-y">
                  {recentPages.map((page) => (
                    <li key={page.id} className="flex items-center justify-between gap-3 py-3">
                      <div>
                        <Link
                          href={`/admin/cms/pages/${page.id}`}
                          className="font-medium text-primary hover:underline"
                        >
                          {page.title}
                        </Link>
                        <p className="text-xs text-on-surface-variant">
                          {new Date(page.updatedAt).toLocaleString()}
                        </p>
                      </div>
                      <StatusBadge status={page.status} />
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="rounded-xl border bg-white p-6">
              <h2 className="font-headline-md">Recently Updated Blogs</h2>
              {recentBlogs.length === 0 ? (
                <p className="mt-4 text-sm text-on-surface-variant">No blog posts yet.</p>
              ) : (
                <ul className="mt-4 divide-y">
                  {recentBlogs.map((blog) => (
                    <li key={blog.id} className="flex items-center justify-between gap-3 py-3">
                      <div>
                        <Link
                          href={`/admin/cms/blog/${blog.id}`}
                          className="font-medium text-primary hover:underline"
                        >
                          {blog.title}
                        </Link>
                        <p className="text-xs text-on-surface-variant">
                          {new Date(blog.updatedAt).toLocaleString()}
                        </p>
                      </div>
                      <StatusBadge status={blog.status} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </>
      )}
    </div>
  );
}
