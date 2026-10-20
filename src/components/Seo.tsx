import { useLocation } from "react-router-dom";
import {
  getPageMeta,
  organizationJsonLd,
  softwareApplicationJsonLd,
} from "@/config/seo";
import { usePageMeta } from "@/hooks/usePageMeta";

export function DocumentHead() {
  const { pathname } = useLocation();
  const meta = getPageMeta(pathname);
  usePageMeta(meta, pathname);
  return null;
}

export function JsonLd() {
  const org = organizationJsonLd();
  const app = softwareApplicationJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(app) }}
      />
    </>
  );
}
