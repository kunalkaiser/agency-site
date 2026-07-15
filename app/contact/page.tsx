import type { Metadata } from "next";
import { SERVICES } from "@/lib/services";
import { SERVICE_AREA } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a consult or send us a message. Serving NYC & Westchester — we respond within 2 business days.",
};

const inputClasses =
  "w-full rounded-md border border-navy-200 bg-white px-4 py-3 text-navy-900 placeholder:text-navy-300 focus:border-navy-500 focus:outline-none";

export default function ContactPage() {
  // Read at build time (static export); set in .env.local — never committed.
  const formEndpoint = process.env.FORM_ENDPOINT;

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
            <form
              action={formEndpoint || undefined}
              method="POST"
              className="lg:col-span-3"
              aria-label="Contact form"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-navy-900">
                    Name
                  </label>
                  <input id="name" name="name" type="text" required className={inputClasses} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-navy-900">
                    Email
                  </label>
                  <input id="email" name="email" type="email" required className={inputClasses} />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-navy-900">
                    Phone
                  </label>
                  <input id="phone" name="phone" type="tel" className={inputClasses} />
                </div>
                <div>
                  <label htmlFor="role" className="mb-2 block text-sm font-medium text-navy-900">
                    I am a…
                  </label>
                  <select id="role" name="role" required className={inputClasses} defaultValue="">
                    <option value="" disabled>
                      Select one
                    </option>
                    <option>Parent / Guardian</option>
                    <option>Student</option>
                    <option>School / Educator</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="service" className="mb-2 block text-sm font-medium text-navy-900">
                    Service of interest
                  </label>
                  <select id="service" name="service" className={inputClasses} defaultValue="">
                    <option value="" disabled>
                      Select one
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s.slug}>{s.name}</option>
                    ))}
                    <option>Not sure yet</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-navy-900">
                    Message
                  </label>
                  <textarea id="message" name="message" rows={5} required className={inputClasses} />
                </div>
                <fieldset className="sm:col-span-2">
                  <legend className="mb-2 text-sm font-medium text-navy-900">
                    Preferred contact method
                  </legend>
                  <div className="flex flex-wrap gap-6">
                    {["Email", "Phone", "Either"].map((method) => (
                      <label key={method} className="flex items-center gap-2 text-navy-800">
                        <input
                          type="radio"
                          name="preferred_contact"
                          value={method}
                          defaultChecked={method === "Either"}
                          className="h-4 w-4 accent-navy-900"
                        />
                        {method}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
              <button
                type="submit"
                className="mt-8 rounded-md bg-navy-900 px-7 py-3 font-medium text-sand-50 transition-colors hover:bg-navy-800"
              >
                Send message
              </button>
              <p className="mt-4 text-sm text-navy-600">
                We respond to every inquiry within 2 business days.
              </p>
            </form>

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
                  className="mt-5 flex h-64 items-center justify-center rounded-lg border border-navy-200 bg-white text-sm text-navy-400"
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
