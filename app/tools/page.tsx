import type { Metadata } from "next";
import ToolsDirectory from "@/components/ToolsDirectory";
import NewsletterForm from "@/components/NewsletterForm";
import CtaSection from "@/components/CtaSection";
import { og } from "@/lib/site";
import { TOOL_CARDS } from "./tools-data";

export const metadata: Metadata = {
  title: "Free Tools",
  description:
    "Every free tool in one place: a guided study coach, a study plan builder, parent toolkits, and practical guides — filter by parents, teachers, or students.",
  openGraph: og("/tools"),
};

export default function ToolsPage() {
  return (
    <>
      <section className="bg-navy-950">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
          <h1 className="font-serif text-4xl font-semibold text-sand-50 sm:text-5xl">Free Tools</h1>
          <p className="mt-5 max-w-2xl text-lg text-sand-200">
            Every free tool, guided toolkit, and guide we've built — in one place. All of it runs in
            your browser, none of it needs an account, and all of it is genuinely free.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-content px-5 py-12 sm:px-8 sm:py-16">
          <ToolsDirectory cards={TOOL_CARDS} />
        </div>
      </section>

      <section className="bg-sand-100">
        <div className="mx-auto max-w-content px-5 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-xl">
            <h2 className="font-serif text-2xl font-semibold text-navy-900">
              New tools, monthly
            </h2>
            <div className="mt-3">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        heading="Tools help. People help more."
        body="Everything here is self-serve — but if you'd rather talk it through with someone who does this every day, that's what a consult is for."
      />
    </>
  );
}
