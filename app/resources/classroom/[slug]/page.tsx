import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SituationPage from "@/components/SituationPage";
import { og } from "@/lib/site";
import { SITUATIONS, getSituation } from "../classroom";

export const dynamicParams = false;

export function generateStaticParams() {
  return SITUATIONS.map((situation) => ({ slug: situation.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const situation = getSituation(slug);
  if (!situation) return {};
  return {
    title: situation.metaTitle,
    description: situation.description,
    openGraph: og(`/resources/classroom/${situation.slug}`),
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const situation = getSituation(slug);
  if (!situation) notFound();
  return <SituationPage situation={situation} />;
}
