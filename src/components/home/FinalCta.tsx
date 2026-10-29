"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/animation/Reveal";
import AuroraShader from "@/components/effects/AuroraShader";

export default function FinalCta() {
  return (
    <section className="relative py-28 sm:py-36 bg-transparent text-white border-t border-white/[0.08] overflow-hidden">
      {/* Subtle Aurora Shader Accent in Growth Green */}
      <AuroraShader opacity={0.35} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-6">
        <Reveal>
          <div className="space-y-4">
            <span className="font-mono text-xs text-[#3ddc84] uppercase tracking-wider block font-semibold">
              {"// START GROWING"}
            </span>
            {/* Headline: max 8 words */}
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Let&apos;s build software that helps your business grow.
            </h2>
            {/* Body copy: max 2 short sentences */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Tell us about your project vision. We will review your goals and reply with a fixed quote and timeline in 24 hours.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="pt-2">
            <Link
              href="/contact"
              prefetch={true}
              className="inline-flex items-center gap-2 rounded-xl bg-[#3ddc84] px-8 py-4 text-xs font-mono font-bold text-black uppercase tracking-wider hover:bg-[#34c776] transition-all shadow-xl shadow-[#3ddc84]/15"
            >
              <span>Start a project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        <div className="text-xs font-mono text-zinc-500 pt-4">
          Direct founder reply within 24 hours • Transparent fixed-price quotes
        </div>
      </div>
    </section>
  );
}
