import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { getService } from "@/lib/services";

const service = getService("college-counseling");

export const metadata: Metadata = {
  title: service.name,
  description: service.shortDescription,
};

export default function Page() {
  return <ServicePage service={service} />;
}
