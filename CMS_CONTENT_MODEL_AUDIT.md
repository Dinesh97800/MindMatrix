# Public Page and Canonical CMS Content Model Audit

Status: pre-database-change audit  
Scope: `src/app/(home)`, `src/app/(main)`, `src/components/pages`, shared page layouts, and configured redirects  
Database changes performed: **none**

## Audit result

- Public route files: **75**
- Effective pages after configured redirects: **55**
- Permanent redirect sources: **20**
- Generated component inventory entries: **73**
- Routes missing as independent generated inventory entries: **2** (`32-bit-controller`, `rtos`)
- Custom-layout page components: **50**
- Shared approved-layout page components: **21**
- Shared index-layout page components: **2**
- React section instances represented by the source inventory: **341**
- Distinct custom section component names: **87**

The existing migration inventory is not a canonical content model. It identifies component files and extracts strings heuristically. Generic names such as `Section`, `Block2Section`, and `Block3Section` describe 101 instances but have different semantics on different pages. Canonical mapping must therefore be based on the section's responsibility and template, not its React function name.

## Canonical record contract

Every CMS-managed section should have these invariant fields before page-specific content is considered:

| Field | Purpose |
|---|---|
| `stableKey` | Immutable semantic key such as `telecom.scope`; unique within a page. Never derived only from a component function name. |
| `model` | One canonical content model from the catalog below. |
| `template` | Locked React presentation adapter, such as `telecom.scope-grid` or `shared.approved-info-pair`. |
| `content` | Typed editable content for the selected model. |
| `visibility` | Draft visibility. Published visibility belongs to a published revision/snapshot. |
| `source` | Original route, component file, component export, and audit version. |
| `editorPolicy` | Editable fields, locked fields, collection limits, and validation constraints. |
| `decorations` | Locked visual configuration. Decorative SVG, layout classes, and animation code are not editable content. |

`stableKey` must be protected by a database uniqueness rule on `(page_id, stable_key)` when the database is eventually changed. That prevents the duplicate heroes and CTAs currently present.

## Canonical model catalog

| Code | Canonical model | Core editable content | Notes |
|---|---|---|---|
| `HERO` | Hero | eyebrow, title, title accents/lines, summary, media, media alt, actions | Layout, overlay, tone, and animation remain locked in `template`. |
| `CONTENT` | Narrative content | eyebrow, title, rich body, bullets, links | For prose, principles, benefits, supporting statements, and multi-column narrative. |
| `CARDS` | Card collection | heading, introduction, cards with title/body/icon/media/link/badge | Template controls grid, bento, checklist, challenge, application, or info-pair presentation. |
| `MEDIA` | Media feature | heading, body, media, alt, bullets, actions, callouts | Split panels, featured case studies, image-led features, and technical showcases. |
| `METRICS` | Metrics collection | items with value, label, description, optional progress | Stats strips and result/outcome blocks. |
| `PROCESS` | Ordered process | heading, introduction, ordered steps, optional connectors | Engineering lifecycle and node-to-insight flows. |
| `ARCH` | Architecture/diagram | heading, introduction, nodes, edges, groups, legend, annotations | Diagram geometry and SVG implementation remain template-owned. |
| `TABLE` | Comparison/specification table | heading, columns, rows, notes | Semantic rows only; never extracted CSS strings. |
| `LOGOS` | Logo/technology strip | heading, items with label/logo/media/link | Includes protocol and partner marquees. |
| `CTA` | Call to action | eyebrow, title, body, actions, optional media | Buttons must be links or explicitly supported actions. |
| `FAQ` | FAQ collection | heading, introduction, question/answer items | May use locked accordion/card template. |
| `LISTING` | Managed listing | heading, introduction, filters/taxonomy, item references, empty state | Used for jobs, resources, posts, downloads, and case studies. Items should normally be first-class records. |
| `ARTICLE` | Article/document | title, author, dates, lead media, rich body, sections, references | Used for editorial articles and legal documents; legal variant supports clauses. |
| `FORM` | Form presentation | heading, supporting copy, form key, success copy, privacy copy | Form fields, validation, delivery, and security remain application-owned. |
| `CONTACT` | Contact/location | heading, addresses, communication methods, hours, map reference | Structured address fields; map coordinates are typed values. |
| `NAV` | Navigation/filter controls | labels, taxonomy references, optional static link groups | Pagination state and filter behavior are application-owned. |
| `UTILITY` | Non-content UI | no CMS content | Scroll controls, purely decorative layers, and composition wrappers are not seeded as sections. |

