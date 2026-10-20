import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Writes robots.txt, sitemap.xml, and site.webmanifest into dist/
 * using NAME from site.ts and VITE_SITE_URL from the build environment.
 */
const root = process.cwd();
const dist = join(root, "dist");

if (!existsSync(dist)) {
  console.error("generate-static-seo: dist/ not found — run vite build first.");
  process.exit(1);
}

const siteTs = readFileSync(join(root, "src/config/site.ts"), "utf8");
const nameMatch = siteTs.match(/export const NAME = "([^"]+)"/);
const NAME = nameMatch?.[1] ?? "App";
const descMatch = siteTs.match(
  /export const DESCRIPTOR =\s*\n?\s*"([^"]+)"/,
);
const DESCRIPTOR =
  descMatch?.[1] ??
  "The all-in-one guest-experience platform for restaurants.";

const siteUrl = (process.env.VITE_SITE_URL ?? "https://example.com").replace(
  /\/$/,
  "",
);

const publicRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/demo", priority: "0.9", changefreq: "monthly" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
  { path: "/security", priority: "0.4", changefreq: "yearly" },
];

const lastmod = new Date().toISOString().slice(0, 10);

writeFileSync(
  join(dist, "robots.txt"),
  `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`,
);

const urlEntries = publicRoutes
  .map(
    ({ path, priority, changefreq }) => `  <url>
    <loc>${siteUrl}${path === "/" ? "" : path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("\n");

writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`,
);

writeFileSync(
  join(dist, "site.webmanifest"),
  JSON.stringify(
    {
      name: NAME,
      short_name: NAME,
      description: DESCRIPTOR,
      start_url: "/",
      display: "standalone",
      background_color: "#FBF7F1",
      theme_color: "#1B2A6B",
      icons: [
        {
          src: "/favicon.svg",
          sizes: "any",
          type: "image/svg+xml",
          purpose: "any",
        },
        {
          src: "/logo.svg",
          sizes: "512x512",
          type: "image/svg+xml",
          purpose: "maskable",
        },
      ],
    },
    null,
    2,
  ),
);

console.log(`generate-static-seo: wrote robots.txt, sitemap.xml, site.webmanifest (${siteUrl})`);
