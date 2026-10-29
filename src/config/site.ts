export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  isConcept: boolean;
  type: "Website" | "Web App" | "Automation" | "Branding";
  industry: "SaaS & Cloud" | "E-Commerce" | "Fintech" | "Developer Tools" | "AI & Workflow";
  outcome: string;
  summary: string;
  heroImage: string;
  year: string;
  duration: string;
  role: string;
  stack: string[];
  challenge: string;
  approach: string;
  solution: string;
  keyFeatures: string[];
  metrics: {
    label: string;
    value: string;
    note: string;
  }[];
  mockupType: "browser" | "phone" | "diagram";
  nextProjectSlug: string;
}

export interface BuildSample {
  id: string;
  title: string;
  type: string;
  badge: string;
  oneLineDesc: string;
  mockupKind: "browser" | "phone" | "flow";
  targetAudience: string;
  whatItIs: string;
  features: string[];
  typicalTimeline: string;
  quoteCategory: string;
  previewColor: string;
  keyMetrics: { label: string; value: string };
}

export interface Founder {
  name: string;
  role: string;
  bio: string;
  funFact: string;
  image: string;
  linkedin: string;
  email: string;
}

export interface ServiceDetail {
  id: string;
  number: string;
  name: string;
  headline: string;
  shortDesc: string;
  fullDesc: string;
  forWhom: string;
  timeline: string;
  deliverables: string[];
  techStack: string[];
  previewGraphic: {
    title: string;
    subtitle: string;
    stats: string;
  };
}

export interface ProcessStep {
  step: string;
  phase: string;
  title: string;
  desc: string;
  deliverable: string;
  timing: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  badge?: string;
  highlighted?: boolean;
  fromPrice: string;
  timeline: string;
  tagline: string;
  forWhom: string;
  features: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  heroHeadline: string;
  heroSubtext: string;
  primaryCTA: string;
  secondaryCTA: string;
  contact: {
    email: string;
    calendlyUrl?: string; // empty means hidden until real link is configured
    showCalendly: boolean;
    linkedin: string;
    github: string;
    x: string;
    location: string;
    availability: string;
    sla: string;
  };
  accentColor: string;
  accentHex: string;
  founders: Founder[];
  services: ServiceDetail[];
  projects: Project[];
  buildSamples: BuildSample[];
  howWeWork: ProcessStep[];
  whyChooseUs: {
    number: string;
    title: string;
    desc: string;
  }[];
  packages: PricingPackage[];
  faqs: FAQItem[];
  trueNumbers: {
    foundersCount: number;
    sampleBuildsCount: number;
    conceptProjectsCount: number;
    replyHours: number;
  };
}

