# TrueCourse Education Group — agency-site

Marketing site. Next.js (App Router) + Tailwind, static export. No backend, no database.
Source of truth for structure/content: SPEC.md — read it before any change. Never modify SPEC.md.

## Rules
- All four service pages render through the single shared ServicePageTemplate. Never fork per-page layouts.
- No "ABA" or "behavior analysis" service claims anywhere on the site.
- IEP advocacy content is Westchester-only — keep that stated on its page.
- No adversarial references to any school district.
- Contact form uses Netlify Forms (form name "contact", attributes in components/ContactForm.tsx; submits url-encoded POST to "/"). No env vars required. Never hardcode secrets or endpoints.
- No new dependencies unless explicitly instructed.
- Every change ends with `npm run build` passing with zero errors.

## Commands
- Dev: npm run dev (http://localhost:3000)
- Build check: npm run build

## Deployment
- Host: Netlify site "agency-site-tcg" (https://agency-site-tcg.netlify.app)
- Auto-deploys on push to main (github.com/kunalkaiser/agency-site, public);
  Netlify runs `npm run build` and publishes `out/`
- Form submissions land in Netlify dashboard → Forms
- SITE_URL in lib/site.ts is still the placeholder https://example.com —
  update it (sitemap/robots/OG URLs) when a custom domain is attached
