// Pure, deterministic Digital SAT schedule engine. No network, no storage,
// no randomness — same inputs (including `today`) always produce the same
// plan. Mirrors lib/planBuilder.ts patterns.

export type WeakArea = "reading" | "grammar" | "algebra" | "advanced-math" | "not-sure";
export type SatSection = "RW" | "Math";

export type SatInput = {
  /** ISO date (yyyy-mm-dd), or null for "haven't registered yet". */
  testDate: string | null;
  /** Total score 400–1600, or null for "haven't taken one yet". */
  currentScore: number | null;
  /** Labels the current score as a PSAT score in output copy. */
  isPsat?: boolean;
  targetScore: number;
  weakArea: WeakArea;
  /** 2–15 weekly study hours. */
  weeklyHours: number;
  feeWaiver?: boolean;
  /** ISO date used as "today" — injectable so the engine stays deterministic. */
  today: string;
};

export type SatSession = {
  title: string;
  minutes: number;
  section?: SatSection;
  detail?: string;
};

export type SatDay = {
  /** ISO date. */
  date: string;
  /** e.g. "Mon Oct 5". */
  label: string;
  kind: "study" | "test" | "review" | "rest" | "final" | "examday";
  sessions: SatSession[];
};

export type SatWeek = {
  week: number;
  phase: string;
  /** Total scheduled minutes this week. */
  minutes: number;
  days: SatDay[];
};

export type SatPlan = {
  testDate: string;
  dateAssumed: boolean;
  weeksRemaining: number;
  paceNote: string;
  intermediateTarget?: number;
  sectionSplit: { rw: number; math: number }; // percentages
  weeks: SatWeek[];
  resources: { label: string; url: string; note: string }[];
};

// ---- SAT strategy blocks (same shape idea as lib/strategyBlocks.ts) ----

export type SatBlock = {
  id: string;
  title: string;
  howTo: string;
  minutes: number;
  section: SatSection;
  area: WeakArea | "any";
  /** Which phases this block suits. */
  phases: ("foundations" | "targeted" | "practice" | "final")[];
};

