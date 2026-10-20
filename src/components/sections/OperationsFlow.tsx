import { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export const FLOW_STEPS = [
  "Order on tablet",
  "Instant digital KOT",
  "Kitchen Display",
  "Chef marks done",
  "Ping on waiter’s wrist",
  "Served",
  "Paperless bill",
] as const;

const STEP_COUNT = FLOW_STEPS.length;
const START_X = 48;
const END_X = 952;
const Y = 56;
const STEP_GAP = (END_X - START_X) / (STEP_COUNT - 1);

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function OperationsFlow() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const tokenRef = useRef<SVGCircleElement>(null);
  const nodeRefs = useRef<(SVGGElement | null)[]>([]);
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    const root = rootRef.current;
    const path = pathRef.current;
    const token = tokenRef.current;
    if (!root || !path || !token) return;

    if (prefersReducedMotion()) {
      gsap.set(token, { autoAlpha: 1 });
      gsap.set(nodeRefs.current, { autoAlpha: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(token, { autoAlpha: 1 });
      gsap.set(nodeRefs.current, { autoAlpha: 0.35 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          end: "bottom 45%",
          scrub: 0.6,
        },
      });

      tl.to(
        token,
        {
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
          ease: "none",
          duration: 1,
        },
        0,
      );

      nodeRefs.current.forEach((node, index) => {
        if (!node) return;
        const at = index / (STEP_COUNT - 1);
        tl.to(
          node,
          { autoAlpha: 1, duration: 0.08, ease: "none" },
          Math.max(0, at - 0.04),
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const pathD = `M ${START_X} ${Y} H ${END_X}`;

  return (
    <div ref={rootRef} className="w-full">
      <div className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <svg
          viewBox="0 0 1000 200"
          className="mx-auto h-auto w-full min-w-[48rem] max-w-5xl"
          role="img"
          aria-label="Order flow from tablet to paperless bill"
        >
          <title>Back-of-house order flow</title>
          <defs>
            <linearGradient
              id={`${uid}-line`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#F5A623" />
              <stop offset="100%" stopColor="#E8821E" />
            </linearGradient>
            <filter
              id={`${uid}-glow`}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Track */}
          <path
            d={pathD}
            fill="none"
            stroke="#1B2A6B"
            strokeOpacity="0.12"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke={`url(#${uid}-line)`}
            strokeWidth="3"
            strokeLinecap="round"
            strokeOpacity="0.35"
          />

          {FLOW_STEPS.map((label, index) => {
            const x = START_X + STEP_GAP * index;
            return (
              <g
                key={label}
                ref={(el) => {
                  nodeRefs.current[index] = el;
                }}
              >
                <circle
                  cx={x}
                  cy={Y}
                  r="11"
                  fill="#FBF7F1"
                  stroke="#1B2A6B"
                  strokeWidth="2"
                />
                <circle cx={x} cy={Y} r="4.5" fill="#E8821E" />
                <text
                  x={x}
                  y={Y + 36}
                  textAnchor="middle"
                  className="fill-indigo font-body text-[11px]"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  {label.split(" ").map((word, wordIndex, words) => (
                    <tspan
                      key={`${label}-${word}`}
                      x={x}
                      dy={wordIndex === 0 ? 0 : 14}
                    >
                      {wordIndex === words.length - 1 && index === STEP_COUNT - 1
                        ? `${word}*`
                        : word}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}

          {/* Travelling token */}
          <circle
            ref={tokenRef}
            r="9"
            fill="#F5A623"
            stroke="#E8821E"
            strokeWidth="2"
            filter={`url(#${uid}-glow)`}
            cx={START_X}
            cy={Y}
            opacity={0}
          />
        </svg>
      </div>
      <p className="mt-2 text-center font-body text-xs text-ink/45">
        *Print on request
      </p>
    </div>
  );
}
