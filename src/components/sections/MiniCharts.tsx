import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const BAR_VALUES = [0.55, 0.82, 0.68, 0.94, 0.72];
const BAR_LABELS = ["A", "B", "C", "D", "E"];

/** Lightweight SVG bar chart — orders by waiter. Animates once on scroll-in. */
export function OrdersByWaiterChart() {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(SVGRectElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const bars = barRefs.current.filter(Boolean) as SVGRectElement[];
    const maxH = 64;

    if (prefersReducedMotion()) {
      bars.forEach((bar, i) => {
        const h = BAR_VALUES[i] * maxH;
        gsap.set(bar, { attr: { height: h, y: 72 - h } });
      });
      return;
    }

    bars.forEach((bar) => gsap.set(bar, { attr: { height: 0, y: 72 } }));

    const ctx = gsap.context(() => {
      bars.forEach((bar, i) => {
        const h = BAR_VALUES[i] * maxH;
        gsap.to(bar, {
          attr: { height: h, y: 72 - h },
          duration: 0.7,
          delay: i * 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="rounded-xl border border-indigo/10 bg-cream/80 p-4"
    >
      <p className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink/50">
        Orders by waiter
      </p>
      <p className="mt-0.5 font-body text-[0.65rem] text-ink/40">
        TODO: live pilot data
      </p>
      <svg
        viewBox="0 0 160 96"
        className="mt-3 h-24 w-full"
        role="img"
        aria-label="Bar chart of orders by waiter"
      >
        {BAR_VALUES.map((_, i) => {
          const x = 16 + i * 28;
          return (
            <g key={BAR_LABELS[i]}>
              <rect
                ref={(el) => {
                  barRefs.current[i] = el;
                }}
                x={x}
                y={72}
                width="16"
                height="0"
                rx="3"
                fill={i % 2 === 0 ? "#F5A623" : "#E8821E"}
              />
              <text
                x={x + 8}
                y={90}
                textAnchor="middle"
                className="fill-indigo/50"
                style={{
                  fontSize: "9px",
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                {BAR_LABELS[i]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** Prep-time line trending down. Stroke draws once on scroll-in. */
export function PrepTimeTrendChart() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const areaRef = useRef<SVGPathElement>(null);

  // Downward trend points in viewBox 0 0 160 96
  const linePath = "M12 28 C 40 30, 55 42, 78 38 S 120 58, 148 62";
  const areaPath = `${linePath} L148 80 L12 80 Z`;

  useEffect(() => {
    const root = rootRef.current;
    const path = pathRef.current;
    const area = areaRef.current;
    if (!root || !path) return;

    const length = path.getTotalLength();

    if (prefersReducedMotion()) {
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: 0 });
      if (area) gsap.set(area, { autoAlpha: 0.2 });
      return;
    }

    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    if (area) gsap.set(area, { autoAlpha: 0 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      tl.to(path, {
        strokeDashoffset: 0,
        duration: 1,
        ease: "power2.out",
      });

      if (area) {
        tl.to(area, { autoAlpha: 0.2, duration: 0.4 }, "-=0.35");
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="rounded-xl border border-indigo/10 bg-cream/80 p-4"
    >
      <p className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink/50">
        Prep time trending down
      </p>
      <p className="mt-0.5 font-body text-[0.65rem] text-ink/40">
        TODO: live pilot data
      </p>
      <svg
        viewBox="0 0 160 96"
        className="mt-3 h-24 w-full"
        role="img"
        aria-label="Line chart showing prep time trending down"
      >
        <path
          ref={areaRef}
          d={areaPath}
          fill="#1B2A6B"
          opacity={0}
        />
        <path
          ref={pathRef}
          d={linePath}
          fill="none"
          stroke="#1DB47A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="148" cy="62" r="3.5" fill="#1DB47A" />
      </svg>
    </div>
  );
}
