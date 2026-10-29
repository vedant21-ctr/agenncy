"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "./useReducedMotion";

interface CounterProps {
  to: number;
  from?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function Counter({
  to,
  from = 0,
  duration = 1.4,
  suffix = "",
  prefix = "",
  className = "",
}: CounterProps) {
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(() => (reducedMotion ? to : from));
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (!isInView || reducedMotion) return;

    let startTime: number | null = null;
    let animId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(from + (to - from) * easeProgress);

      setValue(current);

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        setValue(to);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isInView, to, from, duration, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
