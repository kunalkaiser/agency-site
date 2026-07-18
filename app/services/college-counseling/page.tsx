import type { Metadata } from "next";
import { og } from "@/lib/site";
import ServicePage from "@/components/ServicePage";
import { getService } from "@/lib/services";

const service = getService("college-counseling");

export const metadata: Metadata = {
  title: service.name,
  description: service.shortDescription,
  openGraph: og("/services/college-counseling"),
};

export default function Page() {
  return <ServicePage service={service} />;
}
