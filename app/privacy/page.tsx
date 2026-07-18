import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE_NAME, og } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What this site actually collects (very little), how the two forms work, and why the free tools transmit nothing. Draft pending attorney review.",
  openGraph: og("/privacy"),
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="July 2026"
      sections={[
        {
          heading: "The short version",
          paragraphs: [
            `This is a static website with no accounts and no logins. The only personal information ${SITE_NAME} receives through it is what you choose to type into two optional forms — the contact form and the newsletter signup. The free tools run entirely in your browser and send us nothing. We set no cookies. That's genuinely most of the policy; the details follow.`,
          ],
        },
        {
          heading: "No accounts, no profiles",
          paragraphs: [
            "You cannot create an account on this site, and we do not build profiles of visitors. Reading articles, running the free tools, and printing templates require no information from you at all.",
          ],
        },
        {
          heading: "The two forms, and what they collect",
          paragraphs: [
            "The contact form collects what you enter: your name, email address, phone number (optional), your role, the service you're interested in, your message, and your preferred contact method. We use it for exactly one thing — responding to you about your inquiry.",
            "The newsletter form collects your email address only. We use it to send the newsletter — about one email a month when there's a new free tool or guide — and every issue includes an unsubscribe link. Unsubscribe any time and we stop.",
            "Both forms are delivered to us by Netlify, the service that hosts this site; submissions are processed and stored by Netlify on our behalf and read by us. We do not sell, rent, or trade your information, and we do not use it for advertising.",
          ],
        },
        {
          heading: "Cookies",
          paragraphs: [
            "We set no cookies. There is no cookie banner on this site because there is nothing for it to announce.",
          ],
        },
        {
          heading: "Analytics",
          paragraphs: [
            "The site is built to support privacy-preserving analytics (Cloudflare Web Analytics), which counts page views in aggregate without cookies, without persistent identifiers, and without tracking you across other sites. As of the date above, this may be switched off entirely — the site works identically either way. If enabled, it tells us things like “the study coach page was viewed 200 times this week,” and nothing about you personally.",
          ],
        },
        {
          heading: "The free tools send us nothing",
          paragraphs: [
            "The interactive tools — the Study Coach, Study Plan Builder, SAT Schedule Builder, guided toolkits, and service-fit chooser — run entirely in your web browser. Grades, scores, topics, and anything else you type or tap stay on your device, are never transmitted to us or anyone else, and disappear when you close the tab. We could not read them if we wanted to.",
          ],
        },
        {
          heading: "Children's privacy",
          paragraphs: [
            "Outside the two forms described above — which are intended for adults — this site collects no personal information from anyone, including children. Students of any age can use the free tools without providing any information at all. We do not knowingly collect personal information from children under 13; if you believe a child has submitted a form, contact us and we will delete the submission.",
          ],
        },
        {
          heading: "Third-party links",
          paragraphs: [
            "Our tools and articles link to outside educational resources. Once you follow a link, that site's own privacy policy applies — we don't control what third parties collect, and this policy doesn't cover them.",
          ],
        },
        {
          heading: "Your choices, and how to reach us",
          paragraphs: [
            "You can ask us at any time what information we hold from your form submissions, or ask us to correct or delete it — reach us through the contact page on this site. Newsletter emails always include an unsubscribe link.",
          ],
        },
        {
          heading: "Changes to this policy",
          paragraphs: [
            "If our actual practices change — for example, if analytics is switched on, or a new form is added — we will update this policy to match and revise the date at the top. This policy describes what the site really does, and we intend to keep it that way.",
          ],
        },
      ]}
    />
  );
}
