import type { Goal } from "./planBuilder";

export type StrategyLevel = "rebuild" | "strengthen" | "maintain";

export type StrategyBlock = {
  id: string;
  title: string;
  /** Plain-language how-to, 2–3 sentences. */
  howTo: string;
  /** Typical session length in minutes. */
  minutes: number;
  level: StrategyLevel;
  /** Goals this block suits especially well; blocks matching the chosen goal are picked first. */
  goals?: Goal[];
};

export const STRATEGY_BLOCKS: StrategyBlock[] = [
  // ---- Rebuild basics: for subjects that need ground-up repair ----
  {
    id: "gap-map",
    title: "Map the gaps",
    howTo:
      "List every unit or chapter covered so far and mark each one: solid, shaky, or missing. Spend the session on the earliest shaky topic, because later material usually leans on it.",
    minutes: 30,
    level: "rebuild",
  },
  {
    id: "worked-examples",
    title: "Worked examples first",
    howTo:
      "Before trying problems yourself, study two or three fully worked examples line by line and explain each step out loud. Then cover the solution and redo the example from scratch.",
    minutes: 30,
    level: "rebuild",
  },
  {
    id: "error-log",
    title: "Keep an error log",
    howTo:
      "Every time a homework problem or quiz question goes wrong, copy it into a notebook with the correct solution and one sentence on what tripped you up. Reread the log before the next quiz — most students miss the same kinds of questions repeatedly.",
    minutes: 20,
    level: "rebuild",
    goals: ["raise-grades", "pass-exams"],
  },
  {
    id: "vocab-basics",
    title: "Rebuild the vocabulary",
    howTo:
      "Collect the 15–20 most important terms in the subject onto flashcards, with a plain-English definition and one example on the back. Quiz yourself until you can define each term without looking.",
    minutes: 20,
    level: "rebuild",
  },
  {
    id: "redo-homework",
    title: "Redo old homework cold",
    howTo:
      "Pick a past assignment you struggled with, put the answers away, and redo it from a blank page. Anything you still can't do tells you exactly what to ask about next class.",
    minutes: 30,
    level: "rebuild",
    goals: ["raise-grades"],
  },
  {
    id: "ask-teacher",
    title: "Bring two questions to your teacher",
    howTo:
      "Write down the two most confusing things from this week and ask your teacher before school, after class, or in extra help. Specific questions get specific help — \"I don't get it\" is much harder to answer than \"I lose track at step three.\"",
    minutes: 15,
    level: "rebuild",
    goals: ["raise-grades", "pass-exams"],
  },
  {
    id: "chunked-sessions",
    title: "Short, chunked sessions",
    howTo:
      "Study in 20–25 minute stretches with a 5-minute break between them, and set a small goal for each stretch. Two focused chunks beat one distracted hour.",
    minutes: 25,
    level: "rebuild",
  },
  {
    id: "read-recall",
    title: "Read a little, recall a lot",
    howTo:
      "Read one section of the textbook, close it, and write down everything you remember before checking. The act of pulling information out of memory is what makes it stick — rereading alone mostly feels productive without being productive.",
    minutes: 25,
    level: "rebuild",
  },
  {
    id: "one-topic-teach-back",
    title: "Teach one topic back",
    howTo:
      "Explain a single topic to a parent, sibling, or even an empty chair as if they've never seen it. Wherever your explanation stalls is exactly where your understanding has a hole.",
    minutes: 20,
    level: "rebuild",
  },
  {
    id: "foundation-facts",
    title: "Automatic basics drill",
    howTo:
      "Spend ten minutes drilling the small facts the subject assumes — math facts, formulas, dates, or spelling of key terms — until they're fast. When the basics are automatic, the harder work gets easier.",
    minutes: 10,
    level: "rebuild",
  },

  // ---- Strengthen: for subjects that are passing but shaky ----
  {
    id: "retrieval-practice",
    title: "Self-quiz before you review",
    howTo:
      "Start each session by writing everything you can remember about the topic before opening your notes. Then check what you missed and spend the session on those pieces.",
    minutes: 25,
    level: "strengthen",
  },
  {
    id: "spaced-review",
    title: "Spaced review calendar",
    howTo:
      "Review new material the day you learn it, again three days later, and once more the following week. Three short visits spread out beat one long cram, because the forgetting between visits is what trains your memory.",
    minutes: 20,
    level: "strengthen",
  },
  {
    id: "past-papers",
    title: "Past-paper practice",
    howTo:
      "Work through questions from previous exams or old unit tests, one section at a time, and mark them honestly against the answer key. Past papers show you the format, the wording, and the topics that come up again and again.",
    minutes: 40,
    level: "strengthen",
    goals: ["pass-exams"],
  },
  {
    id: "timed-sections",
    title: "Practice under time",
    howTo:
      "Once you can answer questions untimed, repeat a set with a timer matched to the real test's pace. Timing is a skill of its own, and practicing it removes a major source of exam-day surprises.",
    minutes: 30,
    level: "strengthen",
    goals: ["pass-exams"],
  },
  {
    id: "interleaving",
    title: "Mix the problem types",
    howTo:
      "Instead of doing ten of the same kind of problem, shuffle several types together in one session. Deciding which method a problem needs is half the difficulty on a real test, and mixed practice is how you train it.",
    minutes: 30,
    level: "strengthen",
  },
  {
    id: "teach-back",
    title: "Teach it back",
    howTo:
      "After finishing a topic, explain it from memory to someone else — or record yourself explaining it. If you can teach it clearly, you know it; if you can't, you've found this week's focus.",
    minutes: 20,
    level: "strengthen",
  },
  {
    id: "error-log-review",
    title: "Error log rereads",
    howTo:
      "Keep logging wrong answers with their fixes, and reread the whole log once a week. Watch for repeat offenders — a mistake that appears three times is a topic, not an accident.",
    minutes: 15,
    level: "strengthen",
    goals: ["raise-grades", "pass-exams"],
  },
  {
    id: "note-rework",
    title: "Rework your notes",
    howTo:
      "Within a day of each class, rewrite that day's notes in your own words, adding questions in the margin for anything unclear. Bring those margin questions to class — they make the next lesson land better.",
    minutes: 20,
    level: "strengthen",
    goals: ["raise-grades"],
  },
  {
    id: "study-partner",
    title: "Question swap with a classmate",
    howTo:
      "Trade five self-written quiz questions with a classmate and mark each other's answers. Writing good questions forces you to think like the test writer, which is a quietly powerful way to study.",
    minutes: 30,
    level: "strengthen",
  },
  {
    id: "rubric-check",
    title: "Grade yourself with the rubric",
    howTo:
      "For essay and written work, get the rubric or grading criteria and score one of your own past assignments against it, line by line. Seeing exactly where points are earned changes how you write the next one.",
    minutes: 25,
    level: "strengthen",
    goals: ["raise-grades"],
  },
  {
    id: "concept-map",
    title: "Draw the connections",
    howTo:
      "Put the unit's big idea in the middle of a page and branch out to every related concept, linking the ones that connect. Subjects stop feeling like a pile of facts once you can see how the pieces fit together.",
    minutes: 25,
    level: "strengthen",
  },

  // ---- Maintain: for subjects in good shape ----
  {
    id: "weekly-checkin",
    title: "Weekly once-over",
    howTo:
      "Once a week, skim the week's notes and self-quiz on the main points for fifteen minutes. Strong subjects stay strong with light, regular contact — the goal is to never need a rescue later.",
    minutes: 15,
    level: "maintain",
  },
  {
    id: "cumulative-quiz",
    title: "Monthly cumulative self-test",
    howTo:
      "Once a month, quiz yourself on material from the whole term so far, not just the current unit. Finals and state exams are cumulative; a little monthly practice keeps old units from going stale.",
    minutes: 30,
    level: "maintain",
    goals: ["pass-exams"],
  },
  {
    id: "preview-ahead",
    title: "Preview the next unit",
    howTo:
      "Spend a short session skimming the next chapter before your class gets there — read the headings, the diagrams, and the summary. Walking in with a rough map makes class time feel like review.",
    minutes: 20,
    level: "maintain",
    goals: ["get-ahead"],
  },
  {
    id: "extension-problems",
    title: "Stretch problems",
    howTo:
      "Try the challenge questions at the end of the chapter, or problems one level above your course. Wrestling with harder material is the fastest way to grow when the regular work feels comfortable.",
    minutes: 30,
    level: "maintain",
    goals: ["get-ahead"],
  },
  {
    id: "help-a-classmate",
    title: "Help someone else",
    howTo:
      "Offer to explain a tricky topic to a classmate who's stuck. Teaching is the deepest form of review, and it keeps your strongest subjects sharp with almost no extra material.",
    minutes: 20,
    level: "maintain",
  },
  {
    id: "real-world-link",
    title: "Find it in the real world",
    howTo:
      "Once a week, connect something from class to something outside it — an article, a video, a project, a conversation. Interest is fuel, and strong students protect theirs on purpose.",
    minutes: 20,
    level: "maintain",
    goals: ["get-ahead"],
  },
  {
    id: "exam-format-study",
    title: "Learn the exam's shape",
    howTo:
      "Read through the format of the end-of-year exam early: sections, question types, point values, and timing. Knowing the shape of the test months ahead lets your regular studying quietly aim at it.",
    minutes: 20,
    level: "maintain",
    goals: ["pass-exams"],
  },
  {
    id: "portfolio-review",
    title: "Keep a wins file",
    howTo:
      "Save your best work — strong essays, full-credit problem sets — in one folder and skim it before big assignments. It's a reference library of what your A-work looks like, written by you.",
    minutes: 10,
    level: "maintain",
  },
  {
    id: "office-hours-goal",
    title: "One question a week to the teacher",
    howTo:
      "Even in subjects going well, bring your teacher one genuine question a week — about an interesting tangent, a harder application, or what's coming next. It keeps you engaged and it shows.",
    minutes: 10,
    level: "maintain",
    goals: ["get-ahead", "raise-grades"],
  },
];
