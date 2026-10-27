"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, ArrowUpRight, CheckCircle2, Cpu, Globe2, ShieldCheck, Zap } from "lucide-react";

export default function SaasDashboardDemo() {
  const [activeTab, setActiveTab] = useState<"24h" | "7d" | "30d">("24h");
  const [selectedNode, setSelectedNode] = useState<string>("us-east");

  const chartPoints = {
    "24h": [28, 42, 35, 65, 52, 78, 62, 85, 74, 92, 88, 96],
    "7d": [45, 52, 60, 58, 70, 75, 82, 80, 89, 91, 87, 95],
    "30d": [30, 38, 48, 55, 62, 70, 68, 76, 85, 88, 93, 98],
  };

  const currentPoints = chartPoints[activeTab];

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-[#0E0E12] shadow-2xl font-sans text-xs">
      {/* Browser Bar */}
      <div className="flex items-center justify-between border-b border-white/5 bg-[#15151A] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex items-center gap-2 rounded-md bg-[#09090C] px-3 py-1 font-mono text-[11px] text-white/50 border border-white/5">
          <ShieldCheck className="w-3 h-3 text-[#CCFF00]" />
          <span>https://telemetry.pulse.internal/live</span>
        </div>
        <div className="flex items-center gap-2 text-white/60 font-mono text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
          <span>60 FPS</span>
        </div>
      </div>

      {/* Main Dashboard Canvas */}
      <div className="p-4 sm:p-6 space-y-5">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold text-white tracking-tight">Pulse Cluster Telemetry</h4>
              <span className="rounded-full bg-[#CCFF00]/15 text-[#CCFF00] px-2 py-0.5 text-[10px] font-mono font-semibold">
                SYSTEM HEALTHY
              </span>
            </div>
            <p className="text-white/40 text-[11px] mt-0.5">Global edge distribution across 32 availability regions</p>
          </div>

          {/* Time range pills */}
          <div className="flex items-center gap-1 rounded-lg bg-white/5 p-1 border border-white/5 self-start">
            {(["24h", "7d", "30d"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`rounded px-2.5 py-1 text-[11px] font-mono transition-all ${
                  activeTab === t
                    ? "bg-[#CCFF00] text-black font-bold shadow-sm"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-lg bg-white/[0.03] border border-white/5 p-3.5 hover:border-[#CCFF00]/40 transition-colors">
            <div className="flex items-center justify-between text-white/50 mb-1">
              <span>Avg Latency</span>
              <Zap className="w-3.5 h-3.5 text-[#CCFF00]" />
            </div>
            <div className="text-xl font-bold font-mono text-white">14.8 ms</div>
            <div className="flex items-center gap-1 text-[10px] text-[#CCFF00] mt-1 font-mono">
              <ArrowUpRight className="w-3 h-3" />
              <span>32% faster than target</span>
            </div>
          </div>

          <div className="rounded-lg bg-white/[0.03] border border-white/5 p-3.5 hover:border-[#CCFF00]/40 transition-colors">
            <div className="flex items-center justify-between text-white/50 mb-1">
              <span>Throughput</span>
              <Activity className="w-3.5 h-3.5 text-[#00E5FF]" />
            </div>
            <div className="text-xl font-bold font-mono text-white">48,219 req/s</div>
            <div className="flex items-center gap-1 text-[10px] text-[#00E5FF] mt-1 font-mono">
              <CheckCircle2 className="w-3 h-3" />
              <span>Zero drop rate</span>
            </div>
          </div>

          <div className="rounded-lg bg-white/[0.03] border border-white/5 p-3.5 hover:border-[#CCFF00]/40 transition-colors">
            <div className="flex items-center justify-between text-white/50 mb-1">
              <span>Edge Memory Cache</span>
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-xl font-bold font-mono text-white">99.4% Hit</div>
            <div className="flex items-center gap-1 text-[10px] text-purple-400 mt-1 font-mono">
              <span>6.2 GB allocated</span>
            </div>
          </div>
        </div>

        {/* SVG Sparkline / Interactive Line Chart */}
        <div className="rounded-lg bg-white/[0.02] border border-white/5 p-4">
          <div className="flex items-center justify-between mb-3 text-white/60">
            <span className="font-mono text-[11px] uppercase tracking-wider">Requests & Concurrency Over Time</span>
            <span className="text-[10px] text-white/40">Updated 1.2s ago</span>
          </div>

          {/* SVG Line visualization */}
          <div className="relative h-32 w-full">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#CCFF00" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#CCFF00" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              <line x1="0" y1="20" x2="500" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

              {/* Gradient fill path */}
              <motion.path
                key={`fill-${activeTab}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                d={`M 0 100 ${currentPoints
                  .map((p, i) => `L ${(i / (currentPoints.length - 1)) * 500} ${100 - p}`)
                  .join(" ")} L 500 100 Z`}
                fill="url(#chartGradient)"
              />

              {/* Line stroke path */}
              <motion.path
                key={`line-${activeTab}`}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                d={`M 0 ${100 - currentPoints[0]} ${currentPoints
                  .slice(1)
                  .map((p, i) => `L ${((i + 1) / (currentPoints.length - 1)) * 500} ${100 - p}`)
                  .join(" ")}`}
                fill="none"
                stroke="#CCFF00"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Active data dots */}
              {currentPoints.map((p, i) => (
                <circle
                  key={i}
                  cx={(i / (currentPoints.length - 1)) * 500}
                  cy={100 - p}
                  r="3.5"
                  className="fill-[#08080A] stroke-[#CCFF00] stroke-2 hover:r-5 transition-all cursor-pointer"
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Global Node Region Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-white/5 text-[11px] font-mono">
          <div className="flex items-center gap-2 text-white/50">
            <Globe2 className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span>Region Clusters:</span>
          </div>
          <div className="flex items-center gap-1.5">
            {[
              { id: "us-east", name: "IAD-1 (US-East)", ping: "9ms" },
              { id: "eu-central", name: "FRA-1 (EU-Central)", ping: "14ms" },
              { id: "ap-east", name: "HND-1 (Tokyo)", ping: "22ms" },
            ].map((node) => (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node.id)}
                className={`px-2.5 py-1 rounded border transition-colors ${
                  selectedNode === node.id
                    ? "border-[#CCFF00] text-[#CCFF00] bg-[#CCFF00]/10 font-bold"
                    : "border-white/5 text-white/40 hover:text-white/80"
                }`}
              >
                {node.name} • {node.ping}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
