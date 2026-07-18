"use client";

// Shared chat mechanics for the Study Coach and the Guided Toolkits:
// coach/student bubbles, a ~650ms typing indicator, tappable chips,
// snapshot-based back, and restart. Consumers own their flow state and
// drive the conversation through the useCoachChat hook.

import { useEffect, useRef, useState, type ReactNode } from "react";

export type IconName = "spark" | "compass" | "flag" | "book" | "chat";

/** Small inline SVG accents used in coach bubbles at section transitions. */
export function ChatIcon({ name }: { name: IconName }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "spark": // lightbulb
      return (
        <svg {...common}>
          <path d="M9 18h6M10 21h4" />
          <path d="M12 3a6 6 0 0 0-4 10.5c.6.55 1 1.5 1 2.5h6c0-1 .4-1.95 1-2.5A6 6 0 0 0 12 3Z" />
        </svg>
      );
    case "compass":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
        </svg>
      );
    case "flag":
      return (
        <svg {...common}>
          <path d="M5 21V4" />
          <path d="M5 4h12l-2.5 4L17 12H5" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M4 19V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2Z" />
          <path d="M4 19a2 2 0 0 0 2 2h13" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5Z" />
        </svg>
      );
  }
}

export type CoachItem = string | { text?: string; node?: ReactNode; icon?: IconName };

export type ChatMessage = {
  id: number;
  role: "coach" | "student";
  text?: string;
  node?: ReactNode;
  icon?: IconName;
};

const TYPING_MS = 650;

export function useCoachChat<S>(opts: { capture: () => S; restore: (s: S) => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pending, setPending] = useState<Exclude<CoachItem, string>[]>([]);
  const [history, setHistory] = useState<{ state: S; msgLen: number }[]>([]);
  const nextId = useRef(0);
  // Keep the latest capture/restore without re-subscribing effects.
  const optsRef = useRef(opts);
  optsRef.current = opts;

  const typing = pending.length > 0;

  useEffect(() => {
    if (pending.length === 0) return;
    const t = setTimeout(() => {
      const item = pending[0];
      setMessages((m) => [
        ...m,
        { id: nextId.current++, role: "coach", text: item.text, node: item.node, icon: item.icon },
      ]);
      setPending((p) => p.slice(1));
    }, TYPING_MS);
    return () => clearTimeout(t);
  }, [pending]);

  function say(text: string) {
    setMessages((m) => [...m, { id: nextId.current++, role: "student", text }]);
  }

  function coach(...items: CoachItem[]) {
    setPending((p) => [...p, ...items.map((i) => (typeof i === "string" ? { text: i } : i))]);
  }

  function snapshot() {
    setHistory((h) => [...h, { state: optsRef.current.capture(), msgLen: messages.length }]);
  }

  function back() {
    const last = history[history.length - 1];
    if (!last) return;
    setHistory((h) => h.slice(0, -1));
    setMessages((m) => m.slice(0, last.msgLen));
    setPending([]);
    optsRef.current.restore(last.state);
  }

  /** Clears the transcript and history; the consumer re-seeds its greeting. */
  function reset() {
    setHistory([]);
    setMessages([]);
    setPending([]);
  }

  return { messages, typing, say, coach, snapshot, back, reset, canBack: history.length > 0 };
}

export function ChatTranscript({
  messages,
  typing,
  suppressScrollCount = 2,
}: {
  messages: ChatMessage[];
  typing: boolean;
  suppressScrollCount?: number;
}) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > suppressScrollCount) {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages, typing, suppressScrollCount]);

  return (
    <div role="log" aria-live="polite" className="space-y-3">
      {messages.map((m) =>
        m.node ? (
          <div key={m.id}>{m.node}</div>
        ) : (
          <div key={m.id} className={m.role === "coach" ? "flex" : "flex justify-end"}>
            <p
              className={
                m.role === "coach"
                  ? "max-w-[85%] rounded-2xl rounded-bl-sm bg-sand-100 px-4 py-2.5 leading-relaxed text-navy-900"
                  : "max-w-[85%] rounded-2xl rounded-br-sm bg-navy-900 px-4 py-2.5 leading-relaxed text-sand-50"
              }
            >
              {m.icon && (
                <span className="mr-2 inline-block align-[-3px] text-navy-700">
                  <ChatIcon name={m.icon} />
                </span>
              )}
              {m.text}
            </p>
          </div>
        )
      )}
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
      <div ref={endRef} />
    </div>
  );
}

export function Chip({
  label,
  emoji,
  onClick,
}: {
  label: string;
  emoji?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-navy-300 bg-white px-4 py-2 text-left text-sm font-medium text-navy-900 transition-colors hover:border-navy-600 hover:bg-sand-100"
    >
      {emoji && (
        <span className="mr-1.5" aria-hidden="true">
          {emoji}
        </span>
      )}
      {label}
    </button>
  );
}

/** The chat container: transcript, consumer-provided input area, back/restart. */
export function ChatFrame({
  messages,
  typing,
  canBack,
  onBack,
  onRestart,
  showRestart,
  suppressScrollCount,
  children,
}: {
  messages: ChatMessage[];
  typing: boolean;
  canBack: boolean;
  onBack: () => void;
  onRestart: () => void;
  showRestart: boolean;
  suppressScrollCount?: number;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-navy-100 bg-white p-4 sm:p-6 print:hidden">
      <ChatTranscript messages={messages} typing={typing} suppressScrollCount={suppressScrollCount} />
      {!typing && children}
      {(canBack || showRestart) && (
        <div className="mt-5 flex gap-4 border-t border-navy-100 pt-4">
          {canBack && (
            <button
              type="button"
              onClick={onBack}
              className="text-sm font-medium text-navy-700 underline underline-offset-4 hover:text-navy-950"
            >
              ← Back
            </button>
          )}
          {showRestart && (
            <button
              type="button"
              onClick={onRestart}
              className="text-sm font-medium text-navy-700 underline underline-offset-4 hover:text-navy-950"
            >
              Restart
            </button>
          )}
        </div>
      )}
    </div>
  );
}
