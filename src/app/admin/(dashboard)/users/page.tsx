"use client";

import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";

type AdminUserRow = {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
};

export default function AdminUsersPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "super_admin">("admin");
  const [message, setMessage] = useState("");

  const isSuperAdmin = session?.user?.role === "super_admin";

  async function loadUsers() {
    const res = await fetch("/api/admin/users");
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (isSuperAdmin) loadUsers();
    else setLoading(false);
  }, [isSuperAdmin]);

  async function handleCreate(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error ?? "Failed to create user.");
      return;
    }
    setName("");
    setEmail("");
    setPassword("");
    setRole("admin");
    setMessage("Admin user created.");
    loadUsers();
  }

  async function toggleActive(user: AdminUserRow) {
    await fetch(`/api/admin/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !user.isActive }),
    });
    loadUsers();
  }

  if (!isSuperAdmin) {
    return <p className="text-on-surface-variant">Super admin access required.</p>;
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-headline-lg text-headline-lg text-primary">
          Admin Users
        </h1>
        <p className="text-on-surface-variant mt-2">
          Manage who can access the admin panel.
        </p>
      </div>

      <form
        onSubmit={handleCreate}
        className="rounded-xl border border-outline-variant/30 bg-white p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl"
      >
        <h2 className="md:col-span-2 font-headline-md text-headline-md">
          Add admin user
        </h2>
        <input
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-lg border border-outline-variant px-4 py-3"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-lg border border-outline-variant px-4 py-3"
          required
        />
        <input
          type="password"
          placeholder="Password (min 8 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-lg border border-outline-variant px-4 py-3"
          required
          minLength={8}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "admin" | "super_admin")}
          className="rounded-lg border border-outline-variant px-4 py-3"
        >
          <option value="admin">Admin</option>
          <option value="super_admin">Super Admin</option>
        </select>
        <button
          type="submit"
          className="md:col-span-2 rounded-lg bg-primary py-3 text-on-primary font-label-sm text-label-sm"
        >
          Create user
        </button>
        {message && <p className="md:col-span-2 text-sm text-secondary">{message}</p>}
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-outline-variant/30 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-surface-container-low text-left">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-outline-variant/20">
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.role}</td>
                  <td className="px-4 py-3">
                    {user.isActive ? "Active" : "Inactive"}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => toggleActive(user)}
                      className="text-primary hover:underline"
                    >
                      {user.isActive ? "Deactivate" : "Activate"}
                    </button>
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
