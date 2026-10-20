/**
 * GA4 — loaded only in production after cookie consent.
 * Set VITE_GA_ID in .env (see .env.example). TODO: paste your GA4 measurement ID.
 */
const GA_ID = import.meta.env.VITE_GA_ID?.trim();
const CONSENT_KEY = "thali-analytics-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function hasAnalyticsConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === "granted";
  } catch {
    return false;
  }
}

export function setAnalyticsConsent(granted: boolean) {
  try {
    localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
  } catch {
    /* ignore */
  }
}

export function initAnalytics() {
  if (!import.meta.env.PROD || !GA_ID) return;
  if (!hasAnalyticsConsent()) return;
  if (window.gtag) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true });
}

export function isAnalyticsConfigured(): boolean {
  return Boolean(GA_ID);
}
