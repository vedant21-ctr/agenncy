"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Terminal, Sparkles, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const REROUTE_RESPONSES = [
  "Bypassing edge cluster... 404 still confirmed.",
  "Querying Prajjwal's automated webhook daemons... negative.",
  "Checking Vedant's distributed cache... key expired.",
  "Inspecting Buzdil's typography grid... 0 pixels found here.",
  "Self-healing protocol initiated... 100% rerouted to /",
];

export default function NotFound() {
  const [logIndex, setLogIndex] = useState(0);
  const [isPinging, setIsPinging] = useState(false);

  const handlePing = () => {
    setIsPinging(true);
    setTimeout(() => {
      setLogIndex((prev) => (prev + 1) % REROUTE_RESPONSES.length);
      setIsPinging(false);
    }, 350);
  };

  return (
    <main className="min-h-screen pt-36 pb-24 bg-[#09090b] text-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-4 py-1.5 font-mono text-xs text-[#ff5500] shadow-[2px_2px_0px_#000]"
        >
          <span>// ERROR 404: ROUTE NOT FOUND</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="text-8xl sm:text-9xl font-black tracking-tighter text-white font-mono select-none">
            4<span className="text-[#ff5500]">0</span>4
          </h1>
          <p className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            This endpoint doesn’t exist.
          </p>
          <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed font-normal">
            The page you are looking for has been moved, refactored, or was never deployed in this production cluster.
          </p>
        </motion.div>

        {/* Playful mini-interaction: CLI Traffic Rerouter */}
        <div className="rounded-2xl bg-[#121216] border-2 border-white/10 p-5 text-left font-mono text-xs space-y-3 shadow-[4px_4px_0px_#000]">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-zinc-400 text-[11px]">
            <div className="flex items-center gap-2 text-[#ccff00]">
              <Terminal className="w-3.5 h-3.5" />
              <span className="font-bold">STUDIO DIAGNOSTIC CONSOLE</span>
            </div>
            <button
              onClick={handlePing}
              disabled={isPinging}
              className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 text-white hover:bg-[#ff5500] hover:text-black transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isPinging ? "animate-spin" : ""}`} />
              <span>Ping Node</span>
            </button>
          </div>

          <div className="min-h-[24px] text-zinc-300">
            <span className="text-[#ff5500] mr-2">›</span>
            <span>{REROUTE_RESPONSES[logIndex]}</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#ff5500] px-7 py-3.5 font-mono text-xs font-black text-black uppercase tracking-wider hover:bg-white transition-all shadow-[4px_4px_0px_#fff] border-2 border-black"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#121216] border-2 border-white/20 px-6 py-3.5 font-mono text-xs font-bold text-white hover:border-white transition-colors shadow-[4px_4px_0px_#000]"
          >
            <span>Explore Concept Work</span>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
