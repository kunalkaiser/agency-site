import type { Metadata } from "next";
import CtaSection from "@/components/CtaSection";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Our 7-step process, from first inquiry through ongoing support — clear, measured, and built around your student.",
};

const STEPS = [
  {
    title: "Inquiry",
    body: "You reach out through the contact form or by booking a consult. We respond within two business days with next steps.",
  },
  {
    title: "Discovery call",
    body: "A conversation about your student — history, strengths, concerns, and what you're hoping to change. We listen more than we talk.",
  },
  {
    title: "Assessment",
    body: "Where useful, we review records and run a focused assessment — so the plan is built on a clear, honest baseline rather than assumptions.",
  },
  {
    title: "Service plan",
    body: "You receive a written plan in plain English: which services, what goals, what schedule, and how progress will be measured.",
  },
  {
    title: "Delivery",
    body: "Services begin on a consistent schedule with a carefully matched provider. You always know what's happening and why.",
  },
  {
    title: "Progress review",
    body: "At regular intervals we review progress against the plan's goals with you — and adjust the plan when the data says to.",
  },
  {
    title: "Ongoing support",
    body: "As your student grows, needs change. We stay available for new goals, new transitions, and new questions.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <section className="bg-navy-950">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
          <h1 className="font-serif text-4xl font-semibold text-sand-50 sm:text-5xl">Our process</h1>
          <p className="mt-5 max-w-2xl text-lg text-sand-200">
            Seven steps, no mystery. From your first inquiry to ongoing support, here is exactly how
            an engagement with us works.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
          <ol className="relative mx-auto max-w-2xl border-l-2 border-navy-200 pl-10 sm:pl-14">
            {STEPS.map((step, i) => (
              <li key={step.title} className={i < STEPS.length - 1 ? "pb-12" : undefined}>
                <span className="absolute -left-5 flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 font-serif text-sand-50 sm:-left-6 sm:h-12 sm:w-12">
                  {i + 1}
                </span>
                <h2 className="pt-1 font-serif text-2xl font-semibold text-navy-900 sm:pt-2">
                  {step.title}
                </h2>
                <p className="mt-3 max-w-xl leading-relaxed text-navy-700">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaSection
        heading="Step one is a conversation."
        body="Book a consult and start the process. There's no commitment until the service plan makes sense to you."
      />
    </>
  );
}
