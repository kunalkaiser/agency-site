import type { Metadata } from "next";
import Link from "next/link";
import CtaSection from "@/components/CtaSection";
import { getArticlesFor, type Article } from "./articles";
import { TOOLKITS } from "./toolkits/toolkits";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free guides, downloads, and tools for parents, teachers, and students — from TrueCourse Education Group.",
};

const AUDIENCES: { audience: Article["audience"]; intro: string }[] = [
  {
    audience: "Parents",
    intro:
      "Plain-language guides for the decisions parents actually face — written to be read in one sitting and used the same week.",
  },
  {
    audience: "Teachers",
    intro:
      "Practical references for the classroom, built by educators who have used them with real students.",
  },
  {
    audience: "Students",
    intro:
      "Tools students can pick up and use on their own — no adult assembly required.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="bg-navy-950">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
          <h1 className="font-serif text-4xl font-semibold text-sand-50 sm:text-5xl">Resources</h1>
          <p className="mt-5 max-w-2xl text-lg text-sand-200">
            Free, practical materials for the people who support students every day — at home and in
            the classroom.
          </p>
        </div>
      </section>

      {/* Featured tool */}
      <section className="bg-sand-100">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
          <Link
            href="/resources/study-coach"
            className="group flex flex-col rounded-xl border-2 border-navy-900 bg-navy-950 p-8 transition hover:shadow-xl"
          >
            <p className="text-xs uppercase tracking-widest text-sand-300">Featured free tool</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-sand-50 sm:text-3xl">
              Study Coach
            </h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-sand-200">
              Stuck on one topic? Tap through a guided plan. A short conversation — subject, topic,
              what's going wrong, how much time you have — ends in a focused two-week plan with
              free resources for that exact topic. Runs entirely in your browser; nothing is saved
              or sent anywhere.
            </p>
            <span className="mt-6 text-sm font-medium text-sand-100 group-hover:underline">
              Start the conversation →
            </span>
          </Link>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <Link
              href="/resources/plan-builder"
              className="group flex flex-col rounded-xl border border-navy-100 bg-white p-8 transition hover:border-navy-300 hover:shadow-lg"
            >
              <p className="text-xs uppercase tracking-widest text-sand-700">Free tool</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-navy-900">
                Study Plan Builder
              </h2>
              <p className="mt-3 flex-1 leading-relaxed text-navy-700">
                Turn all your grades into a weekly schedule. Enter every subject in any format —
                percentages, letters, or the NY scale — and get a structured weekly, monthly, or
                quarterly plan. Includes a NY Regents mode.
              </p>
              <span className="mt-6 text-sm font-medium text-navy-800 group-hover:underline">
                Build your plan →
              </span>
            </Link>
            <a
              href="https://kunalkaiser.github.io/zened/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-xl border border-navy-100 bg-white p-8 transition hover:border-navy-300 hover:shadow-lg"
            >
              <p className="text-xs uppercase tracking-widest text-sand-700">
                Free NY Regents readiness tool
              </p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-navy-900">ZenEd</h2>
              <p className="mt-3 flex-1 leading-relaxed text-navy-700">
                Our free companion site for NY students preparing for the Regents exams.
              </p>
              <span className="mt-6 text-sm font-medium text-navy-800 group-hover:underline">
                Visit ZenEd ↗
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Interactive toolkits */}
      <section>
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-serif text-2xl font-semibold text-navy-900 sm:text-3xl">
            Interactive Toolkits
          </h2>
          <p className="mt-3 max-w-2xl text-navy-700">
            Answer two quick questions about what's happening at your house and get a short,
            concrete set of strategies matched to it. Runs entirely in your browser.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TOOLKITS.map((toolkit) => (
              <Link
                key={toolkit.slug}
                href={`/resources/toolkits/${toolkit.slug}`}
                className="group flex flex-col rounded-xl border border-navy-100 bg-white p-6 transition hover:border-navy-300 hover:shadow-lg"
              >
                <p className="text-xs uppercase tracking-widest text-sand-700">Guided toolkit</p>
                <h3 className="mt-2 font-serif text-lg font-semibold text-navy-900">
                  {toolkit.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-700">
                  {toolkit.description}
                </p>
                <span className="mt-5 text-sm font-medium text-navy-800 group-hover:underline">
                  Start →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {AUDIENCES.map((section, i) => (
        <section key={section.audience} className={i % 2 === 1 ? "bg-sand-100" : undefined}>
          <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 sm:text-3xl">
              For {section.audience.toLowerCase()}
            </h2>
            <p className="mt-3 max-w-2xl text-navy-700">{section.intro}</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {getArticlesFor(section.audience).map((article) => (
                <Link
                  key={article.slug}
                  href={`/resources/${article.slug}`}
                  className="group flex flex-col rounded-xl border border-navy-100 bg-white p-6 transition hover:border-navy-300 hover:shadow-lg"
                >
                  <p className="text-xs uppercase tracking-widest text-sand-700">{article.type}</p>
                  <h3 className="mt-2 font-serif text-lg font-semibold text-navy-900">
                    {article.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-700">
                    {article.description}
                  </p>
                  <span className="mt-5 text-sm font-medium text-navy-800 group-hover:underline">
                    Read →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Email capture (not yet wired to a provider) */}
      <section className="bg-navy-900">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-serif text-2xl font-semibold text-sand-50 sm:text-3xl">
              Get new resources by email
            </h2>
            <p className="mt-3 text-sand-200">
              Occasional and useful, never noisy. Be the first to know when new guides are released.
            </p>
            <form className="mt-7 flex flex-col gap-3 sm:flex-row" aria-label="Email signup">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full rounded-md border border-navy-700 bg-navy-800 px-4 py-3 text-sand-50 placeholder:text-sand-400 focus:border-sand-300"
              />
              <button
                type="button"
                className="shrink-0 rounded-md bg-sand-100 px-6 py-3 font-medium text-navy-900 transition-colors hover:bg-white active:bg-sand-200"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </section>

      <CtaSection
        heading="Want advice specific to your student?"
        body="Guides are general; students aren't. Book a consult for recommendations tailored to your situation."
      />
    </>
  );
}
