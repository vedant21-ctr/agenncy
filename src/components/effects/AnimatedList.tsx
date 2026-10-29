"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/components/animation/useReducedMotion";

interface AnimatedListProps {
  items: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  delay?: number;
}

export default function AnimatedList({
  items,
  className = "space-y-2.5",
  itemClassName = "",
  delay = 0.08,
}: AnimatedListProps) {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reducedMotion = useReducedMotion();

  return (
    <ul ref={ref} className={className}>
      {items.map((item, idx) => (
        <motion.li
          key={idx}
          initial={reducedMotion ? {} : { opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{
            duration: 0.4,
            delay: idx * delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={itemClassName}
        >
          {item}
        </motion.li>
      ))}
    </ul>
  );
}

