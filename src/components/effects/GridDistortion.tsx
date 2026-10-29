"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/components/animation/useReducedMotion";

interface GridDistortionProps {
  imageSrc: string;
  alt: string;
  className?: string;
}

export default function GridDistortion({
  imageSrc,
  alt,
  className = "",
}: GridDistortionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden group select-none ${className}`}
    >
      {/* Featured image with subtle grid clip-reveal and scale ripple */}
      <div
        className="w-full h-full transition-transform duration-700 ease-out"
        style={{
          transform: isHovered && !reducedMotion ? "scale(1.04)" : "scale(1)",
        }}
      >
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-filter duration-500 grayscale contrast-105 group-hover:grayscale-0"
        />
      </div>

      {/* Subtle Grid Distortion Mesh Overlay */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] ${
          isHovered ? "opacity-100" : "opacity-40"
        }`}
      />

      {/* Growth green corner accent */}
      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono text-black bg-[#3ddc84] font-bold uppercase tracking-wider opacity-90">
        Interactive Preview
      </div>
    </div>
  );
}

