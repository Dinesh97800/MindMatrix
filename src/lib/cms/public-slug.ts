export function publicSlugFromPathname(pathname: string | null | undefined): string | null {
  if (!pathname) return null;
  const clean = pathname.split("?")[0].split("#")[0];
  if (clean === "/" || clean === "") return "home";
  const trimmed = clean.replace(/^\/+|\/+$/g, "");
  if (!trimmed || trimmed.startsWith("admin") || trimmed.startsWith("api")) return null;
  return trimmed;
}
