"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_CONFIG } from "@/config/site";
import ServiceTabs from "./ServiceTabs";
import Reveal from "@/components/animation/Reveal";
import { useReducedMotion } from "@/components/animation/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PinnedServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop || reducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        pin: true,
        start: "top top",
        end: "+=2200",
        scrub: true,
        onUpdate: (self) => {
          const stepCount = SITE_CONFIG.services.length;
          const index = Math.min(
            Math.floor(self.progress * stepCount),
            stepCount - 1
          );
          setActiveStep(index);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const currentService = SITE_CONFIG.services[activeStep];

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative bg-[#09090b] text-white border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-24 sm:py-32">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <Reveal>
            <div className="space-y-3 max-w-xl">
              <span className="font-mono text-xs text-[#ff5500] uppercase tracking-wider block">
                // WHAT WE DO
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Capabilities & Services.
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
                From high-authority websites to complex SaaS applications and autonomous operational pipelines.
              </p>
            </div>
          </Reveal>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#121216] px-5 py-2.5 text-xs font-mono text-zinc-300 hover:text-white hover:border-white/30 transition-all self-start"
          >
            <span>Full services breakdown</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#ff5500]" />
          </Link>
        </div>

        {/* Desktop Pinned Interactive Display */}
        <div className="hidden lg:grid grid-cols-12 gap-10 items-start">
          {/* Left Progress Indicator & Step List */}
          <div className="col-span-5 space-y-3">
            {SITE_CONFIG.services.map((service, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={service.id}
                  className={`p-5 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? "bg-[#18181f] border-white/20 shadow-md translate-x-1"
                      : "bg-[#121216]/60 border-white/[0.06] opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#ff5500]">
                      {service.number}
                    </span>
                    <h3 className={`text-base font-bold transition-colors ${isActive ? "text-white" : "text-zinc-400"}`}>
                      {service.name}
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-1 pl-7 mt-1 font-normal">
                    {service.shortDesc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Swappable Active Panel */}
          <div className="col-span-7">
            <div className="rounded-2xl bg-[#121216] border border-white/10 p-8 sm:p-10 space-y-6 shadow-sm transition-all duration-300">
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
                <div>
                  <span className="font-mono text-xs text-[#ff5500] uppercase tracking-wider block">
                    SERVICE // {currentService.number} OF 0{SITE_CONFIG.services.length}
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-white mt-1">
                    {currentService.name}
                  </h3>
                </div>
                <span className="font-mono text-xs text-zinc-400 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                  Cadence: {currentService.timeline}
                </span>
              </div>

              <div className="space-y-4">
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                  {currentService.fullDesc}
                </p>

                <div className="rounded-xl bg-black/40 border border-white/[0.06] p-4 text-xs font-mono text-zinc-400">
                  <span className="text-[#ff5500] font-bold block mb-1">WHO THIS IS FOR:</span>
                  {currentService.forWhom}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block">
                  KEY DELIVERABLES:
                </span>
                <ul className="grid grid-cols-2 gap-2 text-xs text-zinc-300">
                  {currentService.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ff5500] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between">
                <div className="flex gap-1.5 flex-wrap">
                  {currentService.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[11px] text-zinc-400 bg-white/[0.04] border border-white/5 rounded px-2 py-0.5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/services#${currentService.id}`}
                  className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#ff5500] hover:underline"
                >
                  <span>Full specifications</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Fallback: Standard Interactive Tabs */}
        <div className="lg:hidden">
          <ServiceTabs />
        </div>
      </div>
    </section>
  );
}
