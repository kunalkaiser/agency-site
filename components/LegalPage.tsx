export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

type Props = {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export default function LegalPage({ title, lastUpdated, sections }: Props) {
  return (
    <>
      <section className="bg-navy-950">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
          <h1 className="font-serif text-4xl font-semibold text-sand-50 sm:text-5xl">{title}</h1>
          <p className="mt-4 text-sm text-sand-300">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <p
              role="note"
              className="rounded-md border border-sand-400 bg-sand-100 px-5 py-4 font-medium text-navy-900"
            >
              Template draft — pending attorney review; not yet legal advice or a binding final
              version.
            </p>

            {sections.map((section) => (
              <section key={section.heading} className="mt-10">
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
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