## Shared layout expansions

The shorthand below is used in the route audit. Each shorthand expands to actual React sections and canonical models.

- `APPROVED(pageKey)`: `PageContentHero -> HERO/shared.approved-hero`; Typical Scope section -> `CARDS/shared.checklist`; Deliverables/Confidentiality section -> `CARDS/shared.info-pair`; final CTA section -> `CTA/shared.consultation`.
- `APPROVED_FAQ`: `PageContentHero -> HERO/shared.approved-hero`; FAQ section -> `FAQ/shared.faq-cards`; final CTA section -> `CTA/shared.consultation`.
- `INDEX(pageKey)`: `PageContentHero -> HERO/shared.index-hero`; link grid section -> `CARDS/shared.link-index`; final CTA section -> `CTA/shared.consultation`.

## Route-by-route canonical mapping

`active` means the route can render its page component. `redirect` means `next.config.ts` intercepts the route before its React page can render. Redirected components are still mapped as dormant source content for completeness, but should not receive an independent publishable CMS page unless the redirect is intentionally removed.

### A–C

- `/32-bit-controller` — **active**, renders `Stm32PageContent` — `APPROVED(32-bit-controller)`.
- `/about-us` — **active** — `HeroSection -> HERO/about.hero`; `Section -> CONTENT/about.working-model`; `Block2006Section -> MEDIA/about.production-transition`; `WhyChooseUsSection -> CARDS/shared.why-choose-us`; `Block2Section -> CARDS/about.core-principles`; `Block3Section -> CTA/about.partner`.
- `/ai-enabled-engineering` — **active** — `AnimatedShaderBackgroundSection -> HERO/ai.hero`; `TinymlCardSection -> CARDS/ai.solution-domains`; `Section -> CARDS/ai.capability-areas`; `Block2Section -> TABLE/ai.platforms`; `Block3Section -> CARDS/ai.solution-categories`; `Block4Section -> CONTENT/ai.secondary-capability`; `Block5Section -> CONTENT/ai.practical-ai`; `Block6Section -> CTA/ai.consultation`.
- `/application-notes-and-design-guides` — **redirect -> /about-us** — dormant: `HeroSection -> HERO/application-notes.hero`; `MajorQuickStartCardSection -> CARDS/application-notes.quick-start`; `NoteCard1Section -> LISTING/application-notes.deep-dives`; `Section -> LOGOS/application-notes.related-technologies`; `SidenavbarSection -> NAV/application-notes.composite-index`. The last component repeats page content and requires manual decomposition if this route is restored.
- `/atacama-solar-reserve` — **redirect -> /case-studies** — dormant: `HeroSection -> HERO/atacama.hero`; `Challenge1Section -> CARDS/atacama.challenges`; `HardwareSection -> MEDIA/atacama.architectural-solution`; `Node1PvArraysSection -> ARCH/atacama.flow`; `Section -> METRICS/atacama.results`; `Block2Section -> CTA/atacama.optimization`.
- `/aws-iot` — **redirect -> /iot** — dormant: `HeroSection -> HERO/aws-iot.hero`; `Feature1Section -> CARDS/aws-iot.architecture`; `Section -> MEDIA/aws-iot.frontiers`; `Block2Section -> CONTENT/aws-iot.technical-primacy`; `Block3Section -> CTA/aws-iot.consultation`; `BackgroundVisualizationSection -> ARCH/aws-iot.engineering-experience`.
- `/azure-iot` — **redirect -> /iot** — dormant: `HeroSection -> HERO/azure-iot.hero`; `LargeFeatureIotCentralSection -> CARDS/azure-iot.features`; `Section -> CARDS/azure-iot.embedded-engineering`; `Block2Section -> MEDIA/azure-iot.verticals`; `Block3Section -> CTA/azure-iot.integration`; `TechnicalCalloutOverlaySection -> MEDIA/azure-iot.digital-twins`.
- `/battery-energy-storage` — **active** — `HeroSection -> HERO/bess.hero`; `Section -> CARDS/bess.challenges`; `Block2Section -> MEDIA/bess.hardware-software`; `Block3Section -> LOGOS/bess.technology-arsenal`; `Block4Section -> MEDIA/bess.case-study`; `Block5Section -> CONTENT/bess.engineering-core`; `Block6Section -> CTA/bess.energy-future`.
- `/battery-management-system` — **active** — `ConfiguredHero -> HERO/bms.hero`; `BentoGridForArchitectureSection -> CARDS/bms.architecture`; `Section -> LOGOS/bms.silicon-platforms`; `Block2Section -> MEDIA/bms.industrial-applications`; `Block3Section -> CTA/bms.power-solution`.
- `/building-automation` — **redirect -> /industrial-automation** — dormant: `HeroSection -> HERO/building-automation.hero`; `HvacSection -> CARDS/building-automation.challenges`; `ColumnLeftSection -> ARCH/building-automation.unified-architecture`; `Section -> LOGOS/building-automation.protocols`; `Block2Section -> MEDIA/building-automation.cognitive-core`; `Block3Section -> CTA/building-automation.future`.
- `/careers` — **active** — `HeroSection -> HERO/careers.hero`; `Section -> CARDS/careers.culture`; `Block2Section -> CONTENT/careers.employee-success`; `FiltersSection -> LISTING/careers.jobs`; `Block3Section -> CTA/careers.general-application`.
- `/case-studies` — **active** — `HeroSection -> HERO/case-studies.hero`; `SelectedProjectExperienceSection -> LISTING/case-studies.projects` backed by first-class case-study records.
- `/cognitive-core-os` — **active** — `HeroSection -> HERO/cognitive-core.hero`; `Section -> METRICS/cognitive-core.performance`; `TheProblemSection -> CARDS/cognitive-core.risks`; `HardwareSection -> MEDIA/cognitive-core.hardware-rtos`; `VisualRepresentationOfArchitectureSection -> ARCH/cognitive-core.stack`; `Block2Section -> CTA/cognitive-core.optimization`; `Block3Section -> LISTING/cognitive-core.related-projects`.
- `/connectivity` — **active** — `HeroSection -> HERO/connectivity.hero`; `LargeFeatureCardSection -> CARDS/connectivity.capabilities`; `Section -> MEDIA/connectivity.rf-design`; `App1Section -> CARDS/connectivity.deployments`; `Block2Section -> METRICS/connectivity.performance`; `Block3Section -> CTA/connectivity.strategy`.
- `/contact-us` — **active** — `LeftSideOfficeLocationsSection -> CONTACT/contact-us.locations` plus `FORM/contact-us.project-inquiry` in the same locked template. These should be separate content bindings even if one React component remains.
- `/contact-us-and-engineering-consultation` — **active** — `HeroSection -> HERO/consultation.hero`; `ConsultationFormSection -> FORM/consultation.enquiry`; `InteractiveMapPlaceholderSection -> CONTACT/consultation.office-map`; `FaqItem1Section -> FAQ/consultation.technical-faq`; `Section -> CARDS/consultation.supporting-links`.

