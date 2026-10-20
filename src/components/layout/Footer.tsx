import type { MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { DESCRIPTOR, NAME, contact, social } from "@/config/site";
import {
  DEMO_HREF,
  DEMO_PATH,
  FOOTER_NAV,
  LEGAL_LINKS,
} from "@/config/navigation";
import { Body, TextLink } from "@/components/ui";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

function resolveSectionHref(href: string, isHome: boolean) {
  if (href === DEMO_HREF) return isHome ? DEMO_HREF : DEMO_PATH;
  return isHome ? href : `/${href}`;
}

export function Footer() {
  const { scrollTo } = useSmoothScroll();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const year = new Date().getFullYear();

  const handleHashClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!isHome || !href.startsWith("#")) return;
    event.preventDefault();
    scrollTo(href);
  };

  return (
    <footer className="border-t border-indigo/10 bg-indigo text-cream">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:px-10 lg:py-16">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.svg"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 brightness-0 invert"
            />
            <span className="font-display text-xl font-semibold tracking-tight text-cream">
              {NAME}
            </span>
          </div>
          <Body className="mt-4 max-w-sm text-cream/75">{DESCRIPTOR}</Body>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-2">
          {FOOTER_NAV.map((column) => (
            <div key={column.title}>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-gold-from">
                {column.title}
              </p>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={resolveSectionHref(link.href, isHome)}
                      onClick={(event) => handleHashClick(event, link.href)}
                      className="font-body text-sm text-cream/80 transition-colors hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="lg:col-span-3">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-gold-from">
            Contact
          </p>
          <address className="mt-4 space-y-3 not-italic">
            <Body className="text-cream/80">{contact.address}</Body>
            <div>
              <TextLink
                href={`mailto:${contact.email.replace(/^TODO:\s*/, "")}`}
                className="text-cream hover:text-cream/80"
              >
                {contact.email}
              </TextLink>
            </div>
            <div>
              <TextLink
                href={`tel:${contact.phone.replace(/^TODO:\s*/, "").replace(/\s/g, "")}`}
                className="text-cream hover:text-cream/80"
              >
                {contact.phone}
              </TextLink>
            </div>
          </address>

          <ul className="mt-6 flex flex-wrap gap-4">
            {(
              [
                ["Twitter", social.twitter],
                ["LinkedIn", social.linkedin],
                ["Instagram", social.instagram],
              ] as const
            ).map(([label, url]) => (
              <li key={label}>
                <a
                  href={url.replace(/^TODO:\s*/, "")}
                  className="font-body text-sm text-cream/70 transition-colors hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                  rel="noreferrer"
                  target="_blank"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <Body className="text-sm text-cream/60">
            © {year} {NAME}. All rights reserved.
          </Body>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="font-body text-sm text-cream/70 transition-colors hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/privacy#cookies"
                className="font-body text-sm text-cream/70 transition-colors hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              >
                Cookies
              </Link>
            </li>
            <li>
              <a
                href={resolveSectionHref(DEMO_HREF, isHome)}
                onClick={(event) => handleHashClick(event, DEMO_HREF)}
                className="font-body text-sm text-cream/70 transition-colors hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              >
                Book a demo
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
