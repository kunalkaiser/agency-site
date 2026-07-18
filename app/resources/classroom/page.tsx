import type { Metadata } from "next";
import Link from "next/link";
import CtaSection from "@/components/CtaSection";
import { og } from "@/lib/site";
import { SITUATIONS } from "./classroom";

export const metadata: Metadata = {
  title: "Classroom Strategy Finder",
  description:
    "Click what you're seeing — not turning in work, giving up quickly, off-task, unprepared — and get practical classroom strategies you can try this week. Free, for teachers.",
  openGraph: og("/resources/classroom"),
};

export default function ClassroomIndexPage() {
  return (
    <>
      <section className="bg-navy-950">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
          <p className="text-sm uppercase tracking-widest text-sand-300">
            Classroom Strategy Finder · Teachers
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-sand-50 sm:text-5xl">
            Click what you're seeing
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-sand-200">
            Twelve classroom situations, each with strategies you can try this week and habits worth
            building after that. Plain teacher language, no jargon, free to share with your staff
            room.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-content px-5 py-12 sm:px-8 sm:py-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SITUATIONS.map((situation) => (
              <Link
                key={situation.slug}
                href={`/resources/classroom/${situation.slug}`}
                className="group flex items-start gap-4 rounded-xl border border-navy-100 bg-white p-5 transition hover:border-navy-300 hover:shadow-lg"
              >
                <span aria-hidden="true" className="text-3xl">
                  {situation.emoji}
                </span>
                <span>
                  <h2 className="font-serif text-lg font-semibold text-navy-900 group-hover:underline">
                    {situation.title}
                  </h2>
                  <p className="mt-1 text-sm leading-snug text-navy-700">
                    {situation.description}
                  </p>
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-navy-600">
            Situations describe what you're seeing in the room — never a judgment about a student.
            Every page stands alone; share the one a colleague needs.
          </p>
        </div>
      </section>

      <CtaSection
        heading="A whole staff room of these conversations?"
        body="We consult with schools as well as families — if a pattern spans classrooms, let's talk about what would actually help."
      />
    </>
  );
}
