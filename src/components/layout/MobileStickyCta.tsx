import { useEffect, useState, type MouseEvent } from "react";

import { useLocation } from "react-router-dom";

import clsx from "clsx";

import { Button } from "@/components/ui";

import { DEMO_HREF, DEMO_PATH } from "@/config/navigation";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";



export function MobileStickyCta() {

  const { scrollTo } = useSmoothScroll();

  const location = useLocation();

  const [demoInView, setDemoInView] = useState(false);

  const isHome = location.pathname === "/";



  useEffect(() => {

    const demo = document.getElementById("demo");

    if (!demo) {

      setDemoInView(false);

      return;

    }



    const observer = new IntersectionObserver(

      ([entry]) => {

        setDemoInView(entry.isIntersecting);

      },

      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },

    );



    observer.observe(demo);

    return () => observer.disconnect();

  }, [location.pathname]);



  const visible = !demoInView;



  return (

    <div

      className={clsx(

        "fixed inset-x-0 bottom-0 z-40 border-t border-teal/20 bg-cream/95 px-4 py-3 shadow-[0_-12px_32px_rgba(29,180,122,0.18)] backdrop-blur-md transition-transform duration-300 md:hidden",

        visible ? "translate-y-0" : "pointer-events-none translate-y-full",

      )}

      aria-hidden={!visible}

    >

      <Button

        size="lg"

        className="w-full shadow-lg shadow-teal/30 ring-2 ring-teal/20"

        href={isHome ? DEMO_HREF : DEMO_PATH}

        tabIndex={visible ? 0 : -1}

        onClick={(event: MouseEvent<HTMLAnchorElement>) => {

          if (!isHome) return;

          event.preventDefault();

          scrollTo(DEMO_HREF);

        }}

      >

        Book a demo

      </Button>

    </div>

  );

}

