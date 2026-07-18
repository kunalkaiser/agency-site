import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { ADVOCACY_VISIBLE } from "@/lib/services";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Strategic Education & Behavioral Support`,
    template: `%s | ${SITE_NAME}`,
  },
  description: ADVOCACY_VISIBLE
    ? "Strategic education and behavioral support for students, families, and schools. Virtual tutoring, college counseling, special education support, and advocacy for families nationwide."
    : "Strategic education and behavioral support for students, families, and schools. Virtual tutoring, college counseling, and special education support for families nationwide.",
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-navy-900 focus:px-4 focus:py-3 focus:font-medium focus:text-sand-50"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
