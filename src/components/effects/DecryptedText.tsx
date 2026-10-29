"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "@/components/animation/useReducedMotion";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  parentClassName?: string;
}

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 10,
  characters = DEFAULT_CHARS,
  className = "",
  parentClassName = "",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.5 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || isDone || reducedMotion) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "/" || char === "•" || char === "—") return char;
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
        setIsDone(true);
      }

      iteration += 1 / (maxIterations / text.length || 1);
    }, speed);

    return () => clearInterval(interval);
  }, [inView, isDone, text, speed, maxIterations, characters, reducedMotion]);

  return (
    <span ref={containerRef} className={`inline-block font-mono ${parentClassName}`}>
      <span className={className}>{displayText}</span>
    </span>
  );
}
