# GrowHaus — Websites & Products That Help Your Business Grow

> **We build websites and products that help your business grow.**  
> A creative developer flagship agency website built for **GrowHaus** with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, **React Three Fiber / Three.js**, **Framer Motion**, and **Lenis**.

---

## 🌿 Agency Overview

- **Name**: GrowHaus
- **Tagline**: *"We build websites and products that help your business grow."*
- **Target Audience**: Founders, startups, and small businesses.
- **Core Services**:
  1. **Custom Websites**: Fast, high-converting marketing sites that tell your story and drive sales.
  2. **Web Applications & SaaS**: Scalable web apps with clean code, authentication, databases, and billing.
  3. **Product Development**: From napkin sketch to working MVP ready for paying customers.
  4. **Business Automation & AI**: Connect your tools, eliminate manual tasks, and deploy smart AI workflows.
  5. **UI/UX Design**: Clean, user-centered interfaces designed for clarity and conversion.
- **Team**:
  - **Buzdil Mirza** — Head of Design *(Product design, design systems, and user interfaces)*
  - **Vedant Satbhai** — Lead Engineer *(Full-stack architecture, Next.js, and cloud systems)*
  - **Prajjwal Tripathi** — Automation Lead *(AI workflows, business automation, and system integration)*
- **Contact**: `hello@growhaus.agency` | [LinkedIn](https://linkedin.com)
- **Client Promise**: *"We reply within 24 hours."* (Free 30-min discovery call; booking link reveals once configured).

---

## 🎨 Visual Direction & Art Direction

- **One Persistent Three.js Canvas**: A single full-screen React Three Fiber canvas fixed behind page content (`pointer-events: none`). Camera and objects are driven seamlessly across sections by scroll progress (Hero house assembly → floating screens → curved gallery → service orbit → process waypoints → CTA particle convergence).
- **Hero High-Contrast Backdrop**: Soft radial green glow behind the hero 3D house, emissive green window panels, metallic glass blocks, and reflective floor grid so the house is luminous and clear.
- **Multi-Section Dynamic Shaders**: Low-contrast procedural canvas background layers that morph from Aurora in the hero, Threads in services, Waves in process, to Silk in the final CTA.
- **Clean Typography**: Clean sans-serif family paired with an optional serif accent (`Instrument Serif` italic) applied strictly to one highlighted keyword per heading.
  - Scale: Body 16px (line-height 1.6), labels 12–13px, section headings `clamp(28px, 4vw, 48px)`, hero heading max 56px on desktop. Max text width 60–70 characters.
- **Surface Palette**: Near-black dark surfaces (`#09090b` / `#111115` / `#16161c`) accented by vibrant growth green (`#3DDC84`). High contrast WCAG AA compliant.
- **Brand Mark**: Custom GrowHaus logo mark pairing an architectural house silhouette with an upward growth sprout/arrow.
- **Strict Cursor Rules**: Normal native system cursor everywhere. Zero custom cursors, zero trails, zero pointer-following elements, and zero magnetic button shifts. All motion is driven by time, scroll, or click/tap/keyboard.

---

## 🚀 Key Features & Showcases

### 1. "What We Can Build" (8 Live Micro Demos in Bento Grid)
Interactive mini-demos with looping animations demonstrating core client techniques:
1. **Business Landing Page** — Real-time typing headline, pulsing emerald CTA button, and mini page scroll.
2. **SaaS Dashboard** — Animated undulating bar charts and ticking live MRR metric counter.
3. **Online Store** — 3D turntable isometric product rotation with periodic "Added to Cart" toast banner.
4. **Portfolio Site** — Sequential staggered masonry tile reveal.
5. **Booking Site** — Interactive calendar day selection, time slot highlight, and "Confirmed ✓" checkmark.
6. **Restaurant Site** — Sliding menu item cards with live prices and table reservation toggle.
7. **AI Tool or Chatbot** — Simulated LLM chat prompt with streaming text response and blinking cursor.
8. **Workflow Automation** — Visual 3-node pipeline (Form → AI CRM → Slack) with glowing packet particle traveling along SVG connector.

*Clicking any card opens a modal detailing: what it is, target audience, typical features, timeline (e.g., 2–4 weeks), and a "Get a quote like this" action that pre-fills the contact form.*

### 2. 3D Curved Work Showcase (Real Concept Previews)
- Arranges the 5 concept projects along a curved 3D cylindrical stage.
- **Auto-rotates continuously and slowly**, pausing on interaction (drag, focus, keyboard arrows) and resuming after 3 seconds.
- Displays **real captured screenshots** from `/public/projects/` (captured with Playwright from the actual case study prototypes: Pulse, Aura, Synapse Flow, Vault, and Apex).
- Asymmetric notched card corners, unique project accent color, oversized numbers, and slide-up case study link.

### 3. Concept Case Studies & Interactive Prototyping
Each project features a dedicated case study page with full engineering details and a working interactive prototype:
- **Pulse** — Cloud Telemetry Dashboard (time-range filter, sub-18ms chart target).
- **Aura** — Minimalist Objects Flagship (live finish switcher and slide-over bag drawer).
- **Synapse Flow** — AI Workflow Automation (interactive node runner and animated flow state).
- **Vault** — Private Wealth Mobile App (1-tap card lock and instant spend categorization).
- **Apex** — Cloud Foundation (interactive CLI command runner with real-time outputs).

---

## ⚡ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router, Static Export)
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS v4 & PostCSS
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Motion**: Framer Motion, Lenis Smooth Scroll
- **Automation / Testing**: Playwright (for real screenshot captures)
- **Icons**: Lucide React & Custom SVG brand marks

---

## 🛠️ Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Static Export
```bash
npm run build
```
This builds the site and exports static HTML, CSS, JavaScript, and assets into the `out/` directory.

---

## 🚀 Deploy on Render

This project is configured as a high-performance **Static Site** on [Render](https://render.com).

### Render Dashboard Settings

When creating a new **Static Site** on Render:

1. **Connect Repository**: Link `https://github.com/vedant21-ctr/agenncy.git`.
2. **Build Command**:
   ```bash
   npm install && npm run build
   ```
3. **Publish Directory**:
   ```text
   out
   ```
4. **Environment Variables**:
   Add the following in the Render Dashboard under **Environment**:
   - `NODE_VERSION`: `20`
   - `NEXT_PUBLIC_SITE_URL`: `https://growhaus.onrender.com` (or your custom domain)
   - `NEXT_PUBLIC_FORM_ENDPOINT`: Your contact form endpoint (e.g. `https://formspree.io/f/<your-form-id>`)

### Deploying via Infrastructure as Code (`render.yaml`)

A [`render.yaml`](./render.yaml) file is included at the repository root. When deploying via Render Blueprint:
1. Navigate to **Blueprints** in Render.
2. Connect this repository. Render automatically reads `render.yaml` and provisions the static site service.

### Adding a Custom Domain

1. In the Render Dashboard, go to your static site's **Settings** tab.
2. Under **Custom Domains**, click **Add Custom Domain** and enter your domain (e.g., `growhaus.agency` and `www.growhaus.agency`).
3. Follow the DNS instructions provided by Render:
   - For root domain: Add an `ANAME` or `ALIAS` record pointing to Render's DNS target.
   - For subdomain (`www`): Add a `CNAME` record pointing to your Render app host (e.g. `growhaus.onrender.com`).
4. Render will automatically issue a free Let's Encrypt SSL certificate once DNS propagates.
5. Update `NEXT_PUBLIC_SITE_URL` in your Render Environment Variables to match your custom domain (e.g., `https://growhaus.agency`).

### How to Redeploy

- **Automatic Deploys**: By default, any push to the `main` branch triggers an automatic rebuild and static deployment on Render.
- **Manual Redeploy**: In the Render Dashboard, click **Manual Deploy** → **Clear build cache & deploy** to initiate a clean build.

---

## ⚙️ Content & Configuration

All copy, services, projects, samples, and founder profiles are strictly centralized in a single typed configuration file:

👉 **`src/config/site.ts`**

For a detailed index of all creative motion components and instructions on disabling them, see **[`ANIMATIONS.md`](./ANIMATIONS.md)**.
