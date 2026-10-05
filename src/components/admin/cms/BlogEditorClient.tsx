"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminBreadcrumbs } from "@/components/admin/AdminSidebar";
import { FormField, inputClassName, selectClassName, textareaClassName } from "@/components/admin/cms/FormField";
import { MediaPicker } from "@/components/admin/cms/MediaPicker";
import { SeoEditor, type SeoFormValues } from "@/components/admin/cms/SeoEditor";
import { StatusBadge } from "@/components/admin/cms/StatusBadge";
import { RichTextEditor } from "@/cms/sections/rich-text/RichTextEditor";
import { useAdminToast } from "@/components/admin/AdminToast";

type BlogRecord = {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  content: Record<string, unknown> | null;
  featuredMediaId: number | null;
  featuredImageAlt: string;
  categoryId: number | null;
  tags: string[];
  status: "draft" | "published" | "archived";
  publishedAt: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImageId: number | null;
};

type BlogCategory = { id: number; name: string };

const emptyBlog: BlogRecord = {
  title: "",
  slug: "",
  excerpt: "",
  content: { type: "doc", content: [{ type: "paragraph" }] },
  featuredMediaId: null,
  featuredImageAlt: "",
  categoryId: null,
  tags: [],
  status: "draft",
  publishedAt: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  ogTitle: "",
  ogDescription: "",
  ogImageId: null,
};

export function BlogEditorClient({ blogId }: { blogId?: number }) {
  const router = useRouter();
  const { pushToast } = useAdminToast();
  const [blog, setBlog] = useState<BlogRecord>(emptyBlog);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(Boolean(blogId));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/cms/blog-categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories ?? []));

    if (!blogId) return;

    fetch(`/api/admin/cms/blogs/${blogId}`)
      .then((res) => res.json())
      .then((data) => {
        const record = data.blog;
        if (!record) return;
        setBlog({
          id: record.id,
          title: record.title ?? "",
          slug: record.slug ?? "",
          excerpt: record.excerpt ?? "",
          content: record.content ?? emptyBlog.content,
          featuredMediaId: record.featuredMediaId ?? null,
          featuredImageAlt: record.featuredImageAlt ?? "",
          categoryId: record.categoryId ?? null,
          tags: record.tags ?? [],
          status: record.status ?? "draft",
          publishedAt: record.publishedAt ?? "",
          metaTitle: record.metaTitle ?? "",
          metaDescription: record.metaDescription ?? "",
          metaKeywords: record.metaKeywords ?? "",
          ogTitle: record.ogTitle ?? "",
          ogDescription: record.ogDescription ?? "",
          ogImageId: record.ogImageId ?? null,
        });
      })
      .finally(() => setLoading(false));
  }, [blogId]);

  const seoValues: SeoFormValues = {
    metaTitle: blog.metaTitle,
    metaDescription: blog.metaDescription,
    canonicalUrl: "",
    ogTitle: blog.ogTitle,
    ogDescription: blog.ogDescription,
    ogImageId: blog.ogImageId,
    robots: "index",
    keywords: blog.metaKeywords,
  };

  async function saveBlog(status?: BlogRecord["status"]) {
    setSaving(true);
    const payload = {
      ...blog,
      status: status ?? blog.status,
      tags: blog.tags,
    };

    const response = await fetch(
      blog.id ? `/api/admin/cms/blogs/${blog.id}` : "/api/admin/cms/blogs",
      {
        method: blog.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    setSaving(false);

    if (!response.ok) {
      pushToast(data.error ?? "Unable to save blog.", "error");
      return;
    }

    pushToast(
      status === "published" ? "Blog published successfully." : "Blog saved successfully.",
      "success"
    );

    if (!blog.id && data.blog?.id) {
      router.replace(`/admin/cms/blog/${data.blog.id}`);
      setBlog((current) => ({ ...current, id: data.blog.id, status: data.blog.status }));
      return;
    }

    setBlog((current) => ({ ...current, ...data.blog }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await saveBlog("draft");
  }

  if (loading) return <p>Loading blog...</p>;

  return (
    <div>
      <AdminBreadcrumbs
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Blog", href: "/admin/cms/blog" },
          { label: blog.id ? "Edit Post" : "New Post" },
        ]}
      />

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary">
            {blog.id ? "Edit Blog Post" : "New Blog Post"}
          </h1>
          {blog.id ? <StatusBadge status={blog.status} /> : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => saveBlog("draft")}
            disabled={saving}
            className="rounded-lg border px-4 py-2 text-sm disabled:opacity-60"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => saveBlog("published")}
            disabled={saving}
            className="rounded-lg bg-primary px-4 py-2 text-sm text-white disabled:opacity-60"
          >
            Publish
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="rounded-xl border bg-white p-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField label="Title">
              <input
                value={blog.title}
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                className={inputClassName}
                required
              />
            </FormField>
            <FormField label="Slug">
              <input
                value={blog.slug}
                onChange={(e) => setBlog({ ...blog, slug: e.target.value })}
                className={inputClassName}
              />
            </FormField>
            <FormField label="Category">
              <select
                value={blog.categoryId ?? ""}
                onChange={(e) =>
                  setBlog({
                    ...blog,
                    categoryId: e.target.value ? Number(e.target.value) : null,
                  })
                }
                className={selectClassName}
              >
                <option value="">No category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField label="Tags" helpText="Comma-separated tags">
              <input
                value={blog.tags.join(", ")}
                onChange={(e) =>
                  setBlog({
                    ...blog,
                    tags: e.target.value
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean),
                  })
                }
                className={inputClassName}
              />
            </FormField>
            <FormField label="Publish Date">
              <input
                type="datetime-local"
                value={
                  blog.publishedAt
                    ? new Date(blog.publishedAt).toISOString().slice(0, 16)
                    : ""
                }
                onChange={(e) =>
                  setBlog({
                    ...blog,
                    publishedAt: e.target.value
                      ? new Date(e.target.value).toISOString()
                      : "",
                  })
                }
                className={inputClassName}
              />
            </FormField>
          </div>

          <MediaPicker
            label="Featured Image"
            value={blog.featuredMediaId}
            onChange={(id) => setBlog({ ...blog, featuredMediaId: id })}
          />
          <FormField label="Featured Image Alt Text">
            <input
              value={blog.featuredImageAlt}
              onChange={(e) => setBlog({ ...blog, featuredImageAlt: e.target.value })}
              className={inputClassName}
            />
          </FormField>

          <FormField label="Excerpt">
            <textarea
              value={blog.excerpt}
              onChange={(e) => setBlog({ ...blog, excerpt: e.target.value })}
              className={textareaClassName}
            />
          </FormField>

          <FormField label="Content">
            <RichTextEditor
              content={blog.content}
              onChange={(content) => setBlog({ ...blog, content })}
            />
          </FormField>
        </section>

        <section className="rounded-xl border bg-white p-6">
          <h2 className="mb-4 font-headline-md">SEO</h2>
          <SeoEditor
            values={seoValues}
            onChange={(values) =>
              setBlog({
                ...blog,
                metaTitle: values.metaTitle,
                metaDescription: values.metaDescription,
                metaKeywords: values.keywords,
                ogTitle: values.ogTitle,
                ogDescription: values.ogDescription,
                ogImageId: values.ogImageId,
              })
            }
          />
        </section>

        {blog.id ? (
          <p className="text-sm text-on-surface-variant">
            Preview is available after public blog migration. CMS data is stored independently.
          </p>
        ) : null}
      </form>
    </div>
  );
}
