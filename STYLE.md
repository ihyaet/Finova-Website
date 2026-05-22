# STYLE.md — Finova

## Color

### Base

| Token | Hex | Usage |
|-------|-----|-------|
| bg-base | #07080f | Page background, all sections |
| bg-surface | #0e1017 | Cards, elevated surfaces |
| bg-input | #1a1c27 | Input fields idle state |
| border-default | rgba(255,255,255,0.08) | Default borders, dividers |
| border-hover | rgba(255,255,255,0.15) | Hover state borders |
| text-primary | #ffffff | Headings, primary text |
| text-secondary | rgba(255,255,255,0.65) | Body text, descriptions |
| text-muted | rgba(255,255,255,0.38) | Labels, hints, sublabels |
| text-dim | rgba(255,255,255,0.2) | Disabled, placeholder |

### Accent — Green

| Token | Hex | Usage |
|-------|-----|-------|
| green | #5DCAA5 | Primary accent, "Finance" highlight, positive indicators |

### Accent — Amber

| Token | Hex | Usage |
|-------|-----|-------|
| amber | #EF9F27 | Warning states, "Limited" ribbon pill |

### Primary (Purple) — Full Ramp

From design system. Used for brand accents, badges, active states, and gradient elements.

| Stop | Hex | RGB | Usage |
|------|-----|-----|-------|
| primary-50 | #f5f4fb | 245, 244, 251 | Lightest fill (light mode only) |
| primary-100 | #e1def1 | 225, 222, 241 | Light fill |
| primary-200 | #d3ceea | 211, 206, 234 | Light fill |
| primary-300 | #bfb7e1 | 191, 183, 225 | Subtle accent |
| primary-400 | #b2a9db | 178, 169, 219 | Badge backgrounds |
| primary-500 | #9f94d2 | 159, 148, 210 | Mid tone |
| primary-600 | #9187bf | 145, 135, 191 | Borders on dark |
| primary-700 | #716995 | 113, 105, 149 | Muted text on light |
| primary-800 | #575174 | 87, 81, 116 | Strong text on light |
| primary-900 | #433e58 | 67, 62, 88 | Darkest |

### Primary Dark — Full Ramp

| Stop | Hex | RGB | Usage |
|------|-----|-----|-------|
| primary-dark-50 | #e6e6e7 | 230, 230, 231 | Text on dark bg |
| primary-dark-100 | #b0b1b6 | 176, 177, 182 | Secondary text on dark |
| primary-dark-200 | #8a8b92 | 138, 139, 146 | Muted text on dark |
| primary-dark-300 | #555660 | 85, 86, 96 | Borders, dividers |
| primary-dark-400 | #343541 | 52, 53, 65 | Elevated surface |
| primary-dark-500 | #010312 | 1, 3, 18 | Deep bg |
| primary-dark-600 | #010310 | 1, 3, 16 | Deeper bg |
| primary-dark-700 | #01020d | 1, 2, 13 | Near black |
| primary-dark-800 | #01020a | 1, 2, 10 | Near black |
| primary-dark-900 | #000108 | 0, 1, 8 | True black |

### Semantic States

