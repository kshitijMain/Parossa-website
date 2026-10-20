import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type CardProps = {
  children: ReactNode;
  className?: string;
  padded?: boolean;
} & Omit<HTMLAttributes<HTMLDivElement>, "children" | "className">;

export function Card({
  children,
  className,
  padded = true,
  ...rest
}: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-indigo/10 bg-white/70 shadow-sm shadow-indigo/5 backdrop-blur-sm",
        padded && "p-6 sm:p-8",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
