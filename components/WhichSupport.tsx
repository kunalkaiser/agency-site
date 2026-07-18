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

// One card per coach turn (pacing rule): the primary recommendation.
function RecommendCard({ rec }: { rec: Recommendation }) {
  return (
    <div className="max-w-[95%] rounded-2xl rounded-bl-sm border border-navy-200 bg-white p-5">
      <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-sand-700">
        <span className="text-navy-700">
          <ChatIcon name="compass" />
        </span>
        Start here · {rec.primary.kind}
      </p>
      <h3 className="mt-2 font-serif text-xl font-semibold text-navy-900">{rec.primary.label}</h3>
      <p className="mt-2 text-sm leading-relaxed text-navy-700">{rec.primary.note}</p>
      <Link
        href={rec.primary.href}
        className="mt-4 inline-block rounded-md bg-navy-900 px-5 py-2.5 font-medium text-sand-50 transition-colors hover:bg-navy-800"
      >
        {rec.primary.kind === "free tool" ? "Open the free tool →" : "See the service →"}
      </Link>
    </div>
  );
}

function SecondaryBubble({ rec }: { rec: Recommendation }) {
  if (!rec.secondary) return null;
  return (
    <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-sand-100 px-4 py-2.5 text-sm text-navy-800">
      {rec.primary.kind === "free tool" ? "If that isn't enough: " : "Worth having open too: "}
      <Link
        href={rec.secondary.href}
        className="font-medium underline underline-offset-4 hover:text-navy-950"
      >
        {rec.secondary.label}
      </Link>{" "}
      ({rec.secondary.kind}) — {rec.secondary.note}
    </div>
  );
}

function ConsultBubble() {
  return (
    <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-sand-100 px-4 py-2.5 text-sm text-navy-800">
      Prefer to talk it through with a person first?{" "}
      <Link href="/contact" className="font-medium underline underline-offset-4 hover:text-navy-950">
        Book a consult
      </Link>{" "}
      — it's optional, it's a conversation, and we'll tell you honestly if the free shelf is all you
      need.
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

  // The arc ending: explain → recommend (one card) → optional next steps,
  // delivered as sequential bubbles. Routing logic itself is unchanged.
  function finish(rec: Recommendation) {
    chat.coach(
      { text: "That's everything I need — here's my honest read.", icon: "compass" },
      rec.blurb, // the pacing rule in CoachChat splits long blurbs into bubbles
      { node: <RecommendCard rec={rec} /> },
      ...(rec.secondary ? [{ node: <SecondaryBubble rec={rec} /> }] : []),
      { node: <ConsultBubble /> },
      { node: <DisclaimerBubble /> }
    );
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
      finish(recommend(who!, id, null));
    }
  }

  function chooseTried(id: TriedId, label: string) {
    chat.snapshot();
    chat.say(label);
    setTried(id);
    setNode("done");
    finish(recommend(who!, band!, id));
  }

  return (
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
  );
}
