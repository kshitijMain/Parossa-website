import { Link } from "react-router-dom";
import { NAME } from "@/config/site";
import { DEMO_PATH } from "@/config/navigation";
import { Body, Button, Heading, Section } from "@/components/ui";

export default function NotFound() {
  return (
    <main>
      <Section className="py-20 text-center">
        <Heading level={1}>Page not found</Heading>
        <Body className="mx-auto mt-4 max-w-md text-ink/70">
          That link doesn&apos;t match a page on the {NAME} site. Try the home
          page or book a demo.
        </Body>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button to="/">Back to home</Button>
          <Button variant="secondary" to={DEMO_PATH}>
            Book a demo
          </Button>
        </div>
        <Body className="mt-6 text-sm text-ink/45">
          Legal:{" "}
          <Link
            to="/privacy"
            className="text-teal underline-offset-4 hover:underline"
          >
            Privacy
          </Link>
          {" · "}
          <Link
            to="/terms"
            className="text-teal underline-offset-4 hover:underline"
          >
            Terms
          </Link>
          {" · "}
          <Link
            to="/security"
            className="text-teal underline-offset-4 hover:underline"
          >
            Security
          </Link>
        </Body>
      </Section>
    </main>
  );
}
