import type { ReactNode } from "react";
import { DocumentHead, JsonLd } from "@/components/Seo";
import { SmoothScrollProvider } from "@/hooks/SmoothScrollProvider";
import { CookieConsent } from "./CookieConsent";
import { Footer } from "./Footer";
import { HashScroll } from "./HashScroll";
import { MobileStickyCta } from "./MobileStickyCta";
import { Navbar } from "./Navbar";
import { ScrollProgress } from "./ScrollProgress";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <SmoothScrollProvider>
      <DocumentHead />
      <JsonLd />
      <div className="flex min-h-screen flex-col bg-cream">
        <HashScroll />
        <ScrollProgress />
        <Navbar />
        <div className="flex-1 pb-20 md:pb-0">{children}</div>
        <Footer />
        <MobileStickyCta />
        <CookieConsent />
      </div>
    </SmoothScrollProvider>
  );
}
