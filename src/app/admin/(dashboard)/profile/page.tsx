"use client";

import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";

type Profile = {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

export default function AdminProfilePage() {
  const { data: session, update } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);

  async function loadProfile() {
    const res = await fetch("/api/admin/profile");
    if (res.ok) {
      const data = await res.json();
      setProfile(data.user);
      setName(data.user.name);
      setEmail(data.user.email);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadProfile();
  }, []);

  async function handleProfileSubmit(event: FormEvent) {
    event.preventDefault();
    setProfileMessage("");
    setProfileError("");
    setProfileSaving(true);

    const res = await fetch("/api/admin/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    const data = await res.json();

    setProfileSaving(false);

    if (!res.ok) {
      setProfileError(data.error ?? "Failed to update profile.");
      return;
    }

    setProfile(data.user);
    setProfileMessage("Profile updated successfully.");
    await update({ name: data.user.name, email: data.user.email });
  }

  async function handlePasswordSubmit(event: FormEvent) {
    event.preventDefault();
    setPasswordMessage("");
    setPasswordError("");

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    setPasswordSaving(true);

    const res = await fetch("/api/admin/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json();

    setPasswordSaving(false);

    if (!res.ok) {
      setPasswordError(data.error ?? "Failed to update password.");
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordMessage("Password updated successfully.");
  }

  if (loading) {
    return <p className="text-on-surface-variant">Loading...</p>;
  }

  if (!profile) {
    return <p className="text-on-surface-variant">Unable to load profile.</p>;
  }

  return (
    <div className="space-y-10 max-w-2xl">
      <div>
        <h1 className="font-headline-lg text-headline-lg text-primary">My Profile</h1>
        <p className="text-on-surface-variant mt-2">
          Update your account details and password.
        </p>
      </div>

      <form
        onSubmit={handleProfileSubmit}
        className="rounded-xl border border-outline-variant/30 bg-white p-6 space-y-4"
      >
        <h2 className="font-headline-md text-headline-md">Account details</h2>

        <div>
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">
            Full name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-outline-variant px-4 py-3 focus:border-primary focus:outline-none"
            required
            minLength={2}
          />
        </div>

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
            Role
          </label>
          <input
            value={profile.role === "super_admin" ? "Super Admin" : "Admin"}
            disabled
            className="w-full rounded-lg border border-outline-variant/50 bg-surface px-4 py-3 text-on-surface-variant cursor-not-allowed"
          />
        </div>

        {profileError && <p className="text-sm text-error">{profileError}</p>}
        {profileMessage && <p className="text-sm text-secondary">{profileMessage}</p>}

        <button
          type="submit"
          disabled={profileSaving}
          className="rounded-lg bg-primary px-6 py-3 font-label-sm text-label-sm text-on-primary hover:bg-primary/90 disabled:opacity-60"
        >
          {profileSaving ? "Saving..." : "Save profile"}
        </button>
      </form>

      <form
        onSubmit={handlePasswordSubmit}
        className="rounded-xl border border-outline-variant/30 bg-white p-6 space-y-4"
      >
        <h2 className="font-headline-md text-headline-md">Change password</h2>

        <div>
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">
            Current password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full rounded-lg border border-outline-variant px-4 py-3 focus:border-primary focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">
            New password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-lg border border-outline-variant px-4 py-3 focus:border-primary focus:outline-none"
            required
            minLength={8}
          />
        </div>

        <div>
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">
            Confirm new password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border border-outline-variant px-4 py-3 focus:border-primary focus:outline-none"
            required
            minLength={8}
          />
        </div>

        {passwordError && <p className="text-sm text-error">{passwordError}</p>}
        {passwordMessage && <p className="text-sm text-secondary">{passwordMessage}</p>}

        <button
          type="submit"
          disabled={passwordSaving}
          className="rounded-lg bg-primary px-6 py-3 font-label-sm text-label-sm text-on-primary hover:bg-primary/90 disabled:opacity-60"
        >
          {passwordSaving ? "Updating..." : "Update password"}
        </button>
      </form>

      {session?.user?.email && (
        <p className="text-sm text-on-surface-variant">
          Signed in as {session.user.email}
        </p>
      )}
    </div>
  );
}
