import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TemplateSheet from "@/components/TemplateSheet";
import PrintButton from "@/components/PrintButton";
import CtaSection from "@/components/CtaSection";
import { og } from "@/lib/site";
import { TEMPLATES, getTemplate } from "../templates";

export const dynamicParams = false;

export function generateStaticParams() {
  return TEMPLATES.map((template) => ({ slug: template.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) return {};
  return {
    title: `${template.title} — Printable Template`,
    description: template.description,
    openGraph: og(`/resources/templates/${template.slug}`),
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) notFound();

  return (
    <>
      <section className="bg-navy-950 print:hidden">
        <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-20">
          <p className="text-sm uppercase tracking-widest text-sand-300">
            Printable template · Teachers
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-sand-50 sm:text-5xl">
            {template.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-sand-200">{template.description}</p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
          {/* How to use — screen only, kept out of the printed page */}
          <div className="print:hidden">
            <h2 className="font-serif text-xl font-semibold text-navy-900">How to use this</h2>
            <p className="mt-2 leading-relaxed text-navy-800">{template.howToUse}</p>
            <div className="mt-5">
              <PrintButton />
            </div>
          </div>

          <div className="mt-8 print:mt-0">
            <TemplateSheet template={template} />
          </div>

          <p className="mt-8 border-t border-navy-100 pt-5 text-sm text-navy-600 print:hidden">
            This resource is provided for general educational purposes only and is not legal advice;
            special education procedures and terminology vary by state and district.
          </p>

          <Link
            href="/tools"
            className="mt-6 inline-block text-sm font-medium text-navy-800 underline underline-offset-4 hover:text-navy-950 print:hidden"
          >
            ← All free tools
          </Link>
        </div>
      </section>

      <div className="print:hidden">
        <CtaSection
          heading="Built by an educator, shared freely."
          body="If these templates save your staff room some time, pass them along — and if a student needs more than a form can give, that's what we do."
        />
      </div>
    </>
  );
}
