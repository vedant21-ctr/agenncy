"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import SplitText from "@/components/animation/SplitText";
import WordCycle from "@/components/animation/WordCycle";
import Magnetic from "@/components/animation/Magnetic";
import DraggableSticker from "@/components/animation/DraggableSticker";
import TextScramble from "@/components/animation/TextScramble";

export default function HomeHero() {
  const heroContainerRef = useRef<HTMLDivElement>(null);

  const scrollToWork = () => {
    const el = document.getElementById("selected-work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={heroContainerRef}
      className="relative min-h-[94vh] flex flex-col justify-between pt-36 pb-12 bg-[#09090b] text-white overflow-hidden border-b-2 border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full my-auto relative z-10">
        <div className="max-w-5xl space-y-8">
          {/* Neo-Editorial Status Pill + Draggable Stickers Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-[#121216] px-4 py-1.5 text-xs font-mono text-zinc-300 shadow-[2px_2px_0px_#000]"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00] animate-pulse" />
              <span className="font-bold text-white uppercase tracking-wider">
                <TextScramble text="STUDIO // LOUD CRAFT" />
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-[#ff5500] font-bold">SENIOR FOUNDER UNIT</span>
            </motion.div>

            {/* Draggable Physics Badges */}
            <DraggableSticker
              containerRef={heroContainerRef}
              initialRotate={-4}
              color="lime"
              className="hidden sm:inline-flex"
            >
              <span>⚡ NOW BOOKING Q2/Q3</span>
            </DraggableSticker>

            <DraggableSticker
              containerRef={heroContainerRef}
              initialRotate={3}
              color="white"
              className="hidden md:inline-flex"
            >
              <span>BM • VS • PT // PARTNERS</span>
            </DraggableSticker>
          </div>

          {/* Giant Oversized Editorial Headline */}
          <div className="space-y-2">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2vw] font-black tracking-tighter uppercase leading-[0.88] text-white"
              >
                WE ENGINEER
              </motion.h1>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 text-5xl sm:text-7xl md:text-8xl lg:text-[7.2vw] font-black tracking-tighter uppercase leading-[0.88]">
              <div className="text-[#ff5500] inline-block min-w-[280px] sm:min-w-[440px] md:min-w-[560px]">
                <WordCycle words={["WEBSITES", "PRODUCTS", "AUTOMATIONS", "SYSTEMS"]} />
              </div>
            </div>

            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2vw] font-black tracking-tighter uppercase leading-[0.88] text-white flex items-center gap-3 sm:gap-6 flex-wrap"
              >
                <span>THAT MOVE MARKETS.</span>
                <span className="text-xs font-mono font-bold tracking-normal bg-[#ff5500] text-black px-3 py-1 rounded-md align-middle shadow-[2px_2px_0px_#fff]">
                  AWWWARDS-LEVEL CRAFT
                </span>
              </motion.div>
            </div>
          </div>

          {/* Subtext with high-contrast mono typography */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-2xl text-zinc-400 max-w-3xl leading-relaxed font-normal"
          >
            A small, high-velocity engineering studio pairing brand identity with full-stack performance. No account reps. You build directly with Buzdil, Vedant, and Prajjwal.
          </motion.p>

          {/* CTA Row with Magnetic Button + Quote Configurator Shortcut */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <Magnetic strength={0.3}>
              <Link
                href="/contact"
                data-cursor="Start"
                className="group/btn flex items-center gap-2 rounded-2xl bg-[#ff5500] px-8 py-4 text-xs font-mono font-black text-black uppercase tracking-wider hover:bg-white active:scale-95 transition-all shadow-[4px_4px_0px_#fff] border-2 border-black"
              >
                <span>Start A Project</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
              </Link>
            </Magnetic>

            <button
              onClick={scrollToWork}
              data-cursor="Explore"
              className="flex items-center gap-2 rounded-2xl border-2 border-white/20 bg-[#121216] px-7 py-4 text-xs font-mono text-zinc-300 hover:text-white hover:border-white transition-all shadow-[4px_4px_0px_#000] cursor-pointer"
            >
              <span>Explore Selected Work</span>
              <ArrowDown className="w-4 h-4 text-[#ff5500]" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Hero Footnote Bar with Live Scroll Hint */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full pt-8 border-t-2 border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-zinc-400">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <span className="text-white font-bold">NEXT.JS 16 APP ROUTER</span>
          <span className="text-zinc-600">•</span>
          <span className="text-white font-bold">TYPESCRIPT & TAILWIND</span>
          <span className="text-zinc-600">•</span>
          <span className="text-[#ccff00] font-bold">LLM WORKFLOW ORCHESTRATION</span>
        </div>

        <button
          onClick={scrollToWork}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group cursor-pointer"
        >
          <span className="uppercase text-[11px] tracking-widest">SCROLL TO DISCOVER</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center group-hover:border-[#ff5500]"
          >
            <ArrowDown className="w-3 h-3 text-[#ff5500]" />
          </motion.div>
        </button>
      </div>
    </section>
  );
}
