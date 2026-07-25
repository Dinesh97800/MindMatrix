# Mind Matrix Enterprise Engineering Portal

Production Next.js implementation of the **Mind Matrix Workspace** Stitch design system (Project ID: `5913104028999514215`).

## Design Source

All pages are generated from Google Stitch HTML exports to preserve pixel-perfect fidelity with the original design:

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

Re-download and regenerate all pages from Stitch:

```bash
npm run stitch:download
npm run stitch:generate
```

Requires `stitch-screens.json` from the Stitch MCP API (stored in Cursor agent-tools by default).

## Project Structure

```
src/
  app/              # Next.js routes (77 pages)
  components/       # Shared layout (Header, Footer, HTML renderer)
  content/pages/    # Extracted Stitch main content (HTML)
  data/             # stitch-manifest.json
scripts/            # Download & page generation from Stitch
stitch-html/        # Raw Stitch HTML exports
```

## Pages

77 screens including Home, Services, Industries, Technologies, Solutions, Case Studies, Contact, Careers, FAQ, and 60+ solution/technology detail pages.
# MindMatrix
