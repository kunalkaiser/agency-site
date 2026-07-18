# TrueCourse Education Group — Site Spec v1

## Stack
Next.js (App Router) + Tailwind. Static export. No backend, no database.
Contact form uses Netlify Forms (form name "contact"; url-encoded POST to "/"). Calendly embed placeholder on Contact.

## Global
Top nav: Home | Services | About | Process | Resources | Free Tools | Contact + "Book a Consult" button.
Newsletter capture: Netlify Forms (name="newsletter", honeypot, email only), pitch "One new free tool or guide each month — no spam, unsubscribe anytime." — on /tools, Resources, and a slim footer block sitewide. Same static-HTML registration technique as the contact form.
Analytics: pluggable slot in the root layout renders a beacon script only when NEXT_PUBLIC_ANALYTICS_SRC and NEXT_PUBLIC_ANALYTICS_TOKEN are set (Cloudflare Web Analytics format — cookieless, no consent banner needed at this tier).
OG conventions: public/og.png is the branded social card (1200×630, navy/warm, no external assets); every route sets openGraph via the og() helper in lib/site.ts so og:url is correct per page; titles/descriptions are unique value props per tool/toolkit/article.

### Free Tools hub (/tools)
Single directory of every free tool and interactive resource — Study Coach, Plan Builder, the four guided toolkits, all articles, and the ZenEd external card — with client-side audience filter tabs (All / Parents / Teachers / Students) and one-line value props per card. Resources page keeps its sections but its featured card routes through /tools.
Footer: Privacy, Terms, Accessibility, Contact, LinkedIn, Email, service area line "Virtual services for families nationwide".
Design: premium, calm, institutional. Generous whitespace, strong typography, navy/warm-neutral palette. No stock-photo clichés.

## Pages (9)

### 1. Home
Hero headline: "Strategic education and behavioral support for students, families, and schools."
Subheadline: virtual services for families nationwide — tutoring, college counseling, special education support, advocacy.
Primary CTA "Book a Consult", secondary "Explore Services".
Sections: 4 service cards → Why us → Who we help (parents/students/schools) → Process preview (3 steps) → Credentials strip → Resources teaser → Final CTA.

### 2. Services (hub)
Intro + 4 cards linking to service pages, grouped by outcome.

### 3–6. Service pages (shared template)
Tutoring | College Counseling | SETSS (NYC-specific by nature: a NYC DOE program available to NYC students through DOE authorization — state this explicitly on page) | IEP Advocacy (virtual, nationwide; does not accept engagements involving the NYC DOE — state this explicitly on page).
IEP Advocacy is currently flag-hidden (`hidden: true` in lib/services.ts) pending re-enable: excluded from listings, prose, contact form, and sitemap; its route 404s. Page component and content are intact — flipping the flag restores it fully.
Template sections: Who it's for → Problem it solves → What's included → How it works → Expected outcomes → Timeline → Pricing approach (no numbers) → FAQ (3 questions) → CTA.

