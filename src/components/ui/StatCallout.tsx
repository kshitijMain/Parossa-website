import type { HTMLAttributes } from "react";
import clsx from "clsx";
import { Body } from "./Typography";

type StatCalloutProps = {
  value?: string;
  label?: string;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "children" | "className">;

export function StatCallout({
  value = "TODO",
  label = "TODO: metric label",
  className,
  ...rest
}: StatCalloutProps) {
  return (
    <div className={clsx("flex flex-col gap-2", className)} {...rest}>
      <p className="font-display text-4xl font-semibold tracking-tight text-indigo sm:text-5xl">
        {value}
      </p>
      <Body className="text-sm uppercase tracking-[0.12em] text-ink/60">
        {label}
      </Body>
    </div>
  );
}
