"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/config/site";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/work/${project.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group block relative rounded-2xl bg-[#121216] border border-white/[0.08] hover:border-transparent transition-colors duration-300 overflow-hidden"
    >
      {/* SVG Border Outline that draws on hover */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full rounded-2xl z-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="15"
          fill="none"
          stroke="#ff5500"
          strokeWidth="1.5"
          className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            strokeDasharray: "2000",
            strokeDashoffset: isHovered ? "0" : "2000",
          }}
        />
      </svg>

      {/* Visual Image Container with subtle scale */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.heroImage}
          alt={project.title}
          loading={priority ? "eager" : "lazy"}
          className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />

        {/* Gradient shadow for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/80 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-2">
            {project.isConcept && (
              <span className="rounded bg-black/75 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-white/90">
                Concept Project
              </span>
            )}
            <span className="rounded bg-black/50 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono text-white/70">
              {project.type}
            </span>
          </div>

          <span className="rounded bg-black/50 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono text-white/60">
            {project.industry}
          </span>
        </div>

        {/* Sliding "View case study" pill on hover */}
        <div className="absolute bottom-4 right-4 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
          <span className="flex items-center gap-1.5 rounded-full bg-[#ff5500] px-3.5 py-1.5 text-xs font-mono font-bold text-white shadow-lg">
            <span>View case study</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Information Row */}
      <div className="p-6 sm:p-7 space-y-3 relative z-10">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white transition-transform duration-300 ease-out group-hover:translate-x-1">
            {project.title}
          </h3>
          <span className="font-mono text-xs text-white/40 shrink-0">{project.year}</span>
        </div>

        <p className="text-sm text-zinc-400 leading-relaxed font-normal">
          {project.outcome}
        </p>

        {/* Tech Stack Pills */}
        <div className="pt-2 flex flex-wrap items-center gap-1.5">
          {project.stack.slice(0, 3).map((item) => (
            <span
              key={item}
              className="rounded bg-white/[0.04] border border-white/5 px-2 py-0.5 font-mono text-[11px] text-zinc-400"
            >
              {item}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="font-mono text-[10px] text-zinc-500">
              +{project.stack.length - 3} more
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
