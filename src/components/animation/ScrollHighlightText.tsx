"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useReducedMotion } from "./useReducedMotion";

interface ScrollHighlightTextProps {
  text: string;
  className?: string;
}

export default function ScrollHighlightText({
  text,
  className = "",
}: ScrollHighlightTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.25"],
  });

  const words = text.split(" ");

  if (reducedMotion) {
    return (
      <p ref={containerRef} className={`text-white leading-relaxed ${className}`}>
        {text}
      </p>
    );
  }

  return (
    <p ref={containerRef} className={`flex flex-wrap leading-relaxed ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <HighlightWord key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </HighlightWord>
        );
      })}
    </p>
  );
}

function HighlightWord({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  const color = useTransform(progress, range, ["#52525b", "#fafafa"]);

  return (
    <span className="relative mr-2 md:mr-3 inline-block">
      <motion.span style={{ opacity, color }}>
        {children}
      </motion.span>
    </span>
  );
}
