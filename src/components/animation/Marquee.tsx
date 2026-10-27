"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "./useReducedMotion";

interface MarqueeProps {
  items: string[];
  speed?: number; // duration in seconds
  reverse?: boolean;
  className?: string;
}

export default function Marquee({
  items,
  speed = 30,
  reverse = false,
  className = "",
}: MarqueeProps) {
  const reducedMotion = useReducedMotion();
  const repeated = [...items, ...items, ...items, ...items];

  if (reducedMotion) {
    return (
      <div className={`overflow-x-auto whitespace-nowrap py-4 ${className}`}>
        <div className="flex gap-6 items-center">
          {items.map((item, i) => (
            <span key={i} className="font-mono text-xs text-zinc-400 uppercase">
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden whitespace-nowrap py-3 group ${className}`}>
      {/* Edge gradient masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#09090b] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#09090b] to-transparent z-10" />

      <motion.div
        className="flex gap-8 items-center group-hover:[animation-play-state:paused]"
        animate={{
          x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {repeated.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-6 font-mono text-xs uppercase tracking-wider text-zinc-500 hover:text-white transition-colors cursor-default select-none"
          >
            <span>{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
