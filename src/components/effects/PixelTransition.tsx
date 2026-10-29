"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/SocialIcons";
import { useReducedMotion } from "@/components/animation/useReducedMotion";

interface PixelTransitionProps {
  imageSrc: string;
  name: string;
  role: string;
  funFact: string;
  linkedin: string;
  email: string;
  partnerNum: string;
}

export default function PixelTransition({
  imageSrc,
  name,
  role,
  funFact,
  linkedin,
  email,
  partnerNum,
}: PixelTransitionProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <div
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped((prev) => !prev)}
      className="group relative rounded-2xl bg-[#111115] border border-white/10 p-6 flex flex-col justify-between h-full transition-all duration-300 hover:border-[#3ddc84]/40 select-none cursor-pointer"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsFlipped((prev) => !prev);
        }
      }}
      aria-label={`${name}, ${role}. Click or hover to reveal fun fact.`}
    >
      <div className="space-y-5">
        {/* Photo Container with Flip / Reveal Transition */}
        <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-[#16161c] border border-white/10">
          {/* Base Photo */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              isFlipped && !reducedMotion ? "opacity-15" : "opacity-100"
            }`}
          >
            <Image
              src={imageSrc}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover grayscale contrast-105 group-hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Partner Number Badge */}
          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-zinc-300 border border-white/10">
            {partnerNum}
          </div>

          {/* Fun Fact Reveal Card */}
          <div
            className={`absolute inset-0 p-5 flex flex-col justify-center transition-all duration-300 ${
              isFlipped || reducedMotion
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#3ddc84] mb-2 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Behind the screen</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal">
              &ldquo;{funFact}&rdquo;
            </p>
          </div>
        </div>

        {/* Member Details */}
        <div className="space-y-1">
          <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-[#3ddc84] transition-colors">
            {name}
          </h3>
          <div className="text-xs font-mono text-[#3ddc84]">{role}</div>
        </div>
      </div>

      {/* Direct Links */}
      <div className="pt-4 mt-5 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
        >
          <LinkedinIcon className="w-3.5 h-3.5 text-[#3ddc84]" />
          <span>LinkedIn</span>
        </a>
        <a
          href={`mailto:${email}`}
          onClick={(e) => e.stopPropagation()}
          className="text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          {email}
        </a>
      </div>
    </div>
  );
}
