// Pure, deterministic study-plan engine. No network, no storage, no randomness:
// the same input always produces the same plan.
import { STRATEGY_BLOCKS, type StrategyBlock, type StrategyLevel } from "./strategyBlocks";

export type Goal = "raise-grades" | "pass-exams" | "get-ahead";
export type Cadence = "weekly" | "monthly" | "quarterly";
export type GradeBand = "red" | "yellow" | "green";

export type SubjectInput = {
  name: string;
  /** Raw grade as typed: "82", "91%", "B+", or NY scale "NY" | "L" | "P" | "M". */
  grade: string;
  /** Optional free text: topics the student struggles with. */
  struggles?: string;
};

export type PlanInput = {
  subjects: SubjectInput[];
  goal: Goal;
  /** Weekly available study hours, 2–20. */
  weeklyHours: number;
  cadence: Cadence;
  regentsMode?: boolean;
};

export type SubjectPlan = {
  name: string;
  score: number;
  band: GradeBand;
  minutesPerWeek: number;
  blocks: StrategyBlock[];
  struggles?: string;
  /** Present in Regents mode: how the score sits against the 65 passing score. */
  regentsNote?: string;
};

export type DayPlan = { day: string; sessions: { subject: string; block: StrategyBlock; minutes: number }[] };
export type WeekTheme = { week: number; theme: string; guidance: string; emphasis: string[] };
export type PhasePlan = { month: number; phase: string; guidance: string; emphasis: string[]; checkpoint: string };

export type PlanOutput = {
  cadence: Cadence;
  goal: Goal;
  weeklyHours: number;
  subjects: SubjectPlan[]; // ranked weakest first
  weekly?: DayPlan[];
  monthly?: WeekTheme[];
  quarterly?: PhasePlan[];
};

export const REGENTS_PASSING = 65;

export const REGENTS_SUBJECTS = [
  "English Language Arts (Regents)",
  "Algebra I (Regents)",
  "Living Environment (Regents)",
  "Global History & Geography II (Regents)",
  "U.S. History & Government (Regents)",
];

const LETTER_GRADES: Record<string, number> = {
  "A+": 98, A: 95, "A-": 91,
  "B+": 88, B: 85, "B-": 81,
  "C+": 78, C: 75, "C-": 71,
  "D+": 68, D: 65, "D-": 61,
  F: 50,
};

// NY standards-based scale: Not Yet / Learning / Proficient / Mastery.
const NY_SCALE: Record<string, number> = { NY: 50, L: 62, P: 80, M: 95 };

/** Normalize any accepted grade format to 0–100, or null if unrecognized. */
export function normalizeGrade(raw: string): number | null {
  const s = raw.trim().toUpperCase();
  if (!s) return null;
  if (s in NY_SCALE) return NY_SCALE[s];
  if (s in LETTER_GRADES) return LETTER_GRADES[s];
  const numeric = /^(\d{1,3}(?:\.\d+)?)\s*%?$/.exec(s);
  if (numeric) {
    const n = parseFloat(numeric[1]);
    return Math.max(0, Math.min(100, n));
  }
  return null;
}

export function classify(score: number): GradeBand {
  if (score < 55) return "red";
  if (score < 75) return "yellow";
  return "green";
}

const BAND_WEIGHT: Record<GradeBand, number> = { red: 4, yellow: 2, green: 1 };

/**
 * Split weekly hours across subjects proportionally to need: red subjects get
 * the most time, green subjects get a maintenance share. Returns minutes per
 * subject in input order, in 15-minute steps summing exactly to the total.
 */
