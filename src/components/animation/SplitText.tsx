"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
  lines: string[];
  className?: string;
  delay?: number;
}

export default function SplitText({
  lines,
  className = "",
  delay = 0.1,
}: SplitTextProps) {
  return (
    <h1 className={className}>
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden pb-1">
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: delay + index * 0.14,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="block"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
