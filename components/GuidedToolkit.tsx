"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChatFrame, ChatIcon, Chip, useCoachChat } from "@/components/CoachChat";
import type { Toolkit, ToolkitOutcome } from "@/app/resources/toolkits/toolkits";

// Leading emoji for branch-question chips, matched from the option's wording.
// Personalization and pick chips carry their emoji in the data instead.
const EMOJI_RULES: [RegExp, string][] = [
  [/tears|blow-up|yelling|big reactions/i, "😢"],
  [/negotiation|five more/i, "🤝"],
  [/warning/i, "⚠️"],
  [/screen actually goes off/i, "📴"],
  [/give in more often/i, "🏳️"],
  [/hold the line/i, "🛡️"],
  [/ignored/i, "🙉"],
  [/game or episode|mid-stream/i, "📺"],
  [/even after several reminders/i, "🔁"],
  [/getting started/i, "🚀"],
  [/staying focused/i, "🎯"],
  [/frustration/i, "😖"],
  [/delay — snacks/i, "🐢"],
  [/don't know what/i, "❓"],
  [/distractions — phone/i, "📱"],
  [/drift off/i, "💭"],
  [/looks hard/i, "🧗"],
  [/longer than expected/i, "⏳"],
  [/waking up/i, "😴"],
  [/dressed and ready|choosing, changing/i, "👕"],
  [/out the door/i, "🚪"],
  [/every single step needs a reminder/i, "🔔"],
  [/bed too late/i, "🌙"],
  [/surfaces very slowly/i, "🐌"],
  [/stuff — shoes/i, "🎒"],
  [/time — we're fine/i, "⏰"],
  [/grumpy|one-word/i, "😶"],
  [/wild|bouncing/i, "⚡"],
  [/walk in — it's immediate/i, "🏠"],
  [/asked of them|homework, chores/i, "📝"],
  [/fine\.?” conversation over/i, "🤐"],
  [/irritation or an argument/i, "😠"],
  [/siblings, furniture/i, "💥"],
  [/trouble settling/i, "🌀"],
  [/tiny/i, "🌋"],
  [/defensive — excuses/i, "🛡️"],
  [/discouraged/i, "😔"],
  [/a shrug/i, "🤷"],
  [/can't face it/i, "🙈"],
  [/isn't their fault/i, "👉"],
  [/one rough stretch/i, "📉"],
  [/building for a while/i, "🕰️"],
  [/changes the subject/i, "💨"],
  [/grades don't matter/i, "😐"],
  [/things seem fine/i, "🙂"],
  [/grades are slipping/i, "📉"],
  [/specific concern/i, "❗"],
  [/beyond grades/i, "🔍"],
  [/work on next/i, "🧭"],
  [/i have a theory/i, "💡"],
  [/need to find out/i, "🕵️"],
  [/probably already knows/i, "🤝"],
  [/news to them/i, "📣"],
  [/nerves —/i, "😬"],
  [/underprepared/i, "⏳"],
  [/careless —/i, "✏️"],
  [/night before/i, "🌙"],
  [/in the room/i, "🧊"],
  [/plan the studying/i, "🗓️"],
  [/put it off/i, "🐢"],
  [/rushing to finish/i, "🏃"],
  [/misreading/i, "👀"],
  [/keep skills fresh/i, "🌿"],
  [/catch up/i, "🪜"],
  [/get ahead/i, "🚀"],
  [/daily fight/i, "🥊"],
  [/never happens/i, "🌫️"],
  [/very — we know/i, "🎯"],
  [/fuzzy/i, "❓"],
  [/they're hungry/i, "🔥"],
  [/wasted summer/i, "🙋"],
  [/elementary school/i, "🎒"],
  [/middle school/i, "🚲"],
  [/high school/i, "🎓"],
  [/resists reading alone/i, "🛋️"],
  [/avoids books/i, "🙈"],
  [/screens won/i, "📱"],
  [/books are boring/i, "🥱"],
  [/reading anything at all/i, "📖"],
  [/deepen what they already do/i, "📚"],
];

function emojiFor(label: string): string {
  for (const [pattern, emoji] of EMOJI_RULES) {
    if (pattern.test(label)) return emoji;
  }
  return "💬";
}

// One in-chat card per coach turn (pacing rule): the strategy card.
function StrategyCard({ outcome }: { outcome: ToolkitOutcome }) {
  return (
    <div className="max-w-[95%] rounded-2xl rounded-bl-sm border border-navy-200 bg-white p-5">
      <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-sand-700">
        <span className="text-navy-700">
          <ChatIcon name="compass" />
        </span>
        A strategy to try
      </p>
      <h3 className="mt-2 font-serif text-xl font-semibold text-navy-900">
        {outcome.strategy.name}
      </h3>
      <p className="mt-2 leading-relaxed text-navy-800">{outcome.strategy.what}</p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-navy-700">
        What makes it work
      </p>
      <ul className="mt-2 space-y-1.5">
        {outcome.strategy.why.map((w) => (
          <li key={w.label} className="text-sm leading-relaxed text-navy-800">
            <span className="font-semibold">{w.label}:</span> {w.benefit}
          </li>
        ))}
      </ul>
    </div>
  );
}

// The close card: one concrete phrase or micro-action with their pick woven in.
function CloseCard({ outcome, pick }: { outcome: ToolkitOutcome; pick: string }) {
  const text = outcome.close.template.replace("{pick}", pick);
  return (
    <div className="max-w-[95%] rounded-2xl rounded-bl-sm border-l-4 border-navy-900 bg-sand-100 p-5">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-navy-700">
        <ChatIcon name="chat" />
        {outcome.close.kind === "say" ? "Say this" : "Try tonight"}
      </p>
      <p className="mt-2 font-serif text-lg leading-relaxed text-navy-900">{text}</p>
    </div>
  );
}

function RelatedBubble({ related }: { related: NonNullable<ToolkitOutcome["related"]> }) {
  return (
    <div className="flex max-w-[85%] items-center gap-2 rounded-2xl rounded-bl-sm bg-sand-100 px-4 py-2.5 text-sm text-navy-800">
      <span className="shrink-0 text-navy-700">
        <ChatIcon name="book" />
      </span>
      <span>
        Related:{" "}
        <Link
          href={`/resources/${related.slug}`}
          className="font-medium underline underline-offset-4 hover:text-navy-950"
        >
          {related.title}
        </Link>
      </span>
    </div>
  );
}

function ClosingBubble() {
  return (
    <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-sand-100 px-4 py-2.5 text-sm text-navy-800">
      Want to talk your version through with a person?{" "}
      <Link href="/contact" className="font-medium underline underline-offset-4 hover:text-navy-950">
        Book a consult
      </Link>{" "}
      — optional, and there's no obligation.
    </div>
  );
}

function DisclaimerBubble() {
  return (
    <p className="max-w-[85%] rounded-2xl rounded-bl-sm bg-sand-50 px-4 py-2.5 text-xs leading-relaxed text-navy-600">
      This resource is provided for general educational purposes only and is not legal advice;
      special education procedures and terminology vary by state and district.
    </p>
  );
}

type Stage = "branch" | "strategy" | "personal" | "picks" | "close";

type FlowState = {
  stepId: string;
  outcomeId: string | null;
  stage: Stage;
};

export default function GuidedToolkit({ toolkit }: { toolkit: Toolkit }) {
  const [stepId, setStepId] = useState(toolkit.firstStep);
  const [outcomeId, setOutcomeId] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>("branch");
  const stateRef = useRef<FlowState>({ stepId, outcomeId, stage });
  stateRef.current = { stepId, outcomeId, stage };

  const chat = useCoachChat<FlowState>({
    capture: () => stateRef.current,
    restore: (s) => {
      setStepId(s.stepId);
      setOutcomeId(s.outcomeId);
      setStage(s.stage);
    },
  });

  const steps = new Map(toolkit.steps.map((s) => [s.id, s]));
  const outcomes = new Map(toolkit.outcomes.map((o) => [o.id, o]));
  const current = steps.get(stepId);
  const outcome = outcomeId ? outcomes.get(outcomeId) : undefined;

  const firstQuestion = steps.get(toolkit.firstStep)?.question ?? "";

  function greet() {
    chat.coach(
      { text: "Let's figure this out together — just a couple of quick questions.", icon: "chat" },
      firstQuestion
    );
  }

  useEffect(() => {
    greet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function restart() {
    chat.reset();
    setStepId(toolkit.firstStep);
    setOutcomeId(null);
    setStage("branch");
    greet();
  }

  // Stage 1: branch questions.
  function chooseBranch(option: { label: string; next: string }) {
    chat.snapshot();
    chat.say(option.label);
    const nextOutcome = outcomes.get(option.next);
    if (nextOutcome) {
      setOutcomeId(option.next);
      setStage("strategy");
      // Stage 2: empathy bubbles arrive one by one, then ONE strategy card.
      const [first, ...rest] = nextOutcome.empathy;
      chat.coach(
        { text: first, illo: toolkit.illo },
        ...rest,
        { node: <StrategyCard outcome={nextOutcome} /> }
      );
    } else {
      const nextStep = steps.get(option.next);
      setStepId(option.next);
      if (nextStep) chat.coach(nextStep.question);
    }
  }

  // Stage 3 → 4: the advance chip; never auto-dump what follows.
  function howDoIStart() {
    chat.snapshot();
    chat.say("How do I start?");
    setStage("personal");
    chat.coach(toolkit.personal.question);
  }

  // Stage 4a: personalization answer.
  function choosePersonal(option: { label: string; emoji: string; ack: string }) {
    chat.snapshot();
    chat.say(option.label);
    setStage("picks");
    chat.coach(option.ack, toolkit.personal.pickQuestion);
  }

  // Stage 4b → 5: pick selection, echoed into the tailored close.
  function choosePick(pick: { label: string; emoji: string }) {
    if (!outcome) return;
    chat.snapshot();
    chat.say(pick.label);
    setStage("close");
    chat.coach(
      { node: <CloseCard outcome={outcome} pick={pick.label} /> },
      outcome.close.encouragement,
      ...(outcome.related ? [{ node: <RelatedBubble related={outcome.related} /> }] : []),
      { node: <ClosingBubble /> },
      { node: <DisclaimerBubble /> }
    );
  }

  return (
    <ChatFrame
      messages={chat.messages}
      typing={chat.typing}
      canBack={chat.canBack}
      onBack={chat.back}
      onRestart={restart}
      showRestart={chat.canBack || stage === "close"}
    >
      {stage === "branch" && current && (
        <div className="mt-5 flex flex-wrap gap-2">
          {current.options.map((option) => (
            <Chip
              key={option.next}
              label={option.label}
              emoji={emojiFor(option.label)}
              onClick={() => chooseBranch(option)}
            />
          ))}
        </div>
      )}

      {stage === "strategy" && (
        <div className="mt-5 flex flex-wrap gap-2">
          <Chip label="How do I start?" emoji="👣" onClick={howDoIStart} />
        </div>
      )}

      {stage === "personal" && (
        <div className="mt-5 flex flex-wrap gap-2">
          {toolkit.personal.options.map((option) => (
            <Chip
              key={option.label}
              label={option.label}
              emoji={option.emoji}
              onClick={() => choosePersonal(option)}
            />
          ))}
        </div>
      )}

      {stage === "picks" && (
        <div className="mt-5 flex flex-wrap gap-2">
          {toolkit.personal.picks.map((pick) => (
            <Chip
              key={pick.label}
              label={pick.label}
              emoji={pick.emoji}
              onClick={() => choosePick(pick)}
            />
          ))}
        </div>
      )}
    </ChatFrame>
  );
}
