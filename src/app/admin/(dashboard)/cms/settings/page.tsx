"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { AdminBreadcrumbs } from "@/components/admin/AdminSidebar";
import { FormField, inputClassName, textareaClassName } from "@/components/admin/cms/FormField";
import { MediaPicker } from "@/components/admin/cms/MediaPicker";
import { useAdminToast } from "@/components/admin/AdminToast";

type SettingEntry = {
  group: string;
  key: string;
  value: string;
  label: string;
};

const SETTING_DEFINITIONS: SettingEntry[] = [
  { group: "general", key: "websiteUrl", value: "https://mmisindia.com", label: "Website URL" },
  { group: "company", key: "legalName", value: "Mind Matrix Intelligent Solutions", label: "Legal Name" },
  { group: "company", key: "shortName", value: "Mind Matrix", label: "Company Name" },
  { group: "company", key: "gstin", value: "06BMCP5140JA123", label: "GST Number" },
  { group: "contact", key: "email", value: "info@mmisindia.com", label: "Email" },
  { group: "contact", key: "contactEmail", value: "", label: "Contact Email" },
  { group: "contact", key: "phone", value: "", label: "Phone" },
  { group: "contact", key: "secondaryPhone", value: "", label: "Secondary Phone" },
  { group: "contact", key: "addressLine1", value: "181, Near Signature Tower, Saini Khera", label: "Address" },
  { group: "contact", key: "city", value: "Gurugram", label: "City" },
  { group: "contact", key: "state", value: "Haryana", label: "State" },
  { group: "contact", key: "googleMapsUrl", value: "", label: "Google Maps URL" },
  { group: "social", key: "linkedin", value: "", label: "LinkedIn" },
  { group: "social", key: "facebook", value: "", label: "Facebook" },
  { group: "social", key: "instagram", value: "", label: "Instagram" },
  { group: "social", key: "youtube", value: "", label: "YouTube" },
  { group: "seo", key: "defaultTitle", value: "", label: "Default SEO Title" },
  { group: "seo", key: "defaultDescription", value: "", label: "Default Description" },
  { group: "footer", key: "description", value: "", label: "Footer Description" },
  { group: "footer", key: "copyright", value: "", label: "Copyright" },
];

const TABS = [
  { id: "general", label: "General" },
  { id: "company", label: "Company" },
  { id: "contact", label: "Contact" },
  { id: "social", label: "Social" },
  { id: "seo", label: "SEO" },
  { id: "footer", label: "Footer" },
] as const;

export default function CmsSettingsPage() {
  const { pushToast } = useAdminToast();
  const [settings, setSettings] = useState<SettingEntry[]>(SETTING_DEFINITIONS);
  const [ogImageId, setOgImageId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>("general");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/cms/settings")
      .then((res) => res.json())
      .then((data) => {
        const grouped = data.settings ?? {};
        const merged = SETTING_DEFINITIONS.map((entry) => {
          const existing = grouped[entry.group]?.find(
            (item: { key: string; value: unknown }) => item.key === entry.key
          );
          return existing
            ? { ...entry, value: String(existing.value ?? "") }
            : entry;
        });
        setSettings(merged);
        const ogImage = grouped.seo?.find(
          (item: { key: string; value: unknown }) => item.key === "defaultOgImageId"
        );
        setOgImageId(ogImage?.value ? Number(ogImage.value) : null);
      })
      .finally(() => setLoading(false));
  }, []);

  const tabSettings = useMemo(
    () => settings.filter((entry) => entry.group === activeTab),
    [settings, activeTab]
  );

  function updateSetting(index: number, value: string) {
    setSettings((current) =>
      current.map((entry, i) => (i === index ? { ...entry, value } : entry))
    );
  }

  async function handleSave(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    const payload = [
      ...settings.map((entry) => ({
        group: entry.group,
        key: entry.key,
        value: entry.value,
      })),
      { group: "seo", key: "defaultOgImageId", value: ogImageId ?? "" },
    ];

    const response = await fetch("/api/admin/cms/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings: payload }),
    });
    const data = await response.json();
    setSaving(false);

    if (!response.ok) {
      pushToast(data.error ?? "Unable to save settings.", "error");
      return;
    }

    pushToast("Settings saved successfully.", "success");
  }

  return (
    <div>
      <AdminBreadcrumbs
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Global Settings" },
        ]}
      />
      <h1 className="font-headline-lg text-headline-lg text-primary">Global Settings</h1>
      <p className="mt-2 mb-6 text-on-surface-variant">
        CMS-managed settings for future website migration. Public site still uses existing config files.
      </p>

      {loading ? (
        <p>Loading settings...</p>
      ) : (
        <form onSubmit={handleSave}>
          <div className="mb-6 flex flex-wrap gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-lg px-4 py-2 text-sm ${
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "border bg-white hover:border-primary/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <section className="rounded-xl border bg-white p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {tabSettings.map((entry) => {
                const index = settings.findIndex(
                  (item) => item.group === entry.group && item.key === entry.key
                );
                return (
                  <FormField key={`${entry.group}.${entry.key}`} label={entry.label}>
                    {entry.key.includes("description") || entry.key === "addressLine1" ? (
                      <textarea
                        value={entry.value}
                        onChange={(e) => updateSetting(index, e.target.value)}
                        className={textareaClassName}
                      />
                    ) : (
                      <input
                        value={entry.value}
                        onChange={(e) => updateSetting(index, e.target.value)}
                        className={inputClassName}
                      />
                    )}
                  </FormField>
                );
              })}
              {activeTab === "seo" ? (
                <div className="md:col-span-2">
                  <MediaPicker
                    label="Default OG Image"
                    value={ogImageId}
                    onChange={setOgImageId}
                  />
                </div>
              ) : null}
            </div>
          </section>

          <button
            type="submit"
            disabled={saving}
            className="mt-6 rounded-lg bg-primary px-4 py-2 text-white disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </form>
      )}
    </div>
  );
}
