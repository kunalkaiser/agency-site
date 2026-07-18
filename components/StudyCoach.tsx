"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChatFrame, Chip, useCoachChat } from "@/components/CoachChat";
import {
  SUBJECTS,
  STRUGGLES,
  TIME_BUDGETS,
  matchTopicFromDetail,
  type CoachSubject,
  type CoachTopic,
  type StrugglePlan,
  type TimeBudget,
} from "@/app/resources/study-coach/coachData";

type Node = "subject" | "topic" | "detail" | "struggle" | "time" | "plan";
type Selections = {
  subject?: CoachSubject;
  topic?: CoachTopic;
  detail?: string;
  struggle?: StrugglePlan;
  time?: TimeBudget;
};
type FlowState = { node: Node; sel: Selections };

const GREETING = [
  "Hi! I'm the TrueCourse study coach — a guided script, not a person (and not a chatbot that makes things up). Your taps pick the path.",
  "Let's turn “I'm falling behind” into a two-week plan. First: which subject are we working on?",
];

export default function StudyCoach() {
  const [node, setNode] = useState<Node>("subject");
  const [sel, setSel] = useState<Selections>({});
  const [detailText, setDetailText] = useState("");
  const stateRef = useRef<FlowState>({ node, sel });
  stateRef.current = { node, sel };

  const chat = useCoachChat<FlowState>({
    capture: () => stateRef.current,
    restore: (s) => {
      setNode(s.node);
      setSel(s.sel);
      setDetailText("");
    },
  });

  // Greeting on first mount.
  useEffect(() => {
    chat.coach(...GREETING);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function restart() {
    chat.reset();
    setSel({});
    setDetailText("");
    setNode("subject");
    chat.coach(...GREETING);
  }

  function chooseSubject(subject: CoachSubject) {
    chat.snapshot();
    chat.say(subject.label);
    setSel({ subject });
    setNode("topic");
    chat.coach(`Good choice. Within ${subject.label.toLowerCase()}, where's the trouble?`);
  }

  function chooseTopic(topic: CoachTopic) {
    chat.snapshot();
    chat.say(topic.label);
    setSel((s) => ({ ...s, topic }));
    setNode("detail");
    chat.coach(
      `Got it — ${topic.spoken}. Anything specific about it? Type a few words if you like, or skip ahead.`
    );
  }

  function submitDetail(text: string) {
    const subject = sel.subject!;
    chat.snapshot();
    const trimmed = text.trim();
    if (trimmed) {
      chat.say(trimmed);
      const matched = matchTopicFromDetail(subject, trimmed);
      if (matched && matched !== sel.topic?.id) {
        const newTopic = subject.topics.find((t) => t.id === matched);
        if (newTopic) {
          setSel((s) => ({ ...s, topic: newTopic, detail: trimmed }));
          chat.coach(
            `That sounds more like ${newTopic.spoken} — I'll aim the plan there.`,
            "Next: how's it actually going with it?"
          );
          setNode("struggle");
          setDetailText("");
          return;
        }
      }
      setSel((s) => ({ ...s, detail: trimmed }));
      chat.coach("Noted — I'll put that at the top of your plan.", "Next: how's it actually going?");
    } else {
      chat.say("Skip");
      chat.coach("No problem. How's it actually going with it?");
    }
    setNode("struggle");
    setDetailText("");
  }

  function chooseStruggle(struggle: StrugglePlan) {
    chat.snapshot();
    chat.say(struggle.label);
    setSel((s) => ({ ...s, struggle }));
    setNode("time");
    chat.coach(struggle.ack, "Last one: how much time can you realistically give it?");
  }

  function chooseTime(time: TimeBudget) {
    chat.snapshot();
    chat.say(time.label);
    setSel((s) => ({ ...s, time }));
    setNode("plan");
    chat.coach("Deal. Here's your two-week plan — it's printable, and it's yours.");
  }

  const chipClasses =
    "rounded-full border border-navy-300 bg-white px-4 py-2 text-sm font-medium text-navy-900 transition-colors hover:border-navy-600 hover:bg-sand-100";

  return (
    <div>
      <ChatFrame
        messages={chat.messages}
        typing={chat.typing}
        canBack={chat.canBack}
        onBack={chat.back}
        onRestart={restart}
        showRestart={chat.canBack || node === "plan"}
      >
        {node === "subject" && (
          <div className="mt-5 flex flex-wrap gap-2">
            {SUBJECTS.map((s) => (
              <Chip key={s.id} label={s.label} onClick={() => chooseSubject(s)} />
            ))}
          </div>
        )}

        {node === "topic" && sel.subject && (
          <div className="mt-5 flex flex-wrap gap-2">
            {sel.subject.topics.map((t) => (
              <Chip key={t.id} label={t.label} onClick={() => chooseTopic(t)} />
            ))}
          </div>
        )}

        {node === "detail" && (
          <form
            className="mt-5 flex flex-col gap-2 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              submitDetail(detailText);
            }}
          >
            <label htmlFor="coach-detail" className="sr-only">
              Anything specific? Optional.
            </label>
            <input
              id="coach-detail"
              type="text"
              value={detailText}
              onChange={(e) => setDetailText(e.target.value)}
              maxLength={120}
              placeholder="e.g. mixed numbers, thesis statements… (optional)"
              className="w-full rounded-full border border-navy-200 bg-white px-4 py-2 text-navy-900 placeholder:text-navy-500 focus:border-navy-500"
            />
            <div className="flex gap-2">
              <button type="submit" className={chipClasses}>
                {detailText.trim() ? "Send" : "Skip"}
              </button>
            </div>
          </form>
        )}

        {node === "struggle" && (
          <div className="mt-5 flex flex-wrap gap-2">
            {STRUGGLES.map((s) => (
              <Chip key={s.id} label={s.label} onClick={() => chooseStruggle(s)} />
            ))}
          </div>
        )}

        {node === "time" && (
          <div className="mt-5 flex flex-wrap gap-2">
            {TIME_BUDGETS.map((t) => (
              <Chip key={t.id} label={t.label} onClick={() => chooseTime(t)} />
            ))}
          </div>
        )}
      </ChatFrame>

      {/* The plan — printable */}
      {node === "plan" && !chat.typing && sel.topic && sel.struggle && sel.time && (
        <div className="mt-6 rounded-xl border border-navy-100 bg-white p-6 sm:p-8">
          <p className="text-xs uppercase tracking-widest text-sand-700">Your two-week plan</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-navy-900">
            {sel.subject?.label}: {sel.topic.label}
          </h2>
          {sel.detail && (
            <p className="mt-2 text-navy-800">
              Your focus: <span className="font-medium">{sel.detail}</span>
            </p>
          )}
          <p className="mt-4 leading-relaxed text-navy-800">{sel.time.rhythm}</p>

          <div className="mt-5 rounded-md bg-sand-100 px-4 py-3 text-sm leading-relaxed text-navy-800">
            <p>{sel.struggle.week1}</p>
            <p className="mt-2">{sel.struggle.week2}</p>
          </div>

          <ol className="mt-6 space-y-4">
            {sel.struggle.steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-900 font-serif text-sm text-sand-50">
                  {i + 1}
                </span>
                <div className="pt-0.5">
                  <p className="font-semibold text-navy-900">{step.title}</p>
                  <p className="mt-1 leading-relaxed text-navy-800">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          <h3 className="mt-8 font-serif text-lg font-semibold text-navy-900">
            Free resources for {sel.topic.spoken}
          </h3>
          <ul className="mt-3 space-y-3">
            {sel.topic.resources.map((r) => (
              <li key={r.url} className="text-navy-800">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline underline-offset-4 hover:text-navy-950"
                >
                  {r.label}
                </a>{" "}
                <span className="text-sm text-navy-700">— {r.note}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3 print:hidden">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-md bg-navy-900 px-5 py-2.5 font-medium text-sand-50 transition-colors hover:bg-navy-800"
            >
              Print this plan
            </button>
            <Link
              href="/contact"
              className="rounded-md border border-navy-300 px-5 py-2.5 font-medium text-navy-900 transition-colors hover:border-navy-500"
            >
              Talk it through with us
            </Link>
          </div>

          <p className="mt-8 border-t border-navy-100 pt-5 text-sm text-navy-600">
            This resource is provided for general educational purposes only and is not legal advice;
            special education procedures and terminology vary by state and district.
          </p>
        </div>
      )}
    </div>
  );
}
