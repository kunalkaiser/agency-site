// Guided Toolkit content, structured as a conversational arc (Parent Coach
// pattern): branch questions → short empathy bubbles → ONE named strategy
// card → a personalization question and pick list → a tailored close.
// Content rules (see CLAUDE.md): educational parenting strategies in plain
// language only — no clinical or diagnostic terms, no "ABA"/"behavior
// analysis"/"therapy"/"treatment"/"intervention" framing, no adversarial
// school framing. Every coach bubble stays within the ~60-word pacing rule.

import type { IlloName } from "@/components/CoachChat";

export type ToolkitOption = {
  label: string;
  /** id of the next step, or of an outcome (checked in outcomes first). */
  next: string;
};

export type ToolkitStep = {
  id: string;
  question: string;
  options: ToolkitOption[];
};

export type EmojiOption = { label: string; emoji: string };

export type ToolkitOutcome = {
  id: string;
  /** 2–3 short validating bubbles: what's really going on. Each ≤ ~60 words. */
  empathy: string[];
  /** The ONE strategy for this path, rendered as an in-chat card. */
  strategy: {
    name: string;
    /** What it is, in 2 sentences. */
    what: string;
    /** 2–3 short label:benefit bullets. */
    why: { label: string; benefit: string }[];
  };
  /** Tailored close; template contains "{pick}" replaced by the user's pick. */
  close: {
    kind: "say" | "try";
    template: string;
    encouragement: string;
  };
  related?: { slug: string; title: string };
};

export type ToolkitPersonal = {
  question: string;
  /** 3–4 options; `ack` is the coach's echo line after the choice. */
  options: (EmojiOption & { ack: string })[];
  pickQuestion: string;
  /** 4–5 pick options; the chosen label is echoed into the close template. */
  picks: EmojiOption[];
};

export type Toolkit = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  /** Spot illustration shown with the first empathy bubble. */
  illo: IlloName;
  firstStep: string;
  steps: ToolkitStep[];
  personal: ToolkitPersonal;
  outcomes: ToolkitOutcome[];
};

