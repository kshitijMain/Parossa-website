# Parossa website: update plan for the AI developer

**Audience:** Claude (or any AI coding agent) working in the `parossa-website` repository.
**Goal:** turn the existing "Thali" marketing site into the **Parossa** site, make every product claim match the Business Requirements Document (BRD), and finish every TODO that doesn't need the owner's input.
**Companion files** (put all three in `docs/` before starting):

| File | What it is |
|---|---|
| `docs/BRD.md` | The BRD (`Restaurant_Platform_BRD_v1.0.md`, renamed). **The source of truth for every product claim.** |
| `docs/WEBSITE_UPDATE_PLAN.md` | This file. |
| `docs/IMAGE_PROMPTS.md` | The ChatGPT prompts the owner uses to generate photos. Filenames there must match the image manifest here (§6). |

---

## Kick-off prompt (owner: paste this into Claude)

> Read `docs/WEBSITE_UPDATE_PLAN.md` and `docs/BRD.md` in full before changing anything. Then carry out the plan phase by phase, starting with Phase 0. After each phase: run the checks listed for that phase, commit with the message given, and give me a short summary (what changed, anything you had to decide). The photos are in `assets-src/images/`. Ask me only if the plan conflicts with the code in a way the plan doesn't cover. Never invent customers, testimonials, metrics or features.

---

## 1. Ground rules (apply to every phase)

1. **The BRD is the source of truth.** If this plan and the BRD disagree, follow the BRD and tell the owner. If the existing site claims something the BRD doesn't have, remove or rewrite it.
2. **Claim only what Parossa will do.**
   - Prefer BRD **M** (Must) features.
   - BRD **S** (Should) features may appear **only** where §3 below explicitly allows them, worded as §3 says.
   - **C** (Could / future) features and anything out of scope **never** appear.
3. **No fabricated social proof.** Never write invented testimonials, quotes, customer names, partner logos, customer counts, ratings presented as real, or performance statistics ("40 % fewer errors", "2× table turns", uptime %). Sample data **inside product mockups** is fine **only** when it is visibly labelled "Sample data" or "Illustrative".
4. **No competitor references.** The owner took structural inspiration from Petpooja and similar sites. Don't name, link to or compare with any competitor, and don't copy their wording, images, icons or distinctive layouts.
5. **No visible TODOs.** After this work, no visitor-facing string may contain "TODO". There should be **zero `TODO` strings anywhere in `src/`**. Track owner-only work in `TODO.md`, and mark dummy values with a `SAMPLE` comment (P3.1).
6. **One name token.** The product name lives only in `NAME` in `src/config/site.ts` and is used everywhere through that token. The only hard-coded "Parossa" strings allowed are in `package.json`, docs, the SVG logo's accessible title and generated static files.
7. **Keep the stack and quality bars**:
   - Vite + React 19 + TypeScript (strict) + Tailwind 3, GSAP + Lenis, react-router, Formspree;
   - mobile-first; respect `prefers-reduced-motion` everywhere;
   - WCAG 2.2 AA;
   - Lighthouse mobile Performance ≥ 90, Accessibility / Best Practices / SEO ≥ 95.
8. **Brand tokens stay** (`tailwind.config.js`):
   - saffron gradient `#F5A623 → #E8821E` is the dominant colour;
   - indigo `#1B2A6B` for trust, text and dark sections;
   - teal `#1DB47A` **only** for buttons, links and success/"ready" states;
   - cream `#FBF7F1` background, ink `#1A2348` text;
   - fonts: Clash Display (headings) + Inter (body).

   Watch gold-on-cream contrast: use `#E8821E` or put gold on indigo.
9. **Spelling and voice.**
   - Indian/British English (colour, favourite, digitise), ₹ with Indian digit grouping (₹1,00,000).
   - Plain, confident, warm. Short sentences. Lead with the owner's outcome, then the feature.
10. **Work in phases.** After each phase run `npm run lint`, `npm run build` (includes `tsc -b`) and `npx prettier --check .`; fix anything they report; then commit. Work on a branch named `parossa-brd-update`.

---

## 2. What changes, at a glance

| Area | Today ("Thali") | After (Parossa) |
|---|---|---|
| Name | Thali | **Parossa** |
| Hero | Live 3D dish scene (three.js) | Photo + floating coded UI cards; no three.js |
| Signature feature | "Rotate the dish in 3D", AR later | **Removed** (not in BRD) |
| Payments | "Self-order & pay", payments in headline, payments FAQ, payment security | **No payment processing.** Staff record payment mode (cash/card/UPI/other) on the bill |
| Guest orders | Straight to kitchen | **Waiter confirms every tablet and QR order** |
| Tablet buttons | Water, bill, cutlery, waiter, take order | **Water, Waiter, Bill, Cancel** |
| Recommendations | "Repeat-guest personalisation", "allergen-safe", "margin-led" | Rules you set → pairings learned from your orders → bestsellers; table-level only |
| Reviews | Per-dish review base | **Food and service ratings + comment** after the bill; feedback trend report |
| Roadmap | Hyperlocal delivery marketplace | **Section removed** |
| Social proof | Placeholder testimonials, pilot logos, pilot metrics | **Hidden behind a switch**, pilot metrics removed; new "Founding restaurants" invite |
| Pricing | Starter / Growth (multi-outlet) / Enterprise tiers | **One complete system**, priced on a demo |
| Product screenshots | Placeholder boxes | **Coded UI mockups** (tablet, QR phone, KDS, waiter app, pager, bill, dashboard, audit log) + AI photos |
| Analytics | Retained | **Retained and expanded** to the BRD report list |
| Legal pages | Placeholders | **Full drafts from the BRD** (owner arranges legal review) |
| Contact, social, legal entity, logo | TODO placeholders | **Sample/dummy values** marked `SAMPLE`, interim original logo |
| "Watch the 2-min demo" | Opens empty video modal | **"See how it works"**: scrolls to the flow; opens the video modal once a video is configured |

---

## 3. Product truth sheet (use this for all copy)

Distilled from the BRD. BRD requirement IDs are in brackets so you can check details.

### 3.1 What Parossa is

A **locally hosted restaurant operations platform** for dine-in restaurants in India (dine-in and takeaway). The main software runs on the restaurant's own Windows PC. **Everything inside the restaurant keeps working without internet**: ordering, kitchen display, pagers, billing, reports. The cloud is used only for QR orders, licensing, updates and backups (BRD §1.2, NFR-A01).

It has eight connected parts:

| Part | One-line description for the site | Key facts (BRD) |
|---|---|---|
| **POS & billing** (Windows) | GST-ready bills, split bills, payment modes and day-end in one place | GST invoice with GSTIN, FSSAI number, SAC, CGST/SGST split, consecutive invoice numbers per financial year (BILL-001 to 003); split by items or equally (BILL-007); record Cash/Card/UPI/Other, split across modes (BILL-008); reprints marked DUPLICATE (BILL-009); edits after print need manager PIN (BILL-010); shift close, cash count, Z-report (BILL-013); service charge off by default, voluntary and removable (BILL-006); takeaway with token numbers (TBL-008) |
| **Kitchen display (KDS)** | Each station sees its own tickets the moment an order is confirmed | Browser-based, runs on Android tablet/TV (KDS-001); station routing (KDS-002); timers green/amber/red (KDS-004); mark Preparing / Ready (KDS-005); "Notify manager" when food waits too long (KDS-006); screen, print or both per station (KDS-008); moved/modified/cancelled badges, no duplicate tickets (KDS-003, TBL-005) |
| **Waiter app** (Android) | Take orders, confirm guest orders, see every request for your tables | My tables, approvals inbox, service-request inbox, move table, alerts hard to miss (WTR-002 to 008); never silently loses an order when offline (WTR-012) |
| **Table tablet** (Android, kiosk) | Guests browse, order and call for water, a waiter or the bill | Home screen buttons **Water, Waiter, Bill, Cancel** (TAB-004); orders wait for waiter confirmation, then show live status Received → Preparing → Ready → Served (TAB-009); recommendations with reasons (TAB-011); search by name, synonyms and tags (TAB-006); resets after the bill (TAB-003) |
| **QR menu** | The live menu on the guest's phone, no app to install | Per-table QR (QR-001); synced with menu and stock (QR-003); dine-in only, no payment (QR-005); statuses "Sending your order to the restaurant…", "Received, waiting for waiter confirmation", "Your order has been sent to the kitchen"; "Please call a waiter" if the restaurant can't be reached (QR-007); read-only when the restaurant is offline (QR-008) |
| **Wrist pager** | Buzzes the right waiter the moment food is ready or a table needs them | Short texts like "T7 READY", "T4 WATER", "T5 NEW ORDER", "MGR: COME TO COUNTER" (PGR-006); one-button acknowledge (PGR-006); alerts not acknowledged within 60 s go **directly to the manager** (NTF-005) |
| **Smart suggestions** | Pairings and bestsellers that lift every order | Layer 1: rules the restaurant sets ("with Butter Chicken suggest Garlic Naan"). Layer 2: "frequently ordered together", learned nightly from the restaurant's own orders. Layer 3: bestsellers by time of day. Filters: out of stock, already ordered, veg-only, course order. **Table-level only: no personal profiles** (REC-001 to 007) |
| **Reports & audit** | Every sale, discount and cancellation, with who did it and when | Report list in P5.7; exports to PDF, Excel, CSV (RPT-017); audit details on reports (RPT-015); append-only, tamper-evident audit log; bills can't be deleted (AUD-001 to 004); daily suspicious-activity report (AUD-006) |

### 3.2 Facts the site should use

