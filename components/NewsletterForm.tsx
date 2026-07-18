"use client";

import { useState } from "react";

// Netlify Forms newsletter signup. The form markup below is present in the
// statically exported HTML, which is how Netlify registers the form at deploy
// time (same technique as the contact form). Submissions POST url-encoded to
// "/" with form-name=newsletter.
export default function NewsletterForm({ slim = false }: { slim?: boolean }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const body = new URLSearchParams();
      data.forEach((value, key) => body.append(key, value.toString()));
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`Form submission responded ${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const dark = slim; // the slim variant sits on the dark footer

  if (status === "success") {
    return (
      <p
        role="status"
        className={dark ? "text-sm text-sand-200" : "rounded-md border border-navy-200 bg-white px-4 py-3 text-navy-800"}
      >
        You're on the list — one useful email a month, starting with the next one.
      </p>
    );
  }

  return (
    <form
      name="newsletter"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      aria-label="Newsletter signup"
    >
      <input type="hidden" name="form-name" value="newsletter" />
      <p className="hidden" aria-hidden="true">
        <label>
          Don&apos;t fill this out if you&apos;re human:
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      {!slim && (
        <p className="text-navy-700">
          One new free tool or guide each month — no spam, unsubscribe anytime.
        </p>
      )}

      <div className={`flex flex-col gap-2 sm:flex-row ${slim ? "" : "mt-4"}`}>
        <label htmlFor={slim ? "newsletter-email-slim" : "newsletter-email"} className="sr-only">
          Email address
        </label>
        <input
          id={slim ? "newsletter-email-slim" : "newsletter-email"}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={
            dark
              ? "w-full rounded-md border border-navy-700 bg-navy-800 px-4 py-2.5 text-sm text-sand-50 placeholder:text-sand-400 focus:border-sand-300"
              : "w-full rounded-md border border-navy-200 bg-white px-4 py-2.5 text-navy-900 placeholder:text-navy-500 focus:border-navy-500"
          }
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className={
            dark
              ? "shrink-0 rounded-md bg-sand-100 px-5 py-2.5 text-sm font-medium text-navy-900 transition-colors hover:bg-white disabled:opacity-60"
              : "shrink-0 rounded-md bg-navy-900 px-5 py-2.5 font-medium text-sand-50 transition-colors hover:bg-navy-800 disabled:opacity-60"
          }
        >
          {status === "submitting" ? "Signing up…" : "Sign up"}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className={`mt-2 text-sm ${dark ? "text-red-300" : "text-red-700"}`}>
          That didn&apos;t go through — check the address and try again.
        </p>
      )}
    </form>
  );
}
