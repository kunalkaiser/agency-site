# TrueCourse Education Group — agency-site

Marketing site. Next.js (App Router) + Tailwind, static export. No backend, no database.
Source of truth for structure/content: SPEC.md — read it before any change. Never modify SPEC.md.

## Rules
- All four service pages render through the single shared ServicePageTemplate. Never fork per-page layouts.
- No "ABA" or "behavior analysis" service claims anywhere on the site.
- IEP advocacy content is Westchester-only — keep that stated on its page.
- No adversarial references to any school district.
- Contact form endpoint comes from NEXT_PUBLIC_FORM_ENDPOINT env var (client-side, inlined at build). Never hardcode secrets or endpoints.
- No new dependencies unless explicitly instructed.
- Every change ends with `npm run build` passing with zero errors.

## Commands
- Dev: npm run dev (http://localhost:3000)
- Build check: npm run build
