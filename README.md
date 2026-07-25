# Mind Matrix Enterprise Engineering Portal

Production Next.js implementation of the **Mind Matrix Workspace** Stitch design system (Project ID: `5913104028999514215`).

## Design Source

Pages are authored as **TypeScript React components** (section-based), originally converted from Google Stitch HTML exports to preserve pixel-perfect fidelity:

- **Typography:** Space Grotesk (headings), Inter (body), Geist (labels)
- **Colors:** Material-style tokens from Stitch DESIGN.md
- **Layout:** 1440px max container, 48px desktop margins, 8px spacing base
- **Components:** Glass cards, technical glow, sticky nav, scroll reveal

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stitch Sync

Re-download from Stitch and regenerate TSX page components:

```bash
npm run stitch:download
npm run stitch:generate
```

`stitch:generate` extracts main content, fixes internal links, runs `migrate:tsx`, and removes transient HTML. Requires Stitch MCP / `stitch-html/` exports locally.

To re-run TSX conversion only (when `src/content/pages/*.html` exists):

```bash
npm run migrate:tsx
```

## Project Structure

```
src/
  app/                    # Next.js App Router (page.tsx + metadata per route)
  components/
    layout/               # Header, footers, layouts
    pages/{slug}/         # PageContent + sections/*.tsx per route
    ui/                   # Shared UI (e.g. StitchImage)
  data/                   # stitch-manifest.json
scripts/
  generate-pages.mjs      # Stitch → TSX pipeline
  migrate-html-to-tsx.mjs # HTML slice → section components
stitch-html/              # Raw Stitch exports (gitignored; local only)
```

## Pages

72 published routes including Home, Services, Industries, Technologies, Solutions, Case Studies, Contact, Careers, FAQ, and solution/technology detail pages.
