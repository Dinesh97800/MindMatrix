"use client";

import { useEffect, useState } from "react";

type Subscription = {
  id: number;
  email: string;
  status: string;
  source: string;
  createdAt: string;
};

export default function AdminNewsletterPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/newsletter")
      .then((res) => res.json())
      .then((data) => setSubscriptions(data.subscriptions ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-headline-lg text-headline-lg text-primary">
          Newsletter Subscribers
        </h1>
        <p className="text-on-surface-variant mt-2">
          Email signups from the website footer.
        </p>
      </div>

      {loading ? (
        <p className="text-on-surface-variant">Loading...</p>
      ) : subscriptions.length === 0 ? (
        <p className="text-on-surface-variant">No subscribers yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-outline-variant/30 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-surface-container-low text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((item) => (
                <tr key={item.id} className="border-t border-outline-variant/20">
                  <td className="px-4 py-3 whitespace-nowrap">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{item.email}</td>
                  <td className="px-4 py-3">{item.source}</td>
                  <td className="px-4 py-3 capitalize">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
