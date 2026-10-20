import { lazy, Suspense, type ReactNode } from "react";
import { NAME } from "@/config/site";
import { Body, Card, Eyebrow, Heading, Lead, Section } from "@/components/ui";
import { SectionNextStep } from "@/components/layout";
import { Hero } from "@/components/sections/Hero";

const GuestExperience = lazy(() =>
  import("@/components/sections/GuestExperience").then((module) => ({
    default: module.GuestExperience,
  })),
);
const Operations = lazy(() =>
  import("@/components/sections/Operations").then((module) => ({
    default: module.Operations,
  })),
);
const Analytics = lazy(() =>
  import("@/components/sections/Analytics").then((module) => ({
    default: module.Analytics,
  })),
);
const TrustConversion = lazy(() =>
  import("@/components/sections/TrustConversion").then((module) => ({
    default: module.TrustConversion,
  })),
);
const WhatsNext = lazy(() =>
  import("@/components/sections/WhatsNext").then((module) => ({
    default: module.WhatsNext,
  })),
);
const DemoRequest = lazy(() =>
  import("@/components/sections/DemoRequest").then((module) => ({
    default: module.DemoRequest,
  })),
);

function LazySection({
  children,
  minHeight = "min-h-[24rem]",
}: {
  children: ReactNode;
  minHeight?: string;
}) {
  return (
    <Suspense
      fallback={
        <div className={minHeight} aria-hidden="true" role="presentation" />
      }
    >
      {children}
    </Suspense>
  );
}

function PlaceholderSection({
  id,
  eyebrow,
  title,
  body,
  nextLabel,
  nextHref,
  nextCta,
}: {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  nextLabel: string;
  nextHref: string;
  nextCta?: string;
}) {
  return (
    <Section id={id}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading level={2} className="mt-3 max-w-3xl">
        {title}
      </Heading>
      <Lead className="mt-5">{body}</Lead>
      <Card className="mt-8 border-dashed">
        <Body className="text-ink/55">
          TODO: Section content for {title.toLowerCase()}.
        </Body>
      </Card>
      <SectionNextStep label={nextLabel} href={nextHref} cta={nextCta} />
    </Section>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />

      <PlaceholderSection
        id="platform"
        eyebrow="Platform"
        title="One platform from the table to the kitchen to the bill"
        body={`${NAME} connects guest ordering, kitchen tickets, payments, and analytics — so your team moves as one.`}
        nextLabel="See how guests experience it"
        nextHref="#guest-experience"
        nextCta="Guest experience"
      />

      <LazySection minHeight="min-h-[48rem]">
        <GuestExperience />
      </LazySection>

      <LazySection minHeight="min-h-[40rem]">
        <Operations />
      </LazySection>

      <LazySection minHeight="min-h-[40rem]">
        <Analytics />
      </LazySection>

      <LazySection minHeight="min-h-[48rem]">
        <TrustConversion />
      </LazySection>

      <LazySection minHeight="min-h-[16rem]">
        <WhatsNext />
      </LazySection>

      <LazySection minHeight="min-h-[32rem]">
        <DemoRequest />
      </LazySection>
    </main>
  );
}
