import type { HTMLAttributes } from "react";
import clsx from "clsx";
import { Body } from "./Typography";

type TestimonialProps = {
  quote?: string;
  author?: string;
  role?: string;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className">;

export function Testimonial({
  quote = "TODO: Owner quote about faster table turns and fewer order errors.",
  author = "TODO: Owner name",
  role = "TODO: Role, Restaurant",
  className,
  ...rest
}: TestimonialProps) {
  return (
    <blockquote
      className={clsx(
        "rounded-2xl border border-indigo/10 bg-white/70 p-6 shadow-sm shadow-indigo/5 sm:p-8",
        className,
      )}
      {...rest}
    >
      <div
        className="mb-5 h-1 w-10 rounded-full bg-gold-gradient"
        aria-hidden="true"
      />
      <Body className="text-lg leading-relaxed text-ink/90 sm:text-xl">
        “{quote}”
      </Body>
      <footer className="mt-6">
        <cite className="not-italic">
          <span className="block font-display text-base font-semibold text-indigo">
            {author}
          </span>
          <span className="mt-0.5 block font-body text-sm text-ink/55">
            {role}
          </span>
        </cite>
      </footer>
    </blockquote>
  );
}
