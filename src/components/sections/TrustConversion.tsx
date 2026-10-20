import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { NAME, contact } from "@/config/site";
import { DEMO_HREF } from "@/config/navigation";
import {
  Body,
  Button,
  Card,
  Eyebrow,
  FaqAccordion,
  Heading,
  Lead,
  LogoStrip,
  Reveal,
  Section,
  SectionLabel,
  Testimonial,
  TextLink,
} from "@/components/ui";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const TESTIMONIALS = [
  {
    quote:
      "TODO: We cut order errors in the first month — the kitchen finally sees what guests actually ordered.",
    author: "TODO: Owner name",
    role: "TODO: Owner, Restaurant, City",
  },
  {
    quote:
      "TODO: Table turns are faster because guests order and pay without waiting on us.",
    author: "TODO: General manager",
    role: "TODO: GM, Restaurant group",
  },
  {
    quote:
      "TODO: I finally know peak hours and prep times without guessing from a notebook.",
    author: "TODO: Operations lead",
    role: "TODO: Ops, Multi-outlet brand",
  },
] as const;

const FAQ_ITEMS = [
  {
    question: "TODO: How long does setup take?",
    answer:
      "TODO: Typical onboarding timeline — menu import, table QR rollout, kitchen display pairing, and staff walkthrough. Replace with real pilot numbers.",
  },
  {
    question: "TODO: What hardware do we need?",
    answer:
      "TODO: Tablets for tables, kitchen display screen, optional wrist devices for waiters — list actual supported hardware and BYOD options.",
  },
  {
    question: "TODO: What happens if the internet drops?",
    answer:
      "TODO: Offline behaviour — queued orders, local fallback, sync when back online. Replace with accurate product behaviour.",
  },
  {
    question: "TODO: How do payments work?",
    answer:
      "TODO: Payment partners, settlement flow, UPI/cards, and who holds funds. Replace with live integrations and compliance notes.",
  },
  {
    question: "TODO: Who owns our data?",
    answer:
      "TODO: Data ownership, export, retention, and restaurant access to analytics and guest feedback. Link to Privacy policy details.",
  },
] as const;

const TODO_TIERS = [
  { name: "TODO: Starter", note: "Single outlet" },
  { name: "TODO: Growth", note: "Multi-outlet" },
  { name: "TODO: Enterprise", note: "Custom rollout" },
] as const;

function contactHref(type: "email" | "tel") {
  if (type === "email") {
    return `mailto:${contact.email.replace(/^TODO:\s*/, "")}`;
  }
  return `tel:${contact.phone.replace(/^TODO:\s*/, "").replace(/\s/g, "")}`;
}

