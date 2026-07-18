import type { Metadata } from "next";
import CtaSection from "@/components/CtaSection";
import { SITE_NAME, og } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "The mission, founder, and philosophy behind TrueCourse Education Group — PhD-led virtual education services for families nationwide.",
  openGraph: og("/about"),
};

const CREDENTIALS = [
  "PhD in Molecular Biomedical Technology.",
  "Master's degree in special education.",
  "Practicing special education teacher in public schools.",
  "Adjunct faculty at Mercy University.",
  "10+ years of experience across research and management consulting.",
  "Published researcher, with peer-reviewed publications and patents.",
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
            research-grounded support to students, families, and schools nationwide through virtual
            services, delivered calmly, explained plainly, and measured honestly.
          </p>
        </div>
      </section>

      {/* Founder story */}
      <section>
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-serif text-2xl font-semibold text-navy-900 sm:text-3xl">Founder story</h2>
          <div className="mt-6 max-w-3xl space-y-5 leading-relaxed text-navy-800">
            <p>
              Our founder&apos;s path runs through both the laboratory and the classroom. Trained as
              a scientist — with a PhD in Molecular Biomedical Technology and more than a decade of
              experience across research and management consulting — our founder was drawn to the
              work at the heart of this practice: earning a master&apos;s degree in special
              education and teaching special education in public schools, a role that continues
              today. That work is joined by an adjunct faculty appointment at Mercy University and
              a research record that includes peer-reviewed publications and patents.
            </p>
            <p>
              {SITE_NAME} grew out of what that combination of training makes plain: consequential
              school decisions deserve the same rigor as any research question, and families
              navigating them deserve a knowledgeable guide. This is a founder-led practice — every
              family works directly with the founder, from the first conversation to the last
              review.
            </p>
          </div>
        </div>
      </section>

      {/* Experience & credentials */}
      <section className="bg-sand-100">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-serif text-2xl font-semibold text-navy-900 sm:text-3xl">
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
          <h2 className="font-serif text-2xl font-semibold text-navy-900 sm:text-3xl">Service philosophy</h2>
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
          <h2 className="font-serif text-2xl font-semibold text-navy-900 sm:text-3xl">Why we&apos;re different</h2>
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
