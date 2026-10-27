"use client";

import ScrollHighlightText from "@/components/animation/ScrollHighlightText";
import Reveal from "@/components/animation/Reveal";

export default function ScrollHighlightStatement() {
  const statement =
    "We partner with ambitious founders to engineer web applications and digital flagships that refuse to be ignored. By eliminating agency layers and pairing high-craft typography with disciplined full-stack code, we turn complex visions into production software in weeks, not quarters.";

  return (
    <section
      id="statement"
      className="py-24 sm:py-36 bg-[#09090b] text-white border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-3 space-y-3">
            <span className="font-mono text-xs text-[#ff5500] uppercase tracking-wider block">
              // STUDIO MANIFESTO
            </span>
            <p className="text-xs font-mono text-zinc-500 leading-relaxed">
              Scroll down to reveal our operating philosophy and technical commitment.
            </p>
          </div>

          <div className="lg:col-span-9">
            <ScrollHighlightText
              text={statement}
              className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.25]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
