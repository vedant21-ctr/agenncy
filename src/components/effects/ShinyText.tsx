"use client";

import React from "react";
import { useReducedMotion } from "@/components/animation/useReducedMotion";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number; // duration in seconds
  className?: string;
  highlightColor?: string;
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 3.5,
  className = "",
  highlightColor = "#3DDC84",
}: ShinyTextProps) {
  const reducedMotion = useReducedMotion();

  if (disabled || reducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      className={`inline-block relative bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(120deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.95) 35%, ${highlightColor} 50%, rgba(255, 255, 255, 0.95) 65%, rgba(255, 255, 255, 0.4) 100%)`,
        backgroundSize: "200% 100%",
        animation: `shine ${speed}s linear infinite`,
      }}
    >
      {text}
    </span>
  );
}

