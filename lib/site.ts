export const SITE_NAME = "TrueCourse Education Group";
export const SERVICE_AREA = "Virtual services for families nationwide";
// Swap for the custom domain once it's attached in Netlify.
export const SITE_URL = "https://agency-site-tcg.netlify.app";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Resources", href: "/resources" },
  { label: "Free Tools", href: "/tools" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Complete openGraph object for a route. Next.js does NOT deep-merge child
 * openGraph metadata with the layout's, so every page that wants a correct
 * og:url must pass the full object — use this helper.
 */
export function og(path: string) {
  return {
    siteName: SITE_NAME,
    type: "website" as const,
    locale: "en_US",
    url: path,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE_NAME }],
  };
}
