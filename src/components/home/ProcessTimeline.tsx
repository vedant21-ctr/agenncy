"use client";

import { useState } from "react";
import { CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = SITE_CONFIG.howWeWork;

  return (
    <div className="space-y-10">
      {/* 5 Step Indicator Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {steps.map((item, idx) => {
          const isActive = activeStep === idx;
          return (
            <button
              key={item.step}
              onClick={() => setActiveStep(idx)}
              className={`rounded-xl p-4 text-left transition-all duration-200 border cursor-pointer ${
                isActive
                  ? "bg-[#16161c] border-[#3ddc84] shadow-lg shadow-[#3ddc84]/5"
                  : "bg-[#111115] border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className={isActive ? "text-[#3ddc84] font-bold" : "text-zinc-500"}>
                  {item.step}
                </span>
                <span className="text-[10px] text-zinc-500 uppercase">{item.phase}</span>
              </div>
              <div className="text-sm font-semibold text-white tracking-tight truncate">
                {item.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Showcase Card */}
      <div className="rounded-2xl bg-[#111115] border border-white/10 p-8 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div className="space-y-1">
            <span className="font-mono text-xs text-[#3ddc84] uppercase font-semibold">
              STEP {steps[activeStep].step} {"//"} {steps[activeStep].phase}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {steps[activeStep].title}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-400 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 self-start">
            <Clock className="w-3.5 h-3.5 text-[#3ddc84]" />
            <span>Timing: {steps[activeStep].timing}</span>
          </div>
        </div>

        <p className="text-base text-zinc-300 leading-relaxed max-w-3xl">
          {steps[activeStep].desc}
        </p>

        <div className="rounded-xl bg-black/40 border border-white/[0.06] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-zinc-400">
            <CheckCircle2 className="w-4 h-4 text-[#3ddc84]" />
            <span className="text-zinc-500 uppercase">DELIVERABLE:</span>
            <span className="text-white font-medium">{steps[activeStep].deliverable}</span>
          </div>

          <button
            onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
            className="flex items-center gap-1 text-[#3ddc84] hover:underline self-end sm:self-auto cursor-pointer"
          >
            <span>Next step</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
