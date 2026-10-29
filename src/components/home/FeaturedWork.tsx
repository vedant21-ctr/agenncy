"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/animation/Reveal";
import CurvedProjectGallery from "@/components/effects/CurvedProjectGallery";

export default function FeaturedWork() {
  return (
    <section id="featured-work" className="relative z-10 py-24 sm:py-32 bg-transparent text-white border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Section Header: Headline max 8 words, body max 2 short sentences */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
            <div className="space-y-3 max-w-xl">
              <span className="font-mono text-xs text-[#3ddc84] uppercase tracking-wider block font-semibold">
                {"// FEATURED SHOWCASE"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Selected Concept Projects.
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                In-depth case studies demonstrating our engineering standards and design craft. Each project is an honest, interactive concept build.
              </p>
            </div>

            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#111115] px-5 py-2.5 text-xs font-mono text-zinc-300 hover:text-white hover:border-white/20 transition-all self-start sm:self-auto"
            >
              <span>All case studies</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#3ddc84]" />
            </Link>
          </div>
        </Reveal>

        {/* 3D Curved Gallery Showcase with Real Concept Demo Previews */}
        <CurvedProjectGallery />
      </div>
    </section>
  );
}
