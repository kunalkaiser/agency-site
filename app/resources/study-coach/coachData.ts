// Study Coach content: a fully scripted decision tree rendered in a chat-style
// UI. Deterministic — the student's taps pick a path through this data; there
// is no live generation and nothing typed here leaves the browser.
// Every resource URL below was verified live before shipping. Rules: only
// well-established free platforms, at least two non-Khan options per topic,
// deep links where the platform has a stable one, no login-walled content.

export type StruggleId = "totally-lost" | "tests-bad" | "careless" | "out-of-time";
export type TimeId = "daily15" | "daily30" | "weekends";

export type CoachResource = {
  label: string;
  url: string;
  note: string;
};

export type CoachTopic = {
  id: string;
  label: string;
  /** Short phrase the coach uses when reflecting the choice back. */
  spoken: string;
  resources: CoachResource[];
};

export type CoachSubject = {
  id: string;
  label: string;
  topics: CoachTopic[];
  /** Lowercased keyword → topic id, for refining from the optional free-text detail. */
  keywords: Record<string, string>;
};

export type PlanStep = { title: string; detail: string };

export type StrugglePlan = {
  id: StruggleId;
  label: string;
  /** Coach's empathetic acknowledgement line in the chat. */
  ack: string;
  steps: PlanStep[];
  week1: string;
  week2: string;
};

export type TimeBudget = {
  id: TimeId;
  label: string;
  /** The session rhythm line shown at the top of the plan. */
  rhythm: string;
};

