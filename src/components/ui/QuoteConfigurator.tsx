"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ArrowRight, Check, Sparkles, Clock, ShieldCheck } from "lucide-react";

interface ProjectOption {
  id: string;
  name: string;
  baseMin: number;
  baseMax: number;
  weeks: string;
  badge: string;
}

const PROJECT_TYPES: ProjectOption[] = [
  {
    id: "website",
    name: "Custom Website & Flagship",
    baseMin: 5500,
    baseMax: 8500,
    weeks: "3–4 Weeks",
    badge: "MARKETING",
  },
  {
    id: "webapp",
    name: "Web App & SaaS MVP",
    baseMin: 14000,
    baseMax: 22000,
    weeks: "6–8 Weeks",
    badge: "FULL-STACK",
  },
  {
    id: "automation",
    name: "AI Workflows & Pipeline",
    baseMin: 5000,
    baseMax: 9000,
    weeks: "2–4 Weeks",
    badge: "AUTOMATION",
  },
  {
    id: "design-system",
    name: "Design Sprint & Tokens",
    baseMin: 4500,
    baseMax: 7500,
    weeks: "2–3 Weeks",
    badge: "UI/UX",
  },
];

interface Addon {
  id: string;
  name: string;
  min: number;
  max: number;
}

const ADDONS: Addon[] = [
  { id: "cms", name: "Headless CMS Integration", min: 1000, max: 1800 },
  { id: "stripe", name: "Stripe Subscriptions & Checkout", min: 1800, max: 2800 },
  { id: "ai", name: "Autonomous LLM / LangChain Agents", min: 2200, max: 3500 },
  { id: "analytics", name: "Real-time Telemetry & Dashboards", min: 2500, max: 4000 },
  { id: "seo", name: "Programmatic SEO Architecture", min: 1200, max: 2000 },
  { id: "priority", name: "Express Fast-Track Sprint", min: 1800, max: 3000 },
];

