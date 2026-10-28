# KINETIC — Loud Editorial Web & Product Development Agency

> **We design and engineer modern web applications, digital flagships, and business automation.**  
> An Awwwards-level, work-first agency portfolio website built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **GSAP ScrollTrigger**, and **Lenis**.

---

## 🧭 Art Direction: "Loud Editorial"

- **Oversized Typography**: Display headings up to 8vw with tight tracking, characterful uppercase display type, and monospace labels.
- **High-Contrast Neo-Editorial Aesthetic**: Deep ink background (`#09090b`) with vivid International Signal Orange (`#ff5500`) and Cyber Volt lime (`#ccff00`) accents, hard 2px borders, and offset brutalist drop-shadows (`shadow-[4px_4px_0px_#000]`).
- **Signature Creative Motion Layer**:
  - **Custom Cursor System**: Desktop-only dot and spring-lagging ring with context labels (`"View"`, `"Drag"`, `"Start"`, `"Open"`, `"Connect"`).
  - **Hero with Draggable Stickers**: Inertia physics sticker badges bounded to the hero container, plus a live local-time IST clock and green availability indicator.
  - **Full-Screen Wipe Directory**: Circular clip-path wipe revealing giant staggered navigation links with a text-roll hover effect.
  - **Showcase Centerpiece**: Giant typography project list with a cursor-following floating preview card (Option A), toggleable to an editorial 2x2 grid (Option B), with layout animated filtering.
  - **Build Your Scope & Quote Configurator**: Interactive calculator allowing prospective clients to estimate ballpark budget and timeline, attaching choices directly to the project brief.
  - **Interactive Tech Stack Wall**: Direct link between production technologies and client service pipelines.
  - **Confetti Easter Egg**: Clicking the footer wordmark 5 times triggers a 60fps canvas confetti burst in brand colors.
- **Strict Non-Negotiables Observed**:
  - **NO animated/moving backgrounds**: zero particles, floating blobs, grain overlays, canvas backdrops, or looping background videos.
  - **All concept projects labeled honestly** with design targets and prototype behaviors.
  - **Full compliance with `prefers-reduced-motion`** and touch device adaptations.

---

## 👥 The Founding Partners

- **Adil Mirza** — Co-Founder & Creative Director *(Brand Identity, Interaction Motion & Swiss Grid Design)*
- **Vedant Satbhai** — Co-Founder & Lead Systems Architect *(Next.js App Router, Distributed Backends & DB Engines)*
- **Prajjwal Tripathi** — Co-Founder & Automation Engineer *(Autonomous LLM Agents, Workflow Orchestration & Pipelines)*

---

## 🛠️ Showcase Concept Projects

All 5 projects are configured in `src/config/site.ts` with honest framing (`isConcept: true`):

1. **Pulse Real-Time Telemetry** *(Web App / SaaS & Cloud)* — High-density cloud infrastructure telemetry dashboard with interactive time switches and sub-18ms chart render target.
2. **Aura Minimalist Objects** *(Website / E-Commerce)* — Tactile acoustic hardware flagship with interactive finish switcher and springy slide-over bag drawer.
3. **Synapse Flow Automation** *(Automation / AI & Workflow)* — Autonomous lead qualification and CRM enrichment pipeline with interactive node runner and animated connector lines.
4. **Vault Private Wealth App** *(Web App / Fintech)* — Mobile-first portfolio management with 1-tap card freeze security and categorized spend history.
5. **Apex Cloud Foundation** *(Website / Developer Tools)* — Technical edge compute landing page with interactive CLI command runner with typing effects.

---

## ⚡ Tech Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS & Vanilla CSS
- **Motion & Physics**: Framer Motion, GSAP ScrollTrigger, Lenis Smooth Scroll
- **Icons**: Lucide React & Custom SVG brand icons

---

## 🚀 Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site in your browser.

### 3. Production Build & Validation
```bash
npm run build
```

---

## ⚙️ Content Customization

All copy, projects, founders, links, and pricing are centralized in a single typed configuration file:

👉 **`src/config/site.ts`**

Edit `src/config/site.ts` to update:
- Agency name, tagline, and contact emails
- Founder bios, LinkedIn profiles, and avatars
- Service deliverables and pricing tiers
- Portfolio projects and case studies

Detailed documentation of all animation components is available in **[`ANIMATIONS.md`](./ANIMATIONS.md)**.
