"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChatFrame, ChatIcon, Chip, useCoachChat } from "@/components/CoachChat";
import type { Toolkit, ToolkitOutcome, ToolkitStep } from "@/app/resources/toolkits/toolkits";

// Leading emoji for answer chips, chosen from the option's own wording.
// Order matters: the first matching rule wins.
const EMOJI_RULES: [RegExp, string][] = [
  [/tears|blow-up|yelling|big reactions/i, "😢"],
  [/negotiation|five more/i, "🤝"],
  [/screen actually goes off/i, "📴"],
  [/give in more often/i, "🏳️"],
  [/hold the line/i, "🛡️"],
  [/ignored/i, "🙉"],
  [/warning/i, "⚠️"],
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
];

function emojiFor(label: string): string {
  for (const [pattern, emoji] of EMOJI_RULES) {
    if (pattern.test(label)) return emoji;
  }
  return "💬";
}

// Outcomes with a clear phrase parents can use verbatim get a highlighted
// "Say this" card. Phrases are drawn from the outcome's own strategy text.
const SAY_THIS: Record<string, string> = {
  "reaction-at-warning": "Ten more minutes, then it's snack time.",
  "reaction-at-off": "You turned it off at the timer — that was smooth.",
  "negotiation-give-in": "I know — and screen time's done.",
  "negotiation-hold": "6:00 or after dinner — you pick.",
  "ignoring-midstream": "What did I just say?",
  "ignoring-habit": "From now on I'll say it once, then the screen goes off.",
  "start-delay": "Just do the first five minutes, then check in with me.",
  "frustration-hard": "You tried a second way — that's exactly what strong students do.",
  "ready-reminders": "Check your list.",
  "door-time": "The car leaves at 7:40.",
  "blowup-immediate": "You had a big day. I'm here.",
  "blowup-demands": "Ten more minutes of break, then homework.",
  "withdrawn-fine": "What was the best thing at lunch?",
  "withdrawn-irritated": "That tone doesn't work — we'll talk after dinner.",
};

type FlowState = { stepId: string; outcomeId: string | null };

export default function GuidedToolkit({ toolkit }: { toolkit: Toolkit }) {
  const [stepId, setStepId] = useState(toolkit.firstStep);
  const [outcomeId, setOutcomeId] = useState<string | null>(null);
  const stateRef = useRef<FlowState>({ stepId, outcomeId });
  stateRef.current = { stepId, outcomeId };

  const chat = useCoachChat<FlowState>({
    capture: () => stateRef.current,
    restore: (s) => {
      setStepId(s.stepId);
      setOutcomeId(s.outcomeId);
    },
  });

  const steps = new Map(toolkit.steps.map((s) => [s.id, s]));
  const outcomes = new Map(toolkit.outcomes.map((o) => [o.id, o]));
  const current: ToolkitStep | undefined = steps.get(stepId);
  const outcome: ToolkitOutcome | undefined = outcomeId ? outcomes.get(outcomeId) : undefined;

  const firstQuestion = steps.get(toolkit.firstStep)?.question ?? "";

  function greet() {
    chat.coach(
      { text: "Let's figure this out together — just a couple of quick questions.", icon: "chat" },
      firstQuestion
    );
  }

  // Greeting on first mount.
  useEffect(() => {
    greet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function choose(option: { label: string; next: string }) {
    chat.snapshot();
    chat.say(option.label);
    if (outcomes.has(option.next)) {
      setOutcomeId(option.next);
      chat.coach({
        text: "Got it. Here's what I'd try — a strategy matched to exactly that.",
        icon: "spark",
      });
    } else {
      const nextStep = steps.get(option.next);
      setStepId(option.next);
      if (nextStep) chat.coach(nextStep.question);
    }
  }

  function restart() {
    chat.reset();
    setStepId(toolkit.firstStep);
    setOutcomeId(null);
    greet();
  }

  const sayThis = outcome ? SAY_THIS[outcome.id] : undefined;

  return (
    <div>
      <ChatFrame
        messages={chat.messages}
        typing={chat.typing}
        canBack={chat.canBack}
        onBack={chat.back}
        onRestart={restart}
        showRestart={chat.canBack || outcomeId !== null}
      >
        {!outcome && current && (
          <div className="mt-5 flex flex-wrap gap-2">
            {current.options.map((option) => (
              <Chip
                key={option.next}
                label={option.label}
                emoji={emojiFor(option.label)}
                onClick={() => choose(option)}
              />
            ))}
          </div>
        )}
      </ChatFrame>

      {/* Outcome — printable, rendered as the conversation's closing cards */}
      {outcome && !chat.typing && (
        <div className="mt-6 space-y-5">
          <div className="rounded-xl border border-navy-100 bg-white p-6 sm:p-8">
            <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-sand-700">
              <span className="text-navy-700">
                <ChatIcon name="compass" />
              </span>
              A strategy to try
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-navy-900">{outcome.title}</h2>
            <p className="mt-3 leading-relaxed text-navy-800">{outcome.intro}</p>

            <ol className="mt-6 space-y-3">
              {outcome.steps.map((step, i) => (
                <li key={i} className="flex gap-4 rounded-lg border border-navy-100 bg-sand-50 p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-900 font-serif text-sm text-sand-50">
                    {i + 1}
                  </span>
                  <p className="pt-1 leading-relaxed text-navy-800">{step}</p>
                </li>
              ))}
            </ol>

            {sayThis && (
              <div className="mt-6 rounded-lg border-l-4 border-navy-900 bg-sand-100 p-5">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-navy-700">
                  <ChatIcon name="chat" />
                  Say this
                </p>
                <p className="mt-2 font-serif text-lg text-navy-900">“{sayThis}”</p>
              </div>
            )}

            {outcome.related && (
              <p className="mt-6 flex items-center gap-2 rounded-md bg-sand-100 px-4 py-3 text-sm text-navy-800">
                <span className="text-navy-700">
                  <ChatIcon name="book" />
                </span>
                <span>
                  Related reading:{" "}
                  <Link
                    href={`/resources/${outcome.related.slug}`}
                    className="font-medium underline underline-offset-4 hover:text-navy-950"
                  >
                    {outcome.related.title}
                  </Link>
                </span>
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-3 print:hidden">
              <Link
                href="/contact"
                className="rounded-md bg-navy-900 px-5 py-2.5 font-medium text-sand-50 transition-colors hover:bg-navy-800"
              >
                Talk it through with us
              </Link>
              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-md border border-navy-300 px-5 py-2.5 font-medium text-navy-900 transition-colors hover:border-navy-500"
              >
                Print this strategy
              </button>
            </div>

            <p className="mt-8 border-t border-navy-100 pt-5 text-sm text-navy-600">
              This resource is provided for general educational purposes only and is not legal
              advice; special education procedures and terminology vary by state and district.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
