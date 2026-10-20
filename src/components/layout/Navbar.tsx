import { useEffect, useId, useRef, useState, type MouseEvent } from "react";

import { Link, useLocation } from "react-router-dom";

import clsx from "clsx";

import { NAME } from "@/config/site";

import { DEMO_HREF, DEMO_PATH, NAV_LINKS } from "@/config/navigation";

import { Button } from "@/components/ui";

import { useFocusTrap } from "@/hooks/useFocusTrap";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";



function resolveHomeHash(hash: string) {

  return `/${hash}`;

}



export function Navbar() {

  const { isScrolled, scrollTo, lenis } = useSmoothScroll();

  const location = useLocation();

  const [open, setOpen] = useState(false);

  const drawerId = useId();

  const drawerRef = useRef<HTMLDivElement>(null);

  const isHome = location.pathname === "/";



  useFocusTrap(open, drawerRef);



  useEffect(() => {

    setOpen(false);

  }, [location.pathname, location.hash]);



  useEffect(() => {

    if (!open) return;



    const onKeyDown = (event: KeyboardEvent) => {

      if (event.key === "Escape") setOpen(false);

    };



    document.addEventListener("keydown", onKeyDown);

    document.body.style.overflow = "hidden";

    lenis?.stop();



    return () => {

      document.removeEventListener("keydown", onKeyDown);

      document.body.style.overflow = "";

      lenis?.start();

    };

  }, [open, lenis]);



  const handleNavClick = (

    event: MouseEvent<HTMLAnchorElement>,

    href: string,

  ) => {

    if (!isHome) return;



    event.preventDefault();

    setOpen(false);

    scrollTo(href);

  };



  const goToDemo = (event: MouseEvent<HTMLAnchorElement>) => {

    if (!isHome) return;

    event.preventDefault();

    setOpen(false);

    scrollTo(DEMO_HREF);

  };



  const navHref = (hash: string) => (isHome ? hash : resolveHomeHash(hash));



  return (

    <header

      className={clsx(

        "sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",

        isScrolled

          ? "border-b border-indigo/10 bg-cream/90 shadow-sm shadow-indigo/5 backdrop-blur-md"

          : "border-b border-transparent bg-cream/40 backdrop-blur-sm",

      )}

    >

      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-5 sm:h-[4.25rem] sm:px-8 lg:px-10">

        <Link

          to="/"

          className="flex shrink-0 items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"

          aria-label={`${NAME} home`}

        >

          <img

            src="/logo.svg"

            alt=""

            width={32}

            height={32}

            className="h-8 w-8"

          />

          <span className="font-display text-lg font-semibold tracking-tight text-indigo">

            {NAME}

          </span>

        </Link>



        <nav

          className="ml-auto hidden items-center gap-1 lg:flex"

          aria-label="Primary"

        >

          {NAV_LINKS.map((link) => (

            <a

              key={link.href}

              href={navHref(link.href)}

              onClick={(event) => handleNavClick(event, link.href)}

              className="rounded-full px-3 py-2 font-body text-sm font-medium text-ink/75 transition-colors hover:text-indigo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"

            >

              {link.label}

            </a>

          ))}

        </nav>



        <div className="ml-auto flex items-center gap-2 lg:ml-4">

          <Button

            size="sm"

            href={isHome ? DEMO_HREF : DEMO_PATH}

            onClick={(event: MouseEvent<HTMLAnchorElement>) => {

              if (!isHome) return;

              event.preventDefault();

              scrollTo(DEMO_HREF);

            }}

            className="shrink-0 shadow-md shadow-teal/25"

          >

            Book a demo

          </Button>



          <button

            type="button"

            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-indigo transition-colors hover:bg-indigo/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal lg:hidden"

            aria-expanded={open}

            aria-controls={drawerId}

            aria-label={open ? "Close menu" : "Open menu"}

            onClick={() => setOpen((value) => !value)}

          >

            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>

            <span className="relative block h-3.5 w-5" aria-hidden="true">

              <span

                className={clsx(

                  "absolute left-0 top-0 block h-0.5 w-full bg-indigo transition-transform",

                  open && "translate-y-[6px] rotate-45",

                )}

              />

              <span

                className={clsx(

                  "absolute left-0 top-[6px] block h-0.5 w-full bg-indigo transition-opacity",

                  open && "opacity-0",

                )}

              />

              <span

                className={clsx(

                  "absolute left-0 top-[12px] block h-0.5 w-full bg-indigo transition-transform",

                  open && "-translate-y-[6px] -rotate-45",

                )}

              />

            </span>

          </button>

        </div>

      </div>



      <div

        id={drawerId}

        ref={drawerRef}

        className={clsx(

          "border-t border-indigo/10 bg-cream/95 backdrop-blur-md lg:hidden",

          open ? "block" : "hidden",

        )}

      >

        <nav

          className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8"

          aria-label="Mobile"

        >

          <Button

            size="lg"

            className="mb-2 w-full shadow-md shadow-teal/25"

            href={isHome ? DEMO_HREF : DEMO_PATH}

            onClick={goToDemo}

          >

            Book a demo

          </Button>

          {NAV_LINKS.map((link) => (

            <a

              key={link.href}

              href={navHref(link.href)}

              onClick={(event) => handleNavClick(event, link.href)}

              className="rounded-xl px-3 py-3 font-body text-base font-medium text-indigo transition-colors hover:bg-indigo/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"

            >

              {link.label}

            </a>

          ))}

        </nav>

      </div>

    </header>

  );

}