export default function QuoteConfigurator() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<ProjectOption>(PROJECT_TYPES[0]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["cms"]);
  const [timelineSpeed, setTimelineSpeed] = useState<"standard" | "rush">("standard");

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const totals = useMemo(() => {
    let min = selectedType.baseMin;
    let max = selectedType.baseMax;

    selectedAddons.forEach((addonId) => {
      const match = ADDONS.find((a) => a.id === addonId);
      if (match) {
        min += match.min;
        max += match.max;
      }
    });

    if (timelineSpeed === "rush") {
      min = Math.round(min * 1.15);
      max = Math.round(max * 1.15);
    }

    return { min, max };
  }, [selectedType, selectedAddons, timelineSpeed]);

  const handleApplyToBrief = () => {
    const addonNames = selectedAddons
      .map((id) => ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    const query = new URLSearchParams({
      type: selectedType.name,
      addons: addonNames,
      estimate: `$${totals.min.toLocaleString()} – $${totals.max.toLocaleString()}`,
      speed: timelineSpeed === "rush" ? "Express Rush" : "Standard",
    });

    router.push(`/contact?${query.toString()}`);
  };

  return (
    <div className="rounded-3xl bg-[#121216] border-2 border-white/10 p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
      {/* Neo-editorial Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ff5500]/40 bg-[#ff5500]/10 px-3 py-1 font-mono text-[11px] text-[#ff5500] uppercase font-bold tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Project Estimator</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
            Build Your Scope & Quote
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 font-normal max-w-xl">
            Configure your deliverables to generate a transparent ballpark budget and timeline.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#18181f] px-4 py-2.5 font-mono text-right">
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">FOUNDER SPRINT</span>
          <span className="text-xs text-[#ccff00] font-bold">100% SENIOR EXECUTION</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-start">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Project Type */}
          <div className="space-y-3">
            <label className="font-mono text-xs text-zinc-400 uppercase tracking-wider block">
              01 // SELECT PROJECT ARCHETYPE
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROJECT_TYPES.map((type) => {
                const isSelected = selectedType.id === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`relative p-4 rounded-2xl text-left border-2 transition-all duration-200 ${
                      isSelected
                        ? "bg-white text-black border-white shadow-[4px_4px_0px_#ff5500]"
                        : "bg-[#18181f] text-white border-white/10 hover:border-white/30"
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                          isSelected ? "bg-black text-white" : "bg-white/10 text-zinc-400"
                        }`}
                      >
                        {type.badge}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-[#ff5500]" />}
                    </div>
                    <div className="font-bold text-sm leading-snug">{type.name}</div>
                    <div
                      className={`text-xs font-mono mt-2 ${
                        isSelected ? "text-zinc-700" : "text-zinc-400"
                      }`}
                    >
                      Est. from ${type.baseMin.toLocaleString()} • {type.weeks}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Features & Capabilities */}
          <div className="space-y-3">
            <label className="font-mono text-xs text-zinc-400 uppercase tracking-wider block">
              02 // SCOPE ADD-ONS & ARCHITECTURE
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ADDONS.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      isChecked
                        ? "bg-[#ff5500]/15 border-[#ff5500] text-white font-medium"
                        : "bg-[#18181f] border-white/10 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          isChecked ? "bg-[#ff5500] border-[#ff5500]" : "border-white/20"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 text-black stroke-[3]" />}
                      </div>
                      <span className="text-xs">{addon.name}</span>
                    </div>
                    <span className="font-mono text-[11px] text-zinc-500">
                      +${addon.min.toLocaleString()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Pacing */}
          <div className="space-y-3">
            <label className="font-mono text-xs text-zinc-400 uppercase tracking-wider block">
              03 // TARGET TIMELINE SPEED
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTimelineSpeed("standard")}
                className={`p-3.5 rounded-xl border-2 text-left font-mono text-xs transition-all ${
                  timelineSpeed === "standard"
                    ? "bg-white text-black border-white shadow-[3px_3px_0px_#000]"
                    : "bg-[#18181f] text-zinc-400 border-white/10 hover:text-white"
                }`}
              >
                <div className="font-bold uppercase">Standard Sprint</div>
                <div className="text-[11px] opacity-70 mt-0.5">{selectedType.weeks}</div>
              </button>
              <button
                type="button"
                onClick={() => setTimelineSpeed("rush")}
                className={`p-3.5 rounded-xl border-2 text-left font-mono text-xs transition-all ${
                  timelineSpeed === "rush"
                    ? "bg-[#ccff00] text-black border-black shadow-[3px_3px_0px_#000]"
                    : "bg-[#18181f] text-zinc-400 border-white/10 hover:text-white"
                }`}
              >
                <div className="font-bold uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Express Fast-Track</span>
                </div>
                <div className="text-[11px] opacity-70 mt-0.5">Priority daily standups (+15%)</div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Output Card (5 cols) */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl bg-[#09090b] border-2 border-white/20 p-6 sm:p-8 space-y-6 shadow-xl sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="font-mono text-xs text-zinc-400 uppercase">CALCULATED BALLPARK</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#ccff00] bg-[#ccff00]/10 px-2 py-0.5 rounded">
                <Clock className="w-3 h-3" />
                <span>{selectedType.weeks}</span>
              </span>
            </div>

            <div>
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                ESTIMATED RANGE (USD)
              </div>
              <div className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tight mt-1 flex items-baseline gap-2">
                <span className="text-[#ff5500]">${totals.min.toLocaleString()}</span>
                <span className="text-zinc-600 text-2xl font-normal">–</span>
                <span>${totals.max.toLocaleString()}</span>
              </div>
              <div className="text-[11px] font-mono text-zinc-500 mt-2">
                *Transparent directional estimate. Confirmed upon review.
              </div>
            </div>

            {/* Spec breakdown preview */}
            <div className="space-y-2 pt-2 border-t border-white/10 text-xs font-mono">
              <div className="flex justify-between text-zinc-300">
                <span>Core Archetype:</span>
                <span className="text-white font-bold">{selectedType.name}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Add-on Modules:</span>
                <span className="text-white font-bold">{selectedAddons.length} Selected</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Production Pace:</span>
                <span className="text-[#ccff00] font-bold uppercase">{timelineSpeed}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleApplyToBrief}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#ff5500] text-white py-4 font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#e04b00] active:scale-[0.99] transition-all shadow-[4px_4px_0px_#000] border-2 border-black"
              >
                <span>Attach Spec to Project Brief</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-[#ccff00]" />
              <span>Includes 14-day post-launch warranty & 100% IP ownership.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
