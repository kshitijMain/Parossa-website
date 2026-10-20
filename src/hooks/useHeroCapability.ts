import { useEffect, useState } from "react";

/**
 * Static hero image on small phones, low-end hardware, or reduced motion.
 * Keeps the live R3F canvas off the critical path for FCP.
 */
export function shouldUseStaticHero() {
  if (typeof window === "undefined") return true;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return true;
  }

  // Small phones — primer: static fallback
  if (window.matchMedia("(max-width: 640px)").matches) {
    return true;
  }

  const nav = navigator as Navigator & { deviceMemory?: number };

  // Low-end heuristics (avoid treating typical 4–8 core laptops as low-end)
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) {
    return true;
  }
  if (
    typeof nav.hardwareConcurrency === "number" &&
    nav.hardwareConcurrency <= 2
  ) {
    return true;
  }

  return false;
}

export function useHeroCapability() {
  // Start static so first paint never waits on capability or three.js
  const [staticHero, setStaticHero] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setStaticHero(shouldUseStaticHero());
    setReady(true);
  }, []);

  return { staticHero, ready };
}
