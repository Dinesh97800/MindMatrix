"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Submission = {
  id: number;
  source: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  metadata: Record<string, unknown> | null;
  status: string;
  createdAt: string;
};

export default function AdminSubmissionDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/submissions/${params.id}`)
      .then((res) => res.json())
      .then((data) => setSubmission(data.submission ?? null))
      .finally(() => setLoading(false));
  }, [params.id]);

  async function updateStatus(status: string) {
    const res = await fetch(`/api/admin/submissions/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (data.submission) setSubmission(data.submission);
  }

  async function deleteSubmission() {
    if (!confirm("Delete this submission permanently?")) return;
    await fetch(`/api/admin/submissions/${params.id}`, { method: "DELETE" });
    router.push("/admin/submissions");
  }

  if (loading) return <p>Loading...</p>;
  if (!submission) return <p>Submission not found.</p>;

  return (
    <div className="max-w-3xl">
      <Link href="/admin/submissions" className="text-primary text-sm hover:underline">
        ← Back to submissions
      </Link>

      <div className="mt-6 rounded-xl border border-outline-variant/30 bg-white p-8 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-headline-lg text-headline-md text-primary">
              {submission.name}
            </h1>
            <p className="text-on-surface-variant mt-1">{submission.email}</p>
          </div>
          <div className="flex gap-2">
            <select
              value={submission.status}
              onChange={(e) => updateStatus(e.target.value)}
              className="rounded-lg border border-outline-variant px-3 py-2 text-sm"
            >
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="archived">Archived</option>
            </select>
            <button
              type="button"
              onClick={deleteSubmission}
              className="rounded-lg border border-error/30 px-3 py-2 text-sm text-error"
            >
              Delete
            </button>
          </div>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-on-surface-variant">Source</dt>
            <dd className="font-medium">{submission.source}</dd>
          </div>
          <div>
            <dt className="text-on-surface-variant">Submitted</dt>
            <dd className="font-medium">
              {new Date(submission.createdAt).toLocaleString()}
            </dd>
          </div>
          {submission.phone && (
            <div>
              <dt className="text-on-surface-variant">Phone</dt>
              <dd className="font-medium">{submission.phone}</dd>
            </div>
          )}
          {submission.company && (
            <div>
              <dt className="text-on-surface-variant">Company</dt>
              <dd className="font-medium">{submission.company}</dd>
            </div>
          )}
          {submission.subject && (
            <div className="sm:col-span-2">
              <dt className="text-on-surface-variant">Subject</dt>
              <dd className="font-medium">{submission.subject}</dd>
            </div>
          )}
        </dl>

        <div>
          <h2 className="font-label-sm text-label-sm uppercase text-on-surface-variant mb-2">
            Message
          </h2>
          <p className="whitespace-pre-wrap font-body-md">{submission.message}</p>
        </div>

        {submission.metadata && Object.keys(submission.metadata).length > 0 && (
          <div>
            <h2 className="font-label-sm text-label-sm uppercase text-on-surface-variant mb-2">
              Additional Details
            </h2>
            <pre className="overflow-x-auto rounded-lg bg-surface-container-low p-4 text-xs">
              {JSON.stringify(submission.metadata, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
