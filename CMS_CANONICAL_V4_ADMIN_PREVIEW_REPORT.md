# CMS Canonical V4 Admin Preview Report

Generated: 2026-09-05  
Mode: **ADMIN PREVIEW ONLY — public rendering unchanged**  
Result: **PASSED WITH LIMITATIONS**

Admin preview now maps CMS pages through Canonical V4 identity:

`CMS page → stableKey → template → existing React template/component → preview`

The generic `SectionRenderer` JSON/card approximation is no longer used for admin preview.

---

## What was built

- Preview payload API: `GET /api/admin/cms/pages/[id]/preview`
- Preview page: `/admin/cms/pages/[id]/preview` (outside the admin sidebar chrome)
- Adapter registry: `src/cms/preview/adapter-id.ts`
- Existing-template adapters: `src/cms/preview/adapters.tsx`
- Page composer: `src/cms/preview/CanonicalPreview.tsx`
- Coverage audit: `scripts/cms-canonical-v4-preview-audit.ts`

Public routes still use legacy React templates. `getPublishedPage` is not imported by any public page. `SectionRenderer` is not used by public pages.

---

## Templates supported

Every live canonical template on the 55 active pages resolved to a preview adapter. Missing-adapter count: **0**.

| Adapter | Existing React template used | Canonical models |
|---|---|---|
| `home-hero` | `StatsGridSection` | HERO (`home.hero-with-metrics`) |
| `hero` | `ConfiguredHero` → `SplitHero` / `BackgroundImageHero` | HERO |
| `approved-scope` | `ApprovedPageLayout` typical-scope list | CARDS |
| `approved-info` | `ApprovedPageLayout` deliverables/confidentiality | CARDS |
| `approved-cta` | `ApprovedPageLayout` consultation CTA | CTA |
| `index-grid` | `IndexPageLayout` link grid | CARDS |
| `why-choose-us` | `WhyChooseUsSection` | CARDS |
| `service-cards` | `Card1Section` / `Service1Section` | CARDS |
| `cards` | same card-grid markup as `Card1Section` | CARDS |
| `cta` | `Block2Section` consultation banner | CTA |
| `content` | existing content-block typography | CONTENT |
| `media` | existing split media/copy section | MEDIA |
| `metrics` | `StatsGridSection` metrics row | METRICS |
| `process` | `ProgressLineSection` | PROCESS |
| `arch` | CMS nodes only; no invented geometry | ARCH |
| `table` | CMS columns/rows | TABLE |
| `logos` | technology/logo strip | LOGOS |
| `faq` | `ApprovedPageLayout` FAQ | FAQ |
| `case-study-listing` | `SelectedProjectExperienceSection` | LISTING |
| `listing` | first-class entity list | LISTING |
| `article` | legal document sections | ARTICLE |
| `form` | form copy only; fields stay developer-owned | FORM |
| `contact` | contact/location copy | CONTACT |
| `nav` | static legal/nav labels | NAV |

UTILITY bindings are not previewed as editable CMS content.

Page-level templates covered:

- `shared.approved` (21 pages)
- `shared.index` (2 pages)
- custom `*.page` templates (32 pages)

---

## Templates requiring adapters

None remaining for the migrated 55 active pages / 255 live sections.

If a future template has no adapter, preview shows:

`template / stableKey / model / source.component`

It does not fall back to a generic renderer.

---

## Pages tested

Independent audit: `npx tsx scripts/cms-canonical-v4-preview-audit.ts`

- Active pages: **55**
- Pages tested: **55**
- Failed pages: **0**
- SEO present: **55 / 55**

Tested slugs:

32-bit-controller, about-us, ai-enabled-engineering, battery-energy-storage, battery-management-system, careers, case-studies, cognitive-core-os, connectivity, contact-us, contact-us-and-engineering-consultation, earth-resistance-monitoring, embedded-firmware-development, embedded-linux, embedded-measurement-system, energy-management, energy-monitoring, engineering-consulting, engineering-process, environmental-monitoring, esp32, ev-charger-electronics, ev-infrastructure, faq, hardware-development, home, industrial-automation, industrial-communication, industrial-controller, industrial-protocols, industries, iot, manufacturing, microchip, mqtt, nordic, nxp, oil-and-gas, pipeline-monitoring, privacy-policy, product-development, quantum-ready-data-architecture, remote-monitoring, renesas, request-consultation, rtos, services, smart-infrastructure, snmp-alarm-gateway, solutions, technologies, telecom, terms-and-conditions, texas-instruments, wireless-sensor-network

