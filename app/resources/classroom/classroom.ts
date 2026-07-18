// Classroom Strategy Finder: symptom-first navigation for teachers, limited
// to academic-engagement situations. Content rules (hard): classroom and
// instructional practices in plain teacher language; no clinical, diagnostic,
// therapy, or behavior-analysis terms; no tier/PBIS branding; situations
// describe what's observable, never a child's character.

export type Strategy = { title: string; how: string };

export type Situation = {
  slug: string;
  /** Short grid label, e.g. "Not turning in work". */
  title: string;
  /** Search-intent metadata title. */
  metaTitle: string;
  description: string;
  /** Emoji for the index grid card. */
  emoji: string;
  looksLike: string[]; // 3–4 observable bullets, neutral
  underneath: string[]; // 2–3 plain-language questions to consider
  tryFirst: Strategy[]; // 4–5 low-lift strategies
  buildingHabit: Strategy[]; // 3–4 longer-arc strategies
  loopIn: string; // when to involve family / grade team / counselor
  templates: { label: string; href: string }[]; // 1–3 printable templates
  related?: { label: string; href: string }[];
};

export const SITUATIONS: Situation[] = [
  {
    slug: "not-turning-in-work",
    title: "Not turning in work",
    metaTitle: "Strategies When a Student Isn't Turning In Work",
    description:
      "The work may even be done — it just never lands in your hands. Low-lift moves for closing the completion-to-submission gap.",
    emoji: "📥",
    looksLike: [
      "Assignments are missing at the deadline, sometimes found later — finished — in a backpack or folder.",
      "The student can often describe the assignment and may have started or completed it.",
      "Zeros are accumulating faster than the student's classwork quality would predict.",
      "The pattern is heavier for multi-day assignments than for work finished in class.",
    ],
    underneath: [
      "Is this a tracking problem — does the student reliably know what's due, and where to record it?",
      "Is the hand-in step itself the gap — done work that never makes the final trip to the tray?",
      "Has the student stopped turning in work they believe is too late to matter?",
    ],
    tryFirst: [
      {
        title: "Same tray, same moment",
        how: "Collect work at one fixed point in the routine — first two minutes, one labeled tray. Variable collection is where finished work goes to disappear.",
      },
      {
        title: "The turn-in sweep",
        how: "After collecting, read the three or four missing names aloud, neutrally, with a 30-second backpack check invited. Half of “missing” is found on the spot.",
      },
      {
        title: "Post the due-date trail",
        how: "Keep one visible board corner with what's due and when — and photograph-friendly. Students who track poorly need the answer to live somewhere other than memory.",
      },
      {
        title: "Late beats never, said plainly",
        how: "Tell the class exactly what late work is worth and until when. Students quietly stop submitting when they assume it's pointless; a clear floor restarts the flow.",
      },
      {
        title: "Two-minute start in class",
        how: "Launch multi-day assignments with the first two minutes done together before the bell. Work that's started travels home with momentum.",
      },
    ],
    buildingHabit: [
      {
        title: "One place assignments live",
        how: "Pick the single source — planner, class page, board photo — and make checking it the official last step of class for two weeks, until it runs itself.",
      },
      {
        title: "The Friday folder audit",
        how: "Five minutes weekly: students sweep folders and backpacks for finished-but-stranded work, no penalty attached. The audit finds work and teaches the habit at once.",
      },
      {
        title: "Track the gap, not the kid",
        how: "For two weeks, jot whether missing work was not-started, started, or done-but-stranded. The three patterns point at three different fixes.",
      },
      {
        title: "A quiet note home that isn't a complaint",
        how: "Frame it as logistics to solve together: “The work is getting done — it isn't making it to me. Can we build one hand-in habit at home?”",
      },
    ],
    loopIn:
      "Loop in the family and your grade team if the pattern is new, sudden, or shows up across several classes — and the school counselor or support staff if it arrives alongside visible distress or big changes in the student. A cross-settings pattern needs more eyes than one classroom can give it.",
    templates: [
      { label: "Weekly Data Tracker", href: "/resources/templates/weekly-data-tracker" },
      { label: "Parent Communication Log", href: "/resources/templates/parent-communication-log" },
    ],
    related: [
      { label: "Student Data Collection Sheet Guide", href: "/resources/student-data-collection-sheet-guide" },
    ],
  },
  {
    slug: "off-task-non-disruptive",
    title: "Off-task, but quiet",
    metaTitle: "Strategies for the Quietly Off-Task Student",
    description:
      "Daydreaming, doodling, drifting — nobody else is bothered, but no work is happening. Moves that reconnect without spotlighting.",
    emoji: "💭",
    looksLike: [
      "The student is looking at the page, the window, or the doodle — not at the task — for long stretches.",
      "Work comes back far shorter than the time given, without misbehavior anyone would name.",
      "Redirection works for a minute or two, then the drift resumes.",
      "It's more pronounced during long independent stretches than during discussion or hands-on work.",
    ],
    underneath: [
      "Is the task's entry point clear — does the student know exactly what doing it looks like for the first two minutes?",
      "Is the stretch simply longer than this student's current independent-work stamina?",
      "Is the material pitched too hard — or too easy — so drifting is more rewarding than working?",
    ],
    tryFirst: [
      {
        title: "Proximity, not commentary",
        how: "Teach from near the drifter's desk for a few minutes. Presence redirects without a word spent or attention drawn.",
      },
      {
        title: "Shrink the first step",
        how: "Hand the task a visible entry point: “Start with just the first two — then look up.” Drift often begins where the task's doorway is fuzzy.",
      },
      {
        title: "The silent check-in",
        how: "A tap on the desk and a point at the next problem, while you keep moving. Private beats public for a student who isn't bothering anyone.",
      },
      {
        title: "Chunk the clock",
        how: "Split a 20-minute stretch into two 8s with a 30-second stand-and-stretch between. Stamina grows from finished chunks, not from endured marathons.",
      },
      {
        title: "A job inside the lesson",
        how: "Materials passer, board writer, timer keeper. A drifting student with a role has a reason to stay in the room mentally.",
      },
    ],
    buildingHabit: [
      {
        title: "Track when, not how much",
        how: "For a week, note when the drift happens — subject, time of day, task type. The pattern usually names the fix better than any hunch.",
      },
      {
        title: "A private restart signal",
        how: "Agree on a quiet cue with the student — a look, a tapped shoulder — so restarting never costs face. Ask them to pick the cue; theirs works better.",
      },
      {
        title: "Weekly self-check",
        how: "A one-minute Friday self-report — effort, one win, one stuck point — teaches the student to notice their own attention before you have to.",
      },
    ],
    loopIn:
      "Talk with the family and your grade team if the drifting is new or spans most subjects — and with the school counselor or support staff if the student seems withdrawn, worried, or noticeably different from earlier in the year. Quiet changes deserve as much curiosity as loud ones.",
    templates: [
      { label: "Student Check-In Form", href: "/resources/templates/student-check-in-form" },
      { label: "Weekly Data Tracker", href: "/resources/templates/weekly-data-tracker" },
    ],
  },
  {
    slug: "off-task-disruptive",
    title: "Off-task and pulling others in",
    metaTitle: "Strategies When Off-Task Turns Into Classroom Disruption",
    description:
      "The side conversation that becomes three, the joke at the worst moment. Moves that protect the room without a daily standoff.",
    emoji: "📣",
    looksLike: [
      "Off-task moments recruit neighbors — talk, notes, props, laughter that spreads.",
      "The timing clusters at transitions and during independent work more than during instruction.",
      "Redirections work briefly, but the room pays a little each time in momentum.",
      "The same two or three seatmates are usually in the blast radius.",
    ],
    underneath: [
      "Is the audience the point — does the moment pay in laughs or status more than the task pays in anything?",
      "Are transitions loose enough that the vacuum invites filling?",
      "Is the work pitched where this student can actually start it without cover?",
    ],
    tryFirst: [
      {
        title: "Tighten the transitions",
        how: "Give transitions a countdown, a task, and a time. Most recruitment happens in the loose sixty seconds between activities.",
      },
      {
        title: "Move the geography",
        how: "Reseat toward the front-third, near you, away from the usual audience — framed as routine, not punishment. Distance quietly removes the stage.",
      },
      {
        title: "The two-part redirect",
        how: "Name the task, not the behavior, and walk away: “Number four is next.” Lingering invites the exchange the moment was fishing for.",
      },
      {
        title: "Catch them being the anchor",
        how: "The first day they hold their own focus through a work period, say so privately and specifically. What earns attention gets repeated.",
      },
      {
        title: "Channel the energy on purpose",
        how: "Give the room's entertainer legitimate airtime — presenting, reading aloud, running the review game. Star time on your terms shrinks the freelance version.",
      },
    ],
    buildingHabit: [
      {
        title: "A private reset conversation",
        how: "Away from the audience, one calm exchange: what you see, what you need, what they need from you to make it doable. Two minutes, no verdicts.",
      },
      {
        title: "One agreed signal",
        how: "Pick a quiet cue together for “pull it back.” A signal the student helped choose costs no face and usually gets honored.",
      },
      {
        title: "Track the clusters",
        how: "A week of quick notes — when, during what, who nearby — usually shows two fixable triggers rather than a difficult child.",
      },
      {
        title: "Partner with the family early",
        how: "Call before it's a crisis, leading with something true and positive. Families who hear the good first stay partners for the hard parts.",
      },
    ],
    loopIn:
      "Bring in your grade team early to compare rooms — the same student calm in one class and loud in another is information about conditions, not character. Talk with the family sooner rather than later, and with the school counselor or support staff if the intensity is new, escalating, or paired with signs of distress.",
    templates: [
      { label: "Weekly Data Tracker", href: "/resources/templates/weekly-data-tracker" },
      { label: "Parent Communication Log", href: "/resources/templates/parent-communication-log" },
      { label: "Positive Note Home", href: "/resources/templates/positive-note-home" },
    ],
  },
  {
    slug: "unmotivated",
    title: "Seems unmotivated",
    metaTitle: "Strategies for the Student Who Seems Unmotivated",
    description:
      "Capable work, minimum effort, “I don't care” energy. Moves that find the switch instead of pushing harder on a dead one.",
    emoji: "🔋",
    looksLike: [
      "Work is done to the minimum — or not at all — despite evidence the student can do it.",
      "Grades and consequences that move other students don't seem to move this one.",
      "Engagement flickers on for certain topics, formats, or people, then off again.",
      "“I don't care” or a shrug is the default answer to feedback.",
    ],
    underneath: [
      "Is “unmotivated” actually “protecting myself” — has trying and failing gotten expensive for this student?",
      "Does the work connect to anything the student wants — or can name — beyond the grade?",
      "When did it flicker on last, and what was different about that day?",
    ],
    tryFirst: [
      {
        title: "Chase the flicker",
        how: "Find the one assignment this year that got real effort and study it like evidence: topic, format, audience. Then build the next task with those ingredients.",
      },
      {
        title: "Offer a real choice",
        how: "Two ways to show the same learning — essay or annotated diagram, solo or pair. Choice is the cheapest motivation there is.",
      },
      {
        title: "Shrink success to today",
        how: "Replace “bring the grade up” with “finish these four, well.” A goal reachable by Friday competes with disengagement; a semester goal doesn't.",
      },
      {
        title: "Two minutes of genuine interest",
        how: "Ask about the game, the team, the show — no pivot to schoolwork attached. Students work for teachers who know them; that account has to be funded first.",
      },
      {
        title: "Feedback that names something real",
        how: "One specific strength in their actual work — not “good job,” but “this sentence does exactly what a topic sentence should.” Specific praise is credible; credible lands.",
      },
    ],
    buildingHabit: [
      {
        title: "The Friday self-report",
        how: "Effort, one win, one stuck point, one ask — weekly. Students who rate their own effort start noticing they have a dial.",
      },
      {
        title: "An audience beyond the gradebook",
        how: "Work that gets displayed, read to younger students, or sent home as a positive note pays in a currency some students value far above points.",
      },
      {
        title: "Watch the ramp, not the summit",
        how: "Grade the visible process for a while — the plan, the draft, the correction — so effort itself earns something while the bigger engine restarts.",
      },
    ],
    loopIn:
      "Compare notes with your grade team — flat in every class and flat in only yours are different stories. Talk with the family about what lights this student up at home, and bring in the school counselor or support staff if the flatness looks like sadness, spans settings, or marks a sharp change from the student you saw earlier in the year.",
    templates: [
      { label: "Student Check-In Form", href: "/resources/templates/student-check-in-form" },
      { label: "Positive Note Home", href: "/resources/templates/positive-note-home" },
    ],
  },
  {
    slug: "disorganized",
    title: "Chronically disorganized",
    metaTitle: "Strategies for the Chronically Disorganized Student",
    description:
      "The backpack that eats homework, the desk that eats everything else. Systems that survive contact with a real kid.",
    emoji: "🎒",
    looksLike: [
      "Papers travel loose — folders exist but the filing doesn't happen in the moment.",
      "Materials for class arrive incomplete: the book but not the notebook, the worksheet but not the pen.",
      "Finding anything takes a visible, sometimes theatrical, excavation.",
      "The student often knows the work exists — locating it is the failure point.",
    ],
    underneath: [
      "Has anyone ever taught the system — or has the student only been told to “get organized”?",
      "Is the current system too elaborate — five folders where one in-and-out pocket would survive?",
      "Do transitions allow ten seconds for filing, or does the room move on while papers land loose?",
    ],
    tryFirst: [
      {
        title: "One folder, two pockets",
        how: "Replace the five-folder architecture with a single folder: IN for new, OUT for done. Systems survive in proportion to their simplicity.",
      },
      {
        title: "Build filing into the routine",
        how: "Ten scheduled seconds after handing anything out: “It goes in the IN pocket — now.” Filing that happens in class is the only filing that happens.",
      },
      {
        title: "The launch checklist",
        how: "Post the three things today's class needs and point at it as students enter. Checking a list beats remembering, for everyone.",
      },
      {
        title: "Desk reset with a timer",
        how: "Two minutes, music on, everything home — as a whole-class Friday ritual so no one is singled out. Group resets carry the students who need them most.",
      },
      {
        title: "Photograph the standard",
        how: "A picture of what a ready desk or packed folder looks like, taped where it's used. “Match the photo” outperforms “clean this up.”",
      },
    ],
    buildingHabit: [
      {
        title: "Shrink the checkpoints",
        how: "One consistent weekly folder check — same day, two minutes, no penalty, quick help on the spot. Inspection with support builds the habit; inspection with blame hides the mess.",
      },
      {
        title: "Teach the reset, not just the standard",
        how: "Walk the actual steps once: dump, sort into keep/turn-in/recycle, file. Organization is a procedure, and procedures get taught.",
      },
      {
        title: "Partner with home on one habit",
        how: "One shared routine — the nightly backpack pack — beats a fleet of home systems. Ask the family which single habit they could hold.",
      },
    ],
    loopIn:
      "Compare with your grade team — disorganization in one room is a routines question; in every room it's a bigger conversation. Loop in the family around one shared habit, and the school counselor or support staff if the disarray is new and sudden, or comes with changes in mood or care that concern you.",
    templates: [
      { label: "Weekly Data Tracker", href: "/resources/templates/weekly-data-tracker" },
      { label: "Student Check-In Form", href: "/resources/templates/student-check-in-form" },
    ],
    related: [
      { label: "Weekly Executive Function Planner", href: "/resources/weekly-executive-function-planner" },
    ],
  },
  {
    slug: "rushing-through-work",
    title: "Rushing through work",
    metaTitle: "Strategies for the Student Who Rushes Through Work",
    description:
      "First one done, most points lost. Moves that make careful the goal without making slow the punishment.",
    emoji: "🏃",
    looksLike: [
      "Work comes back fast and thin — first to finish, visible avoidable errors.",
      "The student treats “done” as the finish line; checking reads to them as extra credit.",
      "Quality jumps when you sit beside them, which shows the skills are in there.",
      "Speed spikes on tasks the student finds boring or beneath them.",
    ],
    underneath: [
      "What does finishing first buy this student — free time, status, escape from an unpleasant task?",
      "Does the student have an actual checking procedure, or just the instruction to “check your work”?",
      "Is the work pitched too easy, so speed is the only challenge left in it?",
    ],
    tryFirst: [
      {
        title: "Change what finishing buys",
        how: "Early finishers earn the checking step, not free time: “Done? Great — now the last two minutes are for the checklist.” The incentive to sprint dies quietly.",
      },
      {
        title: "A three-line checklist from their errors",
        how: "Build it from this student's actual misses — reread the question, check signs, reread the last answer. Three personal lines beat ten generic ones.",
      },
      {
        title: "Set a minimum time, not a maximum",
        how: "“Nobody hands this in before 9:40.” With the race cancelled, careful becomes possible without being slow.",
      },
      {
        title: "Grade one checked item visibly",
        how: "Have students mark one answer they checked and how. You're making the invisible step visible — and gradeable.",
      },
      {
        title: "Feed the speed legitimately",
        how: "Keep a real extension problem ready for genuine early finishers. Some rushers just need somewhere worthy to run.",
      },
    ],
    buildingHabit: [
      {
        title: "Track accuracy against speed",
        how: "Two weeks of quick notes: time taken vs. avoidable errors. Show the student their own graph — data about yourself is strangely persuasive.",
      },
      {
        title: "Teach one checking procedure",
        how: "Model it aloud weekly on the board — how you reread, what you look for. Checking is a skill shown, not a virtue demanded.",
      },
      {
        title: "Praise the catch, not just the score",
        how: "“You found your own error before I did” is the exact habit you want — name it every time you see it.",
      },
    ],
    loopIn:
      "Mention it to the family if points lost to rushing are moving grades — parents usually see the same pattern in homework and can run the same checklist. Compare with your grade team, and involve the counselor or support staff only if the hurry looks like distress or the pattern changes sharply.",
    templates: [
      { label: "Weekly Data Tracker", href: "/resources/templates/weekly-data-tracker" },
      { label: "Goal Progress Snapshot", href: "/resources/templates/goal-progress-snapshot" },
    ],
  },
  {
    slug: "cant-work-independently",
    title: "Can't work independently",
    metaTitle: "Strategies When a Student Can't Work Independently",
    description:
      "Fine beside you, lost the moment you step away. Moves that grow the distance one step at a time.",
    emoji: "🧍",
    looksLike: [
      "Work proceeds while you're at the desk and stops within a minute of your leaving.",
      "The hand goes up before the first attempt — the question is often “is this right?” rather than “how do I…?”",
      "Directions given to the whole class need re-explaining one-on-one.",
      "Output in independent stretches is a fraction of what supported stretches produce.",
    ],
    underneath: [
      "Is it confidence — does the student know how but not trust it without a nod?",
      "Are multi-step directions evaporating between the board and the desk?",
      "Has hand-raising quietly become the strategy that always works, because it always brings you?",
    ],
    tryFirst: [
      {
        title: "Ask three before me",
        how: "Before your help: the board, the example, a neighbor. Post it, point to it, hold it warmly. You're not withdrawing help — you're widening its sources.",
      },
      {
        title: "The worked example on the desk",
        how: "One completed problem or sentence taped to the corner of the task. Half of “I can't” dissolves next to a model.",
      },
      {
        title: "Leave a next step behind",
        how: "When you help, end with a named next move — “do the next two, then I'll check back” — and actually check back. Trust in the return visit buys the solo minutes.",
      },
      {
        title: "Confirm the start, not the answers",
        how: "Circulate to approve first steps in the opening minute. A confirmed start often runs a long way on its own.",
      },
      {
        title: "Directions in two channels",
        how: "Say it and post it, always. Students who lose spoken steps can re-find written ones without a rescue.",
      },
    ],
    buildingHabit: [
      {
        title: "Stretch the interval on purpose",
        how: "This week, return in one minute; next week, three; then five. Independence is grown like distance running — by adding meters, not speeches.",
      },
      {
        title: "The try-first ticket",
        how: "One attempt on paper is the price of help: “Show me what you tried.” Any honest scribble counts. The habit being built is starting.",
      },
      {
        title: "Name their solo wins",
        how: "“You did that whole section before asking — notice that.” Students repeat what gets noticed, especially students who doubt themselves.",
      },
      {
        title: "A self-check card",
        how: "A small desk card: Did I read it twice? Is there an example? What's my first step? Externalize the checklist you'd otherwise be for them.",
      },
    ],
    loopIn:
      "Compare with last year's teacher and your grade team — was independence ever there, or is it still being built? Talk with the family about what solo work looks like at home, and bring in the counselor or support staff if the clinging seems anchored in worry rather than skill, or is new this term.",
    templates: [
      { label: "Student Check-In Form", href: "/resources/templates/student-check-in-form" },
      { label: "Goal Progress Snapshot", href: "/resources/templates/goal-progress-snapshot" },
    ],
  },
  {
    slug: "blurting-and-interrupting",
    title: "Blurting & interrupting",
    metaTitle: "Strategies for Blurting and Interrupting in Class",
    description:
      "The answer arrives before the hand does. Moves that keep the enthusiasm while returning the airspace.",
    emoji: "🙋",
    looksLike: [
      "Answers, comments, and asides arrive without the hand — often correct, often first.",
      "Other students' think-time gets swallowed; some have stopped trying to be first.",
      "The student frequently seems surprised to have interrupted at all.",
      "It intensifies during fast-paced, high-interest activities.",
    ],
    underneath: [
      "Is the thought genuinely hard to hold — does it feel to the student like say-it-now or lose it forever?",
      "Has blurting been paying — do called-out answers get responded to more quickly than raised hands?",
      "Does the lesson build in enough legitimate airtime for a highly verbal student?",
    ],
    tryFirst: [
      {
        title: "Answer the hands first, visibly",
        how: "Respond to raised hands with warm speed and let called-out answers wait: “I take hands first.” The airspace reorganizes around what pays.",
      },
      {
        title: "The parking-lot pad",
        how: "A sticky pad on the desk: can't hold it? Write it, save it, share it at the break in the lesson. The thought is preserved, the airtime isn't stolen.",
      },
      {
        title: "Build in think-time for everyone",
        how: "“Fifteen seconds, no hands yet.” Structured pauses protect the slower processors and give the fast one a rule to push against instead of classmates.",
      },
      {
        title: "Pre-load a turn",
        how: "Quietly assign the student question two before discussion starts: “You're my expert on this one.” A guaranteed turn lowers the grab for extras.",
      },
      {
        title: "The silent acknowledgment",
        how: "A nod or raised finger that says “I see you — hold it.” Being seen is often most of what the blurt was seeking.",
      },
    ],
    buildingHabit: [
      {
        title: "A private tally, kept together",
        how: "Agree to count holds, not blurts — moments the student caught it and waited. Review the count privately each week; watch it climb.",
      },
      {
        title: "Legitimate verbal real estate",
        how: "Discussion leader, debate roles, read-alouds, the review game host. A voice that big needs scheduled venues, or it schedules its own.",
      },
      {
        title: "Teach the self-cue",
        how: "Hand on the desk means “I'm holding a thought.” Give the impulse a physical job to do while it waits.",
      },
    ],
    loopIn:
      "Chat with the family if the pattern is strong — they usually recognize it instantly and can echo the same cues at home. Compare notes with your grade team on what settings help, and involve the counselor or support staff if the interrupting escalates sharply or the student seems unable to catch it even with warm, consistent structure.",
    templates: [
      { label: "Weekly Data Tracker", href: "/resources/templates/weekly-data-tracker" },
      { label: "Positive Note Home", href: "/resources/templates/positive-note-home" },
    ],
  },
  {
    slug: "unprepared-for-class",
    title: "Unprepared for class",
    metaTitle: "Strategies for the Student Who Comes to Class Unprepared",
    description:
      "No pencil, no book, no charged device — again. Moves that get class started without a daily interrogation.",
    emoji: "✏️",
    looksLike: [
      "Class regularly opens with the student missing something essential — pencil, notebook, book, charger.",
      "The first five minutes go to borrowing, retrieving, or negotiating instead of starting.",
      "The missing item rotates; it's rarely the same gap twice.",
      "Materials that live in the classroom get used; materials that travel don't arrive.",
    ],
    underneath: [
      "Where does preparation actually break — at home the night before, at the locker, or between classes?",
      "Does the student have a packing routine anywhere in the day, or is every arrival improvised?",
      "Is anything about home supplies worth knowing quietly — are the materials there to bring?",
    ],
    tryFirst: [
      {
        title: "The no-drama loaner bin",
        how: "Pencils and paper available by routine — take one, return it, no transaction with you required. Class starts; the lesson about preparedness happens elsewhere.",
      },
      {
        title: "Post the packing list at the door",
        how: "Today's three needed items, visible from the hallway. Students who improvise arrivals do better when the answer is posted at the threshold.",
      },
      {
        title: "Classroom copies of what can stay",
        how: "If the textbook can live in the room, let it. Every item that stops traveling stops being missing.",
      },
      {
        title: "The two-minute launch task",
        how: "Open with a starter that needs only what the loaner bin covers. The unprepared student starts anyway — and stops being the opening act.",
      },
      {
        title: "Ask the one question that locates it",
        how: "Privately: “Walk me through your morning — where does the pencil get lost?” The answer usually locates the fix in one conversation.",
      },
    ],
    buildingHabit: [
      {
        title: "One packing anchor with home",
        how: "Ask the family for a single nightly habit — bag packed and by the door. One shared routine beats a lecture series from either side.",
      },
      {
        title: "The Friday supply check",
        how: "Two whole-class minutes: everyone confirms next week's basics. Group maintenance carries the student who needs it without naming them.",
      },
      {
        title: "Track the gap type",
        how: "Two weeks of quick notes on what's missing and when. Always-after-lunch points somewhere different than always-Mondays.",
      },
    ],
    loopIn:
      "Talk with the family early and gently — sometimes the story is a lost routine, and sometimes it's that supplies are genuinely scarce, which changes your move entirely and quietly. Compare with the grade team on whether it spans classes, and bring in the counselor or support staff if unpreparedness arrives with other signs that home has gotten harder.",
    templates: [
      { label: "Parent Communication Log", href: "/resources/templates/parent-communication-log" },
      { label: "Weekly Data Tracker", href: "/resources/templates/weekly-data-tracker" },
    ],
  },
  {
    slug: "avoids-writing-tasks",
    title: "Avoids writing tasks",
    metaTitle: "Strategies for the Student Who Avoids Writing",
    description:
      "Talks a great answer, writes three words. Moves that lower the wall between what they know and what lands on paper.",
    emoji: "📝",
    looksLike: [
      "Verbal answers are rich; written versions of the same thinking are a sentence or a fragment.",
      "Writing tasks trigger the longest launch delays — sharpening, bathroom, anything.",
      "Output shrinks as the required length grows; a page feels like a cliff.",
      "Erasing and restarting eat most of the writing time.",
    ],
    underneath: [
      "Is it the physical act — does handwriting itself cost this student more than classmates?",
      "Is it the blank page — no way in, rather than nothing to say?",
      "Is perfectionism running the eraser — is nothing good enough to leave on the page?",
    ],
    tryFirst: [
      {
        title: "Talk first, write second",
        how: "Thirty seconds of telling a partner before any writing. Students write what they've already said far more easily than what they haven't thought aloud.",
      },
      {
        title: "Shrink the container",
        how: "“Three sentences” beats “a paragraph”; a box to fill beats a blank page. Small containers get filled and refilled; cliffs get avoided.",
      },
      {
        title: "Sentence starters on the desk",
        how: "Three openers taped down: “I noticed… This matters because… One example is…” A doorway into the page removes the hardest step.",
      },
      {
        title: "Ban the eraser for drafts",
        how: "Cross out and keep going — drafts are supposed to be rough. Perfectionists need explicit permission for imperfection, in writing, from you.",
      },
      {
        title: "Count ideas, not words",
        how: "Grade the draft for two ideas present, not length. Length grows on its own once the page stops being scored like a courtroom.",
      },
    ],
    buildingHabit: [
      {
        title: "Daily low-stakes lines",
        how: "Three ungraded sentences a day — a warm-up ritual, any topic. Volume without judgment is how writing stamina is actually built.",
      },
      {
        title: "Separate composing from transcribing",
        how: "Sometimes let them dictate to a partner, outline in fragments, or type. Isolating which step hurts tells you what to build next.",
      },
      {
        title: "Keep a visible wins folder",
        how: "Their three best pieces, kept and reread before new tasks. Their own past work is the most convincing evidence they can do this.",
      },
    ],
    loopIn:
      "If writing lags this far behind speaking across settings and months, share what you see with the family and your grade team — patterns like that deserve more structured support than one classroom can improvise. The school's support staff can help you all think about next steps; sudden refusals where writing used to flow are worth a counselor conversation too.",
    templates: [
      { label: "Goal Progress Snapshot", href: "/resources/templates/goal-progress-snapshot" },
      { label: "Student Check-In Form", href: "/resources/templates/student-check-in-form" },
    ],
  },
  {
    slug: "gives-up-quickly",
    title: "Gives up quickly",
    metaTitle: "Strategies for the Student Who Gives Up Quickly",
    description:
      "One hard moment and the pencil drops. Moves that build a longer fuse without lowering the bar.",
    emoji: "🏳️",
    looksLike: [
      "Work stops at the first difficulty — often seconds in, before a real attempt.",
      "“I can't do this” arrives as a conclusion, not a question.",
      "The student may crumple, restart, or abandon work that was going fine.",
      "Persistence is visibly longer in subjects or formats where the student feels safe.",
    ],
    underneath: [
      "Has difficulty come to mean “this proves I'm not smart” rather than “this is the normal feel of learning”?",
      "Does the student have any next move for hard moments, or only the exit?",
      "Are tasks arriving as all-at-once walls instead of climbable steps?",
    ],
    tryFirst: [
      {
        title: "Script the hard moment",
        how: "Teach one fixed sequence: read it again, circle what you know, try one step, then ask. The exit stops being the only door.",
      },
      {
        title: "Normalize the struggle out loud",
        how: "“This one is supposed to be hard — if it feels hard, you're doing it right.” Naming difficulty as the plan defuses it as a verdict.",
      },
      {
        title: "Stage the task visibly",
        how: "Hand out step one alone, then step two. Walls become stairs, and each landed stair argues against giving up on the next.",
      },
      {
        title: "Catch the almost",
        how: "The moment they push ten seconds past the usual quit point, name it privately: “You stayed with it — that's the skill.” The fuse lengthens where it's noticed.",
      },
      {
        title: "The strategic first problem",
        how: "Open hard tasks with one item you know this student will land. Momentum is armor for the harder items behind it.",
      },
    ],
    buildingHabit: [
      {
        title: "Keep a stuck-to-solved log",
        how: "A running list of problems that felt impossible and got solved anyway. Their own history is the best counterargument to “I can't.”",
      },
      {
        title: "Praise strategy, not smarts",
        how: "“You tried a second way” builds a student who tries second ways. “You're so smart” builds one who protects the label by quitting early.",
      },
      {
        title: "Let them see your drafts",
        how: "Show your crossed-out board work, your recalculations. Watching an adult struggle well is a lesson no poster delivers.",
      },
      {
        title: "Grow the challenge dose slowly",
        how: "One genuinely hard item a day with support nearby, then two. Comfort with difficulty grows the way stamina does — a little more each week, never all at once.",
      },
    ],
    loopIn:
      "Share the pattern with the family — you'll often hear the same story from homework — and with your grade team to see where the fuse is longer and why. If giving up comes with tears, self-critical talk that worries you, or a sharp change from earlier in the year, bring in the school counselor or support staff sooner rather than later.",
    templates: [
      { label: "Student Check-In Form", href: "/resources/templates/student-check-in-form" },
      { label: "Positive Note Home", href: "/resources/templates/positive-note-home" },
      { label: "Goal Progress Snapshot", href: "/resources/templates/goal-progress-snapshot" },
    ],
  },
  {
    slug: "chronically-late-to-class",
    title: "Chronically late to class",
    metaTitle: "Strategies for the Student Who Is Chronically Late to Class",
    description:
      "The entrance everyone notices, the start nobody gets back. Moves that fix arrivals without a doorway battle.",
    emoji: "🕰️",
    looksLike: [
      "Arrivals run minutes behind, steadily or in streaks — often from the same prior period or time of day.",
      "The entrance costs the room: the door, the walk, the catch-up whisper.",
      "First-block lateness and mid-day lateness follow different rhythms.",
      "The student may drift in casually or slip in trying to vanish — the style is information.",
    ],
    underneath: [
      "Where is the time actually going — the bus, the locker, a friend, the hallway between two far rooms?",
      "Is the student avoiding something that happens at the start of your class?",
      "For morning lateness — what does the family's morning look like, and is the student running it alone?",
    ],
    tryFirst: [
      {
        title: "Make the entrance boring",
        how: "A seat near the door and a no-comment arrival routine: slip in, sit, join. The audience-free entrance removes both the show and the shame.",
      },
      {
        title: "Start with a warm-up that forgives",
        how: "Open class with a five-minute starter that latecomers can join mid-stream, and put the day's one crucial announcement after it.",
      },
      {
        title: "Ask the route question",
        how: "Privately, with real curiosity: “Walk me through getting here from third period.” Lateness usually has a geography, and geography has fixes.",
      },
      {
        title: "The quiet timekeeper role",
        how: "Give the student a start-of-class job — board date, handout stack. A reason to be early outperforms a consequence for being late.",
      },
      {
        title: "Notice the on-time days",
        how: "“Good to see you at the bell” — quietly, and every time it's true. Arrivals respond to what gets noticed just like everything else.",
      },
    ],
    buildingHabit: [
      {
        title: "Track the pattern before acting on it",
        how: "Two weeks of arrival times against the day's schedule. Mondays-only, after-lunch-only, and always tell three different stories.",
      },
      {
        title: "One logistics fix with the family",
        how: "For morning lateness, ask what the launch looks like and pick one shared fix — an alarm, a ride change, a packed bag. Logistics beat lectures.",
      },
      {
        title: "An agreed catch-up routine",
        how: "A folder where the first-five-minutes materials always live, so being late stops compounding into being lost.",
      },
    ],
    loopIn:
      "Loop in the family early for morning patterns — you're often the first to see that a household routine has wobbled — and your grade team for mid-day patterns that might span rooms. If lateness pairs with fading engagement, missed meals, or a student who seems to be carrying adult-sized responsibilities, bring in the school counselor or support staff; that's bigger than a bell schedule.",
    templates: [
      { label: "Weekly Data Tracker", href: "/resources/templates/weekly-data-tracker" },
      { label: "Parent Communication Log", href: "/resources/templates/parent-communication-log" },
    ],
  },
];

export function getSituation(slug: string): Situation | undefined {
  return SITUATIONS.find((s) => s.slug === slug);
}