export function allocateMinutes(bands: GradeBand[], weeklyHours: number): number[] {
  const total = Math.round(weeklyHours * 60);
  const weights = bands.map((b) => BAND_WEIGHT[b]);
  const weightSum = weights.reduce((a, b) => a + b, 0);
  const raw = weights.map((w) => (w / weightSum) * total);
  // Round to 15-minute steps with a 15-minute floor per subject.
  const minutes = raw.map((m) => Math.max(15, Math.round(m / 15) * 15));
  // Repair rounding drift, adjusting the weakest subject first when adding
  // and the strongest first when trimming (never below the floor).
  let drift = total - minutes.reduce((a, b) => a + b, 0);
  const byNeed = bands
    .map((b, i) => ({ i, w: weights[i] }))
    .sort((a, b) => b.w - a.w || a.i - b.i)
    .map((x) => x.i);
  let guard = 0;
  while (drift !== 0 && guard < 1000) {
    const order = drift > 0 ? byNeed : [...byNeed].reverse();
    for (const i of order) {
      if (drift > 0) {
        minutes[i] += 15;
        drift -= 15;
      } else if (minutes[i] > 15) {
        minutes[i] -= 15;
        drift += 15;
      }
      if (drift === 0) break;
    }
    guard++;
  }
  return minutes;
}

const BAND_LEVEL: Record<GradeBand, StrategyLevel> = {
  red: "rebuild",
  yellow: "strengthen",
  green: "maintain",
};

const BLOCKS_PER_BAND: Record<GradeBand, number> = { red: 3, yellow: 3, green: 2 };

/**
 * Pick strategy blocks for a subject: blocks at the band's level, with blocks
 * matching the chosen goal listed first; data-file order breaks ties.
 */
