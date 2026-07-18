# TrueCourse Education Group — agency-site

Marketing site. Next.js (App Router) + Tailwind, static export. No backend, no database.
Source of truth for structure/content: SPEC.md — read it before any change. Never modify SPEC.md.

## Rules
- All four service pages render through the single shared ServicePageTemplate. Never fork per-page layouts.
- No "ABA" or "behavior analysis" service claims anywhere on the site.
- Positioning is virtual-nationwide ("Virtual services for families nationwide"), with two exceptions kept stated on their pages: SETSS is NYC-specific by nature (a NYC DOE program available to NYC students through DOE authorization), and IEP advocacy is virtual-nationwide but does not accept engagements involving the NYC DOE.
- IEP Advocacy is flag-hidden pending re-enable (`hidden: true` on its entry in lib/services.ts). Hidden services are excluded from listings, prose (via ADVOCACY_VISIBLE), contact form, and sitemap, and their route 404s — content stays intact; flip the flag to restore. The three IEP resource articles stay published.
- No adversarial references to any school district.
- Contact form uses Netlify Forms (form name "contact", attributes in components/ContactForm.tsx; submits url-encoded POST to "/"). No env vars required. Never hardcode secrets or endpoints.
- Newsletter uses Netlify Forms too (form name "newsletter", components/NewsletterForm.tsx: honeypot + email only, inline success). Rendered on /tools, Resources, and the footer sitewide — the static HTML registers the form at deploy.
- /tools is the Free Tools hub (app/tools/tools-data.ts aggregates Study Coach, Plan Builder, toolkits, articles, ZenEd; components/ToolsDirectory.tsx renders client-side audience filter tabs). "Free Tools" is in the nav.
- Analytics is env-gated: the AnalyticsSlot in app/layout.tsx renders a beacon <script> only when NEXT_PUBLIC_ANALYTICS_SRC and NEXT_PUBLIC_ANALYTICS_TOKEN are both set (Cloudflare Web Analytics beacon format). Cookieless — no consent banner needed at this tier. No env vars → no script.
- OG/social: public/og.png is the branded card; every page's metadata sets openGraph via og("<path>") from lib/site.ts (Next does NOT deep-merge openGraph, so always pass the full object). Keep titles/descriptions unique, value-prop phrased.
- No new dependencies unless explicitly instructed.
- Legal pages (/privacy, /terms, /accessibility) are comprehensive drafts gated by the attorney-review banner in components/LegalPage.tsx — keep the banner until counsel signs off, keep dispute resolution as the ATTORNEY-TO-COMPLETE placeholder (never draft arbitration terms), and keep every factual claim in the Privacy Policy true to the code (forms, cookies, analytics, client-side tools). If site behavior changes (new form, analytics enabled, storage added), update /privacy in the same change.
- Study Coach (/resources/study-coach) is a chat-STYLE scripted decision tree (components/StudyCoach.tsx + data in app/resources/study-coach/coachData.ts) — NOT live AI, and copy must never claim AI. Fully client-side: no backend, no AI/API calls, no storage, no login. External links in plans must be well-established free platforms, ≥2 non-Khan per topic, real verified URLs only. Plans end with the articles' disclaimer, a print view, and a consult CTA.
- Classroom Strategy Finder (/resources/classroom/[slug], data in app/resources/classroom/classroom.ts): symptom-first teacher pages limited to academic-engagement situations. Hard content rules: plain teacher language; no clinical/diagnostic/therapy/behavior-analysis terms; no tier/PBIS/MTSS vocabulary; "underneath" sections are questions, never conclusions; situations describe behavior, never character; every page keeps its "When to loop in others" section (family / grade team / counselor).
- Printable templates (/resources/templates/[slug]): data blocks in app/resources/templates/templates.ts rendered by components/TemplateSheet.tsx; each must stay a one-page US Letter printable (screen-only intro/disclaimer via print:hidden; @page letter in globals.css). Content: district-agnostic, no legal/compliance claims, privacy-conscious wording (initials/codes) wherever student info is written, no clinical terms.
- Service-fit chooser (/resources/which-support): shared chat UI, scripted routing table in app/resources/which-support/chooserData.ts. Every path ends at ONE visible service or free tool; free tool recommended first when it genuinely fits ("start free" bias); service links resolve via VISIBLE_SERVICES so hidden services can never appear; consult CTA is always framed as optional. Nine guided toolkits total (four routine/behavior + five academic-parenting).
- Toolkit conversations follow the five-stage conversational arc (branch → empathy bubbles → ONE strategy card behind a "How do I start?" chip → personalization + pick chips → staged close bubbles); the ~60-word/one-card pacing rule is enforced in components/CoachChat.tsx (splitForPacing) — never render a monolithic outcome screen, and keep spot illustrations original inline SVGs (aria-hidden, site palette). The which-support chooser ends with the same explain → recommend-card → optional-next-step bubble sequence.
- Guided Toolkits (/resources/toolkits/[slug]) use the reusable decision-tree component components/GuidedToolkit.tsx with content-as-data in app/resources/toolkits/toolkits.ts. Client state only — no backend, no AI calls, no form submission. Toolkit copy is educational parenting strategy language only: no clinical/diagnostic terms and no "ABA"/"behavior analysis"/"therapy"/"treatment"/"intervention" framing; every outcome screen carries the articles' one-line educational disclaimer and a consult CTA.
- SAT Schedule Builder (/resources/sat-schedule) is fully client-side (engine in lib/satSchedule.ts, pure/deterministic — `today` is injected). Pacing language must stay honest: never promise score gains; aggressive gap/timeline combos get flagged with an intermediate target. Never state College Board policy details (practice-test counts, deadlines, fees) in copy — link to official pages instead. Resource links: official/free only, verified URLs.
- Study Plan Builder (/resources/plan-builder) is fully client-side: no backend, no AI calls, no storage, no network calls — keep it that way. Engine is pure/deterministic in lib/planBuilder.ts with strategy content in lib/strategyBlocks.ts. Copy is study-skills language only (no clinical/diagnostic/therapy terms, no "AI" claims). Resources page cross-links ZenEd (https://kunalkaiser.github.io/zened/), our free companion Regents site.
- Every change ends with `npm run build` passing with zero errors.

## Commands
- Dev: npm run dev (http://localhost:3000)
- Build check: npm run build

## Deployment
- Host: Netlify site "agency-site-tcg" (https://agency-site-tcg.netlify.app)
- Auto-deploys on push to main (github.com/kunalkaiser/agency-site, public);
  Netlify runs `npm run build` and publishes `out/`
- Form submissions land in Netlify dashboard → Forms
- SITE_URL in lib/site.ts is the Netlify URL (https://agency-site-tcg.netlify.app) —
  swap it (sitemap/robots/OG URLs) when the custom domain is attached
