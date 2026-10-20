import {
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
} & Omit<HTMLAttributes<HTMLDivElement>, "children" | "className">;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { y: 0 });
      return;
    }

    gsap.set(el, { y });

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: 0,
        duration: 0.7,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, y]);

  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  );
}
