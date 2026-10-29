"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import AnimatedList from "@/components/effects/AnimatedList";

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
              className={`w-full text-left p-5 rounded-xl border transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                isActive
                  ? "bg-[#14141a] border-[#3ddc84]/50 shadow-md"
                  : "bg-[#111115] border-white/10 hover:border-white/20"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs text-[#3ddc84] font-bold">
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

              <div className={`w-2 h-2 rounded-full transition-colors ${isActive ? "bg-[#3ddc84]" : "bg-transparent"}`} />
            </button>
          );
        })}
      </div>

      {/* Right Swappable Detail Card with AnimatedList Deliverables */}
      <div className="lg:col-span-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl bg-[#111115] border border-white/10 p-7 sm:p-9 space-y-6"
          >
            {/* Header: Max 8 words */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
              <div>
                <span className="font-mono text-xs text-[#3ddc84] uppercase tracking-wider block font-semibold">
                  SERVICE // {activeService.number}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
                  {activeService.headline}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-400 bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5 self-start shrink-0">
                <Clock className="w-3.5 h-3.5 text-[#3ddc84]" />
                <span>{activeService.timeline}</span>
              </div>
            </div>

            {/* Description: Max 2 short sentences */}
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {activeService.fullDesc}
            </p>

            {/* Who this is for */}
            <div className="rounded-xl bg-black/40 border border-white/[0.06] p-4 text-xs font-mono text-zinc-400 space-y-1">
              <span className="text-[#3ddc84] font-bold block uppercase tracking-wider">
                WHO THIS IS FOR:
              </span>
              <p className="text-zinc-300 font-sans">{activeService.forWhom}</p>
            </div>

            {/* Deliverables with AnimatedList */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block font-semibold">
                INCLUDED DELIVERABLES:
              </span>
              <AnimatedList
                items={activeService.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-[#3ddc84] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              />
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500">
                100% Client Code Ownership
              </span>
              <Link
                href={`/contact?type=${encodeURIComponent(activeService.name)}`}
                prefetch={true}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#3ddc84] hover:underline"
              >
                <span>Request quote for this service</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
