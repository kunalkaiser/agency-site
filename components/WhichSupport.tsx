"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChatFrame, ChatIcon, Chip, useCoachChat } from "@/components/CoachChat";
import {
  BAND_OPTIONS,
  TRIED_OPTIONS,
  WHO_OPTIONS,
  needsTriedQuestion,
  recommend,
  type BandId,
  type Recommendation,
  type TriedId,
  type WhoId,
} from "@/app/resources/which-support/chooserData";

type Node = "who" | "band" | "tried" | "done";
type FlowState = { node: Node; who: WhoId | null; band: BandId | null; tried: TriedId | null };

const GREETING = [
  "Hi! This is a short guided chooser — a few taps, and it points you at the one place to start. No forms, nothing saved.",
  "First: what kind of help are you looking for?",
];

export default function WhichSupport() {
  const [node, setNode] = useState<Node>("who");
  const [who, setWho] = useState<WhoId | null>(null);
  const [band, setBand] = useState<BandId | null>(null);
  const [tried, setTried] = useState<TriedId | null>(null);
  const stateRef = useRef<FlowState>({ node, who, band, tried });
  stateRef.current = { node, who, band, tried };

  const chat = useCoachChat<FlowState>({
    capture: () => stateRef.current,
    restore: (s) => {
      setNode(s.node);
      setWho(s.who);
      setBand(s.band);
      setTried(s.tried);
    },
  });

  useEffect(() => {
    chat.coach(...GREETING);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function restart() {
    chat.reset();
    setNode("who");
    setWho(null);
    setBand(null);
    setTried(null);
    chat.coach(...GREETING);
  }

  function chooseWho(id: WhoId, label: string) {
    chat.snapshot();
    chat.say(label);
    setWho(id);
    setNode("band");
    chat.coach("Got it. What grade band is your child in?");
  }

  function chooseBand(id: BandId, label: string) {
    chat.snapshot();
    chat.say(label);
    setBand(id);
    if (needsTriedQuestion(who!) && id !== "elementary") {
      setNode("tried");
      chat.coach("Last one: what's been tried so far?");
    } else {
      setNode("done");
      chat.coach({ text: "That's everything I need. Here's where I'd start.", icon: "compass" });
    }
  }

  function chooseTried(id: TriedId, label: string) {
    chat.snapshot();
    chat.say(label);
    setTried(id);
    setNode("done");
    chat.coach({ text: "That's everything I need. Here's where I'd start.", icon: "compass" });
  }

  const rec: Recommendation | null =
    node === "done" && who && band ? recommend(who, band, tried) : null;

  return (
    <div>
      <ChatFrame
        messages={chat.messages}
        typing={chat.typing}
        canBack={chat.canBack}
        onBack={chat.back}
        onRestart={restart}
        showRestart={chat.canBack || node === "done"}
      >
        {node === "who" && (
          <div className="mt-5 flex flex-wrap gap-2">
            {WHO_OPTIONS.map((o) => (
              <Chip key={o.id} label={o.label} onClick={() => chooseWho(o.id, o.label)} />
            ))}
          </div>
        )}
        {node === "band" && (
          <div className="mt-5 flex flex-wrap gap-2">
            {BAND_OPTIONS.map((o) => (
              <Chip key={o.id} label={o.label} onClick={() => chooseBand(o.id, o.label)} />
            ))}
          </div>
        )}
        {node === "tried" && (
          <div className="mt-5 flex flex-wrap gap-2">
            {TRIED_OPTIONS.map((o) => (
              <Chip key={o.id} label={o.label} onClick={() => chooseTried(o.id, o.label)} />
            ))}
          </div>
        )}
      </ChatFrame>

      {rec && !chat.typing && (
        <div className="mt-6 rounded-xl border border-navy-100 bg-white p-6 sm:p-8">
          <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-sand-700">
            <span className="text-navy-700">
              <ChatIcon name="compass" />
            </span>
            Where to start
          </p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-navy-900">{rec.heading}</h2>
          <p className="mt-3 leading-relaxed text-navy-800">{rec.blurb}</p>

          <div className="mt-6 rounded-lg border border-navy-200 bg-sand-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-navy-700">
              Start here · {rec.primary.kind}
            </p>
            <p className="mt-2 font-serif text-xl font-semibold text-navy-900">{rec.primary.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-navy-700">{rec.primary.note}</p>
            <Link
              href={rec.primary.href}
              className="mt-4 inline-block rounded-md bg-navy-900 px-5 py-2.5 font-medium text-sand-50 transition-colors hover:bg-navy-800"
            >
              {rec.primary.kind === "free tool" ? "Open the free tool →" : "See the service →"}
            </Link>
          </div>

          {rec.secondary && (
            <p className="mt-4 text-sm leading-relaxed text-navy-700">
              {rec.primary.kind === "free tool" ? "If that isn't enough:" : "Worth having open too:"}{" "}
              <Link
                href={rec.secondary.href}
                className="font-medium underline underline-offset-4 hover:text-navy-950"
              >
                {rec.secondary.label}
              </Link>{" "}
              ({rec.secondary.kind}) — {rec.secondary.note}
            </p>
          )}

          <p className="mt-6 border-t border-navy-100 pt-5 text-sm leading-relaxed text-navy-700">
            Prefer to talk it through with a person first?{" "}
            <Link href="/contact" className="font-medium underline underline-offset-4 hover:text-navy-950">
              Book a consult
            </Link>{" "}
            — it's optional, it's a conversation, and we'll tell you honestly if the free shelf is
            all you need.
          </p>

          <p className="mt-6 border-t border-navy-100 pt-5 text-sm text-navy-600">
            This resource is provided for general educational purposes only and is not legal advice;
            special education procedures and terminology vary by state and district.
          </p>
        </div>
      )}
    </div>
  );
}
