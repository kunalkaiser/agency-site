// Service-fit chooser: a small scripted routing table rendered in the shared
// chat UI. Every path ends at exactly one VISIBLE service page or one free
// tool, with an honest "start free" bias — the free tool is recommended first
// wherever it genuinely fits, the service second. Hidden services can never
// be referenced or routed to: service links resolve through VISIBLE_SERVICES.

import { VISIBLE_SERVICES } from "@/lib/services";

export type WhoId = "overall" | "one-subject" | "college" | "setss";
export type BandId = "elementary" | "middle" | "high";
export type TriedId = "nothing" | "school-help" | "outside-help";

export const WHO_OPTIONS: { id: WhoId; label: string }[] = [
  { id: "overall", label: "My child's grades overall" },
  { id: "one-subject", label: "One tough subject" },
  { id: "college", label: "College planning" },
  { id: "setss", label: "NYC special-ed support services (SETSS)" },
];

export const BAND_OPTIONS: { id: BandId; label: string }[] = [
  { id: "elementary", label: "Elementary school" },
  { id: "middle", label: "Middle school" },
  { id: "high", label: "High school" },
];

export const TRIED_OPTIONS: { id: TriedId; label: string }[] = [
  { id: "nothing", label: "Nothing yet — this is step one" },
  { id: "school-help", label: "School supports — extra help, teacher plans" },
  { id: "outside-help", label: "Outside help — tutoring or programs" },
];

/** Paths for these `who` choices skip the "what's been tried" question. */
export function needsTriedQuestion(who: WhoId): boolean {
  return who === "overall" || who === "one-subject";
}

export type RecLink = {
  label: string;
  href: string;
  kind: "free tool" | "service";
  note: string;
};

export type Recommendation = {
  heading: string;
  blurb: string;
  primary: RecLink;
  secondary?: RecLink;
};

/** Resolve a service link only if the service is visible; hidden → null. */
function serviceLink(slug: string, note: string): RecLink | null {
  const service = VISIBLE_SERVICES.find((s) => s.slug === slug);
  if (!service) return null;
  return { label: service.name, href: `/services/${service.slug}`, kind: "service", note };
}

const PLAN_BUILDER: RecLink = {
  label: "Study Plan Builder",
  href: "/resources/plan-builder",
  kind: "free tool",
  note: "Enter the grades, get a structured weekly study schedule — free, in your browser.",
};

const STUDY_COACH: RecLink = {
  label: "Study Coach",
  href: "/resources/study-coach",
  kind: "free tool",
  note: "A guided conversation that turns one tough topic into a focused two-week plan — free.",
};

export function recommend(who: WhoId, band: BandId, tried: TriedId | null): Recommendation {
  if (who === "setss") {
    const setss = serviceLink(
      "setss",
      "Certified special education teachers delivering IEP-mandated instruction."
    );
    return {
      heading: "SETSS is the right conversation to have",
      blurb:
        "SETSS is a New York City DOE program, so this one isn't a do-it-yourself situation — if your child's IEP recommends SETSS, the work is finding a qualified provider you trust and getting the details of your child's mandate understood.",
      primary: setss ?? PLAN_BUILDER,
    };
  }

  if (who === "college") {
    const cc = serviceLink(
      "college-counseling",
      "Strategic guidance through the search, applications, and decisions."
    );
    if (band === "high") {
      return {
        heading: "College Counseling fits here",
        blurb:
          "High school is exactly when structured college guidance earns its keep — list-building, essays, and deadlines all benefit from a plan made early rather than a scramble made late.",
        primary: cc ?? PLAN_BUILDER,
      };
    }
    return {
      heading: "It's not too early to ask — it is too early to be heavy",
      blurb:
        "Honestly: most college counseling engagements begin in sophomore or junior year, and younger students mostly need strong foundations and genuine interests. A conversation now can settle the timeline; heavy college work can wait.",
      primary: cc ?? PLAN_BUILDER,
      secondary: PLAN_BUILDER,
    };
  }

  const tutoring = serviceLink(
    "tutoring",
    "One-on-one instruction from a matched tutor, with a written plan and honest progress notes."
  );

  if (who === "overall") {
    if (band === "elementary") {
      return {
        heading: "For younger students, start with a person",
        blurb:
          "Self-serve tools assume a student who can drive them; elementary students mostly can't yet. When grades are slipping across the board at this age, a consistent adult with a plan is the tool.",
        primary: tutoring ?? PLAN_BUILDER,
        secondary: PLAN_BUILDER,
      };
    }
    if (tried === "nothing") {
      return {
        heading: "Start free: turn the grades into a plan",
        blurb:
          "Honest answer: since nothing's been tried yet, try structure before services. The free Plan Builder turns the actual report card into a weekly schedule in a few minutes — many families find that a real plan, kept for a few weeks, moves things on its own. If it doesn't, tutoring is the sensible next step.",
        primary: PLAN_BUILDER,
        secondary: tutoring ?? undefined,
      };
    }
    return {
      heading: "Tutoring fits here",
      blurb:
        "You've already tried the reasonable first steps — when grades are slipping across subjects despite them, individualized instruction that starts from an honest assessment is usually what changes the slope.",
      primary: tutoring ?? PLAN_BUILDER,
      secondary: PLAN_BUILDER,
    };
  }

  // who === "one-subject"
  if (band === "elementary") {
    return {
      heading: "For younger students, start with a person",
      blurb:
        "One stubborn subject in elementary school responds best to a patient adult who can find the exact gap and rebuild from there — that's tutoring's home turf.",
      primary: tutoring ?? STUDY_COACH,
    };
  }
  if (tried === "nothing") {
    return {
      heading: "Start free: aim the Study Coach at that subject",
      blurb:
        "Honest answer: for one tough subject that nothing's been tried on, start free. The Study Coach walks your student from “I'm failing X” to a focused two-week plan with free practice resources — tonight. If two honest weeks of that don't move it, a tutor who knows the subject is the right next call.",
      primary: STUDY_COACH,
      secondary: tutoring ?? undefined,
    };
  }
  return {
    heading: "Tutoring fits here",
    blurb:
      "When one subject stays stuck after real attempts to fix it, the gap usually sits earlier in the material than anyone's looked — exactly what a matched tutor is for.",
    primary: tutoring ?? STUDY_COACH,
    secondary: STUDY_COACH,
  };
}
