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
  { label: "Contact", href: "/contact" },
] as const;
