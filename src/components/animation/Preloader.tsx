"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/config/site";
import { useReducedMotion } from "./useReducedMotion";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // If reduced motion or already seen in this tab session, do not show
    const seen = sessionStorage.getItem("kinetic_preloader_seen_v2");
    if (seen || reducedMotion) {
      setVisible(false);
      return;
    }

    // Fast, crisp counter to 100 in ~1 second
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 14) + 8;
      if (current >= 100) {
        current = 100;
        setCount(100);
        clearInterval(interval);
        setTimeout(() => {
          dismissPreloader();
        }, 220);
      } else {
        setCount(current);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  const dismissPreloader = () => {
    sessionStorage.setItem("kinetic_preloader_seen_v2", "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#09090b] text-white p-8 sm:p-12 select-none"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff5500]" />
              <span>{SITE_CONFIG.legalName}</span>
            </div>

            <button
              onClick={dismissPreloader}
              className="text-zinc-400 hover:text-white underline cursor-pointer"
            >
              Skip
            </button>
          </div>

          {/* Center Wordmark Reveal */}
          <div className="text-center space-y-3 my-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-extrabold text-3xl sm:text-5xl tracking-tight text-white"
            >
              {SITE_CONFIG.name}
            </motion.div>
            <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
              WEB • PRODUCTS • AUTOMATION
            </p>
          </div>

          {/* Bottom Counter Bar */}
          <div className="space-y-3 font-mono">
            <div className="flex items-baseline justify-between text-xs text-zinc-500">
              <span>INITIALIZING</span>
              <span className="text-2xl font-bold text-[#ff5500] font-mono">
                {String(count).padStart(2, "0")}%
              </span>
            </div>
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#ff5500] transition-all duration-75 ease-out"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