### E–I

- `/earth-resistance-monitoring` — **active** — `HeroSection -> HERO/earth-resistance.hero`; `Section -> CARDS/earth-resistance.benefits`; `Feature1Section -> ARCH/earth-resistance.system`; `Block2Section -> CARDS/earth-resistance.applications`; `Block3Section -> CARDS/earth-resistance.operational-benefits`; `Block4Section -> CTA/earth-resistance.security`.
- `/embedded-firmware-development` — **active** — `APPROVED(embedded-firmware-development)`.
- `/embedded-linux` — **active** — `APPROVED(embedded-linux)`.
- `/embedded-measurement-system` — **active** — `APPROVED(embedded-measurement-system)`.
- `/energy-management` — **active** — `HeroSection -> HERO/energy-management.hero`; `Challenge1Section -> CARDS/energy-management.challenges`; `Section -> MEDIA/energy-management.hardware-software`; `Block2Section -> ARCH/energy-management.system`; `Block3Section -> MEDIA/energy-management.transit-case`; `Block4Section -> CARDS/energy-management.capabilities`; `Block5Section -> CTA/energy-management.audit`.
- `/energy-monitoring` — **active** — `APPROVED(energy-monitoring)`.
- `/engineering-consulting` — **active** — `APPROVED(engineering-consulting)`.
- `/engineering-process` — **active** — `APPROVED(engineering-process)`.
- `/engineering-whitepapers` — **redirect -> /about-us** — dormant: `HeroSection -> HERO/whitepapers.hero`; `Section -> NAV/whitepapers.filters`; `Card1FeaturedSection -> LISTING/whitepapers.records`; `Block2Section -> NAV/whitepapers.load-more`; `SidenavbarSection -> NAV/whitepapers.composite-index`. The composite component repeats listing content and must be decomposed if restored.
- `/environmental-monitoring` — **active** — `HeroSection -> HERO/environmental.hero`; `Challenge1Section -> CARDS/environmental.challenges`; `Section -> ARCH/environmental.infrastructure`; `Block2Section -> MEDIA/environmental.case-study`; `DecorativeAtmosphericBackgroundSection -> CTA/environmental.ecological-data` with decoration locked in the template.
- `/esp32` — **active** — `HeroSection -> HERO/esp32.hero`; `Feature1Section -> CARDS/esp32.capabilities`; `Section -> MEDIA/esp32.engineering-core`; `Block2Section -> CONTENT/esp32.deployment`; `Block3Section -> CARDS/esp32.applications`; `Block4Section -> CTA/esp32.scale`.
- `/ev-charger-electronics` — **active** — `APPROVED(ev-charger-electronics)`.
- `/ev-infrastructure` — **active** — `ConfiguredHero -> HERO/ev-infrastructure.hero`; `ThermalCardSection -> CARDS/ev-infrastructure.challenges`; `Solution1Section -> CARDS/ev-infrastructure.solutions`; `Section -> MEDIA/ev-infrastructure.case-study`; `Block2Section -> CTA/ev-infrastructure.sustainability`.
- `/faq` — **active** — `APPROVED_FAQ`.
- `/freertos` — **redirect -> /rtos** — dormant source composition: `APPROVED(rtos)`.
- `/hardware-development` — **active** — `APPROVED(hardware-development)`.
- `/` (`home`) — **active** — `StatsGridSection -> HERO/home.hero-with-metrics`; `Service1Section -> CARDS/home.services`; `AiSolutionsHighlightSection -> MEDIA/home.ai-highlight`; `ProgressLineSection -> PROCESS/home.lifecycle`; `Section -> CARDS/home.industries`; `RepeatedLogosForContinuousLoopSection -> LOGOS/home.technology-marquee`; `WhyChooseUsSection -> CARDS/home.why-choose-us`; `Block2Section -> CTA/home.engineering-discussion`.
- `/hyperloop-beta` — **redirect -> /case-studies** — dormant: `HeroSection -> HERO/hyperloop.hero`; `Section -> METRICS/hyperloop.validation`; `ProblemStatementSection -> CARDS/hyperloop.constraints`; `AbstractArchitectureVisualizationSection -> ARCH/hyperloop.sensor-mesh`; `Block2Section -> METRICS/hyperloop.outcomes`; `Block3Section -> LISTING/hyperloop.related-insights`; `Block4Section -> CTA/hyperloop.review`.
- `/industrial-automation` — **active** — `APPROVED(industrial-automation)`.
- `/industrial-communication` — **active** — `APPROVED(industrial-communication)`.
- `/industrial-controller` — **active** — `ConfiguredHero -> HERO/industrial-controller.hero`; `ProcessingCoreSection -> CARDS/industrial-controller.architecture`; `Section -> LOGOS/industrial-controller.connectivity`; `SubtleTechBackgroundEffectSection -> CTA/industrial-controller.upgrade` with decoration locked in the template.
- `/industrial-iot-gateway` — **redirect -> /iot** — `IotPageContent -> UTILITY/industrial-iot-gateway.composition-alias`; it is a composition wrapper, not a content section. It resolves to `APPROVED(iot)` and must never be seeded as a `content_block`.
- `/industrial-iot-solutions` — **redirect -> /iot** — dormant: `HeroSection -> HERO/iiot.hero`; `Step1Section -> PROCESS/iiot.node-to-insight`; `SensorIntegrationSection -> CARDS/iiot.capabilities`; `Section -> LOGOS/iiot.ecosystem`; `Block2Section -> METRICS/iiot.advantages`; `Block3Section -> CARDS/iiot.verticals`; `Block4Section -> FAQ/iiot.technical-faq`; `Block5Section -> CTA/iiot.modernization`.
- `/industrial-protocols` — **active** — `APPROVED(industrial-protocols)`.
- `/industries` — **active** — `INDEX(industries)`.
- `/insights-and-engineering-blog` — **redirect -> /about-us** — dormant: `HeroSection -> HERO/blog-index.hero`; `BentoGridOfPostsSection -> LISTING/blog-index.posts` backed by first-class blog records.
- `/iot` — **active** — `APPROVED(iot)`.

