"use client";

import { useReducedMotion } from "@/components/animation/useReducedMotion";

export default function ScrollVelocityMarquee() {
  const reducedMotion = useReducedMotion();

  const keywords = [
    "NEXT.JS 16",
    "REACT THREE FIBER",
    "TYPESCRIPT",
    "TAILWIND CSS",
    "GSAP ANIMATION",
    "BUSINESS AUTOMATION",
    "AI WORKFLOWS",
    "UI/UX DESIGN",
    "SUB-SECOND SPEED",
    "100% CODE OWNERSHIP",
  ];

  return (
    <div
      className="relative w-full overflow-hidden py-3 bg-[#0d0f12] border-y border-white/[0.06] select-none z-10"
      aria-hidden="true"
    >
      <div className={`flex w-max gap-8 items-center ${!reducedMotion ? "animate-[marquee_25s_linear_infinite]" : ""}`}>
        {[...keywords, ...keywords].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-zinc-400">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3ddc84]" />
          </div>
        ))}
      </div>
    </div>
  );
}

