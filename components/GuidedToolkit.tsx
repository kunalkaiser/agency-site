"use client";

import { useState } from "react";
import Link from "next/link";
import type { Toolkit, ToolkitOutcome, ToolkitStep } from "@/app/resources/toolkits/toolkits";

/** Longest question-path through the tree, for honest progress labels. */
function maxDepth(toolkit: Toolkit): number {
  const steps = new Map(toolkit.steps.map((s) => [s.id, s]));
  const depthFrom = (id: string, seen: Set<string>): number => {
    const step = steps.get(id);
    if (!step || seen.has(id)) return 0;
    const nextSeen = new Set(seen).add(id);
    return 1 + Math.max(0, ...step.options.map((o) => depthFrom(o.next, nextSeen)));
  };
  return depthFrom(toolkit.firstStep, new Set());
}

export default function GuidedToolkit({ toolkit }: { toolkit: Toolkit }) {
  const [path, setPath] = useState<string[]>([toolkit.firstStep]);
  const [outcomeId, setOutcomeId] = useState<string | null>(null);

  const total = maxDepth(toolkit);
  const steps = new Map(toolkit.steps.map((s) => [s.id, s]));
  const outcomes = new Map(toolkit.outcomes.map((o) => [o.id, o]));

  const current: ToolkitStep | undefined = steps.get(path[path.length - 1]);
  const outcome: ToolkitOutcome | undefined = outcomeId ? outcomes.get(outcomeId) : undefined;

  function choose(next: string) {
    if (outcomes.has(next)) setOutcomeId(next);
    else if (steps.has(next)) setPath((p) => [...p, next]);
  }

  function back() {
    if (outcomeId) setOutcomeId(null);
    else if (path.length > 1) setPath((p) => p.slice(0, -1));
  }

  function restart() {
    setPath([toolkit.firstStep]);
    setOutcomeId(null);
  }

  if (outcome) {
    return (
      <div className="rounded-xl border border-navy-100 bg-white p-6 sm:p-8">
        <p className="text-xs uppercase tracking-widest text-sand-700">Your strategies</p>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-navy-900">{outcome.title}</h2>
        <p className="mt-3 leading-relaxed text-navy-800">{outcome.intro}</p>

        <ol className="mt-6 space-y-4">
          {outcome.steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-900 font-serif text-sm text-sand-50">
                {i + 1}
              </span>
              <p className="pt-1 leading-relaxed text-navy-800">{step}</p>
            </li>
          ))}
        </ol>

        {outcome.related && (
          <p className="mt-8 rounded-md bg-sand-100 px-4 py-3 text-sm text-navy-800">
            Related reading:{" "}
            <Link
              href={`/resources/${outcome.related.slug}`}
              className="font-medium underline underline-offset-4 hover:text-navy-950"
            >
              {outcome.related.title}
            </Link>
          </p>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-md bg-navy-900 px-5 py-2.5 font-medium text-sand-50 transition-colors hover:bg-navy-800"
          >
            Talk it through with us
          </Link>
          <button
            type="button"
            onClick={back}
            className="rounded-md border border-navy-300 px-5 py-2.5 font-medium text-navy-900 transition-colors hover:border-navy-500"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={restart}
            className="rounded-md border border-navy-300 px-5 py-2.5 font-medium text-navy-900 transition-colors hover:border-navy-500"
          >
            Start over
          </button>
        </div>

        <p className="mt-8 border-t border-navy-100 pt-5 text-sm text-navy-600">
          This resource is provided for general educational purposes only and is not legal advice;
          special education procedures and terminology vary by state and district.
        </p>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="rounded-xl border border-navy-100 bg-white p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-widest text-sand-700">
          Question {path.length} of up to {total}
        </p>
        <div className="flex gap-1.5" aria-hidden="true">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-6 rounded-full ${i < path.length ? "bg-navy-900" : "bg-navy-100"}`}
            />
          ))}
        </div>
      </div>

      <h2 className="mt-4 font-serif text-2xl font-semibold text-navy-900">{current.question}</h2>
      {current.hint && <p className="mt-2 text-navy-700">{current.hint}</p>}

      <div className="mt-6 grid gap-3">
        {current.options.map((option) => (
          <button
            key={option.next}
            type="button"
            onClick={() => choose(option.next)}
            className="rounded-lg border border-navy-200 bg-white px-5 py-4 text-left text-navy-900 transition-colors hover:border-navy-500 hover:bg-sand-100"
          >
            {option.label}
          </button>
        ))}
      </div>

      {path.length > 1 && (
        <button
          type="button"
          onClick={back}
          className="mt-6 text-sm font-medium text-navy-700 underline underline-offset-4 hover:text-navy-950"
        >
          ← Back
        </button>
      )}
    </div>
  );
}
