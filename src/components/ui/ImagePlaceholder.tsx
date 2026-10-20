import type { HTMLAttributes } from "react";

import clsx from "clsx";

import { OptimizedPicture } from "./OptimizedPicture";



type ImagePlaceholderProps = {

  alt?: string;

  caption?: string;

  /** Legacy single-file props — prefer `basePath` for AVIF/WebP/JPG triplets. */

  src?: string;

  avifSrc?: string;

  webpSrc?: string;

  /** e.g. `/img/feature-tablet` → `.avif`, `.webp`, `.jpg` in `public/img/`. */

  basePath?: string;

  width?: number;

  height?: number;

  sizes?: string;

  aspectRatio?: "video" | "square" | "photo" | "wide";

  className?: string;

} & Omit<HTMLAttributes<HTMLElement>, "children" | "className">;



const aspectClasses = {

  video: "aspect-video",

  square: "aspect-square",

  photo: "aspect-[4/3]",

  wide: "aspect-[21/9]",

} as const;



const DEFAULT_CAPTION =

  "TODO: Drop a real food/restaurant photo or product screenshot here (AVIF/WebP preferred).";



const defaultDimensions = {

  video: { width: 1280, height: 720 },

  square: { width: 800, height: 800 },

  photo: { width: 1200, height: 900 },

  wide: { width: 1680, height: 720 },

} as const;



export function ImagePlaceholder({

  alt = "Placeholder image slot",

  caption = DEFAULT_CAPTION,

  src,

  avifSrc,

  webpSrc,

  basePath,

  width,

  height,

  sizes = "(max-width: 768px) 100vw, 50vw",

  aspectRatio = "photo",

  className,

  ...rest

}: ImagePlaceholderProps) {

  const dims = defaultDimensions[aspectRatio];

  const imgWidth = width ?? dims.width;

  const imgHeight = height ?? dims.height;

  const hasLegacyImage = Boolean(src || avifSrc || webpSrc);

  const hasImage = Boolean(basePath || hasLegacyImage);



  return (

    <figure className={clsx("w-full", className)} {...rest}>

      <div

        className={clsx(

          "relative overflow-hidden rounded-2xl border border-indigo/10",

          aspectClasses[aspectRatio],

          !hasImage && "bg-gold-gradient/10",

        )}

      >

        {basePath ? (

          <OptimizedPicture

            basePath={basePath}

            alt={alt}

            width={imgWidth}

            height={imgHeight}

            sizes={sizes}

            className="h-full w-full"

          />

        ) : hasLegacyImage ? (

          <picture>

            {avifSrc ? <source srcSet={avifSrc} type="image/avif" /> : null}

            {webpSrc ? <source srcSet={webpSrc} type="image/webp" /> : null}

            <img

              src={src ?? webpSrc ?? avifSrc}

              alt={alt}

              width={imgWidth}

              height={imgHeight}

              className="h-full w-full object-cover"

              loading="lazy"

              decoding="async"

            />

          </picture>

        ) : (

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-gold-from/15 via-cream to-indigo/5 px-6 text-center">

            <div

              className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-gradient text-white"

              aria-hidden="true"

            >

              <svg

                viewBox="0 0 24 24"

                className="h-5 w-5"

                fill="none"

                stroke="currentColor"

                strokeWidth="1.75"

              >

                <rect x="3" y="5" width="18" height="14" rx="2" />

                <circle cx="8.5" cy="10" r="1.5" />

                <path d="M21 16l-5.5-5.5L7 19" />

              </svg>

            </div>

            <p className="max-w-xs font-body text-sm leading-relaxed text-indigo/70">

              {caption}

            </p>

          </div>

        )}

      </div>

      {hasImage && caption ? (

        <figcaption className="mt-3 font-body text-sm text-ink/55">

          {caption}

        </figcaption>

      ) : null}

    </figure>

  );

}

