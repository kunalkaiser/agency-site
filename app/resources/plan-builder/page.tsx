import type { Metadata } from "next";
import Link from "next/link";
import PlanBuilder from "@/components/PlanBuilder";
import CtaSection from "@/components/CtaSection";

export const metadata: Metadata = {
  title: "Study Plan Builder",
  description:
    "A free tool that turns your current grades — in any format — into a structured weekly, monthly, or quarterly study plan. Runs entirely in your browser.",
};

export default function PlanBuilderPage() {
  return (
    <>
      <section className="bg-navy-950 print:hidden">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
          <p className="text-sm uppercase tracking-widest text-sand-300">Free tool · Students</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-sand-50 sm:text-5xl">
            Study Plan Builder
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-sand-200">
            Enter your current grades in any format — percentages, letters, or the NY scale — and
            get a structured plan for the week, month, or quarter. Everything runs in your browser:
            nothing you type is sent or saved anywhere.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-content px-5 py-12 sm:px-8 sm:py-16">
          <PlanBuilder />
          <Link
            href="/resources"
            className="mt-10 inline-block text-sm font-medium text-navy-800 underline underline-offset-4 hover:text-navy-950 print:hidden"
          >
            ← All resources
          </Link>
        </div>
      </section>

      <div className="print:hidden">
        <CtaSection
          heading="Want a plan built around your student, not just the numbers?"
          body="This tool works from grades alone. A consult looks at the whole picture — book one and we'll tailor the plan together."
        />
      </div>
    </>
  );
}
