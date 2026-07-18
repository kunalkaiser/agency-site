"use client";

import { useState } from "react";
import Link from "next/link";
import type { Audience, ToolCard } from "@/app/tools/tools-data";

const FILTERS = ["All", "Parents", "Teachers", "Students"] as const;
type Filter = (typeof FILTERS)[number];

function CardInner({ card }: { card: ToolCard }) {
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-widest text-sand-700">{card.tag}</p>
        <p className="text-xs text-navy-600">{card.audiences.join(" · ")}</p>
      </div>
      <h3 className="mt-2 font-serif text-lg font-semibold text-navy-900">{card.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-700">{card.valueProp}</p>
      <span className="mt-5 text-sm font-medium text-navy-800 group-hover:underline">
        {card.external ? "Visit ↗" : "Open →"}
      </span>
    </>
  );
}

export default function ToolsDirectory({ cards }: { cards: ToolCard[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  const visible =
    filter === "All" ? cards : cards.filter((c) => c.audiences.includes(filter as Audience));

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by audience">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              filter === f
                ? "border-navy-900 bg-navy-900 text-sand-50"
                : "border-navy-200 bg-white text-navy-800 hover:border-navy-400"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((card) =>
          card.external ? (
            <a
              key={card.href}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-xl border border-navy-100 bg-white p-6 transition hover:border-navy-300 hover:shadow-lg"
            >
              <CardInner card={card} />
            </a>
          ) : (
            <Link
              key={card.href}
              href={card.href}
              className="group flex flex-col rounded-xl border border-navy-100 bg-white p-6 transition hover:border-navy-300 hover:shadow-lg"
            >
              <CardInner card={card} />
            </Link>
          )
        )}
      </div>
      <p className="mt-6 text-sm text-navy-600" aria-live="polite">
        Showing {visible.length} of {cards.length} free resources.
      </p>
    </div>
  );
}