- **Customer orders need a waiter's confirmation.** Every tablet and QR order is confirmed by staff before the kitchen sees it: one tap in the waiter app, on the POS, or with the waiter's PIN on the table tablet itself (ORD-003, ORD-004).
- **Service requests behave like a flight-cabin call button.** Water/Waiter/Bill stays lit on the tablet and re-alerts the waiter until acknowledged. Cancel clears it, pressed by the waiter on arrival or by the guest if no longer needed. If no one acknowledges within 60 s, it goes to the manager (TAB-004, NTF-005).
- **Works without internet** (NFR-A01). Only QR ordering pauses (menu becomes view-only).
- **Data stays on the restaurant's PC**, on the drive they choose (ONB-002). Hourly local backups plus a nightly encrypted cloud backup stored in India (DATA-002, DATA-003). The restaurant owns its data and can **export everything at any time**, even if the subscription lapses (DATA-010, LIC-005).
- **Updates** install overnight in a maintenance window (default 03:00-06:00) or when a manager approves, with a backup before every update and automatic rollback (UPD-004, UPD-005).
- **No hidden remote access.** Support only through a session the restaurant starts (UPD-009).
- **Device pairing.** Every tablet, phone, kitchen screen and pager is paired by scanning a QR code; unpaired devices can't connect (AUTH-007). Staff log in by name + PIN (AUTH-001).
- **Onboarding target:** a restaurant with up to about 150 menu items and 40 tables can be live within one business day (ONB-009). Menu import from an Excel template (ONB-005).
- **Subscription fairness.** If a payment is missed: reminders → 7-day grace period → restricted mode, which starts only at the next business day (never mid-service). In restricted mode the restaurant can finish and bill open tables and export all data. Nothing is ever deleted (LIC-005).
- **Hardware.** A Windows 11 PC; 80 mm thermal printers (network recommended); Android tablets for tables; Android phones for waiters; an Android tablet or TV per kitchen station; wrist pagers; a router with separate staff and guest Wi-Fi. A supported-hardware list is provided. Devices are restaurant-owned; no BYOD (BRD §11, A-10).
- **Language:** English.

### 3.3 Should-have features the site may mention, and how