export function selectBlocks(band: GradeBand, goal: Goal): StrategyBlock[] {
  const level = BAND_LEVEL[band];
  const candidates = STRATEGY_BLOCKS.filter((b) => b.level === level);
  const matching = candidates.filter((b) => b.goals?.includes(goal));
  const rest = candidates.filter((b) => !b.goals?.includes(goal));
  return [...matching, ...rest].slice(0, BLOCKS_PER_BAND[band]);
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/** Split a subject's weekly minutes into session-sized chunks tied to its blocks. */
function toSessions(subject: SubjectPlan): { subject: string; block: StrategyBlock; minutes: number }[] {
  const sessions: { subject: string; block: StrategyBlock; minutes: number }[] = [];
  let remaining = subject.minutesPerWeek;
  let i = 0;
  let guard = 0;
  while (remaining >= 15 && guard < 50) {
    const block = subject.blocks[i % subject.blocks.length];
    const minutes = Math.min(Math.max(15, Math.round(block.minutes / 15) * 15), remaining);
    sessions.push({ subject: subject.name, block, minutes });
    remaining -= minutes;
    i++;
    guard++;
  }
  return sessions;
}

/** Day-by-day week: weakest subjects claim the earliest days; sessions spread evenly. */
function buildWeekly(subjects: SubjectPlan[]): DayPlan[] {
  const days: DayPlan[] = DAYS.map((day) => ({ day, sessions: [] }));
  const allSessions = subjects.flatMap((s) => toSessions(s));
  allSessions.forEach((session, i) => {
    days[i % 7].sessions.push(session);
  });
  return days;
}

function emphasisFor(subjects: SubjectPlan[], bands: GradeBand[]): string[] {
  const chosen = subjects.filter((s) => bands.includes(s.band)).map((s) => s.name);
  return chosen.length > 0 ? chosen : subjects.slice(0, 2).map((s) => s.name);
}

function buildMonthly(subjects: SubjectPlan[]): WeekTheme[] {
  return [
    {
      week: 1,
      theme: "Find the gaps",
      guidance:
        "Use each subject's first strategy to map what's solid and what isn't. End the week with a short list of specific weak topics per subject.",
      emphasis: emphasisFor(subjects, ["red"]),
    },
    {
      week: 2,
      theme: "Rebuild the weakest topics",
      guidance:
        "Work the weak-topic list from week 1, hardest subjects first, using the rebuild and practice strategies at your weekly hour budget.",
      emphasis: emphasisFor(subjects, ["red", "yellow"]),
    },
    {
      week: 3,
      theme: "Practice and self-test",
      guidance:
        "Shift from learning to retrieval: self-quizzes, mixed problems, and past questions. Log every error and reread the log at week's end.",
      emphasis: emphasisFor(subjects, ["yellow", "red"]),
    },
    {
      week: 4,
      theme: "Review, consolidate, and look ahead",
      guidance:
        "Retest the topics that were weak in week 1 and compare. Keep green subjects warm with their maintenance strategies, and preview what's next.",
      emphasis: subjects.map((s) => s.name),
    },
  ];
}

function buildQuarterly(subjects: SubjectPlan[]): PhasePlan[] {
  const reds = subjects.filter((s) => s.band === "red").map((s) => s.name);
  const yellows = subjects.filter((s) => s.band === "yellow").map((s) => s.name);
  return [
    {
      month: 1,
      phase: "Rebuild",
      guidance:
        "Map gaps in every subject, then spend most of each week's hours rebuilding the weakest topics from the ground up, using the rebuild strategies.",
      emphasis: emphasisFor(subjects, ["red"]),
      checkpoint:
        reds.length > 0
          ? `Checkpoint: retest yourself in ${reds.join(", ")} — aim for every retested topic to feel shaky-or-better, not missing.`
          : "Checkpoint: confirm no subject has untouched gaps; adjust the list if new material has piled up.",
    },
    {
      month: 2,
      phase: "Strengthen",
      guidance:
        "Move to steady practice: spaced review, mixed problem sets, and self-quizzing every week, with time still tilted toward the weakest subjects.",
      emphasis: emphasisFor(subjects, ["red", "yellow"]),
      checkpoint:
        yellows.length > 0
          ? `Checkpoint: take a full practice quiz or past test in ${yellows.join(", ")} and score it honestly against the key.`
          : "Checkpoint: take one full practice quiz per subject and score it honestly against the key.",
    },
    {
      month: 3,
      phase: "Perform and maintain",
      guidance:
        "Practice under real conditions: timed sections, full past papers where they exist, and weekly cumulative review so nothing learned in months 1–2 fades.",
      emphasis: subjects.map((s) => s.name),
      checkpoint:
        "Checkpoint: compare current quiz and test scores to where each subject started — any subject that hasn't moved up a band becomes the next quarter's first priority.",
    },
  ];
}

/** Build the full plan. Assumes every subject grade normalizes; call normalizeGrade to validate first. */
export function buildPlan(input: PlanInput): PlanOutput {
  const scored = input.subjects
    .map((s) => {
      const score = normalizeGrade(s.grade);
      if (score === null) throw new Error(`Unrecognized grade for ${s.name}: ${s.grade}`);
      return { ...s, score, band: classify(score) };
    })
    // Rank weakest first; ties keep input order.
    .map((s, i) => ({ ...s, i }))
    .sort((a, b) => a.score - b.score || a.i - b.i);

  const minutes = allocateMinutes(scored.map((s) => s.band), input.weeklyHours);

  const subjects: SubjectPlan[] = scored.map((s, idx) => ({
    name: s.name,
    score: s.score,
    band: s.band,
    minutesPerWeek: minutes[idx],
    blocks: selectBlocks(s.band, input.goal),
    struggles: s.struggles?.trim() || undefined,
    regentsNote: input.regentsMode
      ? s.score >= REGENTS_PASSING
        ? `At or above the ${REGENTS_PASSING} passing score — protect the margin.`
        : `${REGENTS_PASSING - s.score} points below the ${REGENTS_PASSING} passing score.`
      : undefined,
  }));

  return {
    cadence: input.cadence,
    goal: input.goal,
    weeklyHours: input.weeklyHours,
    subjects,
    weekly: input.cadence === "weekly" ? buildWeekly(subjects) : undefined,
    monthly: input.cadence === "monthly" ? buildMonthly(subjects) : undefined,
    quarterly: input.cadence === "quarterly" ? buildQuarterly(subjects) : undefined,
  };
}
