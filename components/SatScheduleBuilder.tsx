"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ASSUMED_RUNWAY_WEEKS,
  buildSatPlan,
  type SatPlan,
  type WeakArea,
} from "@/lib/satSchedule";

const inputClasses =
  "w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 placeholder:text-navy-500 focus:border-navy-500";

const WEAK_AREAS: { value: WeakArea; label: string }[] = [
  { value: "reading", label: "Reading comprehension" },
  { value: "grammar", label: "Grammar & conventions" },
  { value: "algebra", label: "Algebra & problem solving" },
  { value: "advanced-math", label: "Advanced math" },
  { value: "not-sure", label: "Not sure" },
];

const DAY_STYLES: Record<string, string> = {
  study: "border-navy-100 bg-white",
  test: "border-navy-900 bg-navy-950 text-sand-50",
  review: "border-navy-300 bg-sand-100",
  rest: "border-navy-100 bg-sand-50 text-navy-500",
  final: "border-sand-400 bg-sand-100",
  examday: "border-navy-900 bg-navy-900 text-sand-50",
};

function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}

export default function SatScheduleBuilder() {
  const [testDate, setTestDate] = useState("");
  const [noDate, setNoDate] = useState(false);
  const [score, setScore] = useState("");
  const [noScore, setNoScore] = useState(false);
  const [isPsat, setIsPsat] = useState(false);
  const [target, setTarget] = useState("");
  const [weakArea, setWeakArea] = useState<WeakArea>("not-sure");
  const [hours, setHours] = useState(6);
  const [feeWaiver, setFeeWaiver] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [plan, setPlan] = useState<SatPlan | null>(null);

  function reset() {
    setTestDate("");
    setNoDate(false);
    setScore("");
    setNoScore(false);
    setIsPsat(false);
    setTarget("");
    setWeakArea("not-sure");
    setHours(6);
    setFeeWaiver(false);
    setErrors([]);
    setPlan(null);
  }

  function generate() {
    const problems: string[] = [];
    const today = new Date().toISOString().slice(0, 10);

    if (!noDate) {
      if (!testDate) problems.push("Pick your test date, or check “I haven't registered yet.”");
      else if (testDate <= today) problems.push("The test date needs to be in the future.");
    }
    let current: number | null = null;
    if (!noScore) {
      current = Number(score);
      if (!score || Number.isNaN(current) || current < 400 || current > 1600)
        problems.push("Enter your most recent total score (400–1600), or check “I haven't taken one yet.”");
    }
    const targetNum = Number(target);
    if (!target || Number.isNaN(targetNum) || targetNum < 400 || targetNum > 1600)
      problems.push("Enter a target score between 400 and 1600.");

    setErrors(problems);
    if (problems.length > 0) return;

    setPlan(
      buildSatPlan({
        testDate: noDate ? null : testDate,
        currentScore: noScore ? null : current,
        isPsat: !noScore && isPsat,
        targetScore: targetNum,
        weakArea,
        weeklyHours: hours,
        feeWaiver,
        today,
      })
    );
  }

  if (plan) {
    return (
      <div>
        <div className="flex flex-wrap gap-3 print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-md bg-navy-900 px-5 py-2.5 font-medium text-sand-50 transition-colors hover:bg-navy-800"
          >
            Print this schedule
          </button>
          <button
            type="button"
            onClick={() => setPlan(null)}
            className="rounded-md border border-navy-300 px-5 py-2.5 font-medium text-navy-900 transition-colors hover:border-navy-500"
          >
            Edit inputs
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-navy-300 px-5 py-2.5 font-medium text-navy-900 transition-colors hover:border-navy-500"
          >
            Start over
          </button>
        </div>

        <div className="mt-8">
          <h2 className="font-serif text-2xl font-semibold text-navy-900">
            Your SAT prep schedule
          </h2>
          <p className="mt-2 text-navy-700">
            Test date {new Date(`${plan.testDate}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            {plan.dateAssumed &&
              ` — assumed at about ${ASSUMED_RUNWAY_WEEKS} weeks out since you haven't registered yet; rebuild the plan once you have a real date`}
            . {plan.weeksRemaining} week{plan.weeksRemaining === 1 ? "" : "s"} of runway, weighted{" "}
            {plan.sectionSplit.rw}% Reading &amp; Writing / {plan.sectionSplit.math}% Math.
          </p>

          <div className="mt-5 rounded-lg border-l-4 border-navy-900 bg-sand-100 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-navy-700">
              A note on pace
            </p>
            <p className="mt-2 leading-relaxed text-navy-800">{plan.paceNote}</p>
          </div>

          <div className="mt-8 space-y-6">
            {plan.weeks.map((week) => (
              <div key={week.week} className="rounded-xl border border-navy-100 bg-white p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-serif text-lg font-semibold text-navy-900">
                    Week {week.week}: {week.phase}
                  </h3>
                  <p className="text-sm text-navy-600">{formatMinutes(week.minutes)} scheduled</p>
                </div>
                <div className="mt-4 grid gap-2">
                  {week.days.map((day) => (
                    <div
                      key={day.date}
                      className={`rounded-lg border p-3 ${DAY_STYLES[day.kind]}`}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p className="text-sm font-semibold">{day.label}</p>
                        {day.kind === "test" && (
                          <p className="text-xs font-semibold uppercase tracking-widest">
                            Bluebook practice test
                          </p>
                        )}
                        {day.kind === "examday" && (
                          <p className="text-xs font-semibold uppercase tracking-widest">
                            Official test day
                          </p>
                        )}
                        {day.kind === "rest" && <p className="text-xs uppercase tracking-widest">Rest</p>}
                      </div>
                      {day.sessions.map((s, i) => (
                        <p key={i} className="mt-1.5 text-sm leading-relaxed">
                          <span className="font-medium">
                            {s.section ? `${s.section}: ` : ""}
                            {s.title}
                          </span>
                          {s.minutes > 0 && <span> ({formatMinutes(s.minutes)})</span>}
                          {s.detail && <span className={day.kind === "test" || day.kind === "examday" ? " text-sand-200" : " text-navy-700"}> — {s.detail}</span>}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h3 className="mt-10 font-serif text-lg font-semibold text-navy-900">
            Official free resources
          </h3>
          <ul className="mt-3 space-y-3">
            {plan.resources.map((r) => (
              <li key={r.url} className="text-navy-800">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline underline-offset-4 hover:text-navy-950"
                >
                  {r.label}
                </a>{" "}
                <span className="text-sm text-navy-700">— {r.note}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3 print:hidden">
            <Link
              href="/contact"
              className="rounded-md border border-navy-300 px-5 py-2.5 font-medium text-navy-900 transition-colors hover:border-navy-500"
            >
              Talk it through with us
            </Link>
          </div>

          <p className="mt-8 border-t border-navy-100 pt-5 text-sm text-navy-600">
            This resource is provided for general educational purposes only and is not legal advice;
            special education procedures and terminology vary by state and district.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Test date */}
      <div className="rounded-xl border border-navy-100 bg-white p-5">
        <h2 className="font-serif text-xl font-semibold text-navy-900">Your test date</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="sat-date" className="mb-1 block text-sm font-medium text-navy-900">
              Date
            </label>
            <input
              id="sat-date"
              type="date"
              value={testDate}
              disabled={noDate}
              onChange={(e) => setTestDate(e.target.value)}
              className={`${inputClasses} disabled:opacity-50`}
            />
          </div>
          <label className="flex cursor-pointer items-end gap-2 pb-2 text-sm text-navy-800">
            <input
              type="checkbox"
              checked={noDate}
              onChange={(e) => setNoDate(e.target.checked)}
              className="h-5 w-5 accent-navy-900"
            />
            I haven&apos;t registered yet (we&apos;ll plan for about {ASSUMED_RUNWAY_WEEKS} weeks out and say so)
          </label>
        </div>
      </div>

      {/* Scores */}
      <div className="mt-6 rounded-xl border border-navy-100 bg-white p-5">
        <h2 className="font-serif text-xl font-semibold text-navy-900">Your scores</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="sat-score" className="mb-1 block text-sm font-medium text-navy-900">
              Most recent total score (400–1600)
            </label>
            <input
              id="sat-score"
              type="number"
              min={400}
              max={1600}
              step={10}
              value={score}
              disabled={noScore}
              onChange={(e) => setScore(e.target.value)}
              placeholder="e.g. 1050"
              className={`${inputClasses} disabled:opacity-50`}
            />
            <label className="mt-2 flex cursor-pointer items-center gap-2 text-sm text-navy-800">
              <input
                type="checkbox"
                checked={isPsat}
                disabled={noScore}
                onChange={(e) => setIsPsat(e.target.checked)}
                className="h-4 w-4 accent-navy-900"
              />
              This is a PSAT score
            </label>
          </div>
          <div>
            <label htmlFor="sat-target" className="mb-1 block text-sm font-medium text-navy-900">
              Target score
            </label>
            <input
              id="sat-target"
              type="number"
              min={400}
              max={1600}
              step={10}
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g. 1250"
              className={inputClasses}
            />
            <label className="mt-2 flex cursor-pointer items-center gap-2 text-sm text-navy-800">
              <input
                type="checkbox"
                checked={noScore}
                onChange={(e) => {
                  setNoScore(e.target.checked);
                  if (e.target.checked) setIsPsat(false);
                }}
                className="h-4 w-4 accent-navy-900"
              />
              I haven&apos;t taken one yet (we&apos;ll schedule a baseline test first)
            </label>
          </div>
        </div>
      </div>

      {/* Weak area */}
      <div className="mt-6">
        <h2 className="font-serif text-xl font-semibold text-navy-900">Weakest area</h2>
        <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Weakest area">
          {WEAK_AREAS.map((w) => (
            <button
              key={w.value}
              type="button"
              role="radio"
              aria-checked={weakArea === w.value}
              onClick={() => setWeakArea(w.value)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                weakArea === w.value
                  ? "border-navy-900 bg-navy-900 text-sand-50"
                  : "border-navy-200 bg-white text-navy-800 hover:border-navy-400"
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hours */}
      <div className="mt-6">
        <h2 className="font-serif text-xl font-semibold text-navy-900">Weekly study time</h2>
        <label htmlFor="sat-hours" className="mt-2 block text-sm text-navy-700">
          Hours you can realistically give this each week:{" "}
          <span className="font-semibold text-navy-900">{hours} hours</span>
        </label>
        <input
          id="sat-hours"
          type="range"
          min={2}
          max={15}
          step={1}
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          className="mt-3 w-full max-w-md accent-navy-900"
        />
      </div>

      {/* Fee waiver */}
      <div className="mt-6">
        <label className="flex cursor-pointer items-center gap-3 text-navy-800">
          <input
            type="checkbox"
            checked={feeWaiver}
            onChange={(e) => setFeeWaiver(e.target.checked)}
            className="h-5 w-5 accent-navy-900"
          />
          I qualify for a fee waiver (adds the official College Board fee-waiver link to your plan)
        </label>
      </div>

      {errors.length > 0 && (
        <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-4" role="alert">
          <ul className="list-disc space-y-1 pl-5 text-sm text-red-900">
            {errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={generate}
        className="mt-8 rounded-md bg-navy-900 px-6 py-3 font-medium text-sand-50 transition-colors hover:bg-navy-800"
      >
        Build my schedule
      </button>
    </div>
  );
}
