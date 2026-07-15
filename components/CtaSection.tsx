import Link from "next/link";

type Props = {
  heading?: string;
  body?: string;
};

export default function CtaSection({
  heading = "Ready to find the right course for your student?",
  body = "Start with a consult. We'll listen, ask the right questions, and recommend a clear path forward — no pressure, no obligation.",
}: Props) {
  return (
    <section className="bg-navy-900">
      <div className="mx-auto max-w-content px-5 py-16 text-center sm:px-8 sm:py-20">
        <h2 className="mx-auto max-w-2xl font-serif text-3xl font-semibold text-sand-50 sm:text-4xl">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sand-200">{body}</p>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-md bg-sand-100 px-6 py-3 font-medium text-navy-900 transition-colors hover:bg-white active:bg-sand-200"
        >
          Book a Consult
        </Link>
      </div>
    </section>
  );
}
