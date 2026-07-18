import type { Metadata } from "next";
import Link from "next/link";
import SatScheduleBuilder from "@/components/SatScheduleBuilder";
import CtaSection from "@/components/CtaSection";
import { og } from "@/lib/site";

export const metadata: Metadata = {
  title: "SAT Schedule Builder",
  description:
    "Turn your test date, current score, and weakest area into a day-by-day Digital SAT prep schedule — phased plan, practice-test days, honest pacing. Free, in your browser.",
  openGraph: og("/resources/sat-schedule"),
};

export default function SatSchedulePage() {
  return (
    <>
      <section className="bg-navy-950 print:hidden">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
          <p className="text-sm uppercase tracking-widest text-sand-300">Free tool · Students</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-sand-50 sm:text-5xl">
            SAT Schedule Builder
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-sand-200">
            Enter your test date, your most recent score, and your weakest area, and get a
            day-by-day Digital SAT prep schedule — phased for your runway, with full-length practice
            tests placed at sensible points. Everything runs in your browser: nothing you type is
            sent or saved anywhere.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-content px-5 py-12 sm:px-8 sm:py-16">
          <SatScheduleBuilder />
          <Link
            href="/tools"
            className="mt-10 inline-block text-sm font-medium text-navy-800 underline underline-offset-4 hover:text-navy-950 print:hidden"
          >
            ← All free tools
          </Link>
        </div>
      </section>

      <div className="print:hidden">
        <CtaSection
          heading="Want more than a schedule?"
          body="This tool plans the weeks; our tutors work the sessions. Book a consult and we'll talk through your student's testing plan."
        />
      </div>
    </>
  );
}