| Feature (BRD ID) | Allowed wording |
|---|---|
| Voice search (TAB-007) | "Voice search on supported tablets" |
| Digital bill by WhatsApp/SMS (BILL-012) | "Print the bill or send it to the guest's phone" (only in billing bullets; don't headline it) |
| Guest feedback (TAB-014, RPT-013) | "After the bill, guests can rate the food and the service and leave a comment" |
| AI-assisted menu import (ONB-006) | "We'll help you digitise a printed menu" (don't say "AI") |
| Hold and fire (ORD-016) | Don't mention |
| Merge tables (TBL-006) | Don't mention; "move table" (M) is fine |

### 3.4 Never claim

- Payment processing or "pay at the table": no gateway, UPI or card integration (out of scope).
- 3D or AR menus.
- Delivery or a delivery marketplace.
- Multi-outlet or chain management, central menus, a cloud or remote owner dashboard.
- Loyalty programmes, personalised or repeat-guest recommendations, "allergen-safe" (allergens are tags only), "margin-led AI".
- Zomato/Swiggy/aggregator, Tally/accounting or third-party POS integrations.
- Inventory, recipes or reservations.
- Languages other than English; iOS apps.
- Certifications (ISO, PCI, SOC 2), uptime percentages, "bank-grade", "unhackable".
- Any statistic or customer count.
- "Paperless" (bills are printed, and digital bills are only a Should).
- Cutlery button, "reorder past favourites" across visits.

---

## 4. Existing TODOs and what happens to each

This answers "complete every TODO that doesn't need the owner". **Owner** = left for the owner and listed in the new `TODO.md` (Phase 8, step 4).

| Existing TODO (location) | Action | Done by |
|---|---|---|
| Rename product (`site.ts` `NAME`, `package.json`, README, `.cursorrules`, analytics consent key) | Rename to Parossa (Phase 1) | AI |
| Contact email/phone/address, social URLs (`site.ts`) | Sample values marked `SAMPLE` (P3.1); real values later | AI → owner later |
| `VITE_FORMSPREE_ID` | Keep env var; friendly fallback when missing (P5.13) | Owner (ID) |
| `VITE_SITE_URL` | Sample in `.env.example` | Owner (domain) |
| `VITE_GA_ID` | Keep consent-gated GA; leave empty | Owner (optional) |
| Legal pages: Privacy, Terms, Security, cookie notice, "Last updated" | Full drafts from the BRD (Phase 6) | AI; owner arranges legal review |
| Hero trust line (`Hero.tsx`) | New copy (P5.2) | AI |
| Platform placeholder section (`Home.tsx`) | Build the section (P5.3) | AI |
| Demo video (`DemoVideoModal.tsx`) | Button becomes "See how it works"; modal kept, wired to a config switch (P5.2, P5.14) | AI; owner adds video later |
| Signature dish name, dish poster, GLB models, USDZ, AR block | **Deleted** with the 3D feature (Phase 2) | AI |
| Operations stats `OPERATIONS_STATS` (pilot metrics) | **Removed** | AI |
| Mini charts "TODO: live pilot data" | Relabel "Sample data" | AI |
| Analytics dish reviews | Replace with BRD-style feedback cards labelled "Sample feedback" (P5.7) | AI |
| Logo strip, testimonials | Hidden behind switches; data arrays emptied; "Founding restaurants" section added (P5.10) | AI; owner adds real ones later |
| FAQ (5 placeholders) | Write 12 answers from the BRD (P5.12) | AI |
| Pricing tiers | Replace with a single "complete system" card (P5.11) | AI |
| Security reliability blurb | Rewrite from the BRD (P5.8) | AI |
| Default props in `Testimonial.tsx`, `StatCallout.tsx`; Styleguide samples | Remove TODO defaults (props required); update Styleguide samples | AI |
| JSON-LD pricing (`seo.ts`) | Remove the `offers` block (no public price) (Phase 7) | AI |
| OG image `/img/og.jpg` | Generated by script from photo + text, or brand gradient if no photo yet (Phase 7) | AI |
| Images: hero-fallback, product screenshots, analytics dashboard, roadmap visual, food photography | Product screenshots → coded mockups (Phase 4); roadmap visual → deleted; photos → owner generates from `IMAGE_PROMPTS.md`, AI processes and places them (Phase 10) | AI + owner |
| `public/logo.svg`, favicon | Interim original Parossa mark (Phase 3) | AI; owner may replace |
| Styleguide route in production | Dev-only route, `noindex` (Phase 7) | AI |
| `sitemap.xml` / `.env.example` comments | Clean up | AI |
| "Verify before go-live" checklist | Run in Phase 9; Lighthouse after deploy is owner-side | AI + owner |

---

## 5. Phases

### Phase 0: Preparation

1. `git checkout -b parossa-brd-update`.
2. Read `docs/BRD.md` (at least §1-6, §7.4, §8, §12) and this plan in full.
3. `npm ci`, then `npm run build` to record the baseline. If the baseline build fails, fix only what's needed to build and note it.
4. **Normalise formatting.** Ten files currently have a blank line after every line of code (Navbar, MobileStickyCta, CookieConsent, DemoVideoModal, DishModelViewer, Hero, WhatsNext, FaqAccordion, ImagePlaceholder, SmoothScrollProvider). Run `npx prettier --write .` and confirm the blank lines collapse. If Prettier doesn't remove them, collapse runs of blank lines inside these files manually.
5. Commit: `chore: normalise formatting before Parossa update`.

### Phase 1: Rename to Parossa and project hygiene

1. `src/config/site.ts`: `export const NAME = "Parossa";`
2. `package.json` and `package-lock.json`: `"name": "parossa"` (run `npm install` to refresh the lock if needed).
3. `src/lib/analytics.ts`: `CONSENT_KEY = "parossa-analytics-consent"`; remove the TODO comment.
4. Search the repo case-insensitively for `thali` and replace every remaining occurrence in README, `TODO.md`, `.cursorrules` and comments. These docs are rewritten fully in Phase 8, but no "Thali" may remain.
5. **Checks:** `grep -rni thali . --exclude-dir=node_modules --exclude-dir=.git` returns nothing; build passes.
6. Commit: `chore: rename product to Parossa`.

### Phase 2: Remove 3D/AR and the delivery roadmap

**Delete:**
- `src/three/` (HeroCanvas, HeroScene)
- `src/components/sections/DishPreview.tsx`, `DishModelViewer.tsx`
- `src/hooks/useHeroCapability.ts`
- `src/lib/checkStaticAsset.ts` (only used by 3D; confirm with a search first)
- `src/types/model-viewer.d.ts`
- `public/models/` (whole folder)
- `src/components/sections/WhatsNext.tsx`, plus its import and lazy section in `Home.tsx`

**Edit:**
- `package.json`: remove `@google/model-viewer`, `@react-three/drei`, `@react-three/fiber`, `three`, `@types/three`; run `npm install`.
- `vite.config.ts`: remove the `three` and `model-viewer` `manualChunks` branches.
- `src/styles/index.css`: remove the `model-viewer.dish-model-viewer` rules.
- `src/components/sections/index.ts`: remove the deleted exports.
- `src/components/ErrorBoundary.tsx`: replace the `public/models/` hint with a generic message ("Something didn't load. Refresh the page to try again.").
- `scripts/debug-blank.mjs`: remove the `model-viewer` count. If the script has no other use, delete it.
- `netlify.toml`, `public/_redirects`, `vercel.json`: remove the `/models` rules (keep `/img` and `/assets`).
- `src/config/images.ts`: remove `dishPoster` (the file is replaced in Phase 3 anyway).
- `GuestExperience.tsx`: remove the `DishPreview` block (the section is rebuilt in Phase 5).
- `Hero.tsx`: remove `HeroCanvas`, the `useHeroCapability` branch and `ErrorBoundary` usage. The hero becomes a static image for now; it's rebuilt in Phase 5.

**Checks:**
- `grep -rnE "three|drei|model-viewer|useGLTF|\.glb|usdz|HeroCanvas|DishPreview|WhatsNext" src scripts vite.config.ts` returns nothing.
- `grep -rniE "\b3D\b|augmented reality|\bAR\b" src` returns nothing.
- Build passes. The production JS bundle should shrink substantially; record before/after sizes in the commit message.

Commit: `feat: remove 3D/AR dish preview and delivery roadmap (not in BRD)`.

### Phase 3: Configuration foundations

#### P3.1 `src/config/site.ts`

```ts
export const NAME = "Parossa";

/** One-line product descriptor for footer, meta and manifest. */
export const DESCRIPTOR =
  "The connected restaurant operations platform: POS, kitchen display, table tablets, QR menu and wrist pagers.";

export const valueProposition = {
  eyebrow: "Restaurant operations platform",
  headline: "Serve faster. Miss nothing.",
  subhead: `${NAME} connects table tablets, QR menus, the kitchen display, waiters' wrist pagers and GST-ready billing in one system, and it keeps running even when the internet doesn't.`,
  alternates: {
    headlines: [
      "From the table to the kitchen to the bill: one connected system.",
      "Every order, every table, every rupee, accounted for.",
    ],
  },
} as const;

/** SAMPLE DATA: replace before launch (see TODO.md → "Replace sample data"). */
export const company = {
  legalName: "Parossa Technologies Private Limited", // SAMPLE
  jurisdictionCity: "New Delhi", // SAMPLE: courts for Terms
} as const;

/** SAMPLE DATA: replace before launch. `.example` addresses never deliver to a real inbox. */
export const contact = {
  email: "hello@parossa.example", // SAMPLE
  phone: "+91 98765 43210", // SAMPLE
  address: "2nd Floor, Sample Business Park, New Delhi 110001", // SAMPLE
  supportHours: "Mon-Sun, 10:00-23:00 IST", // SAMPLE
  securityEmail: "security@parossa.example", // SAMPLE
  grievanceOfficer: {
    name: "Grievance Officer (sample name)", // SAMPLE
    email: "grievance@parossa.example", // SAMPLE
  },
} as const;

/** SAMPLE DATA: replace with real profile URLs before launch. */
export const social = {
  linkedin: "https://www.linkedin.com/", // SAMPLE
  instagram: "https://www.instagram.com/", // SAMPLE
  x: "https://x.com/", // SAMPLE
} as const;

/** Date shown on legal pages. Set to the date you finish Phase 6. */
export const LEGAL_LAST_UPDATED = "20 October 2026";
```

Then remove every `.replace(/^TODO:\s*/, "")` hack from `seo.ts`, `Footer.tsx`, `LegalPage.tsx` and `TrustConversion.tsx`. Use one helper, e.g. `src/lib/contact.ts` exporting `mailtoHref()` and `telHref()`, everywhere. Rename the footer's "Twitter" label to "X".

#### P3.2 `src/config/features.ts` (new)

```ts
/** Switches for content that needs real-world input before it can be shown. */
export const FEATURES = {
  /** Turn on only with real, permissioned customer quotes. */
  showTestimonials: false,
  /** Turn on only with real logos the customer allowed you to use. */
  showCustomerLogos: false,
  /** Internal component gallery; never in production. */
  showStyleguide: import.meta.env.DEV,
} as const;

/**
 * Product demo video. While `src` is empty, the hero's secondary button
 * scrolls to #how-it-works; once set, it opens DemoVideoModal and plays the video.
 */
export const DEMO_VIDEO = {
  src: "", // e.g. "/video/parossa-demo.mp4" (owner adds later)
  webmSrc: "", // optional
  poster: "", // e.g. "/img/demo-poster.webp"
  title: "See how Parossa works",
} as const;
```

#### P3.3 `src/config/sampleData.ts` (new)

All product mockups read from this one file so names, prices and numbers stay consistent. Mark the file header `SAMPLE DATA: illustrative only; shown with "Sample data" labels`. Contents:

- `restaurantName: "Parossa Demo Kitchen"`
- Staff (first names only): waiters `Ravi, Asha, Imran, Neha, Karan`; manager `Rohit`; cashier `Meera`.
- Table assignments (keep every mockup consistent with these): Ravi → T5, T7, T12 · Asha → T2, T4 · Neha → T9 · Imran and Karan → other tables.
- Menu items. Keys must match the image filenames in §6:

  | key | name | ₹ | type | tags |
  |---|---|---|---|---|
  | `paneer-tikka` | Paneer Tikka | 320 | veg | starter, bestseller, spicy 1 |
  | `seekh-kebab` | Chicken Seekh Kebab | 380 | non-veg | starter, spicy 2 |
  | `butter-chicken` | Butter Chicken | 420 | non-veg | main, bestseller |
  | `dal-makhani` | Dal Makhani | 290 | veg | main |
  | `garlic-naan` | Garlic Naan | 90 | veg | bread, repeatable |
  | `veg-biryani` | Veg Dum Biryani | 340 | veg | main |
  | `mango-lassi` | Mango Lassi | 150 | veg | beverage, repeatable |
  | `gulab-jamun` | Gulab Jamun (2 pcs) | 140 | veg | dessert |

- Dashboard sample: today's sales ₹48,250; orders 126; covers 214; average spend per cover ₹225; table turnover 2.6. Orders by waiter: Ravi 31, Asha 38, Imran 27, Neha 42, Karan 29. Average prep time trend over 7 days: 18, 17, 17, 16, 15, 15, 14 min. Sales by source: Waiter app 44 %, Table tablet 33 %, QR menu 15 %, POS 8 %.
- Bill sample:
  - invoice `PDK/26-27/000123`, Table 7, waiter Ravi, cashier Meera;
  - Paneer Tikka 1 × 320; Butter Chicken 1 × 420; Garlic Naan 3 × 90 = 270; Mango Lassi 2 × 150 = 300;
  - subtotal ₹1,310.00; CGST 2.5 % ₹32.75; SGST 2.5 % ₹32.75; round-off −₹0.50; **total ₹1,375.00**; payment UPI ₹1,375.00;
  - GSTIN `22AAAAA0000A1Z5` (format example); FSSAI `10000000000000`; SAC `996331`.

  **Compute totals in code from the line items and assert they equal the values above in a unit test or a dev-time check.**
- KDS tickets, waiter-app items, audit entries and feedback samples: as specified with each mockup in Phase 4.

#### P3.4 `src/config/navigation.ts`

```ts
export const NAV_LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Guests", href: "#guest-experience" },
  { label: "Team", href: "#operations" },
  { label: "Reports", href: "#analytics" },
  { label: "Pricing", href: "#pricing" },
] as const;
```

Footer "Product" column: the nav links plus `Control & security` (#trust), `Onboarding` (#onboarding) and `FAQ` (#faq). Footer "Company" column: `Founding restaurants` (#founding), `Book a demo`, `Contact` (#demo), `Security overview` (/security).

#### P3.5 Image manifest: `src/config/images.json` (new, single source of truth)

A JSON file read by both the React components (via `resolveJsonModule`) and the Node image script (Phase 10). One entry per image in §6, with `name`, `aspect`, `widths`, `alt` and `crop` (sharp position, e.g. `"attention"`, `"centre"`, `"north"`). Replace `src/config/images.ts` with a typed wrapper around this JSON.

#### P3.6 Interim logo and favicon

Replace `public/logo.svg` and `public/favicon.svg` with an **original, simple mark** for Parossa:
- **Concept:** a rounded-square tile in the saffron gradient containing a bold indigo geometric "P" whose bowl doubles as a serving plate/cloche, with a small cream steam curl or highlight. Keep it abstract and simple; don't imitate any existing logo.
- Readable at 16 px; two colours plus cream; an SVG `<title>Parossa</title>`; no text inside the icon.
- The favicon is the same mark on an indigo rounded square.
- Keep a comment: `<!-- Interim mark: replace with final brand logo (TODO.md) -->`. Comments inside SVGs in `public/` are allowed; don't use the word "TODO" there.

Commit: `feat: Parossa config, sample data, feature switches, interim logo`.

### Phase 4: Shared components and product mockups

#### P4.1 Image components

- **`OptimizedPicture`**: add responsive `srcset` support from the manifest's `widths`. Files are named `/img/<name>-<width>.<ext>` (Phase 10). Use `sizes` from props, the largest JPG as `src`, and keep the AVIF → WebP → JPG order. Add a `priority` prop for the hero (eager loading + `fetchpriority="high"`).
- **Missing-image fallback**: if the file fails to load, render a calm brand gradient with a small food/camera icon and **no text** in production. In development (`import.meta.env.DEV`) overlay the expected filename and "see docs/IMAGE_PROMPTS.md".
- **`ImagePlaceholder`**: remove the TODO default caption. Captions are optional, real, user-facing text only. Consider renaming the component to `MediaFrame` and updating imports.
- **`MediaComposite`** (new): a rounded photo with a device mockup overlapping one corner (e.g., a photo of diners with the tablet mockup overlapping its bottom-right). Props: `image` (manifest name), `mockup` (ReactNode), `align` (`left` | `right`). On small screens the mockup sits below the photo and overlaps it by about 15 %. No horizontal overflow at 360 px.

#### P4.2 Device frames: `src/components/mockups/DeviceFrame.tsx`

Pure CSS/HTML frames (no images): `tablet` (landscape, 4:3), `phone` (9:19.5), `display` (wall screen, 16:9, dark bezel), `watch` (rounded rectangle with strap stubs), `receipt` (thermal paper with zig-zag bottom edge).
- Each screen is designed at a fixed internal size and **scales with its container** (CSS container queries + `cqw` units, or a transform scale driven by `ResizeObserver`), so text stays proportional on every viewport.
- Each mockup is wrapped in `<figure role="img" aria-label="…">` with a one-sentence description. The inner UI is `aria-hidden="true"`, so screen readers aren't flooded.
- Mockups that show numbers or names carry a small pill **"Sample data"**. All mockups take an optional `caption`.

#### P4.3 Screens (`src/components/mockups/`)

Content must match the BRD exactly. Use dish thumbnails from the manifest; while images are missing, show the gradient fallback. Use the brand tokens; KDS and pager use a dark indigo/near-black theme with teal for "ready".

1. **`TabletOrderingScreen`** (variants: `menu`, `service`, `status`, `search`)
   - **Header:** "Parossa Demo Kitchen" · "Table 7" · veg-only toggle.
   - **`menu` variant:**
     - category chips: Starters, Mains, Breads, Desserts, Beverages;
     - 4 item cards (photo, name, ₹ price, veg/non-veg dot, "Bestseller" badge where tagged);
     - a recommendation strip: **"Goes well with Butter Chicken: Garlic Naan ₹90 [+ Add]"**;
     - cart bar: "2 items · ₹740 · Send to waiter" (Paneer Tikka + Butter Chicken; compute from `sampleData`).
   - **Persistent bottom row:** four large buttons **Water · Waiter · Bill · Cancel**.
   - **`service` variant:** the Water button is active, showing "Requested · 0:42" with a soft pulse (static under reduced motion), and a banner "Ravi has been notified".
   - **`status` variant:** order list with live chips: Paneer Tikka **Ready**, Butter Chicken **Preparing**, Garlic Naan ×3 **Received**, Mango Lassi ×2 **Served**. Header note "Confirmed by your waiter".
   - **`search` variant:** search field with "something spicy" typed, mic icon, results: Paneer Tikka (🌶), Chicken Seekh Kebab (🌶🌶). Small caption: "Voice search on supported tablets". Use an SVG icon for chilli level, not an emoji, if emoji rendering differs across platforms.
2. **`QrPhoneScreen`** (variants: `menu`, `status`)
   - **`menu`:** top "Parossa Demo Kitchen · Table 12", item list with photos and an "Add" button, and a spice-level and add-ons sheet open for Paneer Tikka showing Spice: Mild / **Medium** / Hot and Add-on: Extra mint chutney +₹20.
   - **`status`:** a vertical stepper:
     - ✓ "Sending your order to the restaurant…";
     - ✓ "Received, waiting for waiter confirmation";
     - ● "Your order has been sent to the kitchen" (teal);
     - a muted note below: "If the restaurant can't be reached, you'll see 'Please call a waiter'".
3. **`KdsScreen`** (display frame, dark). Station header "Tandoor · 3 open tickets". Three ticket cards:
   - **KOT #42 · T7 · Ravi · Tablet · 06:12** (green): "1 × Paneer Tikka (Medium spice)", "3 × Garlic Naan"; buttons **Preparing** / **Ready**.
   - **KOT #43 · T4 · Asha · Waiter app · 12:40** (amber), badge **"Moved from T2"**: "2 × Chicken Seekh Kebab".
   - **KOT #44 · T9 · Neha · QR · 21:05** (red): "4 × Garlic Naan", state **"Ready, not collected 3:10"** with a **"Notify manager"** button.

   Timers show text, not colour alone.
4. **`WaiterAppScreen`** (phone frame):
   - title "My tables · Ravi";
   - top banner (teal) **"T7 READY: pick up at the pass"**;
   - section **"Approvals (2)"**: "T5 · Table tablet · 3 items · ₹860 [Edit] [Approve]", "T12 · QR menu · 2 items · ₹470 [Edit] [Approve]";
   - section **"Requests"**: "T7 · Water · 0:42 [Acknowledge]", "T5 · Bill · 1:15 [Acknowledge]".
   - Approval totals are computed from `sampleData`: T5 = Dal Makhani + Butter Chicken + Mango Lassi (₹860); T12 = Paneer Tikka + Mango Lassi (₹470).
5. **`PagerFace`** (watch frame, dark): large text **"T7 READY"**, small subtitle "Press to acknowledge", a saffron LED dot, and vibration arcs on either side (animated subtly; static under reduced motion). Prop `message` so it can also show "T4 WATER", "T5 NEW ORDER", "MGR: COME TO COUNTER".
6. **`BillReceipt`** (receipt frame): the bill sample from P3.3, laid out like an 80 mm thermal GST invoice:
   - restaurant name; address line "Sample address"; GSTIN; FSSAI;
   - "TAX INVOICE"; invoice number, date and time, table, waiter;
   - item lines; subtotal; CGST and SGST; round-off; total;
   - "Paid: UPI ₹1,375.00"; footer "Thank you! Service charge is not included."

   "Sample data" pill outside the paper.
7. **`DashboardScreen`** (laptop/monitor frame, light):
   - KPI tiles (today's sales, orders, covers, average spend per cover, table turnover);
   - **reuse `OrdersByWaiterChart`** (labels = waiter names) and **`PrepTimeTrendChart`** from `MiniCharts.tsx`;
   - a "Sales by source" horizontal stacked bar;
   - export buttons **PDF · Excel · CSV**;
   - prominent "Sample data" pill.

   Remove "TODO: live pilot data" from MiniCharts and replace it with "Sample data". Pass data in as props from `sampleData.ts` (no hard-coded `BAR_LABELS = A-E`).
8. **`AuditTrail`** (card list, light). Four entries:
   - "21:42 · Discount 15 % on Bill PDK/26-27/000118: requested by Meera (Cashier), approved by Rohit (Manager), reason: regular guest";
   - "21:47 · Bill reprinted (DUPLICATE): Meera";
   - "21:58 · Item voided after preparation: 1 × Butter Chicken, Ravi → approved by Rohit, reason: guest changed order";
   - "22:05 · Flagged: KOT #37 items not on any settled bill" (amber "Flagged" pill).

   "Sample data" pill.

Every mockup must look right at 360 px, 768 px and 1280 px wide.

Commit: `feat: coded product mockups and image components`.
### Phase 5: Rebuild the home page

Split `TrustConversion.tsx` into focused section components (below) and delete it once empty. Every section is lazy-loaded like today (`LazySection` in `Home.tsx`), has a stable `id`, uses `Section` / `Eyebrow` / `Heading` / `Lead` / `Reveal`, and ends with a `SectionNextStep`, as now. Copy below is the **approved draft**: you may tighten wording, but keep the meaning and don't add claims. `{NAME}` means the `NAME` token.

#### P5.1 Page order (`src/pages/Home.tsx`)

| # | Section id | Component | Purpose |
|---|---|---|---|
| 1 | `top` | `Hero` | Outcome + product glimpse |
| 2 | `platform` | `Platform` (new) | The eight connected parts |
| 3 | `how-it-works` | `HowItWorks` (new; wraps updated `OperationsFlow`) | Order journey |
| 4 | `guest-experience` | `GuestExperience` (rewritten) | Tablet, suggestions, search, QR |
| 5 | `operations` | `Operations` (rewritten) | KDS, waiter app + pager, POS & billing |
| 6 | `analytics` | `Analytics` (retained, expanded) | Reports, feedback |
| 7 | `trust` | `ControlSecurity` (new) | Audit, anti-theft, data, updates |
| 8 | `onboarding` | `Onboarding` (new) | Live in a day |
| 9 | `founding` | `FoundingRestaurants` (new) + hidden `Testimonials` / `CustomerLogos` | Honest social proof |
| 10 | `pricing` | `Pricing` (new) | One complete system |
| 11 | `faq` | `Faq` (new) | 12 answers |
| 12 | `demo` | `DemoRequest` (updated, with contact card) | Conversion |

Remove the old final indigo "Ready to run…" band (the demo form directly follows) and the old `PlaceholderSection` helper.

#### P5.2 Hero (`Hero.tsx`)

- **Copy** from `valueProposition` (P3.1).
  - Primary button **Book a demo** → `#demo`.
  - Secondary button **See how it works**: if `DEMO_VIDEO.src` is set, open `DemoVideoModal`; otherwise smooth-scroll to `#how-it-works`.
- **Trust chips** (replace the TODO trust line), small, with icons: **Works without internet** · **GST-ready bills** · **Full audit trail**.
- **Visual:** the `hero-table` photo (manifest), `priority` loading, in a rounded frame on mobile and full-bleed column on desktop (keep the current grid). Overlay **three floating cards** built in HTML/CSS (not images), staggered with a gentle `Reveal` (none under reduced motion):
  1. Pager card: watch icon, **"T7 READY"**, sub "Ravi's pager".
  2. Order card: teal tick, **"Order sent to kitchen"**, sub "T5 · 3 items · confirmed by Ravi".
  3. Request card: water-drop icon, **"Water requested · T4"**, sub "0:42".

  Show only card 1 below `sm`. Cards must not cover faces in the photo; position them so the photo stays legible.
- **LCP:** the hero photo is the LCP element. Add a `<link rel="preload" as="image">` for the AVIF variant in `index.html`, or via the page-meta hook, using `imagesrcset`/`imagesizes`.

#### P5.3 Platform (`Platform.tsx`, id `platform`)

- Eyebrow **Platform** · Heading **One system for the whole floor**
- Lead: "Eight parts that talk to each other, so an order placed at table 7 reaches the right kitchen station, the right waiter and the right bill without anyone shouting across the pass."
- **Grid of 8 cards** (icon + title + one line), 1 column on mobile, 2 on `sm`, 4 on `lg`, using the eight lines in §3.1 in this order: POS & billing, Kitchen display, Waiter app, Table tablet, QR menu, Wrist pager, Smart suggestions, Reports & audit. Icons: `lucide-react` (add the dependency) or hand-drawn inline SVGs with a consistent 1.75 stroke.
- **"Local-first" band** below the grid (indigo background, cream text, gold accent):
  - heading **"Runs on your restaurant's own PC"**;
  - text "Your data stays with you, on the drive you choose. Ordering, the kitchen, pagers and billing keep working even when the internet drops; only QR ordering from guests' phones waits for the connection to return."
- Next step: "See an order travel from table to bill" → `#how-it-works`.

#### P5.4 How it works (`HowItWorks.tsx`, id `how-it-works`)

- Eyebrow **How it works** · Heading **From the table to the bill, in seven steps**
- Lead: "Every order follows the same path, and everyone sees it move."
- **`OperationsFlow`**: keep the GSAP scroll animation and reduced-motion behaviour. Change `FLOW_STEPS` to:
  `"Guest orders"`, `"Waiter confirms"`, `"KOT to station"`, `"Chef marks ready"`, `"Pager buzzes"`, `"Served"`, `"GST bill"`.
  Remove the asterisk logic and the "*Print on request" footnote. Update the SVG `aria-label` and `<title>` to "Order flow from guest order to GST bill". On mobile, keep the horizontal scroll but add a visible "Swipe" hint, or switch to a vertical stepper below `sm` (preferred).
- **Four cards** under the flow:
  1. **Confirmed in one tap.** "Tablet and QR orders wait for the waiter: one tap in the app, or their PIN on the table tablet."
  2. **Missed? Escalated.** "If an alert isn't acknowledged within 60 seconds, it goes straight to the manager."
  3. **Moves without the mess.** "Move a table and its kitchen tickets update in place, with a clear 'Moved from T4' note. No duplicate tickets."
  4. **Cancellations stand out.** "The kitchen sees cancelled and changed items clearly, on screen and on a printed slip."
- Next step: "See what your guests see" → `#guest-experience`.

#### P5.5 Guest experience (`GuestExperience.tsx`, id `guest-experience`)

- Eyebrow **Guest experience** · Heading **Guests order the moment they're ready**
- Lead: "Tablets and QR menus take the waiting out of ordering, and every order is still confirmed by your waiter, so nothing reaches the kitchen by mistake."
- Four alternating feature rows (keep the existing `FeatureRow` layout: media one side, copy the other, `reverse` alternating). Replace `ImagePlaceholder` media with the media listed:

| Row | Label · Title | Caption | Bullets | Media |
|---|---|---|---|---|
| 1 | **Table tablet** · *Water, waiter, bill: one tap away* | "Four big buttons on every table. A request goes straight to the right waiter's wrist and stays lit, like a flight-cabin call button, until the waiter arrives and clears it." | "Water, Waiter, Bill and Cancel on the home screen" · "Re-alerts until acknowledged, then escalates to the manager" · "Live status for every item: Received, Preparing, Ready, Served" · "Resets for the next guests when the bill is settled" | `MediaComposite` with photo `guest-tablet` + `TabletOrderingScreen variant="service"` |
| 2 | **Smart suggestions** · *Bigger bills, without a hard sell* | "Suggestions come from rules you set, from what your guests actually order together and from your bestsellers, filtered for veg-only tables and what's in stock." | "Your rules come first: 'with Butter Chicken, suggest Garlic Naan'" · "Learns pairings from your own orders, every night" · "Bestsellers by time of day when the order is empty" · "Follows the meal: starters, mains, breads, desserts" | `TabletOrderingScreen variant="menu"` (no photo) |
| 3 | **Search** · *Any dish, found in seconds* | "Guests search by dish, ingredient or craving ('paneer', 'something spicy') and small spelling mistakes are forgiven." | "Search by name, ingredient and tags" · "Veg, Jain, spicy and bestseller filters" · "Voice search on supported tablets" | `TabletOrderingScreen variant="search"` |
| 4 | **QR menu** · *The full menu on their phone, no app needed* | "Every table gets its own QR code. Guests browse photos and prices, choose spice levels and add-ons, and send the order; your waiter confirms it with a tap." | "Always in sync with your menu, prices and stock" · "Guests see 'Sent to the kitchen', or 'Please call a waiter' if the restaurant can't be reached" · "Dine-in only: every order confirmed by your staff" | `MediaComposite` with photo `guest-qr` + `QrPhoneScreen variant="status"` |

- Next step: "Ready to see the full guest journey on your floor?" → Book a demo.

#### P5.6 Operations (`Operations.tsx`, id `operations`)

- Eyebrow **Your team** · Heading **From order to served, without the shouting**
- Lead: "Your kitchen, floor and counter see the same order at the same moment, and the right person is told when something needs them."
- **Delete `OPERATIONS_STATS`, the dashed "pilot metrics" box and the `StatCallout` import.**
- Three alternating feature rows (same `FeatureRow` pattern):

| Row | Label · Title | Bullets | Media |
|---|---|---|---|
| 1 | **Kitchen display** · *Every station sees only its own tickets* | "Tickets split by station; combos broken into their items" · "Timers turn amber, then red, as tickets wait" · "Moved tables and cancellations shown clearly; no duplicate tickets" · "Food waiting at the pass? One tap notifies the manager" · "Screen, printer or both, for each station" | `MediaComposite` photo `kitchen-display` + `KdsScreen` |
| 2 | **Waiter app & wrist pager** · *The right waiter, buzzed at the right moment* | "The pager shows 'T7 READY', 'T4 WATER' or 'T5 NEW ORDER'" · "One press acknowledges; unanswered alerts go to the manager" · "Confirm guest orders, send KOTs and move tables from the app" · "Managers can nudge a waiter directly" | `MediaComposite` photo `waiter-pager` + a pair: `PagerFace` and `WaiterAppScreen` |
| 3 | **POS & billing** · *Bills that add up, and stand up to your CA* | "GST invoice with GSTIN, FSSAI number and CGST/SGST split" · "Consecutive invoice numbers for each financial year" · "Split bills; record cash, card, UPI or a mix" · "Print the bill or send it to the guest's phone" · "Shift close and day-end with cash count" | `MediaComposite` photo `cashier-billing` + `BillReceipt` |

- **Four support cards** (replace `SUPPORT_CARDS`):
  1. **Works without internet.** "Ordering, the kitchen, pagers and billing run on your own PC."
  2. **Takeaway too.** "Token numbers, kitchen tickets and bills from the same counter."
  3. **Your stations, your printers.** "Send items to tandoor, Chinese, bar or desserts: on screen, on paper or both."
  4. **Manager in the loop.** "Missed alerts, food waiting at the pass and late tickets reach the manager automatically."
- Next step: "See how this flow runs on your floor" → Book a demo.

#### P5.7 Analytics & reports (`Analytics.tsx`, id `analytics`): retain and expand

- Eyebrow **Analytics & reports** · Heading **Decisions, backed by data.** (keep)
- Lead: "Know what sells, when you're slammed, who's fast and where money leaks, from reports that come with names and timestamps attached."
- **Dashboard visual:** replace the screenshot placeholder with `DashboardScreen` (left, 3/5 width on `lg`). Keep `OrdersByWaiterChart` and `PrepTimeTrendChart` on the right (2/5), fed from `sampleData.ts`, each labelled **"Sample data"**. Optional: a small `owner-reports` photo card under the charts on `lg`.
- **"Reports you get"** chips (replace `METRIC_CHIPS`; BRD §6.15):
  - Sales by day & hour · Item & category sales · Waiter performance · Orders by source (tablet, QR, waiter, POS) · Payment modes & day-end;
  - GST summary & invoice register · Discounts & complimentary items · Cancellations & voids · Kitchen prep times · Table turnover & covers;
  - Suggestion performance · Guest feedback · Suspicious activity.
- **Three short points** under the chips:
  - "**Names on every number.** Who created, confirmed, changed, cancelled and billed each order."
  - "**Export and share.** Any report to PDF, Excel or CSV, stamped with its filters, who generated it and when. Not at the restaurant? Your manager can export it and send it to you."
  - "**Open on any paired device.** On the restaurant PC, or a manager's phone on your staff Wi-Fi."
- **Guest feedback block** (replaces "Per-dish reviews"; BRD TAB-014, RPT-013):
  - label **Guest feedback** · heading **Feedback, straight from the table**;
  - body: "After the bill, guests can rate the food and the service and leave a comment on the table tablet. Ratings roll up into a trend report, so a slipping service day shows up in your numbers first."
  - Two cards from `sampleData.ts`, each with a "Sample feedback" pill and rating shown as text + stars (stars `aria-hidden`):
    - "Food 5/5 · Service 4/5: 'Dal makhani was perfect. Naan took a little while.' (Table 7 · Friday dinner)";
    - "Food 4/5 · Service 5/5: 'Quick service even on a packed night.' (Table 2 · Saturday lunch)".
  - Remove "Via digital bill feedback" and every "per-dish" mention.
- Next step: "See where money and minutes go on your floor" → `#trust` (cta "Control & security").

#### P5.8 Control & security (`ControlSecurity.tsx`, id `trust`)

- Eyebrow **Control & security** · Heading **Nothing slips. Nothing disappears.**
- Lead: "Every order, discount, cancellation and bill is tied to a person and a device, and bills can't be quietly deleted."
- Layout: `AuditTrail` mockup on one side; six cards on the other (2 × 3):
  1. **Bills can't be deleted.** "Cancelled invoices stay in the series. Edits after printing need a manager's PIN and a reason."
  2. **Manager PIN for the sensitive stuff.** "Big discounts, complimentary items and voids need a manager's approval. Reprints are marked DUPLICATE and logged."
  3. **A daily suspicious-activity report.** "Voids after printing, repeated reprints, cash differences and items cooked but never billed: flagged every morning."
  4. **Your data, on your PC.** "Backed up every hour on site and every night to encrypted cloud storage in India. Export everything, any time."
  5. **Updates that never interrupt service.** "Installed overnight or when your manager says so, with a backup first and automatic rollback."
  6. **No hidden remote access.** "Our support team connects only when you start a session. Every device is paired by your manager."
- Link: **Read the security overview →** `/security`.
- Next step: "Want to see the audit trail on a live demo?" → Book a demo.

#### P5.9 Onboarding (`Onboarding.tsx`, id `onboarding`)

- Eyebrow **Onboarding** · Heading **Live in a day, with your own menu**
- Lead: "Our team sets {NAME} up with you. A typical restaurant, with up to around 150 dishes and 40 tables, can be taking orders the same day."
- **Five numbered steps** (reuse the gold numbered-circle style from the old DishPreview `FlowStep`; recreate it in this component):
  1. **Install** on your restaurant PC: one installer, data on the drive you choose.
  2. **Bring your menu**: our Excel template handles variants, add-ons and combos, and we'll help digitise a printed menu.
  3. **Set up tables and stations**: sections, tables, kitchen stations and printers.
  4. **Pair your devices**: scan a QR code on each tablet, phone, kitchen screen and pager.
  5. **Run a test order** end to end, then open your doors.
- Media: `onboarding-setup` photo.
- Note (small): "Hardware: we share a supported list of PCs, tablets, phones, printers, routers and pagers, and help you choose."
- Next step: "Plan your go-live date on a demo" → Book a demo.

#### P5.10 Founding restaurants and hidden social proof (id `founding`)

- **`FoundingRestaurants.tsx`**: a full-width band with the `restaurant-interior` photo as background, under an indigo overlay of ≥ 80 % opacity so cream text passes AA.
  - Eyebrow **Founding restaurants** · Heading **Be one of the first restaurants on {NAME}**
  - Body: "We're onboarding a small group of founding restaurants. You get hands-on setup from our team, a direct line to the people building {NAME}, and a real say in what we build next."
  - Bullets: "Hands-on onboarding and staff training" · "Priority support from the product team" · "Early access to new features"
  - Button **Apply as a founding restaurant** → `#demo`. It also pre-fills the form message with "I'd like to join the founding restaurants programme." (pass via state or a query param; don't break normal use).
  - **No discount or price promises.**
- **`Testimonials.tsx`** and **`CustomerLogos.tsx`**: keep the existing `Testimonial` and `LogoStrip` UI, but:
  - render **nothing** unless `FEATURES.showTestimonials` / `FEATURES.showCustomerLogos` is `true` **and** the data array is non-empty;
  - data lives in `src/config/socialProof.ts` with empty, typed arrays and a comment explaining that only real, permissioned content goes there;
  - remove all TODO defaults from `Testimonial.tsx`, `LogoStrip.tsx` and `StatCallout.tsx` (make props required);
  - place them inside the founding section, after the band, so they appear there once enabled.

#### P5.11 Pricing (`Pricing.tsx`, id `pricing`)

- Eyebrow **Pricing** · Heading **One complete system. One clear quote.**
- Lead: "Every restaurant's floor is different, so we price {NAME} on your setup: tables, kitchen stations and devices. You'll get a clear quote on your demo."
- **One "Everything included" card** (no tiers) listing: POS & billing · Kitchen display · Waiter app · Table tablets · QR menu · Wrist pagers · Smart suggestions · Reports & audit trail · Onboarding & menu set-up · Automatic updates & backups · Support from our team.
- Buttons: **Book a demo** (primary) and **Request pricing** (secondary; both → `#demo`).
- Small note: "Hardware is bought separately from our supported list. We'll help you pick what fits."
- Delete `TODO_TIERS`.

#### P5.12 FAQ (`Faq.tsx`, id `faq`)

Reuse `FaqAccordion`. Heading **Questions owners ask before they switch**. Use these 12 items (answers are BRD-accurate; keep them as written or tighten):

1. **How long does setup take?** Most restaurants with up to around 150 dishes and 40 tables can be live within a business day. We install {NAME} on your PC, import your menu from our Excel template (or help digitise a printed one), set up tables and kitchen stations, pair your devices and run a test order with you.
2. **What hardware do we need?** A Windows 11 PC for the counter (it also runs the system), 80 mm thermal printers (network printers recommended), Android tablets for tables, Android phones for waiters, an Android tablet or TV for each kitchen station, wrist pagers, and a router with separate staff and guest Wi-Fi. We share a supported list so you buy once.
3. **What happens if the internet goes down?** Service carries on. Ordering, the kitchen display, pagers, billing and reports all run on your restaurant's PC. Only QR ordering from guests' phones pauses (the menu stays viewable), and backups and updates catch up when you're back online.
4. **Do guests' orders go straight to the kitchen?** No. Every tablet and QR order is confirmed by a waiter first, with one tap in the waiter app or their PIN on the table tablet. If nobody picks it up within 60 seconds, the manager is alerted.
5. **How do payments work?** Guests pay the way they do today: cash, card or UPI. The cashier records the payment mode on the bill, including split payments. {NAME} doesn't process or store card or UPI payments.
6. **Are the bills GST-compliant?** Bills carry your GSTIN, FSSAI number, SAC code and the CGST/SGST split, with consecutive invoice numbers for each financial year. Tax rates are set as your CA advises, and you get a GST summary and an invoice register for filing.
7. **Can staff delete or change bills?** Not without a trace. Bills can't be deleted. Edits after printing, voids and large discounts need a manager's PIN and a reason, and a daily report flags anything unusual.
8. **Who owns our data, and where is it kept?** You do. It's stored on your restaurant's PC, backed up every hour on site and every night to encrypted cloud storage in India. You can export everything (sales, bills, reports) at any time.
9. **How do updates work?** Updates install automatically overnight (by default between 3 and 6 am) or when your manager approves, with a backup first and automatic rollback if anything goes wrong. They never interrupt a service.
10. **What if a subscription payment is missed?** You'll get reminders, then a 7-day grace period. After that the system moves to a restricted mode at the start of the next business day, never mid-service: you can still finish and bill open tables and export all your data. Nothing is ever deleted.
11. **Does {NAME} replace our current billing software?** Yes. {NAME} includes the POS and billing, so the counter, kitchen, tablets, QR menu and pagers all work from one system.
12. **Which languages does {NAME} support?** English today.

Next step: "Still have a question? Ask us on your demo." → Book a demo.

#### P5.13 Demo request and contact (`DemoRequest.tsx`, id `demo`)

- Keep the Formspree logic, honeypot, validation pattern and success state.
- **Fields:** name, restaurant, city, role, phone, email, **number of tables** (replaces outlets; integer ≥ 1), **current billing software** (optional text, hint "e.g., none, Excel, another POS"), message (optional).
  - Update `FormValues`, `validate`, the payload and `_subject` (`"{NAME} demo request: <restaurant>"`).
- **Not configured** (`VITE_FORMSPREE_ID` empty):
  - In **dev**, keep a dashed notice explaining the env var.
  - In **production**, never show it. On submit, show "Online booking isn't available right now. Email us at {email} or call {phone}" with working `mailto:` (subject and body prefilled from the form) and `tel:` links.
- **Copy:**
  - heading "See {NAME} on your floor";
  - lead "Tell us about your restaurant. We'll walk you through the full journey (table, kitchen, pager and bill) and send a quote for your setup."
  - Success steps: "We'll reach out within one business day" · "A live walkthrough tailored to your floor" · "Setup, hardware and go-live questions answered before you commit".
- **Contact card** beside the form on `lg` (below on mobile). Label "Talk to a human"; shows address, email, phone and support hours from `contact` (sample values). This replaces the old Contact block in `TrustConversion`.
- `src/pages/Demo.tsx` keeps using `DemoRequest embedded={false}`.

#### P5.14 Demo video modal (`DemoVideoModal.tsx`)

Keep the component and focus trap. If `DEMO_VIDEO.src` is set, render a `<video controls playsInline preload="none" poster=…>` with MP4 (+ WebM) sources and a captions `<track>` slot. If not set, the modal is never opened (the hero button scrolls instead). Remove both TODO texts; the title comes from `DEMO_VIDEO.title`.

#### P5.15 Navbar, footer, sticky CTA, 404

- **Navbar:** new `NAV_LINKS`; the logo `alt=""` stays (the wordmark text follows). On `lg`, check that six links + CTA fit without wrapping at 1024 px; if not, drop "How it works" from the desktop nav (it stays in the footer).
- **Footer:**
  - descriptor from `DESCRIPTOR`;
  - columns per P3.4;
  - contact from `contact` (sample);
  - social links LinkedIn, Instagram, X (sample URLs; `rel="noreferrer noopener"`);
  - bottom row: © year {NAME}, Privacy, Terms, Security, Cookies, Book a demo.
- **Mobile sticky CTA:** unchanged (Book a demo; hides when `#demo` is in view).
- **404:** keep; check copy mentions {NAME} correctly.

**Phase 5 checks:**
- `grep -rniE "self-order & pay|pay when|payment partner|paperless|cutlery|per-dish|personalis|allergen-safe|margin|multi-outlet|delivery|marketplace|pilot" src` returns nothing, except allowed phrases ("doesn't process … payments", "record the payment mode").
- `grep -rn "TODO" src` returns nothing.
- Every section renders at 360 / 768 / 1024 / 1440 px without horizontal scroll.
- With `prefers-reduced-motion`, nothing animates.

Commit in two or three commits, e.g. `feat: rebuild hero, platform and how-it-works`, `feat: rebuild guest, team, reports and control sections`, `feat: founding restaurants, pricing, FAQ and demo form`.
### Phase 6: Legal pages (drafted from the BRD)

The owner will have a lawyer review these before launch (it's in `TODO.md`), but they must read as complete, professional pages now.

**General:**
- `LegalPage.tsx`: remove the dashed "review with counsel" banner. Show `"{NAME} · Last updated: {LEGAL_LAST_UPDATED}"`.
- Use `company`, `contact` and `NAME` tokens; never hard-code the name or contact details.
- Add an on-page table of contents for long pages (anchor links).
- Plain English, short paragraphs and bullet lists; no TODO text; no promises the BRD doesn't support.
- Keep the cookie notice section on Privacy (`id="cookies"`). Add a **"Change cookie choice"** button that clears the stored consent and reopens the banner; expose a small function from `analytics.ts` / `CookieConsent` for this.

#### P6.1 Privacy Policy (`Privacy.tsx`)

Sections, in this order:

1. **Who we are.** `{company.legalName}` ("{NAME}", "we"), contact email and address, and the Grievance Officer's name and email (from `contact.grievanceOfficer`).
2. **What this policy covers.** (a) This website; (b) how the {NAME} platform handles data on behalf of restaurants that use it.
3. **Information we collect on this website.**
   - Demo-request form: name, restaurant, city, role, phone, email, number of tables, current billing software, message.
   - Technical data our hosting provider logs (IP address, browser, pages requested) for security and reliability.
   - Analytics cookies **only if you accept them** (Google Analytics 4, IP anonymised).
   - No advertising cookies.
4. **How we use it.** To respond to your request, arrange and run a demo, send a quote and follow up about it; to keep the site secure; to understand site usage (only with consent); to meet legal obligations. Under the DPDP Act, we rely on your consent (given by submitting the form or accepting analytics cookies) and on legitimate uses permitted by law.
5. **Who we share it with.** Service providers acting for us: form handling (Formspree), website hosting (our hosting provider), and analytics (Google, only with consent). We don't sell personal data. Some providers may process data outside India; we use them under contractual safeguards.
6. **How long we keep it.**
   - Demo enquiries: up to 24 months after our last contact, unless you become a customer (then the customer agreement applies).
   - Analytics data: per our analytics retention setting (14 months).
7. **How the {NAME} platform handles data** (for restaurants and their guests):
   - **Roles.** The restaurant is the *data fiduciary* for its guests' and staff's personal data. {NAME} acts as its *data processor* for data we handle on its behalf (the QR-ordering relay, cloud backups and diagnostics).
   - **Where it lives.** Operational data is stored on the restaurant's own PC. Our cloud components (QR relay, backups) store data in India.
   - **Guests.** Ordering on a table tablet or QR menu needs no name or login. Guests may optionally give a phone number, with consent, to receive a digital bill or a feedback follow-up. Feedback (food and service ratings, comment) is optional.
   - **Staff.** Names, roles, a PIN stored only as a salted, peppered hash, and an activity log (who did what, when) for accountability.
   - **Retention:**
     - QR orders are deleted from our cloud relay 7 days after they reach the restaurant.
     - Diagnostics bundles are deleted after 30 days.
     - Cloud backups: 30 daily and 12 monthly copies, deleted within 30 days after a contract ends (after notice and an export offer).
     - Guest phone numbers are kept until consent is withdrawn, or for 24 months without a visit.
     - Feedback is anonymised after 24 months.
     - Bills are kept as long as tax law requires.
   - **Guests' requests.** Guests should contact the restaurant first; we help the restaurant respond.
8. **How we protect data.** A short summary with a link to the Security page.
9. **Your rights** under the Digital Personal Data Protection Act, 2023 and its Rules: access a summary of your data; correction, completion and updating; erasure; grievance redressal; nominating someone to act for you; withdrawing consent at any time (as easily as you gave it). How to exercise them: email the Grievance Officer. We respond within the timelines set by law. If you're not satisfied, you may complain to the Data Protection Board of India after using our grievance process.
10. **Children.** The site and service are for businesses and aren't directed at children; we don't knowingly collect children's data through this site.
11. **Cookies and analytics** (`#cookies`):
    - essential storage (your cookie choice, saved in your browser);
    - optional Google Analytics cookies, only after you accept;
    - how to change your choice (the button).
12. **Changes to this policy.** Updated date shown at the top. Material changes are highlighted on this page.

#### P6.2 Terms of Service (`Terms.tsx`)

1. **About these terms.** They cover use of this website and summarise how the {NAME} service works. A restaurant's subscription is governed by its signed order form / subscription agreement, which prevails if anything differs.
2. **The service.**
   - **Included:** POS and billing, kitchen display, waiter app, table tablet app, QR menu, wrist-pager software, suggestions, reports and audit trail, onboarding, updates, backups, support.
   - **Not included unless agreed in writing:** payment processing; delivery; integrations with other software; hardware (bought separately from the supported list).
3. **Accounts, devices and network.** The restaurant is responsible for:
   - staff accounts and PINs;
   - pairing only its own devices;
   - keeping the restaurant PC, a UPS and a separate staff Wi-Fi network as described in the supported-hardware guide.
4. **Restaurant responsibilities.**
   - Menu content, prices and allergen information.
   - Tax configuration as advised by its CA, and compliance with GST, FSSAI and consumer-protection rules (including that service charge is voluntary).
   - Giving guests any privacy notice and collecting any consent the law requires.
5. **Acceptable use.** No reverse-engineering, tampering with licensing, circumventing security, unlawful use, or use that harms other customers or the service.
6. **Fees, taxes and missed payments.** Fees are as per the order form, with GST extra.
   - **If a payment is missed:** reminders; then a 7-day grace period; then restricted mode starting at the next business day, never mid-service.
   - **In restricted mode** open tables can be finished and billed, reports viewed and all data exported. No data is deleted.
   - Paying restores full service promptly.
7. **Your data.** The restaurant owns its data. We process it only to provide the service, as set out in the Privacy Policy and the data-processing terms. The restaurant can export its data at any time. After termination we delete cloud backups within 30 days, after notice.
8. **Updates and support.**
   - Updates install automatically in a maintenance window (03:00-06:00 by default) or when a manager approves.
   - Support hours come from `contact.supportHours`.
   - We access a restaurant's system only through a session the restaurant starts.
9. **Intellectual property.** {NAME} keeps all rights in the software. The restaurant gets a non-exclusive, non-transferable right to use it during the subscription. Suggestions you send us may be used to improve the product.
10. **Warranties and disclaimers.** We provide the service with reasonable skill and care. We can't guarantee uninterrupted operation, because power, internet, hardware and the restaurant's network are outside our control.
11. **Limitation of liability.** To the extent the law allows: no liability for indirect or consequential loss (including lost profits); total liability capped at the fees paid in the 12 months before the claim.
12. **Indemnity.**
    - The restaurant covers claims arising from its menu, pricing, tax settings or guest-facing compliance.
    - We cover claims that the software, used as permitted, infringes someone's intellectual property.
13. **Term and termination.** As per the order form. Either party may end the contract for material breach that isn't fixed within 30 days of notice.
14. **Governing law.** Laws of India; courts at `{company.jurisdictionCity}`.
15. **Changes and contact.**

#### P6.3 Security overview (`Security.tsx`)

Write it for a restaurant owner, describing how {NAME} **is designed** to work. No certifications, uptime numbers or test results that don't exist yet.

1. **Overview: local-first.** The system runs on the restaurant's own PC; the cloud is used only for QR orders, licensing, updates and backups.
2. **Where your data lives.** On the restaurant PC (on the drive you choose); cloud components in India.
3. **Who can get in.**
   - Every tablet, phone, kitchen screen and pager must be paired by your manager.
   - Staff log in with their name and PIN; 5 wrong PINs in 10 minutes locks that login.
   - PINs are stored only as salted, peppered hashes.
   - Role-based permissions; manager PIN for sensitive actions.
   - Sessions end after inactivity.
4. **Audit trail.**
   - An append-only, tamper-evident log of every sensitive action.
   - Bills can't be deleted.
   - A daily suspicious-activity report.
5. **Encryption.**
   - HTTPS/TLS for all cloud traffic.
   - Encrypted connections inside the restaurant network, including the pagers.
   - Backups encrypted (AES-256).
   - We recommend BitLocker on the restaurant PC.
6. **Network design.** System devices use a staff network separate from guest Wi-Fi. Nothing on the internet can connect into your restaurant system; it only makes outbound connections.
7. **Backups and recovery.** Hourly local backups; nightly encrypted cloud backups in India; restore onto a new PC if the old one fails.
8. **Safe updates.** Signed updates; installed in a maintenance window; backup first; automatic rollback.
9. **Cloud isolation.** Each restaurant's cloud data is isolated with row-level security and per-restaurant credentials.
10. **Support access.**
    - No standing access to your system; we connect only through a session you start.
    - Diagnostic logs are shared only with your manager's permission.
    - Our own staff use multi-factor authentication.
11. **Payments.** {NAME} doesn't process or store card or UPI payment data. Guests pay on your existing terminals and the cashier records the payment mode.
12. **How we build.**
    - Development follows the OWASP Application Security Verification Standard (Level 2) and the OWASP Mobile Application Security standard.
    - Every change is code-reviewed and automatically scanned.
    - An independent penetration test is carried out before commercial launch and every year after.
13. **Reporting a vulnerability.** Email `contact.securityEmail`. We aim to acknowledge reports within 2 business days. Please don't access data that isn't yours or disrupt service while testing.
14. **If something goes wrong.** We notify affected restaurants without undue delay and report incidents to CERT-In and the Data Protection Board where the law requires.

Commit: `feat: draft Privacy, Terms and Security pages from the BRD`.

### Phase 7: SEO, metadata and static files

1. **`src/config/seo.ts` page meta.** Keep titles ≤ 60 characters and descriptions ≤ 155.

   | Route | Title | Description |
   |---|---|---|
   | `/` | `{NAME}: restaurant POS, kitchen display & QR ordering` | "Table tablets, QR menus, kitchen display, wrist pagers and GST-ready billing in one system that keeps running without internet. Book a demo." |
   | `/demo` | `Book a demo · {NAME}` | "See {NAME} on your floor: guest ordering, kitchen display, wrist pagers, GST billing and reports in one live walkthrough." |
   | `/privacy` | `Privacy Policy · {NAME}` | "How {NAME} handles personal data on this website and in the {NAME} platform, and your rights under India's DPDP Act." |
   | `/terms` | `Terms of Service · {NAME}` | "The terms for using the {NAME} website and restaurant operations platform." |
   | `/security` | `Security · {NAME}` | "How {NAME} protects restaurant data: local-first design, device pairing, audit trail, encrypted backups in India and safe updates." |

   `DEFAULT_DESCRIPTION` becomes the home description above (not the hero subhead).
2. **JSON-LD.**
   - `Organization`: `name`, `legalName`, `url`, `logo` (absolute), `email`, `telephone`, `address` (`PostalAddress` with `addressCountry: "IN"`).
   - `SoftwareApplication`: `name`, `applicationCategory: "BusinessApplication"`, `operatingSystem: "Windows, Android"`, `description: DESCRIPTOR`, `provider`.
   - **Delete the `offers` block** (no public price; never `price: "0"`).
   - No ratings or reviews markup.
3. **Open Graph and Twitter.** Check that `usePageMeta` sets `og:title`, `og:description`, `og:url`, `og:image`, `og:image:width` (1200), `og:image:height` (630), `og:image:alt` ("{NAME}: serve faster, miss nothing"), `og:type`, `og:site_name`, `twitter:card=summary_large_image`. Add whatever is missing.
4. **OG image script, `scripts/make-og.mjs`** (uses `sharp`, added in Phase 10; add it now if you build this script now):
   - If `assets-src/images/og-background.*` exists, crop it to 1200×630 (manifest crop). Otherwise use a brand background: indigo `#1B2A6B` with a soft saffron radial glow at the bottom right.
   - Overlay a left-to-right indigo gradient (≈ 92 % → 0 % by 60 % width).
   - Composite `public/logo.svg` (≈ 72 px) at the top left.
   - Render SVG text: `{NAME}` (≈ 72 px, bold, cream), the headline "Serve faster. Miss nothing." (≈ 40 px, cream), and "Book a demo" (≈ 26 px, saffron). Use font family `"Clash Display, Inter, Arial, Helvetica, sans-serif"`; a system fallback is acceptable.
   - Write `public/img/og.jpg` (quality 85, ≤ 300 KB).
   - Run it now with the brand background so an OG image exists before the photos arrive.
   - `OG_IMAGE_PATH` stays `/img/og.jpg`.
5. **`scripts/generate-static-seo.mjs`.** It parses `NAME` and `DESCRIPTOR` with regexes, so keep both as plain double-quoted strings in `site.ts` (no template literal, no `"` inside). Remove `/styleguide` from anything public.
6. **`public/sitemap.xml` and `public/robots.txt`** (dev copies): remove the TODO comment. They're regenerated at build time.
7. **Styleguide.**
   - Register the `/styleguide` route only when `FEATURES.showStyleguide` (dev).
   - Keep it `noindex`.
   - Update its samples to the new copy and components, with no TODO strings. Demo the mockups and the "Sample data" pill there.

Commit: `feat: Parossa SEO, metadata, OG image and dev-only styleguide`.

### Phase 8: Docs and owner checklist

1. **`README.md`**: rewrite for Parossa:
   - quick start; env vars; deploy (keep the Netlify/Vercel parts, minus `/models`);
   - **where content lives**: `site.ts` (name, value proposition, company, contact, legal date), `features.ts` (switches, demo video), `sampleData.ts` (mockup data), `socialProof.ts` (real testimonials/logos later), `images.json` (image manifest);
   - **image workflow**: `docs/IMAGE_PROMPTS.md` → `assets-src/images/` → `npm run images`;
   - how to add the demo video; how to replace sample data; performance notes; scripts.
   - Remove every 3D/AR section.
2. **`CLAUDE.md`** (new, repo root) holding the project rules for future AI sessions:
   - a condensed version of §1 Ground rules, §3.4 Never claim and the brand tokens;
   - "Product facts come from `docs/BRD.md`; if the product changes, update the BRD first";
   - where content lives;
   - the QA commands.
3. **`.cursorrules`**: replace its content with the same rules as `CLAUDE.md` (the current file describes 3D/AR, self-pay and the old name).
4. **`TODO.md`**: rewrite as an **owner-only** checklist:
   - **Launch blockers**
     - Replace sample data: `company.legalName`, `company.jurisdictionCity`, `contact.*` (email, phone, address, support hours, security email, grievance officer), `social.*`. Search the repo for `SAMPLE`.
     - Create the Formspree form and set `VITE_FORMSPREE_ID` (locally and on the host).
     - Buy the domain; set `VITE_SITE_URL`.
     - Legal review of Privacy, Terms and Security. Confirm the retention periods, the security acknowledgement time (2 business days), governing-law city and grievance officer. Update `LEGAL_LAST_UPDATED`.
     - Confirm the founding-restaurant benefits (P5.10).
     - Generate the photos with `docs/IMAGE_PROMPTS.md`, put them in `assets-src/images/`, and ask the AI to run Phase 10.
   - **Optional / later**
     - Final logo (replace `public/logo.svg` and `public/favicon.svg`).
     - GA4 ID (`VITE_GA_ID`). If you enable it, set GA4 data retention to 14 months to match the Privacy Policy.
     - Demo video: file, poster and captions → `DEMO_VIDEO` in `features.ts`.
     - Real testimonials or logos, **with written permission** → `socialProof.ts` + switches.
     - Social profile URLs.
   - **After deploy**
     - Lighthouse on the live URL (mobile).
     - Formspree test submission.
     - Share the link on WhatsApp/LinkedIn to check the OG preview.
     - Cookie banner shows in production with GA set.
5. **`public/img/README.md`**: update to the new manifest and naming (`<name>-<width>.<ext>`). Delete `public/models/README.md` if it still exists.
6. **`.env.example`**: rewrite without the word TODO, e.g. `# Required for the demo form: Formspree form ID`, with `VITE_SITE_URL=https://www.parossa.example`.

Commit: `docs: Parossa README, CLAUDE.md, owner TODO checklist`.

### Phase 9: QA

Run and fix until all of these pass:

1. `npm run lint` · `npm run build` · `npx prettier --check .`
2. **Content greps** (all must return nothing in `src/`, except where noted):
   - `TODO`
   - `thali` (case-insensitive, whole repo)
   - `three|drei|model-viewer|\.glb|usdz` · `\b3D\b|augmented|\bAR\b`
   - `delivery|marketplace|multi-outlet|cutlery|per-dish|personalis|allergen-safe|paperless|pilot`
   - `self-order & pay|pay when|payment partner|payments? (are|is) processed`. Only the allowed sentences in §3.2 / FAQ 5 / Security 11 may mention payments.
   - `\d+\s?%` in visible copy: only allowed in sample-data mockups, the bill's tax lines and "AES-256"-style technical terms. Review each hit by hand.
3. **Claims review.** Read every visible string on every page (Home, Demo, Privacy, Terms, Security, 404) against §3. List anything not covered by §3 in your summary and either remove it or justify it from the BRD.
4. **Layout.** At 360, 390, 768, 1024 and 1440 px wide, no horizontal page scroll on any route. Check with Playwright if available: assert `document.documentElement.scrollWidth <= window.innerWidth` per route and viewport. Mockups are readable and don't overflow.
5. **Accessibility.**
   - Keyboard through nav, mobile drawer, FAQ accordion, cookie banner, video modal (if enabled) and form; focus is always visible.
   - Every `<img>` has an `alt` (decorative = `""`); mockups have `role="img"` + `aria-label`.
   - Colour contrast passes AA (check gold text).
   - Run axe (e.g., `@axe-core/playwright`) if possible: zero serious or critical issues.
6. **Reduced motion.** With `prefers-reduced-motion: reduce`, no scroll-linked or looping animation runs.
7. **Performance.**
   - `npm run build` output: no chunk over 250 KB gzipped.
   - Run Lighthouse mobile on `npm run preview` if Chrome is available: Performance ≥ 90; Accessibility, Best Practices and SEO ≥ 95. Otherwise note this for the owner.
8. **Form.**
   - Without `VITE_FORMSPREE_ID`: production build shows the email/phone fallback, not a dev notice.
   - With a dummy ID: the request is sent to Formspree (it will fail); the error message is friendly.
9. **Final summary to the owner:**
   - what changed;
   - every `SAMPLE` value and where it is;
   - anything you decided that this plan didn't specify;
   - the remaining `TODO.md` items.

Commit: `chore: QA pass for Parossa launch build`.

### Phase 10: Photos (they're in `assets-src/images/`)

1. **Source images.** The owner saves ChatGPT outputs as `assets-src/images/<name>.png` (or `.jpg`/`.webp`) using the names in §6.
   - Add `assets-src/*` to `.gitignore` except `assets-src/README.md`, which explains the workflow. Originals are large; only the optimised outputs in `public/img/` are committed.
2. **`sharp`** as a devDependency.
3. **`scripts/optimize-images.mjs`** reads `src/config/images.json`. For each entry:
   - find the source (any of png/jpg/jpeg/webp) and warn, without failing, if it's missing;
   - crop to the entry's aspect ratio with `fit: "cover"` and the entry's `position`;
   - for each width in `widths`, **never upscaling** (cap at the source's cropped width), write:
     - `public/img/<name>-<w>.avif` (quality ≈ 50, effort 6);
     - `.webp` (quality ≈ 72);
     - `.jpg` (mozjpeg, quality ≈ 78, progressive);
   - strip metadata;
   - print a table of outputs and sizes.

   Size budgets at the largest width (AVIF): hero ≤ 160 KB, feature photos ≤ 120 KB, wide band ≤ 140 KB, dishes ≤ 35 KB. If a file is over budget, step quality down by 5 until it fits (minimum AVIF 35 / WebP 55 / JPG 65).
4. **`npm run images`** = `node scripts/optimize-images.mjs && node scripts/make-og.mjs`.
5. **Check every image in the browser** at 360 and 1280 px:
   - crops keep faces and dishes in frame (adjust `crop` in `images.json` and re-run if not);
   - floating hero cards don't cover faces;
   - alt text matches what's actually in the photo (update `alt` in `images.json`).
6. **Reject unsuitable images** and tell the owner which to regenerate and why:
   - readable text, logos or brand names;
   - malformed hands or faces;
   - an obviously AI look.
7. Re-run Lighthouse (LCP should stay < 2.5 s on mobile).

Commit: `feat: add optimised photography and OG image`.

---

## 6. Image manifest

ChatGPT prompts for each image are in `docs/IMAGE_PROMPTS.md`. ChatGPT produces square, landscape (3:2) or portrait (2:3) images; the script crops to the final aspect.

| # | `name` (file in `assets-src/images/`) | Used in | Generate as | Final aspect | `widths` | `crop` | `alt` |
|---|---|---|---|---|---|---|---|
| 1 | `hero-table` | Hero (P5.2) | Portrait 2:3 | 4:5 | 640, 1024 | `attention` | "Friends ordering on a table tablet in a warm, modern Indian restaurant" |
| 2 | `og-background` | OG image script (Phase 7) | Landscape 3:2 | 1200×630 | 1200 | `east` | (not shown on page) |
| 3 | `guest-tablet` | Guests row 1 (P5.5) | Landscape 3:2 | 4:3 | 640, 1280 | `attention` | "A guest taps a button on the table tablet while her parents look on" |
| 4 | `guest-qr` | Guests row 4 (P5.5) | Landscape 3:2 | 4:3 | 640, 1280 | `attention` | "A diner scans the table's QR code to open the menu on his phone" |
| 5 | `kitchen-display` | Team row 1 (P5.6) | Landscape 3:2 | 4:3 | 640, 1280 | `attention` | "Chefs check orders on the kitchen display above the pass" |
| 6 | `waiter-pager` | Team row 2 (P5.6) | Landscape 3:2 | 4:3 | 640, 1280 | `attention` | "A waiter carrying plates glances at the alert on his wrist pager" |
| 7 | `cashier-billing` | Team row 3 (P5.6) | Landscape 3:2 | 4:3 | 640, 1280 | `attention` | "A cashier hands a printed bill to a guest at the billing counter" |
| 8 | `owner-reports` | Reports, optional card (P5.7) | Landscape 3:2 | 4:3 | 640, 1280 | `attention` | "A restaurant owner reviews the day's reports on a laptop after closing" |
| 9 | `onboarding-setup` | Onboarding (P5.9) | Landscape 3:2 | 4:3 | 640, 1280 | `attention` | "A setup specialist helps a restaurant manager pair a table tablet" |
| 10 | `restaurant-interior` | Founding band background (P5.10) | Landscape 3:2 | 12:5 | 768, 1536 | `centre` | `""` (decorative background) |
| 11 | `dish-paneer-tikka` | Mockup thumbnails | Square 1:1 | 1:1 | 240, 480 | `centre` | "Paneer tikka" |
| 12 | `dish-seekh-kebab` | Mockup thumbnails | Square 1:1 | 1:1 | 240, 480 | `centre` | "Chicken seekh kebab" |
| 13 | `dish-butter-chicken` | Mockup thumbnails | Square 1:1 | 1:1 | 240, 480 | `centre` | "Butter chicken" |
| 14 | `dish-dal-makhani` | Mockup thumbnails | Square 1:1 | 1:1 | 240, 480 | `centre` | "Dal makhani" |
| 15 | `dish-garlic-naan` | Mockup thumbnails | Square 1:1 | 1:1 | 240, 480 | `centre` | "Garlic naan" |
| 16 | `dish-veg-biryani` | Mockup thumbnails | Square 1:1 | 1:1 | 240, 480 | `centre` | "Veg dum biryani" |
| 17 | `dish-mango-lassi` | Mockup thumbnails | Square 1:1 | 1:1 | 240, 480 | `centre` | "Mango lassi" |
| 18 | `dish-gulab-jamun` | Mockup thumbnails | Square 1:1 | 1:1 | 240, 480 | `centre` | "Gulab jamun" |

Dish thumbnails inside mockups sit in `aria-hidden` UI, so render them with `alt=""` there; the manifest `alt` is for any other use.

**Until the photos exist**, every slot shows the brand-gradient fallback (P4.1); the site must look finished and intentional without them, not broken.

---

## 7. Definition of done

- [ ] The site is called Parossa everywhere; no "Thali" anywhere in the repo.
- [ ] No 3D/AR code, dependencies, assets or claims; no delivery roadmap.
- [ ] Every visible claim is traceable to §3 (and so to the BRD); no payments processing, multi-outlet, personalisation, per-dish reviews or statistics.
- [ ] No fabricated testimonials, logos, customers or metrics. Sample data appears only inside labelled mockups.
- [ ] Zero `TODO` strings in `src/`; owner work is listed in `TODO.md`; dummy values are marked `SAMPLE`.
- [ ] Analytics & reports section retained and expanded to the BRD report list.
- [ ] Legal pages fully drafted; "Last updated" set.
- [ ] Hero secondary button reads "See how it works" and scrolls to the flow until a video is configured.
- [ ] Image pipeline and manifest ready; site looks complete with fallbacks; photos drop in with one command.
- [ ] Lint, build, Prettier, greps, layout, accessibility and reduced-motion checks pass; Lighthouse targets met or flagged for post-deploy.
- [ ] README, CLAUDE.md, `.cursorrules`, TODO.md and `.env.example` updated.
