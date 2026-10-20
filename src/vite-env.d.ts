/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Formspree form ID for demo requests. See .env.example */
  readonly VITE_FORMSPREE_ID: string;
  /** Production site URL for canonical URLs, sitemap, OG (no trailing slash). */
  readonly VITE_SITE_URL: string;
  /** GA4 measurement ID — production + consent only. See .env.example */
  readonly VITE_GA_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
