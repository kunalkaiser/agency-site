import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { ARTICLES } from "@/app/resources/articles";

export const dynamic = "force-static";

const STATIC_ROUTES = [
  "",
  "/services",
  "/about",
  "/process",
  "/resources",
  "/contact",
  "/privacy",
  "/terms",
  "/accessibility",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...STATIC_ROUTES,
    ...SERVICES.map((s) => `/services/${s.slug}`),
    ...ARTICLES.map((a) => `/resources/${a.slug}`),
  ];
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
