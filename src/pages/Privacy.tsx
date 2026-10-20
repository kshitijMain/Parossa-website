import { NAME } from "@/config/site";
import {
  LegalPage,
  LegalParagraph,
  LegalSection,
} from "@/components/layout/LegalPage";

export default function Privacy() {
  return (
    <LegalPage title={`Privacy Policy — ${NAME}`} showCookieNotice>
      <LegalSection title="Overview">
        <LegalParagraph>
          TODO: Describe what personal data {NAME} collects from restaurant
          owners, staff, and guests; why it is processed; and the lawful bases
          for processing. Review with counsel before launch.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Data we collect">
        <LegalParagraph>
          TODO: List categories — account and contact details, order and payment
          metadata, device and usage logs, guest feedback, and restaurant
          operational analytics.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="How we use data">
        <LegalParagraph>
          TODO: Explain use for providing the platform, support, billing,
          security, product improvement, and legal compliance.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Sharing & retention">
        <LegalParagraph>
          TODO: Sub-processors, payment partners, retention periods, and
          cross-border transfers if applicable.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Your rights">
        <LegalParagraph>
          TODO: Access, correction, deletion, and regional rights (e.g. India
          DPDP, GDPR where applicable). Include how to exercise rights via{" "}
          {NAME} contact details.
        </LegalParagraph>
      </LegalSection>
    </LegalPage>
  );
}
