import type { Metadata } from "next";
import Link from "next/link";
import { ADVOCACY_VISIBLE, VISIBLE_SERVICES } from "@/lib/services";
import CtaSection from "@/components/CtaSection";
import { SITE_NAME, og } from "@/lib/site";

export const metadata: Metadata = {
  // The layout's title.template doesn't apply to its own segment, so spell it out.
  title: `Home | ${SITE_NAME}`,
  description: ADVOCACY_VISIBLE
    ? "Strategic education and behavioral support for students, families, and schools. Virtual tutoring, college counseling, special education support, and advocacy for families nationwide."
    : "Strategic education and behavioral support for students, families, and schools. Virtual tutoring, college counseling, and special education support for families nationwide.",
  openGraph: og("/"),
};

const WHY_US = [
  {
    title: "Doctoral-level expertise",
    body: "Our practice is led by doctoral-level training in special education and educational research — and it shows in the care behind every plan we write.",
  },
  {
    title: "One plan, one team",
    body: ADVOCACY_VISIBLE
      ? "Tutoring, counseling, specialized support, and advocacy under one roof — so your student's plan is coherent, not pieced together."
      : "Tutoring, counseling, and specialized support under one roof — so your student's plan is coherent, not pieced together.",
  },
  {
    title: "Calm, collaborative approach",
    body: "We work with families and schools, not against them. Clear communication, realistic goals, and steady follow-through.",
  },
];

const WHO_WE_HELP = [
  {
    title: "Parents",
    body: ADVOCACY_VISIBLE
      ? "Guidance, advocacy support, and qualified providers so you can make confident decisions for your child."
      : "Guidance and qualified providers so you can make confident decisions for your child.",
  },
  {
    title: "Students",
    body: "Individualized instruction and mentoring that builds skills, independence, and genuine confidence.",
  },
  {
    title: "Schools",
    body: "Experienced special educators and consultants who complement your team and support your students.",
  },
];

const PROCESS_PREVIEW = [
  {
    step: "Discovery call",
    body: "We listen first — your student's story, your concerns, your goals.",
  },
  {
    step: "Service plan",
    body: "You receive a clear, personalized plan with defined goals and a realistic timeline.",
  },
  {
    step: "Delivery & review",
    body: "Services begin, progress is measured, and the plan evolves as your student grows.",
  },
];

const CREDENTIALS = [
  "PhD-led practice",
  "Special education expertise",
  "Research-informed methods",
  "Virtual · Nationwide",
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-950">
        <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
          <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight text-sand-50 sm:text-5xl lg:text-6xl">
            Strategic education and behavioral support for students, families, and schools.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-sand-200">
            {ADVOCACY_VISIBLE
              ? "Virtual tutoring, college counseling, special education support, and advocacy for families nationwide"
              : "Virtual tutoring, college counseling, and special education support for families nationwide"}{" "}
            — one team, one coherent plan for your student.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-md bg-sand-100 px-6 py-3 text-center font-medium text-navy-900 transition-colors hover:bg-white active:bg-sand-200"
            >
              Book a Consult
            </Link>
            <Link
              href="/services"
              className="rounded-md border border-sand-300/60 px-6 py-3 text-center font-medium text-sand-100 transition-colors hover:border-sand-200 hover:text-white active:border-sand-100"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Service cards */}
      <section>
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-serif text-2xl font-semibold text-navy-900 sm:text-3xl">Our services</h2>
          <div
            className={`mt-8 grid gap-5 sm:grid-cols-2 ${
              VISIBLE_SERVICES.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
            }`}
          >
            {VISIBLE_SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col rounded-xl border border-navy-100 bg-white p-6 transition hover:border-navy-300 hover:shadow-lg"
              >
                <p className="text-xs uppercase tracking-widest text-sand-700">
                  {service.outcomeGroup}
                </p>
                <h3 className="mt-2 font-serif text-xl font-semibold text-navy-900">
                  {service.cardTitle}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-700">
                  {service.shortDescription}
                </p>
                <span className="mt-5 text-sm font-medium text-navy-800 group-hover:underline">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-sand-100">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-serif text-2xl font-semibold text-navy-900 sm:text-3xl">Why families choose us</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {WHY_US.map((item) => (
              <div key={item.title}>
                <h3 className="font-serif text-xl font-semibold text-navy-900">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-navy-700">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we help */}
      <section>
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-serif text-2xl font-semibold text-navy-900 sm:text-3xl">Who we help</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {WHO_WE_HELP.map((item) => (
              <div key={item.title} className="rounded-xl border border-navy-100 bg-white p-7">
                <h3 className="font-serif text-xl font-semibold text-navy-900">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-navy-700">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process preview */}
      <section className="bg-sand-100">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-serif text-2xl font-semibold text-navy-900 sm:text-3xl">How it works</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {PROCESS_PREVIEW.map((item, i) => (
              <div key={item.step} className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 font-serif text-sand-50">
                  {i + 1}
                </span>
                <div>
                  <h3 className="pt-1.5 font-serif text-lg font-semibold text-navy-900">
                    {item.step}
                  </h3>
                  <p className="mt-2 text-navy-700">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/process"
            className="mt-10 inline-block text-sm font-medium text-navy-800 underline underline-offset-4 hover:text-navy-950"
          >
            See our full 7-step process
          </Link>
        </div>
      </section>

      {/* Credentials strip */}
      <section className="border-y border-navy-100 bg-navy-900">
        <div className="mx-auto flex max-w-content flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-8 sm:px-8">
          {CREDENTIALS.map((item) => (
            <p key={item} className="text-sm font-medium uppercase tracking-widest text-sand-200">
              {item}
            </p>
          ))}
        </div>
      </section>

      {/* Resources teaser */}
      <section>
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <h2 className="font-serif text-2xl font-semibold text-navy-900 sm:text-3xl">
                Free guides for parents, teachers, and students
              </h2>
              <p className="mt-4 leading-relaxed text-navy-700">
                Practical, plain-language resources on tutoring, the college process, and special
                education — written for the people doing the work at home and in the classroom.
              </p>
            </div>
            <Link
              href="/resources"
              className="shrink-0 rounded-md border border-navy-300 px-6 py-3 font-medium text-navy-900 transition-colors hover:border-navy-500 active:bg-sand-100"
            >
              Browse Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CtaSection />
    </>
  );
}