export const SAT_BLOCKS: SatBlock[] = [
  // Reading & Writing
  {
    id: "rw-official-first",
    title: "Official questions first (Reading & Writing)",
    howTo:
      "Work a set of official practice questions before anything else — real questions teach the test's habits in a way summaries can't. Check each answer as you go and read the explanation even when you're right.",
    minutes: 30,
    section: "RW",
    area: "any",
    phases: ["foundations", "targeted"],
  },
  {
    id: "rw-evidence",
    title: "Answer from the text, not from memory",
    howTo:
      "For every reading question, underline the exact words in the passage that justify your answer before you select it. If you can't point to them, you're guessing — go back.",
    minutes: 30,
    section: "RW",
    area: "reading",
    phases: ["foundations", "targeted"],
  },
  {
    id: "rw-vocab-context",
    title: "Words-in-context log",
    howTo:
      "Keep a running list of words you missed in context questions, each with the sentence it appeared in. Reread the list weekly — the same word families keep showing up.",
    minutes: 20,
    section: "RW",
    area: "reading",
    phases: ["foundations", "targeted", "practice"],
  },
  {
    id: "rw-grammar-rules",
    title: "One grammar rule at a time",
    howTo:
      "Pick a single conventions topic — commas, subject-verb agreement, transitions — and drill only that until it feels automatic. One rule mastered beats five rules skimmed.",
    minutes: 25,
    section: "RW",
    area: "grammar",
    phases: ["foundations", "targeted"],
  },
  {
    id: "rw-transition-drill",
    title: "Transitions and punctuation drills",
    howTo:
      "Do a focused set of transition-word and punctuation questions, saying out loud why each wrong answer is wrong. These questions reward rules, not instinct — and rules are learnable.",
    minutes: 25,
    section: "RW",
    area: "grammar",
    phases: ["targeted", "practice"],
  },
  {
    id: "rw-timed-module",
    title: "Timed Reading & Writing module",
    howTo:
      "Complete a full RW module under real timing, no pauses. Mark every question you weren't sure about — reviewing those matters as much as reviewing the wrong ones.",
    minutes: 40,
    section: "RW",
    area: "any",
    phases: ["practice", "final"],
  },
  // Math
  {
    id: "m-official-first",
    title: "Official questions first (Math)",
    howTo:
      "Start with official practice questions at your level, checking each answer immediately. Copy any missed problem into your error log with the correct worked solution.",
    minutes: 30,
    section: "Math",
    area: "any",
    phases: ["foundations", "targeted"],
  },
  {
    id: "m-algebra-core",
    title: "Linear equations & systems, from the ground up",
    howTo:
      "Rebuild the algebra core: solving equations, systems, and word-problem setups. Study one worked example line by line, then redo it from a blank page before trying new ones.",
    minutes: 35,
    section: "Math",
    area: "algebra",
    phases: ["foundations", "targeted"],
  },
  {
    id: "m-word-problems",
    title: "Translate word problems slowly",
    howTo:
      "Practice turning word problems into equations without solving them — just the setup, ten problems in a row. Most algebra misses on this test happen in the translation, not the math.",
    minutes: 30,
    section: "Math",
    area: "algebra",
    phases: ["targeted", "practice"],
  },
  {
    id: "m-advanced-topics",
    title: "Quadratics, exponentials & functions",
    howTo:
      "Work the advanced-math topics one family at a time: factoring and the quadratic formula, exponent rules, function notation. Keep a one-page formula sheet in your own handwriting.",
    minutes: 35,
    section: "Math",
    area: "advanced-math",
    phases: ["foundations", "targeted"],
  },
  {
    id: "m-calculator-fluency",
    title: "Know your calculator cold",
    howTo:
      "Practice with the same calculator setup you'll use on test day until graphing an equation or checking a solution takes seconds. Tool fumbling is the most preventable time loss there is.",
    minutes: 20,
    section: "Math",
    area: "advanced-math",
    phases: ["targeted", "practice"],
  },
  {
    id: "m-timed-module",
    title: "Timed Math module",
    howTo:
      "Complete a full Math module under real timing. Use the skip-and-return rule: if a question isn't moving after 30 seconds, mark it and come back with fresh eyes.",
    minutes: 40,
    section: "Math",
    area: "any",
    phases: ["practice", "final"],
  },
  // Cross-section
  {
    id: "x-error-log",
    title: "Error log by question type",
    howTo:
      "File every miss under its question type, not its section — 'comma splice', 'systems word problem', 'inference'. After two weeks the log is a map of exactly where your points are.",
    minutes: 20,
    section: "RW",
    area: "any",
    phases: ["foundations", "targeted", "practice", "final"],
  },
  {
    id: "x-error-review",
    title: "Error-log reread",
    howTo:
      "Reread the whole error log and redo three problems from it cold. A mistake that appears three times is a topic to drill, not an accident to shrug off.",
    minutes: 25,
    section: "Math",
    area: "any",
    phases: ["practice", "final"],
  },
];

// ---- Engine ----

const DAY_MS = 24 * 60 * 60 * 1000;
export const ASSUMED_RUNWAY_WEEKS = 10;

function parseISO(iso: string): Date {
  return new Date(`${iso}T12:00:00`);
}

function toISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function dayLabel(d: Date): string {
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export function weeksUntil(testDate: string, today: string): number {
  const days = Math.round((parseISO(testDate).getTime() - parseISO(today).getTime()) / DAY_MS);
  return Math.max(1, Math.ceil(days / 7));
}

/** Section split (percent RW) weighted toward the declared weak area. */
export function sectionSplit(weakArea: WeakArea): { rw: number; math: number } {
  if (weakArea === "reading" || weakArea === "grammar") return { rw: 60, math: 40 };
  if (weakArea === "algebra" || weakArea === "advanced-math") return { rw: 40, math: 60 };
  return { rw: 50, math: 50 };
}

/**
 * Honest pacing note. Never promises gains; flags aggressive combinations
 * plainly and suggests an intermediate target when the math is steep.
 */
export function paceAssessment(
  currentScore: number | null,
  targetScore: number,
  weeks: number,
  weeklyHours: number,
  isPsat?: boolean
): { note: string; intermediateTarget?: number } {
  if (currentScore === null) {
    return {
      note:
        "First job: a baseline. Your first full practice test — scheduled below — tells you where you're actually starting; until then, treat the target as a direction, not a distance. After that test, revisit this plan with the real number.",
    };
  }
  const scoreLabel = isPsat ? "PSAT score" : "score";
  const gap = targetScore - currentScore;
  if (gap <= 0) {
    return {
      note: `Your most recent ${scoreLabel} already meets your target. The plan below is about holding steady and protecting the margin — practice tests to keep timing sharp, review to keep the details warm.`,
    };
  }
  const perWeek = gap / weeks;
  const hoursNote =
    weeklyHours <= 3 && gap > 100
      ? " At your weekly hours, progress will lean heavily on consistency — short sessions count, skipped weeks cost double."
      : "";
  if (perWeek <= 10) {
    return {
      note: `You're aiming for ${gap} points over ${weeks} week${weeks === 1 ? "" : "s"}. That's a steady, realistic pace for consistent weekly practice — this plan is built to support it.${hoursNote}`,
    };
  }
  if (perWeek <= 20) {
    return {
      note: `You're aiming for ${gap} points over ${weeks} week${weeks === 1 ? "" : "s"}. That's ambitious — students do reach gains like this, but it takes hitting the plan nearly every week and reviewing every practice test seriously.${hoursNote}`,
    };
  }
  // Aggressive: say so plainly and offer an intermediate target.
  const intermediate = Math.min(
    targetScore,
    currentScore + Math.max(50, Math.round((weeks * 15) / 10) * 10)
  );
  return {
    note: `Honest note: ${gap} points in ${weeks} week${weeks === 1 ? "" : "s"} is an aggressive combination — score movement at that rate is uncommon, and no plan can promise it. Keep the big goal, but plan around an intermediate target of about ${intermediate} for this test date; many students then close the rest on a second sitting.${hoursNote}`,
    intermediateTarget: intermediate,
  };
}

type PhaseId = "foundations" | "targeted" | "practice" | "final";

const PHASE_LABELS: Record<PhaseId, string> = {
  foundations: "Foundations",
  targeted: "Targeted practice",
  practice: "Full-length practice",
  final: "Final review & logistics",
};

/** Assign a phase to each week (1-indexed array of length `weeks`). */
export function phasePlan(weeks: number): PhaseId[] {
  if (weeks === 1) return ["final"];
  if (weeks < 4) {
    // Compressed, practice-heavy runway.
    return [...Array(weeks - 1).fill("practice"), "final"] as PhaseId[];
  }
  if (weeks < 8) {
    const targeted = Math.ceil((weeks - 1) / 2);
    const practice = weeks - 1 - targeted;
    return [
      ...Array(targeted).fill("targeted"),
      ...Array(practice).fill("practice"),
      "final",
    ] as PhaseId[];
  }
  const foundations = Math.ceil((weeks - 1) * 0.3);
  const targeted = Math.ceil((weeks - 1) * 0.35);
  const practice = weeks - 1 - foundations - targeted;
  return [
    ...Array(foundations).fill("foundations"),
    ...Array(targeted).fill("targeted"),
    ...Array(practice).fill("practice"),
    "final",
  ] as PhaseId[];
}

/**
 * Weeks (1-indexed) that get a full-length Bluebook practice test.
 * Never the final week; a baseline lands in week 1 when there's no score yet.
 */
export function bluebookWeeks(weeks: number, needsBaseline: boolean): number[] {
  const result: number[] = [];
  if (needsBaseline && weeks >= 2) result.push(1);
  const last = weeks - 1; // never in the final week
  if (last >= 1) {
    if (weeks >= 10) {
      const mid = Math.round(weeks * 0.55);
      const early = Math.round(weeks * 0.3);
      for (const w of [early, mid, last]) {
        if (w >= 1 && !result.includes(w)) result.push(w);
      }
    } else if (weeks >= 6) {
      const mid = Math.round(weeks * 0.5);
      for (const w of [mid, last]) if (w >= 1 && !result.includes(w)) result.push(w);
    } else if (weeks >= 2) {
      if (!result.includes(last)) result.push(last);
    }
  }
  return result.sort((a, b) => a - b);
}

function blocksFor(section: SatSection, weakArea: WeakArea, phase: PhaseId): SatBlock[] {
  const inPhase = SAT_BLOCKS.filter((b) => b.section === section && b.phases.includes(phase));
  const weak = inPhase.filter((b) => b.area === weakArea);
  const general = inPhase.filter((b) => b.area === "any");
  const rest = inPhase.filter((b) => b.area !== weakArea && b.area !== "any");
  const ordered = [...weak, ...general, ...rest];
  return ordered.length > 0
    ? ordered
    : SAT_BLOCKS.filter((b) => b.section === section);
}

const OFFICIAL_RESOURCES = [
  {
    label: "Khan Academy — Official Digital SAT Prep",
    url: "https://www.khanacademy.org/digital-sat",
    note: "Free official practice questions, lessons, and skill drills for both sections.",
  },
  {
    label: "College Board — Bluebook",
    url: "https://bluebook.collegeboard.org/",
    note: "The official testing app, with full-length adaptive practice tests — use it for every practice test in this plan.",
  },
  {
    label: "College Board — SAT practice & preparation",
    url: "https://satsuite.collegeboard.org/practice",
    note: "The official hub for everything else: practice essentials and test-day details.",
  },
];

const FEE_WAIVER_RESOURCE = {
  label: "College Board — SAT fee waivers",
  url: "https://satsuite.collegeboard.org/sat/registration/fee-waivers",
  note: "Check eligibility and how to use a fee waiver — the official page has the current details.",
};

/** Build the full plan. Validate inputs in the UI; this assumes sane values. */
export function buildSatPlan(input: SatInput): SatPlan {
  const dateAssumed = input.testDate === null;
  const testDate = dateAssumed
    ? toISO(new Date(parseISO(input.today).getTime() + ASSUMED_RUNWAY_WEEKS * 7 * DAY_MS))
    : input.testDate!;
  const weeks = Math.min(26, weeksUntil(testDate, input.today));

  const pace = paceAssessment(
    input.currentScore,
    input.targetScore,
    weeks,
    input.weeklyHours,
    input.isPsat
  );
  const split = sectionSplit(input.weakArea);
  const phases = phasePlan(weeks);
  const testWeeks = bluebookWeeks(weeks, input.currentScore === null);

  const weeklyMinutes = Math.round(input.weeklyHours * 60);
  const start = parseISO(input.today);
  const exam = parseISO(testDate);

  const outWeeks: SatWeek[] = [];

  for (let w = 1; w <= weeks; w++) {
    const phase = phases[w - 1];
    const isTestWeek = testWeeks.includes(w);

    // Days for this week (the last "week" may be short, ending on exam day).
    const weekStart = new Date(start.getTime() + (w - 1) * 7 * DAY_MS);
    const days: SatDay[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(weekStart.getTime() + d * DAY_MS);
      if (date.getTime() > exam.getTime()) break;
      days.push({ date: toISO(date), label: dayLabel(date), kind: "study", sessions: [] });
    }
    if (days.length === 0) break;

    // Exam day itself.
    const examIdx = days.findIndex((d) => d.date === testDate);
    if (examIdx >= 0) {
      days[examIdx].kind = "examday";
      days[examIdx].sessions = [
        {
          title: "Test day",
          minutes: 0,
          detail: "Light breakfast, arrive early, device charged. You've done the work — go run the plan.",
        },
      ];
    }

    // Bluebook test day: mid-week Saturday-ish slot (day index 5 when it
    // exists), followed by an error-review session the next day. Never within
    // the final 2 days before the exam.
    let budget = weeklyMinutes;
    if (isTestWeek) {
      const cutoff = exam.getTime() - 2 * DAY_MS;
      let testIdx = Math.min(5, days.length - 1);
      while (
        testIdx > 0 &&
        (parseISO(days[testIdx].date).getTime() > cutoff || days[testIdx].kind === "examday")
      ) {
        testIdx--;
      }
      if (parseISO(days[testIdx].date).getTime() <= cutoff && days[testIdx].kind !== "examday") {
        days[testIdx].kind = "test";
        days[testIdx].sessions.push({
          title:
            w === 1 && input.currentScore === null
              ? "Baseline: full-length Bluebook practice test"
              : "Full-length Bluebook practice test",
          minutes: 140,
          detail: "Real conditions: one sitting, timed, no phone. Score it when you're done.",
        });
        budget -= 140;
        const reviewIdx = testIdx + 1 < days.length ? testIdx + 1 : testIdx - 1;
        if (reviewIdx >= 0 && days[reviewIdx].kind === "study") {
          days[reviewIdx].kind = "review";
          days[reviewIdx].sessions.push({
            title: "Practice-test error review",
            minutes: 45,
            detail:
              "Go through every miss and every lucky guess: file each under its question type in your error log, and redo the three you most nearly had.",
          });
          budget -= 45;
        }
      }
    }

    // Final week: review + logistics only, no new material, no full tests.
    if (phase === "final") {
      for (const day of days) {
        if (day.kind !== "study") continue;
        const daysToExam = Math.round((exam.getTime() - parseISO(day.date).getTime()) / DAY_MS);
        if (daysToExam <= 2 && daysToExam > 0) {
          day.kind = "final";
          day.sessions.push({
            title: daysToExam === 1 ? "Rest & logistics" : "Light review & logistics",
            minutes: daysToExam === 1 ? 20 : 30,
            detail:
              daysToExam === 1
                ? "No studying tonight. Pack up: admission ticket, ID, charged device with Bluebook installed, snacks. Early night."
                : "Skim your error log and formula sheet — nothing new. Confirm where your test center is and how you're getting there.",
          });
        }
      }
    }

    // Distribute remaining budget as study sessions across open study days,
    // alternating sections by the declared split, weakest-area blocks first.
    const openDays = days.filter((d) => d.kind === "study" || d.kind === "final");
    const studyDays = openDays.filter((d) => d.kind === "study");
    if (studyDays.length > 0 && budget >= 15) {
      // Keep one rest day a week where the calendar allows.
      const targets = studyDays.length > 3 ? studyDays.slice(0, studyDays.length - 1) : studyDays;
      const rested = studyDays.filter((d) => !targets.includes(d));
      for (const r of rested) r.kind = "rest";

      const rwBlocks = blocksFor("RW", input.weakArea, phase === "final" ? "final" : phase);
      const mathBlocks = blocksFor("Math", input.weakArea, phase === "final" ? "final" : phase);
      // Keep sessions on a clean 15-minute grid.
      let rwMinutes = Math.max(15, Math.floor((budget * split.rw) / 100 / 15) * 15);
      let mathMinutes = Math.max(15, Math.floor((budget - rwMinutes) / 15) * 15);
      const sessions: SatSession[] = [];
      let rwIdx = 0;
      let mathIdx = 0;
      let guard = 0;
      while (rwMinutes >= 15 || mathMinutes >= 15) {
        if (guard++ > 60) break;
        if (rwMinutes >= mathMinutes && rwMinutes >= 15) {
          const b = rwBlocks[rwIdx++ % rwBlocks.length];
          const m = Math.min(Math.max(15, Math.round(b.minutes / 15) * 15), rwMinutes);
          sessions.push({ title: b.title, minutes: m, section: "RW", detail: b.howTo });
          rwMinutes -= m;
        } else if (mathMinutes >= 15) {
          const b = mathBlocks[mathIdx++ % mathBlocks.length];
          const m = Math.min(Math.max(15, Math.round(b.minutes / 15) * 15), mathMinutes);
          sessions.push({ title: b.title, minutes: m, section: "Math", detail: b.howTo });
          mathMinutes -= m;
        }
      }
      sessions.forEach((s, i) => {
        targets[i % targets.length].sessions.push(s);
      });
      // Any target day left empty becomes a rest day.
      for (const d of targets) if (d.sessions.length === 0) d.kind = "rest";
    } else {
      for (const d of studyDays) if (d.sessions.length === 0) d.kind = "rest";
    }

    outWeeks.push({
      week: w,
      phase: PHASE_LABELS[phase],
      minutes: days.reduce((a, d) => a + d.sessions.reduce((x, s) => x + s.minutes, 0), 0),
      days,
    });
  }

  return {
    testDate,
    dateAssumed,
    weeksRemaining: weeks,
    paceNote: pace.note,
    intermediateTarget: pace.intermediateTarget,
    sectionSplit: split,
    weeks: outWeeks,
    resources: input.feeWaiver ? [...OFFICIAL_RESOURCES, FEE_WAIVER_RESOURCE] : OFFICIAL_RESOURCES,
  };
}
