import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { VISIBLE_SERVICES } from "@/lib/services";
import { ARTICLES } from "@/app/resources/articles";
import { TOOLKITS } from "@/app/resources/toolkits/toolkits";
import { TEMPLATES } from "@/app/resources/templates/templates";
import { SITUATIONS } from "@/app/resources/classroom/classroom";

export const dynamic = "force-static";

const STATIC_ROUTES = [
  "",
  "/services",
  "/tools",
  "/about",
  "/process",
  "/resources",
  "/resources/plan-builder",
  "/resources/sat-schedule",
  "/resources/study-coach",
  "/resources/which-support",
  "/resources/classroom",
  "/contact",
  "/privacy",
  "/terms",
  "/accessibility",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...STATIC_ROUTES,
    ...VISIBLE_SERVICES.map((s) => `/services/${s.slug}`),
    ...ARTICLES.map((a) => `/resources/${a.slug}`),
    ...TOOLKITS.map((t) => `/resources/toolkits/${t.slug}`),
    ...TEMPLATES.map((t) => `/resources/templates/${t.slug}`),
    ...SITUATIONS.map((s) => `/resources/classroom/${s.slug}`),
  ];
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
