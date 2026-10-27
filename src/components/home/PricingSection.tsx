"use client";

import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import Reveal from "@/components/animation/Reveal";
import Tilt from "@/components/animation/Tilt";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 sm:py-32 bg-[#09090b] text-white border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="font-mono text-xs text-[#ff5500] uppercase tracking-wider block">
                // TRANSPARENT INVESTMENT
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Simple, Predictable Packages.
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
                Fixed pricing based on clear sprint deliverables. No unexpected retainers or scope creep.
              </p>
            </div>
            <div className="font-mono text-xs text-zinc-400 border border-white/10 rounded-full px-3.5 py-1.5 bg-[#121216] self-start">
              50% on kickoff / 50% on production sign-off
            </div>
          </div>
        </Reveal>

        {/* 3 Pricing Cards with 3D Tilt */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {SITE_CONFIG.packages.map((pkg, idx) => (
            <Reveal key={pkg.id} delay={idx * 0.1} className="h-full">
              <Tilt maxTilt={5} className="h-full">
                <div
                  className={`rounded-2xl p-7 sm:p-8 flex flex-col justify-between h-full relative transition-all ${
                    pkg.highlighted
                      ? "bg-[#16161c] border-2 border-[#ff5500] shadow-xl shadow-[#ff5500]/10"
                      : "bg-[#121216] border border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  {pkg.badge && (
                    <div className="absolute -top-3 left-6 bg-[#ff5500] text-white font-mono text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow">
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

                    <div className="py-3 border-y border-white/[0.08]">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs font-mono text-zinc-500">From</span>
                        <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
                          {pkg.fromPrice}
                        </span>
                        <span className="text-xs font-mono text-zinc-500">USD</span>
                      </div>
                      <div className="text-xs font-mono text-[#ff5500] mt-1">
                        Estimated Timeline: {pkg.timeline}
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                        INCLUDED IN SCOPE:
                      </span>
                      <ul className="space-y-2">
                        {pkg.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                            <Check className="w-4 h-4 text-[#ff5500] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl bg-black/40 border border-white/5 p-3 text-xs font-mono text-zinc-400">
                      <span className="text-zinc-200 font-bold block mb-0.5">Best For:</span>
                      {pkg.forWhom}
                    </div>
                  </div>

                  <div className="pt-8">
                    <Link
                      href={`/contact?package=${encodeURIComponent(pkg.name)}`}
                      className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                        pkg.highlighted
                          ? "bg-[#ff5500] text-white hover:bg-[#e04b00]"
                          : "bg-white/10 text-white hover:bg-white hover:text-black"
                      }`}
                    >
                      <span>Inquire for this package</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
