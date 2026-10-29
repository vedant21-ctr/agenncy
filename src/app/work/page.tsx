"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/config/site";
import ProjectCard from "@/components/home/ProjectCard";

const types = ["All Types", "Website", "Web App", "Automation", "Branding"] as const;
const industries = ["All Industries", "SaaS & Cloud", "E-Commerce", "Fintech", "Developer Tools", "AI & Workflow"] as const;

export default function WorkPage() {
  const [selectedType, setSelectedType] = useState<(typeof types)[number]>("All Types");
  const [selectedIndustry, setSelectedIndustry] = useState<(typeof industries)[number]>("All Industries");

  const filteredProjects = SITE_CONFIG.projects.filter((project) => {
    const matchesType = selectedType === "All Types" || project.type === selectedType;
    const matchesIndustry = selectedIndustry === "All Industries" || project.industry === selectedIndustry;
    return matchesType && matchesIndustry;
  });

  return (
    <main className="min-h-screen pt-36 pb-24 bg-[#09090b] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Page Header: Headline max 8 words, body max 2 short sentences */}
        <div className="max-w-3xl space-y-3">
          <span className="font-mono text-xs text-[#3ddc84] uppercase tracking-wider block font-semibold">
            {"// SELECTED WORK"}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Our Work and Concept Projects.
          </h1>
          <p className="text-base text-zinc-400 leading-relaxed">
            A portfolio of production web applications and custom websites. Each project represents our commitment to fast performance and clean code.
          </p>
        </div>

        {/* Dual Filter Controls: By Type and By Industry */}
        <div className="space-y-4 py-6 border-y border-white/[0.08]">
          {/* Filter by Type */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-zinc-500 mr-2 uppercase">TYPE:</span>
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer ${
                  selectedType === t
                    ? "bg-[#3ddc84] text-black font-bold"
                    : "bg-[#111115] border border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Filter by Industry */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-zinc-500 mr-2 uppercase">INDUSTRY:</span>
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-3 py-1 rounded-full font-mono text-xs transition-all cursor-pointer ${
                  selectedIndustry === ind
                    ? "bg-white/20 text-white font-bold"
                    : "bg-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        {/* Work Grid with smooth layout rearrangement */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center text-zinc-500 font-mono text-sm">
            No projects found matching the selected filters.
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </main>
  );
}
