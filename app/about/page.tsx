import type { Metadata } from "next";
import CtaSection from "@/components/CtaSection";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "The mission, founder, and philosophy behind TrueCourse Education Group — PhD-led education services for NYC & Westchester families.",
};

const CREDENTIALS = [
  "PhD in [field] — placeholder for final credential details.",
  "Years of experience in special education settings — placeholder bullet.",
  "Research background in [area] — placeholder bullet.",
  "Additional certifications and affiliations — placeholder bullet.",
];

const WHY_DIFFERENT = [
  {
    title: "Depth over volume",
    body: "We take on a limited number of families at a time, so every engagement gets unhurried, senior attention from the first call to the last review.",
  },
  {
    title: "Evidence, not trends",
    body: "Our recommendations come from research and long practice, not from whatever is fashionable in education this year. If we suggest something, we can tell you why.",
  },
  {
    title: "The whole picture",
    body: "Academics, development, and daily logistics are considered together, because that's how students actually experience school. Plans that ignore one usually falter at all three.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Mission */}
      <section className="bg-navy-950">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
          <h1 className="font-serif text-4xl font-semibold text-sand-50 sm:text-5xl">
            About {SITE_NAME}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sand-200">
            Our mission is simple: every student deserves a course through school that fits who they
            are — and every family deserves a partner who can help chart it. We bring expert,
            research-grounded support to students, families, and schools across NYC and Westchester,
            delivered calmly, explained plainly, and measured honestly.
          </p>
        </div>
      </section>

      {/* Founder story */}
      <section>
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-serif text-3xl font-semibold text-navy-900">Founder story</h2>
          <div className="mt-6 max-w-3xl space-y-5 leading-relaxed text-navy-800">
            <p>
              Placeholder copy — the founder&apos;s story goes here. A brief narrative covering the
              path into education: early classroom experience, the questions that led to doctoral
              study, and the pattern noticed along the way — that families were navigating
              consequential school decisions without a knowledgeable guide.
            </p>
            <p>
              Placeholder copy — second paragraph. Why {SITE_NAME} was founded, what it set out to
              do differently, and the students and families it exists to serve.
            </p>
          </div>
        </div>
      </section>

      {/* Experience & credentials */}
      <section className="bg-sand-100">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-serif text-3xl font-semibold text-navy-900">
            Experience &amp; credentials
          </h2>
          <ul className="mt-6 max-w-3xl space-y-3">
            {CREDENTIALS.map((item) => (
              <li key={item} className="flex gap-3 text-navy-800">
                <span aria-hidden="true" className="mt-1 text-sand-600">
                  —
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Service philosophy */}
      <section>
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-serif text-3xl font-semibold text-navy-900">Service philosophy</h2>
          <div className="mt-6 max-w-3xl space-y-5 leading-relaxed text-navy-800">
            <p>
              We start from the student, not the service. Before recommending anything, we take the
              time to understand how a student learns, what's working, and what isn't — then we
              build a plan around that picture, rather than fitting the student to a program.
            </p>
            <p>
              We also believe the adults around a student matter. Parents get plain-language
              explanations and honest recommendations. Schools get a collaborative partner. Progress
              is measured, reviewed, and shared — so everyone can see the course and stay on it.
            </p>
          </div>
        </div>
      </section>

      {/* Why we're different */}
      <section className="bg-sand-100">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-serif text-3xl font-semibold text-navy-900">Why we&apos;re different</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {WHY_DIFFERENT.map((item) => (
              <div key={item.title}>
                <h3 className="font-serif text-xl font-semibold text-navy-900">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-navy-700">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        heading="Let's talk about your student."
        body="A consult is a conversation, not a sales call. Bring your questions — we'll bring honest answers."
      />
    </>
  );
}
