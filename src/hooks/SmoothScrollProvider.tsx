import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import Lenis from "lenis";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import {

  SmoothScrollContext,

  type SmoothScrollContextValue,

} from "./smoothScrollContext";



gsap.registerPlugin(ScrollTrigger);



function prefersReducedMotion() {

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;

}



function getNativeProgress() {

  const doc = document.documentElement;

  const max = doc.scrollHeight - window.innerHeight;

  if (max <= 0) return 0;

  return Math.min(1, Math.max(0, window.scrollY / max));

}



export function SmoothScrollProvider({ children }: { children: ReactNode }) {

  const lenisRef = useRef<Lenis | null>(null);

  const [progress, setProgress] = useState(0);

  const [isScrolled, setIsScrolled] = useState(false);

  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);



  useEffect(() => {

    let cancelled = false;

    let cleanup: (() => void) | undefined;



    const setupNativeScroll = () => {

      const updateFromNative = () => {

        setProgress(getNativeProgress());

        setIsScrolled(window.scrollY > 12);

      };



      updateFromNative();

      window.addEventListener("scroll", updateFromNative, { passive: true });

      window.addEventListener("resize", updateFromNative);



      return () => {

        window.removeEventListener("scroll", updateFromNative);

        window.removeEventListener("resize", updateFromNative);

      };

    };



    const setupLenis = () => {

      const lenis = new Lenis({

        duration: 1.1,

        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

        touchMultiplier: 1.5,

      });



      lenisRef.current = lenis;

      setLenisInstance(lenis);



      lenis.on("scroll", (instance) => {

        ScrollTrigger.update();

        setProgress(instance.progress);

        setIsScrolled(instance.scroll > 12);

      });



      const ticker = (time: number) => {

        lenis.raf(time * 1000);

      };



      gsap.ticker.add(ticker);

      gsap.ticker.lagSmoothing(0);

      ScrollTrigger.refresh();



      return () => {

        gsap.ticker.remove(ticker);

        lenis.destroy();

        lenisRef.current = null;

        setLenisInstance(null);

      };

    };



    const start = () => {

      if (cancelled) return;

      cleanup = prefersReducedMotion() ? setupNativeScroll() : setupLenis();

    };



    if (prefersReducedMotion()) {

      start();

    } else if (typeof requestIdleCallback !== "undefined") {

      const idleId = requestIdleCallback(start, { timeout: 2000 });

      return () => {

        cancelled = true;

        cancelIdleCallback(idleId);

        cleanup?.();

      };

    } else {

      const timeoutId = window.setTimeout(start, 1);

      return () => {

        cancelled = true;

        window.clearTimeout(timeoutId);

        cleanup?.();

      };

    }



    return () => {

      cancelled = true;

      cleanup?.();

    };

  }, []);



  const scrollTo = useCallback(

    (target: string | number, options?: { offset?: number }) => {

      const offset = options?.offset ?? -88;

      const lenis = lenisRef.current;



      if (lenis) {

        lenis.scrollTo(target, { offset, immediate: false });

        return;

      }



      if (typeof target === "number") {

        window.scrollTo({ top: target, behavior: "smooth" });

        return;

      }



      const el = document.querySelector(target);



      if (el instanceof HTMLElement) {

        const top = el.getBoundingClientRect().top + window.scrollY + offset;

        window.scrollTo({ top, behavior: "smooth" });

      }

    },

    [],

  );



  const value = useMemo<SmoothScrollContextValue>(

    () => ({

      scrollTo,

      progress,

      isScrolled,

      lenis: lenisInstance,

    }),

    [scrollTo, progress, isScrolled, lenisInstance],

  );



  return (

    <SmoothScrollContext.Provider value={value}>

      {children}

    </SmoothScrollContext.Provider>

  );

}

