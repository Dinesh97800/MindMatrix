# CMS Canonical V4 Final Validation

Status: independent read-only validation of the Canonical V4 dry-run  
Validated: 2026-09-05  
Dry-run generated: 2026-09-05T12:35:54.369Z  
Manifest version: `2026-09-05-canonical-v4`  
Mode: **READ-ONLY / NO DATABASE MUTATIONS**  
Dry-run result: **PASSED** (0 validation errors)  
This validation: **PASSED** with warnings and hard migration preconditions  

This report inspects the regenerated `CMS_CANONICAL_MIGRATION_MANIFEST.json` and `CMS_CANONICAL_MIGRATION_DRY_RUN.md` against `CMS_CONTENT_MODEL_AUDIT.md`, the canonical TypeScript contracts, and the explicit adapters. Public rendering was not changed. No INSERT, UPDATE, DELETE, ALTER, DROP, TRUNCATE, migration, seed, cleanup, or schema command was executed.

## Gate results

| # | Gate | Result |
|---|---|---|
| 1 | Route coverage | **PASS** |
| 2 | React source coverage | **PASS** |
| 3 | Content extraction | **PASS** |
| 4 | Stable keys | **PASS** |
| 5 | UTILITY / composition handling | **PASS** |
| 6 | First-class entities | **PASS** with warnings |
| 7 | Shared / global content | **PASS** with warnings |
| 8 | Images / media | **PASS** with warnings |
| 9 | Draft / publish safety | **PASS** for the proposed architecture; current live CMS is not snapshot-safe |
| 10 | Rendering architecture | **PASS** for the proposed template-locked model |
| 11 | Database safety of this operation | **PASS** |
| 12 | Final report | This file |

## Exact counts

| Item | Count |
|---|---|
| Filesystem / audited routes | **75** |
| Active / effective publishable routes | **55** |
| Redirect-only routes | **20** |
| Unknown / unclassified routes | **0** |
| Audited React source composition slots | **341** |
| Canonical section bindings | **354** |
| Extra bindings vs slots | **13** |
| Slot status MAPPED | **317** |
| Slot status FIRST_CLASS_ENTITY | **21** |
| Slot status UTILITY | **3** |
| Slot status INVALID / MISSING_SOURCE / DUPLICATE | **0** |
| Explicit adapters resolving previously missing JSX | **182** |
| Remaining unresolved JSX / heuristic extraction | **0** |
| Duplicate canonical `stableKey` values within a page | **0** |
| Dry-run validation errors | **0** |
| Existing DB pages | **75** |
| Existing DB sections | **540** |
| Existing DB SEO rows | **75** |
| Existing DB media | **21** |
| Existing DB settings | **18** |
| Existing DB blogs | **6** |
| Existing `_cmsEdited` rows | **1** |
| Existing page/type duplicate groups | **122** |
| Local discovered media | **21** |
| Known remote hero/blog images in media audit | **30** |
| Remote image URLs inside canonical content | **75** |
| Missing local images | **0** |
| Non-WebP local assets | **6** |
| Duplicate file-content groups | **1** |

The 13 extra bindings are accounted for: 8 shared-layout sections on `/32-bit-controller` and `/rtos` (present in the audit map, absent as independent generated inventory entries) plus 5 intentional composite splits.

## 1. Route coverage — PASS

- 75 routes classified.
- 55 active and `publishable: true`.
- 20 redirects and `publishable: false`.
- 0 unknown classifications.
- Filesystem routes, audit map, and `next.config.ts` redirects match.

## 2. React source coverage — PASS

- Every audited inventory slot has at least one canonical mapping.
- Every mapping uses a catalog model or explicit `UTILITY`.
- No unsupported models.
- No duplicate canonical `stableKey` values within a page.
- Composite React components correctly expand to multiple logical bindings.

## 3. Content extraction — PASS

- No remaining `MISSING_SOURCE` sections.
- No heuristic JSX/string extraction remains in the dry-run path.
- Implementation-leak scan found no CSS classes, Tailwind utility strings, JSX fragments, SVG paths, or animation configuration stored as editable content.
- Content is constructed from explicit adapters, `siteContent` / hero / page-content config, legal data, and first-class listings.