| State | Border | Usage |
|-------|--------|-------|
| active | primary-400 (#b2a9db) | Focused input, active tab |
| danger | #e24b4a | Error state input border |
| positive | #5DCAA5 | Success state input border |

---

## Typography

### Heading — Geist Pixel Square

Font source: `npm i geist` → import from `geist/font/pixel`. Use `GeistPixelSquare` variant specifically.

| Level | Size | Line Height | Letter Spacing | Weight |
|-------|------|-------------|----------------|--------|
| H1 | 64px | 72px | -6% | Regular |
| H2 | 56px | 64px | -4% | Regular |
| H3 | 48px | 56px | -4% | Regular |
| H4 | 36px | 44px | -4% | Regular |
| H5 | 24px | 32px | -4% | Regular |
| H6 | 20px | 24px | -4% | Regular |

### Body — Geist Sans

Font source: `npm i geist` → import from `geist/font/sans`. Same package as Geist Pixel.

| Size Name | Size | Line Height | Letter Spacing | Weights Available |
|-----------|------|-------------|----------------|-------------------|
| Text XL | 18px | 24px | -2% | Semibold, Medium, Regular |
| Text L | 16px | 24px | -2% | Semibold, Medium, Regular |
| Text M | 14px | 20px | -2% | Semibold, Medium, Regular |
| Text S | 12px | 20px | -2% | Semibold, Medium, Regular |

### Usage Rules

- All section headings (h1–h3): Geist Pixel
- Body text, descriptions, labels: Geist Sans
- Metric numbers and code: Geist Pixel
- Nav items, buttons, inputs: Geist Sans — Text L Regular
- Tags, badges, small labels: Geist Sans — Text S
- Eyebrow / section label: Geist Sans — Text S, uppercase, letter-spacing 1px

---

## Border Radius

| Element | Radius |
|---------|--------|
| Buttons | 100px (full pill) |
| Input fields | 12px |
| Cards | 12px |
| Badges / pills | 100px (full pill) |
| Tab containers | 12px |
| Inner elements (mini cards, code blocks) | 8px |
| Avatars | 50% (circle) |

---

## Button Styles

Height: 44px for all buttons. Font: Geist Sans — Text L Regular (16px).

### Primary (solid)

- Background: #ffffff
- Text: #07080f (bg-base)
- Border: none
- Border radius: 100px
- Hover: slight opacity reduction or scale

### Ghost (outline)

- Background: transparent
- Text: rgba(255,255,255,0.8)
- Border: 0.5px solid rgba(255,255,255,0.2)
- Border radius: 100px
- Hover: background rgba(255,255,255,0.05)

### Sizes

- Default: height 44px, padding 0 24px
- Small: height 36px, padding 0 16px, Text M

---

## Input Styles

Height: 44px for all inputs. Font: Geist Sans — Text L Regular (16px).

### States

| State | Background | Border | Notes |
|-------|------------|--------|-------|
| Idle | #1a1c27 | 0.5px solid rgba(255,255,255,0.1) | Placeholder: text-dim |
| Active / Focus | #1a1c27 | 1px solid primary-400 (#b2a9db) | Purple glow ring optional |
| Danger | #1a1c27 | 1px solid #e24b4a | Red border |
| Positive | #1a1c27 | 1px solid #5DCAA5 | Green border |

### Input Structure

- Left icon: 20px, color text-muted, 12px from left edge
- Text: 16px, left padding 40px (when icon present), 16px (no icon)
- Border radius: 12px
- Placeholder color: text-dim

---

## Spacing

### Grid System

| Breakpoint | Width | Columns | Margin | Gutter |
|------------|-------|---------|--------|--------|
| Desktop | 1440px | 12 | 140px | 24px |
| Tablet | 744px | 8 | 40px | 16px |
| Mobile | 393px | 4 | 20px | 12px |

### Max Width

- Content area max-width: 1160px (1440 − 140 − 140)
- For viewports > 1600px: keep max content width at 1160px, center horizontally
- Never stretch content beyond 1160px

### Section Spacing

| Spacing | Size | Usage |
|---------|------|-------|
| Section gap | 120px | Between major sections (desktop) |
| Section gap tablet | 80px | Between major sections (tablet) |
| Section gap mobile | 60px | Between major sections (mobile) |
| Inner gap large | 48px | Between section header and content |
| Inner gap medium | 24px | Between related elements |
| Inner gap small | 12px | Between tightly coupled elements |
| Card padding | 24px | Internal card padding |
| Card padding mobile | 16px | Internal card padding on mobile |

### Component Spacing

| Element | Gap |
|---------|-----|
| Card grid | 12px (desktop), 8px (mobile) |
| Button group | 12px |
| Icon + text | 8px |
| Label to input | 6px |
| Nav items | 4px between items inside pill |

---

## Rules

- Dark mode only — no light mode variant needed
- All backgrounds use bg-base (#07080f) or bg-surface (#0e1017) — never white or light gray
- 0.5px borders on all cards and dividers — never 1px unless it's an active/focus state
- No drop shadows, box shadows, or blur effects
- No gradients on UI elements — only allowed on decorative background textures (hero, product preview)
- Hover states: subtle background shift + border color change — never scale transforms on cards
- Active tab: white text + 2px bottom border line
- Inactive tab: text-muted color, no border
- All interactive elements need visible hover and focus states
- Maintain consistent 12px card grid gap across all sections
- Metric numbers always use Geist Pixel, never Geist Sans
- Green (#5DCAA5) is the only accent used for positive/success indicators — never use blue or other greens
