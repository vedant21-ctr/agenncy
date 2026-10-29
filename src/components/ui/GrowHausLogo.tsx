"use client";

import React from "react";

interface GrowHausLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function GrowHausLogo({
  className = "",
  iconOnly = false,
  size = "md",
}: GrowHausLogoProps) {
  const sizeMap = {
    sm: { icon: 22, text: "text-sm", sub: "text-[10px]" },
    md: { icon: 28, text: "text-base", sub: "text-xs" },
    lg: { icon: 36, text: "text-xl", sub: "text-sm" },
  };

  const { icon: iconSize, text: textSize } = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Icon: House + Sprout/Upward Growth Arrow */}
      <div
        className="relative flex items-center justify-center rounded-lg bg-[#111115] border border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.5)] transition-transform duration-200 group-hover:scale-105"
        style={{ width: iconSize + 8, height: iconSize + 8 }}
      >
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          {/* House Outline (Haus) */}
          <path
            d="M5 14L16 5L27 14V26C27 26.5523 26.5523 27 26 27H6C5.44772 27 5 26.5523 5 26V14Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            className="text-zinc-400 group-hover:text-white transition-colors"
          />

          {/* Upward Sprout / Arrow (Grow) */}
          <path
            d="M16 23V12"
            stroke="#3DDC84"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M12.5 15.5L16 11.5L19.5 15.5"
            stroke="#3DDC84"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Left Sprout Leaf */}
          <path
            d="M16 18C13.8 18 12 16.8 12 15C13.8 15 15.2 16.2 16 18Z"
            fill="#3DDC84"
            fillOpacity="0.85"
          />
          {/* Right Sprout Leaf */}
          <path
            d="M16 16C18.2 16 20 14.8 20 13C18.2 13 16.8 14.2 16 16Z"
            fill="#3DDC84"
            fillOpacity="0.85"
          />
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex items-baseline">
          <span className={`font-semibold tracking-tight text-white ${textSize}`}>
            Grow
          </span>
          <span className={`font-bold tracking-tight text-[#3DDC84] ${textSize}`}>
            Haus
          </span>
        </div>
      )}
    </div>
  );
}

