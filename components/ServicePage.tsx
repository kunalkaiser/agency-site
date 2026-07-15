import Link from "next/link";
import type { Service } from "@/lib/services";
import CtaSection from "@/components/CtaSection";

function Section({
  title,
  children,
  tinted = false,
}: {
  title: string;
  children: React.ReactNode;
  tinted?: boolean;
}) {
  return (
    <section className={tinted ? "bg-sand-100" : undefined}>
      <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-16">
        <h2 className="font-serif text-2xl font-semibold text-navy-900 sm:text-3xl">{title}</h2>
        <div className="mt-6 max-w-3xl">{children}</div>
      </div>
    </section>
  );
}

export default function ServicePage({ service }: { service: Service }) {
  return (
    <>
      {/* Page hero */}
      <section className="bg-navy-950">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
          <p className="text-sm uppercase tracking-widest text-sand-300">{service.outcomeGroup}</p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold text-sand-50 sm:text-5xl">
            {service.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-sand-200">{service.shortDescription}</p>
          {service.areaNote && (
            <p className="mt-5 inline-block rounded-md bg-navy-800 px-4 py-2 text-sm font-medium text-sand-100">
              {service.areaNote}
            </p>
          )}
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-block rounded-md bg-sand-100 px-6 py-3 font-medium text-navy-900 transition-colors hover:bg-white"
            >
              Book a Consult
            </Link>
          </div>
        </div>
      </section>

      <Section title="Who it's for">
        <ul className="space-y-3">
          {service.whoItsFor.map((item) => (
            <li key={item} className="flex gap-3 text-navy-800">
              <span aria-hidden="true" className="mt-1 text-sand-600">
                —
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="The problem it solves" tinted>
        <p className="text-lg leading-relaxed text-navy-800">{service.problemItSolves}</p>
      </Section>

      <Section title="What's included">
        <ul className="grid gap-4 sm:grid-cols-2">
          {service.whatsIncluded.map((item) => (
            <li key={item} className="rounded-lg border border-navy-100 bg-white p-5 text-navy-800">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="How it works" tinted>
        <ol className="space-y-6">
          {service.howItWorks.map((step, i) => (
            <li key={step} className="flex gap-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 font-serif text-sand-50">
                {i + 1}
              </span>
              <p className="pt-1.5 text-navy-800">{step}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Expected outcomes">
        <ul className="space-y-3">
          {service.expectedOutcomes.map((item) => (
            <li key={item} className="flex gap-3 text-navy-800">
              <span aria-hidden="true" className="mt-1 text-sand-600">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Timeline" tinted>
        <p className="text-lg leading-relaxed text-navy-800">{service.timeline}</p>
      </Section>

      <Section title="Our pricing approach">
        <p className="text-lg leading-relaxed text-navy-800">{service.pricingApproach}</p>
      </Section>

      <Section title="Frequently asked questions" tinted>
        <dl className="space-y-8">
          {service.faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="font-serif text-lg font-semibold text-navy-900">{faq.question}</dt>
              <dd className="mt-2 text-navy-800">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <CtaSection
        heading={`Interested in ${service.name.toLowerCase() === "setss" ? "SETSS" : service.name.toLowerCase()}?`}
        body="Book a consult and we'll talk through your student's situation and whether this service is the right fit."
      />
    </>
  );
}
