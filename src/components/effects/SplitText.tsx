"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/components/animation/useReducedMotion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  wordSpacing?: string;
}

export default function SplitText({
  text,
  className = "",
  delay = 0.04,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reducedMotion = useReducedMotion();

  const words = text.split(" ");

  if (reducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: i * delay,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

