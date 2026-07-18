import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  // The layout's title template appends the site name.
  title: "Page not found",
  description: "The page you're looking for doesn't exist or has moved.",
};

export default function NotFound() {
  return (
    <section className="bg-navy-950">
      <div className="mx-auto flex max-w-content flex-col items-start px-5 py-24 sm:px-8 sm:py-32">
        <p className="text-sm uppercase tracking-widest text-sand-300">404</p>
        <h1 className="mt-3 max-w-2xl font-serif text-4xl font-semibold leading-tight text-sand-50 sm:text-5xl">
          This page has wandered off course.
        </h1>
        <p className="mt-5 max-w-xl text-lg text-sand-200">
          The page you're looking for doesn't exist or has moved. Let's get you back on track.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-md bg-sand-100 px-6 py-3 text-center font-medium text-navy-900 transition-colors hover:bg-white active:bg-sand-200"
          >
            Back to home
          </Link>
          <Link
            href="/services"
            className="rounded-md border border-sand-300/60 px-6 py-3 text-center font-medium text-sand-100 transition-colors hover:border-sand-200 hover:text-white active:border-sand-100"
          >
            Explore Services
          </Link>
        </div>
        <p className="mt-8 text-sm text-sand-300">
          Looking for something specific?{" "}
          <Link href="/contact" className="underline underline-offset-4 hover:text-white">
            Contact us
          </Link>{" "}
          and we'll point you the right way.
        </p>
      </div>
    </section>
  );
}
