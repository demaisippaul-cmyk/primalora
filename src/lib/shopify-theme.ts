import { zipSync, strToU8 } from "fflate";
import themeFiles from "./shopify-theme.json";

/** The four site photographs, packed as the theme's own assets for snippets/photo.liquid. */
export const THEME_PHOTOS: Record<string, string> = {
  "assets/primalora-model.webp": "/generated-assets/aaeb8e1363e2859a4ace5c4fbecfae488dcfdf39dca9d26760ebaa9663158b77.webp",
  "assets/primalora-noir.webp": "/generated-assets/90ec59a7f8a7bb2845a5b1ac31b835f224ea6f023eeb1da761eb58e9a851703f.webp",
  "assets/primalora-cluster.webp": "/generated-assets/8bd64f6fb50ba71030d23b9d50bd56e53defbe22c041d1365d3eb99b222e693e.webp",
  "assets/primalora-pearl.webp": "/generated-assets/ba99222b817e3568030ff5cbe707afe7f1a3eeb9c82915c35bb6aadab2d286bb.webp",
};

export const THEME_TEXT_FILES = themeFiles as Record<string, string>;

/** Builds the Shopify theme ZIP: text files at the archive root plus the given photo binaries. */
export function buildThemeZip(photos: Record<string, Uint8Array>): Uint8Array {
  const entries: Record<string, Uint8Array> = {};
  for (const [path, text] of Object.entries(THEME_TEXT_FILES)) entries[path] = strToU8(text);
  for (const path of Object.keys(THEME_PHOTOS)) {
    const bytes = photos[path];
    if (!bytes || bytes.length === 0) throw new Error(`Missing photo ${path}`);
    entries[path] = bytes;
  }
  return zipSync(entries, { level: 6, mtime: new Date("2026-01-01T00:00:00Z") });
}
