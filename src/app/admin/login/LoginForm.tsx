"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push(searchParams.get("callbackUrl") ?? "/admin/submissions");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-primary-container flex items-center justify-center px-margin-mobile">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="font-headline-lg text-headline-lg text-primary mb-2">
          Admin Login
        </h1>
        <p className="text-on-surface-variant font-body-md mb-4">
          Sign in to manage contact submissions and newsletter signups.
        </p>
        <p className="text-on-surface-variant text-sm mb-8">
          Use the admin account from your database (created via{" "}
          <code className="text-primary">npm run db:seed</code>). This is not your
          MySQL password — use <code className="text-primary">ADMIN_SEED_EMAIL</code>{" "}
          and <code className="text-primary">ADMIN_SEED_PASSWORD</code> from{" "}
          <code className="text-primary">.env</code>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-outline-variant px-4 py-3 focus:border-primary focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-outline-variant px-4 py-3 focus:border-primary focus:outline-none"
              required
            />
          </div>
          {error && <p className="text-error text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary py-3 font-label-sm text-label-sm text-on-primary hover:bg-primary/90 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
