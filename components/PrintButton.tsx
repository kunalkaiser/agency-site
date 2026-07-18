"use client";

export default function PrintButton({ label = "Print this template" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-md bg-navy-900 px-5 py-2.5 font-medium text-sand-50 transition-colors hover:bg-navy-800"
    >
      {label}
    </button>
  );
}
