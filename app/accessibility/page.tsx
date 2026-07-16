import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "TrueCourse Education Group's website accessibility commitment and feedback channel.",
};

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility"
      lastUpdated="July 2026"
      sections={[
        {
          heading: "Our commitment",
          paragraphs: [
            `${SITE_NAME} is an education practice, and accessibility is part of how we think about everything we do — including this website. We are committed to providing a website that is usable by the widest possible audience, regardless of ability or technology, and we aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.`,
          ],
        },
        {
          heading: "Measures we take",
          list: [
            "Semantic HTML landmarks (header, navigation, main, footer) and a logical heading structure on every page.",
            "Full keyboard operability, including a skip-to-content link and visible focus indicators.",
            "Color contrast designed to meet WCAG AA ratios for text and interface elements.",
            "Form fields with programmatically associated labels and clear, inline error messages.",
            "Content written in plain language, with descriptive link text.",
          ],
        },
        {
          heading: "Known limitations",
          paragraphs: [
            "Some third-party components we embed or link to — such as external scheduling and form-processing tools — are outside our direct control, and their accessibility may vary. Where we identify problems with a third-party tool, we raise them with the provider or seek alternatives.",
          ],
        },
        {
          heading: "Ongoing effort",
          paragraphs: [
            "Accessibility is not a one-time project. We review the site as content is added and revisit earlier pages as guidelines and best practices evolve.",
          ],
        },
        {
          heading: "Feedback",
          paragraphs: [
            "If you encounter a barrier on this site — something you cannot read, reach by keyboard, or operate with your assistive technology — we genuinely want to know. Email hello@example.com with a description of the problem and the page where it occurred, and we will respond within 2 business days and work to fix it promptly.",
          ],
        },
      ]}
    />
  );
}
