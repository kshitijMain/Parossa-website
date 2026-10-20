import { NAME } from "@/config/site";
import {
  LegalPage,
  LegalParagraph,
  LegalSection,
} from "@/components/layout/LegalPage";

export default function Security() {
  return (
    <LegalPage title={`Security — ${NAME}`}>
      <LegalSection title="Overview">
        <LegalParagraph>
          TODO: {NAME} is built for live orders and payments. This page summarises
          our security posture for restaurant owners — replace all statements
          below with accurate, counsel-reviewed copy before publication.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="SSL / HTTPS">
        <LegalParagraph>
          TODO: All traffic to {NAME} web properties and APIs is served over
          HTTPS with TLS. Describe certificate management, minimum TLS versions,
          and HSTS policy after review with your security team.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Data handling">
        <LegalParagraph>
          TODO: Explain encryption in transit and at rest, access controls,
          role-based permissions, audit logging, backup practices, and data
          residency. Align with your actual infrastructure and subprocessors.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Payment handling">
        <LegalParagraph>
          TODO: Guest payments are processed through certified payment partners;
          {NAME} does not store full card numbers on restaurant-facing systems.
          Describe PCI scope, tokenisation, and settlement flow with counsel and
          your payment provider.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Uptime & reliability">
        <LegalParagraph>
          TODO: Target uptime for production services (e.g. 99.9% monthly),
          maintenance windows, incident notification, and status page URL when
          available.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Reporting issues">
        <LegalParagraph>
          TODO: Provide a security contact channel and expected response times
          for vulnerability reports.
        </LegalParagraph>
      </LegalSection>
    </LegalPage>
  );
}
