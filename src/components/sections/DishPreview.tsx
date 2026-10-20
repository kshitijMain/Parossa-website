import { useEffect, useRef, useState } from "react";
import { NAME } from "@/config/site";
import { Body, Pill, Reveal, SectionLabel } from "@/components/ui";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { DishModelViewer } from "./DishModelViewer";

const FLOW_STEPS = [
  {
    title: "Scan the table QR",
    detail: "No app install — the menu opens in the guest’s browser.",
  },
  {
    title: "Browse the menu",
    detail: "Dishes load fast on any phone, ready to explore.",
  },
  {
    title: "Rotate the dish in 3D",
    detail: "Pinch, drag, and zoom — see every angle before they order.",
  },
  {
    title: "Order with confidence",
    detail: "Fewer “what’s that?” moments. More tickets that stick.",
  },
] as const;

function PhoneMockup({ active }: { active: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[300px]">
      <div className="relative rounded-[2rem] border border-indigo/15 bg-indigo p-2.5 shadow-xl shadow-indigo/15">
        <span
          className="absolute -left-0.5 top-24 h-8 w-0.5 rounded-full bg-indigo/40"
          aria-hidden="true"
        />
        <span
          className="absolute -right-0.5 top-28 h-12 w-0.5 rounded-full bg-indigo/40"
          aria-hidden="true"
        />

        <div className="relative overflow-hidden rounded-[1.35rem] bg-cream">
          <div className="relative flex h-7 items-center justify-center bg-cream">
            <span
              className="h-3.5 w-20 rounded-full bg-indigo/90"
              aria-hidden="true"
            />
          </div>

          <div className="flex items-center justify-between border-b border-indigo/5 px-3 py-2">
            <span className="font-display text-xs font-semibold text-indigo">
              {NAME}
            </span>
            <Pill variant="success" className="text-[0.65rem]">
              View in 3D
            </Pill>
          </div>

          <div className="relative aspect-[9/14] w-full">
            <ErrorBoundary>
              <DishModelViewer active={active} />
            </ErrorBoundary>
          </div>

          <div className="border-t border-indigo/5 px-3 py-2.5">
            <p className="font-display text-sm font-semibold text-indigo">
              TODO: Signature dish name
            </p>
            <p className="mt-0.5 font-body text-xs text-ink/55">
              Drag to rotate · Pinch to zoom
            </p>
          </div>
        </div>
      </div>

      <div className="absolute -right-2 bottom-16 sm:-right-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal px-3 py-1.5 font-body text-xs font-semibold text-white shadow-md shadow-teal/25">
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden="true"
          >
            <path
              d="M2 8h12M10 4l4 4-4 4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          View in 3D
        </span>
      </div>
    </div>
  );
}

function FlowStep({
  index,
  title,
  detail,
}: {
  index: number;
  title: string;
  detail: string;
}) {
  return (
    <li className="flex gap-4">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-gradient font-display text-sm font-semibold text-white"
        aria-hidden="true"
      >
        {index}
      </span>
      <div>
        <p className="font-display text-base font-semibold text-indigo">
          {title}
        </p>
        <Body className="mt-1 text-sm">{detail}</Body>
      </div>
    </li>
  );
}

/** Signature 3D dish moment — embedded inside Guest experience. */
export function DishPreview() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <Reveal>
        <PhoneMockup active={nearViewport} />
      </Reveal>

      <Reveal delay={0.08}>
        <div>
          <SectionLabel>3D dish preview</SectionLabel>
          <p className="mt-3 font-display text-2xl font-semibold tracking-tight text-indigo sm:text-3xl">
            Guests see the dish. You get the order.
          </p>
          <Body className="mt-4">
            Interactive 3D in the browser means fewer “what’s that?” questions and
            more confident tickets — without pulling a waiter over to explain the
            plate.
          </Body>
          <ol className="mt-8 space-y-5">
            {FLOW_STEPS.map((step, index) => (
              <FlowStep
                key={step.title}
                index={index + 1}
                title={step.title}
                detail={step.detail}
              />
            ))}
          </ol>
          <Body className="mt-6 text-xs text-ink/45">
            TODO: Real per-dish GLBs (&lt;100k tris, Draco). Poster triplet at
            /img/dish-poster (AVIF, WebP, JPG).
          </Body>
        </div>
      </Reveal>
    </div>
  );
}
