import { NAME } from "@/config/site";
import {
  LegalPage,
  LegalParagraph,
  LegalSection,
} from "@/components/layout/LegalPage";

export default function Terms() {
  return (
    <LegalPage title={`Terms of Service — ${NAME}`}>
      <LegalSection title="Agreement">
        <LegalParagraph>
          TODO: These terms govern access to and use of the {NAME} platform by
          restaurants and authorised users. Replace with counsel-reviewed
          language before production use.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Service description">
        <LegalParagraph>
          TODO: Summarise the guest-experience platform — ordering, kitchen
          operations, payments, and analytics — and what is excluded (e.g.
          future delivery marketplace until separately offered).
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Accounts & acceptable use">
        <LegalParagraph>
          TODO: Account responsibilities, prohibited conduct, staff access,
          and restaurant obligations for guest-facing compliance (menus, pricing,
          allergens).
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Fees & payment">
        <LegalParagraph>
          TODO: Subscription or usage fees, invoicing, taxes, and payment
          partner terms for guest transactions processed through {NAME}.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <LegalParagraph>
          TODO: Warranties disclaimer, liability caps, indemnities, termination,
          and governing law — to be drafted by counsel.
        </LegalParagraph>
      </LegalSection>
    </LegalPage>
  );
}
