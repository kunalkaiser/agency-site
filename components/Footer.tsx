import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import { SERVICE_AREA, SITE_NAME } from "@/lib/site";

const FOOTER_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
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
              <a
                key={link.label}
                href={link.href}
                className="text-sand-200 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/contact"
              className="text-sand-200 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Contact
            </Link>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sand-200 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="mailto:hello@example.com"
              className="text-sand-200 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Email
            </a>
          </nav>
        </div>
        <div className="mt-10 border-t border-navy-800 pt-8">
          <p className="text-sm text-sand-200">
            One new free tool or guide each month — no spam, unsubscribe anytime.
          </p>
          <div className="mt-3 max-w-md">
            <NewsletterForm slim />
          </div>
        </div>

        <p className="mt-10 text-xs text-sand-400">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
