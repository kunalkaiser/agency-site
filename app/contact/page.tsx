import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { SERVICE_AREA } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a consult or send us a message. Serving NYC & Westchester — we respond within 2 business days.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy-950">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
          <h1 className="font-serif text-4xl font-semibold text-sand-50 sm:text-5xl">Contact</h1>
          <p className="mt-5 max-w-2xl text-lg text-sand-200">
            Tell us a little about your student and what you're hoping to change. We read every
            message carefully — a real person will respond within 2 business days.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-14 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Sidebar: service area + Calendly embed (widget not yet connected) */}
            <aside className="lg:col-span-2">
              <div className="rounded-xl border border-navy-100 bg-white p-7">
                <h2 className="font-serif text-xl font-semibold text-navy-900">Service area</h2>
                <p className="mt-3 text-navy-700">
                  {SERVICE_AREA}. Remote services are available throughout our service area; IEP
                  Advocacy is offered in Westchester only.
                </p>
              </div>
              <div className="mt-6 rounded-xl border border-dashed border-navy-300 bg-sand-100 p-7">
                <h2 className="font-serif text-xl font-semibold text-navy-900">
                  Prefer to book directly?
                </h2>
                <p className="mt-3 text-navy-700">
                  Schedule a consult at a time that works for you.
                </p>
                <div
                  className="mt-5 flex h-64 items-center justify-center rounded-lg border border-navy-200 bg-white text-sm text-navy-600"
                  role="img"
                  aria-label="Calendly scheduling widget (coming soon)"
                >
                  Online scheduling coming soon
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
