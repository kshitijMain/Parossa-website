import type { HTMLAttributes } from "react";
import clsx from "clsx";
import { Body } from "./Typography";

type LogoItem = {
  name: string;
  src?: string;
};

type LogoStripProps = {
  logos?: LogoItem[];
  className?: string;
  label?: string;
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className">;

const PLACEHOLDER_LOGOS: LogoItem[] = [
  { name: "TODO: Pilot restaurant A" },
  { name: "TODO: Pilot restaurant B" },
  { name: "TODO: Partner brand C" },
  { name: "TODO: Partner brand D" },
  { name: "TODO: Pilot restaurant E" },
];

export function LogoStrip({
  logos = PLACEHOLDER_LOGOS,
  className,
  label = "Trusted by early pilots",
  ...rest
}: LogoStripProps) {
  return (
    <figure className={clsx("w-full", className)} {...rest}>
      <Body
        as="figcaption"
        className="mb-6 text-center text-sm uppercase tracking-[0.14em] text-ink/50"
      >
        {label}
      </Body>
      <ul className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        {logos.map((logo) => (
          <li key={logo.name}>
            {logo.src ? (
              <img
                src={logo.src}
                alt={logo.name}
                className="h-8 w-auto max-w-[7.5rem] object-contain opacity-70 sm:h-10"
                loading="lazy"
              />
            ) : (
              <div
                className="flex h-12 min-w-[7.5rem] items-center justify-center rounded-xl border border-dashed border-indigo/20 bg-white/50 px-4"
                aria-label={logo.name}
              >
                <span className="font-body text-xs font-medium text-indigo/50">
                  {logo.name}
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </figure>
  );
}
