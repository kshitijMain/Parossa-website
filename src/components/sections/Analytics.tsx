import { NAME } from "@/config/site";
import {
  Body,
  Card,
  Eyebrow,
  Heading,
  ImagePlaceholder,
  Lead,
  Pill,
  Reveal,
  Section,
  SectionLabel,
} from "@/components/ui";
import { SectionNextStep } from "@/components/layout";
import { OrdersByWaiterChart, PrepTimeTrendChart } from "./MiniCharts";

const METRIC_CHIPS = [
  "Bestsellers",
  "Sales",
  "Peak hours",
  "Table turnover",
  "Prep times",
  "Orders per waiter",
] as const;

const DISH_REVIEWS = [
  {
    dish: "TODO: Butter chicken",
    rating: "TODO: 4.8",
    quote:
      "TODO: Guest note from digital-bill feedback — rich gravy, perfect spice.",
  },
  {
    dish: "TODO: Paneer tikka",
    rating: "TODO: 4.6",
    quote:
      "TODO: Guest note — smoky, soft, would order again on the next visit.",
  },
] as const;

function DishReviewCard({
  dish,
  rating,
  quote,
}: (typeof DISH_REVIEWS)[number]) {
  return (
    <Card className="h-full p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="font-display text-base font-semibold text-indigo">
          {dish}
        </p>
        <Pill variant="gold" className="shrink-0">
          {rating}
        </Pill>
      </div>
      <Body className="mt-3 text-sm italic text-ink/70">“{quote}”</Body>
      <Body className="mt-4 text-xs uppercase tracking-[0.12em] text-ink/40">
        Via digital bill feedback
      </Body>
    </Card>
  );
}

export function Analytics() {
  return (
    <Section id="analytics" className="bg-white/40">
      <Reveal>
        <div className="max-w-2xl">
          <Eyebrow>Analytics &amp; reviews</Eyebrow>
          <Heading level={2} className="mt-3">
            Decisions, backed by data.
          </Heading>
          <Lead className="mt-5">
            Know what sells, when you’re slammed, who’s fast, and what to push —
            so {NAME} turns every service into clearer calls for the next one.
          </Lead>
        </div>
      </Reveal>

      {/* Owner dashboard visual */}
      <div className="mt-12 grid items-start gap-8 lg:mt-16 lg:grid-cols-5 lg:gap-10">
        <Reveal className="lg:col-span-3">
          <ImagePlaceholder
            aspectRatio="video"
            alt="Owner analytics dashboard screenshot placeholder"
            caption="TODO: Owner dashboard screenshot — sales, peak hours, and table turnover at a glance"
          />
        </Reveal>

        <div className="flex flex-col gap-4 lg:col-span-2">
          <Reveal delay={0.06}>
            <OrdersByWaiterChart />
          </Reveal>
          <Reveal delay={0.1}>
            <PrepTimeTrendChart />
          </Reveal>
        </div>
      </div>

      {/* Metric chips */}
      <Reveal className="mt-10 sm:mt-12">
        <SectionLabel>What you can see</SectionLabel>
        <ul className="mt-4 flex flex-wrap gap-2.5">
          {METRIC_CHIPS.map((chip) => (
            <li key={chip}>
              <Pill variant="indigo">{chip}</Pill>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Reviews */}
      <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="max-w-lg">
            <SectionLabel>Per-dish reviews</SectionLabel>
            <Heading level={3} className="mt-3">
              Feedback that builds itself
            </Heading>
            <Body className="mt-4 text-base sm:text-lg">
              Guests who take a digital bill get a short feedback link. Over
              time that becomes a per-dish review base — so you know what to
              push, fix, or feature without chasing paper comment cards.
            </Body>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {DISH_REVIEWS.map((review, index) => (
            <Reveal key={review.dish} delay={0.06 + index * 0.05}>
              <DishReviewCard {...review} />
            </Reveal>
          ))}
        </div>
      </div>

      <SectionNextStep
        label="Ready to run your floor on real numbers?"
        href="#pricing"
        cta="Pricing"
      />
    </Section>
  );
}
