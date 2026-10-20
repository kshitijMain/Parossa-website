# 3D models

TODO: Add Draco-compressed GLB models (web/Android) and USDZ (iOS Quick Look).

## Dish preview + hero

- `dish-placeholder.glb` — shared placeholder for:
  - Hero R3F scene (`src/three/HeroScene.tsx`)
  - Guest-experience `<model-viewer>` (`src/components/sections/DishModelViewer.tsx`)
- Keep under ~100k triangles; Draco-compress.
- Until this file exists, the hero uses a memoised primitive dish fallback; model-viewer shows its poster / loading state.
- TODO: Swap in real per-dish GLBs for the product menu (same optimisation rules).
- TODO(AR): USDZ (`dish-placeholder.usdz`) only needed when AR is enabled later — not required for v1 3D preview.

## General

- Prefer Draco compression.
- Load via `useGLTF` with `Suspense` in R3F scenes.
- Defer `@google/model-viewer` until the AR section is near the viewport.
