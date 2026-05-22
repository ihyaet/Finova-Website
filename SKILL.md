# SKILL.md — Finova

## Framework

### Next.js

- Version: latest stable (Next.js 15+)
- Router: App Router only — never use Pages Router
- Rendering: default to Server Components, use `'use client'` only when interactivity is needed
- File structure:
```
/app
  /page.tsx                 → home landing page
  /sign-in/page.tsx
  /sign-up/page.tsx
  /book-demo/page.tsx
  /layout.tsx               → shared layout (navbar, ribbon, footer)
/components
  /sections                 → one folder per section
    /hero/
    /logo-bar/
    /feature-value/
    /integration/
    /numbers/
    /why-finova/
    /faq/
    /testimonials/
    /cta/
  /ui                       → shared primitives (button, input, badge, card)
  /layout                   → navbar, footer, announcement-ribbon
/lib                        → utilities, constants, helpers
/public
  /images                   → optimized assets
/styles
  /globals.css              → Tailwind base, font-face, CSS variables
```
- TypeScript always — no .js files
- Each section is a separate component — never build the entire page in one file
- Metadata: define in layout.tsx, override per page where needed

### Fonts — Geist (npm package)

- Install: `npm i geist`
- Import in `app/layout.tsx`:
```tsx
import { GeistSans } from 'geist/font/sans'
import { GeistPixelSquare } from 'geist/font/pixel'

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistPixelSquare.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```
- Reference in `tailwind.config.ts`:
```ts
fontFamily: {
  sans: ['var(--font-geist-sans)', 'sans-serif'],
  pixel: ['var(--font-geist-pixel-square)', 'monospace'],
}
```
- Use `font-pixel` for all headings and metric numbers
- Use `font-sans` for all body text, labels, buttons, inputs
- Never set font-family via inline styles — use Tailwind classes only

### Tailwind CSS

- Version: latest stable (v4+)
- Extend theme in tailwind.config.ts with Finova tokens:
```ts
colors: {
  base: '#07080f',
  surface: '#0e1017',
  'input-bg': '#1a1c27',
  green: '#5DCAA5',
  amber: '#EF9F27',
  'primary-400': '#b2a9db',
  'primary-dark-300': '#555660',
}
fontFamily: {
  pixel: ['GeistPixelSquare', 'monospace'],
  sans: ['GeistSans', 'sans-serif'],
}
```
- Never use arbitrary color values — always use registered tokens
- Use arbitrary values only for sizing not in the default scale: h-[44px], max-w-[1160px]
- Class order: layout → spacing → typography → color → border → effects

### shadcn/ui

- Version: latest
- Install components as needed — do not install everything upfront
- First installs: button, input, accordion (FAQ), tabs (hero preview), badge
- Override shadcn defaults to match Finova style:
  - Button: h-[44px] font-sans text-base rounded-full
  - Input: h-[44px] font-sans text-base rounded-xl bg-input-bg
  - Never use shadcn default colors or radius — always use Finova Tailwind tokens
- Do not use shadcn's built-in theming or CSS variables for colors

---

## Icon Library

### Phosphor Icons

- Package: @phosphor-icons/react (latest)
- Import pattern:
```tsx
import { ArrowRight, ChartBar, ShieldCheck } from '@phosphor-icons/react'
```
- Default size: 20px inline/UI icons, 24px decorative/section icons
- Default weight: regular — use bold only for emphasis
- Never use Tabler, Heroicons, Lucide, or any other icon library
- Always pass aria-hidden="true" on decorative icons
- Icon-only buttons must have aria-label

---

## Motion

### GSAP

- Package: gsap + @gsap/react (latest)
- Use for: section reveals, hero text entrance, metric counter animations, tab transitions
- Always wrap GSAP in useGSAP() hook from @gsap/react
- Use ScrollTrigger for scroll-based reveals:
```tsx
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
```
- Default scroll reveal:
```tsx
gsap.from(el, {
  opacity: 0,
  y: 40,
  duration: 0.7,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: el,
    start: 'top 85%',
  }
})
```
- Card grid stagger: stagger: 0.08
- Never use CSS animation/transition for scroll-triggered effects — GSAP only
- CSS transitions are fine for hover states (color, border, opacity)

### Lenis

- Package: lenis (latest)
- Use for: smooth scroll on the entire page
- Initialize once in root layout as a client component:
```tsx
'use client'
import Lenis from 'lenis'
import { useEffect } from 'react'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis()
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])
  return <>{children}</>
}
```
- Connect Lenis to GSAP ScrollTrigger:
```tsx
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```
- Never use scroll-behavior: smooth in CSS — Lenis handles all smooth scrolling

---

## Image Handling

### next/image

- Always use next/image — never raw img tags
- Always provide width, height, and alt props
- Use priority on hero and above-the-fold images
- Use loading="lazy" default for below-the-fold
- Format preference: .webp for photos, .svg for icons and logos
- Use placeholder="blur" with blurDataURL for large images

### Asset Organization

```
/public/images/logos/           → client logos, .svg only
/public/images/integrations/    → integration icons, .svg or .webp 40x40px
/public/images/sections/        → section illustrations or previews
/public/og.png                  → OG image 1200x630px
/public/favicon.ico
/public/icon.svg
```

### Logo Rules

- Render at h-8 with w-auto
- Apply opacity-50 on dark bg, opacity-80 on hover

---

## Responsive Rules

### Breakpoints

Add to tailwind.config.ts:
```ts
screens: {
  sm: '393px',
  md: '744px',
  lg: '1440px',
}
```

### Max Width Container

Use this wrapper on every section — never use Tailwind's container class:
```tsx
<section className="w-full">
  <div className="mx-auto w-full max-w-[1160px] px-5 md:px-10 lg:px-0">
    {/* content */}
  </div>
</section>
```
- Viewports > 1600px: content stays at 1160px max-width, centered
- Page margin: 20px mobile → 40px tablet → 140px desktop (handled by px values above)

### Spacing per Breakpoint

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Section gap | 60px | 80px | 120px |
| Inner gap large | 32px | 40px | 48px |
| Card grid gap | 8px | 12px | 12px |
| Card padding | 16px | 20px | 24px |

### Grid Patterns

- Two-column: grid-cols-1 md:grid-cols-2
- Four-column: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Three-column: grid-cols-1 md:grid-cols-3
- 2x2 grid: grid-cols-1 md:grid-cols-2
- Never force 3 columns on tablet — collapse to 2

### Typography Scaling

| Level | Mobile | Desktop |
|-------|--------|---------|
| H1 | 48px | 64px |
| H2 | 36px | 56px |
| H3 | 28px | 48px |
| H4 | 24px | 36px |
| Body | 16px | 16px |

---

## General Code Rules

- TypeScript always — define prop types for every component
- No any types — use proper interfaces
- Keep components under 150 lines — extract sub-components when longer
- No inline styles — Tailwind classes only
- No !important overrides
- Use cn() from clsx + tailwind-merge for conditional classes
- All interactive elements need visible keyboard focus states
- Add aria-label to icon-only buttons and elements without visible text
