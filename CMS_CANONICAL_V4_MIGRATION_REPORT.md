# CMS Canonical V4 Migration Report

Generated: 2026-09-05T13:05:00.000Z  
Mode: **DATABASE MIGRATION ONLY — public rendering unchanged**  
Result: **PASSED WITH WARNINGS**

Independent post-migration validation (`scripts/cms-canonical-v4-post-validate.mjs`) confirmed all required gates after a targeted restore of `/services` hero `page_sections.id=200`.

---

## Phase 1 — Backup verification

- Backup directory: `D:\Projects\MindMatrix\backups\cms-canonical-v4-canonical-v4-2026-09-05`
- Verified-original copy of the hero snapshot: `D:\Projects\MindMatrix\backups\cms-canonical-v4-canonical-v4-2026-09-05-verified-original\services-hero-200.json`
- JSON exports verified before mutation:
  - pages=75
  - page_sections=540
  - page_seo=75
  - media=21
  - blogs=6
  - blog_categories=6
  - site_settings=18
  - page_categories=29
- `/services` hero id=200 captured before mutation (`services-hero-200.json`).
- SQL dump: not created. `mysqldump` was skipped after an earlier empty/hanging dump. The verified JSON table exports are the migration backup.
- Backup verification passed. No destructive work ran without a verified JSON snapshot.

---

## Phase 2 — Schema changes

Applied `src/lib/db/migrations/003-canonical-v4.mjs` and recorded `003-canonical-v4.mjs` in `sequelize_meta`.

`pages`:

- `classification` (`active` | `redirect`)
- `redirect_target`
- `publishable`

`page_sections`:

- `stable_key` (immutable semantic key; not admin-editable)
- `model`
- `template`
- `source_meta`
- `editor_policy`
- `decorations`

Constraints:

- `stable_key`, `model`, and `template` are `NOT NULL` on live rows
- `UNIQUE(page_id, stable_key)` via `page_sections_page_id_stable_key_unique`

New tables:

- Archive: `cms_archive_pages`, `cms_archive_page_sections`
- First-class entities: `case_studies`, `resources`, `jobs`
- Snapshots: `page_revisions`, `page_section_revisions`

Structural fields remain developer-controlled. Content is editable only where `editorPolicy.editable` allows it.

---

## Phase 3 — Preserved `/services` hero

| Field | Value |
|---|---|
| Original id | **200** |
| Page | `/services` |
| Role | hero |
| Canonical stableKey | `services.hero` |
| Canonical model | `HERO` |
| Row still exists | **yes** |
| Archive reason | `preserved_admin_edited` |

Admin-edited content restored and verified:

- title: `Edge AI and Intelligent Engineering Solutions`
- eyebrow: `AI-Driven Product Engineering`
- imageId: `6`
- ctaText: `Discuss Your Application`
- ctaUrl: `http://localhost:3000/request-consultation`
- markers: `data._preservedRowId = 200`, `data._cmsEdited = true`

The adapter/manifest hero copy (`Embedded Product Engineering for Industrial and Power-Electronics Applications`) was **not** written over this row.

### Preservation incident and recovery

The first write pass bound id=200 to `services.hero` correctly, but MySQL returned `data` as a JSON string. The migrate script only spread `data` when it was already an object, so `prior` became `{}` and only migration markers were stored.

This violated the preserve-admin-content rule. The operation was stopped for that row and the original `data` was restored from the verified pre-migration backup:

- source: `backups/cms-canonical-v4-canonical-v4-2026-09-05/services-hero-200.json`
- restore script: `scripts/cms-canonical-v4-restore-hero-200.mjs`

The migrate script now parses string or object `data` before merging, and will not overwrite an existing verified JSON backup directory.

Independent validation after restore: **hero identity and admin fields match the backup**.

---

## Phase 4 — Historical data cleanup

- Historical pages archived in batch `canonical-v4-2026-09-05`: **75**
- Historical sections archived in the same batch **before** live cleanup: **540**
- Live historical sections deleted after archive: **539**
- Preserved live row: **id=200**
- Cleanup used the Canonical V4 `(page, stableKey)` mapping, not section type/name alone
- Archive tables retain the pre-canonical snapshot; live tables now hold only the canonical representation plus the required preserved hero

---

## Phase 5 — Canonical V4 seed

- Manifest version: `2026-09-05-canonical-v4`
- Canonical pages created/updated: **75**
- Canonical sections created: **254**
- Canonical sections updated: **1** (id=200)
- Live sections after seed: **255**
- Expected active non-UTILITY sections from the manifest: **255**
- Extra/missing live bindings: **0**
- Duplicate `(page_id, stable_key)`: **0**
- Seed source: Canonical V4 adapters/manifest only. No JSX parsing.

