# GrowHaus Animation & Motion System (`ANIMATIONS.md`)

This guide catalogs every creative animation, 3D element, procedural shader, and interactive mini-demo across the GrowHaus website. Designed as a creative developer flagship, every technique demonstrates production capabilities we deliver for clients while strictly adhering to performance, accessibility, and zero-cursor-tracking rules.

---

## Core Non-Negotiable Rules

1. **Zero Cursor Animation**: Normal native system cursor everywhere. No custom cursors, no trailing orbs, no magnetic buttons, and no tilt-on-mouse. All motion is driven by time, scroll progress, or click/tap/keyboard.
2. **Single Persistent 3D Canvas**: One fixed full-screen React Three Fiber canvas behind page content (`pointer-events: none`). Camera and objects transform seamlessly across sections via scroll progress.
3. **Honest Content**: All 5 deep portfolio case studies and 8 build archetypes are clearly labeled as "Concept Project" or "Sample".
4. **Performance & Reduced Motion**:
   - Device pixel ratio (DPR) is capped at 1.75 with `AdaptiveDpr`.
   - WebGL render loop uses time-based rotation and auto-pauses when off-screen.
   - Full support for `prefers-reduced-motion` with static SVG/CSS fallbacks.

---

## Catalog of Components & Effects

### 1. `PersistentCanvas` (One Persistent Three.js Scene)
- **Source**: Custom React Three Fiber & Drei implementation
- **File**: `src/components/three/PersistentCanvas.tsx`
- **Location**: Rendered fixed behind page content in `src/app/page.tsx`
- **Behavior**:
  - **Hero (Scroll 0.0 → 0.20)**: Assembles a stylized low-poly house of stacked blocks with emissive emerald green windows, sprout blocks, and glowing wireframe edges. Luminous emerald radial backdrop ensures high contrast. Time-based slow rotation.
  - **What We Can Build (Scroll 0.20 → 0.40)**: Camera shifts; blocks decouple and drift into 8 small floating screen planes.
  - **Work (Scroll 0.40 → 0.60)**: Floating screens re-align into a 3D curved gallery arc.
  - **Services (Scroll 0.60 → 0.75)**: Orbits around geometric service representations with active edge lighting.
  - **Process (Scroll 0.75 → 0.90)**: Camera travels through 5 glowing waypoints with energy trails.
  - **Final CTA (Scroll 0.90 → 1.00)**: Blocks converge back into the central glowing house silhouette with a pulsing emerald aura.
- **Lighting & Atmosphere**: Directional key light, dual green/emerald rim lights (`#3DDC84`, `#10B981`), inner point light, floating `Sparkles`, and reflective `Grid` floor.
- **Reduced Motion**: Disables camera translation and rotation; presents a calm static pose.
- **How to Disable**: Remove `<PersistentCanvas />` from `src/app/page.tsx`.

---

### 2. `SectionBackgrounds` (Multi-Section Dynamic Shaders)
- **Source**: Procedural HTML5 2D Canvas shader
- **File**: `src/components/effects/SectionBackgrounds.tsx`
- **Location**: Fixed behind content in `src/app/page.tsx`
- **Behavior**:
  - Hero: Soft Aurora emerald bezier wave flow.
  - Services: Flowing Threads energy wave lines.
  - Process: Progressive wave path.
  - CTA: Shimmering Silk radial glow.
- **Reduced Motion**: Replaced by static radial gradient CSS background.
- **How to Disable**: Remove `<SectionBackgrounds />` from `src/app/page.tsx`.

---

### 3. `CurvedProjectGallery` (3D Curved Work Showcase)
- **Source**: Custom 3D perspective curved gallery
- **File**: `src/components/effects/CurvedProjectGallery.tsx`
- **Location**: Featured Work section (`src/components/home/FeaturedWork.tsx`)
- **Behavior**:
  - Arranges the 5 concept projects along a curved cylindrical stage in 3D space (`[perspective:1400px]`).
  - **Auto-rotates continuously and slowly** every 3.8s.
  - **Pauses automatically** when the user drags, clicks, focuses, or uses keyboard arrows; resumes after 3 seconds of inactivity.
  - Full touch swipe and keyboard left/right arrow navigation.
  - Progress bar and counter (`01 / 05`).
  - **Real previews, not stock photos**: Uses actual Playwright-captured demo screenshots stored in `/public/projects/`.
  - **Card Design**: Asymmetric notched corner, unique accent color per project, oversized project number, title overlaid on dark gradient scrim, and slide-up "Explore Case Study" button.
- **Reduced Motion**: Disables auto-rotation; user navigates purely via buttons/keyboard.
- **How to Disable**: Replace with a static 2-column grid.

---

### 4. `BuildShowcase` (8 Mini Live Demos)
- **Source**: Custom interactive micro-demos in a bento layout
- **File**: `src/components/effects/BuildShowcase.tsx`
- **Location**: "What We Can Build" section on homepage
- **Mini Live Demos**:
  1. **Landing Page**: Typewriter headline typing in real-time + pulsing emerald CTA button.
  2. **SaaS Dashboard**: Live animated vertical bar charts undulating + ticking MRR counter.
  3. **Online Store**: 3D turntable isometric product rotation + "✓ Added to Cart" toast banner.
  4. **Portfolio**: Sequential staggered masonry tile reveal.
  5. **Booking Site**: Interactive calendar day highlight + "✓ Confirmed" badge.
  6. **Restaurant**: Sliding menu item cards with price tags + table reservation toggle.
  7. **AI Tool**: Live simulated LLM chat prompt + streaming response with cursor.
  8. **Workflow Automation**: 3-node pipeline (Form → AI CRM → Slack) with glowing packet particle traveling along SVG connector.
- **Bento Grid**: Asymmetric layout with featured cards spanning 2 columns.
- **Interactive Modal**: Clicking any card opens a full modal with audience, features, timeline, and quote trigger.
- **How to Disable**: Replace live demo widgets with static SVG icons.

---

### 5. `ScrollVelocityMarquee`
- **Source**: Infinite CSS keyframe marquee
- **File**: `src/components/effects/ScrollVelocityMarquee.tsx`
- **Behavior**: Seamless horizontal scrolling strip displaying core technologies (`NEXT.JS 16 • REACT THREE FIBER • TYPESCRIPT • TAILWIND CSS • GSAP • WEBGL`).
- **Reduced Motion**: Renders static flex row without translation.
- **How to Disable**: Remove `<ScrollVelocityMarquee />` from `src/app/page.tsx`.

---

### 6. `Preloader` (Block-by-Block House Construction)
- **File**: `src/components/animation/Preloader.tsx`
- **Behavior**: Runs once per session (persisted in `sessionStorage`). Displays an animated SVG house assembling block-by-block (foundation → walls → window → roof → sprout) in sync with a 0–100% counter under 1.5 seconds. Includes instant "Skip" button.
- **Reduced Motion**: Automatically bypassed.
- **How to Disable**: Comment out `<Preloader />` in `src/app/layout.tsx`.

---

### 7. Giant 3D Footer Wordmark
- **File**: `src/components/layout/Footer.tsx`
- **Behavior**: Massive masked typography centerpiece reading `GROWHUS` with gradient clipping mask and subtle hover radiance. Clicking 5 times triggers a 60fps canvas confetti celebration in growth green (`#3DDC84`).
- **Reduced Motion**: Disables confetti physics.
