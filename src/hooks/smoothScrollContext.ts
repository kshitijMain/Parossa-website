import { createContext } from "react";
import type Lenis from "lenis";

export type SmoothScrollContextValue = {
  scrollTo: (target: string | number, options?: { offset?: number }) => void;
  progress: number;
  isScrolled: boolean;
  lenis: Lenis | null;
};

export const SmoothScrollContext =
  createContext<SmoothScrollContextValue | null>(null);
