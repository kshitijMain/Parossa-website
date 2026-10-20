import { contact, DESCRIPTOR, NAME, valueProposition } from "./site";

/** Production site origin — set VITE_SITE_URL in .env (no trailing slash). */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? "https://example.com"
).replace(/\/$/, "");

/** TODO: Add public/img/og.jpg — 1200×630 social share image (AVIF/WebP + JPG). */
export const OG_IMAGE_PATH = "/img/og.jpg";

export const DEFAULT_DESCRIPTION = valueProposition.subhead;

export type PageMeta = {
  title: string;
  description: string;
  /** Omit for noindex pages like styleguide in production */
  index?: boolean;
};

const PAGE_META: Record<string, PageMeta> = {
  "/": {
    title: `${NAME} — ${valueProposition.headline}`,
    description: DEFAULT_DESCRIPTION,
  },
  "/demo": {
    title: `Book a demo — ${NAME}`,
    description: `See ${NAME} on your floor — live walkthrough of guest ordering, kitchen ops, and analytics for your restaurant.`,
  },
  "/privacy": {
    title: `Privacy Policy — ${NAME}`,
    description: `How ${NAME} collects, uses, and protects personal data. TODO: review with counsel before publication.`,
  },
  "/terms": {
    title: `Terms of Service — ${NAME}`,
    description: `Terms governing use of the ${NAME} guest-experience platform. TODO: review with counsel before publication.`,
  },
  "/security": {
    title: `Security — ${NAME}`,
    description: `${NAME} security overview — SSL/HTTPS, data handling, payments, and uptime. TODO: review with counsel before publication.`,
  },
  "/styleguide": {
    title: `UI styleguide — ${NAME}`,
    description: `Internal component reference for the ${NAME} marketing site.`,
    index: false,
  },
};

export function getPageMeta(pathname: string): PageMeta {
  return (
    PAGE_META[pathname] ?? {
      title: `Page not found — ${NAME}`,
      description: DESCRIPTOR,
      index: false,
    }
  );
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function absoluteOgImage(): string {
  return absoluteUrl(OG_IMAGE_PATH);
}

export function organizationJsonLd() {
  const email = contact.email.replace(/^TODO:\s*/, "");
  const phone = contact.phone.replace(/^TODO:\s*/, "");

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: NAME,
    url: SITE_URL,
    description: DESCRIPTOR,
    email,
    telephone: phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.replace(/^TODO:\s*/, ""),
    },
  };
}

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description: valueProposition.subhead,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      description: "TODO: Replace with accurate pricing / contact for quote",
    },
    provider: {
      "@type": "Organization",
      name: NAME,
      url: SITE_URL,
    },
  };
}
