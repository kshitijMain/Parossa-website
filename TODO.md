# Owner TODO checklist

Everything below is still placeholder content or missing assets. Search the codebase for `TODO` to find exact locations.

## Launch blockers

- [ ] **`VITE_FORMSPREE_ID`** — create a Formspree form at https://formspree.io and paste the ID in `.env` (see `DemoRequest.tsx`)
- [ ] **`VITE_SITE_URL`** — set your production URL (no trailing slash) for canonical tags, sitemap, robots
- [ ] **Contact info** — `src/config/site.ts`: email, phone, address, social URLs (currently `TODO: …`)
- [ ] **Legal pages** — review with counsel before publication:
  - [ ] `src/pages/Privacy.tsx` — all sections
  - [ ] `src/pages/Terms.tsx` — all sections
  - [ ] `src/pages/Security.tsx` — all sections
  - [ ] `src/components/layout/LegalPage.tsx` — last updated date
  - [ ] Cookie notice copy on Privacy (`#cookies`)

## Images (`public/img/`)

Add AVIF + WebP + JPG for each base path (see `README.md`):

- [ ] **`hero-fallback`** — static hero still (mobile / reduced-motion / low-end)
- [ ] **`dish-poster`** — model-viewer loading poster
- [ ] **`og`** — 1200×630 social share image (`/img/og.jpg` in SEO)
- [ ] **Product screenshots** — Guest experience feature rows (`GuestExperience.tsx` captions list four screenshots)
- [ ] **Analytics dashboard** — owner dashboard screenshot (`Analytics.tsx`)
- [ ] **Roadmap visual** — hyperlocal delivery mockup (`WhatsNext.tsx`)
- [ ] **Real food / restaurant photography** — replace generic placeholders site-wide

## 3D models (`public/models/`)

- [ ] **`dish-placeholder.glb`** — Draco-compressed, &lt;100k tris (hero R3F + guest `<model-viewer>`)
- [ ] **Per-dish GLBs** — swap in real menu dishes for production demos
- [ ] **`dish-placeholder.usdz`** — only if/when AR is enabled (see commented block in `DishModelViewer.tsx`)

## Brand & logo

- [ ] **`public/logo.svg`** — replace with final brand mark (wordmark comes from `NAME` in React)
- [ ] **`NAME` in `src/config/site.ts`** — change if product name differs from “Thali”

## Copy & content sections

- [ ] **Hero trust line** — `Hero.tsx`: “Built for live orders and payments”
- [ ] **Platform section** — `Home.tsx` `#platform` placeholder card (full section content)
- [ ] **Demo video** — `DemoVideoModal.tsx`: embed MP4/WebM + poster
- [ ] **Signature dish name** — `DishPreview.tsx` phone mockup label

## Metrics, quotes & social proof (all marked TODO)

- [ ] **Operations stats** — `OPERATIONS_STATS` in `Operations.tsx` ({X}%, {Y} min, {Z})
- [ ] **Mini charts** — `MiniCharts.tsx`: “live pilot data” labels
- [ ] **Analytics dish reviews** — `Analytics.tsx`: dish names, ratings, guest quotes
- [ ] **Logo strip** — `LogoStrip.tsx`: pilot restaurant / partner names
- [ ] **Testimonials** — `TrustConversion.tsx` (3 quotes + authors)
- [ ] **FAQ** — `TrustConversion.tsx` (5 questions + answers)
- [ ] **Pricing tiers** — `TrustConversion.tsx`: Starter / Growth / Enterprise names, prices, features
- [ ] **Security reliability blurb** — `TrustConversion.tsx` SSL/uptime copy
- [ ] **Default testimonial / stat defaults** — `Testimonial.tsx`, `StatCallout.tsx`
- [ ] **Styleguide samples** — `Styleguide.tsx` demo stat/testimonial placeholders

## SEO & analytics

- [ ] **`VITE_GA_ID`** — GA4 measurement ID (optional; consent-gated in production)
- [ ] **JSON-LD pricing** — `src/config/seo.ts`: “Replace with accurate pricing / contact for quote”
- [ ] **OG image** — confirm `/img/og.jpg` exists after deploy

## Optional / post-launch

- [ ] Enable AR on `<model-viewer>` (USDZ + commented attributes in `DishModelViewer.tsx`)
- [ ] Replace Styleguide route or remove from production nav if not needed
- [ ] Fill real pilot numbers everywhere `TODO:` appears in user-visible copy

## Verify before go-live

- [ ] Run `npm run build` && `npm run preview` — test all routes and `#demo` form
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95
- [ ] **Book a demo** is the most prominent CTA on every viewport (nav, sticky mobile bar, section CTAs)
- [ ] All images have meaningful `alt` text
- [ ] Formspree test submission received
