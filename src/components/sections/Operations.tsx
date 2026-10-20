import { NAME } from "@/config/site";
import { DEMO_HREF } from "@/config/navigation";
import {
  Body,
  Card,
  Eyebrow,
  Heading,
  Lead,
  Reveal,
  Section,
  SectionLabel,
  StatCallout,
} from "@/components/ui";
import { SectionNextStep } from "@/components/layout";
import { OperationsFlow } from "./OperationsFlow";

/**
 * Editable owner-outcome metrics for the Operations section.
 * Replace TODO values with real pilot numbers when available.
 */
export const OPERATIONS_STATS = [
  {
    value: "TODO: {X}%",
    label: "TODO: fewer order errors",
  },
  {
    value: "TODO: {Y} min",
    label: "TODO: faster table turns",
  },
  {
    value: "TODO: {Z}",
    label: "TODO: fewer steps per order",
  },
] as const;

const SUPPORT_CARDS = [
  {
    title: "Zero cashier round-trips",
    body: "Orders and payments stay digital — no walking tickets to a counter mid-service.",
  },
  {
    title: "Full audit trail",
    body: "Every waiter, kitchen, and manager action is logged and searchable — accountability without the paperwork chase.",
  },
  {
    title: "Fewer coordination staff",
    body: "The floor runs on signals, not shouting across the pass or hunting for who took the order.",
  },
  {
    title: "Reduced cashier dependency",
    body: "Paperless bills with print-on-request mean service doesn’t bottleneck at one till.",
  },
] as const;

export function Operations() {
  return (
    <Section id="operations">
      <Reveal>
        <div className="max-w-2xl">
          <Eyebrow>Operations</Eyebrow>
          <Heading level={2} className="mt-3">
            From order to serve — without the chaos in between
          </Heading>
          <Lead className="mt-5">
            {NAME} is the back-of-house engine: instant digital KOTs, a live
            kitchen display, wrist pings when food is ready, and paperless
            billing — so your team spends less time coordinating and more time
            serving.
          </Lead>
        </div>
      </Reveal>

      <Reveal className="mt-12 sm:mt-14">
        <Card className="overflow-hidden bg-cream/60 px-2 py-8 sm:px-4 sm:py-10">
          <SectionLabel className="mb-6 text-center">Live order path</SectionLabel>
          <OperationsFlow />
        </Card>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
        {SUPPORT_CARDS.map((card, index) => (
          <Reveal key={card.title} delay={index * 0.05}>
            <Card className="h-full p-5 sm:p-6">
              <Heading level={4} className="text-lg sm:text-xl">
                {card.title}
              </Heading>
              <Body className="mt-3 text-sm">{card.body}</Body>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14 sm:mt-16">
        <div className="rounded-2xl border border-dashed border-indigo/15 bg-white/50 px-6 py-8 sm:px-10 sm:py-10">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">
            TODO: Replace with pilot metrics — editable in{" "}
            <code className="text-indigo/60">OPERATIONS_STATS</code>
          </p>
          <div className="mt-8 grid gap-10 sm:grid-cols-3">
            {OPERATIONS_STATS.map((stat) => (
              <StatCallout
                key={stat.label}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </Reveal>

      <SectionNextStep
        label="See how this flow runs on your floor"
        href={DEMO_HREF}
        cta="Book a demo"
      />
    </Section>
  );
}
