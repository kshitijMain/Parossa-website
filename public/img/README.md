# Images

Add compressed **AVIF + WebP + JPG** triplets for each base path below. The React components use `<picture>` with AVIF → WebP → JPG fallbacks (`OptimizedPicture`, `ImagePlaceholder` with `basePath`).

## Naming convention

For base path `/img/hero-fallback`, add:

```
public/img/hero-fallback.avif
public/img/hero-fallback.webp
public/img/hero-fallback.jpg
```

Constants live in `src/config/images.ts`.

## Social & SEO

| Base path | Suggested size | Notes |
|-----------|----------------|-------|
| `og` | 1200×630 | Open Graph / Twitter card. Referenced as `/img/og.jpg` in meta + JSON-LD |

## Hero

| Base path | Suggested size | Notes |
|-----------|----------------|-------|
| `hero-fallback` | 960×1200 (portrait) | Static hero for small phones, low-end devices, `prefers-reduced-motion`. Match the live 3D table/dish moment |

## Dish preview

| Base path | Suggested size | Notes |
|-----------|----------------|-------|
| `dish-poster` | ~600×900 | Poster for `<model-viewer>` while GLB loads. WebP used directly as `poster` attribute; keep JPG as fallback in triplet |

## Product & marketing

- Real food and restaurant photography (not generic stock)
- Product screenshots for guest experience, analytics dashboard, roadmap visual
- Demo video poster frame (AVIF/WebP)
- Meaningful `alt` text for every image
- Width-appropriate exports; lazy-load below-the-fold (default)

## Optimisation

Use [Squoosh](https://squoosh.app/), `sharp`, or similar. Target small file sizes for mobile Lighthouse ≥ 90.
