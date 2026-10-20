import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type PillVariant = "gold" | "indigo" | "success";

const variantClasses: Record<PillVariant, string> = {
  gold: "bg-gold-gradient text-white",
  indigo: "bg-indigo/10 text-indigo",
  success: "bg-teal/10 text-teal",
};

type PillProps = {
  children: ReactNode;
  variant?: PillVariant;
  className?: string;
} & Omit<HTMLAttributes<HTMLSpanElement>, "children" | "className">;

export function Pill({
  children,
  variant = "gold",
  className,
  ...rest
}: PillProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 font-body text-xs font-semibold tracking-wide",
        variantClasses[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

/** Alias for semantic use as a badge. */
export const Badge = Pill;
