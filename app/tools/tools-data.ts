import { ARTICLES } from "@/app/resources/articles";
import { TOOLKITS } from "@/app/resources/toolkits/toolkits";

export type Audience = "Parents" | "Teachers" | "Students";

export type ToolCard = {
  title: string;
  href: string;
  external?: boolean;
  /** Small category label shown on the card. */
  tag: string;
  audiences: Audience[];
  /** One-line value prop: what it does, not just its name. */
  valueProp: string;
};

export const TOOL_CARDS: ToolCard[] = [
  {
    title: "Study Coach",
    href: "/resources/study-coach",
    tag: "Interactive tool",
    audiences: ["Students"],
    valueProp:
      "Stuck on one topic? Tap through a guided conversation to a focused two-week plan with free resources.",
  },
  {
    title: "Study Plan Builder",
    href: "/resources/plan-builder",
    tag: "Interactive tool",
    audiences: ["Students"],
    valueProp:
      "Turn all your grades — any format — into a weekly, monthly, or quarterly study schedule.",
  },
  {
    title: "SAT Schedule Builder",
    href: "/resources/sat-schedule",
    tag: "Interactive tool",
    audiences: ["Students"],
    valueProp:
      "Turn your test date, score, and weakest area into a day-by-day Digital SAT prep schedule with practice-test days built in.",
  },
  ...TOOLKITS.map((toolkit) => ({
    title: toolkit.title,
    href: `/resources/toolkits/${toolkit.slug}`,
    tag: "Guided toolkit",
    audiences: ["Parents"] as Audience[],
    valueProp: toolkit.description,
  })),
  ...ARTICLES.map((article) => ({
    title: article.title,
    href: `/resources/${article.slug}`,
    tag: article.type,
    audiences: [article.audience] as Audience[],
    valueProp: article.description,
  })),
  {
    title: "ZenEd",
    href: "https://kunalkaiser.github.io/zened/",
    external: true,
    tag: "Companion site",
    audiences: ["Students"],
    valueProp: "Our free companion site for NY students preparing for the Regents exams.",
  },
];
