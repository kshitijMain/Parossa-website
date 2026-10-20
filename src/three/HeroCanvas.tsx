import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import HeroScene from "./HeroScene";

function GradientPoster() {
  return (
    <div
      className="absolute inset-0 bg-gradient-to-br from-gold-from/25 via-cream to-indigo/10"
      aria-hidden="true"
    />
  );
}

type HeroCanvasProps = {
  className?: string;
};

/**
 * Lazy-loaded R3F canvas. Pauses the render loop when off-screen.
 * Does not mount until the parent decides live 3D is appropriate.
 */
export default function HeroCanvas({ className }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "10% 0px", threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const frameloop = !reducedMotion && inView ? "always" : "never";

  return (
    <div ref={containerRef} className={className}>
      <Suspense fallback={<GradientPoster />}>
        <Canvas
          className="h-full w-full touch-none"
          dpr={[1, 1.8]}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: true,
          }}
          camera={{ position: [0.35, 1.15, 4.2], fov: 38, near: 0.1, far: 40 }}
          frameloop={frameloop}
          shadows
        >
          <HeroScene />
        </Canvas>
      </Suspense>
    </div>
  );
}