### M–R

- `/manufacturing` — **active** — `APPROVED(manufacturing)`.
- `/metropolis-ev-transit` — **redirect -> /case-studies** — dormant: `HeroSection -> HERO/metropolis.hero`; `HardwareCardSection -> CARDS/metropolis.solution`; `SubstationSection -> ARCH/metropolis.system`; `Section -> LOGOS/metropolis.tech-stack`; `Block2Section -> CTA/metropolis.transit`.
- `/microchip` — **active** — `HeroSection -> HERO/microchip.hero`; `PicCardSection -> CARDS/microchip.product-families`; `GlassOverlayInfoSection -> MEDIA/microchip.mixed-signal`; `Section -> CONTENT/microchip.ruggedness`; `Block2Section -> CARDS/microchip.impact-areas`; `Block3Section -> CTA/microchip.innovation`.
- `/mqtt` — **active** — `APPROVED(mqtt)`.
- `/nanolithography-cluster-control` — **redirect -> /case-studies** — dormant: no distinct hero React section; `ChallengeLeftSection -> CARDS/nanolithography.challenge`; `TechColumn1Section -> ARCH/nanolithography.solution`; `Section -> METRICS/nanolithography.results`; `Block2Section -> CTA/nanolithography.stabilization`; `Block3Section -> LISTING/nanolithography.related-projects`.
- `/nordic` — **active** — `HeroSection -> HERO/nordic.hero`; `MainFeatureCardSection -> CARDS/nordic.platform-benefits`; `Section -> MEDIA/nordic.wireless-stack`; `ApplicationCard1Section -> CARDS/nordic.deployments`; `Block2Section -> CTA/nordic.authority`.
- `/nxp` — **active** — `ConfiguredHero -> HERO/nxp.hero`; `EdgeIntelligenceSection -> CARDS/nxp.domain-expertise`; `InteractiveLabelsOverlaySection -> ARCH/nxp.hardware`; `Section -> MEDIA/nxp.implementation`; `AbstractBackgroundDecorationSection -> CTA/nxp.future` with decoration locked in the template.
- `/oil-and-gas` — **active** — `ConfiguredHero -> HERO/oil-gas.hero`; `ExplosiveEnvironmentsSection -> CARDS/oil-gas.challenges`; `SmallAccentSection -> CARDS/oil-gas.solutions`; `Section -> LOGOS/oil-gas.stack-marquee`; `Block2Section -> CONTENT/oil-gas.quantum-ready`; `AtmosphericBgElementSection -> CTA/oil-gas.hardening` with decoration locked in the template.
- `/pipeline-monitoring` — **active** — `ConfiguredHero -> HERO/pipeline.hero`; `Section -> CARDS/pipeline.vulnerabilities`; `Solution1Section -> CARDS/pipeline.solutions`; `Block2Section -> CONTENT/pipeline.technical-superiority`; `Block3Section -> MEDIA/pipeline.asset-tracking`; `Block4Section -> CTA/pipeline.security`.
- `/privacy-policy` — **active** — `SideNavigationSection -> ARTICLE/privacy-policy.legal-document` with an associated `NAV/legal.toc` view; do not store the navigation and document as duplicate content.
- `/product-development` — **active** — `APPROVED(product-development)`.
- `/quantum-ready-data-architecture` — **active** — `HeroSection -> HERO/quantum-ready.hero`; `Section -> CARDS/quantum-ready.risks`; `HardwareSection -> ARCH/quantum-ready.architecture`; `Block2Section -> METRICS/quantum-ready.success`; `Block3Section -> CARDS/quantum-ready.outcomes`; `Block4Section -> CTA/quantum-ready.security`; `Block5Section -> LISTING/quantum-ready.related-projects`.
- `/remote-monitoring` — **active** — `APPROVED(remote-monitoring)`.
- `/renesas` — **active** — `DecorativeTechnicalLinesSection -> HERO/renesas.hero` with decorative lines template-owned; `Rl78CardSection -> CARDS/renesas.families`; `Section -> MEDIA/renesas.engineering-experience`; `UseCase1Section -> CARDS/renesas.verticals`; `Block2Section -> CONTENT/renesas.ruggedness`.
- `/renewable-energy` — **redirect -> /energy-monitoring** — dormant: `ConfiguredHero -> HERO/renewable.hero`; `ChallengesSection -> CARDS/renewable.challenges-and-expertise`; `Solution1Section -> CARDS/renewable.solutions`; `Section -> MEDIA/renewable.case-study`; `Block2Section -> CTA/renewable.optimization`.
- `/request-consultation` — **active** — `LeftColumnHighTrustContentSection -> CONTENT/request-consultation.trust-copy` plus `FORM/request-consultation.form` in one locked template; `Section -> CONTENT/request-consultation.responsibility`.
- `/resources-and-blog` — **redirect -> /about-us** — dormant: `FeaturedArticleCardAsymmetricLayoutSection -> MEDIA/resources.featured-article`; `Section -> NAV/resources.filters`; `ResourceCard1BlogSection -> LISTING/resources.records`; `Block2Section -> NAV/resources.pagination`; `Block3Section -> CTA/resources.custom-brief`.
- `/rtos` — **active**, renders `FreertosPageContent` — `APPROVED(rtos)`.