export function TrustConversion() {
  const { scrollTo } = useSmoothScroll();

  const scrollToDemo = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollTo(DEMO_HREF);
  };

  return (
    <>
      <Section id="pricing" className="border-t border-indigo/10">
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>Trust &amp; conversion</Eyebrow>
            <Heading level={2} className="mt-3">
              Built for live orders and payments
            </Heading>
            <Lead className="mt-5">
              {NAME} runs on your busiest Friday night — owners need proof it is
              reliable before they switch. Here is how we earn that trust.
            </Lead>
          </div>
        </Reveal>

        {/* Social proof */}
        <Reveal className="mt-14 sm:mt-16">
          <LogoStrip label="TODO: Early pilots and partners" />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-3">
          {TESTIMONIALS.map((item, index) => (
            <Reveal key={item.author} delay={index * 0.05}>
              <Testimonial {...item} className="h-full" />
            </Reveal>
          ))}
        </div>

        {/* Reliability */}
        <Reveal className="mt-14 sm:mt-16">
          <Card className="border-indigo/10 bg-cream/50">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                <SectionLabel>Reliability</SectionLabel>
                <Heading level={3} className="mt-2 text-xl sm:text-2xl">
                  Secure by default
                </Heading>
                <Body className="mt-3">
                  TODO: SSL/TLS in transit, encrypted data handling, role-based
                  access, and uptime targets for live order and payment flows.
                  Replace with accurate security and compliance copy before
                  launch.
                </Body>
              </div>
              <TextLink to="/security" className="shrink-0 text-sm sm:mt-8">
                Read our security overview →
              </TextLink>
            </div>
          </Card>
        </Reveal>

        {/* Plans */}
        <Reveal className="mt-14 sm:mt-16">
          <div className="max-w-2xl">
            <SectionLabel>Plans</SectionLabel>
            <Heading level={3} className="mt-2">
              Pricing that fits your floor
            </Heading>
            <Body className="mt-3">
              TODO: Transparent tiers when ready. Until then, the fastest path is
              a live walkthrough — we will map {NAME} to your outlets and
              volume.
            </Body>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {TODO_TIERS.map((tier) => (
              <Card
                key={tier.name}
                className="border-dashed border-indigo/20 bg-white/40 p-5 text-center"
                padded={false}
              >
                <p className="font-display text-base font-semibold text-indigo/70">
                  {tier.name}
                </p>
                <Body className="mt-1 text-sm text-ink/45">{tier.note}</Body>
                <Body className="mt-3 text-xs text-ink/40">
                  TODO: price / features
                </Body>
              </Card>
            ))}
          </div>

          <Card className="mt-6 border-indigo/15 bg-indigo p-8 text-center sm:p-10">
            <Heading level={3} className="text-cream">
              Request pricing on a live demo
            </Heading>
            <Body className="mx-auto mt-3 max-w-md text-cream/80">
              Every restaurant runs differently. Book a demo and we will walk
              through guest flow, kitchen ops, and a plan that matches your
              tables — no feature matrix required.
            </Body>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                href={DEMO_HREF}
                onClick={scrollToDemo}
              >
                Book a demo
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href={DEMO_HREF}
                onClick={scrollToDemo}
                className="border-cream/30 text-cream hover:bg-cream/10"
              >
                Request pricing
              </Button>
            </div>
          </Card>
        </Reveal>

        {/* FAQ */}
        <Reveal className="mt-14 sm:mt-16">
          <div className="max-w-2xl">
            <SectionLabel>FAQ</SectionLabel>
            <Heading level={3} className="mt-2">
              Questions owners ask before they switch
            </Heading>
          </div>
          <FaqAccordion items={[...FAQ_ITEMS]} className="mt-8" />
        </Reveal>

        {/* Contact */}
        <Reveal className="mt-14 sm:mt-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <SectionLabel>Contact</SectionLabel>
              <Heading level={3} className="mt-2">
                Talk to a human
              </Heading>
              <Body className="mt-3">
                Prefer email or a call? Reach us directly — same team that runs
                your demo.
              </Body>
            </div>
            <address className="not-italic">
              <Card className="space-y-4 p-6 sm:p-8">
                <div>
                  <Body className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/45">
                    Address
                  </Body>
                  <Body className="mt-1">{contact.address}</Body>
                </div>
                <div>
                  <Body className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/45">
                    Email
                  </Body>
                  <div className="mt-1">
                    <TextLink href={contactHref("email")}>
                      {contact.email}
                    </TextLink>
                  </div>
                </div>
                <div>
                  <Body className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/45">
                    Phone
                  </Body>
                  <div className="mt-1">
                    <TextLink href={contactHref("tel")}>{contact.phone}</TextLink>
                  </div>
                </div>
              </Card>
            </address>
          </div>
        </Reveal>
      </Section>

      {/* Final conversion band */}
      <Section className="bg-indigo py-14 sm:py-16">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Heading level={2} className="text-cream">
              Ready to run {NAME} on your floor?
            </Heading>
            <Lead className="mx-auto mt-4 text-cream/85">
              Book a demo — see live orders, kitchen flow, and pricing in one
              walkthrough.
            </Lead>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" href={DEMO_HREF} onClick={scrollToDemo}>
                Book a demo
              </Button>
              <Link
                to="/security"
                className="font-body text-sm text-cream/70 underline-offset-4 transition-colors hover:text-cream hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              >
                Security overview
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
