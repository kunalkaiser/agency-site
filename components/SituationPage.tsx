import Link from "next/link";
import CtaSection from "@/components/CtaSection";
import type { Situation } from "@/app/resources/classroom/classroom";

export default function SituationPage({ situation }: { situation: Situation }) {
  return (
    <>
      <section className="bg-navy-950">
        <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-20">
          <p className="text-sm uppercase tracking-widest text-sand-300">
            Classroom Strategy Finder · Teachers
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-tight text-sand-50 sm:text-5xl">
            <span aria-hidden="true" className="mr-3">{situation.emoji}</span>
            {situation.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-sand-200">{situation.description}</p>
        </div>
      </section>

      <article>
        <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <section>
              <h2 className="font-serif text-2xl font-semibold text-navy-900">What it looks like</h2>
              <ul className="mt-4 space-y-3">
                {situation.looksLike.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-navy-800">
                    <span aria-hidden="true" className="mt-0.5 text-sand-600">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10 rounded-xl border border-navy-100 bg-sand-100 p-6">
              <h2 className="font-serif text-2xl font-semibold text-navy-900">
                What's often underneath
              </h2>
              <p className="mt-2 text-sm text-navy-700">
                Questions to consider — not conclusions to reach.
              </p>
              <ul className="mt-4 space-y-3">
                {situation.underneath.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-navy-800">
                    <span aria-hidden="true" className="mt-0.5 text-sand-600">?</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="font-serif text-2xl font-semibold text-navy-900">Try first this week</h2>
              <div className="mt-5 space-y-4">
                {situation.tryFirst.map((s) => (
                  <div key={s.title} className="rounded-lg border border-navy-100 bg-white p-5">
                    <h3 className="font-serif text-lg font-semibold text-navy-900">{s.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-navy-800">{s.how}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10">
              <h2 className="font-serif text-2xl font-semibold text-navy-900">Building the habit</h2>
              <div className="mt-5 space-y-4">
                {situation.buildingHabit.map((s) => (
                  <div key={s.title} className="rounded-lg border border-navy-100 bg-sand-50 p-5">
                    <h3 className="font-serif text-lg font-semibold text-navy-900">{s.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-navy-800">{s.how}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10 rounded-xl border-l-4 border-navy-900 bg-sand-100 p-6">
              <h2 className="font-serif text-xl font-semibold text-navy-900">
                When to loop in others
              </h2>
              <p className="mt-3 leading-relaxed text-navy-800">{situation.loopIn}</p>
            </section>

            <section className="mt-10">
              <h2 className="font-serif text-lg font-semibold text-navy-900">
                Printable companions
              </h2>
              <ul className="mt-3 space-y-2">
                {situation.templates.map((t) => (
                  <li key={t.href}>
                    <Link
                      href={t.href}
                      className="font-medium text-navy-800 underline underline-offset-4 hover:text-navy-950"
                    >
                      {t.label}
                    </Link>
                  </li>
                ))}
                {situation.related?.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      className="font-medium text-navy-800 underline underline-offset-4 hover:text-navy-950"
                    >
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <p className="mt-12 leading-relaxed text-navy-800">
              Built by a practicing teacher, for the colleague trying one more thing on a Tuesday —
              if a student needs more than classroom moves, our consult line is open to educators
              too.
            </p>

            <p className="mt-8 border-t border-navy-100 pt-6 text-sm text-navy-600">
              This resource is provided for general educational purposes only and is not legal
              advice; special education procedures and terminology vary by state and district.
            </p>

            <Link
              href="/resources/classroom"
              className="mt-8 inline-block text-sm font-medium text-navy-800 underline underline-offset-4 hover:text-navy-950"
            >
              ← All classroom situations
            </Link>
          </div>
        </div>
      </article>

      <CtaSection
        heading="Some students need more than one classroom can carry."
        body="When you've tried the reasonable things and the pattern holds, a consult can help sort what kind of support would actually move it — for your student or your school."
      />
    </>
  );
}
