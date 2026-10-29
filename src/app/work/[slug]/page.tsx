import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import Reveal from "@/components/animation/Reveal";
import DemoRenderer from "@/components/demos/DemoRenderer";

export const dynamicParams = false;

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
              <span className="rounded bg-black/60 border border-white/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#3ddc84]">
                Concept Project
              </span>
            )}
            <span className="font-mono text-xs text-zinc-500">{project.industry}</span>
          </div>
        </div>

        {/* Hero Title & Outcome */}
        <div className="space-y-4 max-w-4xl">
          <span className="font-mono text-xs text-[#3ddc84] uppercase tracking-wider block font-semibold">
            {"//"} {project.type} CASE STUDY
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            {project.title}
          </h1>
          <p className="text-base sm:text-xl text-zinc-300 leading-relaxed">
            {project.outcome}
          </p>
        </div>

        {/* 2-Column Layout: Sticky Side Info + Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-4">
          {/* Sticky Side Metadata Column */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6 rounded-2xl bg-[#111115] border border-white/10 p-6 sm:p-7">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block font-semibold">
                PROJECT METADATA
              </span>
              <span className="w-2 h-2 rounded-full bg-[#3ddc84]" />
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">STATUS</span>
                <span className="text-white font-semibold">Concept Build ({project.client})</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">ROLE</span>
                <span className="text-white font-semibold">{project.role}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">TIMELINE</span>
                <span className="text-white font-semibold">{project.duration}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">YEAR</span>
                <span className="text-white font-semibold">{project.year}</span>
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
                href={`/contact?type=${encodeURIComponent(project.title)}`}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#3ddc84] py-3 text-xs font-mono font-bold text-black uppercase tracking-wider hover:bg-[#34c776] transition-colors"
              >
                <span>Request a quote like this</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </aside>

          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-14">
            {/* Primary Visual Hero Mockup */}
            <div className="rounded-2xl bg-[#111115] border border-white/10 overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#16161c] border-b border-white/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="mx-auto rounded bg-black/40 px-3 py-1 font-mono text-[10px] text-zinc-400 border border-white/5">
                  https://{project.slug}.growhaus.agency
                </div>
              </div>

              <div className="relative aspect-[16/10] w-full bg-zinc-950">
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Overview & Summary */}
            <Reveal>
              <div className="space-y-3">
                <span className="font-mono text-xs text-[#3ddc84] uppercase tracking-wider block font-semibold">
                  {"// SUMMARY"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Project Overview
                </h2>
                <p className="text-base text-zinc-300 leading-relaxed">
                  {project.summary}
                </p>
              </div>
            </Reveal>

            {/* Challenge & Approach */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <Reveal>
                <div className="rounded-2xl bg-[#111115] border border-white/10 p-6 sm:p-7 space-y-2 h-full">
                  <span className="font-mono text-xs text-red-400 uppercase tracking-wider block font-semibold">
                    THE CHALLENGE
                  </span>
                  <h3 className="text-lg font-bold text-white">Problem Statement</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-2xl bg-[#111115] border border-white/10 p-6 sm:p-7 space-y-2 h-full">
                  <span className="font-mono text-xs text-[#3ddc84] uppercase tracking-wider block font-semibold">
                    OUR APPROACH
                  </span>
                  <h3 className="text-lg font-bold text-white">Methodology</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
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
                      <span className="font-mono text-xs text-[#3ddc84] uppercase tracking-wider block font-semibold">
                        {"// INTERACTIVE DEMO"}
                      </span>
                      <h2 className="text-2xl font-bold tracking-tight text-white mt-0.5">
                        Interactive Feature Prototype
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
              <div className="rounded-2xl bg-[#111115] border border-white/10 p-7 sm:p-8 space-y-4">
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block font-semibold">
                  KEY FEATURES WE ENGINEERED
                </span>
                <ul className="space-y-3">
                  {project.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-[#3ddc84] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Metrics */}
            <Reveal>
              <div className="space-y-4">
                <span className="font-mono text-xs text-[#3ddc84] uppercase tracking-wider block font-semibold">
                  {"// PERFORMANCE & STANDARDS"}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.metrics.map((m, i) => (
                    <div key={i} className="rounded-xl bg-[#111115] border border-white/10 p-5 space-y-1">
                      <div className="text-2xl font-bold font-mono text-white">
                        {m.value}
                      </div>
                      <div className="text-xs font-semibold text-zinc-300">{m.label}</div>
                      <div className="text-[11px] font-mono text-zinc-500">{m.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Up Next Project Section */}
        <div className="pt-16 border-t border-white/[0.08]">
          <Link
            href={`/work/${nextProject.slug}`}
            className="group block rounded-2xl bg-[#111115] border border-white/10 hover:border-[#3ddc84]/50 p-8 sm:p-12 transition-all duration-300"
          >
            <div className="space-y-3">
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block font-semibold">
                UP NEXT // {nextProject.type}
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white group-hover:text-[#3ddc84] transition-colors">
                {nextProject.title}
              </h2>
              <p className="text-sm text-zinc-400 max-w-xl">
                {nextProject.outcome}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono font-bold text-white group-hover:text-[#3ddc84] transition-colors">
                <span>View next case study</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
