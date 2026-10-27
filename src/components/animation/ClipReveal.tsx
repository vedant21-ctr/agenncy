"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "./useReducedMotion";

interface ClipRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function ClipReveal({
  children,
  className = "",
  delay = 0,
}: ClipRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Subtle max 8% inner image parallax
  const innerY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  if (reducedMotion) {
    return <div className={`overflow-hidden ${className}`}>{children}</div>;
  }

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: "inset(12% 0% 12% 0%)", opacity: 0.8 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full relative"
      >
        <motion.div style={{ y: innerY }} className="w-full h-full">
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
