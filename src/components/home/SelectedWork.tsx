"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import ProjectCard from "./ProjectCard";
import Reveal from "@/components/animation/Reveal";

export default function SelectedWork() {
  const featuredProjects = SITE_CONFIG.projects.slice(0, 4);

  return (
    <section id="selected-work" className="py-24 sm:py-32 bg-[#09090b] text-white border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="font-mono text-xs text-[#ff5500] uppercase tracking-wider block">
                // PROVEN OUTCOMES
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Selected Work.
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
                Every project demonstrates real-world architecture, responsive design, and production code. Explore our case studies below.
              </p>
            </div>

            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#121216] px-5 py-2.5 text-xs font-mono text-zinc-300 hover:text-white hover:border-white/30 transition-all self-start"
            >
              <span>View all projects ({SITE_CONFIG.projects.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#ff5500]" />
            </Link>
          </div>
        </Reveal>

        {/* 2x2 Clean Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 0.1}>
              <ProjectCard project={project} priority={idx < 2} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
