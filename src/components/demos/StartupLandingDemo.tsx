"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Sparkles, ArrowRight, Check, Copy, Play } from "lucide-react";

export default function StartupLandingDemo() {
  const [copied, setCopied] = useState(false);
  const [activeCLI, setActiveCLI] = useState<"deploy" | "scale" | "benchmark">("deploy");
  const [displayedCommand, setDisplayedCommand] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showOutput, setShowOutput] = useState(false);

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

  useEffect(() => {
    const fullCmd = commands[activeCLI];
    setDisplayedCommand("");
    setIsTyping(true);
    setShowOutput(false);

    let charIndex = 0;
    const interval = setInterval(() => {
      charIndex++;
      setDisplayedCommand(fullCmd.slice(0, charIndex));
      if (charIndex >= fullCmd.length) {
        clearInterval(interval);
        setIsTyping(false);
        setTimeout(() => setShowOutput(true), 150);
      }
    }, 22);

    return () => clearInterval(interval);
  }, [activeCLI]);

  const handleCopy = () => {
    navigator.clipboard.writeText(commands[activeCLI]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-[#09090D] shadow-2xl font-sans text-xs">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/5 bg-[#121217] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-white tracking-widest">
            APEX // CLOUD EDGE
          </span>
          <span className="rounded bg-[#38BDF8]/15 text-[#38BDF8] px-2 py-0.5 text-[10px] font-mono">
            NEXT-GEN RUNTIME
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-white/50">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
          <span>EDGE NODES SYNCHRONIZED</span>
        </div>
      </div>

      {/* Hero Showcase inside Demo */}
      <div className="p-5 sm:p-8 space-y-6">
        <div className="max-w-xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10 px-3 py-1 text-[11px] font-mono text-[#38BDF8]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Apex Engine 3.0 Released</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Deploy compute to the edge with zero cold starts.
          </h3>

          <p className="text-white/50 text-[11px] sm:text-xs leading-relaxed">
            Distribute TypeScript workers worldwide in 400 milliseconds. Built for teams who refuse to let network latency slow their users down.
          </p>
        </div>

        {/* Interactive CLI Console */}
        <div className="rounded-xl bg-[#050507] border border-white/10 overflow-hidden shadow-inner">
          {/* CLI Tab switcher */}
          <div className="flex items-center justify-between border-b border-white/5 bg-[#0F0F14] px-3 py-2">
            <div className="flex gap-1.5">
              {(["deploy", "scale", "benchmark"] as const).map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => setActiveCLI(cmd)}
                  className={`px-2.5 py-1 rounded font-mono text-[10px] uppercase transition-colors ${
                    activeCLI === cmd
                      ? "bg-[#38BDF8] text-black font-bold"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {cmd}
                </button>
              ))}
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[10px] font-mono text-white/50 hover:text-white transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-[#38BDF8]" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          {/* Terminal Body */}
          <div className="p-4 font-mono text-[11px] space-y-3 min-h-[140px]">
            <div className="flex items-center gap-2 text-[#38BDF8]">
              <Terminal className="w-3.5 h-3.5 flex-shrink-0" />
              <span>
                {displayedCommand}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  className="inline-block w-1.5 h-3.5 bg-[#38BDF8] ml-1 translate-y-[2px]"
                />
              </span>
            </div>

            <AnimatePresence mode="wait">
              {showOutput && (
                <motion.div
                  key={activeCLI}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-white/70 whitespace-pre-line leading-relaxed pl-5 border-l border-[#38BDF8]/30 font-mono"
                >
                  {outputs[activeCLI]}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button className="flex items-center gap-2 rounded-lg bg-[#38BDF8] px-4 py-2.5 font-bold text-black text-[11px] uppercase tracking-wider hover:bg-[#0284c7] transition-all">
            <span>Deploy First Worker</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-mono text-white/40">Free tier: 1M edge invocations/month</span>
        </div>
      </div>
    </div>
  );
}
