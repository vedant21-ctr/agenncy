"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { ArrowUpRight, Grid, List, Sparkles } from "lucide-react";
import { SITE_CONFIG, Project } from "@/config/site";
import ProjectCard from "./ProjectCard";
import TextScramble from "@/components/animation/TextScramble";
import { useReducedMotion } from "@/components/animation/useReducedMotion";

export default function ShowcaseCenterpiece() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for floating preview card in List view
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 220, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const categories = ["All", "Websites", "Web Apps", "Automation"];

  const filteredProjects = SITE_CONFIG.projects.filter((p) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Websites") return p.type === "Website";
    if (activeCategory === "Web Apps") return p.type === "Web App";
    if (activeCategory === "Automation") return p.type === "Automation";
    return true;
  });

  return (
    <section
      id="selected-work"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-28 sm:py-36 bg-[#09090b] text-white border-b-2 border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Section Header with View Switcher & Filter Pills */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b-2 border-white/10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-1 text-xs font-mono text-[#ff5500]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                <TextScramble text="// PROVEN ARCHITECTURE & CLIENT PRODUCTION" />
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-white">
              Selected Work.
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
              Every project is an engineered production build or architecture benchmark labeled honestly as a Concept Project.
            </p>
          </div>

          {/* Controls: Filter Pills + View Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter pills */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-[#121216] border border-white/10 shadow-[3px_3px_0px_#000]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
                    activeCategory === cat
                      ? "bg-[#ff5500] text-black shadow-[2px_2px_0px_#000]"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-1 p-1 rounded-2xl bg-[#121216] border border-white/10">
              <button
                onClick={() => setViewMode("list")}
                aria-label="List view"
                className={`p-2 rounded-xl transition-colors ${
                  viewMode === "list" ? "bg-white text-black" : "text-zinc-400 hover:text-white"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                className={`p-2 rounded-xl transition-colors ${
                  viewMode === "grid" ? "bg-white text-black" : "text-zinc-400 hover:text-white"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* View Mode A: Giant Editorial Interactive List (Default) */}
        {viewMode === "list" && (
          <div className="relative divide-y-2 divide-white/10">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative py-8 sm:py-12 transition-all duration-300"
              >
                <Link
                  href={`/work/${project.slug}`}
                  data-cursor="View"
                  data-cursor-variant="project"
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full"
                >
                  <div className="flex items-baseline gap-4 sm:gap-8">
                    <span className="font-mono text-sm sm:text-base text-[#ff5500] font-black">
                      0{idx + 1} //
                    </span>
                    <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white group-hover:text-[#ff5500] group-hover:translate-x-3 transition-all duration-300">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-6 md:text-right">
                    <div className="space-y-1">
                      <span className="font-mono text-xs font-bold text-[#ccff00] uppercase block">
                        {project.type}
                      </span>
                      <span className="font-mono text-[11px] text-zinc-500 block">
                        {project.year} • {project.isConcept ? "Concept Project" : "Production"}
                      </span>
                    </div>

                    <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center text-white group-hover:border-[#ff5500] group-hover:bg-[#ff5500] group-hover:text-black transition-all duration-300 group-hover:rotate-45">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Floating Preview Card following cursor in List View (Desktop) */}
            {!reducedMotion && hoveredProject && (
              <motion.div
                style={{
                  left: smoothX,
                  top: smoothY,
                  translateX: "-50%",
                  translateY: "-50%",
                }}
                initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 2 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="hidden lg:block pointer-events-none absolute z-30 w-80 rounded-2xl overflow-hidden border-2 border-black bg-[#121216] shadow-[8px_8px_0px_#ff5500]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={hoveredProject.heroImage}
                    alt={hoveredProject.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-black/80 px-2.5 py-0.5 rounded text-[10px] font-mono text-white font-bold">
                    {hoveredProject.isConcept ? "CONCEPT PROJECT" : hoveredProject.type}
                  </div>
                </div>

                <div className="p-4 space-y-1 bg-[#121216]">
                  <div className="font-black text-sm text-white">{hoveredProject.title}</div>
                  <div className="font-mono text-[11px] text-zinc-400">
                    {hoveredProject.metrics[0]?.value} — {hoveredProject.metrics[0]?.label}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* View Mode B: 2x2 Clean Editorial Grid */}
        {viewMode === "grid" && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
