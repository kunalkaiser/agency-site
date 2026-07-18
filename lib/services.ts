export type Faq = { question: string; answer: string };

export type Service = {
  slug: string;
  name: string;
  cardTitle: string;
  outcomeGroup: string;
  shortDescription: string;
  areaNote?: string;
  whoItsFor: string[];
  problemItSolves: string;
  whatsIncluded: string[];
  howItWorks: string[];
  expectedOutcomes: string[];
  timeline: string;
  pricingApproach: string;
  faqs: [Faq, Faq, Faq];
};

export const SERVICES: Service[] = [
  {
    slug: "tutoring",
    name: "Tutoring",
    cardTitle: "Tutoring",
    outcomeGroup: "Academic growth",
    shortDescription:
      "One-on-one academic support that builds mastery, confidence, and independent study habits.",
    whoItsFor: [
      "Students in grades K–12 who need more than the classroom can give — whether that's catching up, keeping up, or moving ahead.",
      "Families who want consistent, personalized instruction from a tutor who knows their child — not a rotating cast.",
      "Students facing a high-stakes moment: a difficult course, a standardized test, a transition to a new school.",
    ],
    problemItSolves:
      "Classrooms move at one pace; students don't. When a gap in understanding opens, it rarely closes on its own — homework gets harder, grades slip, and confidence goes with them. Our tutoring works at the source of the gap: individualized instruction that meets your student exactly where they are, then builds steadily from there.",
    whatsIncluded: [
      "An initial academic assessment that shows us — and you — precisely where to focus.",
      "A written learning plan with clear goals and milestones.",
      "Consistent weekly one-on-one virtual sessions with a carefully matched tutor.",
      "Progress notes to your family at every milestone, in plain English.",
      "Coordination with classroom teachers whenever you'd like us to.",
    ],
    howItWorks: [
      "We start with a conversation about your student — history, strengths, and what you want to change.",
      "A short assessment establishes an honest baseline and shapes the learning plan.",
      "Sessions begin on a steady weekly schedule with a tutor matched to your student.",
      "We review progress with you at regular intervals and adjust the plan as your student grows.",
    ],
    expectedOutcomes: [
      "Steady, visible progress in the target subjects, measured against the plan's goals.",
      "Study habits your student can carry into any classroom — with or without us.",
      "The quiet confidence that comes from genuinely understanding the material.",
    ],
    timeline:
      "Most families begin with a semester-length engagement. Progress is usually visible within the first six to eight weeks, and we sit down with you each marking period to decide what comes next.",
    pricingApproach:
      "Tutoring is offered per session, with package options for families who commit to a full semester. We'll recommend a structure during your consult — you'll know exactly where you stand before anything begins.",
    faqs: [
      {
        question: "What subjects do you cover?",
        answer:
          "Core academics across K–12 — reading, writing, mathematics, and science — along with study skills and standardized test preparation. If a need falls outside our range, we'll say so and help you find the right person.",
      },
      {
        question: "Where do sessions take place?",
        answer:
          "Sessions are virtual, which means families anywhere in the country get the same tutors, the same plan, and the same standards — without commutes or scheduling gymnastics.",
      },
      {
        question: "How are tutors matched to students?",
        answer:
          "We match on academic need first, then learning profile and personality — and we confirm the fit after the first few sessions. If it isn't right, we re-match at no cost.",
      },
    ],
  },
  {
    slug: "college-counseling",
    name: "College Counseling",
    cardTitle: "College Counseling",
    outcomeGroup: "Future planning",
    shortDescription:
      "Strategic guidance through the college search, application, and decision process.",
    whoItsFor: [
      "High school students at any stage of the college search — from first questions to final decisions.",
      "Families who want the process to feel organized and calm instead of frantic and last-minute.",
      "Students looking for colleges that genuinely fit how they learn and who they are — not just where they can get in.",
    ],
    problemItSolves:
      "The college process asks teenagers to make one of the biggest decisions of their lives while managing the hardest years of school — and generic advice rarely fits an individual student. We replace guesswork with a structured plan built around your student's strengths, interests, and academic profile, so your family can focus on the decision instead of the logistics.",
    whatsIncluded: [
      "A comprehensive assessment of your student's profile, interests, and goals.",
      "A balanced, personalized college list — reaches, matches, and likelies your student would be glad to attend.",
      "Application and essay planning with milestones set well ahead of deadlines.",
      "Interview preparation and a careful review of every application before it's submitted.",
      "Guidance for your family at every decision point, from first list to final enrollment.",
    ],
    howItWorks: [
      "A discovery call establishes where your student is in the process and what support will help most.",
      "We build a roadmap matched to your student's grade year, with every deadline mapped in advance.",
      "Regular working sessions carry your student through list-building, essays, and applications.",
      "We stay with your family through decisions, helping you weigh offers with clear eyes.",
    ],
    expectedOutcomes: [
      "A college list grounded in genuine fit, not just name recognition.",
      "Applications and essays finished ahead of deadlines — without the December panic.",
      "A student who understands the choices and owns the outcome.",
    ],
    timeline:
      "Engagements most often begin in sophomore or junior year and continue through decisions, but we meet students wherever they are — including senior fall. Shorter, focused engagements for essay support or list review are also available.",
    pricingApproach:
      "College counseling is offered as a comprehensive package or as focused, shorter engagements. During your consult we'll recommend the scope that matches your student's stage — nothing more than what's actually useful.",
    faqs: [
      {
        question: "When should we start?",
        answer:
          "Earlier is calmer. Many families begin in sophomore or junior year, when small, unhurried steps can replace the junior-spring scramble. That said, meaningful support is possible at any stage — including senior fall.",
      },
      {
        question: "Do you write essays for students?",
        answer:
          "No. We coach students through brainstorming, drafting, and revision so the final essay is genuinely theirs — which is also exactly what admissions readers are looking for.",
      },
      {
        question: "Do you support students with learning differences?",
        answer:
          "Yes. Our special education background shapes how we identify colleges with strong support systems — and how we prepare students to advocate for themselves once they're there.",
      },
    ],
  },
  {
    slug: "setss",
    name: "SETSS",
    cardTitle: "SETSS",
    outcomeGroup: "Specialized support",
    shortDescription:
      "Special Education Teacher Support Services delivered by experienced special educators.",
    areaNote:
      "SETSS is a New York City DOE program, available to NYC students through DOE authorization — this service is NYC-specific by nature.",
    whoItsFor: [
      "NYC students whose IEPs recommend SETSS support.",
      "Families who want a qualified, dependable provider for mandated services — and clear communication while they're delivered.",
      "Students who benefit from specialized instruction alongside their general education program.",
    ],
    problemItSolves:
      "When an IEP recommends SETSS, families are handed a mandate and left to find the person who will fulfill it well. The provider matters enormously: sessions should connect directly to IEP goals and to what's happening in the classroom, not run alongside them. We deliver specialized instruction that does both — faithful to the mandate, attentive to the student.",
    whatsIncluded: [
      "Specialized instruction aligned to your child's IEP goals.",
      "Individualized session planning and materials, refreshed as your child progresses.",
      "Consistent progress monitoring, documented throughout the service period.",
      "Communication with your child's school team, where appropriate.",
      "Updates to your family at regular, predictable intervals.",
    ],
    howItWorks: [
      "We review your child's IEP and current levels of performance with you.",
      "A service plan maps each session to your child's IEP goals.",
      "Sessions follow the mandated frequency, with documentation maintained throughout.",
      "Progress is reviewed regularly and shared with your family and, where appropriate, the school team.",
    ],
    expectedOutcomes: [
      "Instruction that works toward the IEP's goals, session by session.",
      "Clear documentation of your child's progress across the service period.",
      "Stronger access to the general education curriculum.",
    ],
    timeline:
      "SETSS typically runs through the school year at the frequency the IEP specifies. Onboarding is quick — from first call to first session is usually one to two weeks.",
    pricingApproach:
      "Structure depends on the mandate and how services are funded, which varies from family to family. During your consult we'll walk you through exactly which options apply to your situation.",
    faqs: [
      {
        question: "What is SETSS?",
        answer:
          "Special Education Teacher Support Services — a New York City DOE program providing specialized instruction from a certified special education teacher to students with IEPs, individually or in small groups. It is available to NYC students through DOE authorization.",
      },
      {
        question: "Who provides the sessions?",
        answer:
          "Certified special education teachers with real experience supporting IEP goals across school, home, and remote settings. We match each student with a provider suited to their mandate, age, and learning profile.",
      },
      {
        question: "Where do sessions take place?",
        answer:
          "Depending on the mandate and your family's preference, sessions may take place at school, at home, or remotely. We'll confirm what's available for your child's situation during your consult.",
      },
    ],
  },
  {
    slug: "iep-advocacy",
    name: "IEP Advocacy",
    cardTitle: "IEP Advocacy",
    outcomeGroup: "Family advocacy",
    shortDescription:
      "Expert virtual guidance through the IEP process so families nationwide can participate with confidence.",
    areaNote:
      "IEP Advocacy is offered virtually to families nationwide. We do not accept advocacy engagements involving the New York City Department of Education.",
    whoItsFor: [
      "Families going through the IEP or evaluation process for the first time.",
      "Parents who want an experienced partner beside them when preparing for IEP meetings.",
      "Families who aren't sure the current plan reflects who their child actually is.",
    ],
    problemItSolves:
      "The special education process is dense with documents, timelines, and terms of art — and parents are asked to make consequential decisions inside it, quickly. We help you understand your child's evaluations, prepare for meetings, and work productively with your school team, so the plan that emerges truly fits your child.",
    whatsIncluded: [
      "A full review of your child's current IEP, evaluations, and progress reports.",
      "A plain-English explanation of what the documents say — and what they mean.",
      "Meeting preparation: the goals to propose, the questions to ask, and the order to raise them.",
      "Attendance at IEP meetings alongside your family, where requested.",
      "Follow-up guidance after decisions are made, so nothing gets lost between meetings.",
    ],
    howItWorks: [
      "We start with a records review and a conversation about your child and your concerns.",
      "You receive a clear summary of where the current plan stands and what deserves attention.",
      "Before each meeting, we prepare together so you walk in informed and organized.",
      "After the meeting, we help you understand the outcomes and plan next steps.",
    ],
    expectedOutcomes: [
      "A clear understanding of your child's evaluations and current plan.",
      "Meetings you walk into prepared — and walk out of understanding.",
      "A collaborative working relationship with your child's school team.",
    ],
    timeline:
      "Many families engage us four to six weeks ahead of an annual review or evaluation meeting — enough time to review records and prepare well. Year-round support is available for families who want continuity.",
    pricingApproach:
      "Advocacy is offered as focused engagements around specific meetings or as ongoing support through the school year. After the initial records review, we'll recommend the scope that fits — and tell you honestly if you don't need us.",
    faqs: [
      {
        question: "Where is IEP Advocacy available?",
        answer:
          "Advocacy is delivered virtually, so we work with families nationwide. One exception: We do not accept advocacy engagements involving the New York City Department of Education.",
      },
      {
        question: "Will you attend IEP meetings with us?",
        answer:
          "Yes, where requested. Many families find that preparing together beforehand and attending together makes meetings calmer and more productive for everyone at the table.",
      },
      {
        question: "Is this the same as legal representation?",
        answer:
          "No. We are educational advocates, not attorneys. Our role is to help you understand the process and participate effectively; if a matter ever calls for legal counsel, we'll tell you plainly.",
      },
    ],
  },
];

export function getService(slug: string): Service {
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) throw new Error(`Unknown service: ${slug}`);
  return service;
}
