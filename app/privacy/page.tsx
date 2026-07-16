import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How TrueCourse Education Group collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="July 2026"
      sections={[
        {
          heading: "What we collect",
          paragraphs: [
            `${SITE_NAME} collects only the information you choose to share with us. When you submit our contact form, we receive the details you enter: your name, email address, phone number (optional), your role, the service you're interested in, your message, and your preferred contact method.`,
            "Our website is a static informational site. We do not require accounts, and we do not collect payment information through this website.",
          ],
        },
        {
          heading: "How we use your information",
          list: [
            "To respond to your inquiry and discuss the services you asked about.",
            "To schedule and prepare for consultations you request.",
            "To send resources or updates you have explicitly signed up for.",
          ],
          paragraphs: [
            "We do not sell, rent, or trade your personal information, and we do not use it for third-party advertising.",
          ],
        },
        {
          heading: "Service providers",
          paragraphs: [
            "Contact form submissions are delivered to us by a third-party form-processing service, and consultations may be scheduled through a third-party scheduling service. These providers process your information only to deliver those functions on our behalf. We encourage you to review their privacy policies; provider names are available on request.",
          ],
        },
        {
          heading: "Students and children",
          paragraphs: [
            "Our services involve students, and we take that responsibility seriously. This website is intended for use by parents, guardians, educators, and students with appropriate consent. We do not knowingly collect personal information online from children under 13; if you believe a child has submitted information to us, contact us and we will delete it.",
            "Information about students shared with us in the course of providing services is used solely to deliver those services and is not disclosed except as agreed with the family or required by law.",
          ],
        },
        {
          heading: "Retention and security",
          paragraphs: [
            "We keep inquiry information only as long as needed to respond and to maintain a record of our engagement with you, after which it is deleted. We use reasonable administrative and technical safeguards to protect the information we hold, though no method of transmission or storage is completely secure.",
          ],
        },
        {
          heading: "Your choices",
          paragraphs: [
            "You may contact us at any time to ask what information we hold about you, request a correction, or request deletion. Email newsletters, if you subscribe, always include an unsubscribe option.",
          ],
        },
        {
          heading: "Questions",
          paragraphs: [
            "Questions about this policy can be sent to hello@example.com. If we update this policy, we will revise the date at the top of this page.",
          ],
        },
      ]}
    />
  );
}