### S–W

- `/services` — **active** — `HeroSection -> HERO/services.hero`; `Card1Section -> CARDS/services.core-services`; `Section -> MEDIA/services.engineering-approach`; `Block2Section -> CTA/services.requirement`.
- `/smart-grid` — **redirect -> /energy-monitoring** — dormant: `ConfiguredHero -> HERO/smart-grid.hero`; `Section -> CARDS/smart-grid.challenges`; `Solution1Section -> CARDS/smart-grid.solutions`; `Block2Section -> ARCH/smart-grid.protocol-stack`; `Block3Section -> MEDIA/smart-grid.case-study`; `Block4Section -> LOGOS/smart-grid.domain-expertise`; `Block5Section -> CTA/smart-grid.modernization`.
- `/smart-infrastructure` — **active** — `ConfiguredHero -> HERO/smart-infrastructure.hero`; `Challenge1Section -> CARDS/smart-infrastructure.challenges`; `Solution1Section -> CARDS/smart-infrastructure.solutions`; `Section -> CARDS/smart-infrastructure.expertise`; `Block2Section -> MEDIA/smart-infrastructure.ev-grid`; `Block3Section -> CTA/smart-infrastructure.modernization`.
- `/snmp-alarm-gateway` — **active** — `APPROVED(snmp-alarm-gateway)`.
- `/solutions` — **active** — `SolutionCardIiotGatewaySection -> CARDS/solutions.solution-catalog`; `BackgroundTechLinesAnimationPlaceholderSection -> CTA/solutions.technical-inquiry` with decorative animation template-owned. There is no separate hero section in the current React composition.
- `/stm32` — **redirect -> /32-bit-controller** — dormant source composition: `APPROVED(32-bit-controller)`.
- `/technical-downloads-and-sdks` — **redirect -> /about-us** — dormant: `HeroSection -> HERO/downloads.hero`; `Section -> UTILITY/downloads.local-footer` because it duplicates site-level footer responsibility; `SidebarNavigationSection -> LISTING/downloads.assets` plus `NAV/downloads.categories`; `Block2Section -> UTILITY/downloads.scroll-to-top`, never a CMS section.
- `/technical-knowledge-base` — **redirect -> /about-us** — dormant: `HeroSection -> HERO/knowledge.hero`; `MainFeaturedSection -> MEDIA/knowledge.featured`; `DirectoryItemSection -> LISTING/knowledge.directory`; `SidenavbarTheTechnicalHierarchySection -> NAV/knowledge.composite-index`. The last component repeats page content and requires decomposition if restored.
- `/technologies` — **active** — `INDEX(technologies)`.
- `/telecom` — **active** — `APPROVED(telecom)`.
- `/terms-and-conditions` — **active** — `HeroSection -> HERO/terms.hero`; `TermsContentSection -> ARTICLE/terms.legal-document`.
- `/texas-instruments` — **active** — `HeroSection -> HERO/ti.hero`; `PowerManagementSection -> CARDS/ti.technology-domains`; `Section -> MEDIA/ti.signal-integrity`; `Block2Section -> MEDIA/ti.sensor-fusion`; `MedicalSection -> CARDS/ti.critical-infrastructure`; `Block3Section -> CONTENT/ti.advantage`; `Block4Section -> CTA/ti.system-design`.
- `/the-future-of-deterministic-edge-computing` — **redirect -> /about-us** — dormant: `HeroSection -> HERO/deterministic-edge.hero`; `LeftSidebarAuthorInfoSection -> ARTICLE/deterministic-edge.article` with author metadata and generated `NAV/article.toc`.
- `/wireless-sensor-network` — **active** — `ConfiguredHero -> HERO/wsn.hero`; `Section -> CONTENT/wsn.overview` plus embedded metrics; `EndNodesSection -> ARCH/wsn.topology`; `Block2Section -> LOGOS/wsn.standards`; `Block3Section -> CARDS/wsn.applications`; `SubtleBackgroundDecorationSection -> CTA/wsn.strategy` with decoration locked in the template.

