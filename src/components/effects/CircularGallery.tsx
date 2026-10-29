"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Grid, Disc } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { useReducedMotion } from "@/components/animation/useReducedMotion";

export default function CircularGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"circular" | "grid">("circular");
  const reducedMotion = useReducedMotion();

  const projects = SITE_CONFIG.projects;
  const total = projects.length;

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <div className="space-y-8">
      {/* Controls Bar: View Toggle & Carousel Arrows */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
          <span className="text-[#3ddc84] font-bold">0{currentIndex + 1}</span>
          <span>/</span>
          <span>0{total}</span>
          <span className="text-zinc-600 ml-2 hidden sm:inline">•</span>
          <span className="hidden sm:inline text-zinc-500">All Concept Projects</span>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle Button */}
          <button
            onClick={() => setViewMode(viewMode === "circular" ? "grid" : "circular")}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#16161c] px-3.5 py-1.5 text-xs font-mono text-zinc-300 hover:text-white hover:border-white/20 transition-colors"
            aria-label="Toggle gallery view mode"
          >
            {viewMode === "circular" ? (
              <>
                <Grid className="w-3.5 h-3.5 text-[#3ddc84]" />
                <span>Grid View</span>
              </>
            ) : (
              <>
                <Disc className="w-3.5 h-3.5 text-[#3ddc84]" />
                <span>3D Gallery</span>
              </>
            )}
          </button>

          {/* Previous / Next Arrows (Active in Circular View) */}
          {viewMode === "circular" && (
            <div className="flex items-center gap-1">
              <button
                onClick={prevProject}
                className="w-8 h-8 rounded-full border border-white/10 bg-[#16161c] flex items-center justify-center text-zinc-300 hover:text-white hover:border-white/20 transition-colors"
                aria-label="Previous project"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextProject}
                className="w-8 h-8 rounded-full border border-white/10 bg-[#16161c] flex items-center justify-center text-zinc-300 hover:text-white hover:border-white/20 transition-colors"
                aria-label="Next project"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 1. Circular 3D Perspective Mode */}
      {viewMode === "circular" && !reducedMotion ? (
        <div className="relative min-h-[460px] sm:min-h-[520px] flex items-center justify-center overflow-hidden py-6">
          <div className="relative w-full max-w-4xl h-[440px] flex items-center justify-center [perspective:1200px]">
            {projects.map((project, index) => {
              // Calculate offset from active project index
              let offset = index - currentIndex;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              const isActive = offset === 0;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              // 3D positioning
              const translateX = offset * 260; // horizontal spread
              const translateZ = -Math.abs(offset) * 180; // depth receding
              const rotateY = offset * -18; // inward angle
              const scale = 1 - Math.abs(offset) * 0.15;
              const opacity = Math.max(1 - Math.abs(offset) * 0.45, 0.2);
              const zIndex = 10 - Math.abs(offset);

              return (
                <div
                  key={project.id}
                  onClick={() => setCurrentIndex(index)}
                  className="absolute w-[320px] sm:w-[420px] rounded-2xl bg-[#111115] border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 ease-out shadow-2xl"
                  style={{
                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex,
                  }}
                >
                  {/* Project Image */}
                  <div className="relative aspect-[16/10] w-full bg-zinc-950 overflow-hidden">
                    <Image
                      src={project.heroImage}
                      alt={project.title}
                      fill
                      sizes="420px"
                      className={`object-cover transition-filter duration-300 ${
                        isActive ? "grayscale-0" : "grayscale"
                      }`}
                    />
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-white/90 border border-white/10 uppercase">
                      Concept Project
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#3ddc84]">{project.type}</span>
                      <span className="text-zinc-500">{project.industry}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {project.title}
                    </h3>

                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>

                    {isActive && (
                      <div className="pt-2">
                        <Link
                          href={`/work/${project.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-white hover:text-[#3ddc84] transition-colors"
                        >
                          <span>Explore Case Study</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* 2. Grid Fallback Mode (Accessible & Responsive) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="group rounded-2xl bg-[#111115] border border-white/10 overflow-hidden hover:border-[#3ddc84]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full bg-zinc-950 overflow-hidden">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-white/90 border border-white/10 uppercase">
                    Concept Project
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#3ddc84]">{project.type}</span>
                    <span className="text-zinc-500">{project.industry}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#3ddc84] transition-colors tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-white border-t border-white/[0.06] mt-3">
                <span>View Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#3ddc84]" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
