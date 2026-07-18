# TrueCourse Education Group — Site Spec v1

## Stack
Next.js (App Router) + Tailwind. Static export. No backend, no database.
Contact form uses Netlify Forms (form name "contact"; url-encoded POST to "/"). Calendly embed placeholder on Contact.

## Global
Top nav: Home | Services | About | Process | Resources | Contact + "Book a Consult" button.
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

### Study Plan Builder (/resources/plan-builder)
Fully client-side tool — no backend, no AI calls, no storage, no login; all state in memory; no network calls. Inputs: free-text subjects with grades in percentage, letter (A+–F), or NY scale (NY/L/P/M); optional per-subject struggle topics; goal (raise grades / pass exams / get ahead); weekly hours slider (2–20); cadence (weekly day-by-day / monthly 4 weekly themes / quarterly 3 monthly phases with checkpoints). NY Regents mode preloads the five common Regents subjects with 65-passing-score context. Engine: pure deterministic functions in lib/planBuilder.ts (normalize → classify red <55 / yellow 55–74 / green 75+ → rank → allocate hours by need → assemble from lib/strategyBlocks.ts). Copy uses educational study-skills language only — no clinical/diagnostic/therapy terms, and no "AI" claims anywhere.

### Contact
Short intro, form (name, email, phone, role type, service of interest, message, preferred contact), service area, response window "within 2 business days".

## Rules
Placeholder copy where content not specified. No adversarial references to any school district. No "ABA"/"behavior analysis" service claims.
Positioning is virtual-nationwide, with two exceptions: SETSS is NYC-specific by nature (NYC DOE program), and IEP Advocacy excludes engagements involving the NYC DOE.
