"use client";

import { Zap, MessageSquare, ShieldCheck, DollarSign } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import Reveal from "@/components/animation/Reveal";

const iconMap = [Zap, MessageSquare, ShieldCheck, DollarSign];

export default function WhyUsSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#09090b] text-white border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        <Reveal>
          <div className="space-y-3 max-w-xl">
            <span className="font-mono text-xs text-[#ff5500] uppercase tracking-wider block">
              // WHY CHOOSE US
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Built for Founders Who Value Speed.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
              Traditional agencies are designed to bill hours and prolong timelines. We are structured to ship reliable software and get out of your way.
            </p>
          </div>
        </Reveal>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SITE_CONFIG.whyChooseUs.map((item, idx) => {
            const Icon = iconMap[idx] || Zap;
            return (
              <Reveal key={item.number} delay={idx * 0.1}>
                <div className="rounded-2xl bg-[#121216] border border-white/[0.08] p-8 sm:p-9 space-y-4 hover:border-white/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#ff5500]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-zinc-500">
                      // {item.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-white">
                    {item.title}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
