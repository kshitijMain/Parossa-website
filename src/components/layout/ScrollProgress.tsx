import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export function ScrollProgress() {
  const { progress } = useSmoothScroll();

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 bg-indigo/5"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div
        className="h-full origin-left bg-gold-gradient transition-none"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
