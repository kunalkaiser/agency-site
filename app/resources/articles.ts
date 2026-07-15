export type ArticleSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  after?: string[];
};

export type Article = {
  slug: string;
  title: string;
  audience: "Parents" | "Teachers" | "Students";
  type: "Guide" | "Reference" | "Tool";
  description: string;
  intro: string;
  sections: ArticleSection[];
};

export const ARTICLES: Article[] = [
  {
    slug: "how-to-read-your-childs-iep",
    title: "How to Read Your Child's IEP",
    audience: "Parents",
    type: "Guide",
    description: "What each section of the document really tells you, and where to focus first.",
    intro:
      "An IEP is a long document, often written in a hurry and full of acronyms — and it is also the single best record of how your child's school understands your child. Here's how to read one efficiently: what each section is really telling you, where to focus your attention first, and the questions worth writing down as you go.",
    sections: [
      {
        heading: "Start with the present levels",
        paragraphs: [
          "Every IEP contains a section describing your child's current performance — often called Present Levels of Academic Achievement and Functional Performance, or PLAAFP. Read this first, even though it usually isn't first in the packet. It is the foundation of the whole document: every goal, service, and accommodation in the pages that follow should trace back to a need described here.",
          "As you read, hold one question in mind: does this sound like my child? If the strengths, needs, and classroom examples don't match the student you know at home, note the specific gaps. That comparison — the child on paper versus the child at your kitchen table — is the most useful feedback a parent can bring to the team.",
        ],
      },
      {
        heading: "Read the goals like a scientist",
        paragraphs: [
          "Annual goals describe what your child is expected to learn over the coming year. A well-written goal names the skill, the conditions, and a way to measure progress — for example, “given a fourth-grade passage, will read 110 words per minute with 95% accuracy on three consecutive weekly probes.”",
        ],
        list: [
          "Specific: could two people independently agree on whether the goal was met?",
          "Connected: does it address a need named in the present levels?",
          "Ambitious but reachable: does it move meaningfully beyond the current baseline?",
        ],
        after: [
          "If a goal reads more like a wish — “will improve reading comprehension” — it's fair to ask how the team plans to measure it. That's not a challenge; it's a question every member of the team benefits from answering.",
        ],
      },
      {
        heading: "Services: the who, where, and how often",
        paragraphs: [
          "The services page states exactly what support your child receives: the type of service, the group size, the minutes per week, and the location. Small details here matter a great deal — thirty minutes daily in a small group is a very different experience from thirty minutes weekly inside the general education classroom.",
          "If a support was discussed at the meeting, confirm it appears on this page with a frequency and duration attached. In an IEP, help that isn't written down with numbers next to it is hard for anyone — including a well-intentioned school — to deliver consistently.",
        ],
      },
      {
        heading: "Accommodations vs. modifications",
        paragraphs: [
          "These two words look interchangeable and are not. Accommodations change how your child learns or shows what they know — extended time, audiobooks, a quiet testing space — without changing the content itself. Modifications change what is taught or expected, such as shortened assignments or alternate grading.",
          "Either can be exactly right for a given child. But because modifications can affect course credit, diploma pathways, and college admissions testing down the road, it's worth asking the team to walk you through the reasoning any time you see one listed.",
        ],
      },
      {
        heading: "Dates worth circling",
        paragraphs: [
          "Two dates govern the document: the annual review, when the team meets to update the IEP, and the reevaluation, at least every three years, when your child's eligibility and needs are formally reassessed. Put both in your calendar now. Knowing when they fall lets you prepare — collecting work samples, jotting observations — instead of walking in cold.",
        ],
      },
      {
        heading: "Progress reporting",
        paragraphs: [
          "The IEP states how and when you'll hear about progress on goals — typically on the same schedule as report cards. Progress reports should give you data, not just the word “progressing.” If a report doesn't tell you where your child stands relative to the goal's own numbers, it is entirely reasonable to ask to see the underlying data.",
        ],
      },
      {
        heading: "Bring questions, not a verdict",
        paragraphs: [
          "You don't need to master special education law to be an effective member of your child's team — you need to know your child and ask clear questions. A short written list — “Can you show me the baseline for this goal? How will we know by January whether it's working?” — keeps the meeting collaborative and focused on the student, which is where everyone at the table wants it to be.",
        ],
      },
    ],
  },
  {
    slug: "tutoring-vs-school-services",
    title: "Tutoring vs. School Services: How to Decide",
    audience: "Parents",
    type: "Guide",
    description:
      "What each path delivers, when each is the right tool, and how they work together.",
    intro:
      "When a child struggles in school, families usually face two paths: hire private support, or ask the school for help. Neither is automatically better — they are different tools for different jobs. The right choice depends on what the struggle actually is, how urgent it is, and what each path can realistically deliver. This guide lays out the differences plainly.",
    sections: [
      {
        heading: "Two tools, two jobs",
        paragraphs: [
          "Private tutoring is fast, flexible, and entirely under your control: you choose the provider, the focus, and the schedule, and it can begin next week. School-based supports — intervention programs, 504 accommodations, special education services — take longer to arrange but carry weight tutoring can't: they follow your child through the entire school day, involve the classroom teacher directly, and are documented, reviewed, and adjusted over time.",
          "Most districts also run a middle layer families don't always hear about: tiered intervention programs, often called MTSS or RTI, that provide extra help without any formal classification. Asking the teacher “what interventions are available, and is my child receiving one?” is often the fastest way to learn what the school can already offer.",
        ],
      },
      {
        heading: "When tutoring is the right tool",
        list: [
          "The gap is specific and recent — one subject, one skill, one hard semester.",
          "Your child mostly needs review, practice, and repetition rather than a fundamentally different kind of teaching.",
          "A deadline is close: finals, a placement exam, an entrance test.",
          "School supports are already in place, but your child needs more practice than the school day can hold.",
        ],
      },
      {
        heading: "When to look to the school",
        list: [
          "Struggles that persist across years, subjects, or teachers despite solid instruction.",
          "Skills sitting far below grade level, or difficulty that colors the whole school day.",
          "You suspect a learning disability, an attention difficulty, or a language need that has never been formally evaluated.",
          "Your child already has an IEP or 504 plan that may need adjusting rather than supplementing.",
        ],
        after: [
          "A school evaluation costs a family nothing and produces information that improves every path afterward — including making any private tutoring dramatically more targeted. If the difficulty is broad or unexplained, the evaluation question comes first.",
        ],
      },
      {
        heading: "It's rarely either/or",
        paragraphs: [
          "In practice, the two paths work best together. An evaluation clarifies exactly what tutoring should target. Tutoring supplies practice that a weekly service schedule can't. And a tutor's notes on what does and doesn't help are genuinely useful information for the school team at the next review.",
          "What matters is that the adults communicate. With your permission, a five-minute exchange between tutor and classroom teacher is often worth more than either of them working alone for a month.",
        ],
      },
      {
        heading: "Questions that make the decision easier",
        list: [
          "Is this problem new, or has it quietly followed my child across grades?",
          "Is it one subject, or most of the day?",
          "Has my child ever been formally evaluated?",
          "What has the classroom teacher already tried, and what happened?",
          "What can our family sustain — in time and budget — for a full school year, not just a motivated month?",
        ],
      },
      {
        heading: "A simple starting point",
        paragraphs: [
          "If the difficulty is new, narrow, and urgent, start with tutoring and watch closely. If it's persistent, broad, or unexplained, start with a conversation at school — and consider putting a request for evaluation in writing, which starts a formal clock in most districts.",
          "And when in doubt, do the free step first: talk to the teacher, ask what they see from their side of the desk, and make the decision with more information than you had yesterday.",
        ],
      },
    ],
  },
  {
    slug: "college-planning-timeline-ieps",
    title: "College Planning Timeline for Students with IEPs",
    audience: "Parents",
    type: "Guide",
    description:
      "A grade-by-grade map for building skills and paperwork that travel to campus.",
    intro:
      "College planning looks a little different — and starts a little earlier — when a student has an IEP. The supports that follow a student automatically through high school do not follow them to campus; in college, the student requests support, documents the need, and manages the plan themselves. So part of the work of high school is building the skills and the paperwork that will travel. Here is a grade-by-grade map.",
    sections: [
      {
        heading: "Ninth grade: build the base",
        paragraphs: [
          "Encourage your student to attend their own IEP meetings and, over time, to be able to name their disability, their accommodations, and why each one helps. Self-knowledge is the single most portable college skill — more portable than any document.",
          "Keep course selection aligned with a four-year plan. Colleges read transcripts starting in ninth grade, and staying on a standard diploma pathway keeps the widest range of options open.",
        ],
      },
      {
        heading: "Tenth grade: test the supports under real conditions",
        paragraphs: [
          "Use the PSAT 10 or full-length practice tests to see whether the current accommodations actually work under testing conditions. If your student will need accommodations on the SAT or ACT, those applications ask for a documented history of consistent use in school — using accommodations regularly now is precisely what builds that history.",
          "Start the college conversation gently: big or small, near or far, city or campus town. Nothing binding — you're just building vocabulary for later decisions.",
        ],
      },
      {
        heading: "Eleventh grade: the heavy lifting",
        list: [
          "Apply for College Board or ACT accommodations early in the fall — approvals take weeks and require documentation, and you want them settled before the first real test date.",
          "At the annual review, ask how the IEP's transition plan supports the college goal specifically.",
          "Visit campuses, and on every visit stop by the disability services office. The quality and culture of that office varies far more between colleges than the brochures do.",
          "Draft a college list that weighs support systems as heavily as selectivity.",
        ],
      },
      {
        heading: "Twelfth grade: applications and the handoff",
        paragraphs: [
          "Applications proceed like any student's. Disclosing a disability is entirely optional and never required; some students choose to write about it because it's central to their story, and many don't. Either choice is legitimate — what matters is that it is genuinely the student's choice.",
          "Before graduation, request copies of the most recent evaluation and the final IEP. Colleges set their own documentation requirements for accommodations, and current records are far easier to obtain now than after the file is archived.",
        ],
      },
      {
        heading: "The summer before: register, don't wait",
        paragraphs: [
          "College accommodations are not automatic. The student registers with the disability services office, provides documentation, and requests accommodations — often term by term. Do this before classes begin, not after the first hard week: the office can only help from the date a student registers, and the first month of college is the worst possible time to be waiting on paperwork.",
          "If the college offers an early orientation for students registered with disability services, take it. Walking into the first week already knowing the office, the process, and one staff member's name dramatically lowers the cost of asking for help when it matters.",
        ],
      },
      {
        heading: "The skill underneath the timeline",
        paragraphs: [
          "Every item above gets easier if the student can explain, in their own words, how they learn. Practice it at every IEP meeting from ninth grade on: “I have a language-based learning disability; extended time and audiobooks are what make the difference for me.” A student who can say that sentence calmly to an adult they've just met is ready for college in the way that matters most.",
        ],
      },
    ],
  },
  {
    slug: "student-data-collection-sheet-guide",
    title: "Student Data Collection Sheet Guide",
    audience: "Teachers",
    type: "Reference",
    description:
      "How to build a collection sheet that survives a real classroom and produces numbers you can stand behind.",
    intro:
      "Good service decisions run on data, but data collection fails when it's designed for an ideal classroom instead of a real one. This guide covers how to build a collection sheet you will actually use — one that takes seconds to mark, survives a chaotic Tuesday, and produces numbers you can stand behind at a meeting.",
    sections: [
      {
        heading: "Design for ten seconds, not ten minutes",
        paragraphs: [
          "The best data sheet is the one that gets filled in. Every field should be markable with a tally, a circled option, or a single digit while you are mid-lesson, without breaking stride. If a sheet asks for sentences, it will be completed from memory at four in the afternoon — and memory is not data.",
          "One page per student per week is a good default. A sheet that spans a month hides trends behind old marks; a sheet per class period multiplies paper until it collapses. A week is short enough to review at a glance and long enough to show a pattern.",
        ],
      },
      {
        heading: "What goes on the sheet",
        list: [
          "Student initials, date, and the activity or setting.",
          "The specific skill or behavior, phrased exactly as the goal phrases it.",
          "The measurement itself: a tally space, a count, a level, or a time.",
          "Prompt level, if prompting is part of the goal — pre-list the levels so they can be circled.",
          "A one-word context field for anomalies: sub, assembly, fire drill.",
        ],
        after: [
          "Write the goal's criterion at the top of the sheet. Keeping the target visible turns every data point into a small, immediate comparison rather than a number to interpret later.",
        ],
      },
      {
        heading: "Match the measure to the goal",
        paragraphs: [
          "Frequency counts suit discrete, countable behaviors — a raised hand, a completed problem. Duration and latency suit behaviors that stretch in time — minutes on task, time elapsed before starting work. Accuracy percentages suit permanent products like worksheets and writing samples. Prompting-level scales suit skills the student currently performs with help.",
          "The wrong measure creates work without information: timing something you should be counting produces numbers nobody can interpret, no matter how faithfully they were collected.",
        ],
      },
      {
        heading: "Choose a sampling schedule you can keep",
        paragraphs: [
          "Continuous recording is rarely realistic, and pretending otherwise is how data collection dies. Choose a sample you can sustain: the first ten minutes of independent work daily, or every Tuesday and Thursday across two settings. A modest schedule kept faithfully for six weeks beats a perfect schedule abandoned in two — and consistent sampling windows are what make week-to-week comparisons legitimate.",
          "If you inherit a goal whose measurement schedule truly can't be kept in your setting, raise it at the next team meeting rather than quietly improvising. An honest schedule in the plan beats a heroic one on paper.",
        ],
      },
      {
        heading: "From marks to decisions",
        paragraphs: [
          "Set a review rhythm — every two weeks is common — and graph the points, even by hand on the back of the sheet. Look for the trend, not the day: a few points below the aim line are a signal to change something about the instruction — materials, prompting, group size — not a verdict on the student.",
          "Bring the graph to meetings. A picture of six weeks settles questions that adjectives never will, and it shifts the conversation from impressions to decisions.",
        ],
      },
      {
        heading: "Small habits that protect the data",
        list: [
          "Keep the sheet where the behavior happens, not in a binder across the room.",
          "Mark at the moment, or within the minute — never at the end of the day.",
          "Record absences and unusual days rather than leaving blanks; a blank is ambiguous forever.",
          "When multiple adults collect, spend ten minutes comparing marks on the same observation so everyone is counting the same thing.",
        ],
      },
    ],
  },
  {
    slug: "writing-measurable-iep-goals",
    title: "Writing Measurable IEP Goals: Quick Reference",
    audience: "Teachers",
    type: "Reference",
    description:
      "The anatomy of a measurable goal, the common failure points, and a 30-second checklist.",
    intro:
      "A measurable goal is one that two people could evaluate independently and reach the same verdict. Most goals fail measurability not from carelessness but from missing pieces — a criterion with no baseline, a verb no one can observe, a skill no one specified how to check. This reference covers the anatomy, the common failure points, and a checklist to run before anything is finalized.",
    sections: [
      {
        heading: "The five parts of a measurable goal",
        list: [
          "Timeframe: by when — usually the next annual review date.",
          "Condition: given what — materials, setting, level of support.",
          "Learner and behavior: who will do what, phrased as an observable action.",
          "Criterion: how well — accuracy, rate, duration, or independence level.",
          "Measurement: how and how often it will be checked — probes, work samples, structured observation.",
        ],
        after: [
          "Assembled: “By March 2027, given a fifth-grade passage and a graphic organizer, the student will write a paragraph containing a topic sentence and three supporting details in four of five work samples, measured biweekly.” Every part is present, so any team member could score it.",
        ],
      },
      {
        heading: "Use verbs a stranger could observe",
        paragraphs: [
          "“Understand,” “appreciate,” “improve,” and “demonstrate knowledge of” cannot be seen or counted. “Read aloud,” “solve,” “write,” “point to,” “initiate,” and “remain seated” can. The test: could a substitute who has never met the student collect data on this goal tomorrow morning? If not, the verb is hiding the actual skill.",
          "When a fuzzy construct feels unavoidable — comprehension is real, after all — name the observable evidence instead: answers inferential questions, retells with key details, summarizes a passage in three sentences. The understanding is invisible; the evidence of it isn't.",
        ],
      },
      {
        heading: "Anchor the criterion to a baseline",
        paragraphs: [
          "“80% accuracy” means nothing without knowing where the student starts. A goal that moves a student from 20% to 80% in one year may be unrealistic; one that moves from 75% to 80% is trivial. Write the baseline into the present levels in the same units as the criterion, so a year's growth is a visible distance between two numbers rather than a feeling.",
          "Baselines also protect students from goal recycling. When this year's goal carries last year's wording with no numbers attached, nobody can say whether the year moved the student at all — and the same goal quietly returns a third time.",
        ],
      },
      {
        heading: "Common pitfalls",
        list: [
          "Curriculum goals (“will complete Unit 5”) instead of skill goals that outlast the unit.",
          "Stacked skills in one goal — decoding, comprehension, and stamina together — that can't be scored as one thing.",
          "Criteria without context: 90% of what, measured how, across how many trials?",
          "Adult behavior written into the goal (“will be provided with…”) — supports belong in the services and accommodations sections.",
          "Percentages applied to behaviors that need rates or durations; “on task 80% of the time” requires knowing 80% of which observed interval.",
        ],
      },
      {
        heading: "A 30-second checklist",
        list: [
          "Could two adults score this goal independently and agree?",
          "Are condition, behavior, criterion, and timeframe all present?",
          "Is there a baseline in the same units as the criterion?",
          "Is the skill meaningful across settings, not just in one worksheet format?",
          "Does the data plan exist — who collects, how often, with what tool?",
        ],
        after: [
          "If a goal fails a check, fix it in the meeting rather than after. The ten minutes it takes to add a baseline or split a stacked goal saves a full year of ambiguous progress reports.",
        ],
      },
      {
        heading: "Measurable is kind",
        paragraphs: [
          "Precision in goal-writing isn't bureaucracy; it is what lets everyone — teacher, family, and student — know honestly whether a year of work worked. Vague goals postpone that question indefinitely. Measurable ones answer it, and the answer is what the next good decision is built on.",
        ],
      },
    ],
  },
  {
    slug: "weekly-executive-function-planner",
    title: "Weekly Executive Function Planner",
    audience: "Students",
    type: "Tool",
    description:
      "A fifteen-minute weekly system for getting deadlines out of your head and onto paper.",
    intro:
      "If you regularly discover assignments the night before they're due, the problem usually isn't laziness — it's that nobody can hold an entire week in their head. A weekly planner is an external hard drive for your brain. Here's a version you can run in about fifteen minutes a week, and how to keep it alive past next Tuesday.",
    sections: [
      {
        heading: "The Sunday setup (ten minutes)",
        list: [
          "Collect every source of obligations in one sweep: the school portal, syllabi, group chats, and your own memory.",
          "Write each deadline on the week's grid — tests, due dates, practices, shifts, appointments.",
          "For anything big, write the first step, not the project's name.",
          "Find your two or three heaviest days and lighten them on purpose, moving what can move.",
        ],
        after: [
          "Ten minutes is the honest budget. If setup regularly takes longer, you're planning too finely — the planner's job is to catch everything, not to schedule every quarter hour of your life.",
        ],
      },
      {
        heading: "Write starts, not tasks",
        paragraphs: [
          "“Work on history paper” is not something a tired brain can begin. “Open the doc and write five sentences about the second source” is. Every entry in your planner should pass the start test: could you begin it within thirty seconds of reading it, without any further deciding?",
          "Vague entries get postponed; specific ones get done. Most of what looks like procrastination is really just an entry that was never turned into a start.",
        ],
      },
      {
        heading: "The daily check-in (three minutes)",
        paragraphs: [
          "Once a day — the same time every day, attached to something you already do, like sitting down after dinner — open the planner. Cross off what happened. Move what didn't to a specific new day, never to a vague “later.” Glance at tomorrow so it can't ambush you.",
          "That's the entire ritual. Its power is not in any single check-in; it's in the repetition. A planner you look at daily is a system; one you look at weekly is a diary of good intentions.",
          "If you miss a day, don't reconstruct it — just do today's check-in. Streaks are motivating right up until they break; the skill you're actually building is returning, not never missing.",
        ],
      },
      {
        heading: "When the plan breaks",
        paragraphs: [
          "It will break, and that isn't failure — it's information. A plan that breaks the same way twice is telling you something true: homework can't happen right after practice, mornings are stronger than late nights, Wednesday is always fuller than it looks on Sunday.",
          "Adjust the template, not your opinion of yourself. Planners are drafts, and the third draft usually fits your actual life.",
        ],
      },
      {
        heading: "Make it yours",
        paragraphs: [
          "Paper or app doesn't matter; friction does. Choose whatever you will genuinely open — a notebook that lives in your backpack, the notes app already on your phone, a whiteboard by your desk. If a system requires checking more than one place, it will quietly die. One page, one week, everything on it.",
          "One quiet bonus: if you ever need to show a teacher, counselor, or family member where your week actually jams, two weeks of planner pages make the case better than any explanation could.",
        ],
      },
      {
        heading: "Why this works",
        paragraphs: [
          "Planning, starting, and tracking are skills, not traits — executive function grows with rehearsal like anything else. Every week you run this loop, you're practicing the exact system that runs adult life: capture everything, break it small, review it daily, forgive the misses, adjust the plan. People who seem effortlessly organized are mostly just people with a loop.",
          "And if a week ever looks unmanageable no matter how you arrange it, that's worth saying out loud to someone. A planner shows you the problem clearly; it doesn't have to solve it alone.",
        ],
      },
    ],
  },
  {
    slug: "self-advocacy-scripts-iep-meeting",
    title: "Self-Advocacy Scripts for Your Own IEP Meeting",
    audience: "Students",
    type: "Tool",
    description: "Lines you can borrow word-for-word to take part in your own meeting.",
    intro:
      "Your IEP meeting is a meeting about you — and you're allowed to be more than its subject. Speaking up in a room full of adults is genuinely hard, so don't improvise: script it. Below are lines you can borrow word-for-word, plus how to prepare so the meeting feels less like a review that happens to you and more like a conversation you're part of.",
    sections: [
      {
        heading: "Why your voice matters",
        paragraphs: [
          "The adults in the room read reports and see single class periods; you are the only person who attends your entire education. Details that feel obvious to you — which accommodations you actually use, which class the strategy falls apart in — often genuinely are not in the paperwork. When you speak, the plan gets written about the real you, and the teachers who heard you say it are far more likely to remember it in class on Monday.",
          "There's a practical bonus, too: every college, workplace, and adult support system will eventually expect you to describe your own needs. The IEP meeting is a rehearsal room where everyone is on your side.",
        ],
      },
      {
        heading: "Before the meeting (fifteen minutes of prep)",
        list: [
          "Read your current IEP, or ask your case manager to walk you through the highlights.",
          "Write down two things going well, two things that are hard, and one thing you'd like changed or tried.",
          "Decide how you'll participate: the whole meeting, just the first ten minutes, or a written statement someone reads for you. All of these count as showing up.",
        ],
      },
      {
        heading: "Introducing yourself",
        list: [
          "“Thanks for meeting about me. Before you go through the paperwork, I'd like to share how this year is actually going.”",
          "“Something that's working well for me this year is ___, and I'd like to keep it.”",
        ],
        after: [
          "Starting with a strength isn't fluff. It establishes you as someone who knows yourself — which makes everything you say afterward carry more weight with everyone at the table.",
        ],
      },
      {
        heading: "Describing what helps",
        list: [
          "“Extended time helps me most on ___, because I need the first ten minutes just to get settled.”",
          "“When directions are written down as well as said out loud, I don't have to ask twice.”",
          "“Honestly, I don't really use ___ anymore. Could we talk about whether I still need it?”",
        ],
        after: [
          "That last one matters: saying an accommodation isn't useful is real self-advocacy too. It shows the plan reflects you, not a template — and it makes the accommodations you do ask for more credible.",
        ],
      },
      {
        heading: "Asking and disagreeing, respectfully",
        list: [
          "“Could you explain what that goal means in regular words?”",
          "“I see it a little differently. From my side, what happens in class is ___. Can we talk about that?”",
          "“Could we try it for one marking period and check back?”",
        ],
        after: [
          "Notice that none of these are apologies, and none are attacks. You are a member of this team; asking questions and disagreeing respectfully are exactly what members do.",
        ],
      },
      {
        heading: "If you freeze",
        paragraphs: [
          "Freezing in the moment is normal, so build a backup before you need it: a note you hand to a trusted teacher beforehand — “please make sure we talk about ___” — or one sentence practiced until it's automatic.",
          "One sentence said out loud in your own meeting is a real victory. Next year, make it two.",
        ],
      },
      {
        heading: "After the meeting",
        paragraphs: [
          "Ask for a copy of anything that changed. Then check in with yourself after two weeks: is the change actually happening in your classes? If not, you don't need another meeting — a short email or a quick word with your case manager is exactly how adults handle it. You're allowed to handle it like an adult.",
        ],
      },
    ],
  },
];

export function getArticlesFor(audience: Article["audience"]): Article[] {
  return ARTICLES.filter((a) => a.audience === audience);
}