Adapter origin mix in the manifest:

- explicit adapter: **182**
- structured-config: **142**
- structured-data: **185**
- component-inline known resolvers (forms, listings, nav, utility, a few heroes): **27**
- missing source: **0**

## 4. Stable keys — PASS

- Every CMS-managed section has an immutable semantic `stableKey` such as `telecom.scope` or `about.working-model`.
- Uniqueness is enforced in validation as page-local uniqueness; the proposed schema adds `UNIQUE(page_id, stable_key)`.
- No `stableKey` is derived only from a React component name (`HeroSection`, `Block2Section`, etc.).
- Required composites are split:

| Route | Source component | Canonical bindings |
|---|---|---|
| `/contact-us` | `LeftSideOfficeLocationsSection` | `contact-us.locations` + `contact-us.project-inquiry` |
| `/request-consultation` | `LeftColumnHighTrustContentSection` | `request-consultation.trust-copy` + `request-consultation.form` |
| `/privacy-policy` | `SideNavigationSection` | `privacy-policy.legal-document` + `legal.toc` |
| `/technical-downloads-and-sdks` | `SidebarNavigationSection` | `downloads.assets` + `downloads.categories` |
| `/the-future-of-deterministic-edge-computing` | `LeftSidebarAuthorInfoSection` | `deterministic-edge.article` + `article.toc` |

## 5. UTILITY / composition / redirects — PASS

UTILITY records have empty content and sit only on non-publishable redirect routes:

| Route | stableKey | Reason |
|---|---|---|
| `/industrial-iot-gateway` | `industrial-iot-gateway.composition-alias` | Composition wrapper for `APPROVED(iot)` |
| `/technical-downloads-and-sdks` | `downloads.local-footer` | Duplicates site footer responsibility |
| `/technical-downloads-and-sdks` | `downloads.scroll-to-top` | Scroll control, not CMS content |

Redirect-only routes are classified `redirect`, `publishable: false`, and must not be seeded as independent publishable CMS pages. Any later seed must also exclude the three UTILITY rows.

## 6. First-class entities — PASS with warnings

The model classification matches the audit. Items are not inlined as generic page-builder cards when the audit requires a listing/reference.

### Bindings

| stableKey | Entity | Route class | References in manifest |
|---|---|---|---|
| `case-studies.projects` | `case_study` | active | **8 slugs** from `@/data/case-studies` |
| `careers.jobs` | `job` | active | empty |
| `cognitive-core.related-projects` | `case_study` | active | empty |
| `quantum-ready.related-projects` | `case_study` | active | empty |
| `blog-index.posts` | `blog` | redirect | empty |
| `hyperloop.related-insights` | `blog` | redirect | empty |
| `whitepapers.records` | `resource` | redirect | empty |
| `resources.records` | `resource` | redirect | empty |
| `downloads.assets` | `resource` | redirect | empty |
| `knowledge.directory` | `resource` | redirect | empty |
| `nanolithography.related-projects` | `case_study` | redirect | empty |
| `application-notes.deep-dives` | `case_study` | redirect | empty; **likely should be `resource`** |

Existing first-class blog rows in the current database: **6**.  
Proposed and not created: `case_studies`, `resources`, and `jobs` tables. `blogs` already exists.

### Warnings

- Only `case-studies.projects` currently carries concrete record slugs.
- Active empty listings (`careers.jobs`, `cognitive-core.related-projects`, `quantum-ready.related-projects`) must be bound at seed time from first-class records or an ATS/query, not stored as duplicated page JSON.
- Featured case-study **MEDIA** blocks (for example `bess.case-study`, `energy-management.transit-case`, `environmental.case-study`) still embed narrative copy. That is acceptable as page-owned feature copy, but a later seed should prefer entity references where the same project is already a first-class record.
- `application-notes.deep-dives` is classified `case_study` because the listing heuristic defaults unmatched LISTING keys to case study.

