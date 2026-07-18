import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "@/components/ServicePage";
import { getService } from "@/lib/services";
import { og } from "@/lib/site";

const service = getService("iep-advocacy");

export const metadata: Metadata = service.hidden
  ? { title: "Not found", robots: { index: false } }
  : {
      title: service.name,
      description: service.shortDescription,
      openGraph: og("/services/iep-advocacy"),
    };

export default function Page() {
  if (service.hidden) notFound();
  return <ServicePage service={service} />;
}
