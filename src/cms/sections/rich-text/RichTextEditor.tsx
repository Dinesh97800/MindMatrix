"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { useEffect } from "react";

export function RichTextEditor({
  content,
  onChange,
}: {
  content: Record<string, unknown> | null;
  onChange: (content: Record<string, unknown>) => void;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Write content..." }),
    ],
    content: content ?? { type: "doc", content: [{ type: "paragraph" }] },
    onUpdate: ({ editor: current }) => {
      onChange(current.getJSON() as Record<string, unknown>);
    },
  });

  useEffect(() => {
    if (!editor || !content) return;
    const current = editor.getJSON();
    if (JSON.stringify(current) !== JSON.stringify(content)) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return <p className="text-sm text-on-surface-variant">Loading editor...</p>;

  return (
    <div className="rounded-lg border">
      <div className="flex flex-wrap gap-1 border-b bg-surface-container-low p-2">
        {[
          { label: "B", action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold") },
          { label: "I", action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic") },
          { label: "U", action: () => editor.chain().focus().toggleUnderline().run(), active: editor.isActive("underline") },
          { label: "H2", action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }) },
          { label: "H3", action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive("heading", { level: 3 }) },
          { label: "• List", action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList") },
          { label: "1. List", action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList") },
          { label: "Quote", action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive("blockquote") },
        ].map((button) => (
          <button
            key={button.label}
            type="button"
            onClick={button.action}
            className={`rounded px-2 py-1 text-xs font-medium ${
              button.active ? "bg-primary text-white" : "bg-white hover:bg-primary/5"
            }`}
          >
            {button.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("Link URL");
            if (!url) return;
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
          }}
          className={`rounded px-2 py-1 text-xs font-medium ${
            editor.isActive("link") ? "bg-primary text-white" : "bg-white hover:bg-primary/5"
          }`}
        >
          Link
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="prose max-w-none p-4 min-h-[200px] [&_.ProseMirror]:outline-none"
      />
    </div>
  );
}