export const SUBJECTS: CoachSubject[] = [
  {
    id: "math",
    label: "Math",
    topics: [
      {
        id: "fractions",
        label: "Fractions & number sense",
        spoken: "fractions and number sense",
        resources: [
          {
            label: "Khan Academy — Arithmetic",
            url: "https://www.khanacademy.org/math/arithmetic",
            note: "Free video lessons and practice on fractions, decimals, and operations.",
          },
          {
            label: "CK-12 — Math",
            url: "https://www.ck12.org/math/",
            note: "Free interactive lessons and adaptive practice by topic.",
          },
          {
            label: "OpenStax — Prealgebra",
            url: "https://openstax.org/details/books/prealgebra-2e",
            note: "A complete free textbook — the fractions chapters have worked examples.",
          },
        ],
      },
      {
        id: "linear-equations",
        label: "Linear equations & graphing",
        spoken: "linear equations and graphing",
        resources: [
          {
            label: "Khan Academy — Algebra 1",
            url: "https://www.khanacademy.org/math/algebra",
            note: "Lessons and practice on solving and graphing linear equations.",
          },
          {
            label: "Desmos Graphing Calculator",
            url: "https://www.desmos.com/calculator",
            note: "Free graphing tool — type any equation and see it instantly.",
          },
          {
            label: "OpenStax — Elementary Algebra",
            url: "https://openstax.org/details/books/elementary-algebra-2e",
            note: "Free textbook with step-by-step worked examples.",
          },
        ],
      },
      {
        id: "quadratics",
        label: "Quadratics & factoring",
        spoken: "quadratics and factoring",
        resources: [
          {
            label: "Khan Academy — Algebra 2",
            url: "https://www.khanacademy.org/math/algebra2",
            note: "Lessons and practice on factoring and quadratic equations.",
          },
          {
            label: "Desmos Graphing Calculator",
            url: "https://www.desmos.com/calculator",
            note: "Graph your quadratics to see what the algebra is doing.",
          },
          {
            label: "OpenStax — Intermediate Algebra",
            url: "https://openstax.org/details/books/intermediate-algebra-2e",
            note: "Free textbook chapters with fully worked factoring examples.",
          },
        ],
      },
      {
        id: "geometry",
        label: "Geometry & shapes",
        spoken: "geometry",
        resources: [
          {
            label: "Khan Academy — Geometry",
            url: "https://www.khanacademy.org/math/geometry",
            note: "Full course: angles, triangles, area, volume, and proofs.",
          },
          {
            label: "Desmos Geometry",
            url: "https://www.desmos.com/geometry",
            note: "Free construction tool — draw and measure figures yourself.",
          },
          {
            label: "CK-12 — Math",
            url: "https://www.ck12.org/math/",
            note: "Interactive geometry lessons with built-in practice.",
          },
        ],
      },
      {
        id: "word-problems",
        label: "Word problems",
        spoken: "word problems",
        resources: [
          {
            label: "Khan Academy — Pre-algebra",
            url: "https://www.khanacademy.org/math/pre-algebra",
            note: "Word-problem practice woven through every unit.",
          },
          {
            label: "CK-12 — Math",
            url: "https://www.ck12.org/math/",
            note: "Topic-by-topic practice including applied problems.",
          },
          {
            label: "Desmos Graphing Calculator",
            url: "https://www.desmos.com/calculator",
            note: "Model word problems visually to check your setup.",
          },
        ],
      },
      {
        id: "math-exam",
        label: "Exam prep",
        spoken: "math exam prep",
        resources: [
          {
            label: "Khan Academy — Math",
            url: "https://www.khanacademy.org/math",
            note: "Pick your exact course and use the unit tests as practice exams.",
          },
          {
            label: "CK-12 — Math",
            url: "https://www.ck12.org/math/",
            note: "Adaptive practice to shore up weak units before the exam.",
          },
          {
            label: "OpenStax — Math",
            url: "https://openstax.org/subjects/math",
            note: "Free textbooks with chapter reviews and practice tests.",
          },
          {
            label: "ZenEd — our free NY Regents companion",
            url: "https://kunalkaiser.github.io/zened/",
            note: "Built for NY students prepping for Regents exams.",
          },
        ],
      },
    ],
    keywords: {
      fraction: "fractions",
      decimal: "fractions",
      percent: "fractions",
      "number line": "fractions",
      equation: "linear-equations",
      slope: "linear-equations",
      graph: "linear-equations",
      "solve for x": "linear-equations",
      inequality: "linear-equations",
      quadratic: "quadratics",
      factor: "quadratics",
      parabola: "quadratics",
      polynomial: "quadratics",
      angle: "geometry",
      triangle: "geometry",
      circle: "geometry",
      area: "geometry",
      volume: "geometry",
      proof: "geometry",
      "word problem": "word-problems",
      regents: "math-exam",
      exam: "math-exam",
      test: "math-exam",
      final: "math-exam",
      sat: "math-exam",
    },
  },
  {
    id: "english",
    label: "English & writing",
    topics: [
      {
        id: "reading",
        label: "Reading comprehension",
        spoken: "reading comprehension",
        resources: [
          {
            label: "CommonLit Library",
            url: "https://www.commonlit.org/en/library",
            note: "Thousands of free leveled texts with built-in questions.",
          },
          {
            label: "Khan Academy — ELA",
            url: "https://www.khanacademy.org/ela",
            note: "Reading practice by grade level, free with progress tracking.",
          },
          {
            label: "Crash Course",
            url: "https://thecrashcourse.com/",
            note: "Free video series that make dense texts easier to enter.",
          },
        ],
      },
      {
        id: "essay",
        label: "Essay structure & writing",
        spoken: "essay writing",
        resources: [
          {
            label: "Purdue OWL — Essay Writing",
            url: "https://owl.purdue.edu/owl/general_writing/academic_writing/essay_writing/index.html",
            note: "The classic free reference for structuring every kind of essay.",
          },
          {
            label: "Quill",
            url: "https://www.quill.org/",
            note: "Free interactive writing practice, sentence by sentence.",
          },
          {
            label: "Khan Academy — ELA",
            url: "https://www.khanacademy.org/ela",
            note: "Writing lessons alongside the reading practice.",
          },
        ],
      },
      {
        id: "grammar",
        label: "Grammar & sentences",
        spoken: "grammar",
        resources: [
          {
            label: "Khan Academy — Grammar",
            url: "https://www.khanacademy.org/humanities/grammar",
            note: "Short, clear lessons on every grammar rule with practice.",
          },
          {
            label: "Quill",
            url: "https://www.quill.org/",
            note: "Free sentence-level practice that targets your weak spots.",
          },
          {
            label: "Purdue OWL",
            url: "https://owl.purdue.edu/owl/purdue_owl.html",
            note: "Look up any grammar or punctuation rule, free.",
          },
        ],
      },
      {
        id: "vocabulary",
        label: "Vocabulary building",
        spoken: "vocabulary",
        resources: [
          {
            label: "CommonLit Library",
            url: "https://www.commonlit.org/en/library",
            note: "Reading widely at the right level is the strongest vocab builder there is.",
          },
          {
            label: "Quill",
            url: "https://www.quill.org/",
            note: "Sentence-writing practice that puts new words to work.",
          },
          {
            label: "Khan Academy — ELA",
            url: "https://www.khanacademy.org/ela",
            note: "Vocabulary in context through the reading exercises.",
          },
        ],
      },
      {
        id: "literary-analysis",
        label: "Poetry & literary analysis",
        spoken: "literary analysis",
        resources: [
          {
            label: "CommonLit Library",
            url: "https://www.commonlit.org/en/library",
            note: "Free poems and stories with analysis questions built in.",
          },
          {
            label: "Crash Course",
            url: "https://thecrashcourse.com/",
            note: "The Literature series walks through major works and how to read them.",
          },
          {
            label: "Purdue OWL",
            url: "https://owl.purdue.edu/owl/purdue_owl.html",
            note: "Free guides to writing about literature.",
          },
        ],
      },
      {
        id: "english-exam",
        label: "Exam prep",
        spoken: "English exam prep",
        resources: [
          {
            label: "CommonLit Library",
            url: "https://www.commonlit.org/en/library",
            note: "Practice with unfamiliar texts — the core skill on every English exam.",
          },
          {
            label: "Purdue OWL — Essay Writing",
            url: "https://owl.purdue.edu/owl/general_writing/academic_writing/essay_writing/index.html",
            note: "Tighten the essay structure the graders are looking for.",
          },
          {
            label: "Khan Academy — ELA",
            url: "https://www.khanacademy.org/ela",
            note: "Timed reading practice by grade level.",
          },
          {
            label: "ZenEd — our free NY Regents companion",
            url: "https://kunalkaiser.github.io/zened/",
            note: "Built for NY students prepping for Regents exams.",
          },
        ],
      },
    ],
    keywords: {
      essay: "essay",
      thesis: "essay",
      paragraph: "essay",
      "writing prompt": "essay",
      grammar: "grammar",
      comma: "grammar",
      punctuation: "grammar",
      sentence: "grammar",
      vocab: "vocabulary",
      poem: "literary-analysis",
      poetry: "literary-analysis",
      novel: "literary-analysis",
      theme: "literary-analysis",
      symbolism: "literary-analysis",
      comprehension: "reading",
      reading: "reading",
      regents: "english-exam",
      exam: "english-exam",
      test: "english-exam",
      final: "english-exam",
    },
  },
  {
    id: "science",
    label: "Science",
    topics: [
      {
        id: "biology",
        label: "Biology & living things",
        spoken: "biology",
        resources: [
          {
            label: "Khan Academy — Biology",
            url: "https://www.khanacademy.org/science/biology",
            note: "Full course from cells to ecosystems, with practice.",
          },
          {
            label: "CK-12 — Science",
            url: "https://www.ck12.org/science/",
            note: "Interactive biology lessons with built-in checks.",
          },
          {
            label: "OpenStax — Biology",
            url: "https://openstax.org/details/books/biology-2e",
            note: "A complete free textbook with diagrams and review questions.",
          },
          {
            label: "LabXchange",
            url: "https://www.labxchange.org/",
            note: "Free virtual labs and interactives from Harvard.",
          },
        ],
      },
      {
        id: "chemistry",
        label: "Chemistry basics",
        spoken: "chemistry",
        resources: [
          {
            label: "Khan Academy — Chemistry",
            url: "https://www.khanacademy.org/science/chemistry",
            note: "Lessons and practice from atoms through reactions.",
          },
          {
            label: "PhET Simulations",
            url: "https://phet.colorado.edu/",
            note: "Free interactive simulations — see the molecules move.",
          },
          {
            label: "OpenStax — Chemistry",
            url: "https://openstax.org/details/books/chemistry-2e",
            note: "Free textbook with worked example problems.",
          },
        ],
      },
      {
        id: "physics",
        label: "Physics & motion",
        spoken: "physics",
        resources: [
          {
            label: "Khan Academy — Physics",
            url: "https://www.khanacademy.org/science/physics",
            note: "Video lessons and problem practice on every mechanics topic.",
          },
          {
            label: "PhET Simulations",
            url: "https://phet.colorado.edu/",
            note: "Play with forces, motion, and energy in free simulations.",
          },
          {
            label: "OpenStax — Science",
            url: "https://openstax.org/subjects/science",
            note: "Free physics textbooks with practice problems.",
          },
        ],
      },
      {
        id: "earth-space",
        label: "Earth & space science",
        spoken: "earth and space science",
        resources: [
          {
            label: "Khan Academy — Earth & Space",
            url: "https://www.khanacademy.org/science/high-school-earth-and-space-science",
            note: "High-school earth science course, free with practice.",
          },
          {
            label: "CK-12 — Science",
            url: "https://www.ck12.org/science/",
            note: "Earth science lessons with interactive practice.",
          },
          {
            label: "PhET Simulations",
            url: "https://phet.colorado.edu/",
            note: "Simulations for plate tectonics, gravity, and more.",
          },
        ],
      },
      {
        id: "labs-data",
        label: "Labs, graphs & data",
        spoken: "labs and data skills",
        resources: [
          {
            label: "LabXchange",
            url: "https://www.labxchange.org/",
            note: "Free virtual labs you can run and re-run at home.",
          },
          {
            label: "PhET — Browse Simulations",
            url: "https://phet.colorado.edu/en/simulations/browse",
            note: "Every free simulation in one place — practice reading what they show.",
          },
          {
            label: "CK-12 — Science",
            url: "https://www.ck12.org/science/",
            note: "Lessons on the scientific method, graphing, and data.",
          },
        ],
      },
      {
        id: "science-exam",
        label: "Exam prep",
        spoken: "science exam prep",
        resources: [
          {
            label: "Khan Academy — Science",
            url: "https://www.khanacademy.org/science",
            note: "Pick your course and use unit tests as practice exams.",
          },
          {
            label: "CK-12 — Science",
            url: "https://www.ck12.org/science/",
            note: "Adaptive practice to patch weak units fast.",
          },
          {
            label: "OpenStax — Science",
            url: "https://openstax.org/subjects/science",
            note: "Free textbooks with chapter reviews for structured revision.",
          },
          {
            label: "ZenEd — our free NY Regents companion",
            url: "https://kunalkaiser.github.io/zened/",
            note: "Built for NY students prepping for Regents exams.",
          },
        ],
      },
    ],
    keywords: {
      cell: "biology",
      genetics: "biology",
      photosynthesis: "biology",
      ecosystem: "biology",
      "living environment": "biology",
      atom: "chemistry",
      mole: "chemistry",
      reaction: "chemistry",
      periodic: "chemistry",
      bonding: "chemistry",
      force: "physics",
      motion: "physics",
      energy: "physics",
      velocity: "physics",
      circuit: "physics",
      rock: "earth-space",
      weather: "earth-space",
      climate: "earth-space",
      space: "earth-space",
      astronomy: "earth-space",
      lab: "labs-data",
      data: "labs-data",
      regents: "science-exam",
      exam: "science-exam",
      test: "science-exam",
      final: "science-exam",
    },
  },
  {
    id: "history",
    label: "History & social studies",
    topics: [
      {
        id: "us-history",
        label: "U.S. history",
        spoken: "U.S. history",
        resources: [
          {
            label: "Khan Academy — US History",
            url: "https://www.khanacademy.org/humanities/us-history",
            note: "Full course with readings, videos, and practice.",
          },
          {
            label: "Crash Course",
            url: "https://thecrashcourse.com/",
            note: "The US History video series is a beloved free overview.",
          },
          {
            label: "OpenStax — U.S. History",
            url: "https://openstax.org/details/books/us-history",
            note: "A complete free textbook with review questions.",
          },
        ],
      },
      {
        id: "world-history",
        label: "World history",
        spoken: "world history",
        resources: [
          {
            label: "Khan Academy — World History",
            url: "https://www.khanacademy.org/humanities/world-history",
            note: "Free course spanning ancient to modern.",
          },
          {
            label: "Crash Course",
            url: "https://thecrashcourse.com/",
            note: "The World History series makes the big picture stick.",
          },
          {
            label: "OpenStax — World History",
            url: "https://openstax.org/details/books/world-history-volume-2",
            note: "Free textbook covering 1400 to the present.",
          },
        ],
      },
      {
        id: "civics",
        label: "Civics & government",
        spoken: "civics and government",
        resources: [
          {
            label: "Khan Academy — US Government & Civics",
            url: "https://www.khanacademy.org/humanities/us-government-and-civics",
            note: "Clear lessons on how the system actually works.",
          },
          {
            label: "iCivics",
            url: "https://www.icivics.org/",
            note: "Free games and lessons that teach civics by doing.",
          },
          {
            label: "Crash Course",
            url: "https://thecrashcourse.com/",
            note: "The Government & Politics series, free on video.",
          },
        ],
      },
      {
        id: "geography",
        label: "Geography",
        spoken: "geography",
        resources: [
          {
            label: "National Geographic Education",
            url: "https://education.nationalgeographic.org/",
            note: "Free articles, maps, and resources on every region.",
          },
          {
            label: "Crash Course",
            url: "https://thecrashcourse.com/",
            note: "The Geography series connects maps to how people live.",
          },
          {
            label: "Khan Academy — World History",
            url: "https://www.khanacademy.org/humanities/world-history",
            note: "History and geography reinforce each other — study them together.",
          },
        ],
      },
      {
        id: "history-essays",
        label: "History essays & DBQs",
        spoken: "history essays",
        resources: [
          {
            label: "Purdue OWL — Essay Writing",
            url: "https://owl.purdue.edu/owl/general_writing/academic_writing/essay_writing/index.html",
            note: "Free, clear guidance on building an argument with evidence.",
          },
          {
            label: "CommonLit Library",
            url: "https://www.commonlit.org/en/library",
            note: "Free primary sources to practice document analysis.",
          },
          {
            label: "Khan Academy — US History",
            url: "https://www.khanacademy.org/humanities/us-history",
            note: "Practice reading and interpreting historical documents.",
          },
        ],
      },
      {
        id: "history-exam",
        label: "Exam prep",
        spoken: "history exam prep",
        resources: [
          {
            label: "Khan Academy — US History",
            url: "https://www.khanacademy.org/humanities/us-history",
            note: "Unit tests double as free practice exams.",
          },
          {
            label: "Crash Course",
            url: "https://thecrashcourse.com/",
            note: "Fast, memorable review of whole eras before the exam.",
          },
          {
            label: "OpenStax — U.S. History",
            url: "https://openstax.org/details/books/us-history",
            note: "Chapter summaries and review questions, free.",
          },
          {
            label: "ZenEd — our free NY Regents companion",
            url: "https://kunalkaiser.github.io/zened/",
            note: "Built for NY students prepping for Regents exams.",
          },
        ],
      },
    ],
    keywords: {
      constitution: "civics",
      government: "civics",
      congress: "civics",
      amendment: "civics",
      revolution: "us-history",
      "civil war": "us-history",
      "civil rights": "us-history",
      "world war": "world-history",
      empire: "world-history",
      "cold war": "world-history",
      map: "geography",
      geography: "geography",
      dbq: "history-essays",
      essay: "history-essays",
      document: "history-essays",
      regents: "history-exam",
      exam: "history-exam",
      test: "history-exam",
      final: "history-exam",
    },
  },
];

