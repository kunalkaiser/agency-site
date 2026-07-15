"use client";

import { useState } from "react";
import { SERVICES } from "@/lib/services";

// Inlined at build time; NEXT_PUBLIC_ because the static site submits from the browser.
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
const FALLBACK_EMAIL = "hello@example.com";

const inputClasses =
  "w-full rounded-md border bg-white px-4 py-3 text-navy-900 placeholder:text-navy-500 focus:border-navy-500";

type FieldErrors = { name?: string; email?: string; message?: string };

function validate(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  if (!String(data.get("name") ?? "").trim()) {
    errors.name = "Please enter your name.";
  }
  const email = String(data.get("email") ?? "").trim();
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!String(data.get("message") ?? "").trim()) {
    errors.message = "Please tell us a little about what you're looking for.";
  }
  return errors;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm text-red-700">
      {message}
    </p>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const fieldErrors = validate(data);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    if (!FORM_ENDPOINT) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function clearError(field: keyof FieldErrors) {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }

  function borderFor(field: keyof FieldErrors) {
    return errors[field] ? "border-red-400" : "border-navy-200";
  }

  if (status === "success") {
    return (
      <div
        className="flex h-full flex-col justify-center rounded-xl border border-navy-100 bg-white p-10 text-center"
        role="status"
      >
        <h2 className="font-serif text-2xl font-semibold text-navy-900">
          Thank you — your message is on its way.
        </h2>
        <p className="mt-4 text-navy-700">
          We read every inquiry carefully and will respond within 2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-navy-900">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            onChange={() => clearError("name")}
            className={`${inputClasses} ${borderFor("name")}`}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-navy-900">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            onChange={() => clearError("email")}
            className={`${inputClasses} ${borderFor("email")}`}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-navy-900">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" className={`${inputClasses} border-navy-200`} />
        </div>
        <div>
          <label htmlFor="role" className="mb-2 block text-sm font-medium text-navy-900">
            I am a…
          </label>
          <select
            id="role"
            name="role"
            className={`${inputClasses} border-navy-200`}
            defaultValue=""
          >
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
          <select
            id="service"
            name="service"
            className={`${inputClasses} border-navy-200`}
            defaultValue=""
          >
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
          <textarea
            id="message"
            name="message"
            rows={5}
            aria-required="true"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            onChange={() => clearError("message")}
            className={`${inputClasses} ${borderFor("message")}`}
          />
          <FieldError id="message-error" message={errors.message} />
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

      {status === "error" && (
        <p
          role="alert"
          className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          Something went wrong and your message wasn&apos;t sent. Please email us directly at{" "}
          <a href={`mailto:${FALLBACK_EMAIL}`} className="font-medium underline underline-offset-2">
            {FALLBACK_EMAIL}
          </a>{" "}
          — we&apos;ll respond within 2 business days.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-8 rounded-md bg-navy-900 px-7 py-3 font-medium text-sand-50 transition-colors hover:bg-navy-800 active:bg-navy-950 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
      <p className="mt-4 text-sm text-navy-600">
        We respond to every inquiry within 2 business days.
      </p>
    </form>
  );
}