## Cross-cutting content ownership

The following content must not be duplicated inside every page record:

- Header navigation and global footer: global navigation/settings models.
- Company name, addresses, phone numbers, email, social links, confidentiality, and standard consultation text: global settings.
- Case studies: first-class case-study records referenced by `LISTING` and `MEDIA` sections.
- Blog posts/articles: first-class blog/article records referenced by `LISTING` and `MEDIA` sections.
- Downloads/whitepapers: first-class resource records with media/file references.
- Jobs: first-class job records or an external ATS-backed listing.
- Form definitions and validation: application code; the CMS manages only presentation copy and routing configuration.
- Decorative shapes, SVG paths, animation, responsive layout, and CSS classes: React templates, never CMS JSON.

## Required corrections before reseeding

1. Freeze this route map and resolve whether the 20 redirected pages will remain redirects.
2. Introduce canonical TypeScript schemas for the model catalog and template-specific validation.
3. Give every mapped section an immutable semantic `stableKey`.
4. Split composite components that combine two ownership domains, especially forms plus contact content and article content plus navigation.
5. Exclude `UTILITY` and composition-wrapper records from seeding.
6. Replace heuristic JSX string extraction with explicit adapters that construct typed content from known config/data sources.
7. Add a dry-run manifest validator that requires exactly one mapped result for every audited React section.
8. Back up the CMS tables before any cleanup. Database cleanup and reseeding must be a separate, explicitly approved operation.
9. Render preview and production through the same template registry.
10. Add screenshot comparison for all 55 effective pages at desktop and mobile widths before publishing.

## Acceptance gates for the next phase

- All 75 routes are classified as active or redirect, with no unknown route.
- Every source React section maps to one canonical model or `UTILITY`.
- No CSS class, JSX fragment, component wrapper, or decoration is stored as editable content.
- Every active page has one hero at most, unless its approved template intentionally has none.
- No duplicate `(page, stableKey)` is possible.
- Draft edits do not change the published snapshot.
- Admin preview and public rendering use the same React template and data.
- Image fields reference managed media and enforce the project's WebP policy.
