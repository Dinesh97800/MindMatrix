import { LEGACY_BLOG_POSTS } from "./data/legacy-blog-posts";

export function getLegacyBlogPosts() {
  return LEGACY_BLOG_POSTS;
}

export function legacyBlogToContent(paragraphs: string[]): Record<string, unknown> {
  return {
    type: "doc",
    content: paragraphs.map((text) => ({
      type: "paragraph",
      content: [{ type: "text", text }],
    })),
  };
}
