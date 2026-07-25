import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const screensPath = path.join(
  process.env.STITCH_SCREENS_JSON ||
    path.join(
      process.env.USERPROFILE || "",
      ".cursor/projects/c-Users-Hp-Desktop-Cursor-Mind-Matrix-Workspace/agent-tools/stitch-screens.json"
    )
);
const outputDir = path.join(root, "stitch-html");

function slugify(title, deviceType = "DESKTOP") {
  const base = title.split("|")[0].trim();
  let slug = base
    .toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (deviceType === "MOBILE" && !slug.includes("mobile")) {
    slug = `${slug}-mobile`;
  }

  return slug;
}

function extractScreens(data) {
  const screens = data?.result?.structuredContent?.screens;
  if (Array.isArray(screens)) return screens;

  const text = data?.result?.content?.[0]?.text;
  if (text) {
    const parsed = JSON.parse(text);
    return parsed.screens || [];
  }
  return [];
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  const html = await res.text();
  fs.writeFileSync(dest, html, "utf8");
  return html.length;
}

async function main() {
  if (!fs.existsSync(screensPath)) {
    console.error("Missing stitch-screens.json at", screensPath);
    process.exit(1);
  }

  const rawText = fs.readFileSync(screensPath, "utf8").replace(/^\uFEFF/, "");
  const raw = JSON.parse(rawText);
  const screens = extractScreens(raw);

  fs.mkdirSync(outputDir, { recursive: true });

  const manifest = [];

  for (const screen of screens) {
    const title = screen.title || "Untitled";
    if (screen.deviceType === "MOBILE") {
      console.log(`Skip mobile screen: ${title}`);
      continue;
    }
    const slug = slugify(title, screen.deviceType || "DESKTOP");
    const url = screen.htmlCode?.downloadUrl;
    if (!url) {
      console.warn("Skip (no HTML):", title);
      continue;
    }

    const filename = `${slug}.html`;
    const dest = path.join(outputDir, filename);

    try {
      const size = await download(url, dest);
      manifest.push({
        slug,
        title,
        filename,
        deviceType: screen.deviceType || "DESKTOP",
        screenId: screen.name?.split("/").pop(),
      });
      console.log(`✓ ${slug} (${size} bytes)`);
    } catch (err) {
      console.error(`✗ ${slug}:`, err.message);
    }
  }

  fs.writeFileSync(
    path.join(root, "src/data/stitch-manifest.json"),
    JSON.stringify(manifest, null, 2)
  );
  console.log(`\nDownloaded ${manifest.length} pages.`);
}

main();
