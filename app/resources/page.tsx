import type { Metadata } from "next";
import Link from "next/link";
import CtaSection from "@/components/CtaSection";
import { getArticlesFor, type Article } from "./articles";

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

      {AUDIENCES.map((section, i) => (
        <section key={section.audience} className={i % 2 === 1 ? "bg-sand-100" : undefined}>
          <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-16">
            <h2 className="font-serif text-3xl font-semibold text-navy-900">
              For {section.audience.toLowerCase()}
            </h2>
            <p className="mt-3 max-w-2xl text-navy-700">{section.intro}</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {getArticlesFor(section.audience).map((article) => (
                <Link
                  key={article.slug}
                  href={`/resources/${article.slug}`}
                  className="group flex flex-col rounded-xl border border-navy-100 bg-white p-6 transition-shadow hover:shadow-lg"
                >
                  <p className="text-xs uppercase tracking-widest text-sand-600">{article.type}</p>
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
        <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-16">
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
                className="w-full rounded-md border border-navy-700 bg-navy-800 px-4 py-3 text-sand-50 placeholder:text-sand-400 focus:border-sand-300 focus:outline-none"
              />
              <button
                type="button"
                className="shrink-0 rounded-md bg-sand-100 px-6 py-3 font-medium text-navy-900 transition-colors hover:bg-white"
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
