import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "@/components/ServicePage";
import { getService } from "@/lib/services";

const service = getService("iep-advocacy");

export const metadata: Metadata = service.hidden
  ? { title: "Not found", robots: { index: false } }
  : { title: service.name, description: service.shortDescription };

export default function Page() {
  if (service.hidden) notFound();
  return <ServicePage service={service} />;
}
