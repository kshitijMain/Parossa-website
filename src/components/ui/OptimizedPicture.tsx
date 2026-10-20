import type { ImgHTMLAttributes } from "react";
import clsx from "clsx";

type OptimizedPictureProps = {
  /** Path without extension, e.g. `/img/hero-fallback` → `.avif`, `.webp`, `.jpg`. */
  basePath: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
} & Pick<ImgHTMLAttributes<HTMLImageElement>, "onError">;

/**
 * Responsive picture element with AVIF → WebP → JPG fallbacks.
 * Drop matching files in `public/img/` (see public/img/README.md).
 */
export function OptimizedPicture({
  basePath,
  alt,
  width,
  height,
  sizes = "100vw",
  priority = false,
  className,
  imgClassName,
  onError,
}: OptimizedPictureProps) {
  return (
    <picture className={className}>
      <source srcSet={`${basePath}.avif`} type="image/avif" sizes={sizes} />
      <source srcSet={`${basePath}.webp`} type="image/webp" sizes={sizes} />
      <img
        src={`${basePath}.jpg`}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={clsx("h-full w-full object-cover", imgClassName)}
        onError={onError}
      />
    </picture>
  );
}
