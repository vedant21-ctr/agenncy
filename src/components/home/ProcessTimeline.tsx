"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Clock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_CONFIG } from "@/config/site";
import { useReducedMotion } from "@/components/animation/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop || reducedMotion || !containerRef.current || !pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          end: "bottom 70%",
          scrub: 0.5,
          onUpdate: (self) => {
            const stepsCount = SITE_CONFIG.howWeWork.length;
            const idx = Math.min(
              Math.floor(self.progress * stepsCount),
              stepsCount - 1
            );
            setActiveStep(idx);
          },
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className="space-y-12">
      {/* Step Buttons Row */}
      <div className="relative">
        {/* SVG Drawing Line Across Desktop Steps */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 h-2 pointer-events-none -z-0">
          <svg className="w-full h-2 overflow-visible" preserveAspectRatio="none">
            {/* Background line */}
            <line
              x1="0"
              y1="4"
              x2="100%"
              y2="4"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2"
            />
            {/* Animated drawing line */}
            <path
              ref={pathRef}
              d="M 0 4 L 1200 4"
              fill="none"
              stroke="#ff5500"
              strokeWidth="2.5"
            />
          </svg>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 relative z-10">
          {SITE_CONFIG.howWeWork.map((item, idx) => {
            const isPassedOrActive = activeStep >= idx;
            const isCurrent = activeStep === idx;

            return (
              <button
                key={item.step}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-xl text-left border transition-all duration-300 ${
                  isCurrent
                    ? "bg-[#ff5500] text-white border-[#ff5500] font-bold shadow-lg shadow-[#ff5500]/20"
                    : isPassedOrActive
                    ? "bg-[#18181f] border-white/20 text-white"
                    : "bg-[#121216] border-white/[0.06] text-zinc-400 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono opacity-80 mb-1">
                  <span>{item.step} // PHASE</span>
                  <span className={`w-2 h-2 rounded-full ${isPassedOrActive ? "bg-white" : "bg-white/20"}`} />
                </div>
                <div className="text-sm font-bold tracking-tight truncate">{item.phase}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Step Detailed Card */}
      {(() => {
        const step = SITE_CONFIG.howWeWork[activeStep];
        return (
          <div className="rounded-2xl bg-[#121216] border border-white/10 p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-300">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#ff5500] bg-[#ff5500]/10 border border-[#ff5500]/30 px-3 py-1 rounded-full">
                  PHASE {step.step}
                </span>
                <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-400">
                  <Clock className="w-3.5 h-3.5 text-[#ff5500]" />
                  <span>Cadence: {step.timing}</span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {step.phase}: {step.title}
              </h3>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                {step.desc}
              </p>
            </div>

            <div className="lg:col-span-4 rounded-xl bg-black/40 border border-white/10 p-6 space-y-3">
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block">
                WHAT YOU RECEIVE:
              </span>
              <div className="flex items-start gap-2.5 text-white font-medium text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#ff5500] shrink-0 mt-0.5" />
                <span>{step.deliverable}</span>
              </div>
              <div className="text-[11px] font-mono text-zinc-500 pt-2 border-t border-white/5">
                Weekly staging review via Loom & private staging deployment
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
