import type { Metadata } from "next";
import Link from "next/link";
import WhichSupport from "@/components/WhichSupport";
import CtaSection from "@/components/CtaSection";
import { og } from "@/lib/site";

export const metadata: Metadata = {
  title: "Which Support Fits?",
  description:
    "Not sure where to start? Answer two or three quick questions and get pointed at the one service — or free tool — that fits your child's situation, honestly.",
  openGraph: og("/resources/which-support"),
};

export default function WhichSupportPage() {
  return (
    <>
      <section className="bg-navy-950">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
          <p className="text-sm uppercase tracking-widest text-sand-300">Guided chooser</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-sand-50 sm:text-5xl">
            Which support fits?
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-sand-200">
            Two or three quick questions, one honest answer: the single best place to start for your
            child — sometimes that's one of our services, and sometimes it's a free tool you can use
            tonight. We'll say which, plainly.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
          <WhichSupport />
          <Link
            href="/tools"
            className="mt-8 inline-block text-sm font-medium text-navy-800 underline underline-offset-4 hover:text-navy-950"
          >
            ← All free tools
          </Link>
        </div>
      </section>

      <CtaSection
        heading="Rather just ask a person?"
        body="Skip the chooser entirely if you like — a consult is a conversation, and we'll point you to the right starting place even if it isn't with us."
      />
    </>
  );
}
