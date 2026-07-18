// Printable template library for teachers. Each template is a one-page
// printable defined as data blocks; components/TemplateSheet.tsx renders them.
// Content rules: generic and district-agnostic; no legal or compliance claims;
// privacy-conscious wording wherever student info would be written; no
// clinical terms. The on-screen intro and disclaimer are excluded from print.

export type TemplateBlock =
  | { kind: "heading"; text: string }
  | { kind: "fields"; items: { label: string; width?: "full" | "half" | "third" }[] }
  | {
      kind: "table";
      columns: { header: string; width?: string }[];
      rows: number;
      exampleRow?: string[];
    }
  | { kind: "lines"; label?: string; count: number }
  | { kind: "checklist"; label?: string; items: string[] }
  | { kind: "note"; text: string };

export type PrintTemplate = {
  slug: string;
  title: string;
  description: string;
  /** Screen-only context paragraph — excluded from print to protect the one-page fit. */
  howToUse: string;
  blocks: TemplateBlock[];
};

export const TEMPLATES: PrintTemplate[] = [
  {
    slug: "parent-communication-log",
    title: "Parent Communication Log",
    description: "A dated contact log: who, how, what about, and the follow-up you owe.",
    howToUse:
      "Keep one sheet per class (or per season) and jot each family contact the moment it happens — two minutes now saves twenty at conference time. The follow-up column is the quiet hero: if you owe a reply, it's written where tomorrow-you will see it.",
    blocks: [
      {
        kind: "fields",
        items: [
          { label: "Class / period", width: "half" },
          { label: "Term", width: "half" },
        ],
      },
      {
        kind: "table",
        columns: [
          { header: "Date", width: "12%" },
          { header: "Family & student", width: "22%" },
          { header: "Method (call · email · note · in person)", width: "18%" },
          { header: "Topic", width: "28%" },
          { header: "Follow-up owed & by when", width: "20%" },
        ],
        rows: 12,
      },
      {
        kind: "note",
        text: "Keep this log somewhere secure, and note only what the follow-up needs — details that belong in a student's record should live there, not here.",
      },
    ],
  },
  {
    slug: "positive-note-home",
    title: "Positive Note Home",
    description: "Three fill-in formats for quick, specific praise that takes two minutes to send.",
    howToUse:
      "Specific beats glowing: one observed moment, named plainly, lands harder than a page of adjectives. Pick whichever format fits the moment, fill the blanks, and send it the same day — cut them into thirds and keep a stack in your desk.",
    blocks: [
      { kind: "heading", text: "Format 1 — The quick win" },
      {
        kind: "lines",
        label:
          "Today, __________________ showed real __________________ when __________________________________. I wanted you to know.",
        count: 2,
      },
      {
        kind: "fields",
        items: [
          { label: "Teacher", width: "half" },
          { label: "Date", width: "half" },
        ],
      },
      { kind: "heading", text: "Format 2 — Effort spotted" },
      {
        kind: "fields",
        items: [
          { label: "Student", width: "half" },
          { label: "Date", width: "half" },
        ],
      },
      { kind: "lines", label: "What I noticed", count: 2 },
      { kind: "lines", label: "Why it matters", count: 2 },
      { kind: "heading", text: "Format 3 — Growth over time" },
      {
        kind: "lines",
        label:
          "In the last few weeks, __________________ has grown in __________________________. The moment that stood out:",
        count: 2,
      },
      {
        kind: "fields",
        items: [
          { label: "Teacher", width: "half" },
          { label: "Date", width: "half" },
        ],
      },
    ],
  },
  {
    slug: "conference-prep-sheet",
    title: "Conference Prep Sheet",
    description: "A teacher's one-pager per student: strengths, growth area, samples, one goal.",
    howToUse:
      "Fill one of these per student in the week before conferences — five minutes each while the class works. Walking in with strengths first, one growth area, and work samples in hand turns a rushed slot into a real conversation.",
    blocks: [
      {
        kind: "fields",
        items: [
          { label: "Student", width: "third" },
          { label: "Class / period", width: "third" },
          { label: "Conference date", width: "third" },
        ],
      },
      { kind: "lines", label: "Strengths (lead with these)", count: 3 },
      { kind: "lines", label: "One growth area (just one)", count: 2 },
      { kind: "lines", label: "Work samples to bring (list them, then clip them to this sheet)", count: 3 },
      { kind: "lines", label: "One goal for the coming term", count: 2 },
      { kind: "lines", label: "Family questions & notes (fill in during the conference)", count: 4 },
      {
        kind: "note",
        text: "This sheet may travel in a conference folder — keep the notes factual and kind, as if the family will read them, because they might.",
      },
    ],
  },
  {
    slug: "weekly-data-tracker",
    title: "Weekly Data Tracker",
    description: "A simple frequency/duration grid with a goal line and space for notes.",
    howToUse:
      "Pick one observable skill, write the goal line, and make a quick tally or time note each day — ten seconds, in the moment, beats reconstructing the week on Friday. Five honest days of small marks is real data.",
    blocks: [
      {
        kind: "fields",
        items: [
          { label: "Student (initials or code)", width: "third" },
          { label: "Skill or goal observed", width: "third" },
          { label: "Week of", width: "third" },
        ],
      },
      { kind: "lines", label: "Goal line (what would 'on track' look like this week?)", count: 1 },
      {
        kind: "table",
        columns: [
          { header: "Day", width: "12%" },
          { header: "Tally / count", width: "20%" },
          { header: "Duration (min)", width: "16%" },
          { header: "Goal met? (Y/N)", width: "14%" },
          { header: "Notes (setting, supports used, anything unusual)", width: "38%" },
        ],
        rows: 6,
        exampleRow: ["e.g. Mon", "|||| ||", "12", "Y", "Small group; timer helped"],
      },
      { kind: "lines", label: "Week summary — what does the pattern suggest for next week?", count: 2 },
      {
        kind: "note",
        text: "If this sheet travels between rooms, use initials or a code rather than a full name.",
      },
    ],
  },
  {
    slug: "accommodation-quick-reference",
    title: "Accommodation Quick Reference",
    description: "A class-list grid for who gets what, at a glance — with an example row.",
    howToUse:
      "One row per student, in your plan book or taped inside a cabinet door — somewhere you'll actually glance mid-lesson. Common examples to draw from: extended time, preferential seating, chunked directions, movement breaks, directions read aloud. Each student's own plan documents stay the source of truth; this grid is your working memory of them.",
    blocks: [
      {
        kind: "fields",
        items: [
          { label: "Class / period", width: "half" },
          { label: "Updated", width: "half" },
        ],
      },
      {
        kind: "table",
        columns: [
          { header: "Student (initials)", width: "16%" },
          { header: "Accommodations", width: "34%" },
          { header: "Where it applies", width: "24%" },
          { header: "Reminders to self", width: "26%" },
        ],
        rows: 10,
        exampleRow: [
          "e.g. J.D.",
          "Extended time; chunked directions",
          "Tests & multi-step tasks",
          "Check in after giving directions",
        ],
      },
      {
        kind: "note",
        text: "Keep this grid where students and visitors won't read it, use initials, and refresh it whenever a student's plan changes — it's a memory aid, not the record.",
      },
    ],
  },
  {
    slug: "student-check-in-form",
    title: "Student Check-In Form",
    description: "A weekly student self-report: effort, confidence, one win, one stuck point, one ask.",
    howToUse:
      "Hand these out in the last five minutes on Fridays. The ratings take ten seconds; the three short answers tell you things a gradebook never will. Read for patterns — the student whose confidence drops two weeks running is telling you something early.",
    blocks: [
      {
        kind: "fields",
        items: [
          { label: "Name", width: "third" },
          { label: "Class", width: "third" },
          { label: "Week of", width: "third" },
        ],
      },
      {
        kind: "fields",
        items: [
          { label: "My effort this week (circle one):   1 · 2 · 3 · 4 · 5", width: "full" },
          { label: "My confidence in this class right now (circle one):   1 · 2 · 3 · 4 · 5", width: "full" },
        ],
      },
      { kind: "lines", label: "One win from this week (big or small)", count: 2 },
      { kind: "lines", label: "One place I got stuck", count: 2 },
      { kind: "lines", label: "One thing I'd like help with next week", count: 2 },
      {
        kind: "note",
        text: "Answers stay between student and teacher unless the student says otherwise — say that out loud when you hand them out, and honesty goes up.",
      },
    ],
  },
  {
    slug: "substitute-plans-shell",
    title: "Substitute Plans Shell",
    description: "A structured sub-plan template: schedule, routines, key notes, emergency checklist.",
    howToUse:
      "Fill this once, photocopy it, and update the schedule column per absence — the routines and emergency information barely change. A sub who can find the attendance procedure and the buddy teacher in ten seconds runs your room the way you would.",
    blocks: [
      {
        kind: "fields",
        items: [
          { label: "Class / room", width: "third" },
          { label: "Date", width: "third" },
          { label: "Prepared by", width: "third" },
        ],
      },
      {
        kind: "table",
        columns: [
          { header: "Time", width: "14%" },
          { header: "Subject / activity", width: "42%" },
          { header: "Materials & where they are", width: "44%" },
        ],
        rows: 7,
      },
      {
        kind: "checklist",
        label: "Routines the class knows",
        items: [
          "Arrival: ____________________________",
          "Attendance — how and where to record: ____________________________",
          "Bathroom / hall policy: ____________________________",
          "Dismissal: ____________________________",
        ],
      },
      {
        kind: "lines",
        label: "Key student notes — initials and what helps; avoid confidential details",
        count: 3,
      },
      {
        kind: "checklist",
        label: "Emergency information",
        items: [
          "Evacuation route posted at: ____________",
          "Health office / nurse extension: ____________",
          "Buddy teacher & room: ____________",
          "Front office / admin contact: ____________",
        ],
      },
    ],
  },
  {
    slug: "goal-progress-snapshot",
    title: "Goal Progress Snapshot",
    description: "Per-student: goal statement, baseline, three dated data points, next step.",
    howToUse:
      "One goal, one page. Write the goal and baseline once, then add a dated data point every week or two — by the third point you have a trend, and the next-step line practically writes itself. Bring the sheet to any meeting about the student and you're the most prepared person in the room.",
    blocks: [
      {
        kind: "fields",
        items: [
          { label: "Student (initials are fine)", width: "half" },
          { label: "Goal area", width: "half" },
        ],
      },
      { kind: "lines", label: "Goal statement (what, under what conditions, measured how)", count: 2 },
      { kind: "lines", label: "Baseline (starting point, with date)", count: 1 },
      {
        kind: "table",
        columns: [
          { header: "Date", width: "14%" },
          { header: "What was measured", width: "34%" },
          { header: "Result", width: "22%" },
          { header: "Compared to goal (ahead · on track · behind)", width: "30%" },
        ],
        rows: 3,
      },
      { kind: "lines", label: "Next step (what changes, or what stays the course)", count: 2 },
      {
        kind: "note",
        text: "Three points make a trend, not a verdict — note anything unusual about a data day rather than reading too much into it.",
      },
    ],
  },
];

export function getTemplate(slug: string): PrintTemplate | undefined {
  return TEMPLATES.find((t) => t.slug === slug);
}
