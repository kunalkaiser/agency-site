import type { Metadata } from "next";
import Link from "next/link";
import StudyCoach from "@/components/StudyCoach";
import CtaSection from "@/components/CtaSection";

export const metadata: Metadata = {
  title: "Study Coach",
  description:
    "A free chat-style study coach: tap through subject, topic, and what's going wrong, and get a focused two-week plan with linked free resources. Runs entirely in your browser.",
};

export default function StudyCoachPage() {
  return (
    <>
      <section className="bg-navy-950 print:hidden">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
          <p className="text-sm uppercase tracking-widest text-sand-300">Free tool · Students</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-sand-50 sm:text-5xl">
            Study Coach
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-sand-200">
            Falling behind in something? Tap through a short guided conversation and get a focused
            two-week plan with free resources for your exact topic. It follows a simple script —
            your answers pick the path — and everything stays in your browser: nothing is sent or
            saved anywhere.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
          <StudyCoach />
          <Link
            href="/resources"
            className="mt-8 inline-block text-sm font-medium text-navy-800 underline underline-offset-4 hover:text-navy-950 print:hidden"
          >
            ← All resources
          </Link>
        </div>
      </section>

      <div className="print:hidden">
        <CtaSection
          heading="Want a coach who can actually listen?"
          body="This tool follows a script; our tutors don't. Book a consult and we'll build a plan around your student, not just a topic."
        />
      </div>
    </>
  );
}