## 7. Shared / global content — PASS with warnings

Header, footer, company identity, and contact fields are owned by site settings / `company.ts` / `navigation.ts`, not by a header/footer section on every page.

Standard consultation, confidentiality, and deliverables copy is still **inlined** into shared-layout page sections from `siteContent` (28 consultation CTAs; confidentiality-like copy appears in 63 sections). A naive page-JSON seed would snapshot those values onto every approved/index page.

Seed requirement: persist those strings once in global settings and let templates read them. Do not copy them into every page record.

Phone and social links are settings-owned and are not duplicated as page sections.

## 8. Images / media — PASS with warnings

- Image fields are generally structured as `{ source, mediaAlt? }` or `{ source: null, status }`.
- CSS / background implementation is not stored as editable content.
- No local files were converted or deleted.

### Structured-media exception

`deterministic-edge.article.author.image` is a raw URL string, not `{ source }`. The route is redirect-only.

### Non-WebP local assets (reported only; not converted)

- `/apple-icon.png`
- `/favicon.png`
- `/icon.png`
- `/mind-matrix-logo.png`
- `/Engineering-Approach.png` — also referenced by `services.engineering-approach`
- `/telecom-power.png` — also referenced by `home.industries`

Duplicate file-content group: `/apple-icon.png`, `/favicon.png`, `/icon.png`.

### Other media warnings

- 75 remote `lh3.googleusercontent.com` / `aida-public` URLs in canonical content.
- 30 known remote hero/blog URLs in the media audit.
- Missing local images: none.
- Managed media IDs are not yet bound; adapters store paths/URLs. Import must map these to `media` rows before public CMS cutover.

## 9. Draft / publish safety — PASS for the proposed architecture

The dry-run proposes:

- page/section revision/snapshot tables
- draft records that do not mutate published snapshots
- preview and production using the same template registry

Canonical page manifests are all `status: "draft"`. Public pages still render from existing React templates, so this dry-run cannot change production content.

Current live CMS is **not** snapshot-safe:

- `pages.status` is a single enum on the live row
- admin PATCH writes section `data` in place and sets `_cmsEdited`
- `getPublishedPage()` reads the live published row
- no revision/snapshot models exist

Do not reseed into the current schema and then switch public rendering. Snapshot tables must exist first, or draft edits will overwrite production CMS rows.

## 10. Rendering architecture — PASS for the proposed model

Canonical records lock `page.template` and `section.template` to existing React presentation adapters (`shared.approved`, `shared.index`, `{slug}.page`, semantic section templates). That is CMS data → existing React template → existing visual design.

Current admin preview still uses the generic `SectionRenderer` and is isolated from public routes. `public-page-loader.ts` still contains a TODO that would wire public pages to that generic renderer. That path must not be used. Public cutover must resolve `template` to the existing page/section components.

Active pages with no hero, matching the audit:

- `/contact-us`
- `/privacy-policy`
- `/request-consultation`
- `/solutions`

No active page has more than one hero.

## 11. Database safety of this operation — PASS

Before and after snapshots are identical:

```
pages=75
sections=540
seo=75
media=21
settings=18
blogs=6
pageUpdatedAt=2026-09-05 15:45:48 GMT+0530
sectionUpdatedAt=2026-09-05 16:15:25 GMT+0530
```

A follow-up SELECT-only check found the same counts and timestamps. This validation made zero database changes.

## Redirect classification

All 20 remain dormant source maps and are not publishable:

| Source | Target |
|---|---|
| `/application-notes-and-design-guides` | `/about-us` |
| `/atacama-solar-reserve` | `/case-studies` |
| `/aws-iot` | `/iot` |
| `/azure-iot` | `/iot` |
| `/building-automation` | `/industrial-automation` |
| `/engineering-whitepapers` | `/about-us` |
| `/freertos` | `/rtos` |
| `/hyperloop-beta` | `/case-studies` |
| `/industrial-iot-gateway` | `/iot` |
| `/industrial-iot-solutions` | `/iot` |
| `/insights-and-engineering-blog` | `/about-us` |
| `/metropolis-ev-transit` | `/case-studies` |
| `/nanolithography-cluster-control` | `/case-studies` |
| `/renewable-energy` | `/energy-monitoring` |
| `/resources-and-blog` | `/about-us` |
| `/smart-grid` | `/energy-monitoring` |
| `/stm32` | `/32-bit-controller` |
| `/technical-downloads-and-sdks` | `/about-us` |
| `/technical-knowledge-base` | `/about-us` |
| `/the-future-of-deterministic-edge-computing` | `/about-us` |

