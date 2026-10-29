"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/components/animation/useReducedMotion";

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
}

export default function BlurText({
  text,
  delay = 50,
  className = "",
  animateBy = "words",
  direction = "bottom",
  threshold = 0.1,
}: BlurTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  const reducedMotion = useReducedMotion();

  const elements = animateBy === "words" ? text.split(" ") : text.split("");

  if (reducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {elements.map((segment, index) => (
        <motion.span
          key={index}
          initial={{
            filter: "blur(10px)",
            opacity: 0,
            y: direction === "bottom" ? 14 : -14,
          }}
          animate={
            inView
              ? {
                  filter: "blur(0px)",
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.5,
            delay: (index * delay) / 1000,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block whitespace-pre"
        >
          {segment}
          {animateBy === "words" && index < elements.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}

