import { useEffect } from "react";
import {
  absoluteOgImage,
  absoluteUrl,
  type PageMeta,
} from "@/config/seo";
import { NAME } from "@/config/site";

function upsertMeta(
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  let el = document.head.querySelector(
    `meta[${attribute}="${key}"]`,
  ) as HTMLMetaElement | null;

  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribute, key);
    document.head.appendChild(el);
  }

  el.content = content;
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector(
    `link[rel="${rel}"]`,
  ) as HTMLLinkElement | null;

  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }

  el.href = href;
}

export function usePageMeta(meta: PageMeta, pathname: string) {
  useEffect(() => {
    const canonical = absoluteUrl(pathname === "/" ? "/" : pathname);
    const ogImage = absoluteOgImage();
    const robots = meta.index === false ? "noindex, nofollow" : "index, follow";

    document.title = meta.title;

    upsertMeta("name", "description", meta.description);
    upsertMeta("name", "robots", robots);

    upsertLink("canonical", canonical);

    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", NAME);
    upsertMeta("property", "og:title", meta.title);
    upsertMeta("property", "og:description", meta.description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", ogImage);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", meta.title);
    upsertMeta("name", "twitter:description", meta.description);
    upsertMeta("name", "twitter:image", ogImage);
  }, [meta, pathname]);
}
