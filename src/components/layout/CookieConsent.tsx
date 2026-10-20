import { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";

import { Body, Button } from "@/components/ui";

import { useFocusTrap } from "@/hooks/useFocusTrap";

import {

  hasAnalyticsConsent,

  initAnalytics,

  isAnalyticsConfigured,

  setAnalyticsConsent,

} from "@/lib/analytics";



export function CookieConsent() {

  const [visible, setVisible] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);



  useFocusTrap(visible, panelRef);



  useEffect(() => {

    if (!import.meta.env.PROD || !isAnalyticsConfigured()) return;

    if (hasAnalyticsConsent()) {

      initAnalytics();

      return;

    }

    setVisible(true);

  }, []);



  if (!visible) return null;



  const accept = () => {

    setAnalyticsConsent(true);

    initAnalytics();

    setVisible(false);

  };



  const decline = () => {

    setAnalyticsConsent(false);

    setVisible(false);

  };



  return (

    <div

      ref={panelRef}

      role="dialog"

      aria-modal="true"

      aria-labelledby="cookie-consent-title"

      aria-live="polite"

      className="fixed inset-x-0 bottom-0 z-[80] border-t border-indigo/10 bg-cream/95 px-4 py-4 shadow-[0_-8px_32px_rgba(27,42,107,0.12)] backdrop-blur-md sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md sm:rounded-2xl sm:border"

    >

      <p

        id="cookie-consent-title"

        className="font-display text-sm font-semibold text-indigo"

      >

        Cookies & analytics

      </p>

      <Body className="mt-2 text-sm text-ink/70">

        We use optional analytics cookies to understand how visitors use this

        site. See our{" "}

        <Link

          to="/privacy#cookies"

          className="text-teal underline-offset-4 hover:underline"

        >

          cookie notice

        </Link>

        .

      </Body>

      <div className="mt-4 flex flex-wrap gap-2">

        <Button size="sm" type="button" onClick={accept}>

          Accept

        </Button>

        <Button size="sm" variant="secondary" type="button" onClick={decline}>

          Decline

        </Button>

      </div>

    </div>

  );

}