### 7. About
Mission → Founder story → Experience & credentials (PhD in Molecular Biomedical Technology; master's in special education; practicing special education teacher in public schools; adjunct at Mercy University; 10+ years across research and management consulting; published researcher with peer-reviewed publications and patents; founder-led — every family works directly with the founder) → Service philosophy → Why different → CTA.

### 8. Process
7 steps: Inquiry → Discovery call → Assessment → Service plan → Delivery → Progress review → Ongoing support. Numbered vertical timeline layout.

### 9. Resources
Featured tool row above the audience grids: Study Plan Builder (/resources/plan-builder) + external link card to ZenEd (https://kunalkaiser.github.io/zened/), our free companion Regents-readiness site for NY students.
Three audience sections: Parents (primary, 3 placeholder guides), Teachers (2 placeholder downloads), Students (2 placeholder tools). Card grid per audience. Email-capture placeholder.

### Study Coach (/resources/study-coach)
Flagship free tool, featured above the toolkit grid on Resources. Chat-style UI over a fully scripted decision tree (Understood.org Parent Coach pattern) — coach bubbles with a brief typing delay, tappable option chips, back and restart controls. NOT live AI: deterministic data in app/resources/study-coach/coachData.ts; no backend, no AI/API calls, no storage, no login; no "AI" claims in copy. Flow: greeting → subject (Math / English & writing / Science / History & social studies) → curated topic list per subject → optional free-text detail (echoed into the plan header as "Your focus: …" and matched against a keyword map to refine the topic — never interpreted beyond that) → struggle type (totally lost / fine in class but tests go badly / careless mistakes / out of time) → time budget (15 min/day, 30 min/day, weekends) → focused 2-week plan in the chat: strategy steps from a strategy-blocks set (retrieval practice, worked examples, error logs, past-question drills, teach-back, spaced review) plus 2–4 linked FREE resources per topic. Resource rules: well-established free platforms only (Khan Academy, CK-12, Desmos, OpenStax, LabXchange, CommonLit, Quill, Crash Course, Purdue OWL, PhET, iCivics, Nat Geo Education), at least two non-Khan options per topic, deep links only where stable, no paid/login-walled/obscure sites, no invented URLs (all verified live). Plans end with the standard educational disclaimer, print view, and consult CTA.

### Guided Toolkits (/resources/toolkits/[slug])
Reusable client-side decision-tree component (components/GuidedToolkit.tsx): steps defined as data (question → 2–4 tappable options → next step or outcome), progress indication, back button; outcome screens show 3–5 concrete strategy steps, an optional "related reading" link to an existing resource article, a consult CTA, and the same one-line educational disclaimer used by articles. No backend, no AI calls, no form submission — pure static/client state. Content lives in app/resources/toolkits/toolkits.ts. Four parent toolkits: ending-screen-time, homework-without-battles, calmer-mornings, big-feelings-after-school — linked from an "Interactive Toolkits" section on Resources and listed in the sitemap.
Toolkit content rules (hard): educational parenting strategies only, plain language; no clinical or diagnostic terms; no "ABA", "behavior analysis", "therapy", "treatment", or "intervention" framing; nothing age-inappropriate; tone matches the resource articles.

### SAT Schedule Builder (/resources/sat-schedule)
Fully client-side (no backend, no AI, no storage, no network in the tool), mirroring Plan Builder patterns. Inputs: test date (or "haven't registered yet" → assumes ~10 weeks out and says so); most recent total score 400–1600 (or "haven't taken one yet"; PSAT accepted and labeled); target score; weakest-area chips (reading / grammar / algebra / advanced math / not sure); weekly hours slider 2–15; optional fee-waiver toggle that adds the official College Board fee-waiver link. Engine: pure functions in lib/satSchedule.ts — weeks remaining, score gap with HONEST pace note (aggressive combinations flagged plainly with a suggested intermediate target; never promise gains), phased plan adapting to runway (long: foundations → targeted → full-length practice → final-week taper; <4 weeks: compressed practice-heavy), weekly hours split across Reading & Writing / Math weighted toward the weak area in day-by-day blocks, full-length Bluebook practice tests at sensible intervals (never in the final 2 days; final week = review + logistics) each followed by an error-review session. SAT-specific strategy blocks follow the strategy-blocks pattern. Resource links: official/free only, verified live (Khan Academy Official Digital SAT Prep, College Board Bluebook, College Board practice hub, fee-waiver page). Never state College Board policy details (test counts, deadlines, fees) — link out instead. Output is printable with phase labels, weekly totals, highlighted test days, disclaimer, consult CTA.

### Study Plan Builder (/resources/plan-builder)
Fully client-side tool — no backend, no AI calls, no storage, no login; all state in memory; no network calls. Inputs: free-text subjects with grades in percentage, letter (A+–F), or NY scale (NY/L/P/M); optional per-subject struggle topics; goal (raise grades / pass exams / get ahead); weekly hours slider (2–20); cadence (weekly day-by-day / monthly 4 weekly themes / quarterly 3 monthly phases with checkpoints). NY Regents mode preloads the five common Regents subjects with 65-passing-score context. Engine: pure deterministic functions in lib/planBuilder.ts (normalize → classify red <55 / yellow 55–74 / green 75+ → rank → allocate hours by need → assemble from lib/strategyBlocks.ts). Copy uses educational study-skills language only — no clinical/diagnostic/therapy terms, and no "AI" claims anywhere.

### Contact
Short intro, form (name, email, phone, role type, service of interest, message, preferred contact), service area, response window "within 2 business days".

## Rules
Placeholder copy where content not specified. No adversarial references to any school district. No "ABA"/"behavior analysis" service claims.
Positioning is virtual-nationwide, with two exceptions: SETSS is NYC-specific by nature (NYC DOE program), and IEP Advocacy excludes engagements involving the NYC DOE.
