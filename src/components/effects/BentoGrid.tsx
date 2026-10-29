"use client";

import React from "react";
import { Zap, MessageSquare, ShieldCheck, DollarSign } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import Reveal from "@/components/animation/Reveal";

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
      {/* 1. Speed (Large 7-col bento card) */}
      <Reveal className="lg:col-span-7">
        <div className="group relative h-full rounded-2xl bg-[#111115] border border-white/10 p-7 sm:p-8 flex flex-col justify-between hover:border-[#3ddc84]/40 transition-all duration-300">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#3ddc84]/10 border border-[#3ddc84]/20 flex items-center justify-center text-[#3ddc84]">
                <Zap className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs text-zinc-500">{"// 01 SPEED"}</span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#3ddc84] transition-colors">
                {SITE_CONFIG.whyChooseUs[0].title}
              </h3>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                {SITE_CONFIG.whyChooseUs[0].desc}
              </p>
            </div>
          </div>

          {/* Visual Mini Cadence Strip */}
          <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3ddc84]" />
              <span>Weekly Staging Demos</span>
            </div>
            <span className="text-white font-medium">Every Friday</span>
          </div>
        </div>
      </Reveal>

      {/* 2. Clear Communication (5-col bento card) */}
      <Reveal delay={0.1} className="lg:col-span-5">
        <div className="group relative h-full rounded-2xl bg-[#111115] border border-white/10 p-7 sm:p-8 flex flex-col justify-between hover:border-[#3ddc84]/40 transition-all duration-300">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#3ddc84]/10 border border-[#3ddc84]/20 flex items-center justify-center text-[#3ddc84]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs text-zinc-500">{"// 02 DIRECT"}</span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#3ddc84] transition-colors">
                {SITE_CONFIG.whyChooseUs[1].title}
              </h3>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                {SITE_CONFIG.whyChooseUs[1].desc}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between font-mono text-xs text-zinc-400">
            <span>Direct Slack with Founders</span>
            <span className="text-[#3ddc84] font-medium">Zero Middlemen</span>
          </div>
        </div>
      </Reveal>

      {/* 3. You Own The Code (5-col bento card) */}
      <Reveal delay={0.15} className="lg:col-span-5">
        <div className="group relative h-full rounded-2xl bg-[#111115] border border-white/10 p-7 sm:p-8 flex flex-col justify-between hover:border-[#3ddc84]/40 transition-all duration-300">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#3ddc84]/10 border border-[#3ddc84]/20 flex items-center justify-center text-[#3ddc84]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs text-zinc-500">{"// 03 OWNERSHIP"}</span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#3ddc84] transition-colors">
                {SITE_CONFIG.whyChooseUs[2].title}
              </h3>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                {SITE_CONFIG.whyChooseUs[2].desc}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between font-mono text-xs text-zinc-400">
            <span>GitHub & Figma Handover</span>
            <span className="text-white font-medium">100% Client Owned</span>
          </div>
        </div>
      </Reveal>

      {/* 4. Fair Pricing (7-col bento card) */}
      <Reveal delay={0.2} className="lg:col-span-7">
        <div className="group relative h-full rounded-2xl bg-[#111115] border border-white/10 p-7 sm:p-8 flex flex-col justify-between hover:border-[#3ddc84]/40 transition-all duration-300">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#3ddc84]/10 border border-[#3ddc84]/20 flex items-center justify-center text-[#3ddc84]">
                <DollarSign className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs text-zinc-500">{"// 04 TRANSPARENCY"}</span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#3ddc84] transition-colors">
                {SITE_CONFIG.whyChooseUs[3].title}
              </h3>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                {SITE_CONFIG.whyChooseUs[3].desc}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between font-mono text-xs text-zinc-400">
            <span>Milestone Billing (50 / 50)</span>
            <span className="text-[#3ddc84] font-medium">No Hourly Surprises</span>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
