"use client";

import { useState } from "react";
import { LinkedinIcon } from "@/components/ui/SocialIcons";
import { SITE_CONFIG } from "@/config/site";
import Reveal from "@/components/animation/Reveal";
import Tilt from "@/components/animation/Tilt";
import { Sparkles, ArrowUpRight } from "lucide-react";
import TextScramble from "@/components/animation/TextScramble";

const FOUNDER_DATA = [
  {
    name: "BUZDIL MIRZA",
    role: "Creative Director & Co-Founder",
    specialty: "Brand Identity, Micro-Motion & UI/UX Systems",
    funFact: "Obsessed with Swiss grid systems, custom typography, and sub-16ms layout animations.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    linkedin: "https://linkedin.com",
    email: "buzdil@kinetic.studio",
  },
  {
    name: "VEDANT SATBHAI",
    role: "Lead Systems Architect & Co-Founder",
    specialty: "Next.js App Router, Distributed Backends & DB Engines",
    funFact: "Benchmarks distributed query execution trees for fun; compiles custom Linux runtimes.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    linkedin: "https://linkedin.com",
    email: "vedant@kinetic.studio",
  },
  {
    name: "PRAJJWAL TRIPATHI",
    role: "Automation Engineer & Co-Founder",
    specialty: "Autonomous LLM Agents, ETL Pipelines & Workflow Daemons",
    funFact: "Automated his entire physical apartment and dev setup with custom webhook daemons.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    linkedin: "https://linkedin.com",
    email: "prajjwal@kinetic.studio",
  },
];

export default function TeamSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="team" className="py-28 sm:py-36 bg-[#09090b] text-white border-b-2 border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b-2 border-white/10">
            <div className="space-y-4 max-w-2xl">
              <span className="font-mono text-xs text-[#ff5500] uppercase font-bold tracking-wider block">
                <TextScramble text="// THE SENIOR UNIT" />
              </span>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-white">
                The Partners.
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
                You work directly with Buzdil, Vedant, and Prajjwal. Zero sales middlemen, zero junior sub-contractors.
              </p>
            </div>

            <div className="rounded-xl border-2 border-black bg-[#ccff00] text-black px-4 py-2 font-mono text-xs font-black uppercase shadow-[3px_3px_0px_#fff]">
              3 PARTNERS • 100% CODE CRAFT
            </div>
          </div>
        </Reveal>

        {/* 3 Founders Grid with Tilt & Fun Fact Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FOUNDER_DATA.map((founder, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <Reveal key={founder.name} delay={idx * 0.1}>
                <Tilt maxTilt={6} className="h-full">
                  <div
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="group relative rounded-3xl bg-[#121216] border-2 border-white/10 p-6 sm:p-7 flex flex-col justify-between h-full transition-all duration-300 hover:border-[#ff5500] shadow-[6px_6px_0px_#000] hover:shadow-[6px_6px_0px_#ff5500]"
                  >
                    <div className="space-y-6">
                      {/* Photo Container with Monochrome to Color Hover */}
                      <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-zinc-950 border-2 border-white/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={founder.image}
                          alt={founder.name}
                          className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        />

                        {/* Partner Number Badge */}
                        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-mono text-white font-bold border border-white/20">
                          PARTNER 0{idx + 1}
                        </div>

                        {/* Interactive Fun Fact Reveal Overlay on Hover */}
                        <div
                          className={`absolute inset-0 bg-black/90 p-6 flex flex-col justify-center transition-all duration-300 backdrop-blur-sm ${
                            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 text-xs font-mono text-[#ccff00] font-bold uppercase mb-2">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Behind The Screen</span>
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans font-medium">
                            &ldquo;{founder.funFact}&rdquo;
                          </p>
                          <div className="text-[10px] font-mono text-[#ff5500] mt-4 uppercase">
                            Focus: {founder.specialty}
                          </div>
                        </div>
                      </div>

                      {/* Name in Huge Neo-Editorial Type */}
                      <div className="space-y-2">
                        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white group-hover:text-[#ff5500] transition-colors">
                          {founder.name}
                        </h3>
                        <div className="text-xs font-mono font-bold text-[#ccff00] uppercase tracking-wider">
                          {founder.role}
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                          {founder.specialty}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <a
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="Connect"
                        className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white font-bold transition-colors"
                      >
                        <LinkedinIcon className="w-4 h-4 text-[#ff5500]" />
                        <span>LinkedIn</span>
                        <ArrowUpRight className="w-3 h-3 opacity-60" />
                      </a>

                      <a
                        href={`mailto:${founder.email}`}
                        className="text-zinc-500 hover:text-white transition-colors"
                      >
                        {founder.email}
                      </a>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
