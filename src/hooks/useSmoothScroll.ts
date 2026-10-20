import { useContext } from "react";
import { SmoothScrollContext } from "./smoothScrollContext";

export function useSmoothScroll() {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) {
    throw new Error("useSmoothScroll must be used within SmoothScrollProvider");
  }
  return ctx;
}
