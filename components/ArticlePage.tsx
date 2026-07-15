import Link from "next/link";
import type { Article } from "@/app/resources/articles";
import CtaSection from "@/components/CtaSection";

export default function ArticlePage({ article }: { article: Article }) {
  return (
    <>
      <section className="bg-navy-950">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-sm uppercase tracking-widest text-sand-300">
            For {article.audience.toLowerCase()} · {article.type}
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-tight text-sand-50 sm:text-5xl">
            {article.title}
          </h1>
        </div>
      </section>

      <article>
        <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-lg leading-relaxed text-navy-800">{article.intro}</p>

            {article.sections.map((section) => (
              <section key={section.heading} className="mt-12">
                <h2 className="font-serif text-2xl font-semibold text-navy-900">
                  {section.heading}
                </h2>
                {section.paragraphs?.map((p) => (
                  <p key={p} className="mt-4 leading-relaxed text-navy-800">
                    {p}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-4 space-y-3">
                    {section.list.map((item) => (
                      <li key={item} className="flex gap-3 leading-relaxed text-navy-800">
                        <span aria-hidden="true" className="mt-0.5 text-sand-600">
                          —
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {section.after?.map((p) => (
                  <p key={p} className="mt-4 leading-relaxed text-navy-800">
                    {p}
                  </p>
                ))}
              </section>
            ))}

            <p className="mt-14 border-t border-navy-100 pt-6 text-sm text-navy-600">
              This resource is provided for general educational purposes only and is not legal
              advice; special education procedures and terminology vary by state and district.
            </p>

            <Link
              href="/resources"
              className="mt-8 inline-block text-sm font-medium text-navy-800 underline underline-offset-4 hover:text-navy-950"
            >
              ← All resources
            </Link>
          </div>
        </div>
      </article>

      <CtaSection
        heading="Want advice specific to your student?"
        body="Guides are general; students aren't. Book a consult for recommendations tailored to your situation."
      />
    </>
  );
}