Identity is `(page_id, stable_key)`. A second pass refreshed sort order only and did not insert duplicates.

---

## Phase 6 — Redirects

- Redirect routes: **20**
- Active/effective pages: **55**
- Unknown routes: **0**
- Redirect pages are metadata only: `classification=redirect`, `publishable=false`, `status=draft`, `published_at=NULL`
- Redirect pages have **0** live sections
- Redirects were not published and are not independently publishable CMS pages

---

## Phase 7 — UTILITY bindings

Manifest UTILITY keys (developer-owned, not seeded as live CMS sections):

- `industrial-iot-gateway.composition-alias`
- `downloads.local-footer`
- `downloads.scroll-to-top`

Live `model=UTILITY` sections: **0**

Scroll-to-top, local footer composition, structural wrappers, and composition aliases were not converted into editable content.

---

## Phase 8 — First-class entity bindings

| Entity | Count | Notes |
|---|---:|---|
| case_studies | 8 | Seeded from existing `src/data/case-studies.ts` |
| blogs | 6 | Preserved; no invented posts |
| jobs | 0 | Table created; no invented rows |
| resources | 0 | Table created; no invented rows |

- `case-studies.projects` references the 8 existing case-study slugs
- Empty listing references were left empty
- Unresolved entity references: **0**

---

## Phase 9 — Media

- Existing media rows preserved: **21**
- Remote image URLs recorded in canonical content: **54**
- Non-WebP local paths recorded: **2**
- No images were converted, deleted, generated, or replaced with placeholders
- Remote/non-WebP assets are migration warnings only

---

## Phase 10 — Validation

Independent read-only validation after restore:

| Check | Result |
|---|---|
| 75 routes classified | PASS |
| 55 active/effective pages | PASS |
| 20 redirects | PASS |
| 0 unknown routes | PASS |
| Every audited source slot has a canonical or UTILITY mapping | PASS (0 unmapped slots) |
| No duplicate `(page_id, stableKey)` | PASS |
| No extra/missing canonical sections vs manifest | PASS |
| No unsupported canonical models | PASS |
| `UNIQUE(page_id, stable_key)` present | PASS |
| No CSS/JSX/decorations stored as editable content | PASS |
| First-class entity references resolve | PASS |
| Media preserved; remote/non-WebP recorded | PASS WITH WARNINGS |
| SEO records exist for all 55 active pages | PASS (75 SEO rows retained) |
| Global settings preserved | PASS (18) |
| `/services` hero id=200 preserved | PASS |
| Admin-edited hero content not overwritten | PASS (after restore) |
| Redirects not publishable and have no live sections | PASS |
| UTILITY not live editable content | PASS |
| Migration idempotent (255 → 255, no duplicates) | PASS |

---

## Phase 11 — Public rendering

**Stopped here. Public rendering was not switched.**

- Legacy React templates remain the public site
- No public page imports `getPublishedPage` or `SectionRenderer`
- `SectionRenderer` remains admin preview only
- `getPublishedPage` remains unused by public page components
- No new public pages or public sections were created
- No generic renderer was introduced for the live website

---

## Before / after counts

| Table | Before | After |
|---|---:|---:|
| pages | 75 | 75 |
| page_sections | 540 | 255 |
| page_seo | 75 | 75 |
| media | 21 | 21 |
| blogs | 6 | 6 |
| site_settings | 18 | 18 |
| case_studies | 0 | 8 |
| resources | 0 | 0 |
| jobs | 0 | 0 |
| cms_archive_pages | 0 | 75 |
| cms_archive_page_sections | 0 | 540 |

---

## Warnings

- Verified JSON table exports are the migration backup. `mysqldump` was skipped to avoid a blocking empty dump.
- 54 remote image URLs remain in canonical content. They were not replaced.
- 2 non-WebP local image paths remain. They were not converted or replaced.
- The first seed write for id=200 dropped admin `data` because MySQL returned JSON as a string. The row was restored from the verified backup before this report was accepted.

---

## Errors

- None remaining after hero restore.

---

## Idempotency

- First-pass live sections: **255**
- Repeat-pass live sections: **255**
- Second pass only refreshed sort order for non-preserved rows
- Re-running seed must upsert by `(page_id, stable_key)` and must not insert duplicates
- Existing verified backup directory is reused and not overwritten

---

## Next authorized phase (not started)

Only after this report is accepted:

1. Bind existing React templates to canonical CMS data
2. Gradually switch public rendering

Do not do that work yet.
