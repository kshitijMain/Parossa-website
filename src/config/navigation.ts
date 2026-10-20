export const NAV_LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Guest experience", href: "#guest-experience" },
  { label: "Operations", href: "#operations" },
  { label: "Analytics & reviews", href: "#analytics" },
  { label: "Pricing", href: "#pricing" },
] as const;

export const DEMO_HREF = "#demo";
/** Dedicated demo page — use for links from legal/secondary pages. */
export const DEMO_PATH = "/demo";

export const LEGAL_LINKS = [
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
  { label: "Security", to: "/security" },
] as const;

export const FOOTER_NAV = [
  {
    title: "Product",
    links: NAV_LINKS,
  },
  {
    title: "Company",
    links: [
      { label: "Book a demo", href: DEMO_HREF },
      { label: "Contact", href: DEMO_HREF },
    ],
  },
] as const;
