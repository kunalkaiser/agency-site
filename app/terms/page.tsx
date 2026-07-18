import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE_NAME, og } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing use of the TrueCourse Education Group website.",
  openGraph: og("/terms"),
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      lastUpdated="July 2026"
      sections={[
        {
          heading: "About this site",
          paragraphs: [
            `This website is provided by ${SITE_NAME} for informational purposes: to describe our services, share educational resources, and let you contact us. By using the site, you agree to these terms.`,
            "Engagements for tutoring, college counseling, SETSS, or advocacy services are governed by separate written agreements between us and each family or organization — not by these website terms.",
          ],
        },
        {
          heading: "Educational information, not professional advice",
          paragraphs: [
            "Content on this site, including our guides and resources, is general educational information. It is not legal advice, medical advice, or a professional recommendation for any specific student, and it should not be relied on as a substitute for individualized guidance. Special education procedures and terminology vary by state and district.",
          ],
        },
        {
          heading: "No warranty",
          paragraphs: [
            "The site and its content are provided “as is” and “as available,” without warranties of any kind, express or implied, including accuracy, completeness, fitness for a particular purpose, or uninterrupted availability. We work to keep information current, but we do not guarantee it.",
          ],
        },
        {
          heading: "Limitation of liability",
          paragraphs: [
            `To the fullest extent permitted by law, ${SITE_NAME} will not be liable for any indirect, incidental, or consequential damages arising from your use of this website or reliance on its content.`,
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            `The content of this site — text, guides, and design — belongs to ${SITE_NAME}. You may download and share our resources for personal, non-commercial use with attribution; republishing or commercial use requires our written permission.`,
          ],
        },
        {
          heading: "Third-party links and services",
          paragraphs: [
            "The site may link to or embed third-party services, such as scheduling and form-processing tools. We are not responsible for third-party content or practices; your use of those services is governed by their own terms.",
          ],
        },
        {
          heading: "Governing law",
          paragraphs: [
            "These terms are governed by the laws of the State of New York, without regard to conflict-of-law principles.",
          ],
        },
        {
          heading: "Changes",
          paragraphs: [
            "We may update these terms from time to time; the date at the top of this page reflects the latest revision. Continued use of the site after changes constitutes acceptance. Questions can be sent to hello@example.com.",
          ],
        },
      ]}
    />
  );
}
