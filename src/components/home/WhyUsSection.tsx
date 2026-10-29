"use client";

import React from "react";
import Reveal from "@/components/animation/Reveal";
import BentoGrid from "@/components/effects/BentoGrid";

export default function WhyUsSection() {
  return (
    <section id="why-us" className="relative z-10 py-24 sm:py-32 bg-transparent text-white border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Header: Headline max 8 words, body max 2 short sentences */}
        <Reveal>
          <div className="space-y-3 max-w-xl">
            <span className="font-mono text-xs text-[#3ddc84] uppercase tracking-wider block font-semibold">
              {"// WHY GROWHAUS"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Why Founders Choose GrowHaus.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              We are structured to ship reliable software without unnecessary layers. You get fast results, direct access, and complete code ownership.
            </p>
          </div>
        </Reveal>

        {/* Bento Grid */}
        <BentoGrid />
      </div>
    </section>
  );
}
