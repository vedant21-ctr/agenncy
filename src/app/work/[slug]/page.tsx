import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import Reveal from "@/components/animation/Reveal";
import ClipReveal from "@/components/animation/ClipReveal";
import DemoRenderer from "@/components/demos/DemoRenderer";

export async function generateStaticParams() {
  return SITE_CONFIG.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = SITE_CONFIG.projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Case Study | ${SITE_CONFIG.name}`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projectIndex = SITE_CONFIG.projects.findIndex((p) => p.slug === slug);
  if (projectIndex === -1) notFound();

  const project = SITE_CONFIG.projects[projectIndex];
  const nextProject = SITE_CONFIG.projects[(projectIndex + 1) % SITE_CONFIG.projects.length];

  const demoTypeMap: Record<string, "saas-dashboard" | "ecommerce" | "ai-workflow" | "fintech-app" | "startup-landing"> = {
    "pulse-analytics": "saas-dashboard",
    "aura-objects": "ecommerce",
    "synapse-flow": "ai-workflow",
    "vault-fintech": "fintech-app",
    "apex-systems": "startup-landing",
  };
  const demoType = demoTypeMap[project.slug];

  return (
    <main className="min-h-screen pt-36 pb-24 bg-[#09090b] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Case Studies</span>
          </Link>

          <div className="flex items-center gap-2">
            {project.isConcept && (
              <span className="rounded bg-black/60 border border-white/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-white/80">
                Concept Project
              </span>
            )}
            <span className="font-mono text-xs text-zinc-500">{project.industry}</span>
          </div>
        </div>

        {/* Hero Title & Outcome */}
        <div className="space-y-6 max-w-4xl">
          <span className="font-mono text-xs text-[#ff5500] uppercase tracking-wider block">
            // {project.type} CASE STUDY
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {project.title}
          </h1>
          <p className="text-lg sm:text-2xl text-zinc-300 leading-relaxed font-normal">
            {project.outcome}
          </p>
        </div>

        {/* 2-Column Layout: Sticky Side Info + Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-6">
          {/* Sticky Side Metadata Column with reading progress indicator */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6 rounded-2xl bg-[#121216] border border-white/[0.08] p-6 sm:p-7">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">
                PROJECT METADATA
              </span>
              <span className="w-2 h-2 rounded-full bg-[#ff5500]" />
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">CLIENT / STATUS</span>
                <span className="text-white font-bold">{project.client}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">OUR ROLE</span>
                <span className="text-white font-bold">{project.role}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">TIMELINE</span>
                <span className="text-white font-bold">{project.duration}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">YEAR</span>
                <span className="text-white font-bold">{project.year}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] space-y-2">
              <span className="text-zinc-500 block text-[10px] font-mono uppercase">TECHNOLOGY STACK</span>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded bg-white/5 border border-white/10 px-2 py-0.5 font-mono text-[11px] text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06]">
              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#ff5500] py-3 text-xs font-mono font-bold text-white uppercase tracking-wider hover:bg-[#e04b00] transition-colors"
              >
                <span>Discuss a similar build</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </aside>

          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-16">
            {/* Primary Visual Hero Mockup with ClipReveal */}
            <ClipReveal>
              <div className="rounded-2xl bg-[#121216] border border-white/[0.08] overflow-hidden shadow-2xl">
                {/* Browser bar frame */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#18181f] border-b border-white/[0.06]">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="mx-auto rounded bg-black/40 px-3 py-1 font-mono text-[10px] text-zinc-400 border border-white/5">
                    https://{project.slug}.preview.internal
                  </div>
                </div>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            </ClipReveal>

            {/* Overview & Summary */}
            <Reveal>
              <div className="space-y-4">
                <span className="font-mono text-xs text-[#ff5500] uppercase tracking-wider block">
                  // EXECUTIVE SUMMARY
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Project Overview
                </h2>
                <p className="text-base text-zinc-300 leading-relaxed font-normal">
                  {project.summary}
                </p>
              </div>
            </Reveal>

            {/* Challenge & Approach */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <Reveal>
                <div className="rounded-2xl bg-[#121216] border border-white/[0.08] p-7 space-y-3 h-full">
                  <span className="font-mono text-xs text-red-400 uppercase tracking-wider block">
                    THE CHALLENGE
                  </span>
                  <h3 className="text-lg font-bold text-white">Problem Statement</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                    {project.challenge}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-2xl bg-[#121216] border border-white/[0.08] p-7 space-y-3 h-full">
                  <span className="font-mono text-xs text-[#ff5500] uppercase tracking-wider block">
                    OUR APPROACH
                  </span>
                  <h3 className="text-lg font-bold text-white">Methodology</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                    {project.approach}
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Live Working Prototype / Interactive Simulation */}
            {demoType && (
              <Reveal>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs text-[#ff5500] uppercase tracking-wider block">
                        // INTERACTIVE PROTOTYPE
                      </span>
                      <h2 className="text-2xl font-bold tracking-tight text-white mt-0.5">
                        Working Interface Demonstration
                      </h2>
                    </div>
                    <span className="font-mono text-xs text-zinc-500">Live in browser</span>
                  </div>

                  <div className="pt-2">
                    <DemoRenderer type={demoType} />
                  </div>
                </div>
              </Reveal>
            )}

            {/* Key Engineering Features */}
            <Reveal>
              <div className="rounded-2xl bg-[#121216] border border-white/[0.08] p-8 space-y-5">
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block">
                  KEY DELIVERED CAPABILITIES
                </span>
                <ul className="space-y-3">
                  {project.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-[#ff5500] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Results / Target Metrics (Honest Design Targets) */}
            <Reveal>
              <div className="space-y-6">
                <span className="font-mono text-xs text-[#ff5500] uppercase tracking-wider block">
                  // DESIGN TARGETS & DEMO BEHAVIOR
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.metrics.map((m, i) => (
                    <div key={i} className="rounded-xl bg-[#121216] border border-white/[0.08] p-5 space-y-1">
                      <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                        {m.value}
                      </div>
                      <div className="text-xs font-bold text-zinc-300">{m.label}</div>
                      <div className="text-[11px] font-mono text-zinc-500">{m.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Case Study "Next Project" Screen-Filling Hero Section */}
        <div className="pt-24 border-t border-white/[0.08]">
          <Link
            href={`/work/${nextProject.slug}`}
            className="group block rounded-3xl bg-[#121216] border border-white/[0.08] hover:border-[#ff5500]/50 p-8 sm:p-16 transition-all duration-300 relative overflow-hidden"
          >
            <div className="space-y-4">
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block">
                UP NEXT // {nextProject.type}
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white group-hover:text-[#ff5500] transition-colors leading-tight">
                {nextProject.title}
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 max-w-xl font-normal">
                {nextProject.outcome}
              </p>
              <div className="pt-4 flex items-center gap-2 text-xs font-mono font-bold text-white group-hover:text-[#ff5500] transition-colors">
                <span>Explore next case study</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
