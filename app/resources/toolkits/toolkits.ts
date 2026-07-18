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
  {
    slug: "report-card-conversations",
    title: "Report Card Conversations",
    description:
      "A guided walk through talking about a disappointing report card without shame — matched to how your child reacted.",
    intro:
      "A rough report card is one conversation, and how it goes shapes the whole next quarter. Answer two quick questions about how your child reacted and get an approach matched to it.",
    firstStep: "start",
    steps: [
      {
        id: "start",
        question: "A report card came home and it's not what you hoped. How did your child react?",
        options: [
          { label: "Defensive — excuses, blame, “the teacher hates me”", next: "defensive" },
          { label: "Discouraged — “I'm just bad at school”", next: "discouraged" },
          { label: "A shrug — they don't seem to care", next: "flat" },
        ],
      },
      {
        id: "defensive",
        question: "What do you think the defensiveness is protecting?",
        options: [
          { label: "They know it's bad and can't face it", next: "rc-defensive-shame" },
          { label: "They genuinely believe it isn't their fault", next: "rc-defensive-blame" },
        ],
      },
      {
        id: "discouraged",
        question: "How long has that story been building?",
        options: [
          { label: "It's new — one rough stretch", next: "rc-discouraged-new" },
          { label: "It's been building for a while", next: "rc-discouraged-long" },
        ],
      },
      {
        id: "flat",
        question: "What does the shrug usually look like?",
        options: [
          { label: "Changes the subject, leaves the room", next: "rc-flat-avoids" },
          { label: "Says grades don't matter anyway", next: "rc-flat-dismisses" },
        ],
      },
    ],
    outcomes: [
      {
        id: "rc-defensive-shame",
        title: "Lower the stakes before you raise the subject",
        intro:
          "Defensiveness that guards embarrassment melts when the conversation stops feeling like a verdict. Your job in round one isn't to fix the grades — it's to make the topic safe to discuss.",
        steps: [
          "Wait a day. A report card read aloud at the kitchen counter in minute one goes badly for everyone; the same conversation after dinner tomorrow goes differently.",
          "Open with curiosity, not the grade: “What felt hardest this quarter?” Questions about their experience get answers; questions about the number get walls.",
          "Pick one subject to work on — the one they choose, ideally. A whole-report-card project feels like drowning; one subject feels like a plan.",
          "Praise effort you actually saw, separately from outcomes: the studying that happened, the homework that got turned in. Effort is the lever they control.",
          "Close with a next step, not a punishment: together, write one question to ask the teacher about where the points went.",
        ],
      },
      {
        id: "rc-defensive-blame",
        title: "Follow the story to the facts",
        intro:
          "When a child genuinely believes the grade is unfair, arguing the point head-on entrenches it. Walking through the actual work together lets the facts do the talking — gently.",
        steps: [
          "Take the belief seriously first: “Walk me through what happens in that class.” You'll learn something real — and they'll stop bracing for a lecture.",
          "Look at graded work together, side by side, with real curiosity. Patterns show up fast: missing assignments, one question type, points lost at the end.",
          "Keep it to one subject. The goal is one clear picture, not a prosecution across five classes.",
          "Email the teacher together asking about patterns — “Where does the grade mostly come from?” — so the answer arrives from the source, not from you.",
          "Frame the quarter ahead around effort they control: turned-in work, corrected tests, one question asked per week in class.",
        ],
        related: { slug: "plan-builder", title: "Study Plan Builder" },
      },
      {
        id: "rc-discouraged-new",
        title: "Name it as a stretch, not a self",
        intro:
          "One rough quarter can quietly become “I'm bad at school” if nobody offers a different story. Your job is to keep the setback sized as a setback.",
        steps: [
          "Say the frame out loud: “One rough quarter is information, not a verdict.” Kids borrow the story the calmest adult in the room is telling.",
          "Ask what changed this quarter — harder material, new teacher, a busy season — and listen. New struggles usually have findable causes.",
          "Pick the one subject where a visible win is most reachable and focus there. Nothing rebuilds a discouraged student like one grade moving.",
          "Separate effort from outcome every week: notice the studying, the redone problems, the asked question — before any grade arrives to judge it.",
        ],
      },
      {
        id: "rc-discouraged-long",
        title: "Rebuild on a longer runway",
        intro:
          "A discouragement that's been building for a while deserves more than a pep talk. The plan is small wins on purpose, adults aligned, and honest thought about extra help.",
        steps: [
          "Start with their story, not your plan: “When did school start feeling this way?” The answer often relocates the real starting point.",
          "Choose one subject and one small, near-term goal — this unit's quiz, not this year's grade. Small enough to win matters more than big enough to impress.",
          "Set up a teacher follow-up in that one subject: share the goal, ask what they see, agree how you'll both know it's working.",
          "Mark progress visibly at home — a redone test taped to the fridge outranks a lecture about potential.",
          "If the pattern spans years and subjects, that's information: outside help that starts from where your child actually is can change the slope.",
        ],
        related: { slug: "tutoring-vs-school-services", title: "Tutoring vs. School Services: How to Decide" },
      },
      {
        id: "rc-flat-avoids",
        title: "Make the conversation smaller than the avoidance",
        intro:
          "Leaving the room is rarely indifference — it's usually a conversation that feels too big to have. Shrink it until it fits.",
        steps: [
          "Move it sideways: the car, a walk, cooking together. Face-to-face across a table reads as a tribunal; side-by-side reads as company.",
          "Ask exactly one question and stop: “What felt hardest this quarter?” Twenty questions is why the room empties.",
          "Let silence do some work. A pause that feels long to you often ends with them filling it.",
          "Agree on one subject and one step, then genuinely drop the rest for now. Follow-through on “that's all I wanted to talk about” buys next quarter's conversation.",
        ],
      },
      {
        id: "rc-flat-dismisses",
        title: "Connect grades to their goals, not yours",
        intro:
          "“Grades don't matter” is usually armor, and sometimes a test of whether you'll lecture. Skip the lecture; connect the dots to something they already want.",
        steps: [
          "Ask about their goals first — the team, the game design idea, the car, the college a cousin went to. Listen longer than feels natural.",
          "Draw the line from one goal back to one subject, once, without a speech: eligibility rules, a program's requirements, a skill the goal needs.",
          "Keep expectations concrete and small: work turned in, one subject's grade moving. Debating whether grades matter in the abstract is a game nobody wins.",
          "Watch effort like a hawk and name it when you see it — dismissiveness often fades when trying quietly starts paying.",
        ],
      },
    ],
  },
  {
    slug: "parent-teacher-conference-prep",
    title: "Parent–Teacher Conference Prep",
    description:
      "A guided walk through getting real value from your conference — matched to the situation you're walking in with.",
    intro:
      "Conference slots are short and they go fast. Two quick questions, and you'll walk in with the right questions, the right materials, and a plan for what happens after.",
    firstStep: "start",
    steps: [
      {
        id: "start",
        question: "Your conference is coming up. What's the situation going in?",
        options: [
          { label: "Things seem fine — I just want to use the time well", next: "fine" },
          { label: "Grades are slipping and I want answers", next: "slipping" },
          { label: "There's one specific concern I need to raise", next: "concern" },
        ],
      },
      {
        id: "fine",
        question: "What would make the meeting feel genuinely worthwhile?",
        options: [
          { label: "Knowing how they're really doing, beyond grades", next: "ptc-fine-depth" },
          { label: "Knowing what we should work on next", next: "ptc-fine-next" },
        ],
      },
      {
        id: "slipping",
        question: "Do you have a guess about why?",
        options: [
          { label: "Yes — I have a theory", next: "ptc-slip-theory" },
          { label: "No — that's what I need to find out", next: "ptc-slip-mystery" },
        ],
      },
      {
        id: "concern",
        question: "How do you expect it to land?",
        options: [
          { label: "The teacher probably already knows", next: "ptc-concern-known" },
          { label: "I think it will be news to them", next: "ptc-concern-new" },
        ],
      },
    ],
    outcomes: [
      {
        id: "ptc-fine-depth",
        title: "Ask the questions grades can't answer",
        intro:
          "When things are fine, the conference is your one chance to see the student the teacher sees. Come with questions that a report card can't answer.",
        steps: [
          "Bring three questions, written down: “What does she do when something is hard?” “Who does he work well with?” “Where do you see them a year from now?”",
          "Ask about patterns, not moments: “What do you see most days?” beats any single anecdote in both directions.",
          "Ask the teacher what they'd work on next if it were their own child — teachers almost always have an answer, and it's almost always useful.",
          "Agree on one channel for follow-up — email, the app, a note home — and thank them specifically for something you've noticed this year.",
        ],
      },
      {
        id: "ptc-fine-next",
        title: "Leave with one thing, not ten",
        intro:
          "“What should we work on?” gets vague answers unless you shape it. Aim the meeting at leaving with exactly one concrete next thing.",
        steps: [
          "Ask it concretely: “What's one thing we could do at home that would actually help?” The word one does real work in that sentence.",
          "Ask where the ceiling is: “Where could they stretch that school doesn't have time for?” — a good source of enrichment that doesn't duplicate class.",
          "Write the answer down in the meeting. It signals seriousness, and it's the difference between a plan and a pleasant chat.",
          "Agree on one follow-up channel and one check-in point — “I'll email you at midterm about how it's going.”",
        ],
      },
      {
        id: "ptc-slip-theory",
        title: "Test your theory — don't open with it",
        intro:
          "A theory is useful; leading with it isn't. Teachers give better information when they describe first and respond to theories second.",
        steps: [
          "Open wide: “We've noticed the grade slipping — what are you seeing?” Let them paint the picture before you show them yours.",
          "Bring two or three recent work samples, including one that went well. Comparing a good week to a bad one often locates the change.",
          "Then offer the theory as a question: “We wondered if it's the homework load — does that match what you see?”",
          "Ask about patterns, not incidents: which assignments, which point in the class period, which kind of question.",
          "Leave with one agreed step each — one thing home tries, one thing the teacher tries — and one channel to compare notes in three weeks.",
        ],
      },
      {
        id: "ptc-slip-mystery",
        title: "Go in as a detective, not a defendant",
        intro:
          "Not knowing why is a fine place to start — the conference is exactly the right tool for it. Structure the questions and the picture assembles fast.",
        steps: [
          "Ask the timeline question first: “When did you first notice the change?” Slipping that started in November has a different story than slipping since day one.",
          "Ask for the shape of the loss: missing work, low test scores, or fading participation — each points somewhere different.",
          "Bring work samples from before and after the slide if you have them; the difference is often visible on the page.",
          "Resist solving it in the room. Collect, thank, and agree on one follow-up channel — then decide at home, with your child in the conversation.",
        ],
        related: { slug: "toolkits/report-card-conversations", title: "Report Card Conversations" },
      },
      {
        id: "ptc-concern-known",
        title: "Move from concern to plan",
        intro:
          "If the teacher likely already knows, the win isn't raising it — it's converting a shared awareness into a shared plan with dates on it.",
        steps: [
          "Name it plainly and skip the wind-up: “I want to talk about the reading. What are you seeing?” Shared concerns don't need diplomatic paragraphs.",
          "Ask what's been tried in class already and how it's gone — you're joining something in progress, not starting it.",
          "Agree on one step at school and one at home, small enough to actually happen this month.",
          "Set the check-in before you leave: who reaches out, on which channel, on what date. Plans without dates dissolve.",
        ],
      },
      {
        id: "ptc-concern-new",
        title: "Deliver news like a partner",
        intro:
          "Bringing a teacher something they haven't seen works best when it lands as information, not accusation. You're handing them a puzzle piece from home.",
        steps: [
          "Frame it as what you see at home: “Homework takes two hours and ends in tears” travels better than “the workload is unreasonable.”",
          "Bring evidence, gently: the work sample, the time log for one week. Concrete beats characterized.",
          "Ask genuinely what they see at school — sometimes the same child looks different in the room, and that mismatch is itself the finding.",
          "Ask “what would you try first?” before proposing your own fix; you'll get their best thinking instead of their defense.",
          "Agree on one follow-up channel and a two-week check-in — new information deserves a short feedback loop.",
        ],
      },
    ],
  },
  {
    slug: "test-day-support",
    title: "Test-Day Support",
    description:
      "A guided walk through helping before, during, and after a big test — matched to your child's usual pattern.",
    intro:
      "Most test trouble follows one of a few patterns, and the help looks different for each. Two quick questions and you'll get a before-morning-after playbook matched to yours.",
    firstStep: "start",
    steps: [
      {
        id: "start",
        question: "A big test is coming. What's your child's usual pattern?",
        options: [
          { label: "Nerves — they know the material, then freeze", next: "nerves" },
          { label: "Underprepared — studying starts too late", next: "underprep" },
          { label: "Careless — knows it, loses points anyway", next: "careless" },
        ],
      },
      {
        id: "nerves",
        question: "When do the nerves peak?",
        options: [
          { label: "The night before", next: "td-nerves-night" },
          { label: "In the room, during the test", next: "td-nerves-room" },
        ],
      },
      {
        id: "underprep",
        question: "Is it a planning problem or a starting problem?",
        options: [
          { label: "They don't know how to plan the studying", next: "td-underprep-plan" },
          { label: "They put it off even with a plan", next: "td-underprep-delay" },
        ],
      },
      {
        id: "careless",
        question: "Where do the points usually go?",
        options: [
          { label: "Rushing to finish", next: "td-careless-rush" },
          { label: "Misreading what was asked", next: "td-careless-misread" },
        ],
      },
    ],
    outcomes: [
      {
        id: "td-nerves-night",
        title: "Win the night before",
        intro:
          "Night-before nerves feed on open loops — unpacked bags, unfinished review, unknown logistics. Close the loops and the evening gets quieter on its own.",
        steps: [
          "Make a night-before routine and keep it identical for every test: bag packed, materials ready, clothes out, then done. Sameness is the message that this is handled.",
          "End review by dinner. Late-night studying trades real points (sleep) for imaginary ones — say that out loud and mean it.",
          "Swap reassurance for logistics. “You'll do great” invites debate; “Your bag's ready, breakfast is set” closes topics.",
          "Send the morning script the night before: “You've done the work — go run the plan.” Knowing what tomorrow's send-off sounds like is itself calming.",
          "Keep your own calm honest — kids read the room. If you're pacing, the routine isn't done: finish the checklist together and sit down.",
        ],
      },
      {
        id: "td-nerves-room",
        title: "Give them a script for the freeze",
        intro:
          "Freezing mid-test needs a plan that lives inside the room, where you aren't. Practice it at home until it's automatic.",
        steps: [
          "Teach one reset: slow breath, drop the shoulders, reread the current question only. Practice it during homework so test day isn't its debut.",
          "Agree on the skip rule ahead of time: stuck for 30 seconds → mark it, move on, come back. Permission to skip, granted by a parent in advance, is surprisingly powerful.",
          "Rehearse the first minute: read the directions, do the easiest question first, get one thing right before the hard part. Momentum beats dread.",
          "On test morning, keep breakfast normal and the script short: “You've done the work — go run the plan.” No new advice at the door.",
          "Afterward, debrief the strategy, not the score: “Did the reset help?” builds a tool they'll carry into every test after this one.",
        ],
      },
      {
        id: "td-underprep-plan",
        title: "Make the plan the easy part",
        intro:
          "Some students put off studying because nobody ever showed them what a study plan looks like. Build one together once — then hand the tool over.",
        steps: [
          "Count backward from test day together: what's left, how many evenings, what fits where. Ten minutes with a calendar removes most of the mystery.",
          "Split material into small named chunks — “unit 3 vocabulary,” “chapter 5 problems” — and assign each a day. Vague plans (“study science”) don't get started.",
          "Front-load the hardest topic while the runway is long, and keep the night before for light review only.",
          "Build the plan with a free tool once so they see the shape — then next test, they build it themselves and you just admire it.",
        ],
        related: { slug: "sat-schedule", title: "SAT Schedule Builder" },
      },
      {
        id: "td-underprep-delay",
        title: "Shrink the start, protect the streak",
        intro:
          "A plan that never starts isn't a planning problem — it's a starting problem. Make day one so small it's hard to refuse, and guard the chain of days.",
        steps: [
          "Set a daily 15-minute study anchor at the same time each day — after snack, before anything fun. The clock starts it, so nobody has to negotiate it.",
          "Use the five-minute deal: “Just the first five minutes, then decide.” Almost everyone keeps going once the notebook is open.",
          "Track the streak visibly — an X on the calendar per day studied. Streaks recruit stubbornness to your side.",
          "Put the phone in another room for the 15 minutes; the shortest session loses to a buzzing screen.",
          "For a topic they're stuck on, a guided free tool can turn “I don't know where to start” into a two-week plan in five minutes.",
        ],
        related: { slug: "study-coach", title: "Study Coach" },
      },
      {
        id: "td-careless-rush",
        title: "Make checking a scheduled step",
        intro:
          "Rushing isn't a character flaw; it's a habit of treating “done” as the finish line. Move the finish line to “checked.”",
        steps: [
          "During homework, budget the last tenth of the time for checking — every time. Checking practiced at home shows up on tests uninvited.",
          "Build a three-line personal checklist from their actual mistakes: reread the question, check signs or spelling, look at the last problem again.",
          "Practice pacing with a timer on ordinary assignments: finishing with five minutes to spare, on purpose, is a trainable skill.",
          "Debrief after the test without interrogation: “How did the pacing feel?” — then let it go until the graded copy comes back with its lessons attached.",
        ],
      },
      {
        id: "td-careless-misread",
        title: "Slow down the first read, not the whole test",
        intro:
          "Misread questions lose points at the very first step, which is also the cheapest place to fix them. The whole strategy is: own the question before answering it.",
        steps: [
          "Teach question-first reading: underline what's actually being asked — not the whole problem, just the ask — before starting any work.",
          "Practice the restate habit on homework: say the question in their own words first. If they can't, that's the discovery, made cheaply.",
          "Keep an error log of misread questions and read it together weekly — the same traps (“choose the FALSE statement,” units, “both parts”) repeat forever.",
          "After the test, debrief gently and specifically: “Any questions that turned out to be asking something different?” Naming the trap is half of never falling for it again.",
        ],
      },
    ],
  },
  {
    slug: "summer-learning-without-burnout",
    title: "Summer Learning Without Burnout",
    description:
      "A guided walk through a summer that keeps learning alive without wrecking the break — matched to your honest goal.",
    intro:
      "Summers work best when the goal is named out loud — keeping fresh, catching up, and getting ahead are three different summers. Two quick questions and you'll get the version that fits yours.",
    firstStep: "start",
    steps: [
      {
        id: "start",
        question: "What's the honest goal for this summer?",
        options: [
          { label: "Keep skills fresh", next: "fresh" },
          { label: "Catch up — the year left gaps", next: "catchup" },
          { label: "Get ahead", next: "ahead" },
        ],
      },
      {
        id: "fresh",
        question: "What's the bigger risk at your house?",
        options: [
          { label: "It turns into a daily fight", next: "sl-fresh-fight" },
          { label: "It just quietly never happens", next: "sl-fresh-drift" },
        ],
      },
      {
        id: "catchup",
        question: "How clear are you on the gaps?",
        options: [
          { label: "Very — we know the subjects", next: "sl-catchup-clear" },
          { label: "Fuzzy — just “behind”", next: "sl-catchup-fuzzy" },
        ],
      },
      {
        id: "ahead",
        question: "Whose idea is getting ahead?",
        options: [
          { label: "Theirs — they're hungry for it", next: "sl-ahead-theirs" },
          { label: "Mine — I don't want a wasted summer", next: "sl-ahead-mine" },
        ],
      },
    ],
    outcomes: [
      {
        id: "sl-fresh-fight",
        title: "Make it small, samely, and not yours",
        intro:
          "Summer fights are usually about size and surprise. A tiny fixed anchor, owned by the routine instead of by you, removes both.",
        steps: [
          "Set a 20-minute daily anchor at the same time — right after breakfast works best — and let the clock be the one who starts it.",
          "Let them choose the content inside the container: reading, math practice, a language app. The time is non-negotiable; the menu is theirs.",
          "Never extend a session that went well. Twenty minutes means twenty — trust is what makes tomorrow's twenty happen without a fight.",
          "Fold learning into real life where no one can call it school: recipe math, trip budgets, reading the game's rulebook aloud.",
        ],
      },
      {
        id: "sl-fresh-drift",
        title: "Attach it to something that already happens",
        intro:
          "Plans that rely on remembering die by July. Plans attached to an existing daily event survive, because breakfast never forgets to happen.",
        steps: [
          "Anchor 20 minutes to a fixed daily event — after breakfast, before screens unlock. The sequence does the remembering.",
          "Make it visible: a paper calendar with an X per day. In week three the chain itself becomes the reason to keep going.",
          "Stack the environment: books in the car and bathroom, puzzle on the porch table. Availability quietly beats intention.",
          "Give reading full autonomy — graphic novels, sports bios, reread series all count. Summer reading has one job: staying voluntary.",
        ],
        related: { slug: "toolkits/reading-at-home", title: "Reading at Home" },
      },
      {
        id: "sl-catchup-clear",
        title: "Run a short, honest campaign",
        intro:
          "Known gaps deserve a real plan — and a boundary, so catch-up doesn't quietly eat the whole summer. Aim for focused weekday minutes and a finish line.",
        steps: [
          "Turn last year's grades into a schedule with the free Plan Builder — subjects in, weekly plan out — so the summer plan is a document, not a mood.",
          "Cap it: 30–45 focused minutes on weekdays, mornings if you can, weekends off. Catch-up sustained beats catch-up heroic.",
          "Work the earliest gap first — this year's confusion usually stands on last year's shaky topic.",
          "Set a mid-summer checkpoint: a practice quiz or a redone old test. If it's working, ease off; if not, adjust while there's still runway.",
          "Protect actual summer on purpose — the pool, the cousins, the boredom. A rested student in September outperforms a resentful one.",
        ],
        related: { slug: "plan-builder", title: "Study Plan Builder" },
      },
      {
        id: "sl-catchup-fuzzy",
        title: "Find the real gaps before you plan",
        intro:
          "“Behind” is a feeling until you check. Spend the first week finding the real gaps — it's the highest-value week of the summer.",
        steps: [
          "Gather the evidence you already have: final report card, teacher comments, the last few tests. Circle anything that repeats.",
          "Do a light skills check with free practice by grade level — twenty minutes per subject tells you more than a month of guessing.",
          "Ask your child where it got hard — kids usually know, with startling precision, the exact chapter where a subject went dark.",
          "Then run a focused plan on the two or three real gaps, 30–40 weekday minutes, weekends off — and let the rest of summer be summer.",
        ],
        related: { slug: "plan-builder", title: "Study Plan Builder" },
      },
      {
        id: "sl-ahead-theirs",
        title: "Feed the hunger without formalizing it",
        intro:
          "A kid who wants to get ahead needs fuel and room, not a syllabus. Your job is supply lines and an audience — not management.",
        steps: [
          "Ask what they want to build, master, or find out — then resource it: library trips, one good kit or course, a corner of the table that doesn't get cleared.",
          "Shape it into one enrichment project with something to show in August: a model, a story collection, a coded game, a garden. Artifacts sustain momentum.",
          "Add a 20-minute daily anchor for the skill behind the interest — the math under the coding, the reading behind the history obsession.",
          "Stay the audience, not the manager: ask to be shown, not to inspect. The project stays theirs or it stops.",
        ],
      },
      {
        id: "sl-ahead-mine",
        title: "Buy progress without selling the summer",
        intro:
          "When getting ahead is the parent's goal, the design has to be honest about that — light enough to keep goodwill, real enough to matter in September.",
        steps: [
          "Name the deal plainly: 20–30 focused minutes on weekdays, and the rest of the day is genuinely theirs. Clear edges prevent daily renegotiation.",
          "Preview, don't race ahead: skimming next year's first chapters builds September confidence without burning the material.",
          "Trade choice for buy-in: they pick which subject and when the minutes happen; you hold only the that-it-happens.",
          "Watch for the burnout tells — dread, bargaining, dawdling that outlasts the session — and cut the load in half for a week rather than push through.",
          "Put the payoff where they can feel it: “You'll walk into algebra already knowing the first month.” Getting ahead should taste like an advantage, not a punishment.",
        ],
      },
    ],
  },
  {
    slug: "reading-at-home",
    title: "Reading at Home",
    description:
      "A guided walk through growing a reader at any age — matched to elementary, middle, or high school.",
    intro:
      "The goal at every age is the same — a kid who reads because they want to — but the moves change as they grow. One quick question about age, one about where things stand, and you'll get strategies that fit.",
    firstStep: "start",
    steps: [
      {
        id: "start",
        question: "How old is your reader?",
        options: [
          { label: "Elementary school", next: "elementary" },
          { label: "Middle school", next: "middle" },
          { label: "High school", next: "high" },
        ],
      },
      {
        id: "elementary",
        question: "What's the current relationship with books?",
        options: [
          { label: "Loves being read to, resists reading alone", next: "ra-elem-readaloud" },
          { label: "Avoids books altogether", next: "ra-elem-avoids" },
        ],
      },
      {
        id: "middle",
        question: "What happened to reading?",
        options: [
          { label: "Screens won the competition", next: "ra-mid-screens" },
          { label: "They say books are boring", next: "ra-mid-boring" },
        ],
      },
      {
        id: "high",
        question: "What's the goal?",
        options: [
          { label: "Get them reading anything at all", next: "ra-high-anything" },
          { label: "Deepen what they already do", next: "ra-high-deepen" },
        ],
      },
    ],
    outcomes: [
      {
        id: "ra-elem-readaloud",
        title: "Keep reading aloud — and build a bridge",
        intro:
          "Loving read-alouds is a strength, not a stall. Keep the ritual (it's doing more than you think) and build a low-pressure bridge to solo reading beside it.",
        steps: [
          "Don't retire the read-aloud — there is no “too old.” Listening comprehension runs years ahead of decoding, and the couch ritual is where the love lives.",
          "Trade pages inside the ritual: you read a page, they read a paragraph — then gradually rebalance. The bridge is gentle and shared.",
          "Start a series together aloud and let the next book “accidentally” be available for solo attempts. Needing to know what happens is the strongest engine there is.",
          "Let their solo choices be easy — below-level books, comics, rereads all count. Solo reading should feel like coasting downhill.",
          "Ask story questions, never quiz questions: “Would you have done what she did?” keeps books a conversation, not a test.",
        ],
      },
      {
        id: "ra-elem-avoids",
        title: "Lower the bar until they trip over it",
        intro:
          "A young book-avoider usually finds books effortful, boring, or both. Attack both: easier entry points, higher-interest topics, zero pressure.",
        steps: [
          "Follow the obsession, wherever it is: dinosaurs, gaming guides, joke books, graphic novels. The topic recruits; the format doesn't matter.",
          "Keep reading aloud daily anyway — comprehension and pleasure keep growing through the ears while the eyes catch up.",
          "Salt the house with easy wins: comics in the car, a joke book at breakfast. Three found minutes beat a scheduled twenty that ends in tears.",
          "Make the library trip theirs: their card, their picks, no vetoes on level or topic. Ownership converts avoiders.",
          "If avoidance looks like real struggle — guessing at words, exhaustion after a page — ask the teacher what they see. Effort problems and skill problems need different help.",
        ],
      },
      {
        id: "ra-mid-screens",
        title: "Compete on convenience, not virtue",
        intro:
          "Screens win because they're instant and everywhere. Books win middle schoolers back by matching the convenience and borrowing the interests.",
        steps: [
          "Put books where the phone lives: on the bed, in the backpack, in the car. The competition is fought at arm's length.",
          "Go where the algorithm points: if they watch basketball highlights, sports bios; anime, manga. The screen already told you what they love.",
          "Audiobooks count, fully — commutes and chores become reading time with zero friction.",
          "Carve one screen-free reading pocket a day — 20 minutes before lights-out is the classic — and read your own book in it. Modeled beats mandated.",
          "Feed series momentum: when one lands, have the sequel already waiting. Dead time between books is where screens win the rematch.",
        ],
      },
      {
        id: "ra-mid-boring",
        title: "They haven't met the right book yet",
        intro:
          "“Books are boring” almost always means “the books adults keep handing me are boring.” The fix is range, choice, and a little cunning.",
        steps: [
          "Blow the doors off what counts: graphic novels, horror, sports pages, world-record books, song lyrics, recipe blogs. Reading is reading.",
          "Use the five-book flight: bring home a wild variety, ask them to read ten pages of each, keep whatever survives. Choice plus a taste beats assignment.",
          "Mine their people: the cousin's favorite, the coach's recommendation, what friends are passing around. Peer sourcing beats parent sourcing at this age.",
          "Talk about your own reading at dinner — the plot twist, the fact you can't stop thinking about. Curiosity is contagious; assignments aren't.",
        ],
      },
      {
        id: "ra-high-anything",
        title: "Meet them where their life already is",
        intro:
          "A high schooler who doesn't read for pleasure isn't a lost cause — they're busy, tired, and unconvinced. Win on relevance and respect.",
        steps: [
          "Connect books to what they already care about: the sport, the show, the career interest. A pro athlete's memoir has started more reading lives than most classics.",
          "Respect the format: audiobooks in the car they drive, long-form articles, essay collections — short, real, and finishable all count.",
          "Ask for their take, not their attention: “Someone said this book is overrated — settle it for me.” Teenagers will read to have an opinion.",
          "Keep books visible and free of assignments at home. School owns required reading; home should own the voluntary kind.",
        ],
      },
      {
        id: "ra-high-deepen",
        title: "Treat them like the reader they are",
        intro:
          "A high schooler who already reads needs peers, ideas, and next doors to walk through — not monitoring. Think fellow reader, not supervisor.",
        steps: [
          "Read what they read, sometimes — one shared book a semester turns dinner into a book club without calling it one.",
          "Open the adult shelves: journalism, memoir, philosophy, the novels people argue about. Being handed a grown-up book is a compliment they notice.",
          "Talk ideas, not comprehension: “Was the ending earned?” “Who was right?” The conversation is the deepening.",
          "Point them at the pipeline: the author's other books, the essay that inspired the novel, the movie adaptation to judge against the book.",
        ],
      },
    ],
  },
];

export function getToolkit(slug: string): Toolkit | undefined {
  return TOOLKITS.find((t) => t.slug === slug);
}
