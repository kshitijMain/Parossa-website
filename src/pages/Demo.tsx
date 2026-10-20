import { Section } from "@/components/ui";
import { DemoRequest } from "@/components/sections/DemoRequest";

export default function Demo() {
  return (
    <main>
      <Section className="py-14 sm:py-16">
        <DemoRequest embedded={false} />
      </Section>
    </main>
  );
}
