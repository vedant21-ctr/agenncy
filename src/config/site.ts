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

export interface Founder {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
  email: string;
}

export interface ServiceDetail {
  id: string;
  number: string;
  name: string;
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
  rotatingHeroWords: string[];
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
    conceptProjectsCount: number;
    capabilitiesCount: number;
  };
}

export const SITE_CONFIG: SiteConfig = {
  name: "KINETIC",
  legalName: "Kinetic Web & Product Studio",
  tagline: "We build modern digital products for high-growth businesses.",
  heroHeadline: "We design and engineer",
  rotatingHeroWords: ["Web Applications", "Digital Flagships", "Autonomous AI", "SaaS Platforms"],
  heroSubtext:
    "A senior, work-first development studio partnering with founders and scaling teams. No layers, no account managers — direct collaboration with senior practitioners shipped in fast weekly cycles.",
  primaryCTA: "Start a project",
  secondaryCTA: "See our work",
  
  contact: {
    email: "hello@kinetic.studio",
    calendlyUrl: "", // Hidden until real booking link configured
    showCalendly: false,
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    x: "https://x.com",
    location: "San Francisco & Remote Worldwide",
    availability: "Available for new projects — Q2 & Q3 2026",
    sla: "We reply within 24 hours",
  },

  accentColor: "#FF5500", // International Signal Orange
  accentHex: "var(--accent)",

  trueNumbers: {
    foundersCount: 3,
    conceptProjectsCount: 5,
    capabilitiesCount: 4,
  },

  founders: [
    {
      name: "Buzdil Mirza",
      role: "Co-Founder & Creative Director",
      bio: "10+ years directing digital aesthetics, typography, and interaction systems. Specializes in editorial layouts, micro-motion, and brand identities for high-growth tech products.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      linkedin: "https://linkedin.com",
      email: "buzdil@kinetic.studio",
    },
    {
      name: "Vedant Satbhai",
      role: "Co-Founder & Lead Systems Architect",
      bio: "Full-stack engineer specialized in Next.js App Router, distributed backend systems, and database performance. Previously architected core application infrastructure for venture-backed scaleups.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      linkedin: "https://linkedin.com",
      email: "vedant@kinetic.studio",
    },
    {
      name: "Prajjwal Tripathi",
      role: "Co-Founder & Automation Engineer",
      bio: "Engineering workflow automation, LLM orchestration, and internal tool development. Focused on eliminating manual operations so client businesses scale with zero friction.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
      linkedin: "https://linkedin.com",
      email: "prajjwal@kinetic.studio",
    },
  ],

  services: [
    {
      id: "websites",
      number: "01",
      name: "Custom Websites & Digital Flagships",
      shortDesc: "High-authority marketing websites engineered to command credibility and turn qualified visitors into clients.",
      fullDesc: "We design and build bespoke web experiences with editorial art direction, precise typography, instant load times, and structured SEO architecture. Built on Next.js with headless CMS support.",
      forWhom: "Early to mid-stage startups launching new products, funded companies scaling their brand, and professional service firms.",
      timeline: "3–4 Weeks",
      deliverables: [
        "Complete responsive design in Figma",
        "Next.js App Router codebase with Tailwind CSS",
        "Headless CMS integration (Sanity / Strapi / MDX)",
        "Technical SEO, Open Graph & schema structured data",
        "100/100 Core Web Vitals optimization",
      ],
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity / Contentful", "Vercel"],
      previewGraphic: {
        title: "Digital Flagships",
        subtitle: "Sub-1s LCP & Editorial Art Direction",
        stats: "Target 95+ Lighthouse Score",
      },
    },
    {
      id: "web-apps",
      number: "02",
      name: "Web Apps & SaaS MVPs",
      shortDesc: "Full-stack cloud applications designed for speed, intuitive onboarding, and reliable multi-tenant scale.",
      fullDesc: "From custom client portals to SaaS applications, we architect resilient frontend interfaces and robust backend APIs. We handle authentication, Stripe subscriptions, database modeling, and real-time state.",
      forWhom: "Founders taking a new product to market or established businesses replacing legacy software with a purpose-built web tool.",
      timeline: "4–8 Weeks",
      deliverables: [
        "Full-stack React & Next.js application architecture",
        "Secure authentication & role-based permissions",
        "Stripe payment workflows and subscription billing",
        "PostgreSQL / Supabase relational database schema",
        "Automated CI/CD deployment pipeline",
      ],
      techStack: ["React 19", "Next.js", "PostgreSQL", "Prisma", "Stripe API", "Tailwind CSS"],
      previewGraphic: {
        title: "SaaS Architecture",
        subtitle: "Production-ready APIs & database models",
        stats: "Engineered for high query concurrency",
      },
    },
    {
      id: "product-dev",
      number: "03",
      name: "Client Product Development",
      shortDesc: "End-to-end product design sprints from initial wireframing to rapid user-tested MVP release.",
      fullDesc: "We function as an elite embedded design and engineering unit for your company. We deconstruct product hypotheses, craft high-fidelity prototypes, validate UX flows, and build production software in weekly sprints.",
      forWhom: "Teams needing senior product expertise without the 6-month recruitment cycle of hiring a full in-house squad.",
      timeline: "Ongoing Sprint Cadence",
      deliverables: [
        "Product requirements & UX journey mapping",
        "High-fidelity interactive prototypes in Figma",
        "Weekly production builds on live staging environments",
        "Event tracking & user analytics integration (PostHog)",
        "Comprehensive component library & engineering docs",
      ],
      techStack: ["Figma", "Next.js", "TypeScript", "PostHog", "Node.js"],
      previewGraphic: {
        title: "Embedded Product Squad",
        subtitle: "Weekly working software on staging",
        stats: "Disciplined weekly sprint cycle",
      },
    },
    {
      id: "automation",
      number: "04",
      name: "Business Automation & AI Pipelines",
      shortDesc: "Autonomous lead pipelines, CRM synchronizations, internal admin portals, and intelligent document triage.",
      fullDesc: "Stop losing valuable operational hours to manual data entry. We engineer resilient backend pipelines that capture leads, enrich firmographic data, synchronize CRMs, and dispatch smart team alerts.",
      forWhom: "Growing service agencies, consultancies, and e-commerce companies seeking operational leverage without adding headcount.",
      timeline: "2–4 Weeks",
      deliverables: [
        "Automated lead capture & multi-criteria qualification",
        "Bi-directional CRM integration (HubSpot, Salesforce)",
        "AI-assisted lead categorization and inquiry summaries",
        "Custom internal admin tools and Retool/Next.js portals",
        "Error-logged webhook monitors and failover handlers",
      ],
      techStack: ["Python", "FastAPI", "OpenAI / Claude APIs", "PostgreSQL", "n8n / Webhooks"],
      previewGraphic: {
        title: "Automation Engine",
        subtitle: "Zero manual data re-entry across tools",
        stats: "Designed to eliminate repetitive manual triage",
      },
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
      outcome: "Designed to deliver instant cluster visibility with responsive telemetry rendering.",
      summary: "A high-density server monitoring dashboard concept engineered to demonstrate how complex systems telemetry can remain calm, legible, and responsive under high query volumes.",
      heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
      year: "2026",
      duration: "3-Week Concept Sprint",
      role: "Product Architecture & Frontend Engineering",
      stack: ["Next.js App Router", "TypeScript", "Tailwind CSS", "Canvas Charts"],
      challenge: "Most enterprise infrastructure monitoring tools suffer from visual clutter, inconsistent navigation, and browser frame drops when visualizing thousands of streaming events.",
      approach: "We stripped away decorative chrome in favor of high-contrast typography, glanceable sparklines, and unified time-series filtering that operates with zero client-side lag.",
      solution: "Engineered a dark-mode first telemetry interface with interactive period toggles (24h/7d/30d), regional edge cluster health checks, and responsive layouts that scale seamlessly.",
      keyFeatures: [
        "Targeted 60 FPS client-side chart data interpolation",
        "Real-time health status with availability alerts",
        "Multi-region edge cluster latency indicators",
        "High-density responsive data cards without horizontal scroll",
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
      outcome: "Built to showcase physical product craftsmanship through editorial digital layout.",
      summary: "A modern D2C commerce flagship concept designed for high-end acoustic design hardware, featuring tactile finish selection and a streamlined slide-over cart experience.",
      heroImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80",
      year: "2026",
      duration: "2.5-Week Concept Sprint",
      role: "Creative Direction & E-Commerce Engineering",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      challenge: "Standard e-commerce store templates fail to communicate the tactile quality, weight, and acoustic prestige of premium physical goods.",
      approach: "We used expansive whitespace, generous typography, and contextual product photography to create an editorial narrative that treats each hardware object like an exhibition piece.",
      solution: "Created an intuitive product configurator with live finish switching (Obsidian Onyx, Raw Titanium, Cyber Volt) and a friction-free slide-over drawer cart.",
      keyFeatures: [
        "Tactile material finish switcher with instant state transitions",
        "Slide-over cart drawer with real-time price subtotal calculation",
        "Editorial typography layout optimized for luxury brand positioning",
        "Designed to achieve top Lighthouse scores despite rich media",
      ],
      metrics: [
        { label: "Performance Target", value: "95+", note: "Optimized modern WebP asset delivery" },
        { label: "Checkout Flow", value: "2 Clicks", note: "Designed to minimize cart drop-off" },
        { label: "Layout Stability Goal", value: "0.00 CLS", note: "Built to prevent layout jumping" },
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
      summary: "An end-to-end automation workflow concept connecting inbound lead capture forms to AI qualification, CRM enrichment, and automated Slack notification pipelines.",
      heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
      year: "2026",
      duration: "3-Week Concept Sprint",
      role: "Workflow Automation & Pipeline Architecture",
      stack: ["Node.js", "Python", "Claude API", "HubSpot Webhooks", "Slack API"],
      challenge: "Growing B2B service teams spend an estimated 10 to 15 hours weekly copy-pasting lead details from forms into spreadsheets and messaging apps.",
      approach: "We mapped the ideal human decision criteria into a visual, deterministic pipeline with explicit failure handling and automated audit logging.",
      solution: "Engineered an autonomous workflow: incoming webhooks are validated, evaluated against ideal customer profile (ICP) criteria via LLM, enriched in the CRM, and routed to team channels within 500ms.",
      keyFeatures: [
        "Automated inbound payload validation and deduplication",
        "AI-assisted intent analysis and ICP lead tier scoring",
        "Bi-directional synchronization with modern CRM databases",
        "Instant Slack notification with direct calendar booking links",
      ],
      metrics: [
        { label: "Target Time Savings", value: "10-15 hrs", note: "Designed to eliminate manual data entry" },
        { label: "Pipeline Latency Goal", value: "<1s", note: "Target form submission to team dispatch" },
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
      outcome: "Designed for glanceable portfolio clarity and instant security controls.",
      summary: "A mobile-first wealth management interface concept engineered with high contrast, haptic feedback design, contextual spending breakdowns, and instantaneous debit card freeze controls.",
      heroImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1600&q=80",
      year: "2026",
      duration: "2-Week Concept Sprint",
      role: "Mobile UI/UX & React Engineering",
      stack: ["React 19", "Next.js", "Tailwind CSS", "Framer Motion"],
      challenge: "Financial mobile apps often overwhelm users with nested menus, confusing jargon, and slow navigation between accounts.",
      approach: "We prioritized essential daily operations: total portfolio balance, instant card freeze security, and clean chronological transaction receipts.",
      solution: "Built a sleek smartphone frame interface with period filters (Weekly, Monthly, Yearly), tap-to-freeze card feedback, and categorized transaction receipts.",
      keyFeatures: [
        "High-contrast dark card interface with one-tap lock/unlock state",
        "Categorized transaction history with visual direction indicators",
        "Responsive smartphone mockup with fluid touch targets",
        "Zero superfluous charts — only actionable financial insights",
      ],
      metrics: [
        { label: "UI State Response", value: "Optimistic", note: "Instant local card freeze feedback" },
        { label: "Security Interaction", value: "1-Tap", note: "Emergency card lock control" },
        { label: "Contrast Compliance", value: "WCAG AA", note: "Strict adherence to readability" },
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
      summary: "A technical landing page concept for an edge computing runtime, featuring an interactive command line runner, live latency benchmark outputs, and zero marketing fluff.",
      heroImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80",
      year: "2026",
      duration: "2-Week Concept Sprint",
      role: "Brand Architecture & Technical Web Development",
      stack: ["Next.js App Router", "TypeScript", "Tailwind CSS"],
      challenge: "Developer tool marketing sites frequently fail by using vague corporate buzzwords instead of showing actual terminal commands, code, and deployment speed.",
      approach: "We positioned the terminal and technical architecture front and center, allowing visiting engineers to verify capabilities immediately.",
      solution: "Constructed an editorial layout with an interactive CLI simulator (`deploy`, `scale`, `benchmark`) showcasing real-time terminal outputs.",
      keyFeatures: [
        "Interactive CLI simulator with one-click command copy",
        "Clear typographic hierarchy highlighting edge compute benefits",
        "Clean comparison tables with zero invented competitor claims",
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
      title: "Alignment & Technical Blueprint",
      desc: "In an intensive initial sprint, we dissect your business objectives, target audience, technical constraints, and scope boundaries. No endless discovery phases — just a clear, locked specification.",
      deliverable: "Scope Specification & Technical Architecture Doc",
      timing: "Days 1–3",
    },
    {
      step: "02",
      phase: "Design",
      title: "Interactive High-Fidelity Prototypes",
      desc: "We skip low-fidelity wireframe rounds. We design clickable, realistic interfaces in Figma with actual typography, production colors, and responsive layouts so you experience the real product early.",
      deliverable: "Clickable Figma Prototype & Design Tokens",
      timing: "Weeks 1–2",
    },
    {
      step: "03",
      phase: "Build",
      title: "Production Engineering in Sprints",
      desc: "We write clean, typed TypeScript and modern Next.js. Every Friday, you receive a working build on a private staging URL. You see continuous tangible progress, not a surprise at the end.",
      deliverable: "Weekly Staging Releases on Vercel",
      timing: "Weeks 2–4",
    },
    {
      step: "04",
      phase: "Launch",
      title: "Audit & Zero-Downtime Deployment",
      desc: "We execute strict pre-launch checklists: Core Web Vitals profiling, cross-device testing, SEO meta tags, Open Graph images, analytics instrumentation, and smooth domain DNS cutover.",
      deliverable: "Production Deployment & Verified Analytics",
      timing: "Launch Week",
    },
    {
      step: "05",
      phase: "Support",
      title: "Warranty & Growth Roadmap",
      desc: "We don't disappear after launch. Every project includes a 30-day bug warranty and performance guarantee, with optional sprint retainers for ongoing feature expansion.",
      deliverable: "30-Day Warranty & Code Repository Handover",
      timing: "Post-Launch",
    },
  ],

  whyChooseUs: [
    {
      number: "01",
      title: "Speed Without Technical Debt",
      desc: "We ship complete digital flagships in 3 to 4 weeks and custom web apps in 4 to 8 weeks. We write maintainable, typed code that scales as your business grows.",
    },
    {
      number: "02",
      title: "Direct Founder Communication",
      desc: "You collaborate directly with Buzdil (Design), Vedant (Engineering), and Prajjwal (Automation). Zero account managers, zero telephone-game misunderstandings.",
    },
    {
      number: "03",
      title: "100% Code & Asset Ownership",
      desc: "No proprietary closed platforms, no locked CMS environments. You receive full ownership of your GitHub repository, design files, and deployment accounts.",
    },
    {
      number: "04",
      title: "Transparent, Fixed-Price Quotes",
      desc: "We quote projects with fixed pricing based on agreed deliverables. No open-ended hourly billing surprises or unexpected change fees.",
    },
  ],

  packages: [
    {
      id: "flagship",
      name: "Digital Flagship",
      fromPrice: "$4,500",
      timeline: "3–4 Weeks",
      tagline: "High-authority marketing website built to command respect and convert qualified inquiries.",
      forWhom: "Early-stage startups, product launches, and growing boutique agencies.",
      features: [
        "Complete custom art direction & responsive design",
        "Next.js App Router codebase with Tailwind CSS",
        "Headless CMS integration for effortless content updates",
        "Technical SEO, Open Graph & schema metadata",
        "100/100 Core Web Vitals performance guarantee",
        "Direct Slack channel access with founders",
        "30-day post-launch warranty & minor adjustments",
      ],
    },
    {
      id: "platform",
      name: "Web Platform & SaaS MVP",
      badge: "Most Popular",
      highlighted: true,
      fromPrice: "$8,500",
      timeline: "4–6 Weeks",
      tagline: "Full-stack web application with authentication, database models, and billing integration.",
      forWhom: "Founders launching a new software product or digitizing a core business workflow.",
      features: [
        "Everything in Digital Flagship, plus:",
        "Full-stack Next.js & PostgreSQL architecture",
        "Secure authentication & user account management",
        "Stripe payment workflows & subscription portal",
        "Custom interactive dashboards and data visualizers",
        "Weekly production staging builds on Vercel",
        "Comprehensive API documentation and handover",
        "45-day post-launch warranty & SLA guarantee",
      ],
    },
    {
      id: "custom",
      name: "Custom Product & Automation",
      fromPrice: "$14,000",
      timeline: "6–8 Weeks",
      tagline: "End-to-end product engineering squad and automated operational business pipelines.",
      forWhom: "Funded scaleups and high-transaction businesses needing an embedded engineering squad.",
      features: [
        "Dedicated sprint unit (Buzdil, Vedant, Prajjwal)",
        "Complex web application or marketplace architecture",
        "Autonomous AI pipelines (lead triage, CRM sync, alerts)",
        "Internal admin tools & custom operational dashboards",
        "Automated end-to-end testing suite & CI/CD",
        "Real-time event logging & failover monitoring",
        "Priority founder communication across all sprints",
        "60-day post-launch engineering warranty",
      ],
    },
  ],

  faqs: [
    {
      question: "How are you different from a typical agency?",
      answer: "We are a three-founder studio without sales reps or junior subcontractors. You work directly with senior practitioners: Buzdil leads design, Vedant leads systems architecture, and Prajjwal leads automation. We move faster, communicate clearer, and hold ourselves directly accountable for product quality.",
    },
    {
      question: "How long does a typical project take?",
      answer: "A digital flagship website typically takes 3 to 4 weeks. A custom web app or SaaS MVP takes 4 to 8 weeks. Automation pipelines take 2 to 4 weeks. We work in disciplined weekly sprints with staging reviews every Friday.",
    },
    {
      question: "Do you use templates or WordPress?",
      answer: "No. We build custom code using Next.js, React 19, TypeScript, and Tailwind CSS. This ensures instant page loads, clean code architecture, complete design freedom, and zero platform lock-in.",
    },
    {
      question: "Can our team update content after launch?",
      answer: "Yes. When requested, we connect your site to modern headless CMS tools like Sanity or Strapi, or provide markdown-based workflows. You can edit text, publish case studies, and update media without touching code.",
    },
    {
      question: "What are your payment terms?",
      answer: "We work with simple milestone-based payments: typically 50% upon project kickoff and 50% upon final production deployment and sign-off. For longer multi-month engagements, we split into 33% phase milestones.",
    },
    {
      question: "How do we get started?",
      answer: "Send us a brief inquiry through our contact form. We'll review your goals and provide an architectural roadmap, fixed-price quote, and timeline within 24 hours.",
    },
  ],
};
