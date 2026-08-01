"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Submission = {
  id: number;
  source: string;
  name: string;
  email: string;
  subject: string | null;
  status: string;
  createdAt: string;
};

const sourceLabels: Record<string, string> = {
  "contact-us": "Contact Us",
  "engineering-consultation": "Engineering Consultation",
  "request-consultation": "Request Consultation",
};

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/submissions")
      .then((res) => res.json())
      .then((data) => setSubmissions(data.submissions ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-headline-lg text-headline-lg text-primary">
          Contact Submissions
        </h1>
        <p className="text-on-surface-variant mt-2">
          All enquiries from contact and consultation forms.
        </p>
      </div>

      {loading ? (
        <p className="text-on-surface-variant">Loading...</p>
      ) : submissions.length === 0 ? (
        <p className="text-on-surface-variant">No submissions yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-outline-variant/30 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-surface-container-low text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((item) => (
                <tr key={item.id} className="border-t border-outline-variant/20">
                  <td className="px-4 py-3 whitespace-nowrap">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    {sourceLabels[item.source] ?? item.source}
                  </td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.email}</td>
                  <td className="px-4 py-3 capitalize">{item.status}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/submissions/${item.id}`}
                      className="text-primary font-medium hover:underline"
                    >
                      View
                    </Link>
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
