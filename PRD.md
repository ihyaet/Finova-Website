# PRD.md — Finova

## Overview & Audience

Finova is a fintech SaaS platform that provides financial infrastructure for startups, consultants, and investment firms. This project is the marketing website — a conversion-focused landing page with supporting auth and demo booking pages.

### Target Audience

- **Fintech startups** — seed to Series B, need fast onboarding and API-first tools
- **Financial consultants** — manage client portfolios, need compliance and reporting
- **Investment firms** — process high volumes, need risk management and uptime guarantees

### Brand Positioning

- Modern, dark-themed, developer-friendly but accessible to non-technical buyers
- Tone: confident, concise, no fluff — let the product speak
- Visual identity: dark canvas (#07080f), purple/violet accent palette, monospace headings, clean UI previews
- Hero uses a code/matrix texture background with scattered monospace characters
### Language

- English only
- Copy can be sourced from design screenshots or generated when needed. Match the existing brand tone — confident, concise, fintech-specific.

---

## Page List

| # | Page | Route | Status | Notes |
|---|------|-------|--------|-------|
| 1 | Home / Landing | `/` | Primary | Main conversion funnel |
| 2 | Sign In | `/sign-in` | Secondary | Email + password, Google SSO |
| 3 | Sign Up | `/sign-up` | Secondary | Name, email, company, password, Google SSO |
| 4 | Book a Demo | `/book-demo` | Secondary | Contact form + time slot selector |

### Possible Future Pages (from footer nav)

| Page | Route | Notes |
|------|-------|-------|
| Analytics Dashboard | `/products/analytics` | Product detail page |
| API Gateway | `/products/api` | Product detail page |
| Risk Engine | `/products/risk` | Product detail page |
| Compliance Tools | `/products/compliance` | Product detail page |
| Payment Infrastructure | `/products/payments` | Product detail page |
| Documentation | `/resources/docs` | External or separate app |
| API Reference | `/resources/api-reference` | External or separate app |
| Developer Guides | `/resources/guides` | External or separate app |
| Changelog | `/resources/changelog` | Could be a simple page |
| About Us | `/company/about` | Company page |
| Careers | `/company/careers` | Company page |
| Security & Trust | `/company/security` | Company page |

These are not in scope for the current build — listed here for future route planning and to keep nav links consistent.

### Shared Layout

All pages share:
- Navbar with logo (FINOVA, all caps), nav links (Products +, Use cases +, Resources +, FAQ, Contact), and Sign in/up button in pill shape
- Announcement ribbon above navbar
- Pages 2–4 use a two-column layout: left = brand messaging panel, right = form

---

## Home — Section Structure

All copy is sourced from design screenshots. Sections listed below by name only — detailed layout and content come from the design files.

1. Announcement ribbon
2. Hero
3. Logo bar (clients)
4. Feature value
5. Integration
6. Numbers
7. Why Finova
8. FAQ
9. Testimonials
10. CTA
11. Footer

---

## Do & Don't

### Do

- Follow the layout structure from design screenshots
- Adjust spacing, padding, and micro-details freely for better code output
- Use the code/matrix character texture on the hero background (scattered monospace characters at low opacity)
- Use the amber "Limited" pill style for the announcement ribbon
- Use all-caps for the logo: FINOVA
- Keep all sections dark-themed — background #07080f
- Build one section/component at a time
- Make all tab interfaces functional with real switching behavior
- Include hover states on cards, buttons, and interactive elements
- Use semantic HTML (section, nav, main, footer)
- Use icons alongside tab labels (as shown in the design — each tab has an icon + text)
- Use a pill-shaped nav container with + indicators for dropdown menus
- Include a time period switcher (Last 6 Months / Last Year) on the analytics dashboard tab
- Match the 4-column footer layout: Products, Use cases, Resources, Company
- Use monospace font for section headings and metric numbers

### Don't

- Don't use light mode or white backgrounds on any section
- Don't use a 5th "Follow us" column in the footer — the design shows 4 columns only
- Don't use "Finova" in sentence case for the logo — it's always FINOVA in all caps
- Don't include "Pricing" in the main nav — the design shows FAQ instead
- Don't use NativeScript — the old badge is replaced with "#1 Financial Architecture Platform"
- Don't use generic SaaS copy like "streamline your workflow" or "unlock your potential"
- Don't add a blog/resources section — it was explicitly cut
- Don't add a separate security & compliance section — it lives inside Why Finova
- Don't add a separate use cases section — it was cut
- Don't use emoji anywhere
- Don't create modals or popups — all content is in-page
- Don't assume mobile-first — desktop is the primary viewport, responsive is secondary
- Don't forget the green accent color on "Finance" in the hero headline
