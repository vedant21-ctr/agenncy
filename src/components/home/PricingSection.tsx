"use client";

import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import Reveal from "@/components/animation/Reveal";

export default function PricingSection() {
  return (
    <section id="pricing" className="relative z-10 py-24 sm:py-32 bg-transparent text-white border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Header: Headline max 8 words, body max 2 short sentences */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
            <div className="space-y-3 max-w-xl">
              <span className="font-mono text-xs text-[#3ddc84] uppercase tracking-wider block font-semibold">
                {"// TRANSPARENT PACKAGES"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Simple, Predictable Project Packages.
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Fixed pricing based on agreed deliverables. No surprise bills or open-ended hourly fees.
              </p>
            </div>
            <div className="font-mono text-xs text-zinc-400 border border-white/10 rounded-full px-4 py-1.5 bg-[#111115] self-start sm:self-auto">
              50% on kickoff / 50% on launch approval
            </div>
          </div>
        </Reveal>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {SITE_CONFIG.packages.map((pkg, idx) => (
            <Reveal key={pkg.id} delay={idx * 0.1} className="h-full">
              <div
                className={`rounded-2xl p-7 sm:p-8 flex flex-col justify-between h-full relative transition-all duration-300 ${
                  pkg.highlighted
                    ? "bg-[#14141a] border-2 border-[#3ddc84] shadow-xl shadow-[#3ddc84]/10"
                    : "bg-[#111115] border border-white/10 hover:border-white/20"
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3 left-6 bg-[#3ddc84] text-black font-mono text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow">
                    {pkg.badge}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-white">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      {pkg.tagline}
                    </p>
                  </div>

                  <div className="py-4 border-y border-white/[0.08]">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs font-mono text-zinc-500">From</span>
                      <span className="text-3xl sm:text-4xl font-bold font-mono text-white">
                        {pkg.fromPrice}
                      </span>
                      <span className="text-xs font-mono text-zinc-500">USD</span>
                    </div>
                    <div className="text-xs font-mono text-[#3ddc84] mt-1">
                      Estimated Timeline: {pkg.timeline}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block font-semibold">
                      INCLUDED IN SCOPE:
                    </span>
                    <ul className="space-y-2.5">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                          <Check className="w-4 h-4 text-[#3ddc84] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href={`/contact?package=${encodeURIComponent(pkg.name)}`}
                    className={`w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
                      pkg.highlighted
                        ? "bg-[#3ddc84] text-black hover:bg-[#34c776]"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    <span>Get a quote</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
