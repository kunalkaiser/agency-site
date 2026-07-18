// Guided Toolkit content. Each toolkit is a small decision tree: steps ask a
// question with 2–4 tappable options; options point at another step or an
// outcome. Content rules (see CLAUDE.md): educational parenting strategies in
// plain language only — no clinical or diagnostic terms, no "ABA"/"behavior
// analysis"/"therapy"/"treatment"/"intervention" framing.

export type ToolkitOption = {
  label: string;
  /** id of the next step, or of an outcome (checked in outcomes first). */
  next: string;
};

export type ToolkitStep = {
  id: string;
  question: string;
  hint?: string;
  options: ToolkitOption[];
};

export type ToolkitOutcome = {
  id: string;
  title: string;
  intro: string;
  /** 3–5 concrete strategy steps. */
  steps: string[];
  related?: { slug: string; title: string };
};

export type Toolkit = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  firstStep: string;
  steps: ToolkitStep[];
  outcomes: ToolkitOutcome[];
};

export const TOOLKITS: Toolkit[] = [
  {
    slug: "ending-screen-time",
    title: "Ending Screen Time Without a Standoff",
    description:
      "A guided walk through smoother screen-time endings, matched to what actually happens at your house.",
    intro:
      "Screens are genuinely hard to walk away from — for adults too. Answer two quick questions and get a short set of strategies matched to how endings usually go at your house.",
    firstStep: "start",
    steps: [
      {
        id: "start",
        question: "What usually happens when screen time ends at your house?",
        options: [
          { label: "Big reactions — tears, yelling, slammed doors", next: "big-reactions" },
          { label: "Endless negotiation — “five more minutes!”", next: "negotiation" },
          { label: "I get ignored completely", next: "ignoring" },
        ],
      },
      {
        id: "big-reactions",
        question: "When does the storm usually hit?",
        options: [
          { label: "The moment I give the warning", next: "reaction-at-warning" },
          { label: "When the screen actually goes off", next: "reaction-at-off" },
        ],
      },
      {
        id: "negotiation",
        question: "How do the negotiations usually end?",
        options: [
          { label: "I give in more often than I'd like", next: "negotiation-give-in" },
          { label: "I hold the line, but it's exhausting", next: "negotiation-hold" },
        ],
      },
      {
        id: "ignoring",
        question: "What are they usually in the middle of?",
        options: [
          { label: "A game or episode that's mid-stream", next: "ignoring-midstream" },
          { label: "Anything — even after several reminders", next: "ignoring-habit" },
        ],
      },
    ],
    outcomes: [
      {
        id: "reaction-at-warning",
        title: "Make the warning a routine, not a surprise",
        intro:
          "If the warning itself sets things off, it's landing as bad news each time. The goal is to make endings so predictable that the warning stops carrying the bad news.",
        steps: [
          "Set the ending before the screen goes on: “Two episodes, then we're done” agreed up front beats any warning given mid-show.",
          "Use a visual timer or the device's own countdown so time does the telling — a clock winding down is easier to accept than a parent announcing it.",
          "Keep the warning short and warm, then step away: “Ten more minutes, then it's snack time.” Hovering invites a debate.",
          "Have a “bridge” ready — the next thing to move toward, not just away from: a snack, a job they like, ten minutes of your attention.",
          "Keep the routine identical for a couple of weeks. Predictability, not persuasion, is what lowers the temperature.",
        ],
      },
      {
        id: "reaction-at-off",
        title: "Soften the landing, not the limit",
        intro:
          "The limit is fine — it's the cliff-edge stop that hurts. These strategies keep the ending firm while making the moment of switch-off gentler.",
        steps: [
          "End at a natural stopping point: “when this episode ends” or “after this level,” not an arbitrary minute in the middle.",
          "Let them do the switching off. Handing over that small piece of control changes the moment from something done to them into something they did.",
          "Move toward a bridge activity you've named in advance — a snack on the table or a quick game with you gives the feelings somewhere to go.",
          "Stay calm and brief if there are tears; the message is “this is sad and it's still over,” delivered kindly. Long explanations reopen the case.",
          "Praise the endings that go well, specifically: “You turned it off at the timer — that was smooth.” What gets noticed gets repeated.",
        ],
      },
      {
        id: "negotiation-give-in",
        title: "Close the loopholes kindly",
        intro:
          "Every “okay, five more minutes” teaches that the posted ending is an opening offer. The fix isn't getting tougher — it's removing the negotiation slot entirely.",
        steps: [
          "Decide the limit when everyone is calm, write it where all can see it, and let the note be the authority: “The rule says 6:00 — I don't control it either.”",
          "Build the five minutes in: if you're comfortable with 35, say 35 up front. Then the answer to “five more?” is honestly “that was included.”",
          "Replace “okay, fine” with one consistent phrase: “I know — and screen time's done.” Say it once, warmly, and don't add new material.",
          "If asking continues, keep the ending but move it earlier next time by exactly the minutes spent arguing. Explain that calmly beforehand, then follow through once.",
        ],
      },
      {
        id: "negotiation-hold",
        title: "Let the routine do the arguing",
        intro:
          "You're doing the right thing — it's just costing too much. These strategies shift the enforcement from your energy onto the routine itself.",
        steps: [
          "Put the schedule in writing where everyone can see it, and refer to it instead of restating it: pointing at a chart is cheaper than a speech.",
          "Use a timer they can see the whole time, so the ending approaches visibly instead of arriving suddenly from you.",
          "Pre-empt the lobbying with one choice inside the limit: “6:00 or after dinner — you pick.” People argue less with schedules they helped set.",
          "Thank them plainly on the days it goes smoothly. The exhausting stretch usually shortens once smooth endings get more attention than contested ones.",
        ],
      },
      {
        id: "ignoring-midstream",
        title: "Work with the stream, not against it",
        intro:
          "Mid-game and mid-episode endings genuinely feel like being yanked out of a story. Timing the ending to the content makes your words much easier to hear.",
        steps: [
          "Set endings at content boundaries — “after this episode,” “when this round ends” — and ask them to tell you what a good stopping point would be.",
          "Give the warning within their world: pause the show or stand in their line of sight; a call from another room doesn't compete with a screen.",
          "Ask for a response: “What did I just say?” gently confirms the message arrived without starting a fight.",
          "Agree in advance what happens if the stopping point passes: the device goes on the shelf until tomorrow. Then let the agreement, not your volume, carry it out.",
        ],
      },
      {
        id: "ignoring-habit",
        title: "Reset what a reminder means",
        intro:
          "If several reminders is the norm, the first reminder has quietly stopped meaning anything. The goal is to make one calm reminder count again.",
        steps: [
          "Reset expectations at a calm moment, not during screen time: “From now on I'll say it once, then the screen goes off.”",
          "Deliver the one reminder up close, in their line of sight, with a light touch on the shoulder — then follow through as stated, calmly.",
          "Keep the follow-through boring and consistent: no lecture, no anger, just the agreed result. The consistency is the message.",
          "Notice out loud when one reminder works: “First ask — nice.” It sounds small; over two weeks it does the heavy lifting.",
        ],
      },
    ],
  },
  {
    slug: "homework-without-battles",
    title: "Homework Without the Battles",
    description:
      "A guided walk through calmer homework, matched to where it actually goes sideways: starting, focusing, or frustration.",
    intro:
      "Most homework battles happen at one of three points: getting started, staying with it, or hitting frustration. Answer two quick questions to get strategies aimed at yours.",
    firstStep: "start",
    steps: [
      {
        id: "start",
        question: "Where does homework usually go sideways?",
        options: [
          { label: "Getting started at all", next: "starting" },
          { label: "Staying focused once started", next: "focus" },
          { label: "Frustration and giving up", next: "frustration" },
        ],
      },
      {
        id: "starting",
        question: "What does the stall look like?",
        options: [
          { label: "Delay — snacks, bathroom, anything but starting", next: "start-delay" },
          { label: "“I don't know what I'm supposed to do”", next: "start-unclear" },
        ],
      },
      {
        id: "focus",
        question: "What pulls them off track?",
        options: [
          { label: "Distractions — phone, siblings, noise", next: "focus-distractions" },
          { label: "They drift off even in a quiet room", next: "focus-drift" },
        ],
      },
      {
        id: "frustration",
        question: "When does frustration usually spike?",
        options: [
          { label: "The moment something looks hard", next: "frustration-hard" },
          { label: "Partway through, when it takes longer than expected", next: "frustration-long" },
        ],
      },
    ],
    outcomes: [
      {
        id: "start-delay",
        title: "Shrink the start",
        intro:
          "Delay is usually about the size of the mountain, not laziness. Make starting so small it's hard to refuse, and let momentum do the rest.",
        steps: [
          "Anchor homework to the same time and place every day — after snack, at the kitchen table. Starting stops being a daily decision.",
          "Use a five-minute launch: “Just do the first five minutes, then check in with me.” Almost everyone keeps going once started.",
          "Have them lay out exactly what's due before starting — books open, list written. A visible, finite list is far less scary than a vague pile.",
          "Put the good stuff after, not before: screens and friends wait until the list is done. The order matters more than the rule.",
        ],
        related: { slug: "weekly-executive-function-planner", title: "Weekly Executive Function Planner" },
      },
      {
        id: "start-unclear",
        title: "Make the assignment visible",
        intro:
          "“I don't know what to do” is sometimes avoidance, but surprisingly often it's true. Building a reliable record of what's due removes the fog — and the excuse.",
        steps: [
          "Set up one place assignments live — a planner, a photo of the board, the class website — and make checking it the official first step of homework.",
          "Start each session by having them tell you the assignment in their own words. If they can't, that's the real task: message a classmate or reread the instructions together.",
          "Do the first problem or first sentence together, then hand it off. One worked example unsticks most “I don't get it”s.",
          "If instructions are genuinely unclear more weeks than not, have your student ask the teacher — a short, polite question after class fixes this at the source.",
        ],
        related: { slug: "weekly-executive-function-planner", title: "Weekly Executive Function Planner" },
      },
      {
        id: "focus-distractions",
        title: "Fix the room, not the kid",
        intro:
          "Willpower loses to a buzzing phone almost every time — for adults too. Change the environment once instead of fighting the same fight nightly.",
        steps: [
          "Phones live in another room during homework — not face down, not in a pocket. Out of sight is the whole strategy.",
          "Pick the least-trafficked workspot available and make it the homework spot every day, so the place itself says “work.”",
          "Use headphones or quiet background noise if the household is loud; siblings get a parallel quiet activity during the same window.",
          "Keep the desk boringly empty: the assignment, the tools it needs, nothing else. Clearing it is the 60-second setup step.",
        ],
      },
      {
        id: "focus-drift",
        title: "Work in short, visible sprints",
        intro:
          "Drifting in a quiet room usually means the work session is longer than the attention it's asking for. Shorter, timed stretches with real breaks keep the engine running.",
        steps: [
          "Break the session into 10–20 minute sprints with a visible timer, matched to what your student can genuinely do — then a real 5-minute break, up and away from the chair.",
          "Give each sprint one concrete finish line: “these five problems,” “this paragraph.” Vague sessions invite vague attention.",
          "Add movement between sprints — snack, stretch, quick walk. Bodies that move focus better when they sit back down.",
          "Have them cross items off a written list as they go. Visible progress is quietly motivating, and the list shows the end approaching.",
        ],
        related: { slug: "weekly-executive-function-planner", title: "Weekly Executive Function Planner" },
      },
      {
        id: "frustration-hard",
        title: "Make “hard” a starting signal",
        intro:
          "Some students read difficulty as a verdict — “I can't do this” — rather than a normal part of the work. These strategies build a routine for the hard moment itself.",
        steps: [
          "Agree on a first-move ritual for hard problems: read it twice, circle what's known, try one small step. A ritual gives the frustrated moment a script.",
          "Praise the attempt specifically, not the talent: “You tried a second way — that's exactly what strong students do.”",
          "Teach the skip rule: mark it, move on, come back at the end. One hard problem shouldn't take the whole session hostage.",
          "Keep a “stuck note” habit: if it's still stuck after a real try, write the teacher one sentence about where it broke down. That's not giving up — that's how learning is supposed to work.",
        ],
        related: { slug: "tutoring-vs-school-services", title: "Tutoring vs. School Services: How to Decide" },
      },
      {
        id: "frustration-long",
        title: "Right-size the sessions",
        intro:
          "Frustration that builds partway through is usually a fuel problem: the session outlasted the tank. Plan for it instead of pushing through it.",
        steps: [
          "Schedule a short break before the usual breaking point, not after — if things fall apart at 30 minutes, break at 20, every time.",
          "Split big assignments across days when possible: two calm 25-minute sessions beat one stormy hour.",
          "Start with a medium-difficulty task, not the hardest thing — early wins buy patience for what's harder later.",
          "Watch the basics on tough weeks: late nights and skipped snacks show up at the homework table first.",
          "If most nights end in tears no matter the setup, that's information, not failure — a short note to the teacher about how long assignments actually take is worth more than another hard night.",
        ],
        related: { slug: "tutoring-vs-school-services", title: "Tutoring vs. School Services: How to Decide" },
      },
    ],
  },
  {
    slug: "calmer-mornings",
    title: "Calmer School Mornings",
    description:
      "A guided walk through smoother mornings, matched to your bottleneck: waking up, getting ready, or getting out the door.",
    intro:
      "Every rushed morning has one true bottleneck — the stage where the wheels actually come off. Answer two quick questions and get strategies aimed at yours.",
    firstStep: "start",
    steps: [
      {
        id: "start",
        question: "Where does your morning actually bottleneck?",
        options: [
          { label: "Waking up — getting out of bed is the battle", next: "waking" },
          { label: "Getting dressed and ready drags on forever", next: "ready" },
          { label: "The final push out the door", next: "door" },
        ],
      },
      {
        id: "waking",
        question: "Which sounds more like your child?",
        options: [
          { label: "Goes to bed too late to wake up well", next: "waking-late-night" },
          { label: "Sleeps enough, but surfaces very slowly", next: "waking-slow-riser" },
        ],
      },
      {
        id: "ready",
        question: "What's the slow part?",
        options: [
          { label: "Choosing, changing, and fussing over clothes", next: "ready-clothes" },
          { label: "Every single step needs a reminder", next: "ready-reminders" },
        ],
      },
      {
        id: "door",
        question: "What goes missing at the last minute?",
        options: [
          { label: "Stuff — shoes, bag, homework, water bottle", next: "door-stuff" },
          { label: "Time — we're fine until we're suddenly late", next: "door-time" },
        ],
      },
    ],
    outcomes: [
      {
        id: "waking-late-night",
        title: "Win the morning the night before",
        intro:
          "A hard wake-up that starts with a late bedtime is a bedtime project, not a morning one. Move the evening and the morning follows.",
        steps: [
          "Pick a realistic lights-out time and walk it earlier in 15-minute steps each week — small moves stick where big ones bounce back.",
          "Set a screens-off point 30–60 minutes before bed, for the whole household if you can. What happens at 9 p.m. decides what 7 a.m. feels like.",
          "Build a short, repeatable wind-down — shower, pajamas, ten minutes of reading. Bodies learn the off-ramp with repetition.",
          "Keep wake-up time the same every day, weekends within an hour. Consistent mornings are what make earlier nights take hold.",
        ],
      },
      {
        id: "waking-slow-riser",
        title: "Build a runway, not an ejector seat",
        intro:
          "Some people simply boot up slowly. Fighting it makes mornings worse; designing around it makes them calm.",
        steps: [
          "Wake them 15 minutes earlier than strictly needed and let the first stretch be undemanding — sitting up, lights on, nothing asked yet.",
          "Use light aggressively: curtains open, room bright. Light is the strongest natural wake-up signal there is.",
          "Attach a small pleasant anchor to getting up — warm breakfast, five minutes of music — so the bed has real competition.",
          "Put the alarm across the room so standing up happens once, not five snoozes later.",
        ],
      },
      {
        id: "ready-clothes",
        title: "Move the wardrobe decision to the evening",
        intro:
          "Clothing friction is a decision problem happening at the worst possible hour. Relocate the decision and the morning shrinks.",
        steps: [
          "Choose tomorrow's outfit together the night before, down to socks, and lay it out where dressing happens.",
          "Trim the choices: a small set of comfortable, pre-approved options beats a full closet of possibilities every morning.",
          "Respect real comfort complaints — itchy seams and tight collars are honest objections; retiring one shirt is cheaper than daily standoffs.",
          "Make it a race only if your child enjoys races: “dressed before the song ends” works wonders for some kids and backfires for others. You know yours.",
        ],
      },
      {
        id: "ready-reminders",
        title: "Replace your voice with a checklist",
        intro:
          "When every step needs a prompt, the sequence lives in your head instead of theirs. Move it onto paper and let the list do the reminding.",
        steps: [
          "Make a short picture-or-word checklist of the morning steps, in order, posted where the routine happens — bathroom mirror, bedroom door.",
          "Walk the list together for a week, then step back to one prompt: “Check your list,” instead of narrating each step.",
          "Keep the order identical every day; sameness is what turns a list into a habit you no longer need.",
          "Time one or two steps with a sand timer or song if dawdling is part of it — beating the timer replaces hearing the reminder.",
          "Catch them mid-success: “You did the whole list without me saying anything” is the sentence that makes it permanent.",
        ],
        related: { slug: "weekly-executive-function-planner", title: "Weekly Executive Function Planner" },
      },
      {
        id: "door-stuff",
        title: "Build a launch pad",
        intro:
          "Lost shoes at 7:58 is a storage problem disguised as a kid problem. Give everything that leaves the house one home, right by the door.",
        steps: [
          "Set up a launch pad by the exit: a hook, a bin, a spot for shoes — one per person. Everything that goes to school lives there and nowhere else.",
          "Pack the bag at night, every night, as part of the homework wrap-up — homework in, forms signed, water bottle filled.",
          "Do a 60-second “pad check” before bed: bag, shoes, jacket on the pad. The morning search is over before it starts.",
          "Let the natural result do some teaching when stakes are low — one forgotten library book teaches more than a month of reminders.",
        ],
      },
      {
        id: "door-time",
        title: "Anchor to leave time, not arrival time",
        intro:
          "Families run late by planning backward from when school starts instead of forward from when the car must move. One time matters: leave time.",
        steps: [
          "Name the leave time out loud and post it: “The car leaves at 7:40.” Everything in the morning aims at that, not at the bell.",
          "Set one alarm for ten minutes before leave time — the wrap-it-up signal — and one at leave time itself.",
          "Build in a 10-minute buffer you don't tell anyone about. Buffers absorb the surprise sock crisis; schedules without them shatter.",
          "Move any step that can move to the night before — bags, clothes, lunches — so the morning carries only what it must.",
        ],
      },
    ],
  },
  {
    slug: "big-feelings-after-school",
    title: "Big Feelings After School",
    description:
      "A guided walk through the after-school crash — why kids hold it together all day and let it out at home, and what helps.",
    intro:
      "Many kids spend the school day holding it together — following rules, staying quiet, being patient — and release it all in the first hour home, with the people they trust most. Answer two quick questions to get strategies matched to what you see.",
    firstStep: "start",
    steps: [
      {
        id: "start",
        question: "What do you usually see in that first hour home?",
        options: [
          { label: "Tears or a blow-up over something tiny", next: "blowup" },
          { label: "Grumpy one-word answers and a closed door", next: "withdrawn" },
          { label: "Wild, bouncing-off-the-walls energy", next: "energy" },
        ],
      },
      {
        id: "blowup",
        question: "When is it most likely?",
        options: [
          { label: "The moment they walk in — it's immediate", next: "blowup-immediate" },
          { label: "When something is asked of them — homework, chores", next: "blowup-demands" },
        ],
      },
      {
        id: "withdrawn",
        question: "What happens if you ask about their day?",
        options: [
          { label: "“Fine.” Conversation over.", next: "withdrawn-fine" },
          { label: "It can tip into irritation or an argument", next: "withdrawn-irritated" },
        ],
      },
      {
        id: "energy",
        question: "What does the energy usually run into?",
        options: [
          { label: "Siblings, furniture, and noise complaints", next: "energy-collisions" },
          { label: "Trouble settling later — homework, dinner, bed", next: "energy-settling" },
        ],
      },
    ],
    outcomes: [
      {
        id: "blowup-immediate",
        title: "Build a soft landing",
        intro:
          "An immediate storm usually means the day's effort is arriving home with them. The first job isn't to fix it — it's to receive it gently and refuel.",
        steps: [
          "Meet them with food and a drink before anything else — hungry and tired is half the storm most days.",
          "Hold all questions and requests for the first 30 minutes. Aim for a warm hello, a snack, and space.",
          "Offer a predictable decompression slot — same spot, same options: quiet play, drawing, backyard, audiobook. Predictable beats negotiated.",
          "Stay nearby but undemanding; folding laundry in the same room says “I'm here” better than “tell me what's wrong.”",
          "If a wave comes anyway, keep it simple and kind: “You had a big day. I'm here.” Any conversation about how it went can wait for a calmer hour.",
        ],
      },
      {
        id: "blowup-demands",
        title: "Move the asks later",
        intro:
          "If the blow-up arrives with the first request, the request is landing on an empty tank. Same expectations — different clock.",
        steps: [
          "Shift homework, chores, and practice out of the first hour home; a 4:30 start after food and rest beats a 3:30 start with tears.",
          "Post the afternoon order — snack, break, then homework — so the routine makes the ask instead of you.",
          "Give a heads-up before the switch: “Ten more minutes of break, then homework.” Transitions land better with a runway.",
          "Offer one real choice inside the ask — which subject first, kitchen or desk — so cooperation keeps some ownership in it.",
        ],
        related: { slug: "weekly-executive-function-planner", title: "Weekly Executive Function Planner" },
      },
      {
        id: "withdrawn-fine",
        title: "Connect sideways, not head-on",
        intro:
          "“Fine” isn't a wall — it's a kid with nothing left for conversation yet. Connection that doesn't require words usually gets words later.",
        steps: [
          "Swap “How was school?” for presence: sit nearby with a snack, no agenda. Silence together is still connection.",
          "Use side-by-side settings — the car, a walk, cooking — where talk is optional. Most kids open up mid-activity, not mid-interview.",
          "Try one small, specific opener much later: “What was the best thing at lunch?” Specific and low-stakes beats broad and probing.",
          "Share first from your own day — one sentence, then let it be. Conversation is contagious; interrogation isn't.",
        ],
      },
      {
        id: "withdrawn-irritated",
        title: "Give the space before the talk",
        intro:
          "If questions tip into arguments, the questions are arriving before the recovery. Protect a no-questions zone and the arguments mostly stop finding fuel.",
        steps: [
          "Declare the first half hour home a question-free zone — greet, feed, and let them be. Watch how much conflict simply doesn't start.",
          "Let them pick their own recovery: room, music, shooting hoops. Alone isn't rejection; it's how many people refill.",
          "Pick one later window that's reliably calmer — dinner, dog walk, lights-out — and let that be where the day gets talked about.",
          "If irritation spills into rudeness, name it once, briefly, and revisit it in calm: “That tone doesn't work — we'll talk after dinner.” Then actually let it go until then.",
        ],
      },
      {
        id: "energy-collisions",
        title: "Give the energy a job",
        intro:
          "A body that sat still and stayed quiet for six hours has real energy to spend. Spent on purpose, it stops being spent on the sofa and the siblings.",
        steps: [
          "Make active time the official first stop after school: park on the way home, backyard, bikes, a race to the corner — before homework, not as a reward after.",
          "Send the energy at a target: kick a ball 50 times, obstacle course, jump rope contest. Aimed beats aimless.",
          "Separate collision zones for that first hour — the wound-up kid and the sibling who wants quiet get different spaces, by design.",
          "Watch what food does: a protein-ish snack steadies the hour in a way crackers alone don't.",
        ],
      },
      {
        id: "energy-settling",
        title: "Burn first, then land",
        intro:
          "Settling problems at 5 p.m. often trace back to energy that never got out at 3:30. Sequence the afternoon: big movement first, calmer steps after, same order daily.",
        steps: [
          "Schedule 30–45 minutes of real movement right after school — outside if at all possible — before anything that requires a chair.",
          "Create a visible switch into calm: same snack spot, same table, maybe the same music. Bodies learn the transition faster than minds do.",
          "Step the evening down gradually — active play, then dinner, then quiet play, then the bedtime routine — instead of asking for one big jump into calm.",
          "Keep screens out of the wind-down hour; they hold the engine revving right when you're trying to land it.",
        ],
      },
    ],
  },
];

export function getToolkit(slug: string): Toolkit | undefined {
  return TOOLKITS.find((t) => t.slug === slug);
}
