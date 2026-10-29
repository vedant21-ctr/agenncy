"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy } from "lucide-react";

const commands = {
  deploy: "$ apex deploy --env=production --region=global",
  scale: "$ apex cluster scale --nodes=64 --autoscale=true",
  benchmark: "$ apex benchmark run --concurrency=10000",
};

const outputs = {
  deploy: "✓ Built edge bundle in 420ms\n✓ Deployed to 38 edge locations\n✓ TLS certificate auto-provisioned\n🚀 Live at https://apex-cluster.edge.live",
  scale: "✓ Cluster scaled: 64 distributed nodes\n✓ CPU utilization rebalanced to 24%\n✓ Zero dropped connections during migration",
  benchmark: "✓ 10,000 concurrent requests simulated\n✓ P99 latency: 12.4ms | P95 latency: 8.1ms\n✓ 0% error rate under load",
};

export default function StartupLandingDemo() {
  const [copied, setCopied] = useState(false);
  const [activeCLI, setActiveCLI] = useState<"deploy" | "scale" | "benchmark">("deploy");
  const [displayedCommand, setDisplayedCommand] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    const fullCmd = commands[activeCLI];
    let interval: NodeJS.Timeout;

    const timer = setTimeout(() => {
      setDisplayedCommand("");
      setShowOutput(false);

      let charIndex = 0;
      interval = setInterval(() => {
        charIndex++;
        setDisplayedCommand(fullCmd.slice(0, charIndex));
        if (charIndex >= fullCmd.length) {
          clearInterval(interval);
          setTimeout(() => setShowOutput(true), 150);
        }
      }, 22);
    }, 0);

    return () => {
      clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, [activeCLI]);

  const handleCopy = () => {
    navigator.clipboard.writeText(commands[activeCLI]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-[#0E0E12] shadow-2xl font-mono text-xs">
      {/* Terminal Bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#16161C] px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[11px] text-white/50 pl-2">apex-cli v2.4.1 (x86_64-apple-darwin)</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded bg-white/5 hover:bg-white/10 px-2 py-1 text-[11px] text-white/70 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-3 h-3 text-[#3ddc84]" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* Terminal View */}
      <div className="p-5 sm:p-7 space-y-6">
        {/* Command Runner Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {(["deploy", "scale", "benchmark"] as const).map((key) => (
            <button
              key={key}
              onClick={() => setActiveCLI(key)}
              className={`rounded-lg px-3 py-1.5 text-xs transition-all uppercase font-mono ${
                activeCLI === key
                  ? "bg-[#3ddc84] text-black font-bold shadow-md"
                  : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
            >
              run {key}
            </button>
          ))}
        </div>

        {/* Console Box */}
        <div className="rounded-lg bg-black/60 border border-white/5 p-4 sm:p-5 min-h-[140px] space-y-3 font-mono">
          <div className="text-white flex items-center gap-2">
            <span className="text-[#3ddc84]">&gt;</span>
            <span>{displayedCommand}</span>
            <span className="inline-block w-2 h-4 bg-[#3ddc84] animate-pulse" />
          </div>

          <AnimatePresence>
            {showOutput && (
              <motion.pre
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-zinc-400 whitespace-pre-wrap leading-relaxed text-[11px] border-t border-white/5 pt-3"
              >
                {outputs[activeCLI]}
              </motion.pre>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
