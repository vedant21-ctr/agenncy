"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import BlurText from "@/components/effects/BlurText";
import ShinyText from "@/components/effects/ShinyText";
import DecryptedText from "@/components/effects/DecryptedText";

export default function HomeHero() {
  const scrollToWork = () => {
    const el = document.getElementById("build");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center pt-28 pb-16 bg-transparent text-white overflow-hidden border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Calm Area with Clean Typography & CTAs */}
          <div className="lg:col-span-7 space-y-8 max-w-2xl">
            {/* Decrypted Small Status Label (1 of max 2 places) */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#121216] px-3.5 py-1.5 text-xs font-mono text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-[#3ddc84] animate-pulse" />
              <DecryptedText
                text="GROWHAUS STUDIO"
                speed={35}
                maxIterations={8}
                className="font-bold text-white uppercase tracking-wider"
              />
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">Available this quarter</span>
            </div>

            {/* Hero Headline: Max 8 words, max 64px desktop, clean sans + serif accent on one word */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-semibold tracking-tight text-white leading-[1.12]">
                <BlurText
                  text="Websites and products that help your business"
                  delay={40}
                  className="mr-2"
                />
                <span className="font-serif-accent font-normal italic text-[#3ddc84]">
                  <ShinyText text="grow" highlightColor="#3DDC84" />.
                </span>
              </h1>

              {/* Body Copy: Max 2 short sentences per block */}
              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-normal max-w-xl pt-2">
                We design and build fast websites, web apps, and automated workflows. Made for founders, startups, and growing small businesses.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact"
                prefetch={true}
                className="inline-flex items-center gap-2 rounded-xl bg-[#3ddc84] px-6 py-3.5 text-xs font-mono font-bold text-black uppercase tracking-wider hover:bg-[#34c776] transition-all shadow-lg shadow-[#3ddc84]/10"
              >
                <span>{SITE_CONFIG.primaryCTA}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <button
                onClick={scrollToWork}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#121216] px-6 py-3.5 text-xs font-mono text-zinc-300 hover:text-white hover:border-white/20 transition-all"
              >
                <span>{SITE_CONFIG.secondaryCTA}</span>
                <ArrowDown className="w-4 h-4 text-[#3ddc84]" />
              </button>
            </div>

            {/* Short Assurances */}
            <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-zinc-500">
              <div className="flex items-center gap-1.5">
                <span className="text-[#3ddc84]">✓</span>
                <span>Direct founder collaboration</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#3ddc84]">✓</span>
                <span>We reply within 24 hours</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#3ddc84]">✓</span>
                <span>You own 100% of the code</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero 3D Stage with Luminous Emerald Glow Backdrop */}
          <div className="lg:col-span-5 relative w-full h-[360px] sm:h-[440px] lg:h-[500px] flex items-center justify-center">
            {/* Luminous Glow Backdrop to make the 3D House crisp and vivid */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(61, 220, 132, 0.22) 0%, rgba(16, 185, 129, 0.08) 45%, transparent 72%)",
              }}
            />
            {/* Faint ambient glass ring to frame the 3D house */}
            <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-[#3ddc84]/20 animate-[pulse_4s_ease-in-out_infinite] pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
