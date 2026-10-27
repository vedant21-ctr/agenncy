"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "./useReducedMotion";

interface DraggableStickerProps {
  children: React.ReactNode;
  className?: string;
  initialRotate?: number;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  color?: "lime" | "orange" | "white" | "black";
}

export default function DraggableSticker({
  children,
  className = "",
  initialRotate = 0,
  containerRef,
  color = "lime",
}: DraggableStickerProps) {
  const reducedMotion = useReducedMotion();
  const stickerRef = useRef<HTMLDivElement>(null);

  const colorStyles = {
    lime: "bg-[#CCFF00] text-black border-2 border-black shadow-[4px_4px_0px_#000]",
    orange: "bg-[#FF5500] text-white border-2 border-black shadow-[4px_4px_0px_#000]",
    white: "bg-white text-black border-2 border-black shadow-[4px_4px_0px_#000]",
    black: "bg-[#121216] text-white border-2 border-white/30 shadow-[4px_4px_0px_#FF5500]",
  };

  if (reducedMotion) {
    return (
      <div
        className={`inline-block select-none rounded-xl px-3.5 py-1.5 font-mono text-xs font-black uppercase tracking-wider ${colorStyles[color]} ${className}`}
        style={{ transform: `rotate(${initialRotate}deg)` }}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={stickerRef}
      drag
      dragConstraints={containerRef || undefined}
      dragElastic={0.15}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      whileHover={{ scale: 1.06, rotate: initialRotate + (initialRotate > 0 ? 3 : -3) }}
      whileTap={{ scale: 0.96 }}
      data-cursor="Drag"
      data-cursor-variant="drag"
      initial={{ rotate: initialRotate, scale: 0.9, opacity: 0 }}
      animate={{ rotate: initialRotate, scale: 1, opacity: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 260 }}
      tabIndex={0}
      role="button"
      aria-label="Interactive draggable badge"
      className={`inline-flex items-center gap-1.5 cursor-grab active:cursor-grabbing select-none rounded-xl px-3.5 py-1.5 font-mono text-xs font-black uppercase tracking-wider ${colorStyles[color]} ${className}`}
    >
      {children}
    </motion.div>
  );
}
