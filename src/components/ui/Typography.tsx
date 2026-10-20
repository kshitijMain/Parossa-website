import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLParagraphElement>, "children" | "className">;

const eyebrowClasses =
  "border-l-2 border-gold-to pl-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-indigo/80 sm:text-sm";

export function Eyebrow({ children, className, ...rest }: EyebrowProps) {
  return (
    <p className={clsx(eyebrowClasses, className)} {...rest}>
      {children}
    </p>
  );
}

/** In-section mini label — AA-safe indigo with saffron accent bar. */
export function SectionLabel({ children, className, ...rest }: EyebrowProps) {
  return (
    <p
      className={clsx(
        "border-l-2 border-gold-to pl-3 font-body text-xs font-semibold uppercase tracking-[0.16em] text-indigo/80",
        className,
      )}
      {...rest}
    >
      {children}
    </p>
  );
}

type HeadingLevel = 1 | 2 | 3 | 4;

const headingSizes: Record<HeadingLevel, string> = {
  1: "text-4xl leading-[1.1] sm:text-5xl md:text-6xl",
  2: "text-3xl leading-[1.15] sm:text-4xl md:text-5xl",
  3: "text-2xl leading-snug sm:text-3xl",
  4: "text-xl leading-snug sm:text-2xl",
};

type HeadingProps = {
  level?: HeadingLevel;
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLHeadingElement>, "children" | "className">;

export function Heading({
  level = 2,
  children,
  className,
  ...rest
}: HeadingProps) {
  const classes = clsx(
    "font-display font-semibold tracking-tight text-indigo text-balance",
    headingSizes[level],
    className,
  );

  switch (level) {
    case 1:
      return (
        <h1 className={classes} {...rest}>
          {children}
        </h1>
      );
    case 3:
      return (
        <h3 className={classes} {...rest}>
          {children}
        </h3>
      );
    case 4:
      return (
        <h4 className={classes} {...rest}>
          {children}
        </h4>
      );
    default:
      return (
        <h2 className={classes} {...rest}>
          {children}
        </h2>
      );
  }
}

type LeadProps = {
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLParagraphElement>, "children" | "className">;

export function Lead({ children, className, ...rest }: LeadProps) {
  return (
    <p
      className={clsx(
        "max-w-2xl font-body text-lg leading-relaxed text-ink/85 sm:text-xl sm:leading-relaxed",
        className,
      )}
      {...rest}
    >
      {children}
    </p>
  );
}

type BodyProps = {
  as?: "p" | "div" | "span" | "figcaption";
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className">;

export function Body({
  as = "p",
  children,
  className,
  ...rest
}: BodyProps) {
  const classes = clsx(
    "font-body text-base leading-relaxed text-ink/80",
    className,
  );

  switch (as) {
    case "div":
      return (
        <div className={classes} {...rest}>
          {children}
        </div>
      );
    case "span":
      return (
        <span className={classes} {...rest}>
          {children}
        </span>
      );
    case "figcaption":
      return (
        <figcaption className={classes} {...rest}>
          {children}
        </figcaption>
      );
    default:
      return (
        <p className={classes} {...rest}>
          {children}
        </p>
      );
  }
}
