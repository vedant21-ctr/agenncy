"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function ServiceTabs() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeService = SITE_CONFIG.services[activeIdx];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left List of Services */}
      <div className="lg:col-span-5 space-y-2">
        {SITE_CONFIG.services.map((service, index) => {
          const isActive = activeIdx === index;
          return (
            <button
              key={service.id}
              onClick={() => setActiveIdx(index)}
              onMouseEnter={() => setActiveIdx(index)}
              className={`w-full text-left p-5 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                isActive
                  ? "bg-[#18181f] border-white/20 shadow-sm"
                  : "bg-[#121216] border-white/[0.06] hover:bg-[#15151a] hover:border-white/10"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs text-[#ff5500] font-bold">
                    {service.number}
                  </span>
                  <span className={`text-base font-bold transition-colors ${isActive ? "text-white" : "text-zinc-300"}`}>
                    {service.name}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-1 pl-6">
                  {service.shortDesc}
                </p>
              </div>

              <div className={`w-2 h-2 rounded-full transition-colors ${isActive ? "bg-[#ff5500]" : "bg-transparent"}`} />
            </button>
          );
        })}
      </div>

      {/* Right Swappable Detail Visual Card */}
      <div className="lg:col-span-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="rounded-2xl bg-[#121216] border border-white/10 p-7 sm:p-9 space-y-6 shadow-sm"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/[0.08]">
              <div>
                <span className="font-mono text-xs text-[#ff5500] uppercase tracking-wider block">
                  CAPABILITY // {activeService.number}
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-white mt-0.5">
                  {activeService.name}
                </h3>
              </div>
              <span className="font-mono text-xs text-zinc-400 bg-white/5 border border-white/10 rounded-full px-3 py-1 self-start">
                {activeService.timeline}
              </span>
            </div>

            {/* Description & Who It Is For */}
            <div className="space-y-4">
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                {activeService.fullDesc}
              </p>

              <div className="rounded-xl bg-black/40 border border-white/[0.06] p-4 text-xs font-mono">
                <span className="text-[#ff5500] font-bold block mb-1">WHO THIS IS FOR:</span>
                <span className="text-zinc-400 leading-relaxed">{activeService.forWhom}</span>
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div className="space-y-2.5 pt-2">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block">
                CORE DELIVERABLES:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                {activeService.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#ff5500] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Stack & Link */}
            <div className="pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5">
                {activeService.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[11px] text-zinc-400 bg-white/[0.03] border border-white/5 rounded px-2 py-0.5"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Link
                href={`/services#${activeService.id}`}
                className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#ff5500] hover:underline"
              >
                <span>Read in-depth specifications</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
