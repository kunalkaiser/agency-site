import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GuidedToolkit from "@/components/GuidedToolkit";
import CtaSection from "@/components/CtaSection";
import { og } from "@/lib/site";
import { TOOLKITS, getToolkit } from "../toolkits";

export const dynamicParams = false;

export function generateStaticParams() {
  return TOOLKITS.map((toolkit) => ({ slug: toolkit.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const toolkit = getToolkit(slug);
  if (!toolkit) return {};
  return {
    title: toolkit.title,
    description: toolkit.description,
    openGraph: og(`/resources/toolkits/${toolkit.slug}`),
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const toolkit = getToolkit(slug);
  if (!toolkit) notFound();

  return (
    <>
      <section className="bg-navy-950">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
          <p className="text-sm uppercase tracking-widest text-sand-300">
            Interactive toolkit · Parents
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold text-sand-50 sm:text-5xl">
            {toolkit.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-sand-200">{toolkit.intro}</p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
          <GuidedToolkit toolkit={toolkit} />
          <Link
            href="/resources"
            className="mt-8 inline-block text-sm font-medium text-navy-800 underline underline-offset-4 hover:text-navy-950"
          >
            ← All resources
          </Link>
        </div>
      </section>

      <CtaSection
        heading="Every family's version of this is a little different."
        body="A toolkit covers the common patterns; a consult covers yours. Book one and we'll talk through what you're seeing at home."
      />
    </>
  );
}