export const SITE_CONFIG: SiteConfig = {
  name: "GrowHaus",
  legalName: "GrowHaus Studio",
  tagline: "We build websites and products that help your business grow.",
  heroHeadline: "Websites and products that help your business grow.",
  heroSubtext:
    "We design and build fast websites, web apps, and automated workflows. Made for founders, startups, and growing small businesses.",
  primaryCTA: "Start a project",
  secondaryCTA: "See our work",

  contact: {
    email: "hello@growhaus.agency",
    calendlyUrl: "", // Hidden until real booking link configured
    showCalendly: false,
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    x: "https://x.com",
    location: "Bengaluru & Mumbai, India • Available Worldwide",
    availability: "Available for new projects this quarter",
    sla: "We reply within 24 hours.",
  },

  accentColor: "#3DDC84", // Growth Green
  accentHex: "var(--accent)",

  trueNumbers: {
    foundersCount: 3,
    sampleBuildsCount: 8,
    conceptProjectsCount: 5,
    replyHours: 24,
  },

  founders: [
    {
      name: "Adil Mirza",
      role: "Co-Founder & Head of Design",
      bio: "10+ years designing clean interfaces and brand identities for growing companies.",
      funFact: "Obsessed with clean Swiss grid systems, typography, and espresso.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      linkedin: "https://linkedin.com",
      email: "adil.mirza@gmail.com",
    },
    {
      name: "Vedant Satbhai",
      role: "Co-Founder & Lead Engineer",
      bio: "Full-stack engineer building fast, reliable Next.js apps and web platforms.",
      funFact: "Runs a custom Arch Linux setup and benchmarks sub-millisecond database queries.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      linkedin: "https://linkedin.com",
      email: "vedant@growhaus.agency",
    },
    {
      name: "Prajjwal Tripathi",
      role: "Co-Founder & Automation Lead",
      bio: "Automating lead flows and AI pipelines so your business runs on autopilot.",
      funFact: "Has automated over 1,000 internal business workflows with zero dropped webhooks.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
      linkedin: "https://linkedin.com",
      email: "prajjwal@growhaus.agency",
    },
  ],

  services: [
    {
      id: "websites",
      number: "01",
      name: "Custom Websites",
      headline: "Fast websites that turn visitors into customers.",
      shortDesc: "Clean design and fast code built on Next.js. You get a modern site your team can update easily.",
      fullDesc: "We build custom websites with clean layouts, clear messaging, and instant load times. Your team can edit content anytime through a simple dashboard.",
      forWhom: "Startups, founders, and small businesses launching a new website or redesigning an existing one.",
      timeline: "2–4 Weeks",
      deliverables: [
        "Complete responsive design in Figma",
        "Fast Next.js codebase with Tailwind CSS",
        "Simple CMS for effortless text and image edits",
        "Search engine optimization and social share previews",
        "Sub-second load speed on mobile and desktop",
      ],
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity / MDX", "Vercel"],
      previewGraphic: {
        title: "Fast Marketing Sites",
        subtitle: "Built to turn traffic into qualified leads",
        stats: "Sub-1s page load target",
      },
    },
    {
      id: "web-apps",
      number: "02",
      name: "Web Applications & SaaS",
      headline: "Custom web apps built for your users.",
      shortDesc: "From client dashboards to full SaaS platforms. You get secure logins, payments, and clean database architecture.",
      fullDesc: "We build reliable web applications that solve real business problems. We handle authentication, Stripe payments, database modeling, and clean responsive interfaces.",
      forWhom: "Founders building an MVP or businesses replacing spreadsheets with custom internal tools.",
      timeline: "4–8 Weeks",
      deliverables: [
        "Full-stack React and Next.js web application",
        "User authentication and team permission roles",
        "Stripe payment workflows and customer billing",
        "PostgreSQL database setup and optimized queries",
        "Automated deployment and staging previews",
      ],
      techStack: ["React", "Next.js", "PostgreSQL", "Prisma", "Stripe API", "Tailwind CSS"],
      previewGraphic: {
        title: "SaaS Platforms & Apps",
        subtitle: "Production-ready APIs and data storage",
        stats: "Weekly tested staging builds",
      },
    },
    {
      id: "product-dev",
      number: "03",
      name: "Product Development",
      headline: "Bring your product idea to life quickly.",
      shortDesc: "We turn rough ideas into tested, working prototypes and MVPs. You get weekly builds you can test right away.",
      fullDesc: "We work as your dedicated product squad. We map user journeys, design wireframes, and code working software in fast weekly cycles.",
      forWhom: "Founders who want to ship an MVP fast without spending months hiring an internal team.",
      timeline: "Weekly Sprints",
      deliverables: [
        "User flow mapping and product specification",
        "Clickable Figma prototypes for user feedback",
        "Weekly working software on a private staging link",
        "User analytics and event tracking setup",
        "Full handover documentation and codebase walkthrough",
      ],
      techStack: ["Figma", "Next.js", "TypeScript", "PostHog", "Node.js"],
      previewGraphic: {
        title: "Embedded Product Sprints",
        subtitle: "From napkin sketch to working software",
        stats: "Direct founder collaboration",
      },
    },
    {
      id: "automation",
      number: "04",
      name: "Business Automation & AI",
      headline: "Automate manual tasks and save team hours.",
      shortDesc: "Connect your forms, CRM, and internal tools with smart AI pipelines. You get hours back every single week.",
      fullDesc: "Stop copying data between spreadsheets, emails, and apps. We build automated flows that capture leads, enrich details, update your CRM, and notify your team.",
      forWhom: "Growing businesses and service agencies spending too much time on repetitive admin work.",
      timeline: "1–3 Weeks",
      deliverables: [
        "Automatic lead capture and qualification",
        "CRM data sync (HubSpot, Salesforce, Notion)",
        "AI customer support and inquiry triage",
        "Instant Slack and email alerts for key actions",
        "Automatic error retries and monitoring",
      ],
      techStack: ["Node.js", "Python", "Claude / OpenAI APIs", "Webhooks", "n8n"],
      previewGraphic: {
        title: "Automated Workflows",
        subtitle: "Zero manual data entry across systems",
        stats: "Designed to run 24/7 reliably",
      },
    },
    {
      id: "design",
      number: "05",
      name: "UI/UX & Brand Design",
      headline: "Clean, simple design your customers will love.",
      shortDesc: "Every screen is designed for clarity, readability, and speed. You get complete Figma files and design components.",
      fullDesc: "We craft modern digital identities, design systems, and user interfaces that make your company look established and trustworthy.",
      forWhom: "Businesses needing a fresh brand look, design revamp, or polished product mockups.",
      timeline: "2–3 Weeks",
      deliverables: [
        "Clean logo mark and brand guidelines",
        "Accessible typography and color palette",
        "Full UI component library in Figma",
        "Mobile-responsive page mockups",
        "Exported production-ready assets and icons",
      ],
      techStack: ["Figma", "Design Tokens", "Tailwind CSS", "SVG"],
      previewGraphic: {
        title: "Design Systems",
        subtitle: "Accessible contrast and clear hierarchy",
        stats: "100% vector Figma deliverables",
      },
    },
  ],

  // 8 "WHAT WE CAN BUILD" Samples (honest sample archetypes with animated mockups and modal demos)
  buildSamples: [
    {
      id: "landing-page",
      title: "Business Landing Page",
      type: "Sample Marketing Site",
      badge: "Sample",
      oneLineDesc: "A high-converting marketing site that clearly explains your offer and captures leads.",
      mockupKind: "browser",
      targetAudience: "Startups and service businesses launching a new offer.",
      whatItIs: "A fast, single-page or multi-page marketing site designed to turn visitors into booked meetings.",
      features: [
        "Clear headline hierarchy and value proposition",
        "Interactive pricing calculator or package cards",
        "Short contact form with instant validation",
        "SEO tags and fast sub-second load times",
      ],
      typicalTimeline: "1–2 Weeks",
      quoteCategory: "Business Landing Page",
      previewColor: "#3DDC84",
      keyMetrics: { label: "Typical Launch", value: "10 Days" },
    },
    {
      id: "saas-dashboard",
      title: "SaaS Dashboard",
      type: "Sample Web App",
      badge: "Sample",
      oneLineDesc: "An intuitive analytics and management portal for your software subscribers.",
      mockupKind: "browser",
      targetAudience: "B2B software founders and companies with subscription customers.",
      whatItIs: "A secure web portal with real-time charts, user settings, and role-based access control.",
      features: [
        "Live metric summaries and trend sparklines",
        "Filterable data tables with quick search and pagination",
        "User authentication, password resets, and team invites",
        "Stripe billing portal for easy plan management",
      ],
      typicalTimeline: "3–5 Weeks",
      quoteCategory: "SaaS Dashboard",
      previewColor: "#60A5FA",
      keyMetrics: { label: "Sprint Cadence", value: "3–4 Sprints" },
    },
    {
      id: "online-store",
      title: "Online Store (E-Commerce)",
      type: "Sample Store",
      badge: "Sample",
      oneLineDesc: "A clean product store with tactile selectors and a fast slide-out cart.",
      mockupKind: "browser",
      targetAudience: "Direct-to-consumer brands and boutique hardware or lifestyle goods.",
      whatItIs: "A custom online storefront that highlights product craftsmanship and makes buying frictionless.",
      features: [
        "Instant material and finish selector preview",
        "Slide-out shopping cart drawer with live subtotal",
        "Stripe and Apple Pay checkout integration",
        "Inventory management and order email alerts",
      ],
      typicalTimeline: "2–4 Weeks",
      quoteCategory: "Online Store",
      previewColor: "#F59E0B",
      keyMetrics: { label: "Checkout Flow", value: "2 Clicks" },
    },
    {
      id: "portfolio-site",
      title: "Portfolio & Personal Brand",
      type: "Sample Portfolio",
      badge: "Sample",
      oneLineDesc: "A distinctive personal website for founders, creators, and senior advisors.",
      mockupKind: "browser",
      targetAudience: "Independent consultants, startup founders, and creative directors.",
      whatItIs: "A sharp, minimal portfolio that establishes authority and displays selected case studies.",
      features: [
        "Clean case study layouts with project highlights",
        "Interactive bio and verified career milestones",
        "Direct email and booking integration",
        "Lightweight markdown system to publish articles",
      ],
      typicalTimeline: "1–2 Weeks",
      quoteCategory: "Portfolio Site",
      previewColor: "#A78BFA",
      keyMetrics: { label: "Design Time", value: "5 Days" },
    },
    {
      id: "booking-site",
      title: "Booking Site (Clinic, Salon, Gym)",
      type: "Sample Booking App",
      badge: "Sample",
      oneLineDesc: "A clean appointment booking system where customers choose times and pay online.",
      mockupKind: "phone",
      targetAudience: "Health clinics, wellness studios, personal trainers, and beauty salons.",
      whatItIs: "A mobile-first scheduler that lets customers choose a practitioner, pick an open slot, and pay.",
      features: [
        "Service picker with duration and price breakdown",
        "Live calendar slot selector with double-booking prevention",
        "SMS and email appointment reminders",
        "Staff management dashboard to view weekly bookings",
      ],
      typicalTimeline: "2–3 Weeks",
      quoteCategory: "Booking Site",
      previewColor: "#EC4899",
      keyMetrics: { label: "Mobile First", value: "100%" },
    },
    {
      id: "restaurant-site",
      title: "Restaurant & Local Business",
      type: "Sample Local Site",
      badge: "Sample",
      oneLineDesc: "A welcoming local business site with digital menus, hours, and reservation links.",
      mockupKind: "phone",
      targetAudience: "Restaurants, cafes, neighborhood storefronts, and local services.",
      whatItIs: "A fast, appetizing local business site that helps neighborhood customers visit and order.",
      features: [
        "Filterable digital menu with dietary tags (vegan, gluten-free)",
        "Instant table reservation and call-to-order buttons",
        "Live operating hours indicator and Google Maps directions",
        "Social review highlights and photo gallery",
      ],
      typicalTimeline: "1–2 Weeks",
      quoteCategory: "Restaurant Site",
      previewColor: "#F97316",
      keyMetrics: { label: "Setup Time", value: "7 Days" },
    },
    {
      id: "ai-tool",
      title: "AI Tool & Chatbot Product",
      type: "Sample AI Product",
      badge: "Sample",
      oneLineDesc: "An AI-powered interface that answers customer questions or extracts document data.",
      mockupKind: "browser",
      targetAudience: "Startups and internal operations teams building specialized AI tools.",
      whatItIs: "A custom web application connected to LLMs with clean streaming text and prompt controls.",
      features: [
        "Real-time streaming text responses without page reloads",
        "Document upload (PDF/CSV) with instant summarization",
        "Custom company knowledge guardrails",
        "Usage tracking and credit limits per user",
      ],
      typicalTimeline: "2–4 Weeks",
      quoteCategory: "AI Tool Product",
      previewColor: "#10B981",
      keyMetrics: { label: "Streaming UX", value: "<100ms" },
    },
    {
      id: "workflow-automation",
      title: "Workflow Automation Flow",
      type: "Sample Automation",
      badge: "Sample",
      oneLineDesc: "An automated pipeline connecting web forms, CRM, and team chat without code.",
      mockupKind: "flow",
      targetAudience: "Service agencies, sales teams, and operations managers.",
      whatItIs: "An end-to-end background flow that captures incoming leads, scores them, and alerts your team.",
      features: [
        "Instant webhook receiver for web forms and contact tools",
        "AI intent classification to flag high-value inquiries",
        "Bi-directional sync with HubSpot, Airtable, or Notion",
        "Direct Slack notification with one-click lead claim",
      ],
      typicalTimeline: "1–2 Weeks",
      quoteCategory: "Workflow Automation",
      previewColor: "#3DDC84",
      keyMetrics: { label: "Time Saved", value: "10+ hrs/wk" },
    },
  ],

  projects: [
    {
      id: "pulse",
      slug: "pulse-analytics",
      title: "Pulse Real-Time Telemetry",
      client: "Pulse Systems",
      isConcept: true,
      type: "Web App",
      industry: "SaaS & Cloud",
      outcome: "Designed to deliver clear cluster health monitoring with sub-second chart rendering.",
      summary: "A high-density telemetry dashboard concept showing how complex server monitoring can stay calm, clear, and responsive under high query volumes.",
      heroImage: "/projects/pulse-analytics.png",
      year: "2026",
      duration: "3-Week Concept Sprint",
      role: "Product Architecture & Engineering",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Canvas Charts"],
      challenge: "Most enterprise monitoring dashboards are slow, cluttered, and difficult to read during an incident.",
      approach: "We stripped away decorative noise in favor of high-contrast cards, glanceable sparklines, and fast period toggles.",
      solution: "Engineered a dark-mode first interface with interactive 24h, 7d, and 30d views and edge cluster status cards.",
      keyFeatures: [
        "Fast client-side chart data interpolation",
        "Real-time health status and availability alerts",
        "Multi-region edge cluster latency indicators",
        "Responsive data cards without horizontal scroll",
      ],
      metrics: [
        { label: "Target Render Speed", value: "60 FPS", note: "Engineered for 10k datapoint streams" },
        { label: "Contrast Standard", value: "WCAG AA", note: "Optimized for dark operating rooms" },
        { label: "Interaction Goal", value: "<30ms", note: "Designed for instantaneous period switches" },
      ],
      mockupType: "browser",
      nextProjectSlug: "aura-objects",
    },
    {
      id: "aura",
      slug: "aura-objects",
      title: "Aura Minimalist Objects",
      client: "Aura Acoustic Hardware",
      isConcept: true,
      type: "Website",
      industry: "E-Commerce",
      outcome: "Built to showcase physical hardware craftsmanship through a clean digital layout.",
      summary: "A modern commerce flagship concept for high-end acoustic design hardware, featuring tactile finish selection and a slide-over cart drawer.",
      heroImage: "/projects/aura-objects.png",
      year: "2026",
      duration: "2.5-Week Concept Sprint",
      role: "Art Direction & E-Commerce Engineering",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      challenge: "Standard e-commerce store templates fail to communicate the tactile quality and weight of premium physical goods.",
      approach: "We used expansive whitespace, clean typography, and tactile material preview toggles to present each object clearly.",
      solution: "Created an intuitive product configurator with live finish switching (Obsidian, Titanium, Volt) and a friction-free slide-out cart.",
      keyFeatures: [
        "Tactile material finish switcher with instant state transitions",
        "Slide-over cart drawer with real-time price subtotal calculation",
        "Clean typography layout designed for luxury brand positioning",
        "Designed to achieve top Lighthouse scores despite rich media",
      ],
      metrics: [
        { label: "Performance Target", value: "95+", note: "Optimized modern WebP asset delivery" },
        { label: "Checkout Flow", value: "2 Clicks", note: "Designed to minimize cart drop-off" },
        { label: "Layout Stability", value: "0.00 CLS", note: "Built to prevent layout jumping" },
      ],
      mockupType: "browser",
      nextProjectSlug: "synapse-flow",
    },
    {
      id: "synapse",
      slug: "synapse-flow",
      title: "Synapse Flow Automation",
      client: "Synapse Labs",
      isConcept: true,
      type: "Automation",
      industry: "AI & Workflow",
      outcome: "Designed to automate inbound lead qualification and eliminate manual CRM entry.",
      summary: "An end-to-end automation workflow concept connecting inbound lead forms to AI qualification, CRM enrichment, and Slack team alerts.",
      heroImage: "/projects/synapse-flow.png",
      year: "2026",
      duration: "3-Week Concept Sprint",
      role: "Workflow Automation & Pipeline Architecture",
      stack: ["Node.js", "Python", "Claude API", "HubSpot Webhooks", "Slack API"],
      challenge: "Service teams spend 10 to 15 hours every week copy-pasting lead details from forms into spreadsheets and messaging apps.",
      approach: "We mapped human qualification rules into a reliable visual flow with automated error handling and logging.",
      solution: "Engineered an autonomous workflow: incoming form submissions are validated, scored by an LLM, enriched in the CRM, and alerted in Slack within 500ms.",
      keyFeatures: [
        "Automated inbound payload validation and deduplication",
        "AI-assisted intent analysis and lead tier scoring",
        "Bi-directional synchronization with modern CRM databases",
        "Instant Slack notification with direct calendar booking links",
      ],
      metrics: [
        { label: "Target Time Savings", value: "10-15 hrs", note: "Designed to eliminate manual data entry" },
        { label: "Pipeline Latency", value: "<1s", note: "Target form submission to team dispatch" },
        { label: "Reliability Standard", value: "Idempotent", note: "Engineered with automatic webhook retries" },
      ],
      mockupType: "diagram",
      nextProjectSlug: "vault-fintech",
    },
    {
      id: "vault",
      slug: "vault-fintech",
      title: "Vault Private Wealth App",
      client: "Vault Capital",
      isConcept: true,
      type: "Web App",
      industry: "Fintech",
      outcome: "Designed for glanceable portfolio clarity and instant card security controls.",
      summary: "A mobile-first wealth management interface concept engineered with high contrast, spending breakdowns, and instantaneous debit card freeze controls.",
      heroImage: "/projects/vault-fintech.png",
      year: "2026",
      duration: "2-Week Concept Sprint",
      role: "Mobile UI/UX & React Engineering",
      stack: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
      challenge: "Financial mobile apps often confuse users with nested menus and slow navigation between accounts.",
      approach: "We prioritized essential daily operations: total portfolio balance, instant card freeze security, and clean transaction history.",
      solution: "Built a sleek smartphone frame interface with period filters (Weekly, Monthly, Yearly), tap-to-freeze card feedback, and categorized transactions.",
      keyFeatures: [
        "High-contrast card interface with one-tap lock/unlock state",
        "Categorized transaction history with clear direction indicators",
        "Responsive smartphone mockup with fluid touch targets",
        "Clear financial insights without decorative clutter",
      ],
      metrics: [
        { label: "UI State Response", value: "Instant", note: "Local card freeze feedback" },
        { label: "Security Interaction", value: "1-Tap", note: "Emergency card lock control" },
        { label: "Contrast Standard", value: "WCAG AA", note: "Strict adherence to readability" },
      ],
      mockupType: "phone",
      nextProjectSlug: "apex-systems",
    },
    {
      id: "apex",
      slug: "apex-systems",
      title: "Apex Cloud Foundation",
      client: "Apex Compute",
      isConcept: true,
      type: "Website",
      industry: "Developer Tools",
      outcome: "Designed to drive developer signups through transparent benchmarking and CLI proof.",
      summary: "A technical landing page concept for an edge runtime, featuring an interactive command line runner, live latency benchmarks, and zero marketing fluff.",
      heroImage: "/projects/apex-systems.png",
      year: "2026",
      duration: "2-Week Concept Sprint",
      role: "Brand Architecture & Web Development",
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      challenge: "Developer tool sites frequently fail by using corporate buzzwords instead of showing actual terminal commands and deployment speed.",
      approach: "We put the terminal and technical architecture front and center, letting visiting engineers test commands immediately.",
      solution: "Constructed an editorial layout with an interactive CLI simulator (`deploy`, `scale`, `benchmark`) showcasing real-time outputs.",
      keyFeatures: [
        "Interactive CLI simulator with one-click command copy",
        "Clear typographic hierarchy highlighting edge compute benefits",
        "Clean comparison tables with honest technical facts",
        "Frictionless onboarding call-to-action",
      ],
      metrics: [
        { label: "Target Load Time", value: "<0.6s", note: "Static edge-rendered page target" },
        { label: "Developer Clarity", value: "Verified", note: "Tested across sample engineering teams" },
        { label: "Performance Goal", value: "95+", note: "Target for technical documentation" },
      ],
      mockupType: "browser",
      nextProjectSlug: "pulse-analytics",
    },
  ],

  howWeWork: [
    {
      step: "01",
      phase: "Discover",
      title: "Scope & Blueprint",
      desc: "We align on your business goals, target audience, and scope boundaries in 48 hours. You get a locked specification document.",
      deliverable: "Scope Specification & Technical Architecture",
      timing: "Days 1–3",
    },
    {
      step: "02",
      phase: "Design",
      title: "Clickable Prototypes",
      desc: "We design realistic, clickable screens in Figma with real typography and colors. You experience the product early before code is written.",
      deliverable: "Clickable Figma Prototype & Design Tokens",
      timing: "Weeks 1–2",
    },
    {
      step: "03",
      phase: "Build",
      title: "Weekly Staging Releases",
      desc: "We write clean, typed TypeScript and modern Next.js. Every Friday you receive a private staging build to review progress.",
      deliverable: "Weekly Staging Releases on Vercel",
      timing: "Weeks 2–4",
    },
    {
      step: "04",
      phase: "Launch",
      title: "Audit & Zero Downtime",
      desc: "We run Core Web Vitals checks, test across mobile devices, set up SEO tags, and handle your domain DNS cutover smoothly.",
      deliverable: "Production Deployment & Verified Analytics",
      timing: "Launch Week",
    },
    {
      step: "05",
      phase: "Support",
      title: "30-Day Bug Warranty",
      desc: "We do not disappear after launch. Every project includes a 30-day warranty and full handover of your GitHub repository.",
      deliverable: "30-Day Warranty & Code Repository Handover",
      timing: "Post-Launch",
    },
  ],

  whyChooseUs: [
    {
      number: "01",
      title: "Speed",
      desc: "We ship complete sites in 2 to 4 weeks. You see working software on staging every Friday.",
    },
    {
      number: "02",
      title: "Clear Communication",
      desc: "You talk directly with Buzdil, Vedant, and Prajjwal. Zero sales middlemen, zero telephone games.",
    },
    {
      number: "03",
      title: "You Own The Code",
      desc: "You receive 100% ownership of your GitHub repository, design files, and deployment accounts.",
    },
    {
      number: "04",
      title: "Fair Pricing",
      desc: "Every project has a clear scope and a fixed price quote. No surprise bills or open-ended hourly fees.",
    },
  ],

  packages: [
    {
      id: "starter",
      name: "Starter Website",
      fromPrice: "₹2.5 Lakhs",
      timeline: "2–3 Weeks",
      tagline: "A clean marketing site built to explain your business and capture qualified leads.",
      forWhom: "Early-stage startups, service agencies, and growing small businesses.",
      features: [
        "Custom responsive design in Figma",
        "Next.js codebase with Tailwind CSS",
        "Simple CMS for easy text and image edits",
        "Technical SEO tags and social preview cards",
        "Mobile-first speed optimization",
        "Direct Slack channel with founders",
        "30-day post-launch warranty",
      ],
    },
    {
      id: "platform",
      name: "Web Platform & SaaS MVP",
      badge: "Most Popular",
      highlighted: true,
      fromPrice: "₹5.5 Lakhs",
      timeline: "4–6 Weeks",
      tagline: "Full-stack web application with secure authentication, database, and Stripe billing.",
      forWhom: "Founders launching a software product or digitizing a core business workflow.",
      features: [
        "Everything in Starter Website, plus:",
        "Full-stack Next.js and PostgreSQL architecture",
        "Secure user authentication and team roles",
        "Stripe payment workflows and customer portal",
        "Custom interactive dashboard and data views",
        "Weekly staging releases on Vercel",
        "45-day post-launch engineering warranty",
      ],
    },
    {
      id: "custom",
      name: "Custom Product & Automation",
      fromPrice: "₹9.5 Lakhs",
      timeline: "6–8 Weeks",
      tagline: "Dedicated engineering squad building custom applications and automated business pipelines.",
      forWhom: "Funded scaleups and high-volume businesses needing an embedded engineering squad.",
      features: [
        "Dedicated squad (Buzdil, Vedant, Prajjwal)",
        "Complex web application or marketplace architecture",
        "Automated AI workflows (lead triage, CRM sync, Slack)",
        "Internal admin dashboard and operational tools",
        "Automated test coverage and CI/CD pipelines",
        "Priority founder communication in shared Slack",
        "60-day post-launch warranty",
      ],
    },
  ],

  faqs: [
    {
      question: "How are you different from other agencies?",
      answer: "You work directly with the three founders who design and build your product. We move faster and communicate clearly with zero middlemen.",
    },
    {
      question: "How long does a project take?",
      answer: "Most websites take 2 to 4 weeks. Custom web apps take 4 to 8 weeks with weekly staging demos every Friday.",
    },
    {
      question: "Do you use templates or WordPress?",
      answer: "No. We build custom code using Next.js, React, and Tailwind CSS for top speed, security, and flexibility.",
    },
    {
      question: "Can our team edit content later?",
      answer: "Yes. We connect a simple headless CMS or markdown setup so you can update text and images easily.",
    },
    {
      question: "What are your payment terms?",
      answer: "We split payments into milestones: 50% on kickoff and 50% on final launch and approval.",
    },
    {
      question: "How do we get started?",
      answer: "Send us a short note through our contact form. We will review your project and reply within 24 hours.",
    },
  ],
};
