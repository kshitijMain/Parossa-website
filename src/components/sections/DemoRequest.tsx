/**
 * Demo request form — primary site conversion point (#demo on Home, /demo route).
 *
 * Submits via Formspree (static-friendly). Set VITE_FORMSPREE_ID in .env — see
 * .env.example. TODO: Create a Formspree form and paste the form ID before launch.
 *
 * Netlify Forms alternative (if deploying on Netlify):
 * - Add `data-netlify="true" netlify-honeypot="bot-field"` to the <form>.
 * - Include a hidden `<input type="hidden" name="form-name" value="demo" />`.
 * - Add a static `public/demo.html` with the same fields for build-time detection.
 * - POST to `/` instead of Formspree; remove the fetch handler below.
 * - See https://docs.netlify.com/forms/setup/
 */
import {
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { NAME } from "@/config/site";
import {
  Body,
  Button,
  Eyebrow,
  Field,
  Heading,
  Input,
  Lead,
  Pill,
  Section,
  Textarea,
} from "@/components/ui";

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

type FormValues = {
  name: string;
  restaurant: string;
  city: string;
  role: string;
  phone: string;
  email: string;
  outlets: string;
  message: string;
  website: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL: FormValues = {
  name: "",
  restaurant: "",
  city: "",
  role: "",
  phone: "",
  email: "",
  outlets: "",
  message: "",
  website: "",
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!values.restaurant.trim())
    errors.restaurant = "Enter your restaurant name.";
  if (!values.city.trim()) errors.city = "Enter your city.";
  if (!values.role.trim()) errors.role = "Enter your role.";

  const phone = values.phone.trim();
  if (!phone) {
    errors.phone = "Enter a phone number.";
  } else if (!/^[\d\s+\-()]{8,}$/.test(phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = "Enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  const outlets = Number(values.outlets);
  if (!values.outlets.trim()) {
    errors.outlets = "Enter the number of outlets.";
  } else if (!Number.isInteger(outlets) || outlets < 1) {
    errors.outlets = "Enter at least 1 outlet.";
  }

  return errors;
}

function DemoSuccess() {
  return (
    <div
      role="status"
      className="rounded-2xl border-2 border-teal/30 bg-teal/5 p-8 sm:p-10"
      aria-live="polite"
    >
      <div className="flex flex-wrap items-center gap-3">
        <Pill variant="success">Request received</Pill>
      </div>
      <Heading level={3} className="mt-4 text-indigo">
        Thank you — we&apos;re on it.
      </Heading>
      <Body className="mt-3 text-base text-ink/80">
        Your demo request for {NAME} is in our queue. Here&apos;s what happens
        next:
      </Body>
      <ol className="mt-6 space-y-3">
        {[
          "We review your restaurant details and reach out within one business day.",
          "You get a live walkthrough tailored to your floor — guest flow, kitchen, and pricing.",
          "We answer setup, hardware, and rollout questions before you commit.",
        ].map((step, index) => (
          <li key={step} className="flex gap-3">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal font-body text-xs font-semibold text-white"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <Body className="text-sm text-ink/75">{step}</Body>
          </li>
        ))}
      </ol>
    </div>
  );
}

type DemoRequestProps = {
  /** When true, uses full Section wrapper (Home embed). When false, content only. */
  embedded?: boolean;
};

export function DemoRequest({ embedded = true }: DemoRequestProps) {
  const formId = useId();
  const summaryRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<FormValues>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const configured = Boolean(FORMSPREE_ID?.trim());

  const update =
    (field: keyof FormValues) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    if (values.website.trim()) {
      setStatus("success");
      return;
    }

    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("idle");
      summaryRef.current?.focus();
      return;
    }

    if (!configured) {
      setSubmitError(
        "TODO: Set VITE_FORMSPREE_ID in .env — create a form at formspree.io and paste the ID.",
      );
      setStatus("error");
      summaryRef.current?.focus();
      return;
    }

    setStatus("submitting");
    setErrors({});

    try {
      const response = await fetch(
        `https://formspree.io/f/${FORMSPREE_ID}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name.trim(),
            restaurant: values.restaurant.trim(),
            city: values.city.trim(),
            role: values.role.trim(),
            phone: values.phone.trim(),
            email: values.email.trim(),
            outlets: values.outlets.trim(),
            message: values.message.trim(),
            _subject: `${NAME} demo request — ${values.restaurant.trim()}`,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Submit failed");
      }

      setStatus("success");
      setValues(INITIAL);
    } catch {
      setStatus("error");
      setSubmitError(
        "Something went wrong sending your request. Please try again or email us directly.",
      );
      summaryRef.current?.focus();
    }
  };

  const content = (
    <>
      <div className="max-w-2xl">
        <Eyebrow>Book a demo</Eyebrow>
        <Heading level={2} className="mt-3" id="demo-heading">
          See {NAME} on your floor
        </Heading>
        <Lead className="mt-5">
          Tell us about your restaurant. We&apos;ll walk you through the full
          guest journey — from QR scan to kitchen to bill — and map pricing to
          your outlets.
        </Lead>
      </div>

      <div className="mt-10 max-w-2xl">
        {status === "success" ? (
          <DemoSuccess />
        ) : (
          <div className="rounded-2xl border border-indigo/10 bg-white/80 p-6 shadow-lg shadow-indigo/5 sm:p-8">
            {!configured ? (
              <Body
                className="mb-6 rounded-xl border border-dashed border-gold-to/40 bg-gold-from/5 px-4 py-3 text-sm text-indigo/80"
                role="status"
              >
                TODO: Add{" "}
                <code className="text-indigo">VITE_FORMSPREE_ID</code> to{" "}
                <code className="text-indigo">.env</code> (see{" "}
                <code className="text-indigo">.env.example</code>). Form UI is
                ready; submissions need a Formspree form ID.
              </Body>
            ) : null}

            <div
              ref={summaryRef}
              tabIndex={-1}
              className="outline-none"
              aria-live="assertive"
            >
              {(Object.keys(errors).length > 0 || submitError) && (
                <div
                  role="alert"
                  className="mb-6 rounded-xl border border-indigo/20 bg-indigo/5 px-4 py-3"
                >
                  <p className="font-body text-sm font-semibold text-indigo">
                    Please fix the following:
                  </p>
                  <ul className="mt-2 list-inside list-disc font-body text-sm text-ink/75">
                    {Object.values(errors).map((msg) => (
                      <li key={msg}>{msg}</li>
                    ))}
                    {submitError ? <li>{submitError}</li> : null}
                  </ul>
                </div>
              )}
            </div>

            <form
              id={formId}
              onSubmit={handleSubmit}
              noValidate
              className="relative grid gap-5 sm:grid-cols-2"
            >
              <Field label="Your name" id="demo-name" error={errors.name} required>
                <Input
                  id="demo-name"
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={update("name")}
                  hasError={Boolean(errors.name)}
                  aria-invalid={Boolean(errors.name)}
                  required
                />
              </Field>

              <Field
                label="Restaurant name"
                id="demo-restaurant"
                error={errors.restaurant}
                required
              >
                <Input
                  id="demo-restaurant"
                  name="restaurant"
                  autoComplete="organization"
                  value={values.restaurant}
                  onChange={update("restaurant")}
                  hasError={Boolean(errors.restaurant)}
                  aria-invalid={Boolean(errors.restaurant)}
                  required
                />
              </Field>

              <Field label="City" id="demo-city" error={errors.city} required>
                <Input
                  id="demo-city"
                  name="city"
                  autoComplete="address-level2"
                  value={values.city}
                  onChange={update("city")}
                  hasError={Boolean(errors.city)}
                  aria-invalid={Boolean(errors.city)}
                  required
                />
              </Field>

              <Field label="Your role" id="demo-role" error={errors.role} required>
                <Input
                  id="demo-role"
                  name="role"
                  placeholder="Owner, GM, Ops…"
                  value={values.role}
                  onChange={update("role")}
                  hasError={Boolean(errors.role)}
                  aria-invalid={Boolean(errors.role)}
                  required
                />
              </Field>

              <Field label="Phone" id="demo-phone" error={errors.phone} required>
                <Input
                  id="demo-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={update("phone")}
                  hasError={Boolean(errors.phone)}
                  aria-invalid={Boolean(errors.phone)}
                  required
                />
              </Field>

              <Field label="Email" id="demo-email" error={errors.email} required>
                <Input
                  id="demo-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={update("email")}
                  hasError={Boolean(errors.email)}
                  aria-invalid={Boolean(errors.email)}
                  required
                />
              </Field>

              <Field
                label="Number of outlets"
                id="demo-outlets"
                error={errors.outlets}
                required
              >
                <Input
                  id="demo-outlets"
                  name="outlets"
                  type="number"
                  min={1}
                  inputMode="numeric"
                  value={values.outlets}
                  onChange={update("outlets")}
                  hasError={Boolean(errors.outlets)}
                  aria-invalid={Boolean(errors.outlets)}
                  required
                />
              </Field>

              <div className="sm:col-span-2">
                <Field
                  label="Message"
                  id="demo-message"
                  hint="Optional — peak hours, current POS, rollout timeline…"
                >
                  <Textarea
                    id="demo-message"
                    name="message"
                    value={values.message}
                    onChange={update("message")}
                  />
                </Field>
              </div>

              {/* Honeypot — hidden from users and assistive tech */}
              <div
                className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
                aria-hidden="true"
              >
                <label htmlFor="demo-website">Website</label>
                <input
                  id="demo-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.website}
                  onChange={update("website")}
                />
              </div>

              <div className="sm:col-span-2">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending…" : "Book a demo"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );

  if (!embedded) {
    return (
      <div id="demo" tabIndex={-1} className="scroll-mt-24">
        {content}
      </div>
    );
  }

  return (
    <Section
      id="demo"
      tabIndex={-1}
      className="scroll-mt-24 border-t-4 border-gold-to/80 bg-gradient-to-b from-gold-from/5 via-cream to-cream"
      aria-labelledby="demo-heading"
    >
      {content}
    </Section>
  );
}
