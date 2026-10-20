import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Copy index.html → 404.html for GitHub Pages and other hosts that use 404.html
 * as the SPA entry on unknown paths.
 */
const dist = join(process.cwd(), "dist");
const index = join(dist, "index.html");
const notFound = join(dist, "404.html");

if (!existsSync(index)) {
  console.error("spa-fallback: dist/index.html not found — run vite build first.");
  process.exit(1);
}

copyFileSync(index, notFound);
console.log("spa-fallback: copied dist/index.html → dist/404.html");
