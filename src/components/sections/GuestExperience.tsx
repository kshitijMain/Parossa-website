import clsx from "clsx";
import { lazy, Suspense } from "react";
import { NAME } from "@/config/site";
import { DEMO_HREF } from "@/config/navigation";
import {
  Body,
  Eyebrow,
  Heading,
  ImagePlaceholder,
  Lead,
  Reveal,
  Section,
  SectionLabel,
} from "@/components/ui";
import { SectionNextStep } from "@/components/layout";

const DishPreview = lazy(() =>
  import("./DishPreview").then((module) => ({ default: module.DishPreview })),
);

type Feature = {
  id: string;
  eyebrow: string;
  title: string;
  caption: string;
  points: string[];
  screenshot: string;
  reverse?: boolean;
};

const FEATURES: Feature[] = [
  {
    id: "tablet",
    eyebrow: "On-table tablet",
    title: "Guests help themselves — your floor stays free",
    caption:
      "Reorder past favourites and one-tap service calls mean fewer interruptions for water, cutlery, the bill, or a waiter — staff focus on hospitality, not errands.",
    points: [
      "Reorder past items in one tap",
      "Service calls: water, bill, cutlery, call waiter, take order",
    ],
    screenshot:
      "TODO: Product screenshot — on-table tablet with reorder and service-call buttons",
  },
  {
    id: "suggestions",
    eyebrow: "Smart suggestions",
    title: "Higher tickets without a hard sell",
    caption:
      "Bestsellers and AI recommendations do the upselling — diet-aware, allergen-safe, and margin-smart — so average order value rises without extra waiter time.",
    points: [
      "Most-ordered bestsellers front and centre",
      "AI recs for veg / non-veg / Jain / egg, allergens, and spice level",
      "Course sequencing, complementary pairings, and season’s best",
      "Whole-cart balancing, repeat-guest personalisation, margin-led upsell",
    ],
    screenshot:
      "TODO: Product screenshot — smart suggestions and diet-aware recommendations",
    reverse: true,
  },
  {
    id: "voice",
    eyebrow: "Voice search",
    title: "Faster ordering, less menu friction",
    caption:
      "A mic on the menu lets guests find dishes by voice — fewer stalled tables and less time spent hunting through categories.",
    points: ["Mic affordance on the menu", "Speak a dish, spice, or craving"],
    screenshot:
      "TODO: Product screenshot — menu voice search with microphone affordance",
  },
  {
    id: "self-serve",
    eyebrow: "Self-order & pay",
    title: "Tables turn when guests are ready — not when staff are free",
    caption:
      "Self-service ordering and payment cut the wait for a free waiter and the chase for the bill — faster turns, happier guests, more covers per night.",
    points: ["Order from the table without waiting", "Pay when they are done"],
    screenshot:
      "TODO: Product screenshot — self-order cart and paperless payment flow",
    reverse: true,
  },
];

function FeatureRow({ feature, delay }: { feature: Feature; delay: number }) {
  const media = (
    <Reveal delay={delay}>
      <ImagePlaceholder
        aspectRatio="photo"
        alt={`${feature.eyebrow} product screenshot placeholder`}
        caption={feature.screenshot}
      />
    </Reveal>
  );

  const copy = (
    <Reveal delay={delay + 0.06}>
      <div className="max-w-lg lg:py-4">
        <SectionLabel>{feature.eyebrow}</SectionLabel>
        <Heading level={3} className="mt-3">
          {feature.title}
        </Heading>
        <Body className="mt-4 text-base sm:text-lg">{feature.caption}</Body>
        <ul className="mt-6 space-y-2.5">
          {feature.points.map((point) => (
            <li key={point} className="flex gap-3">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-to"
                aria-hidden="true"
              />
              <Body className="text-sm text-ink/70">{point}</Body>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );

  return (
    <div
      id={feature.id}
      className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
    >
      <div className={clsx(feature.reverse && "lg:order-2")}>{media}</div>
      <div className={clsx(feature.reverse && "lg:order-1")}>{copy}</div>
    </div>
  );
}

export function GuestExperience() {
  return (
    <Section id="guest-experience" className="bg-white/40">
      <Reveal>
        <div className="max-w-2xl">
          <Eyebrow>Guest experience</Eyebrow>
          <Heading level={2} className="mt-3">
            Delight at the table. Outcomes on your P&amp;L.
          </Heading>
          <Lead className="mt-5">
            Every guest-facing moment in {NAME} is built to give owners fewer
            staff interruptions, faster ordering, and a higher average order
            value — not a longer feature list.
          </Lead>
        </div>
      </Reveal>

      {/* Signature 3D moment */}
      <div className="mt-16 sm:mt-20 lg:mt-24">
        <Suspense
          fallback={
            <div
              className="min-h-[28rem] rounded-2xl border border-dashed border-indigo/10 bg-indigo/[0.02]"
              aria-hidden="true"
              role="presentation"
            />
          }
        >
          <DishPreview />
        </Suspense>
      </div>

      {/* Alternating proof rows */}
      <div className="mt-20 space-y-20 sm:mt-24 sm:space-y-24 lg:mt-28 lg:space-y-28">
        {FEATURES.map((feature, index) => (
          <FeatureRow
            key={feature.id}
            feature={feature}
            delay={index * 0.02}
          />
        ))}
      </div>

      <SectionNextStep
        label="Ready to see the full guest journey on your floor?"
        href={DEMO_HREF}
        cta="Book a demo"
      />
    </Section>
  );
}
