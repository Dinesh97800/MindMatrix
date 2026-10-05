export async function submitContact(payload: {
  source: "contact-us" | "engineering-consultation" | "request-consultation";
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
  subject?: string;
  metadata?: Record<string, unknown>;
}) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error ?? "Submission failed.");
  }
  return data;
}

export async function submitNewsletter(email: string, source = "home-footer") {
  const res = await fetch("/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, source }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error ?? "Subscription failed.");
  }
  return data;
}
