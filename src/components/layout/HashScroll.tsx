import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

/** Scrolls to hash targets after route changes (e.g. /#pricing from legal pages). */
export function HashScroll() {
  const location = useLocation();
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash;
    const frame = window.requestAnimationFrame(() => {
      scrollTo(id);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.hash, scrollTo]);

  return null;
}
