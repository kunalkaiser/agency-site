"use client";

import { useState } from "react";
import {
  buildPlan,
  normalizeGrade,
  REGENTS_PASSING,
  REGENTS_SUBJECTS,
  type Cadence,
  type Goal,
  type PlanOutput,
  type SubjectInput,
} from "@/lib/planBuilder";

const inputClasses =
  "w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-navy-900 placeholder:text-navy-500 focus:border-navy-500";

const GOALS: { value: Goal; label: string }[] = [
  { value: "raise-grades", label: "Raise my grades" },
  { value: "pass-exams", label: "Pass end-of-year exams" },
  { value: "get-ahead", label: "Get ahead" },
];

const CADENCES: { value: Cadence; label: string; hint: string }[] = [
  { value: "weekly", label: "Weekly", hint: "a day-by-day schedule" },
  { value: "monthly", label: "Monthly", hint: "four weekly focus themes" },
  { value: "quarterly", label: "Quarterly", hint: "three monthly phases" },
];

const BAND_STYLES = {
  red: { label: "Rebuild", chip: "bg-red-100 text-red-900 border border-red-200" },
  yellow: { label: "Strengthen", chip: "bg-amber-100 text-amber-900 border border-amber-200" },
  green: { label: "Maintain", chip: "bg-emerald-100 text-emerald-900 border border-emerald-200" },
} as const;

type Row = SubjectInput & { key: number };

const emptyRow = (key: number): Row => ({ key, name: "", grade: "", struggles: "" });

function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}

