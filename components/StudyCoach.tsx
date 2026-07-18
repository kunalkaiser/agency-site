"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
type Message = { id: number; role: "coach" | "student"; text: string };
type Selections = {
  subject?: CoachSubject;
  topic?: CoachTopic;
  detail?: string;
  struggle?: StrugglePlan;
  time?: TimeBudget;
};
type Snapshot = { node: Node; sel: Selections; msgLen: number };

const GREETING = [
  "Hi! I'm the TrueCourse study coach — a guided script, not a person (and not a chatbot that makes things up). Your taps pick the path.",
  "Let's turn “I'm falling behind” into a two-week plan. First: which subject are we working on?",
];

const TYPING_MS = 650;

export default function StudyCoach() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [pending, setPending] = useState<string[]>([]);
  const [node, setNode] = useState<Node>("subject");
  const [sel, setSel] = useState<Selections>({});
  const [history, setHistory] = useState<Snapshot[]>([]);
  const [detailText, setDetailText] = useState("");
  const nextId = useRef(0);
  const endRef = useRef<HTMLDivElement>(null);

  const typing = pending.length > 0;

  // Coach messages arrive one at a time with a brief typing pause.
  useEffect(() => {
    if (pending.length === 0) return;
    const t = setTimeout(() => {
      setMessages((m) => [...m, { id: nextId.current++, role: "coach", text: pending[0] }]);
      setPending((p) => p.slice(1));
    }, TYPING_MS);
    return () => clearTimeout(t);
  }, [pending]);

  // Greeting on first mount.
  useEffect(() => {
    setPending(GREETING);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (messages.length > GREETING.length || node === "plan") {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages, typing, node]);

  function say(text: string) {
    setMessages((m) => [...m, { id: nextId.current++, role: "student", text }]);
  }

  function coach(...texts: string[]) {
    setPending((p) => [...p, ...texts]);
  }

  function snapshot() {
    setHistory((h) => [...h, { node, sel, msgLen: messages.length }]);
  }

  function back() {
    const last = history[history.length - 1];
    if (!last) return;
    setHistory((h) => h.slice(0, -1));
    setNode(last.node);
    setSel(last.sel);
    setMessages((m) => m.slice(0, last.msgLen));
    setPending([]);
    setDetailText("");
  }

  function restart() {
    setHistory([]);
    setSel({});
    setMessages([]);
    setDetailText("");
    setNode("subject");
    setPending(GREETING);
  }

  function chooseSubject(subject: CoachSubject) {
    snapshot();
    say(subject.label);
    setSel({ subject });
    setNode("topic");
    coach(`Good choice. Within ${subject.label.toLowerCase()}, where's the trouble?`);
  }

  function chooseTopic(topic: CoachTopic) {
    snapshot();
    say(topic.label);
    setSel((s) => ({ ...s, topic }));
    setNode("detail");
    coach(
      `Got it — ${topic.spoken}. Anything specific about it? Type a few words if you like, or skip ahead.`
    );
  }

  function submitDetail(text: string) {
    const subject = sel.subject!;
    snapshot();
    const trimmed = text.trim();
    if (trimmed) {
      say(trimmed);
      const matched = matchTopicFromDetail(subject, trimmed);
      if (matched && matched !== sel.topic?.id) {
        const newTopic = subject.topics.find((t) => t.id === matched);
        if (newTopic) {
          setSel((s) => ({ ...s, topic: newTopic, detail: trimmed }));
          coach(
            `That sounds more like ${newTopic.spoken} — I'll aim the plan there.`,
            "Next: how's it actually going with it?"
          );
          setNode("struggle");
          setDetailText("");
          return;
        }
      }
      setSel((s) => ({ ...s, detail: trimmed }));
      coach("Noted — I'll put that at the top of your plan.", "Next: how's it actually going?");
    } else {
      say("Skip");
      coach("No problem. How's it actually going with it?");
    }
    setNode("struggle");
    setDetailText("");
  }

  function chooseStruggle(struggle: StrugglePlan) {
    snapshot();
    say(struggle.label);
    setSel((s) => ({ ...s, struggle }));
    setNode("time");
    coach(struggle.ack, "Last one: how much time can you realistically give it?");
  }

  function chooseTime(time: TimeBudget) {
    snapshot();
    say(time.label);
    setSel((s) => ({ ...s, time }));
    setNode("plan");
    coach("Deal. Here's your two-week plan — it's printable, and it's yours.");
  }

  const chipClasses =
    "rounded-full border border-navy-300 bg-white px-4 py-2 text-sm font-medium text-navy-900 transition-colors hover:border-navy-600 hover:bg-sand-100 disabled:opacity-50";

  return (
    <div>
      {/* Conversation — not part of the printed plan */}
      <div className="rounded-xl border border-navy-100 bg-white p-4 sm:p-6 print:hidden">
        <div role="log" aria-live="polite" className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={m.role === "coach" ? "flex" : "flex justify-end"}>
              <p
                className={
                  m.role === "coach"
                    ? "max-w-[85%] rounded-2xl rounded-bl-sm bg-sand-100 px-4 py-2.5 leading-relaxed text-navy-900"
                    : "max-w-[85%] rounded-2xl rounded-br-sm bg-navy-900 px-4 py-2.5 leading-relaxed text-sand-50"
                }
              >
                {m.text}
              </p>
            </div>
          ))}
          {typing && (
            <div className="flex">
              <p
                className="rounded-2xl rounded-bl-sm bg-sand-100 px-4 py-2.5 text-navy-500"
                aria-label="Coach is typing"
              >
                <span className="tracking-widest">···</span>
              </p>
            </div>
          )}
        </div>

        {/* Input area */}
        {!typing && node === "subject" && (
          <div className="mt-5 flex flex-wrap gap-2">
            {SUBJECTS.map((s) => (
              <button key={s.id} type="button" onClick={() => chooseSubject(s)} className={chipClasses}>
                {s.label}
              </button>
            ))}
          </div>
        )}

        {!typing && node === "topic" && sel.subject && (
          <div className="mt-5 flex flex-wrap gap-2">
            {sel.subject.topics.map((t) => (
              <button key={t.id} type="button" onClick={() => chooseTopic(t)} className={chipClasses}>
                {t.label}
              </button>
            ))}
          </div>
        )}

        {!typing && node === "detail" && (
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

        {!typing && node === "struggle" && (
          <div className="mt-5 flex flex-wrap gap-2">
            {STRUGGLES.map((s) => (
              <button key={s.id} type="button" onClick={() => chooseStruggle(s)} className={chipClasses}>
                {s.label}
              </button>
            ))}
          </div>
        )}

        {!typing && node === "time" && (
          <div className="mt-5 flex flex-wrap gap-2">
            {TIME_BUDGETS.map((t) => (
              <button key={t.id} type="button" onClick={() => chooseTime(t)} className={chipClasses}>
                {t.label}
              </button>
            ))}
          </div>
        )}

        {/* Controls */}
        <div className="mt-5 flex gap-4 border-t border-navy-100 pt-4">
          {history.length > 0 && (
            <button
              type="button"
              onClick={back}
              className="text-sm font-medium text-navy-700 underline underline-offset-4 hover:text-navy-950"
            >
              ← Back
            </button>
          )}
          {(history.length > 0 || node === "plan") && (
            <button
              type="button"
              onClick={restart}
              className="text-sm font-medium text-navy-700 underline underline-offset-4 hover:text-navy-950"
            >
              Restart
            </button>
          )}
        </div>
      </div>

      {/* The plan — printable */}
      {node === "plan" && !typing && sel.topic && sel.struggle && sel.time && (
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

      <div ref={endRef} />
    </div>
  );
}