---

## Sections tested

- Live canonical sections: **255**
- Sections with adapters: **255**
- Missing mappings: **0**
- Live UTILITY rows: **0**
- Redirect pages: not independently previewable

---

## Failed previews

- Payload build failures: **0**
- Missing adapters: **0**
- Unresolved first-class entity references: **0**
- Missing CMS media ids: **0**
- Invalid data crash: guarded per section with `SectionBoundary`

---

## Missing mappings

None for the current Canonical V4 live set.

---

## Entity resolution

| Entity | Preview behavior |
|---|---|
| case studies | 8 referenced slugs resolve from `case_studies` and render through the `SelectedProjectExperienceSection` card layout |
| blogs | referenced slugs resolve from `blogs`; empty listings stay empty |
| jobs | no invented rows; empty listing shows CMS empty state |
| resources | no invented rows; empty listing shows CMS empty state |

Unresolved entity references: **0**

---

## Media resolution

- `imageId` / `backgroundImageId` resolve through `/api/cms/media/{id}`
- Public paths such as `/images/...` are used as stored
- Remote URLs are kept and flagged as remote
- Missing media ids are reported; no placeholder image is invented
- `/services` hero `imageId=6` resolves to `/api/cms/media/6`

Missing CMS media ids in preview audit: **0**

---

## Draft / published behavior

- Preview reads the current CMS `page_sections` rows (saved admin data)
- Public routes ignore CMS status and still render legacy React templates
- All 55 active CMS pages are currently `draft`
- Preview chrome distinguishes:
  - **Saved CMS page status** (`draft` / `published`)
  - **Admin-edited / draft-saved section** (`_cmsEdited` or `_preservedRowId`)
  - **Migrated seed section**
  - **Preview-only chrome** (toolbar, origin chips, SEO panel, missing-media notices)
- Save in the editor writes CMS rows; Preview/Refresh loads those saved rows with `cache: no-store`
- Publishing a CMS page does not change the public website

---

## /services hero verification

| Check | Result |
|---|---|
| `page_sections.id` | **200** |
| `stableKey` | `services.hero` |
| `template` | `services.hero` |
| adapter | `hero` → `SplitHero` / `BackgroundImageHero` |
| data origin | admin-edited |
| `_preservedRowId` | **200** |
| title | `Edge AI and Intelligent Engineering Solutions` |
| `imageId` | **6** |
| media URL | `/api/cms/media/6` |
| adapter missing | no |

The adapter hero copy from the manifest was not used for this row.

---

## Desktop / mobile

Preview includes Desktop (`max-width: 1280px`) and Mobile (`390px`) frames.

Verified programmatically for all 55 pages.

Visual browser pass of the preview chrome was not completed in this session because `/admin/cms/pages/[id]/preview` requires an admin login (HTTP 307 to login). Public `/` and `/services` returned 200 from the legacy templates.

After login, use:

1. Website Content → Edit Content → Preview
2. Toggle Desktop / Mobile
3. Toggle origin chips and SEO panel
4. Save Changes → Preview / Refresh

---

## Structural fields

Not exposed as editable preview content:

- `stableKey`
- `model`
- `template`
- `source`
- `decorations`
- layout/geometry/form fields

They appear only in preview-only origin chips and missing-adapter reports.

---

## Known limitations

1. Page-specific decorative/shader backgrounds are not replayed when they are developer-owned decorations, not CMS content.
2. ARCH preview lists CMS nodes/copy. It does not invent SVG/geometry that remains developer-controlled.
3. FORM preview shows heading/supporting/privacy copy only. Fields, validation, and delivery stay developer-owned.
4. Empty jobs/resources listings stay empty. No records were invented.
5. Preview is CMS-data-driven using the existing visual templates. It is not a pixel-for-pixel replay of every zero-prop page-local JSX file.
6. Visual desktop/mobile screenshots still need an admin session.
7. Public rendering was not switched and must not be switched until this preview is approved.

---

## Public rendering

Not changed.

- `GET /` → 200 legacy home template
- `GET /services` → 200 legacy services template
- No public page imports `CanonicalPreview`, `SectionRenderer`, or `getPublishedPage`

---

## Next phase

Stopped here.

Do not begin public CMS rendering until this Admin Preview report is reviewed and approved.
