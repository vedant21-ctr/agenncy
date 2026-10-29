"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/config/site";
import { useReducedMotion } from "./useReducedMotion";

export default function Preloader() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

  const dismissPreloader = useCallback(() => {
    try {
      sessionStorage.setItem("growhaus_preloader_seen", "true");
    } catch {
      // ignore
    }
    setVisible(false);
  }, []);

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem("growhaus_preloader_seen");
      if (seen || reducedMotion) {
        return;
      }
    } catch {
      return;
    }

    const timer = setTimeout(() => {
      setVisible(true);

      let current = 0;
      const interval = setInterval(() => {
        current += Math.floor(Math.random() * 15) + 10;
        if (current >= 100) {
          current = 100;
          setCount(100);
          clearInterval(interval);
          setTimeout(() => {
            dismissPreloader();
          }, 150);
        } else {
          setCount(current);
        }
      }, 40);
    }, 0);

    return () => clearTimeout(timer);
  }, [reducedMotion, dismissPreloader]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#09090b] text-white p-8 sm:p-12 select-none"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3ddc84]" />
              <span>{SITE_CONFIG.name}</span>
            </div>

            <button
              onClick={dismissPreloader}
              className="text-zinc-400 hover:text-white underline cursor-pointer"
            >
              Skip
            </button>
          </div>

          {/* Center Wordmark & Block-by-block House Assembly */}
          <div className="text-center space-y-4 my-auto flex flex-col items-center">
            {/* SVG House building block by block */}
            <div className="w-16 h-16 relative">
              <svg viewBox="0 0 64 64" className="w-full h-full">
                {/* Foundation Block */}
                <rect
                  x="12"
                  y="48"
                  width="40"
                  height="8"
                  rx="1"
                  fill="#1a1e24"
                  stroke="#3ddc84"
                  strokeWidth="1.5"
                  className={count > 15 ? "opacity-100 transition-opacity duration-300" : "opacity-0"}
                />
                {/* Ground Walls Block */}
                <rect
                  x="16"
                  y="28"
                  width="32"
                  height="20"
                  rx="1"
                  fill="#14181e"
                  stroke="#3ddc84"
                  strokeWidth="1.5"
                  className={count > 35 ? "opacity-100 transition-opacity duration-300" : "opacity-0"}
                />
                {/* Glowing Window */}
                <rect
                  x="26"
                  y="34"
                  width="12"
                  height="8"
                  rx="1"
                  fill="#3ddc84"
                  className={count > 55 ? "opacity-90 transition-opacity duration-300" : "opacity-0"}
                />
                {/* Gabled Roof */}
                <polygon
                  points="32,10 12,28 52,28"
                  fill="#181d24"
                  stroke="#3ddc84"
                  strokeWidth="1.5"
                  className={count > 70 ? "opacity-100 transition-opacity duration-300" : "opacity-0"}
                />
                {/* Growing Sprout on Roof */}
                <circle
                  cx="32"
                  cy="7"
                  r="3"
                  fill="#3ddc84"
                  className={count > 85 ? "opacity-100 transition-opacity duration-300" : "opacity-0"}
                />
              </svg>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="font-bold text-3xl sm:text-4xl tracking-tight text-white"
            >
              Grow<span className="text-[#3ddc84]">Haus</span>
            </motion.div>
            <p className="text-xs font-mono text-zinc-400">
              Websites & products built for business growth.
            </p>
          </div>

          {/* Bottom Row with Counter & Progress Line */}
          <div className="space-y-4">
            <div className="w-full bg-white/[0.08] h-[2px] rounded-full overflow-hidden">
              <motion.div
                className="bg-[#3ddc84] h-full"
                style={{ width: `${count}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>INITIALIZING STUDIO</span>
              <span className="text-white font-bold">{count}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
