"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "./useReducedMotion";

interface WordCycleProps {
  words: string[];
  interval?: number;
  className?: string;
}

export default function WordCycle({
  words,
  interval = 2800,
  className = "text-[#ff5500]",
}: WordCycleProps) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || words.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval, reducedMotion]);

  if (reducedMotion) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <span className="inline-block relative overflow-hidden align-top text-left h-[1.18em]">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: "105%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-105%", opacity: 0 }}
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`block ${className}`}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
