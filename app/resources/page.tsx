import type { Metadata } from "next";
import CtaSection from "@/components/CtaSection";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free guides, downloads, and tools for parents, teachers, and students — from TrueCourse Education Group.",
};

type ResourceItem = { title: string; body: string; type: string };

const AUDIENCES: { audience: string; intro: string; items: ResourceItem[] }[] = [
  {
    audience: "Parents",
    intro:
      "Plain-language guides for the decisions parents actually face — written to be read in one sitting and used the same week.",
    items: [
      {
        title: "The Parent's Guide to the IEP Meeting",
        body: "What to read beforehand, what to ask in the room, and how to follow up afterward.",
        type: "Guide",
      },
      {
        title: "Choosing the Right Tutor",
        body: "The questions that separate real instruction from expensive homework help.",
        type: "Guide",
      },
      {
        title: "College Planning Timeline for Families",
        body: "A grade-by-grade map of what matters when — and what can wait.",
        type: "Guide",
      },
    ],
  },
  {
    audience: "Teachers",
    intro:
      "Practical materials for the classroom, built by educators who have used them with real students.",
    items: [
      {
        title: "Progress Monitoring Template",
        body: "A simple, reusable template for tracking student goals week to week.",
        type: "Download",
      },
      {
        title: "Accommodations Quick Reference",
        body: "Common accommodations, what they look like in practice, and how to implement them well.",
        type: "Download",
      },
    ],
  },
  {
    audience: "Students",
    intro:
      "Tools students can pick up and use on their own — no adult assembly required.",
    items: [
      {
        title: "Weekly Study Planner",
        body: "A one-page planner for building a study routine that actually sticks.",
        type: "Tool",
      },
      {
        title: "College Essay Brainstorm Worksheet",
        body: "Prompts for finding the story only you can tell.",
        type: "Tool",
      },
    ],
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
              {section.items.map((item) => (
                <div key={item.title} className="flex flex-col rounded-xl border border-navy-100 bg-white p-6">
                  <p className="text-xs uppercase tracking-widest text-sand-600">{item.type}</p>
                  <h3 className="mt-2 font-serif text-lg font-semibold text-navy-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-700">{item.body}</p>
                  <p className="mt-5 text-sm font-medium text-sand-700">Coming soon</p>
                </div>
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
