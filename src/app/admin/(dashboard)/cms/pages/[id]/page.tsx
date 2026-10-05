"use client";

import { useParams } from "next/navigation";
import { PageEditorClient } from "@/components/admin/cms/PageEditorClient";

export default function CmsPageEditorPage() {
  const params = useParams<{ id: string }>();
  return <PageEditorClient pageId={Number(params.id)} />;
}
