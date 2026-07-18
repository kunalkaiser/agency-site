import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE_NAME, og } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Our WCAG 2.1 AA commitment, the measures behind it, known limitations stated honestly, and how to report a barrier.",
  openGraph: og("/accessibility"),
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
            `${SITE_NAME} is an education practice, and accessibility is part of how we think about everything we do — including this website. We are committed to a site usable by the widest possible audience, regardless of ability or technology, and we aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.`,
          ],
        },
        {
          heading: "Measures we take",
          list: [
            "Semantic HTML landmarks (header, navigation, main, footer) and a logical heading structure on every page.",
            "Full keyboard operability, including a skip-to-content link and visible focus indicators.",
            "Color contrast designed to meet WCAG AA ratios for text and interface elements.",
            "Form fields with programmatically associated labels and clear, inline error messages.",
            "Chat-style tools built with standard buttons and announced updates (aria-live regions), operable entirely by keyboard.",
            "Printable templates and plans that print cleanly without requiring interaction.",
            "Content written in plain language, with descriptive link text.",
          ],
        },
        {
          heading: "Known limitations",
          paragraphs: [
            "Honesty matters more than a perfect scorecard, so: our chat-style guided tools present multi-step conversational interfaces that, while keyboard-operable and screen-reader announced, are inherently more complex to navigate than a plain page — feedback from assistive-technology users is especially welcome there. Decorative emoji appear on some answer buttons; they are presentational, and the button text carries the meaning. And the third-party educational sites we link to are outside our control, and their accessibility varies.",
          ],
        },
        {
          heading: "Ongoing effort",
          paragraphs: [
            "Accessibility is not a one-time project. We review new tools and pages as they're added, and we revisit older ones as guidelines and best practices evolve. Reports from real users move to the top of the list.",
          ],
        },
        {
          heading: "Feedback",
          paragraphs: [
            "If you hit a barrier on this site — something you cannot read, reach by keyboard, or operate with your assistive technology — we genuinely want to know. Tell us through the contact page, including the page where it happened and what got in the way; we respond within 2 business days and work to fix problems promptly.",
          ],
        },
      ]}
    />
  );
}