## Routes needing manual review

1. Confirm the 20 redirects stay permanent before omitting them from the publishable inventory.
2. If restored, decompose composite indexes: `application-notes.composite-index`, `whitepapers.composite-index`, `knowledge.composite-index`.
3. Keep `/industrial-iot-gateway` as a composition alias; never seed it as `content_block`.
4. `/32-bit-controller` and `/rtos` are mapped via `APPROVED(...)` but are missing as independent generated inventory entries (audit: 73 inventory pages, 2 missing).
5. Bind empty active listings: `careers.jobs`, `cognitive-core.related-projects`, `quantum-ready.related-projects`.
6. Reclassify `application-notes.deep-dives` if that listing is resources rather than case studies.
7. Preserve admin-edited `/services` hero before any cleanup.
8. Decide whether featured case-study MEDIA blocks should become entity references.
9. Replace remote `aida-public` images and convert the six non-WebP assets in a later, explicit media pass.
10. Some CTA actions use `action: "developer-controlled"` rather than `href` (`careers.general-application`, `industrial-controller.upgrade`, `nordic.authority`, `nxp.future`, `smart-infrastructure`). Confirm those stay application-owned.

## Warnings

- Shared consultation / confidentiality / deliverables copy is still materialized onto every approved/index page in the manifest.
- Most LISTING `references` arrays are empty.
- `application-notes.deep-dives` entity type is probably wrong.
- One unstructured author image on a redirect article.
- 75 remote content images and 6 non-WebP local assets.
- Encoding artifacts remain in a few adapter strings (`Âµ`, `Â®`, `Â°`).
- Current admin save path mutates live rows and is not a published snapshot.
- Current preview is a generic renderer and must not become the public renderer.
- Existing database still has 540 generic-typed sections and 122 type-duplicate groups. That is legacy state, not a dry-run mapping failure.

## Anything that would make database cleanup / reseed unsafe

A mapping-complete dry-run does **not** make a blind cleanup safe. The following must be true before any write:

1. Take a backup of `pages`, `page_sections`, `page_seo`, `media`, `site_settings`, and `blogs`.
2. Preserve `page_sections.id = 200` (`/services` hero, `_cmsEdited: true`). Do not overwrite it with adapter output until an editor reviews the live value.
3. Do not delete the 122 legacy type-duplicate groups until each row is reconciled to a `stableKey`.
4. Apply proposed schema first: `stable_key`, `model`, locked `template`, source/editor/decoration JSON, `UNIQUE(page_id, stable_key)`, and revision/snapshot tables.
5. Create first-class `case_studies`, `resources`, and `jobs` tables (reuse `blogs`) before seeding listings that should reference them.
6. Exclude all 20 redirect routes from the publishable page seed.
7. Exclude all 3 UTILITY rows from `page_sections`.
8. Do not persist header, footer, company, contact, social, or standard consultation/confidentiality strings as per-page JSON.
9. Do not import remote/non-WebP assets as final production media without a separate media pass.
10. Do not point public routes at `SectionRenderer`.
11. Do not run cleanup/reseed against the current in-place draft/publish schema if public rendering will consume CMS data.

## Verdict

The Canonical V4 dry-run mapping is complete: 75/55/20 coverage, 341 slots mapped, 182 explicit adapters, no heuristic leftovers, no unknown routes, no duplicate stable keys, and this operation changed zero database rows. A separately approved migration may proceed only with the preconditions above. This validation did not run that migration.

READY_FOR_DATABASE_MIGRATION
