"use client";

import ProcessTimeline from "./ProcessTimeline";
import Reveal from "@/components/animation/Reveal";

export default function ProcessSection() {
  return (
    <section id="process" className="relative z-10 py-24 sm:py-32 bg-transparent text-white border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Header: Headline max 8 words, body max 2 short sentences */}
        <Reveal>
          <div className="space-y-3 max-w-xl">
            <span className="font-mono text-xs text-[#3ddc84] uppercase tracking-wider block font-semibold">
              {"// HOW WE WORK"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Disciplined Weekly Sprints.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              We work in transparent weekly cycles with live staging builds delivered every Friday. You see working software early and often.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ProcessTimeline />
        </Reveal>
      </div>
    </section>
  );
}
