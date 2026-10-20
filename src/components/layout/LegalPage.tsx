import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { NAME, contact } from "@/config/site";
import { Body, Eyebrow, Heading, Section, TextLink } from "@/components/ui";

function contactHref(type: "email" | "tel") {
  if (type === "email") {
    return `mailto:${contact.email.replace(/^TODO:\s*/, "")}`;
  }
  return `tel:${contact.phone.replace(/^TODO:\s*/, "").replace(/\s/g, "")}`;
}

type LegalPageProps = {
  title: string;
  children: ReactNode;
  /** Show cookie / analytics notice (Privacy). */
  showCookieNotice?: boolean;
};

export function LegalPage({
  title,
  children,
  showCookieNotice = false,
}: LegalPageProps) {
  return (
    <main>
      <Section className="pb-20">
        <div className="max-w-3xl">
          <Eyebrow>Legal</Eyebrow>
          <Heading level={1} className="mt-3">
            {title}
          </Heading>
          <Body className="mt-3 text-sm text-ink/55">
            {NAME} · Last updated: TODO
          </Body>

          <div
            className="mt-8 rounded-xl border border-dashed border-gold-to/40 bg-gold-from/5 px-4 py-3"
            role="note"
          >
            <Body className="text-sm font-medium text-indigo">
              TODO: review with counsel before publication.
            </Body>
          </div>

          <div className="mt-10 space-y-10">{children}</div>

          {showCookieNotice ? (
            <section id="cookies" className="mt-12 scroll-mt-24">
              <LegalSection title="Cookies & analytics">
                <Body>
                  TODO: This site may use essential cookies for basic
                  functionality and optional analytics cookies to understand how
                  visitors use our marketing pages. Describe your analytics
                  provider, retention, and opt-out choices after review with
                  counsel.
                </Body>
              </LegalSection>
            </section>
          ) : null}

          <aside className="mt-12 border-t border-indigo/10 pt-8">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">
              Contact
            </p>
            <Body className="mt-3">{contact.address}</Body>
            <div className="mt-2">
              <TextLink href={contactHref("email")}>{contact.email}</TextLink>
            </div>
            <div className="mt-2">
              <TextLink href={contactHref("tel")}>{contact.phone}</TextLink>
            </div>
            <Body className="mt-6 text-sm text-ink/55">
              <Link
                to="/"
                className="font-medium text-teal underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              >
                Back to home
              </Link>
            </Body>
          </aside>
        </div>
      </Section>
    </main>
  );
}

type LegalSectionProps = {
  title: string;
  children: ReactNode;
  id?: string;
};

export function LegalSection({ title, children, id }: LegalSectionProps) {
  return (
    <section id={id} className={id ? "scroll-mt-24" : undefined}>
      <Heading level={2} className="text-2xl sm:text-3xl">
        {title}
      </Heading>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export function LegalParagraph({ children }: { children: ReactNode }) {
  return <Body className="leading-relaxed text-ink/80">{children}</Body>;
}
