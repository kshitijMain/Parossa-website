import type { MouseEvent, ReactNode } from "react";
import { Body, Button } from "@/components/ui";
import { DEMO_HREF } from "@/config/navigation";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import clsx from "clsx";

type SectionNextStepProps = {
  label?: string;
  cta?: string;
  href?: string;
  className?: string;
  children?: ReactNode;
};

export function SectionNextStep({
  label = "Ready to see it on your floor?",
  cta = "Book a demo",
  href = DEMO_HREF,
  className,
  children,
}: SectionNextStepProps) {
  const { scrollTo } = useSmoothScroll();
  const isDemo = href === DEMO_HREF;

  return (
    <div
      className={clsx(
        "mt-10 flex flex-col gap-4 border-t border-indigo/10 pt-8 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <Body className="text-ink/70">{children ?? label}</Body>
      <div className="flex flex-wrap items-center gap-3">
        {!isDemo ? (
          <Button
            size="sm"
            variant="secondary"
            href={href}
            onClick={(event: MouseEvent<HTMLAnchorElement>) => {
              event.preventDefault();
              scrollTo(href);
            }}
          >
            {cta}
          </Button>
        ) : null}
        <Button
          size="sm"
          href={DEMO_HREF}
          onClick={(event: MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault();
            scrollTo(DEMO_HREF);
          }}
        >
          Book a demo
        </Button>
      </div>
    </div>
  );
}
