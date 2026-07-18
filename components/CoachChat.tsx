"use client";

// Shared chat mechanics for the Study Coach and the Guided Toolkits:
// coach/student bubbles, a ~650ms typing indicator, tappable chips,
// snapshot-based back, and restart. Consumers own their flow state and
// drive the conversation through the useCoachChat hook.

import { useEffect, useRef, useState, type ReactNode } from "react";

export type IconName = "spark" | "compass" | "flag" | "book" | "chat";

export type IlloName = "timer" | "booknook" | "backpack" | "calmcorner";

/** Original flat spot illustrations in the site palette — decorative only. */
export function SpotIllustration({ name }: { name: IlloName }) {
  const frame = {
    width: 96,
    height: 64,
    viewBox: "0 0 96 64",
    fill: "none",
    "aria-hidden": true as const,
    className: "mb-2",
  };
  switch (name) {
    case "timer":
      return (
        <svg {...frame}>
          <rect x="8" y="52" width="80" height="4" rx="2" fill="#d4c7b1" />
          <circle cx="48" cy="30" r="20" fill="#f3efe7" stroke="#1b2c40" strokeWidth="2.5" />
          <rect x="44" y="4" width="8" height="5" rx="1.5" fill="#1b2c40" />
          <path d="M48 30 L48 18" stroke="#1b2c40" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M48 30 L57 34" stroke="#a08463" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="48" cy="30" r="2.5" fill="#1b2c40" />
          <path d="M70 12 l4 -4" stroke="#1b2c40" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "booknook":
      return (
        <svg {...frame}>
          <rect x="8" y="52" width="80" height="4" rx="2" fill="#d4c7b1" />
          <rect x="14" y="24" width="26" height="28" rx="3" fill="#293f58" />
          <rect x="18" y="30" width="18" height="3" rx="1.5" fill="#f3efe7" />
          <rect x="18" y="37" width="18" height="3" rx="1.5" fill="#f3efe7" />
          <path d="M52 52 V22 q0-4 4-4 h6 q4 0 4 4 v30" fill="#f3efe7" stroke="#1b2c40" strokeWidth="2.5" />
          <path d="M66 52 V28 q0-3 3-3 h5 q3 0 3 3 v24" fill="#af9673" />
          <circle cx="47" cy="14" r="5" fill="#d4c7b1" />
        </svg>
      );
    case "backpack":
      return (
        <svg {...frame}>
          <rect x="8" y="52" width="80" height="4" rx="2" fill="#d4c7b1" />
          <rect x="58" y="10" width="26" height="42" rx="2" fill="#e6ded0" stroke="#1b2c40" strokeWidth="2.5" />
          <circle cx="64" cy="32" r="2" fill="#1b2c40" />
          <path d="M18 52 V30 q0-8 10-8 t10 8 v22 Z" fill="#293f58" stroke="#1b2c40" strokeWidth="2.5" />
          <rect x="22" y="38" width="12" height="10" rx="2" fill="#af9673" />
          <path d="M24 22 q4 -6 8 0" stroke="#1b2c40" strokeWidth="2.5" fill="none" />
        </svg>
      );
    case "calmcorner":
      return (
        <svg {...frame}>
          <rect x="8" y="52" width="80" height="4" rx="2" fill="#d4c7b1" />
          <path d="M14 52 q0-14 14-14 t14 14 Z" fill="#293f58" />
          <circle cx="28" cy="30" r="6" fill="#f3efe7" stroke="#1b2c40" strokeWidth="2.5" />
          <rect x="56" y="18" width="4" height="34" rx="2" fill="#a08463" />
          <path d="M58 18 q-10 -2 -8 -12 q10 2 8 12 Z" fill="#47729c" />
          <path d="M58 26 q10 -2 8 -12 q-10 2 -8 12 Z" fill="#688fb4" />
          <circle cx="78" cy="14" r="4" fill="#d4c7b1" />
        </svg>
      );
  }
}

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

export type CoachItem = string | { text?: string; node?: ReactNode; icon?: IconName; illo?: IlloName };

export type ChatMessage = {
  id: number;
  role: "coach" | "student";
  text?: string;
  node?: ReactNode;
  icon?: IconName;
  illo?: IlloName;
};

const TYPING_MS = 650;

/**
 * Pacing rule: no single coach turn may exceed ~60 words. Longer text is
 * split at sentence boundaries into sequential bubbles (each arriving with
 * its own typing pause). Rich-node turns carry at most one card each by
 * construction, so they pass through untouched.
 */
export const MAX_TURN_WORDS = 60;

export function splitForPacing(text: string): string[] {
  const words = text.split(/\s+/).filter(Boolean).length;
  if (words <= MAX_TURN_WORDS) return [text];
  const sentences = text.match(/[^.!?…]+[.!?…]+["”']?\s*|[^.!?…]+$/g) ?? [text];
  const chunks: string[] = [];
  let current = "";
  for (const sentence of sentences) {
    const candidate = (current + sentence).trim();
    if (current && candidate.split(/\s+/).length > MAX_TURN_WORDS) {
      chunks.push(current.trim());
      current = sentence;
    } else {
      current = candidate + " ";
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

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
        {
          id: nextId.current++,
          role: "coach",
          text: item.text,
          node: item.node,
          icon: item.icon,
          illo: item.illo,
        },
      ]);
      setPending((p) => p.slice(1));
    }, TYPING_MS);
    return () => clearTimeout(t);
  }, [pending]);

  function say(text: string) {
    setMessages((m) => [...m, { id: nextId.current++, role: "student", text }]);
  }

  function coach(...items: CoachItem[]) {
    const paced = items.flatMap((i) => {
      const item = typeof i === "string" ? { text: i } : i;
      if (!item.text || item.node) return [item];
      // Enforce the ~60-word pacing rule: long turns become sequential bubbles;
      // any icon/illustration stays with the first bubble of the split.
      const parts = splitForPacing(item.text);
      return parts.map((text, idx) =>
        idx === 0 ? { ...item, text } : { text }
      );
    });
    setPending((p) => [...p, ...paced]);
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
            <div
              className={
                m.role === "coach"
                  ? "max-w-[85%] rounded-2xl rounded-bl-sm bg-sand-100 px-4 py-2.5 leading-relaxed text-navy-900"
                  : "max-w-[85%] rounded-2xl rounded-br-sm bg-navy-900 px-4 py-2.5 leading-relaxed text-sand-50"
              }
            >
              {m.illo && <SpotIllustration name={m.illo} />}
              <p>
                {m.icon && (
                  <span className="mr-2 inline-block align-[-3px] text-navy-700">
                    <ChatIcon name={m.icon} />
                  </span>
                )}
                {m.text}
              </p>
            </div>
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
