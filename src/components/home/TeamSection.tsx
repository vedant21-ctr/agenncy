"use client";

import React from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import Reveal from "@/components/animation/Reveal";
import { LinkedinIcon } from "@/components/ui/SocialIcons";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

const DISCIPLINES: Record<string, string> = {
  "Buzdil Mirza": "Design Systems • UI/UX Architecture • Typography",
  "Vedant Satbhai": "Next.js 16 • Full-Stack Systems • Performance",
  "Prajjwal Tripathi": "AI Pipelines • Headless CRM • Workflow Automation",
};

export default function TeamSection() {
  return (
    <section id="team" className="relative z-10 py-24 sm:py-32 bg-transparent text-white border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Header: Headline max 8 words, body max 2 short sentences */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
            <div className="space-y-3 max-w-xl">
              <span className="font-mono text-xs text-[#3ddc84] uppercase tracking-wider block font-semibold">
                {"// FOUNDING TEAM"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Meet the Three Founders.
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                You work directly with Buzdil, Vedant, and Prajjwal. Zero sales reps, zero junior subcontractors.
              </p>
            </div>

            <div className="rounded-full border border-white/10 bg-[#111115] text-zinc-400 px-4 py-1.5 font-mono text-xs self-start sm:self-auto">
              3 Partners • 100% Code & Craft
            </div>
          </div>
        </Reveal>

        {/* 3 Founders Typographic Cards (No Photos, High Contrast Craft) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SITE_CONFIG.founders.map((founder, idx) => {
            const initials = getInitials(founder.name);
            const discipline = DISCIPLINES[founder.name] || "Product & Engineering";

            return (
              <Reveal key={founder.name} delay={idx * 0.1}>
                <div className="group h-full rounded-2xl bg-[#111115]/95 backdrop-blur-md border border-white/10 hover:border-[#3ddc84]/50 p-7 flex flex-col justify-between space-y-6 transition-all duration-300 shadow-xl">
                  <div className="space-y-5">
                    {/* Header badge & Monogram */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-[#3ddc84] font-semibold bg-[#3ddc84]/10 border border-[#3ddc84]/20 px-2.5 py-1 rounded-md">
                        {`PARTNER 0${idx + 1}`}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-zinc-300 group-hover:border-[#3ddc84] group-hover:text-[#3ddc84] transition-colors">
                        {initials}
                      </div>
                    </div>

                    {/* Name & Role */}
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-[#3ddc84] transition-colors">
                        {founder.name}
                      </h3>
                      <p className="font-mono text-xs text-zinc-400 mt-1">
                        {founder.role}
                      </p>
                    </div>

                    {/* Core Discipline Badge */}
                    <div className="font-mono text-[11px] text-[#3ddc84] bg-white/[0.02] border border-white/[0.06] rounded-md px-3 py-1.5">
                      {discipline}
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {founder.bio}
                    </p>

                    {/* Craft Note */}
                    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3.5 space-y-1">
                      <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block font-semibold">
                        {"// CRAFT HIGHLIGHT"}
                      </span>
                      <p className="font-mono text-xs text-zinc-400 leading-relaxed">
                        {founder.funFact}
                      </p>
                    </div>
                  </div>

                  {/* Footer Links: Email + LinkedIn */}
                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                    <a
                      href={`mailto:${founder.email}`}
                      className="font-mono text-xs text-zinc-500 hover:text-zinc-200 flex items-center gap-1.5 transition-colors"
                      title={founder.email}
                    >
                      <Mail className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="truncate max-w-[140px]">{founder.email.split("@")[0]}</span>
                    </a>

                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs font-semibold text-[#3ddc84] hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5" />
                      <span>Connect</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
