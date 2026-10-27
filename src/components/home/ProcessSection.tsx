"use client";

import ProcessTimeline from "./ProcessTimeline";
import Reveal from "@/components/animation/Reveal";

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 sm:py-32 bg-[#09090b] text-white border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        <Reveal>
          <div className="space-y-3 max-w-xl">
            <span className="font-mono text-xs text-[#ff5500] uppercase tracking-wider block">
              // HOW WE WORK
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Disciplined Weekly Sprints.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
              No black boxes or six-month delays. We work in transparent 1-week and 2-week sprints with working software deployed to private staging every Friday.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <ProcessTimeline />
        </Reveal>
      </div>
    </section>
  );
}
