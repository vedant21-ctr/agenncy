"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_CONFIG } from "@/config/site";
import ProjectCard from "./ProjectCard";
import Reveal from "@/components/animation/Reveal";
import { useReducedMotion } from "@/components/animation/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HorizontalWorkShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Check if desktop screen and not reduced motion
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop || reducedMotion || !sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const totalScroll = track.scrollWidth - window.innerWidth + 120;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 0.8,
          start: "top top",
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="selected-work"
      ref={sectionRef}
      className="relative bg-[#09090b] text-white border-t border-white/[0.08] overflow-hidden"
    >
      {/* Top Section Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-24 pb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <Reveal>
          <div className="space-y-3 max-w-xl">
            <span className="font-mono text-xs text-[#ff5500] uppercase tracking-wider block">
              // PROVEN OUTCOMES
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Selected Work.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
              Featured product architecture and web applications. Pin and scroll horizontally on desktop.
            </p>
          </div>
        </Reveal>

        <Link
          href="/work"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#121216] px-5 py-2.5 text-xs font-mono text-zinc-300 hover:text-white hover:border-white/30 transition-all self-start"
        >
          <span>View all {SITE_CONFIG.projects.length} projects</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#ff5500]" />
        </Link>
      </div>

      {/* Desktop Horizontal Scroll Track (pinned by GSAP) */}
      <div className="hidden lg:block pb-24">
        <div
          ref={trackRef}
          className="flex gap-8 pl-8 sm:pl-16 pr-24 w-max will-change-transform items-stretch"
        >
          {SITE_CONFIG.projects.map((project) => (
            <div key={project.id} className="w-[520px] shrink-0">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet Fallback: Clean Vertical Grid */}
      <div className="lg:hidden max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-2 gap-8">
        {SITE_CONFIG.projects.slice(0, 4).map((project, idx) => (
          <Reveal key={project.id} delay={idx * 0.1}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
