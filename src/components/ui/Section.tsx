import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";

type SectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className" | "id">;

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { children, className, containerClassName, id, ...rest },
  ref,
) {
  return (
    <section
      ref={ref}
      id={id}
      className={clsx("py-16 sm:py-20 md:py-24 lg:py-28", className)}
      {...rest}
    >
      <div
        className={clsx(
          "mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10",
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
});
