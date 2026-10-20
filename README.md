# Thali marketing site

Static, mobile-first marketing landing page for **Thali** — the all-in-one guest-experience platform for restaurants. Built with Vite, React, TypeScript, and Tailwind CSS. No backend; deploy to Netlify or Vercel over HTTPS.

## Quick start

```bash
npm install
cp .env.example .env   # fill in values (see below)
npm run dev            # http://localhost:5173
npm run build          # production build → dist/
npm run preview        # serve dist/ locally
```

## Environment variables

Copy `.env.example` to `.env` (never commit `.env`). Only `VITE_*` vars are exposed to the client.

| Variable | Required | Purpose |
|----------|----------|---------|
| `VITE_FORMSPREE_ID` | Yes (for demo form) | Formspree form ID for **Book a demo** submissions |
| `VITE_SITE_URL` | Yes (production) | Canonical URL, no trailing slash — used in meta tags, `sitemap.xml`, `robots.txt` |
| `VITE_GA_ID` | Optional | GA4 measurement ID (e.g. `G-XXXXXXXXXX`); loaded only in production after cookie consent |

Set the same variables in your host’s dashboard (Netlify **Site settings → Environment**, Vercel **Project → Settings → Environment Variables**).

## Deploy

### Netlify

1. Connect the repo or drag-and-drop `dist/` after `npm run build`.
2. Build settings (also in `netlify.toml`):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. Add env vars above.
4. HTTPS is enabled by default on Netlify.

SPA routing is handled by `public/_redirects` (copied to `dist/`) and `netlify.toml`.

### Vercel

1. Import the repo; Vercel detects Vite automatically.
2. **Build command:** `npm run build` · **Output:** `dist`
3. Add env vars above.
4. HTTPS is enabled by default.

SPA routing is handled by `vercel.json` (`rewrites` → `index.html`).

After deploy, confirm:

- `/`, `/demo`, `/privacy`, `/terms`, `/security` load and deep-link correctly
- Demo form submits when `VITE_FORMSPREE_ID` is set
- Cookie banner appears in production when `VITE_GA_ID` is set

## Customising the product name

The brand name is a **single token** in `src/config/site.ts`:

```ts
export const NAME = "Thali";
```

Change `NAME` there only. It flows into titles, nav, footer, legal copy, meta tags, and JSON-LD. Do not hardcode the name elsewhere.

Value proposition copy lives in the same file (`valueProposition`, `contact`, `social`).

## Swapping images

Place assets in `public/img/`. The site uses **AVIF → WebP → JPG** triplets via `OptimizedPicture` and `ImagePlaceholder` (`basePath` prop).

| Base path | Sizes (suggested) | Used for |
|-----------|-------------------|----------|
| `/img/hero-fallback` | 960×1200 (portrait) | Static hero on mobile, reduced-motion, low-end |
| `/img/dish-poster` | 600×900 | `<model-viewer>` poster while GLB loads |
| `/img/og` | 1200×630 | Open Graph / Twitter card (`/img/og.jpg` in SEO config) |

For each base path, add three files:

- `hero-fallback.avif`, `hero-fallback.webp`, `hero-fallback.jpg`
- etc.

**Optimisation tips:** export width-appropriate sizes, compress with [Squoosh](https://squoosh.app/) or `sharp`/ImageMagick CLI, lazy-load below-the-fold images (default). Product screenshots and food photography: pass `basePath` to `ImagePlaceholder` in section components.

See `public/img/README.md` for the full asset checklist.

## Swapping 3D dish models

### Guest experience (`<model-viewer>`)

- Replace `public/models/dish-placeholder.glb`
- Keep under ~100k triangles; Draco-compress
- Update poster at `/img/dish-poster.{webp,avif,jpg}`
- Path constant: `src/components/sections/DishModelViewer.tsx`

### Hero R3F scene

- Replace `public/models/dish-placeholder.glb` (same file, shared path in `src/three/HeroScene.tsx`)
- Falls back to procedural geometry if the GLB is missing

### Enabling AR later (not in v1)

AR is intentionally disabled. To enable later:

1. Uncomment the AR block in `DishModelViewer.tsx`
2. Add `ios-src="/models/dish-placeholder.usdz"` for iOS Quick Look
3. Add `ar` and `ar-modes="webxr scene-viewer quick-look"` to `<model-viewer>`

USDZ is **not** required for the current 3D-only preview.

## Demo video

Replace the placeholder in `DemoVideoModal.tsx` with a compressed MP4/WebM embed and an AVIF/WebP poster frame.

## Performance & accessibility

- Hero 3D (`HeroCanvas`) and dish preview (`DishPreview` + model-viewer) are **code-split** and load on demand
- R3F: `dpr={[1, 1.8]}`, `<Preload all />`, IntersectionObserver pauses off-screen rendering
- Static hero fallback when reduced-motion, small viewport, or low-end device
- Fonts load asynchronously; Lenis/GSAP init is deferred via `requestIdleCallback`
- Target: Lighthouse mobile Performance ≥ 90, Accessibility ≥ 95

## Project scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Vite dev server |
| `npm run build` | Typecheck, Vite build, SPA fallback, static SEO files |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |

## Remaining owner TODOs

See **`TODO.md`** for every placeholder metric, quote, asset, legal block, and config item still marked TODO in the codebase.