export default function PlanBuilder() {
  const [rows, setRows] = useState<Row[]>([emptyRow(0), emptyRow(1), emptyRow(2)]);
  const [nextKey, setNextKey] = useState(3);
  const [goal, setGoal] = useState<Goal>("raise-grades");
  const [hours, setHours] = useState(6);
  const [cadence, setCadence] = useState<Cadence>("weekly");
  const [regentsMode, setRegentsMode] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [plan, setPlan] = useState<PlanOutput | null>(null);

  function updateRow(key: number, patch: Partial<SubjectInput>) {
    setRows((rs) => rs.map((r) => (r.key === key ? { ...r, ...patch } : r)));
  }

  function addRow() {
    setRows((rs) => [...rs, emptyRow(nextKey)]);
    setNextKey((k) => k + 1);
  }

  function removeRow(key: number) {
    setRows((rs) => (rs.length > 1 ? rs.filter((r) => r.key !== key) : rs));
  }

  function toggleRegents(on: boolean) {
    setRegentsMode(on);
    if (on) {
      setRows(REGENTS_SUBJECTS.map((name, i) => ({ key: i, name, grade: "", struggles: "" })));
      setNextKey(REGENTS_SUBJECTS.length);
      setGoal("pass-exams");
    }
  }

  function reset() {
    setRows([emptyRow(0), emptyRow(1), emptyRow(2)]);
    setNextKey(3);
    setGoal("raise-grades");
    setHours(6);
    setCadence("weekly");
    setRegentsMode(false);
    setErrors([]);
    setPlan(null);
  }

  function generate() {
    const filled = rows.filter((r) => r.name.trim() !== "" || r.grade.trim() !== "");
    const problems: string[] = [];
    if (filled.length === 0) problems.push("Add at least one subject with a grade.");
    for (const r of filled) {
      if (!r.name.trim()) problems.push("One subject is missing a name.");
      else if (normalizeGrade(r.grade) === null)
        problems.push(
          `Couldn't read the grade for ${r.name.trim()} — use a percentage (82), a letter (B+), or NY / L / P / M.`
        );
    }
    setErrors(problems);
    if (problems.length > 0 || filled.length === 0) return;
    setPlan(
      buildPlan({
        subjects: filled.map((r) => ({
          name: r.name.trim(),
          grade: r.grade,
          struggles: r.struggles,
        })),
        goal,
        weeklyHours: hours,
        cadence,
        regentsMode,
      })
    );
  }

  if (plan) {
    return (
      <div>
        {/* Controls — hidden when printing */}
        <div className="flex flex-wrap gap-3 print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-md bg-navy-900 px-5 py-2.5 font-medium text-sand-50 transition-colors hover:bg-navy-800"
          >
            Print this plan
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

        {/* Subject overview */}
        <div className="mt-8">
          <h2 className="font-serif text-2xl font-semibold text-navy-900">
            Your {plan.cadence} study plan
          </h2>
          <p className="mt-2 text-navy-700">
            {plan.weeklyHours} hours per week, weakest subjects first.
            {regentsMode && ` Regents passing score: ${REGENTS_PASSING}.`}
          </p>
          <div className="mt-6 space-y-4">
            {plan.subjects.map((s) => (
              <div key={s.name} className="rounded-xl border border-navy-100 bg-white p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-serif text-lg font-semibold text-navy-900">{s.name}</h3>
                  <span className={`rounded-full px-3 py-0.5 text-xs font-medium ${BAND_STYLES[s.band].chip}`}>
                    {BAND_STYLES[s.band].label}
                  </span>
                  <span className="text-sm text-navy-600">
                    now at {s.score} · {formatMinutes(s.minutesPerWeek)}/week
                  </span>
                </div>
                {s.regentsNote && <p className="mt-2 text-sm text-navy-700">{s.regentsNote}</p>}
                {s.struggles && (
                  <p className="mt-2 text-sm text-navy-700">
                    Focus topics: <span className="font-medium">{s.struggles}</span>
                  </p>
                )}
                <ul className="mt-4 space-y-3">
                  {s.blocks.map((b) => (
                    <li key={b.id} className="text-sm leading-relaxed text-navy-800">
                      <span className="font-semibold">{b.title}</span>{" "}
                      <span className="text-navy-600">(~{b.minutes} min)</span> — {b.howTo}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Cadence detail */}
        {plan.weekly && (
          <div className="mt-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900">The week, day by day</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {plan.weekly.map((d) => (
                <div key={d.day} className="rounded-xl border border-navy-100 bg-white p-5">
                  <h3 className="font-serif text-lg font-semibold text-navy-900">{d.day}</h3>
                  {d.sessions.length === 0 ? (
                    <p className="mt-2 text-sm text-navy-600">Rest day — no sessions scheduled.</p>
                  ) : (
                    <ul className="mt-3 space-y-2">
                      {d.sessions.map((sess, i) => (
                        <li key={i} className="text-sm text-navy-800">
                          <span className="font-medium">{sess.subject}</span> — {sess.block.title} (
                          {formatMinutes(sess.minutes)})
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {plan.monthly && (
          <div className="mt-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900">The month, week by week</h2>
            <ol className="mt-6 space-y-4">
              {plan.monthly.map((w) => (
                <li key={w.week} className="rounded-xl border border-navy-100 bg-white p-5">
                  <h3 className="font-serif text-lg font-semibold text-navy-900">
                    Week {w.week}: {w.theme}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-800">{w.guidance}</p>
                  <p className="mt-2 text-sm text-navy-600">Emphasis: {w.emphasis.join(", ")}</p>
                </li>
              ))}
            </ol>
          </div>
        )}

        {plan.quarterly && (
          <div className="mt-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900">The quarter, month by month</h2>
            <ol className="mt-6 space-y-4">
              {plan.quarterly.map((p) => (
                <li key={p.month} className="rounded-xl border border-navy-100 bg-white p-5">
                  <h3 className="font-serif text-lg font-semibold text-navy-900">
                    Month {p.month}: {p.phase}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-800">{p.guidance}</p>
                  <p className="mt-2 text-sm text-navy-600">Emphasis: {p.emphasis.join(", ")}</p>
                  <p className="mt-3 text-sm font-medium text-navy-800">{p.checkpoint}</p>
                </li>
              ))}
            </ol>
          </div>
        )}

        <p className="mt-12 border-t border-navy-100 pt-6 text-sm text-navy-600">
          This tool is provided for general educational purposes only. It offers study-skills
          suggestions based on the numbers you enter — it is not an evaluation, and it is no
          substitute for guidance from your student&apos;s own teachers and school.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Regents mode */}
      <div className="rounded-xl border border-navy-100 bg-white p-5">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={regentsMode}
            onChange={(e) => toggleRegents(e.target.checked)}
            className="mt-1 h-5 w-5 accent-navy-900"
          />
          <span>
            <span className="font-medium text-navy-900">NY Regents mode</span>
            <span className="mt-1 block text-sm text-navy-700">
              Preloads the five common Regents exam subjects and shows each grade against the{" "}
              {REGENTS_PASSING} passing score.
            </span>
          </span>
        </label>
      </div>

      {/* Subjects */}
      <div className="mt-8">
        <h2 className="font-serif text-xl font-semibold text-navy-900">Your subjects</h2>
        <p className="mt-2 text-sm text-navy-700">
          Grades can be a percentage (82), a letter (B+), or the NY scale (NY, L, P, M).
        </p>
        <div className="mt-4 space-y-4">
          {rows.map((row) => (
            <div key={row.key} className="rounded-xl border border-navy-100 bg-white p-4">
              <div className="grid gap-3 sm:grid-cols-[2fr,1fr,auto]">
                <div>
                  <label htmlFor={`subject-${row.key}`} className="mb-1 block text-sm font-medium text-navy-900">
                    Subject
                  </label>
                  <input
                    id={`subject-${row.key}`}
                    type="text"
                    value={row.name}
                    onChange={(e) => updateRow(row.key, { name: e.target.value })}
                    className={inputClasses}
                    placeholder="e.g. Algebra I"
                  />
                </div>
                <div>
                  <label htmlFor={`grade-${row.key}`} className="mb-1 block text-sm font-medium text-navy-900">
                    Current grade
                  </label>
                  <input
                    id={`grade-${row.key}`}
                    type="text"
                    value={row.grade}
                    onChange={(e) => updateRow(row.key, { grade: e.target.value })}
                    className={inputClasses}
                    placeholder="82, B+, or P"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeRow(row.key)}
                    className="rounded-md border border-navy-200 px-3 py-2 text-sm text-navy-700 transition-colors hover:border-navy-400"
                    aria-label={`Remove ${row.name || "subject"}`}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <label htmlFor={`struggles-${row.key}`} className="mb-1 block text-sm font-medium text-navy-900">
                  Topics I struggle with <span className="font-normal text-navy-600">(optional)</span>
                </label>
                <input
                  id={`struggles-${row.key}`}
                  type="text"
                  value={row.struggles}
                  onChange={(e) => updateRow(row.key, { struggles: e.target.value })}
                  className={inputClasses}
                  placeholder="e.g. word problems, essay conclusions"
                />
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addRow}
          className="mt-4 rounded-md border border-navy-300 px-4 py-2 text-sm font-medium text-navy-900 transition-colors hover:border-navy-500"
        >
          + Add a subject
        </button>
      </div>

      {/* Goal */}
      <div className="mt-8">
        <h2 className="font-serif text-xl font-semibold text-navy-900">Your goal</h2>
        <div className="mt-4 flex flex-wrap gap-3" role="radiogroup" aria-label="Goal">
          {GOALS.map((g) => (
            <button
              key={g.value}
              type="button"
              role="radio"
              aria-checked={goal === g.value}
              onClick={() => setGoal(g.value)}
              className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                goal === g.value
                  ? "border-navy-900 bg-navy-900 text-sand-50"
                  : "border-navy-200 bg-white text-navy-800 hover:border-navy-400"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hours */}
      <div className="mt-8">
        <h2 className="font-serif text-xl font-semibold text-navy-900">Weekly study time</h2>
        <label htmlFor="hours" className="mt-2 block text-sm text-navy-700">
          Hours you can realistically study each week (outside class):{" "}
          <span className="font-semibold text-navy-900">{hours} hours</span>
        </label>
        <input
          id="hours"
          type="range"
          min={2}
          max={20}
          step={1}
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          className="mt-3 w-full max-w-md accent-navy-900"
        />
      </div>

      {/* Cadence */}
      <div className="mt-8">
        <h2 className="font-serif text-xl font-semibold text-navy-900">Plan cadence</h2>
        <div className="mt-4 flex flex-wrap gap-3" role="radiogroup" aria-label="Plan cadence">
          {CADENCES.map((c) => (
            <button
              key={c.value}
              type="button"
              role="radio"
              aria-checked={cadence === c.value}
              onClick={() => setCadence(c.value)}
              className={`rounded-md border px-4 py-2 text-left text-sm transition-colors ${
                cadence === c.value
                  ? "border-navy-900 bg-navy-900 text-sand-50"
                  : "border-navy-200 bg-white text-navy-800 hover:border-navy-400"
              }`}
            >
              <span className="font-medium">{c.label}</span>
              <span className={`block text-xs ${cadence === c.value ? "text-sand-200" : "text-navy-600"}`}>
                {c.hint}
              </span>
            </button>
          ))}
        </div>
      </div>

      {errors.length > 0 && (
        <div className="mt-8 rounded-md border border-red-200 bg-red-50 p-4" role="alert">
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
        Build my plan
      </button>
    </div>
  );
}
