"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "./useReducedMotion";

interface DrawLineProps {
  className?: string;
  color?: string;
  strokeWidth?: number;
  orientation?: "horizontal" | "vertical";
  dashed?: boolean;
}

export default function DrawLine({
  className = "",
  color = "rgba(255, 255, 255, 0.15)",
  strokeWidth = 2,
  orientation = "horizontal",
  dashed = false,
}: DrawLineProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const reducedMotion = useReducedMotion();

  if (orientation === "vertical") {
    return (
      <svg
        ref={ref}
        className={`w-[2px] h-full overflow-visible ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.line
          x1="1"
          y1="0"
          x2="1"
          y2="100%"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={dashed ? "6 6" : undefined}
          initial={{ pathLength: reducedMotion ? 1 : 0 }}
          animate={{ pathLength: inView || reducedMotion ? 1 : 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    );
  }

  return (
    <svg
      ref={ref}
      className={`w-full h-[2px] overflow-visible ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.line
        x1="0"
        y1="1"
        x2="100%"
        y2="1"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={dashed ? "6 6" : undefined}
        initial={{ pathLength: reducedMotion ? 1 : 0 }}
        animate={{ pathLength: inView || reducedMotion ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}