export const STRUGGLES: StrugglePlan[] = [
  {
    id: "totally-lost",
    label: "Honestly? Totally lost",
    ack: "That takes guts to say — and it's the most fixable one on the list. We'll rebuild from the last place it made sense.",
    steps: [
      {
        title: "Find your floor",
        detail:
          "Start each session one step earlier than where you're lost. Use the lessons in the links below and go back until something feels easy — that's your floor, and you build up from there.",
      },
      {
        title: "Worked examples before practice",
        detail:
          "Study two or three fully solved examples line by line, saying out loud what each step does. Then cover the solution and redo it yourself from a blank page.",
      },
      {
        title: "Try one, check one",
        detail:
          "Do practice questions one at a time, checking the answer after each — not at the end. Instant feedback stops a wrong method from getting rehearsed ten times.",
      },
      {
        title: "One-minute teach-back",
        detail:
          "End every session by explaining the day's idea out loud, from memory, as if to a younger student. Where the explanation stalls is tomorrow's starting point.",
      },
      {
        title: "Keep an error log",
        detail:
          "Every wrong answer goes in a notebook: the question, the right way, one line on what tripped you. Reread it at the start of each week — it becomes a map of exactly what to fix.",
      },
    ],
    week1: "Week 1 — find your floor and rebuild upward with lessons and worked examples. No timed pressure yet.",
    week2: "Week 2 — flip to practice-first: try problems before reviewing, keep the teach-back going, and reread your error log midweek.",
  },
  {
    id: "tests-bad",
    label: "Fine in class, but tests go badly",
    ack: "Very common — and it usually means the studying feels productive but isn't test-shaped. We'll fix the practice, not the effort.",
    steps: [
      {
        title: "Closed-book warm-up",
        detail:
          "Open every session by writing what you remember about the topic with notes closed — even two minutes. Pulling it from memory is the workout; rereading is just watching someone else lift.",
      },
      {
        title: "Practice like the test",
        detail:
          "Spend most of each session answering questions — practice sets, unit quizzes, past questions from the links below — under light time pressure, without notes.",
      },
      {
        title: "Space the review",
        detail:
          "Revisit what you studied on day 1 again on day 3, then day 7. Short, spaced returns beat one long review the night before — that's what makes it stick past Friday.",
      },
      {
        title: "Log every miss",
        detail:
          "Wrong answers go in an error log with one line on why. Before any quiz or test, reread the log instead of your notes — it's your personal list of what the test will catch.",
      },
      {
        title: "Full dress rehearsal",
        detail:
          "At the end of week 2, take one full practice quiz under real conditions: timed, closed book, no music. Score it honestly. That number is your real progress report.",
      },
    ],
    week1: "Week 1 — switch every session to retrieval: closed-book warm-ups, question practice, and the day-3 review.",
    week2: "Week 2 — raise the realism: longer question sets, light timing, error-log rereads, and the dress rehearsal at the end.",
  },
  {
    id: "careless",
    label: "I know it, but careless mistakes",
    ack: "Good news: the understanding is there. Careless points are the cheapest points to win back — but it takes a system, not just \"be careful.\"",
    steps: [
      {
        title: "Name your mistakes",
        detail:
          "For one week, log every lost point with a category: misread the question, sign slip, skipped step, rushed the ending. Patterns appear fast — most people have two favorites.",
      },
      {
        title: "Build your 3-line checklist",
        detail:
          "Turn your top mistake categories into a personal checklist (\"reread the question — check signs — check units\"). Run it on the last minute of every practice set until it's automatic.",
      },
      {
        title: "Budget the last 10%",
        detail:
          "In every practice session, stop working with 10% of the time left and spend it checking. Checking is a scheduled step, not a thing you do if there's time.",
      },
      {
        title: "Redo, don't review",
        detail:
          "Any question you missed gets redone from scratch the next day — not just looked over. Your hand needs the correct version, not just your eyes.",
      },
      {
        title: "Accuracy sprints",
        detail:
          "Twice a week, do a short set with one rule: zero errors, speed doesn't count. Slowing down on purpose teaches you exactly where you tend to rush.",
      },
    ],
    week1: "Week 1 — collect the evidence: log and categorize every lost point while doing normal practice.",
    week2: "Week 2 — run the fix: checklist on every set, the 10% checking budget, and two accuracy sprints.",
  },
  {
    id: "out-of-time",
    label: "I run out of time on tests",
    ack: "Then the material isn't the problem — pace is. Pace is trainable, and two weeks is enough to feel the difference.",
    steps: [
      {
        title: "Learn the test's shape",
        detail:
          "Map the test you're preparing for: sections, question types, points, and minutes. Work out roughly how long each question deserves — that number changes how you practice.",
      },
      {
        title: "Timed sets from day one",
        detail:
          "Practice in short timed bursts using questions from the links below. Start with generous time and trim it session by session — speed grows from repetition, not panic.",
      },
      {
        title: "The 30-second triage rule",
        detail:
          "On every practice set: if a question isn't moving after 30 seconds, mark it and move on. Coming back with fresh eyes beats sinking five minutes into one problem.",
      },
      {
        title: "Drill the greatest hits",
        detail:
          "Most tests reuse the same handful of question types. Drill the most common ones until they're nearly automatic — automatic questions donate their minutes to the hard ones.",
      },
      {
        title: "Full timed run",
        detail:
          "End week 2 with a complete practice test at real timing. Note where the time actually went — that tells you what to drill next.",
      },
    ],
    week1: "Week 1 — map the format and start short timed sets with the triage rule.",
    week2: "Week 2 — tighten the timing, drill the most common question types, and finish with the full timed run.",
  },
];

