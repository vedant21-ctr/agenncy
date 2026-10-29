"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Calculator, ArrowRight, Check } from "lucide-react";

interface ProjectOption {
  id: string;
  name: string;
  baseMin: number;
  baseMax: number;
  weeks: string;
}

const PROJECT_TYPES: ProjectOption[] = [
  {
    id: "website",
    name: "Custom Website",
    baseMin: 150000,
    baseMax: 250000,
    weeks: "2–3 Weeks",
  },
  {
    id: "webapp",
    name: "Web App & SaaS",
    baseMin: 350000,
    baseMax: 600000,
    weeks: "4–6 Weeks",
  },
  {
    id: "automation",
    name: "AI & Automation",
    baseMin: 120000,
    baseMax: 250000,
    weeks: "1–3 Weeks",
  },
  {
    id: "design",
    name: "UI/UX & Branding",
    baseMin: 100000,
    baseMax: 180000,
    weeks: "2–3 Weeks",
  },
];

interface Addon {
  id: string;
  name: string;
  min: number;
  max: number;
}

const ADDONS: Addon[] = [
  { id: "cms", name: "Simple CMS for team edits", min: 30000, max: 50000 },
  { id: "stripe", name: "Razorpay / UPI billing", min: 40000, max: 70000 },
  { id: "ai", name: "AI assistant & triage flow", min: 45000, max: 80000 },
  { id: "dashboards", name: "Custom analytics charts", min: 35000, max: 65000 },
];

export default function QuoteConfigurator() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<ProjectOption>(PROJECT_TYPES[0]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["cms"]);

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

    return { min, max };
  }, [selectedType, selectedAddons]);

  const handleAttachSpec = () => {
    const addonNames = selectedAddons
      .map((id) => ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    const estimateStr = `₹${totals.min.toLocaleString("en-IN")} – ₹${totals.max.toLocaleString("en-IN")}`;
    const params = new URLSearchParams({
      type: selectedType.name,
      addons: addonNames || "None",
      estimate: estimateStr,
    });

    router.push(`/contact?${params.toString()}`);
  };

  return (
    <div className="rounded-2xl bg-[#111115] border border-white/10 p-6 sm:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#3ddc84] font-semibold">
            <Calculator className="w-4 h-4" />
            <span>INSTANT ESTIMATOR</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Estimate Your Project Scope.
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400">
            Select a project type and add-ons for a transparent ballpark estimate.
          </p>
        </div>

        <div className="text-xs font-mono text-zinc-500">
          Estimated Cadence: <span className="text-white font-bold">{selectedType.weeks}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Configuration Steps */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Project Type */}
          <div className="space-y-3">
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block font-semibold">
              1. What do you need?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROJECT_TYPES.map((type) => {
                const isSelected = selectedType.id === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#16161c] border-[#3ddc84]"
                        : "bg-[#14141a] border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="font-semibold text-sm text-white">{type.name}</div>
                    <div className="text-xs font-mono text-zinc-400 mt-1">
                      From ₹{type.baseMin.toLocaleString("en-IN")}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Addons */}
          <div className="space-y-3">
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block font-semibold">
              2. Optional Features
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ADDONS.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3 rounded-lg text-left border text-xs flex items-center justify-between transition-all cursor-pointer ${
                      isChecked
                        ? "bg-[#16161c] border-[#3ddc84]/60 text-white"
                        : "bg-[#14141a] border-white/10 text-zinc-400 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                          isChecked ? "bg-[#3ddc84] border-[#3ddc84] text-black" : "border-white/20"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                      <span>{addon.name}</span>
                    </div>
                    <span className="font-mono text-[10px] text-zinc-500">
                      +₹{addon.min.toLocaleString("en-IN")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Calculated Summary Card */}
        <div className="lg:col-span-5 rounded-xl bg-black/40 border border-white/10 p-6 sm:p-7 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              BALLPARK ESTIMATE
            </span>
            <div className="text-3xl sm:text-4xl font-bold font-mono text-white">
              ₹{totals.min.toLocaleString("en-IN")} – ₹{totals.max.toLocaleString("en-IN")}
            </div>
            <p className="text-xs text-zinc-500 pt-1">
              Estimated timeline: {selectedType.weeks}. Final fixed quote delivered in 24 hours.
            </p>
          </div>

          <div className="pt-4 border-t border-white/[0.08] space-y-2 text-xs font-mono text-zinc-400">
            <div className="flex justify-between">
              <span>Archetype:</span>
              <span className="text-white">{selectedType.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Addons:</span>
              <span className="text-white">{selectedAddons.length} selected</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAttachSpec}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#3ddc84] py-3.5 text-xs font-mono font-bold text-black uppercase tracking-wider hover:bg-[#34c776] transition-colors cursor-pointer"
          >
            <span>Attach to Contact Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
