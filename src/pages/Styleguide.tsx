import type { ReactNode } from "react";
import { NAME } from "@/config/site";
import {
  Badge,
  Body,
  Button,
  Card,
  Eyebrow,
  Heading,
  ImagePlaceholder,
  Lead,
  LogoStrip,
  Pill,
  Reveal,
  Section,
  StatCallout,
  Testimonial,
  TextLink,
} from "@/components/ui";

function DemoBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-6 border-b border-indigo/10 pb-16 last:border-b-0 last:pb-0">
      <Heading level={3} className="text-indigo/80">
        {title}
      </Heading>
      {children}
    </div>
  );
}

export default function Styleguide() {
  return (
    <main className="min-h-screen bg-cream">
      <Section className="border-b border-indigo/10 bg-white/40">
        <Eyebrow>Internal</Eyebrow>
        <Heading level={1} className="mt-3">
          {NAME} UI styleguide
        </Heading>
        <Lead className="mt-4">
          Review every reusable primitive. Gold leads the brand; indigo carries
          text and depth; teal is reserved for actions, links, and ready states.
        </Lead>
      </Section>

      <Section className="space-y-16">
        <DemoBlock title="Buttons">
          <div className="flex flex-wrap items-center gap-4">
            <Button>Book a demo</Button>
            <Button variant="secondary">See how it works</Button>
            <Button variant="ghost">Learn more</Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button size="sm">Book a demo</Button>
            <Button size="md">Book a demo</Button>
            <Button size="lg">Book a demo</Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button to="/">Router link</Button>
            <Button href="#typography">Anchor link</Button>
            <Button disabled>Disabled</Button>
          </div>
        </DemoBlock>

        <DemoBlock title="Links">
          <Body>
            Inline text uses teal only:{" "}
            <TextLink href="#cards">jump to cards</TextLink> or{" "}
            <TextLink to="/">return home</TextLink>.
          </Body>
        </DemoBlock>

        <DemoBlock title="Typography">
          <div id="typography" className="space-y-4">
            <Eyebrow>
              The all-in-one guest-experience platform for restaurants.
            </Eyebrow>
            <Heading level={1}>
              Turn more tables. Lose fewer orders. Delight every guest.
            </Heading>
            <Heading level={2}>From the table to the kitchen to the bill</Heading>
            <Heading level={3}>Your restaurant, running in flow</Heading>
            <Heading level={4}>Section heading</Heading>
            <Lead>
              {NAME} runs the whole journey — AR menu, self-ordering, kitchen,
              payments, and analytics — so your team moves faster and your guests
              come back.
            </Lead>
            <Body>
              Body copy stays airy and editorial. Lead with owner outcomes —
              faster table turns, fewer order errors, less wasted staff time —
              not a feature dump.
            </Body>
          </div>
        </DemoBlock>

        <DemoBlock title="Pills & badges">
          <div className="flex flex-wrap gap-3">
            <Pill>Gold brand</Pill>
            <Pill variant="indigo">Indigo depth</Pill>
            <Badge variant="success">Ready</Badge>
          </div>
        </DemoBlock>

        <DemoBlock title="Cards">
          <div id="cards" className="grid gap-6 md:grid-cols-2">
            <Card>
              <Heading level={4}>Faster table turns</Heading>
              <Body className="mt-3">
                Guests order and pay without waiting on a free waiter — your
                floor keeps moving.
              </Body>
            </Card>
            <Card>
              <Heading level={4}>Fewer order errors</Heading>
              <Body className="mt-3">
                Digital KOTs land on the kitchen display the moment a guest
                confirms.
              </Body>
            </Card>
          </div>
        </DemoBlock>

        <DemoBlock title="Stat callouts">
          <div className="grid gap-8 sm:grid-cols-3">
            <StatCallout />
            <StatCallout value="TODO: 2×" label="TODO: table turnover" />
            <StatCallout value="TODO: −40%" label="TODO: order errors" />
          </div>
        </DemoBlock>

        <DemoBlock title="Logo strip">
          <LogoStrip />
        </DemoBlock>

        <DemoBlock title="Testimonials">
          <div className="grid gap-6 md:grid-cols-2">
            <Testimonial />
            <Testimonial
              quote="TODO: Second pilot quote about happier guests and repeat visits."
              author="TODO: Manager name"
              role="TODO: Role, City"
            />
          </div>
        </DemoBlock>

        <DemoBlock title="Image placeholders">
          <div className="grid gap-6 md:grid-cols-2">
            <ImagePlaceholder aspectRatio="photo" />
            <ImagePlaceholder
              aspectRatio="video"
              caption="TODO: Product screenshot or short demo poster frame."
            />
          </div>
        </DemoBlock>

        <DemoBlock title="Reveal">
          <div className="space-y-6">
            <Reveal>
              <Card>
                <Heading level={4}>Scroll to reveal</Heading>
                <Body className="mt-3">
                  Fades in with a light lift via GSAP ScrollTrigger. Disabled
                  automatically when prefers-reduced-motion is set.
                </Body>
              </Card>
            </Reveal>
            <Reveal delay={0.1}>
              <Card className="bg-gold-gradient text-white">
                <Heading level={4} className="text-white">
                  Gold brand surface
                </Heading>
                <Body className="mt-3 text-white/90">
                  Dominant saffron/gold for brand moments — not teal fills.
                </Body>
              </Card>
            </Reveal>
            <Reveal delay={0.2}>
              <Card className="bg-indigo text-cream">
                <Heading level={4} className="text-cream">
                  Indigo depth
                </Heading>
                <Body className="mt-3 text-cream/85">
                  Trust and technology on dark sections.
                </Body>
              </Card>
            </Reveal>
          </div>
        </DemoBlock>

        <DemoBlock title="Section rhythm">
          <div className="rounded-2xl border border-dashed border-indigo/20 bg-white/40 p-6 sm:p-10">
            <Eyebrow>Section</Eyebrow>
            <Heading level={3} className="mt-3">
              Generous padding, max-width container
            </Heading>
            <Lead className="mt-4">
              Every page section should breathe. Primary action stays clear:
            </Lead>
            <div className="mt-8">
              <Button size="lg">Book a demo</Button>
            </div>
          </div>
        </DemoBlock>
      </Section>
    </main>
  );
}
