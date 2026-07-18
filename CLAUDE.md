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
- No new dependencies unless explicitly instructed.
- Study Coach (/resources/study-coach) is a chat-STYLE scripted decision tree (components/StudyCoach.tsx + data in app/resources/study-coach/coachData.ts) — NOT live AI, and copy must never claim AI. Fully client-side: no backend, no AI/API calls, no storage, no login. External links in plans must be well-established free platforms, ≥2 non-Khan per topic, real verified URLs only. Plans end with the articles' disclaimer, a print view, and a consult CTA.
- Guided Toolkits (/resources/toolkits/[slug]) use the reusable decision-tree component components/GuidedToolkit.tsx with content-as-data in app/resources/toolkits/toolkits.ts. Client state only — no backend, no AI calls, no form submission. Toolkit copy is educational parenting strategy language only: no clinical/diagnostic terms and no "ABA"/"behavior analysis"/"therapy"/"treatment"/"intervention" framing; every outcome screen carries the articles' one-line educational disclaimer and a consult CTA.
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
