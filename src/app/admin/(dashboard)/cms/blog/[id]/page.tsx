"use client";

import { useParams } from "next/navigation";
import { BlogEditorClient } from "@/components/admin/cms/BlogEditorClient";

export default function CmsBlogEditPage() {
  const params = useParams<{ id: string }>();
  return <BlogEditorClient blogId={Number(params.id)} />;
}
