"use client";

import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import Magnetic from "@/components/animation/Magnetic";
import Reveal from "@/components/animation/Reveal";

export default function FinalCta() {
  return (
    <section className="py-24 sm:py-32 bg-[#09090b] text-white border-t border-white/[0.08]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-8">
        <Reveal>
          <div className="space-y-4">
            <span className="font-mono text-xs text-[#ff5500] uppercase tracking-wider block">
              // READY TO SHIP?
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Start building your product this quarter.
            </h2>
            <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed font-normal">
              Tell us about your project vision. We will review your technical constraints and deliver an architecture outline, fixed price, and timeline within 24 hours.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Magnetic strength={0.3}>
              <Link
                href="/contact"
                className="group/btn flex items-center gap-2 rounded-full bg-[#ff5500] px-8 py-4 text-xs font-mono font-bold text-white uppercase tracking-wider hover:bg-[#e04b00] active:scale-95 transition-all shadow-xl shadow-[#ff5500]/20"
              >
                <span>Start a project</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>
            </Magnetic>

            {SITE_CONFIG.contact.showCalendly && SITE_CONFIG.contact.calendlyUrl && (
              <a
                href={SITE_CONFIG.contact.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/15 bg-[#121216] px-6 py-4 text-xs font-mono text-zinc-300 hover:text-white hover:border-white/30 transition-all"
              >
                <Calendar className="w-4 h-4 text-[#ff5500]" />
                <span>Book 20-min intro call</span>
              </a>
            )}
          </div>
        </Reveal>

        <div className="text-xs font-mono text-zinc-500 pt-6">
          Direct founder reply within 24 hours • Fixed-price quotes • No obligations
        </div>
      </div>
    </section>
  );
}