export const TOOLKITS: Toolkit[] = [
  {
    slug: "ending-screen-time",
    title: "Ending Screen Time Without a Standoff",
    description:
      "A guided walk through smoother screen-time endings, matched to what actually happens at your house.",
    intro:
      "Screens are genuinely hard to walk away from — for adults too. Answer two quick questions and get a strategy matched to how endings usually go at your house.",
    illo: "timer",
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
    personal: {
      question: "Quick one so I can tailor this: what does your child light up about away from screens?",
      options: [
        { label: "Sports and being outside", emoji: "⚽", ack: "An outside kid — that's great raw material for this." },
        { label: "Making and building things", emoji: "🎨", ack: "A maker — perfect. Makers switch activities better than they stop them." },
        { label: "Books and stories", emoji: "📚", ack: "A story kid — lovely. Stories are the easiest landing pad there is." },
        { label: "Time with you", emoji: "🤗", ack: "Then you're the landing pad — that makes this simpler than you'd think." },
      ],
      pickQuestion: "Pick tonight's bridge — the thing that comes right after the screen goes off:",
      picks: [
        { label: "a snack at the table", emoji: "🍎" },
        { label: "ten minutes outside together", emoji: "⚽" },
        { label: "drawing or building time", emoji: "🎨" },
        { label: "a chapter read together", emoji: "📖" },
        { label: "helping make dinner", emoji: "🍳" },
      ],
    },
    outcomes: [
      {
        id: "reaction-at-warning",
        empathy: [
          "If the warning itself sets things off, here's what's usually underneath: the warning has become the bad news. Every time it arrives, it announces a loss — so the fight starts there.",
          "The good news is that's fixable. When endings become boringly predictable, the warning stops carrying bad news at all — it's just the clock talking.",
        ],
        strategy: {
          name: "The Routine Warning",
          what: "Set the ending before the screen ever goes on, and let a visible timer do the telling. The warning becomes part of the furniture instead of a surprise attack.",
          why: [
            { label: "Agreed up front", benefit: "an ending they said yes to is half-accepted already" },
            { label: "The timer is neutral", benefit: "kids argue with parents, not with clocks" },
            { label: "Same every day", benefit: "predictability, not persuasion, lowers the temperature" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try tonight: agree the ending before the screen goes on, set a timer you both can see — and the moment it rings, head straight into {pick}.",
          encouragement: "Expect two bumpy nights, then watch it get boring — boring is the win here.",
        },
      },
      {
        id: "reaction-at-off",
        empathy: [
          "So the warning lands fine — it's the cliff edge that hurts. That's worth taking seriously: being yanked out of a story or a game mid-moment genuinely feels bad.",
          "The limit isn't the problem, and you don't need to soften it. You just need a gentler landing on the other side of it.",
        ],
        strategy: {
          name: "The Soft Landing",
          what: "End at a natural stopping point — end of the episode, end of the level — and let your child do the switching off themselves. Then move straight into something, not just away from something.",
          why: [
            { label: "Natural break", benefit: "stopping mid-story hurts; stopping at the end doesn't" },
            { label: "Their hand on the button", benefit: "turning it off beats having it turned off on you" },
            { label: "Somewhere to land", benefit: "feelings need a next thing to move toward" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try tonight: “when this episode ends, you turn it off — and then we're doing {pick}.” Their finger on the button, your landing pad ready.",
          encouragement: "If tears come anyway, stay kind and brief — the storm gets shorter every consistent night.",
        },
      },
      {
        id: "negotiation-give-in",
        empathy: [
          "Every “okay, five more minutes” quietly teaches one lesson: the posted ending is an opening offer. Kids are excellent economists — they'll keep bidding as long as bidding works.",
          "This isn't about getting tougher. It's about removing the negotiation slot entirely, kindly.",
        ],
        strategy: {
          name: "The Posted Rule",
          what: "Decide the limit when everyone's calm, write it where everyone can see it, and build the extra five minutes in from the start. The note becomes the authority, so you don't have to be.",
          why: [
            { label: "Written beats spoken", benefit: "you can point instead of re-arguing" },
            { label: "Padding built in", benefit: "“five more?” gets an honest “that was included”" },
            { label: "One calm phrase", benefit: "a single repeated line closes the market" },
          ],
        },
        close: {
          kind: "say",
          template:
            "Your one line, warm and once: “I know — and screen time's done. Come help me with {pick}.” Then the note on the wall does the rest.",
          encouragement: "The bidding stops when it stops paying — usually inside a week.",
        },
      },
      {
        id: "negotiation-hold",
        empathy: [
          "You're already doing the right thing — holding a fair line. It's just costing you a full negotiation session every single day, and that bill adds up.",
          "The move now isn't a better argument. It's shifting the enforcement off your shoulders and onto the routine.",
        ],
        strategy: {
          name: "Let the Schedule Argue",
          what: "Post the schedule, use a timer they can watch, and give one choice inside the limit — which slot, not whether. People argue far less with plans they helped set.",
          why: [
            { label: "Visible countdown", benefit: "the ending approaches instead of ambushing" },
            { label: "A choice inside the line", benefit: "ownership without giving ground" },
            { label: "Point, don't debate", benefit: "the chart absorbs the lobbying, not you" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try tonight: offer the choice — “before dinner or after?” — set the visible timer, and when it rings, straight into {pick}. You've said maybe ten words total.",
          encouragement: "Notice the smooth nights out loud — attention feeds whatever it lands on.",
        },
      },
      {
        id: "ignoring-midstream",
        empathy: [
          "Mid-game and mid-episode endings genuinely feel like being pulled out of another world — the not-hearing-you is partly real. A shout from the kitchen simply loses to a screen.",
          "So don't compete with the stream. Work with it.",
        ],
        strategy: {
          name: "Stop at the Seam",
          what: "Set endings at content boundaries — “after this episode,” “when the round ends” — and deliver the warning inside their world: in their line of sight, close enough to touch. Then ask for a readback.",
          why: [
            { label: "Seams don't hurt", benefit: "stopping between chapters beats stopping mid-page" },
            { label: "Eye-line delivery", benefit: "a warning they can see actually arrives" },
            { label: "The readback", benefit: "“what did I just say?” confirms receipt, gently" },
          ],
        },
        close: {
          kind: "say",
          template:
            "Stand where they can see you and say: “When this round ends, screen's off and we're doing {pick}. What did I just say?” That readback is the whole trick.",
          encouragement: "Two weeks of seam-endings and the ignoring mostly evaporates — it was never defiance, just distance.",
        },
      },
      {
        id: "ignoring-habit",
        empathy: [
          "When several reminders is the norm, something sneaky has happened: the first reminder has quietly stopped meaning anything. Everyone's learned the real deadline is the third ask.",
          "You don't need more volume. You need the first ask to count again — and that's a reset you can do in one calm conversation.",
        ],
        strategy: {
          name: "One Ask, Then Action",
          what: "At a calm moment, announce the new deal: one reminder, up close, then the screen goes off — no lecture, no anger. The consistency is the entire message.",
          why: [
            { label: "Announced in calm", benefit: "a rule set outside the moment feels fair inside it" },
            { label: "Up close, once", benefit: "one real ask beats five ambient ones" },
            { label: "Boring follow-through", benefit: "no drama means nothing to push against" },
          ],
        },
        close: {
          kind: "say",
          template:
            "The calm-moment announcement: “From now on I'll say it once, then the screen goes off — and we'll go do {pick}.” Then live it, boringly, for a week.",
          encouragement: "Catch the first-ask wins out loud: “First ask — nice.” Small sentence, heavy lifting.",
        },
      },
    ],
  },
  {
    slug: "homework-without-battles",
    title: "Homework Without the Battles",
    description:
      "A guided walk through calmer homework, matched to where it actually goes sideways: starting, focusing, or frustration.",
    intro:
      "Most homework battles happen at one of three points: getting started, staying with it, or hitting frustration. Two quick questions and you'll get a strategy aimed at yours.",
    illo: "calmcorner",
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
    personal: {
      question: "So I can tailor this: when does homework actually happen at your house?",
      options: [
        { label: "Right after school", emoji: "🎒", ack: "Right off the bus — okay, we'll make the entry ramp gentle." },
        { label: "After dinner", emoji: "🌙", ack: "Evening shift — fed and rested helps; we'll guard against tired." },
        { label: "Whenever we can squeeze it in", emoji: "🌀", ack: "The squeeze — then the anchor move below will matter most of all." },
        { label: "Honestly, it's different every day", emoji: "🎲", ack: "Different every day — that's actually the first thing worth changing." },
      ],
      pickQuestion: "Pick one anchor to try this week:",
      picks: [
        { label: "same seat, same time, every day", emoji: "🪑" },
        { label: "the five-minute start deal", emoji: "⏱️" },
        { label: "phone parked in another room", emoji: "📵" },
        { label: "first question done together", emoji: "🤝" },
        { label: "a written list they cross off", emoji: "✅" },
      ],
    },
    outcomes: [
      {
        id: "start-delay",
        empathy: [
          "The snack, the bathroom, the suddenly-fascinating cat — that's rarely laziness. It's the size of the mountain: starting feels huge, so anything else feels urgent.",
          "You don't need to make your child braver. You need to make the mountain smaller.",
        ],
        strategy: {
          name: "The Shrunken Start",
          what: "Make the opening move so small it's hard to refuse — just the first five minutes, then a check-in. Momentum does the rest far more often than not.",
          why: [
            { label: "Five minutes only", benefit: "nobody negotiates hard against five minutes" },
            { label: "Momentum is real", benefit: "started work tends to keep going on its own" },
            { label: "Same time daily", benefit: "routine removes the daily decision to begin" },
          ],
        },
        close: {
          kind: "say",
          template:
            "The deal, said once: “Just the first five minutes, then check in with me.” Pair it with {pick} this week and starting stops being the fight.",
          encouragement: "The stall was never about the whole assignment — only the first bite.",
        },
        related: { slug: "weekly-executive-function-planner", title: "Weekly Executive Function Planner" },
      },
      {
        id: "start-unclear",
        empathy: [
          "“I don't know what to do” is sometimes a dodge — but surprisingly often it's the plain truth. Assignments live in five different places, and the fog is real.",
          "Clear the fog and you remove both the problem and the excuse in one move.",
        ],
        strategy: {
          name: "One Source of Truth",
          what: "Pick one place assignments live — planner, photo of the board, class site — and make checking it the official first step of homework. Then have them say the task back in their own words.",
          why: [
            { label: "One place to look", benefit: "no fog, no “I couldn't find it”" },
            { label: "Say it back", benefit: "if they can't restate it, that's the real task found" },
            { label: "First example together", benefit: "one worked problem unsticks most “I don't get it”s" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try this week: checking the one source is step one, saying the assignment back is step two — anchored by {pick}. Fog gone.",
          encouragement: "If the instructions are genuinely unclear most weeks, a short polite question to the teacher fixes it at the source.",
        },
        related: { slug: "weekly-executive-function-planner", title: "Weekly Executive Function Planner" },
      },
      {
        id: "focus-distractions",
        empathy: [
          "Here's the honest version: willpower loses to a buzzing phone almost every time — for adults too. Asking a kid to out-discipline a notification engine isn't a fair fight.",
          "So don't fix the kid. Fix the room, once.",
        ],
        strategy: {
          name: "Fix the Room",
          what: "Phones live in another room during homework — not face down, gone. One consistent workspot, a boringly clear desk, and siblings on a parallel quiet activity.",
          why: [
            { label: "Out of sight entirely", benefit: "a visible phone keeps part of the brain on call" },
            { label: "Same spot daily", benefit: "the place itself starts to say “work”" },
            { label: "Empty desk", benefit: "the 60-second clear-off is the whole setup" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try tonight: phone parked out of the room, desk cleared to just the assignment, and {pick} as the standing rule. Watch focus triple without a single lecture.",
          encouragement: "Environment beats willpower — you're just putting physics on your kid's side.",
        },
      },
      {
        id: "focus-drift",
        empathy: [
          "Drifting in a perfectly quiet room usually means one thing: the session is longer than the attention it's asking for. The tank empties, the mind wanders — that's fuel, not character.",
          "Shorter, visible stretches keep the engine running the whole way.",
        ],
        strategy: {
          name: "Sprints with Finish Lines",
          what: "Split homework into 10–20 minute sprints with a visible timer, each with one concrete finish line — these five problems, this paragraph. Real break between, up and moving.",
          why: [
            { label: "Matched to the tank", benefit: "sessions sized to real attention actually finish" },
            { label: "Concrete finish line", benefit: "vague sessions invite vague attention" },
            { label: "Moving breaks", benefit: "bodies that move refocus faster when they sit back down" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try tonight: one 15-minute sprint, one named finish line, one real break — with {pick} holding the frame. Crossing things off a list counts as fun; use it.",
          encouragement: "Two clean sprints beat one foggy hour, every single time.",
        },
        related: { slug: "weekly-executive-function-planner", title: "Weekly Executive Function Planner" },
      },
      {
        id: "frustration-hard",
        empathy: [
          "Some kids read difficulty as a verdict: hard means I'm not smart. So the moment something looks hard, the feelings arrive before the pencil does.",
          "What they're missing isn't ability — it's a script for the hard moment. Scripts are teachable.",
        ],
        strategy: {
          name: "The Hard-Moment Script",
          what: "Agree on a fixed first move for hard problems: read it twice, circle what you know, try one small step — then it's legal to skip and come back. The ritual replaces the panic.",
          why: [
            { label: "A script, not a feeling", benefit: "the frustrated moment gets a next move" },
            { label: "Skipping is legal", benefit: "one hard problem can't take the night hostage" },
            { label: "Praise the attempt", benefit: "“you tried a second way” builds the right muscle" },
          ],
        },
        close: {
          kind: "say",
          template:
            "When the wall appears: “Read it twice, circle what you know, try one step — then skip if you need to.” Run it alongside {pick} this week.",
          encouragement: "A stuck note to the teacher after a real try isn't giving up — it's exactly how learning is supposed to work.",
        },
        related: { slug: "tutoring-vs-school-services", title: "Tutoring vs. School Services: How to Decide" },
      },
      {
        id: "frustration-long",
        empathy: [
          "Frustration that builds partway through is usually a fuel gauge, not a character flaw — the session simply outlasted the tank. And tired plus surprised-by-length is a rough combination.",
          "You can't make assignments shorter. You can plan the fuel.",
        ],
        strategy: {
          name: "Break Before the Break-Down",
          what: "Schedule the break before the usual breaking point, not after — if things crack at thirty minutes, break at twenty, every time. Split big assignments across days when you can.",
          why: [
            { label: "Pre-emptive breaks", benefit: "you refuel before empty instead of after the sputter" },
            { label: "Two short sessions", benefit: "calm twice beats stormy once" },
            { label: "Medium-first ordering", benefit: "an early win buys patience for the hard part" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try this week: break at the twenty-minute mark on purpose, split the big stuff across two days, and keep {pick} as the frame.",
          encouragement: "If most nights still end in tears, that's information for the teacher — one honest note about how long homework really takes is worth a month of hard nights.",
        },
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
      "Every rushed morning has one true bottleneck — the stage where the wheels actually come off. Two quick questions and you'll get a strategy aimed at yours.",
    illo: "backpack",
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
    personal: {
      question: "So I can tailor this: who's running the morning shift at your house?",
      options: [
        { label: "Mostly just me", emoji: "🙋", ack: "Solo shift — then anything we move to the night before is a gift to morning-you." },
        { label: "Two adults tag-teaming", emoji: "🤝", ack: "A tag team — great; we'll make sure you're both running the same play." },
        { label: "An older sibling helps out", emoji: "🧒", ack: "A helper — perfect; kids often take a routine more seriously when a sibling holds it." },
        { label: "It changes day to day", emoji: "🎲", ack: "Rotating cast — then the routine itself has to be the constant, and it can be." },
      ],
      pickQuestion: "Pick tonight's prep move — the one thing that happens before bed:",
      picks: [
        { label: "clothes laid out, down to the socks", emoji: "👕" },
        { label: "bag packed and parked by the door", emoji: "🎒" },
        { label: "breakfast decided and set up", emoji: "🥣" },
        { label: "the leave-time posted where all can see", emoji: "⏰" },
        { label: "a checklist taped to the mirror", emoji: "📝" },
      ],
    },
    outcomes: [
      {
        id: "waking-late-night",
        empathy: [
          "A brutal wake-up that starts with a late bedtime isn't really a morning problem — the morning is just where the bill arrives. What happens at 9 p.m. decides what 7 a.m. feels like.",
          "So we'll fix tonight, not tomorrow.",
        ],
        strategy: {
          name: "Win It the Night Before",
          what: "Walk lights-out earlier in 15-minute steps each week, with screens off 30–60 minutes before bed and a short, identical wind-down. Small moves stick where big ones bounce back.",
          why: [
            { label: "Fifteen-minute steps", benefit: "gentle enough that nobody fights it" },
            { label: "Screens off first", benefit: "the glow is what's holding bedtime hostage" },
            { label: "Same wake time daily", benefit: "consistent mornings make earlier nights take hold" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try tonight: screens off thirty minutes earlier than usual, the same short wind-down, and {pick} before lights out. That's the whole first move.",
          encouragement: "Give it two weeks of small steps — the morning fixes itself from the other end.",
        },
      },
      {
        id: "waking-slow-riser",
        empathy: [
          "Some people just boot up slowly — you probably know an adult or two like this. Fighting a slow riser makes mornings worse; designing around one makes them calm.",
          "The goal isn't a faster kid. It's a longer runway.",
        ],
        strategy: {
          name: "The Runway",
          what: "Wake them fifteen minutes earlier than strictly needed and let the first stretch be undemanding — lights on, curtains open, nothing asked yet. Put the alarm across the room so standing happens once.",
          why: [
            { label: "Bought time", benefit: "fifteen quiet minutes replace fifteen frantic ones" },
            { label: "Light does the work", benefit: "a bright room is the strongest natural wake-up call" },
            { label: "A pleasant anchor", benefit: "warm breakfast or music gives the bed real competition" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try tomorrow: alarm across the room, curtains straight open, fifteen unhurried minutes — set up by doing {pick} tonight.",
          encouragement: "Slow risers don't speed up, but their mornings genuinely smooth out.",
        },
      },
      {
        id: "ready-clothes",
        empathy: [
          "Clothing friction is a decision problem happening at the worst possible hour, on a body that might genuinely find seams and collars annoying. Neither of those is defiance.",
          "Move the decision to the evening and the morning shrinks.",
        ],
        strategy: {
          name: "The Evening Wardrobe",
          what: "Choose tomorrow's outfit together the night before, down to the socks, from a small set of pre-approved comfortable options. Retire the genuinely itchy things without a fight.",
          why: [
            { label: "Decision relocated", benefit: "calm evening brains choose better than rushed morning ones" },
            { label: "Fewer options", benefit: "a small menu beats a full closet every time" },
            { label: "Comfort respected", benefit: "one retired itchy shirt buys weeks of peace" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try tonight: pick tomorrow's outfit together, socks included, and pair it with {pick}. The morning version of this conversation simply stops existing.",
          encouragement: "If your kid loves a race, “dressed before the song ends” works wonders — you know yours.",
        },
      },
      {
        id: "ready-reminders",
        empathy: [
          "When every step needs a prompt, the morning sequence lives in your head instead of theirs — you've accidentally become the checklist. Exhausting for you, and it teaches them nothing about the order.",
          "The fix: put the sequence on paper and let the paper nag.",
        ],
        strategy: {
          name: "The Mirror Checklist",
          what: "Make a short picture-or-word checklist of the morning steps, in order, posted where the routine happens. Walk it together for a week, then step back to a single prompt: “check your list.”",
          why: [
            { label: "The list nags, not you", benefit: "one prompt replaces a dozen reminders" },
            { label: "Same order daily", benefit: "sameness is what turns a list into a habit" },
            { label: "Their achievement", benefit: "finishing the list without you becomes a win they own" },
          ],
        },
        close: {
          kind: "say",
          template:
            "Your entire morning script from now on: “Check your list.” Set it up tonight along with {pick} — then catch them mid-success tomorrow.",
          encouragement: "“You did the whole list without me saying anything” is the sentence that makes it permanent.",
        },
        related: { slug: "weekly-executive-function-planner", title: "Weekly Executive Function Planner" },
      },
      {
        id: "door-stuff",
        empathy: [
          "Lost shoes at 7:58 is a storage problem wearing a kid-problem costume. Things that live nowhere in particular get found at the worst possible moment — that's just how objects work.",
          "Give everything that leaves the house one home, and the morning search dies.",
        ],
        strategy: {
          name: "The Launch Pad",
          what: "Set up one spot by the exit — a hook, a bin, a square of floor — where everything school-bound lives, packed the night before. A 60-second “pad check” before bed seals it.",
          why: [
            { label: "One home per object", benefit: "nothing to find because nothing is lost" },
            { label: "Packed at night", benefit: "morning carries zero decisions about stuff" },
            { label: "The pad check", benefit: "sixty seconds at night kills eight minutes of panic" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try tonight: claim the launch-pad spot together, load it — and add {pick} while you're at it. Tomorrow, everything's just… there.",
          encouragement: "Let one low-stakes forgotten item teach its own lesson sometime — it outperforms a month of reminders.",
        },
      },
      {
        id: "door-time",
        empathy: [
          "Families run late by planning backward from the school bell instead of forward from when the car has to move. “We're fine, we're fine, we're suddenly late” is exactly what that math feels like.",
          "One number fixes it: leave time.",
        ],
        strategy: {
          name: "The Leave-Time Anchor",
          what: "Name the leave time out loud, post it, and aim the whole morning at it — with one alarm ten minutes before as the wrap-it-up signal. Build in a quiet ten-minute buffer you tell no one about.",
          why: [
            { label: "One shared number", benefit: "everyone aims at the same target" },
            { label: "The warning alarm", benefit: "“wrap it up” arrives from a clock, not a parent" },
            { label: "The secret buffer", benefit: "absorbs the sock crisis without breaking the schedule" },
          ],
        },
        close: {
          kind: "say",
          template:
            "Tonight at dinner: “The car leaves at 7:40 — that's the number now.” Post it, set the wrap-up alarm, and do {pick} before bed.",
          encouragement: "Schedules with buffers bend; schedules without them shatter. Yours now bends.",
        },
      },
    ],
  },
  {
    slug: "big-feelings-after-school",
    title: "Big Feelings After School",
    description:
      "A guided walk through the after-school crash — why kids hold it together all day and let it out at home, and what helps.",
    intro:
      "Many kids spend the school day holding it together — and release it all in the first hour home, with the people they trust most. Two quick questions and you'll get a strategy matched to what you see.",
    illo: "calmcorner",
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
    personal: {
      question: "So I can tailor this: what's the first thing they usually reach for after school?",
      options: [
        { label: "Food — always food", emoji: "🍎", ack: "A snack-first kid — honestly, half the storm most days is hunger wearing a costume." },
        { label: "Quiet and their own space", emoji: "🤫", ack: "A recharger — alone time isn't rejection; it's how they refill." },
        { label: "Movement — they need to GO", emoji: "⚽", ack: "A mover — six hours of sitting still has a bill, and it's paid in motion." },
        { label: "You — they orbit you", emoji: "🤗", ack: "An orbiter — you're the safe place, which is exactly why you get the feelings." },
      ],
      pickQuestion: "Pick tomorrow's landing ritual — the same first stop, every day:",
      picks: [
        { label: "a snack already on the table", emoji: "🍎" },
        { label: "thirty minutes, zero questions", emoji: "🤫" },
        { label: "backyard or park before anything else", emoji: "⚽" },
        { label: "a side-by-side activity with you", emoji: "🧩" },
        { label: "the same warm greeting, then space", emoji: "👋" },
      ],
    },
    outcomes: [
      {
        id: "blowup-immediate",
        empathy: [
          "A storm that hits the second they walk in usually means one thing: they held it together all day — rules, patience, quiet — and you're the safe place where it's finally allowed out.",
          "Backwards as it feels, the blow-up is a compliment. Your first job isn't to fix it; it's to receive it gently and refuel them.",
        ],
        strategy: {
          name: "The Soft Landing Hour",
          what: "Meet them with food and a drink before anything else, and hold all questions and requests for the first thirty minutes. A predictable decompression slot — same spot, same options — does the rest.",
          why: [
            { label: "Fuel first", benefit: "hungry and tired is half the storm most days" },
            { label: "No questions yet", benefit: "even kind questions are demands to an empty tank" },
            { label: "Nearby, undemanding", benefit: "folding laundry in the room says “I'm here” best" },
          ],
        },
        close: {
          kind: "say",
          template:
            "If a wave comes anyway, keep it to eight words: “You had a big day. I'm here.” And tomorrow, the landing is {pick} — same time, no questions.",
          encouragement: "Any talk about how it went can wait for a calmer hour — and it will actually go better there.",
        },
      },
      {
        id: "blowup-demands",
        empathy: [
          "If the explosion arrives with the first request, the request itself isn't the problem — it's landing on an empty tank. Same ask at 4:30, after food and rest, often goes fine.",
          "So keep the expectations. Move the clock.",
        ],
        strategy: {
          name: "Move the Asks Later",
          what: "Shift homework, chores, and practice out of the first hour home, and post the afternoon order — snack, break, then homework — so the routine makes the ask instead of you.",
          why: [
            { label: "Same standards, new time", benefit: "a fed, rested kid can hear a request" },
            { label: "The routine asks", benefit: "a posted order argues less than a parent does" },
            { label: "A runway before the switch", benefit: "“ten more minutes of break” lands better than “now”" },
          ],
        },
        close: {
          kind: "say",
          template:
            "The heads-up that saves the afternoon: “Ten more minutes of break, then homework.” With {pick} as the standing first stop, the 3:30 fight mostly stops being scheduled.",
          encouragement: "One real choice inside the ask — which subject first, kitchen or desk — keeps some ownership in it.",
        },
        related: { slug: "weekly-executive-function-planner", title: "Weekly Executive Function Planner" },
      },
      {
        id: "withdrawn-fine",
        empathy: [
          "“Fine” isn't a wall — it's a kid with nothing left for conversation yet. Six hours of school used up the words, and the interview format (“how was your day?”) asks for more of exactly what ran out.",
          "Connection that doesn't require words usually gets words later.",
        ],
        strategy: {
          name: "Connect Sideways",
          what: "Swap the head-on questions for presence: sit nearby with a snack, no agenda. Use side-by-side settings — the car, a walk, cooking — where talking is optional, and let one small specific question come much later.",
          why: [
            { label: "Presence over probing", benefit: "silence together is still connection" },
            { label: "Side-by-side beats face-to-face", benefit: "most kids open up mid-activity, not mid-interview" },
            { label: "Specific and tiny", benefit: "“best thing at lunch?” beats “how was school?”" },
          ],
        },
        close: {
          kind: "say",
          template:
            "Much later, once: “What was the best thing at lunch?” Until then, {pick} is the whole plan — and share one line from your own day first; conversation is contagious.",
          encouragement: "The words come back on their schedule, not ours — and they come back faster to a parent who didn't chase them.",
        },
      },
      {
        id: "withdrawn-irritated",
        empathy: [
          "If questions tip into arguments, the questions are simply arriving before the recovery — you're knocking while the battery's still charging. Nobody's the villain in that scene.",
          "Protect a no-questions zone and the arguments mostly stop finding fuel.",
        ],
        strategy: {
          name: "The Question-Free Zone",
          what: "Declare the first half hour home question-free: greet, feed, and let them be, with their own choice of recovery. Then pick one reliably calmer window — dinner, the dog walk — and let that be where the day gets discussed.",
          why: [
            { label: "Space before talk", benefit: "recovery first makes conversation possible at all" },
            { label: "Their recovery, their pick", benefit: "alone time isn't rejection; it's refilling" },
            { label: "One calm window", benefit: "the day still gets talked about — just where it works" },
          ],
        },
        close: {
          kind: "say",
          template:
            "If irritation spills into rudeness, name it once and park it: “That tone doesn't work — we'll talk after dinner.” Then actually let it go until then, with {pick} as the daily buffer.",
          encouragement: "You're not lowering the bar on respect — you're moving the conversation to where respect is possible.",
        },
      },
      {
        id: "energy-collisions",
        empathy: [
          "A body that sat still and stayed quiet for six hours has real energy stored up — it's physics, not naughtiness. Unspent, it gets spent on the sofa, the walls, and the nearest sibling.",
          "Spent on purpose, it stops being spent on the furniture.",
        ],
        strategy: {
          name: "Give the Energy a Job",
          what: "Make active time the official first stop after school — before homework, not as a reward after — and aim it at a target: fifty kicks, an obstacle course, a race to the corner.",
          why: [
            { label: "First, not after", benefit: "movement as step one prevents the collisions entirely" },
            { label: "Aimed beats aimless", benefit: "energy with a target doesn't ricochet" },
            { label: "Separate the zones", benefit: "the wound-up kid and the quiet-seeking sibling get different spaces" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try tomorrow: {pick} is the official first stop — before the backpack even fully lands. Give the energy its job and watch the living room survive.",
          encouragement: "A protein-ish snack alongside steadies the hour in a way crackers alone never do.",
        },
      },
      {
        id: "energy-settling",
        empathy: [
          "Trouble settling at 5 p.m. usually traces straight back to energy that never got out at 3:30. The engine's still revving at dinner because nobody gave it a track earlier.",
          "Sequence the afternoon — big movement first, calmer steps after — and the evening lands itself.",
        ],
        strategy: {
          name: "Burn First, Then Land",
          what: "Schedule 30–45 minutes of real movement right after school, outside if possible, then step the evening down gradually: active play, dinner, quiet play, bed. Same order daily — bodies learn the staircase.",
          why: [
            { label: "Burn scheduled early", benefit: "settling problems get solved two hours before they start" },
            { label: "A visible switch", benefit: "same snack spot and table teach the transition" },
            { label: "Stairs, not a cliff", benefit: "nobody jumps straight from wild to calm — steps work" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try tomorrow: movement first with {pick} as the anchor, then the step-down — and keep screens out of the wind-down hour; they hold the engine revving right when you're landing it.",
          encouragement: "Two weeks of the same staircase and bedtime stops being a standoff.",
        },
      },
    ],
  },
  {
    slug: "report-card-conversations",
    title: "Report Card Conversations",
    description:
      "A guided walk through talking about a disappointing report card without shame — matched to how your child reacted.",
    intro:
      "A rough report card is one conversation, and how it goes shapes the whole next quarter. Two quick questions about how your child reacted, and you'll get an approach matched to it.",
    illo: "calmcorner",
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
    personal: {
      question: "So I can tailor this: when are calm conversations most likely at your house?",
      options: [
        { label: "In the car", emoji: "🚗", ack: "The car — no eye contact, nowhere to storm off to. Honestly the best conference room parents own." },
        { label: "Over food", emoji: "🍕", ack: "Over food — full mouths, lower guards. Good instinct." },
        { label: "At bedtime", emoji: "🌙", ack: "Bedtime — the day's armor is off. Keep it short and soft there." },
        { label: "Doing something together", emoji: "🧩", ack: "Side by side — hands busy, hearts open. That's the one." },
      ],
      pickQuestion: "Pick your one opener — the only line you'll lead with:",
      picks: [
        { label: "“What felt hardest this quarter?”", emoji: "💬" },
        { label: "“Walk me through that class.”", emoji: "🗺️" },
        { label: "“What would you change first?”", emoji: "🔧" },
        { label: "“How can I actually help?”", emoji: "🤝" },
        { label: "a snack and silence first, words later", emoji: "🤫" },
      ],
    },
    outcomes: [
      {
        id: "rc-defensive-shame",
        empathy: [
          "Defensiveness that's guarding embarrassment is armor, not attitude. They already know the grades are bad — the excuses are how they keep from drowning in that.",
          "Which means round one has one job: make the topic safe to touch. The grades can wait a day; the safety can't.",
        ],
        strategy: {
          name: "Curiosity Before Verdict",
          what: "Wait a day, then open with a question about their experience instead of the number. Pick one subject — ideally their pick — and keep the whole first conversation to that.",
          why: [
            { label: "A day's buffer", benefit: "the same talk goes completely differently tomorrow" },
            { label: "Experience, not evidence", benefit: "questions about them get answers; questions about grades get walls" },
            { label: "One subject only", benefit: "a whole-card project feels like drowning; one subject feels like a plan" },
          ],
        },
        close: {
          kind: "say",
          template:
            "Tomorrow, in your calm spot, lead with {pick} — then stop talking and let the silence work. One subject, one next step, done.",
          encouragement: "Praise the effort you actually saw this quarter, separately from any grade — effort is the lever they control.",
        },
      },
      {
        id: "rc-defensive-blame",
        empathy: [
          "When a kid genuinely believes the grade is unfair, arguing head-on just entrenches it — now you're the opposing counsel. And here's the thing: sometimes there's a real story in there worth hearing.",
          "So don't debate the belief. Walk toward the facts together and let them do the talking.",
        ],
        strategy: {
          name: "Follow the Story to the Facts",
          what: "Take the belief seriously first, then look at actual graded work side by side with real curiosity. Patterns show up fast — missing assignments, one question type, points lost at the end.",
          why: [
            { label: "Belief heard first", benefit: "a kid who feels heard stops bracing for the lecture" },
            { label: "The work speaks", benefit: "patterns on paper argue better than parents do" },
            { label: "Ask the source", benefit: "an email to the teacher about patterns settles it kindly" },
          ],
        },
        close: {
          kind: "say",
          template:
            "In your calm spot, start with {pick} — then pull out two or three actual assignments and just look together. Curiosity, not cross-examination.",
          encouragement: "Frame next quarter around things they control: work turned in, tests corrected, one question asked per week.",
        },
        related: { slug: "plan-builder", title: "Study Plan Builder" },
      },
      {
        id: "rc-discouraged-new",
        empathy: [
          "One rough quarter can quietly become “I'm bad at school” if nobody offers a different story — kids borrow the narrative the calmest adult in the room is telling.",
          "Your job is simple and important: keep the setback sized as a setback.",
        ],
        strategy: {
          name: "A Stretch, Not a Self",
          what: "Say the frame out loud — one rough quarter is information, not a verdict — then ask what changed this quarter and actually listen. New struggles usually have findable causes.",
          why: [
            { label: "The frame matters", benefit: "the story they tell about this quarter shapes the next one" },
            { label: "Causes are findable", benefit: "harder material, new teacher, busy season — something changed" },
            { label: "One visible win", benefit: "nothing rebuilds a discouraged kid like one grade moving" },
          ],
        },
        close: {
          kind: "say",
          template:
            "The sentence to say plainly, then follow with {pick}: “One rough quarter is information, not a verdict.” Then pick the one subject where a win is most reachable.",
          encouragement: "Notice effort weekly — the studying, the redone problems — before any grade shows up to judge it.",
        },
      },
      {
        id: "rc-discouraged-long",
        empathy: [
          "Discouragement that's been building for a while runs deeper than one report card, and it deserves more than a pep talk. Somewhere back there, school started feeling like a place they lose.",
          "The plan is small wins on purpose, adults aligned, and honest thought about extra help.",
        ],
        strategy: {
          name: "The Longer Runway",
          what: "Start with their story — when did school start feeling this way — then choose one subject and one small near-term goal: this unit's quiz, not this year's grade. Loop in that teacher so home and school pull together.",
          why: [
            { label: "Their story first", benefit: "the answer often relocates the real starting point" },
            { label: "Small enough to win", benefit: "reachable beats impressive for rebuilding belief" },
            { label: "Adults aligned", benefit: "a teacher who knows the goal can feed the win" },
          ],
        },
        close: {
          kind: "say",
          template:
            "In your calm spot, open with {pick} — then listen longer than feels natural. One subject, one small goal, one teacher in the loop.",
          encouragement: "If the pattern spans years and subjects, that's information, not failure — help that starts from where your child actually is can change the slope.",
        },
        related: { slug: "tutoring-vs-school-services", title: "Tutoring vs. School Services: How to Decide" },
      },
      {
        id: "rc-flat-avoids",
        empathy: [
          "Leaving the room is rarely indifference — it's usually a conversation that feels too big to have. The avoidance is the size of the thing, not the absence of caring.",
          "So shrink the conversation until it fits in a pocket.",
        ],
        strategy: {
          name: "One Question, Then Quiet",
          what: "Move the conversation sideways — car, walk, kitchen — ask exactly one question, and stop. Let silence do some of the work; a pause that feels long to you often ends with them filling it.",
          why: [
            { label: "Sideways, not across", benefit: "side-by-side reads as company; across a table reads as tribunal" },
            { label: "One question only", benefit: "twenty questions is why the room empties" },
            { label: "Real follow-through", benefit: "keeping “that's all I wanted” buys the next conversation" },
          ],
        },
        close: {
          kind: "say",
          template:
            "In your calm spot: {pick} — and then genuinely nothing else about grades that day. One subject, one step, conversation earned for next time.",
          encouragement: "Small and finished beats big and fled, every time.",
        },
      },
      {
        id: "rc-flat-dismisses",
        empathy: [
          "“Grades don't matter” is usually armor — and sometimes a test of whether you'll launch the lecture they've already heard. Debating whether grades matter in the abstract is a game nobody wins.",
          "Skip the debate. Connect one grade to something they already want.",
        ],
        strategy: {
          name: "Their Goals, Not Yours",
          what: "Ask about their actual goals first — the team, the game-design idea, the car — and listen longer than feels natural. Then draw one line from one goal back to one subject, once, without a speech.",
          why: [
            { label: "Their fuel", benefit: "eligibility rules and program requirements argue better than parents" },
            { label: "One line, no speech", benefit: "a single connection lands; a lecture bounces" },
            { label: "Watch for quiet effort", benefit: "dismissiveness fades when trying quietly starts paying" },
          ],
        },
        close: {
          kind: "say",
          template:
            "In your calm spot, skip grades entirely and open with {pick} aimed at their world — the team, the plan, the thing. The line back to one subject comes later, and only once.",
          encouragement: "Keep expectations concrete and small: work turned in, one subject moving. The abstract debate never needed winning.",
        },
      },
    ],
  },
  {
    slug: "parent-teacher-conference-prep",
    title: "Parent–Teacher Conference Prep",
    description:
      "A guided walk through getting real value from your conference — matched to the situation you're walking in with.",
    intro:
      "Conference slots are short and they go fast. Two quick questions, and you'll walk in with the right opener, the right materials, and a plan for what happens after.",
    illo: "backpack",
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
    personal: {
      question: "So I can pace this right: how much time do you actually get?",
      options: [
        { label: "Ten minutes or less", emoji: "⏱️", ack: "A speed round — then your opener has to earn its keep immediately." },
        { label: "Fifteen to twenty minutes", emoji: "⏳", ack: "A real slot — enough for one good thread followed properly." },
        { label: "A full sit-down", emoji: "🪑", ack: "Luxury! Still worth leading with your best question — depth beats coverage." },
        { label: "Not scheduled yet", emoji: "📅", ack: "Book it this week — slots vanish. The prep below works for any length." },
      ],
      pickQuestion: "Pick the one question you'll open with:",
      picks: [
        { label: "“What do you see most days — what's the pattern?”", emoji: "🔍" },
        { label: "“What's one thing we could do at home that would actually help?”", emoji: "🏠" },
        { label: "“When did you first notice the change?”", emoji: "📅" },
        { label: "“What would you try first, in our shoes?”", emoji: "💡" },
        { label: "“Where do you see them a year from now?”", emoji: "🌟" },
      ],
    },
    outcomes: [
      {
        id: "ptc-fine-depth",
        empathy: [
          "When things are fine, the conference risks being ten pleasant minutes of nothing. But you're sitting across from the one person who watches your child navigate a whole world you never see.",
          "Come with questions a report card can't answer, and this becomes the best ten minutes of the semester.",
        ],
        strategy: {
          name: "Ask What Grades Can't Tell You",
          what: "Bring three written questions about the student, not the scores: what do they do when something's hard, who do they work well with, where could they stretch. Ask about patterns, not moments.",
          why: [
            { label: "Written questions", benefit: "the clock can't erase what's on paper" },
            { label: "Patterns over anecdotes", benefit: "“most days” beats any single story in both directions" },
            { label: "The teacher's eye", benefit: "they'd know what to work on if it were their own kid — ask" },
          ],
        },
        close: {
          kind: "say",
          template:
            "Walk in, thank them for something specific you've noticed this year, then open with {pick}. Write down what they say — it signals you mean it.",
          encouragement: "Agree on one channel for follow-up before you leave, and this meeting keeps paying for months.",
        },
      },
      {
        id: "ptc-fine-next",
        empathy: [
          "“What should we work on?” usually gets a vague, kind answer — not because teachers don't know, but because the question is too big for the slot.",
          "Shape it, and you'll leave with something you can actually do on Tuesday.",
        ],
        strategy: {
          name: "Leave With One Thing",
          what: "Aim the whole meeting at leaving with exactly one concrete next thing — the word “one” does real work. Then ask where your child could stretch that school doesn't have time for.",
          why: [
            { label: "One beats ten", benefit: "a single named action survives the drive home; a list doesn't" },
            { label: "The stretch question", benefit: "enrichment that doesn't duplicate class comes from here" },
            { label: "A check-in date", benefit: "“I'll email at midterm” turns a chat into a plan" },
          ],
        },
        close: {
          kind: "say",
          template:
            "Your opener: {pick}. When they answer, write it down, pick the one thing, and name your check-in date out loud before you stand up.",
          encouragement: "One thing, actually done, beats five things nodded at — every semester.",
        },
      },
      {
        id: "ptc-slip-theory",
        empathy: [
          "Having a theory is useful — leading with it isn't. Open with your explanation and the teacher spends the slot reacting to you instead of describing what they actually see.",
          "Hold the theory back a few minutes and it becomes twice as useful.",
        ],
        strategy: {
          name: "Describe First, Theory Second",
          what: "Open wide — “what are you seeing?” — and let them paint the picture before you show yours. Then offer the theory as a question, with two or three work samples on the table, including one good week.",
          why: [
            { label: "Their picture first", benefit: "unprimed observations are the honest ones" },
            { label: "Theory as a question", benefit: "“does that match what you see?” invites truth, not defense" },
            { label: "Good week included", benefit: "comparing a good week to a bad one locates the change" },
          ],
        },
        close: {
          kind: "say",
          template:
            "Open with {pick}, listen all the way out, then: “We wondered if it's ___ — does that match?” Leave with one step each — one thing home tries, one thing school tries.",
          encouragement: "Compare notes in three weeks on one agreed channel — slipping grades respond to loops, not one-off meetings.",
        },
      },
      {
        id: "ptc-slip-mystery",
        empathy: [
          "Not knowing why is actually a fine place to start — you're walking in as a detective, not a defendant, and the conference is exactly the right tool for the job.",
          "Structure the questions and the picture assembles fast.",
        ],
        strategy: {
          name: "The Detective's Three",
          what: "Ask the timeline first — when did you notice the change — then the shape of the loss: missing work, low tests, or fading participation. Each answer points somewhere different. Resist solving it in the room.",
          why: [
            { label: "Timeline first", benefit: "slipping-since-November tells a different story than since-day-one" },
            { label: "Shape of the loss", benefit: "missing work, low tests, and quiet participation have different fixes" },
            { label: "Collect, don't conclude", benefit: "deciding at home, with your child in it, beats deciding in ten minutes" },
          ],
        },
        close: {
          kind: "say",
          template:
            "Open with {pick}, then follow the thread: “Is it missing work, tests, or participation?” Thank them, take it home, and decide with your child in the conversation.",
          encouragement: "You'll walk out with the why half-found — which is the whole meeting's job done.",
        },
        related: { slug: "toolkits/report-card-conversations", title: "Report Card Conversations" },
      },
      {
        id: "ptc-concern-known",
        empathy: [
          "If the teacher likely already knows, then raising it isn't the win — you'd be announcing the weather to a meteorologist. The win is converting shared awareness into a shared plan with dates on it.",
          "Skip the diplomatic wind-up entirely.",
        ],
        strategy: {
          name: "From Concern to Calendar",
          what: "Name it plainly, ask what's been tried in class and how it went, then agree on one step at school and one at home — small enough to actually happen this month, with a check-in date set before you leave.",
          why: [
            { label: "Plain naming", benefit: "shared concerns don't need paragraphs of runway" },
            { label: "Join, don't start", benefit: "asking what's been tried respects the work in progress" },
            { label: "Dates or it dissolves", benefit: "who reaches out, which channel, what day — say it aloud" },
          ],
        },
        close: {
          kind: "say",
          template:
            "Skip the wind-up: “I want to talk about the reading — what are you seeing?” Then {pick} as your follow-up, and a date on the calendar before you stand.",
          encouragement: "Plans without dates are wishes — yours has one now.",
        },
      },
      {
        id: "ptc-concern-new",
        empathy: [
          "Bringing a teacher something they haven't seen is delicate — the same sentence can land as information or as accusation, and the difference decides the whole year's partnership.",
          "You're not filing a complaint. You're handing them a puzzle piece from home.",
        ],
        strategy: {
          name: "The Puzzle Piece",
          what: "Frame it as what you see at home — “homework takes two hours and ends in tears” — with a work sample or a week's time log as gentle evidence. Then ask genuinely what they see at school.",
          why: [
            { label: "Home data, not verdicts", benefit: "“what we see” travels; “what you're doing wrong” doesn't" },
            { label: "Concrete evidence", benefit: "one time log beats ten adjectives" },
            { label: "The mismatch matters", benefit: "the same kid looking different at school is itself the finding" },
          ],
        },
        close: {
          kind: "say",
          template:
            "Deliver the piece, then hand over the pen: {pick} — and let their answer shape the plan. Two-week check-in, one channel, agreed before you leave.",
          encouragement: "“What would you try first?” gets you their best thinking instead of their defense.",
        },
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
    illo: "timer",
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
    personal: {
      question: "So I can pace this: when's the next big test?",
      options: [
        { label: "This week", emoji: "😬", ack: "This week — okay, we go straight to the night-before and morning moves." },
        { label: "A couple of weeks out", emoji: "📅", ack: "Two weeks — enough runway to practice the routine before it counts." },
        { label: "Over a month away", emoji: "🌱", ack: "A month-plus — perfect; rehearsed routines beat invented-on-the-day ones." },
        { label: "It's a big one — state test or SAT", emoji: "🎓", ack: "A big-stakes one — same moves, plus the tools below are built for exactly this." },
      ],
      pickQuestion: "Pick tonight's move:",
      picks: [
        { label: "pack the bag together", emoji: "🎒" },
        { label: "set the review-ends-at-dinner rule", emoji: "🍽️" },
        { label: "practice the 30-second skip rule", emoji: "⏭️" },
        { label: "write the morning script on a sticky note", emoji: "📝" },
        { label: "plan the normal-dinner debrief", emoji: "🍕" },
      ],
    },
    outcomes: [
      {
        id: "td-nerves-night",
        empathy: [
          "Night-before nerves feed on open loops — the unpacked bag, the unfinished review, the unknowns about tomorrow. Every open loop is another tab the mind keeps refreshing at 10 p.m.",
          "Close the loops and the evening gets quieter on its own. No pep talk required.",
        ],
        strategy: {
          name: "Close Every Loop",
          what: "Run an identical night-before routine for every test: bag packed, materials ready, review ends by dinner, early night. Swap reassurance for logistics — “your bag's ready” closes topics that “you'll do great” reopens.",
          why: [
            { label: "Sameness is the message", benefit: "an identical routine says “this is handled”" },
            { label: "Review ends at dinner", benefit: "late cramming trades real points (sleep) for imaginary ones" },
            { label: "Logistics over reassurance", benefit: "closed topics can't be re-worried" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try it tonight: {pick}, then the same wind-down as any school night. Send tomorrow's script ahead: “You've done the work — go run the plan.”",
          encouragement: "Your calm is contagious — finish the checklist together and then genuinely sit down.",
        },
      },
      {
        id: "td-nerves-room",
        empathy: [
          "Freezing mid-test needs a plan that lives inside the room — where you aren't. Anything that works has to be small enough to carry in and automatic enough to fire under pressure.",
          "That means practicing it at home, on ordinary homework, before it ever matters.",
        ],
        strategy: {
          name: "The Pocket Reset",
          what: "Teach one reset — slow breath, drop the shoulders, reread just the current question — plus the skip rule: stuck for thirty seconds, mark it, move on. Rehearse both during homework so test day isn't their debut.",
          why: [
            { label: "Small enough to carry", benefit: "a three-step reset survives pressure; a strategy list doesn't" },
            { label: "Permission to skip", benefit: "granted by a parent in advance, it's surprisingly powerful" },
            { label: "Easiest question first", benefit: "one early win beats dread better than any pep talk" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try tonight: {pick}, and rehearse the reset once during regular homework — breath, shoulders, reread. At the door tomorrow: eight words, no new advice.",
          encouragement: "Afterward, debrief the strategy, not the score: “Did the reset help?” builds a tool they keep forever.",
        },
      },
      {
        id: "td-underprep-plan",
        empathy: [
          "Some kids put off studying because nobody ever showed them what a study plan actually looks like — “go study” is like “go cook” to someone who's never seen a recipe.",
          "Build one together once, and you're handing over a tool, not a lecture.",
        ],
        strategy: {
          name: "Backwards From Test Day",
          what: "Count back from the test together: what's left, how many evenings, what fits where. Split the material into small named chunks — “unit 3 vocab,” “chapter 5 problems” — and give each a day.",
          why: [
            { label: "The calendar does the math", benefit: "ten minutes of counting removes the mystery" },
            { label: "Named chunks start", benefit: "“study science” doesn't; “unit 3 vocab” does" },
            { label: "Hardest first, lightest last", benefit: "the night before becomes review, not rescue" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try tonight: fifteen minutes with a calendar, chunks on paper, then {pick}. Next test, they build it and you just admire it.",
          encouragement: "The free tools below do exactly this walk-through if you'd like the guided version.",
        },
        related: { slug: "sat-schedule", title: "SAT Schedule Builder" },
      },
      {
        id: "td-underprep-delay",
        empathy: [
          "A plan that never starts isn't a planning problem — it's a starting problem. The plan sits there, perfectly reasonable, while the first fifteen minutes never quite arrive.",
          "So make day one laughably small, and guard the streak like treasure.",
        ],
        strategy: {
          name: "The Streak",
          what: "Set a daily fifteen-minute study anchor at the same time each day, opened with the five-minute deal: just five, then decide. Track the chain visibly — an X per day — and let stubbornness switch sides.",
          why: [
            { label: "The clock starts it", benefit: "same-time-daily removes the negotiation" },
            { label: "Five-minute deal", benefit: "almost everyone keeps going once the notebook is open" },
            { label: "Visible chain", benefit: "by week two, the streak itself is the motivation" },
          ],
        },
        close: {
          kind: "say",
          template:
            "The deal, once: “Just the first five minutes, then decide.” Start tonight with {pick}, phone in another room, X on the calendar after.",
          encouragement: "For a stuck topic, the free Study Coach below turns “I don't know where to start” into a two-week plan in five minutes.",
        },
        related: { slug: "study-coach", title: "Study Coach" },
      },
      {
        id: "td-careless-rush",
        empathy: [
          "Rushing isn't a character flaw — it's a habit of treating “done” as the finish line. The last answer gets written and the pencil drops, points still sitting on the table.",
          "Move the finish line to “checked” and the points come home.",
        ],
        strategy: {
          name: "Checking Is a Step",
          what: "During homework, budget the last tenth of the time for checking — every time, as a scheduled step, not a thing done if there's time. Build a three-line checklist from their actual mistakes.",
          why: [
            { label: "Practiced at home", benefit: "checking rehearsed on homework shows up at tests uninvited" },
            { label: "Their own checklist", benefit: "three lines from their real mistakes beat ten generic rules" },
            { label: "Paced on purpose", benefit: "finishing with five minutes to spare is a trainable skill" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try tonight: {pick}, and on the next homework, stop with 10% of the time left and run the checklist. That's the whole rep.",
          encouragement: "Debrief after tests without interrogation — “how did the pacing feel?” — then let the graded copy teach.",
        },
      },
      {
        id: "td-careless-misread",
        empathy: [
          "Misread questions lose points at the very first step — which, silver lining, is also the cheapest place to fix them. The whole game is owning the question before answering it.",
          "And the same traps repeat forever: the FALSE that read as true, the units, the second part of a two-part ask.",
        ],
        strategy: {
          name: "Own the Question First",
          what: "Teach question-first reading: underline what's actually being asked before starting any work, and practice restating it in their own words on homework. Keep a little log of misread traps and reread it weekly.",
          why: [
            { label: "Underline the ask", benefit: "the answer can't drift from a question that's pinned down" },
            { label: "The restate test", benefit: "if they can't say it back, that's the discovery — made cheaply" },
            { label: "Traps repeat", benefit: "naming a trap once is half of never falling for it again" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try tonight: {pick}, then one homework problem with the underline-and-restate move, just to feel it. The log starts with the next miss.",
          encouragement: "After the test, one gentle question: “Any questions that turned out to be asking something different?” Naming it is the fix.",
        },
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
    illo: "booknook",
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
    personal: {
      question: "So I can fit this to real life: what does a typical summer weekday look like?",
      options: [
        { label: "Camp or a program most days", emoji: "🏕️", ack: "Camp days — then the anchor lives in the morning or the evening edge, and stays tiny." },
        { label: "Home with a parent", emoji: "🏠", ack: "Home base — you've got the most flexibility and the most negotiating, so the routine matters double." },
        { label: "A mix of sitters and family", emoji: "🧩", ack: "The patchwork — then the anchor has to be simple enough that any adult can hold it." },
        { label: "Older kid, mostly self-directed", emoji: "🎧", ack: "Self-directed — then they should co-design this, or it simply won't happen." },
      ],
      pickQuestion: "Pick this week's 20-minute anchor:",
      picks: [
        { label: "after-breakfast reading", emoji: "📚" },
        { label: "a real-world math job (recipes, budgets)", emoji: "🧮" },
        { label: "project time on their thing", emoji: "🔨" },
        { label: "a library run and free pick", emoji: "🏛️" },
        { label: "their choice, posted on the fridge", emoji: "📌" },
      ],
    },
    outcomes: [
      {
        id: "sl-fresh-fight",
        empathy: [
          "Summer fights about practice are usually about two things: size and surprise. Twenty minutes that appears at random feels like an ambush; an hour feels like school in disguise.",
          "Make it tiny, make it same-time, and make the clock the messenger — the fight loses its fuel.",
        ],
        strategy: {
          name: "The Tiny Fixed Anchor",
          what: "One 20-minute block, same time daily — right after breakfast works best — where the time is non-negotiable but the menu is theirs: reading, math practice, a project. Never extend a session that went well.",
          why: [
            { label: "The clock starts it", benefit: "routines don't negotiate; parents get dragged into it" },
            { label: "Their menu", benefit: "choice inside the container buys cooperation" },
            { label: "Twenty means twenty", benefit: "trust in the end time is what makes tomorrow easy" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try this week: the anchor is {pick}, same time every day, and when the timer ends, it ends — even mid-sentence, even going well.",
          encouragement: "Fold the rest into real life where nobody can call it school — recipe math, trip budgets, the game rulebook read aloud.",
        },
      },
      {
        id: "sl-fresh-drift",
        empathy: [
          "Plans that rely on remembering die quietly by mid-July — not from resistance, just from summer. Nobody fought it; it just never happened, again.",
          "The fix isn't more resolve. It's attaching the plan to something that already happens every single day.",
        ],
        strategy: {
          name: "Piggyback the Habit",
          what: "Anchor twenty minutes to a fixed daily event — after breakfast, before screens unlock — so the sequence does the remembering. Track it with a paper chain of X's where everyone can see it.",
          why: [
            { label: "Breakfast never forgets", benefit: "attached habits inherit the reliability of their host" },
            { label: "The visible chain", benefit: "by week three the streak itself is the reason" },
            { label: "Environment stacked", benefit: "books in the car and bathroom quietly beat intentions" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try this week: {pick}, glued to breakfast, X on the calendar after. That's the entire system — the sequence remembers so nobody has to.",
          encouragement: "Give reading full autonomy inside it — graphic novels, sports bios, rereads all count. Voluntary is the whole game.",
        },
        related: { slug: "toolkits/reading-at-home", title: "Reading at Home" },
      },
      {
        id: "sl-catchup-clear",
        empathy: [
          "Known gaps are actually the good version of this problem — you can aim at them. The risk now is the opposite one: catch-up quietly eating the whole summer and returning a resentful kid in September.",
          "So run a real campaign, with real edges.",
        ],
        strategy: {
          name: "The Bounded Campaign",
          what: "Turn the gaps into a schedule — 30–45 focused weekday minutes, mornings if you can, weekends off — starting with the earliest gap, since this year's confusion usually stands on last year's shaky topic.",
          why: [
            { label: "Capped on purpose", benefit: "sustained beats heroic across ten weeks" },
            { label: "Earliest gap first", benefit: "fixing the foundation fixes floors above it" },
            { label: "A mid-summer checkpoint", benefit: "one practice quiz in late July steers the second half" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try this week: the campaign runs weekday mornings, {pick} holds the routine, and weekends are genuinely, loudly off.",
          encouragement: "The free Plan Builder below turns the actual grades into the weekly schedule in a few minutes.",
        },
        related: { slug: "plan-builder", title: "Study Plan Builder" },
      },
      {
        id: "sl-catchup-fuzzy",
        empathy: [
          "“Behind” is a feeling until you check — and summers get spent on the feeling all the time: a workbook of everything, covering nothing twice.",
          "Spend the first week finding the real gaps. It's the highest-value week of the whole summer.",
        ],
        strategy: {
          name: "Look Before You Launch",
          what: "Gather the evidence you already have — final report card, teacher comments, the last few tests — and circle what repeats. Then ask your child where it got hard; kids usually know the exact chapter.",
          why: [
            { label: "The evidence exists", benefit: "June's paperwork already names most of the gaps" },
            { label: "Kids know", benefit: "“where did it get hard?” has startlingly precise answers" },
            { label: "A light skills check", benefit: "twenty minutes of grade-level practice beats a month of guessing" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try this week: one evening with the report card and a highlighter, one conversation, and {pick} as the daily rhythm while you look.",
          encouragement: "Then aim at the two or three real gaps and let the rest of summer be summer — the Plan Builder below does the scheduling.",
        },
        related: { slug: "plan-builder", title: "Study Plan Builder" },
      },
      {
        id: "sl-ahead-theirs",
        empathy: [
          "A kid who wants to get ahead is a gift — and the fastest way to break it is to formalize it into assignments. Hunger needs fuel and room, not a syllabus.",
          "Your job is supply lines and an audience. Not management.",
        ],
        strategy: {
          name: "Fuel, Don't Manage",
          what: "Ask what they want to build, master, or find out — then resource it: library runs, one good kit or course, a corner of the table that doesn't get cleared. Shape it toward one showable thing by August.",
          why: [
            { label: "An artifact sustains", benefit: "a model, a game, a garden — something to show keeps momentum" },
            { label: "The skill underneath", benefit: "twenty daily minutes on the math under the coding compounds" },
            { label: "Audience, not inspector", benefit: "ask to be shown, never to check — it stays theirs" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try this week: name the August artifact together, then protect {pick} as the daily fuel line. Then get out of the way, admiringly.",
          encouragement: "Being taken seriously about their own project is the most motivating thing you can give a hungry kid.",
        },
      },
      {
        id: "sl-ahead-mine",
        empathy: [
          "When getting ahead is the parent's goal, honesty is the design requirement — kids smell a stealth curriculum instantly, and resentment compounds faster than learning does.",
          "Name the deal plainly, keep it light, and put the payoff where they can feel it.",
        ],
        strategy: {
          name: "The Honest Deal",
          what: "Twenty to thirty focused weekday minutes, and the rest of the day is genuinely theirs — they pick the subject and the time slot; you hold only the that-it-happens. Preview next year rather than racing through it.",
          why: [
            { label: "Clear edges", benefit: "a named deal prevents daily renegotiation" },
            { label: "Preview, don't finish", benefit: "knowing September's first month builds confidence without burning material" },
            { label: "Choice for buy-in", benefit: "their subject, their slot — your only rule is that it happens" },
          ],
        },
        close: {
          kind: "say",
          template:
            "The deal, said once: “Twenty minutes on weekdays — you pick what and when — and the payoff is walking into algebra already knowing the first month.” Then {pick} makes it real.",
          encouragement: "Watch for the burnout tells — dread, bargaining, dawdling that outlasts the session — and halve the load for a week rather than push through.",
        },
      },
    ],
  },
  {
    slug: "reading-at-home",
    title: "Reading at Home",
    description:
      "A guided walk through growing a reader at any age — matched to elementary, middle, or high school.",
    intro:
      "The goal at every age is the same — a kid who reads because they want to — but the moves change as they grow. Two quick questions and you'll get strategies that fit.",
    illo: "booknook",
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
    personal: {
      question: "So I can pick the right bait: what's their current obsession?",
      options: [
        { label: "Sports", emoji: "⚽", ack: "A sports kid — perfect; sports writing is a whole secret library." },
        { label: "Games and screens", emoji: "🎮", ack: "A gamer — good news: game guides, manga, and LitRPG are all reading." },
        { label: "Animals and nature", emoji: "🐾", ack: "An animal kid — nonfiction shelves were built for this one." },
        { label: "Making and building", emoji: "🔨", ack: "A maker — how-to books and maker magazines count completely." },
      ],
      pickQuestion: "Pick the first book bait to try this week:",
      picks: [
        { label: "a sports bio or almanac", emoji: "⚽" },
        { label: "a game guide or manga", emoji: "🎮" },
        { label: "animal nonfiction with great photos", emoji: "🐾" },
        { label: "a graphic novel", emoji: "📖" },
        { label: "an audiobook for the car", emoji: "🎧" },
      ],
    },
    outcomes: [
      {
        id: "ra-elem-readaloud",
        empathy: [
          "First, the reframe: loving read-alouds is a strength, not a stall. Listening comprehension runs years ahead of decoding, and the couch ritual is where the love of stories actually lives.",
          "So don't retire it — there is no “too old.” Build a gentle bridge beside it instead.",
        ],
        strategy: {
          name: "The Page-Trade Bridge",
          what: "Keep the read-aloud, but trade pages inside it — you read a page, they read a paragraph — and rebalance gradually. Start a series together aloud, then leave the next book “accidentally” available.",
          why: [
            { label: "The ritual stays", benefit: "the bridge is shared, so it never feels like losing something" },
            { label: "Series momentum", benefit: "needing to know what happens is the strongest engine there is" },
            { label: "Easy solo wins", benefit: "below-level books and rereads make alone-reading feel like coasting" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try this week: trade pages tonight, and plant {pick} somewhere findable. Ask story questions, never quiz questions.",
          encouragement: "“Would you have done what she did?” keeps books a conversation, not a test.",
        },
      },
      {
        id: "ra-elem-avoids",
        empathy: [
          "A young book-avoider usually finds books effortful, boring, or both — and every forced session confirms the theory. The way back in is never through the front door.",
          "Attack both problems at once: easier entry, higher interest, zero pressure.",
        ],
        strategy: {
          name: "Follow the Obsession",
          what: "Whatever they love — dinosaurs, gaming, jokes — meet it in print, in whatever format: comics, guides, joke books. Keep reading aloud daily regardless, and salt the house with easy wins.",
          why: [
            { label: "Topic recruits", benefit: "the format never matters; the obsession does" },
            { label: "Ears keep growing", benefit: "daily read-alouds build comprehension while the eyes catch up" },
            { label: "Found minutes", benefit: "three minutes with a joke book at breakfast beats twenty forced ones" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try this week: {pick} left where they'll trip over it, a library card of their own, and no vetoes on what they pick with it.",
          encouragement: "If avoiding looks like real struggle — guessing at words, exhaustion after a page — ask the teacher what they see; effort problems and skill problems need different help.",
        },
      },
      {
        id: "ra-mid-screens",
        empathy: [
          "Screens win because they're instant and everywhere — it's a convenience war, not a character one. Lecturing about the value of books loses to a device that's already in their hand.",
          "So compete on convenience, and let the algorithm tell you what they love.",
        ],
        strategy: {
          name: "Match the Convenience",
          what: "Put books where the phone lives — bed, backpack, car — and source them from what the screen already revealed: highlights watcher gets sports bios, anime kid gets manga. Audiobooks count completely.",
          why: [
            { label: "Arm's-length war", benefit: "the book that's there beats the book that's better" },
            { label: "The algorithm scouted", benefit: "their feed is a reading-interest report, free" },
            { label: "Sequel ready", benefit: "dead time between books is where screens win the rematch" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try this week: {pick} placed exactly where the phone usually sits, plus one screen-free 20 minutes before lights-out — with your own book open too.",
          encouragement: "Modeled beats mandated at this age, every time.",
        },
      },
      {
        id: "ra-mid-boring",
        empathy: [
          "“Books are boring” almost always translates to “the books adults keep handing me are boring” — a complaint about the menu, not the restaurant.",
          "The fix is range, real choice, and a little cunning.",
        ],
        strategy: {
          name: "The Five-Book Flight",
          what: "Bring home a wild variety — graphic novels, horror, sports pages, world records, anything — and ask for ten pages of each. Keep whatever survives; return the rest without comment.",
          why: [
            { label: "A taste, not a commitment", benefit: "ten pages is a fair trial nobody dreads" },
            { label: "Blown-open menu", benefit: "reading is reading — lyrics, recipes, and manga all count" },
            { label: "Peer-sourced picks", benefit: "the cousin's favorite outrates the parent's classic" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try this week: build the flight with {pick} as one of the five, run the ten-page trials, and let the survivors stay.",
          encouragement: "Talk about your own reading at dinner — the twist you didn't see coming. Curiosity is contagious; assignments aren't.",
        },
      },
      {
        id: "ra-high-anything",
        empathy: [
          "A high schooler who doesn't read for pleasure isn't a lost cause — they're busy, tired, and unconvinced. Respect all three and you're most of the way in.",
          "Win on relevance, and hand them formats that fit an actual teenage life.",
        ],
        strategy: {
          name: "Meet Their Actual Life",
          what: "Connect books to what they already care about — the sport, the show, the career interest — in formats that finish: audiobooks in the car, long-form articles, essay collections. Home stays assignment-free.",
          why: [
            { label: "Relevance converts", benefit: "a pro athlete's memoir has started more reading lives than most classics" },
            { label: "Finishable formats", benefit: "short and real beats long and noble for a tired teenager" },
            { label: "Opinion bait", benefit: "teenagers will absolutely read to settle an argument" },
          ],
        },
        close: {
          kind: "say",
          template:
            "The opener that works: “Someone said this is overrated — settle it for me,” handed over with {pick}. Then genuinely drop it.",
          encouragement: "School owns required reading; keep home the voluntary kind, and it has a chance.",
        },
      },
      {
        id: "ra-high-deepen",
        empathy: [
          "A high schooler who already reads doesn't need monitoring — they need peers, ideas, and next doors to walk through. Think fellow reader, not supervisor.",
          "The deepening happens in conversation, not in oversight.",
        ],
        strategy: {
          name: "The Fellow Reader",
          what: "Read what they read sometimes — one shared book a semester turns dinner into a book club without calling it one — and open the adult shelves: journalism, memoir, the novels people argue about.",
          why: [
            { label: "Shared text, real talk", benefit: "“was the ending earned?” is where the deepening lives" },
            { label: "The compliment of adult books", benefit: "being handed a grown-up book is a promotion they notice" },
            { label: "The pipeline", benefit: "the author's other books and the essay behind the novel keep doors opening" },
          ],
        },
        close: {
          kind: "try",
          template:
            "Try this week: pick the shared book together — {pick} is a fine place to start — and ask one idea question when you're both partway in.",
          encouragement: "“Who was right?” at the dinner table does more than any reading log ever did.",
        },
      },
    ],
  },
];

export function getToolkit(slug: string): Toolkit | undefined {
  return TOOLKITS.find((t) => t.slug === slug);
}
