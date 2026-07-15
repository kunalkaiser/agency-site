"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS, SITE_NAME } from "@/lib/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function isCurrent(href: string) {
    return pathname === href ? ("page" as const) : undefined;
  }

  return (
    <header
      className="sticky top-0 z-50 border-b border-navy-100 bg-sand-50/95 backdrop-blur"
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-content items-center justify-between px-5 py-4 sm:px-8"
      >
        <Link href="/" className="font-serif text-lg font-semibold tracking-tight text-navy-900">
          {SITE_NAME}
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isCurrent(link.href)}
              className="text-sm text-navy-700 underline-offset-4 transition-colors hover:text-navy-950 hover:underline aria-[current=page]:font-medium aria-[current=page]:text-navy-950"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-md bg-navy-900 px-4 py-2 text-sm font-medium text-sand-50 transition-colors hover:bg-navy-800 active:bg-navy-950"
          >
            Book a Consult
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md text-navy-900 transition-colors hover:bg-sand-100 active:bg-sand-200 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            {open ? (
              <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-navy-100 bg-sand-50 px-5 pb-6 pt-2 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isCurrent(link.href)}
                className="rounded-md px-2 py-3 text-navy-800 transition-colors hover:bg-sand-100 active:bg-sand-200 aria-[current=page]:font-medium aria-[current=page]:text-navy-950"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-3 rounded-md bg-navy-900 px-4 py-3 text-center font-medium text-sand-50 transition-colors hover:bg-navy-800 active:bg-navy-950"
              onClick={() => setOpen(false)}
            >
              Book a Consult
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
