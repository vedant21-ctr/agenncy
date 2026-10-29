"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { useReducedMotion } from "@/components/animation/useReducedMotion";

export default function CurvedProjectGallery() {
  const projects = SITE_CONFIG.projects;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const reducedMotion = useReducedMotion();

  // Temporary pause on interaction, resumes after 3 seconds
  const pauseTemporarily = useCallback(() => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  }, []);

  // Continuous auto-rotation every 3.8s when not paused
  useEffect(() => {
    if (isPaused || reducedMotion) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isPaused, reducedMotion, projects.length]);

  const handleNext = () => {
    pauseTemporarily();
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    pauseTemporarily();
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  // Touch swipe support
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    pauseTemporarily();
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden py-12 focus:outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="3D Curved Concept Projects Showcase"
    >
      {/* 3D Curved Perspective Stage */}
      <div className="relative mx-auto max-w-6xl h-[520px] sm:h-[580px] flex items-center justify-center [perspective:1400px]">
        {projects.map((project, idx) => {
          // Relative position relative to active index (-2, -1, 0, 1, 2)
          let offset = idx - activeIndex;
          if (offset < -2) offset += projects.length;
          if (offset > 2) offset -= projects.length;

          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 2;

          // 3D positioning along curved cylinder
          const rotateY = offset * 24;
          const translateX = offset * 260;
          const translateZ = -Math.abs(offset) * 160;
          const scale = isActive ? 1.0 : Math.max(0.75, 1 - Math.abs(offset) * 0.15);
          const opacity = isVisible ? (isActive ? 1 : Math.max(0.35, 1 - Math.abs(offset) * 0.35)) : 0;
          const zIndex = 20 - Math.abs(offset) * 5;

          const accentColors = [
            "#3ddc84", // Pulse: Growth Green
            "#f59e0b", // Aura: Warm Amber
            "#a855f7", // Synapse: Violet
            "#3b82f6", // Vault: Cobalt Blue
            "#06b6d4", // Apex: Cyan
          ];
          const accent = accentColors[idx % accentColors.length];

          return (
            <div
              key={project.id}
              onClick={() => {
                if (!isActive) {
                  pauseTemporarily();
                  setActiveIndex(idx);
                }
              }}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex,
                transition: "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease",
              }}
              className={`absolute w-[320px] sm:w-[460px] h-[400px] sm:h-[460px] cursor-pointer rounded-2xl overflow-hidden group select-none shadow-2xl transition-all duration-300 ${
                isActive ? "ring-2 ring-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]" : "hover:opacity-75"
              }`}
            >
              {/* Asymmetric Notched Top-Right Corner Treatment */}
              <div
                className="relative w-full h-full bg-[#111115] overflow-hidden"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%)",
                }}
              >
                {/* Full-Bleed Real Concept Screenshot */}
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 320px, 460px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority={idx === 0}
                />

                {/* Ambient Color Edge Radiance */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300 group-hover:opacity-80"
                  style={{
                    boxShadow: `inset 0 0 40px ${accent}22, inset 0 -4px 20px ${accent}44`,
                  }}
                />

                {/* Dark Gradient Scrim for readable title overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />

                {/* Top Corner Details: Asymmetric Tag & Oversized Number */}
                <div className="absolute top-4 left-5 right-5 flex items-center justify-between">
                  <span className="font-mono text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-white">
                    {project.type}
                  </span>
                  <span
                    className="text-4xl sm:text-5xl font-black tracking-tighter opacity-70 select-none"
                    style={{ color: accent }}
                  >
                    0{idx + 1}
                  </span>
                </div>

                {/* Bottom Overlaid Information */}
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                    <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                      {project.industry}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#3ddc84] transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 leading-relaxed">
                    {project.outcome}
                  </p>

                  {/* Slide-Up "View Case Study" Bar */}
                  <div className="pt-2">
                    <Link
                      href={`/work/${project.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-black px-4 py-2 rounded-lg font-mono transition-transform duration-300 group-hover:translate-x-1"
                      style={{ backgroundColor: accent }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Explore Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Gallery Controls & Progress Bar */}
      <div className="max-w-xl mx-auto px-6 mt-4 flex items-center justify-between gap-6">
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous Project"
          className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-[#3ddc84] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3ddc84]"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Dynamic Progress Bar & Counter */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#3ddc84] transition-all duration-500 rounded-full"
              style={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }}
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-zinc-400">
              0{activeIndex + 1} <span className="text-zinc-600">/</span> 0{projects.length}
            </span>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="font-mono text-[10px] text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
              title={isPaused ? "Resume rotation" : "Pause rotation"}
            >
              {isPaused ? <Play className="w-2.5 h-2.5" /> : <Pause className="w-2.5 h-2.5" />}
              <span>{isPaused ? "Paused" : "Auto"}</span>
            </button>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          aria-label="Next Project"
          className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-[#3ddc84] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3ddc84]"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