export const TIME_BUDGETS: TimeBudget[] = [
  {
    id: "daily15",
    label: "About 15 minutes a day",
    rhythm:
      "Your rhythm: one focused 15-minute block, six days a week. Small and daily beats big and rare — protect the streak, not the length.",
  },
  {
    id: "daily30",
    label: "About 30 minutes a day",
    rhythm:
      "Your rhythm: a 30-minute block on five or six days — roughly 10 minutes of closed-book warm-up, 15 of the day's main step, and 5 for your error log.",
  },
  {
    id: "weekends",
    label: "Mostly weekends",
    rhythm:
      "Your rhythm: two solid weekend blocks of 60–90 minutes each, plus one 10-minute weekday touch-up so the week doesn't wash it away.",
  },
];

export function getSubject(id: string): CoachSubject | undefined {
  return SUBJECTS.find((s) => s.id === id);
}

/** Match free-text detail against a subject's keyword map. Longest keyword wins. */
export function matchTopicFromDetail(subject: CoachSubject, detail: string): string | null {
  const text = detail.toLowerCase();
  let best: { keyword: string; topic: string } | null = null;
  for (const [keyword, topic] of Object.entries(subject.keywords)) {
    if (text.includes(keyword) && (!best || keyword.length > best.keyword.length)) {
      best = { keyword, topic };
    }
  }
  return best ? best.topic : null;
}
