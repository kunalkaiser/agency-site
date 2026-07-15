import Link from "next/link";
import { SERVICE_AREA, SITE_NAME } from "@/lib/site";

const FOOTER_LINKS = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Accessibility", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-navy-950 text-sand-100">
      <div className="mx-auto max-w-content px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-serif text-lg font-semibold">{SITE_NAME}</p>
            <p className="mt-2 text-sm text-sand-300">{SERVICE_AREA}</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm" aria-label="Footer">
            {FOOTER_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="text-sand-200 hover:text-white">
                {link.label}
              </a>
            ))}
            <Link href="/contact" className="text-sand-200 hover:text-white">
              Contact
            </Link>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sand-200 hover:text-white"
            >
              LinkedIn
            </a>
            <a href="mailto:hello@example.com" className="text-sand-200 hover:text-white">
              Email
            </a>
          </nav>
        </div>
        <p className="mt-10 text-xs text-sand-400">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
