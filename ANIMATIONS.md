# Animation & "Loud Editorial" Interaction System

This document details every creative interaction, animation hook, and component built for Kinetic, their architectural locations, performance profiles, and instructions on disabling or customizing each.

---

## Core Art Direction & Principles
- **Art Direction**: "Loud Editorial" — oversized display typography (headings up to 8vw), high-contrast brutalist color blocks (deep ink `#09090b` + signal orange `#ff5500` + neon lime `#ccff00` accents), hard 2px borders, offset shadows (`shadow-[4px_4px_0px_#000]`), and rotated sticker badges.
- **Strict Non-Negotiables**: NO animated or moving canvas backdrops, NO particles/blobs/grain, NO video loops. All visual hierarchy originates from typography, project mockups, and structured geometric shapes.
- **60fps GPU Acceleration**: Strictly animates `transform`, `opacity`, `clip-path`, and SVG stroke properties.
- **Accessibility & Reduced Motion**: Automatically disables cursor tracking, physics inertia, 3D tilt, and scroll velocity skew for visitors with `prefers-reduced-motion: reduce` or on touch devices.

---

## 1. Custom Cursor & Interactive Pointer System

### `CursorProvider`
- **File**: `src/components/animation/CursorProvider.tsx`
- **Behavior**:
  - Small central dot with a trailing spring ring (`damping: 28, stiffness: 350`).
  - Context labels appear dynamically: `"View"` over projects, `"Drag"` over physics stickers, `"Open"` over links, `"Start"` over CTAs, `"Connect"` over LinkedIn links.
  - Ring expands and switches contrast via mix-blend mode.
  - Native cursor remains fully functional on text inputs and form fields.
  - Completely disabled on touch screens and under reduced motion.
- **How to Disable**: In `src/app/layout.tsx`, remove the `<CursorProvider>` wrapper around the app.

---

## 2. Loud Editorial Hero & Physics Layer

### Draggable Physics Stickers
- **File**: `src/components/animation/DraggableSticker.tsx`
- **Behavior**: Neo-editorial sticker badges (`"⚡ NOW BOOKING Q2/Q3"`, `"BM • VS • PT // PARTNERS"`) with Framer Motion drag physics and spring inertia, bounded by the Hero container. Keyboard-accessible with focus states.
- **How to Disable**: In `HomeHero.tsx`, comment out `<DraggableSticker>`.

### Hero Typography & Word Cycle
- **Files**: `src/components/home/HomeHero.tsx`, `src/components/animation/WordCycle.tsx`
- **Behavior**: Giant uppercase headline with line-mask reveal and a vertically rotating word cycle cycling `"WEBSITES / PRODUCTS / AUTOMATIONS / SYSTEMS"` every 2.8s.
- **How to Disable**: Replace `WordCycle` with static text in `HomeHero.tsx`.

### Live Local-Time IST Clock & Status Dot
- **Files**: `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`
- **Behavior**: Live ticking IST clock (`Asia/Kolkata`) displaying studio hours alongside an active green availability indicator.
- **How to Disable**: Remove the `useEffect` interval and render static timezone text.

---

## 3. Navigation & Full-Screen Directory

### Morphing Menu & Circular Wipe Overlay
- **File**: `src/components/layout/Navbar.tsx`
- **Behavior**:
  - Header automatically hides on scroll down (>120px) and smoothly returns on scroll up.
  - Menu button morphs from two lines into a crisp "X".
  - Full-screen directory opens via a circular clip-path wipe (`clipPath: circle(...)`).
  - Giant links (`Work / Services / About / Contact`) stagger in; hovering dims adjacent items while revealing section tags (`TextRoll` effect on hover).
- **How to Disable**: Use standard dropdown navigation or static links in `Navbar.tsx`.

---

## 4. Work Showcase Centerpiece

### Interactive Typography List + Floating Cursor Preview
- **File**: `src/components/home/ShowcaseCenterpiece.tsx`
- **Behavior**:
  - **Option A (Default)**: Giant typography project rows (e.g., `01 // PULSE ANALYTICS`). Hovering displays a floating thumbnail preview that tracks pointer coordinates with smooth spring lag and rotation. Clicking opens the case study.
  - **Option B (Toggleable)**: Switch between List View and 2x2 Editorial Grid using the view switcher button.
  - Filter pills (`All / Websites / Web Apps / Automation`) reorder projects smoothly via Framer Motion `layout` animation.
- **How to Disable**: In `src/app/page.tsx`, replace `ShowcaseCenterpiece` with `SelectedWork`.

---

## 5. Agency Sales & Conversion Tools

### "Build Your Scope & Quote" Configurator
- **File**: `src/components/ui/QuoteConfigurator.tsx`
- **Behavior**:
  - Interactive multi-step estimator allowing founders to choose archetype, scope add-ons (Stripe, CMS, AI Agents), and target speed.
  - Calculates real-time ballpark ranges with clear disclaimer.
  - `"Attach Spec to Project Brief"` button redirects to `/contact` pre-populating inquiry notes and selected scope.
- **How to Disable**: Remove `QuoteConfigurator` from `src/app/page.tsx` and `src/app/contact/page.tsx`.

### Interactive Tech Stack Wall
- **File**: `src/components/home/TechStackWall.tsx`
- **Behavior**: Interactive toolchain grid. Hovering or filtering a category highlights exactly which client service offerings utilize that technology.
- **How to Disable**: Remove `<TechStackWall />` in `src/app/page.tsx`.

---

## 6. Micro-Interactions & Easter Eggs

### Text Scramble / Matrix Decode
- **File**: `src/components/animation/TextScramble.tsx`
- **Behavior**: Rapidly scrambles character glyphs before resolving into clean mono text upon entering the viewport (runs once per element).
- **How to Disable**: Replace `TextScramble` with static strings.

### Theme Toggle with View Transitions
- **File**: `src/components/ui/ThemeToggle.tsx`
- **Behavior**: Switches between dark ink mode (`#09090b`) and editorial newsprint light mode (`#f4f3ef`) using the native `document.startViewTransition` with a circular expanding clip reveal.
- **How to Disable**: In `Navbar.tsx`, remove `<ThemeToggle />`.

### Footer Accent Confetti Easter Egg
- **File**: `src/components/layout/Footer.tsx`
- **Behavior**: Clicking the gigantic footer wordmark 5 times triggers a zero-dependency 60fps canvas confetti burst in `#ff5500` and `#ccff00`.
- **How to Disable**: Remove `handleWordmarkClick` in `Footer.tsx`.

### 404 Diagnostic Ping Mini-Interaction
- **File**: `src/app/not-found.tsx`
- **Behavior**: Interactive "Ping Node" button cycling through witty terminal status responses from the founding partners.
- **How to Disable**: Remove the diagnostic console from `not-found.tsx`.

---

## 7. Global Motion Overrides

Every animation component references `useReducedMotion()` or checks `window.matchMedia("(prefers-reduced-motion: reduce)")`.

Global stylesheet enforcement in `src/app/globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
