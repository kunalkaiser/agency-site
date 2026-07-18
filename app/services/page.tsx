import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import CtaSection from "@/components/CtaSection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Virtual tutoring, college counseling, SETSS, and IEP advocacy for students and families nationwide.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy-950">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
          <h1 className="font-serif text-4xl font-semibold text-sand-50 sm:text-5xl">Services</h1>
          <p className="mt-5 max-w-2xl text-lg text-sand-200">
            Four services, one goal: the right support for your student at the right time. Each
            engagement starts with listening and ends with a plan you understand — grouped below by
            the outcome it delivers.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-6 md:grid-cols-2">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col rounded-xl border border-navy-100 bg-white p-8 transition hover:border-navy-300 hover:shadow-lg"
              >
                <p className="text-xs uppercase tracking-widest text-sand-700">
                  {service.outcomeGroup}
                </p>
                <h2 className="mt-2 font-serif text-2xl font-semibold text-navy-900">
                  {service.cardTitle}
                </h2>
                <p className="mt-3 flex-1 leading-relaxed text-navy-700">
                  {service.shortDescription}
                </p>
                <span className="mt-6 text-sm font-medium text-navy-800 group-hover:underline">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        heading="Not sure which service fits?"
        body="That's what the consult is for. Tell us about your student and we'll point you to the right starting place — even if it isn't with us."
      />
    </>
  );
}
