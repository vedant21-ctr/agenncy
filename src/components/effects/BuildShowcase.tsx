"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  X,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  Bot,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { SITE_CONFIG, BuildSample } from "@/config/site";
import Reveal from "@/components/animation/Reveal";
import { useReducedMotion } from "@/components/animation/useReducedMotion";

// 1. Landing Page Mini Live Demo: Typing headline + pulsing CTA + scrolling page
function MiniLandingPageDemo({ reducedMotion }: { reducedMotion: boolean }) {
  const fullText = "Launch fast with Next.js";
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (reducedMotion) {
      const timer = setTimeout(() => setTyped(fullText), 0);
      return () => clearTimeout(timer);
    }
    let i = 0;
    const interval = setInterval(() => {
      setTyped(fullText.slice(0, i + 1));
      i = (i + 1) % (fullText.length + 8);
      if (i === 0) setTyped("");
    }, 120);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden p-2 text-left">
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3ddc84]" />
          <span className="font-mono text-[9px] text-zinc-400">GROWHAUS TEMPLATE</span>
        </div>
        <div className="font-bold text-xs text-white min-h-[2.2rem] leading-tight">
          {typed}
          {!reducedMotion && <span className="inline-block w-1.5 h-3 bg-[#3ddc84] ml-0.5 animate-pulse" />}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
        <div className="flex gap-1">
          <div className="w-10 h-1.5 rounded bg-white/20" />
          <div className="w-6 h-1.5 rounded bg-white/10" />
        </div>
        <div className="px-2 py-0.5 rounded bg-[#3ddc84] text-[9px] font-mono font-bold text-black shadow-[0_0_12px_rgba(61,220,132,0.4)] animate-pulse">
          Book Call →
        </div>
      </div>
    </div>
  );
}

// 2. SaaS Dashboard Mini Live Demo: Animated metrics & shifting chart bars
function MiniSaaSDashboardDemo({ reducedMotion }: { reducedMotion: boolean }) {
  const [bars, setBars] = useState([35, 65, 45, 85, 60, 95]);
  const [metric, setMetric] = useState(48250);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setBars([
        Math.floor(30 + Math.random() * 40),
        Math.floor(50 + Math.random() * 45),
        Math.floor(40 + Math.random() * 50),
        Math.floor(70 + Math.random() * 30),
        Math.floor(45 + Math.random() * 45),
        Math.floor(80 + Math.random() * 20),
      ]);
      setMetric((prev) => prev + Math.floor(Math.random() * 80 - 30));
    }, 1800);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden p-2 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-[9px] font-mono text-zinc-400">
          <TrendingUp className="w-3 h-3 text-[#60A5FA]" />
          <span>REALTIME MRR</span>
        </div>
        <span className="font-mono text-[10px] font-bold text-[#60A5FA]">
          ₹{metric.toLocaleString("en-IN")}
        </span>
      </div>

      {/* Dynamic Animated Bars */}
      <div className="flex items-end gap-1.5 h-12 pt-2">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 bg-white/5 rounded-t overflow-hidden h-full flex items-end">
            <div
              className="w-full bg-[#60A5FA] rounded-t transition-all duration-700"
              style={{
                height: `${h}%`,
                opacity: 0.4 + (h / 100) * 0.6,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. Online Store Mini Live Demo: 3D Turntable Product + Toast
function MiniOnlineStoreDemo({ reducedMotion }: { reducedMotion: boolean }) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setAdded((prev) => !prev);
    }, 2400);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden p-2 text-left">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] text-[#F59E0B] font-bold">ACOUSTIC HEADPHONES</span>
        <span className="font-mono text-[10px] font-bold text-white">₹19,999</span>
      </div>

      <div className="flex items-center justify-center py-1">
        {/* Animated Turntable Icon with Isometric Perspective */}
        <div
          className={`w-12 h-12 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(245,158,11,0.2)] ${
            !reducedMotion ? "animate-[spin_8s_linear_infinite]" : ""
          }`}
        >
          🎧
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[9px] text-zinc-400">Color: Obsidian</span>
        <span
          className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold transition-all duration-300 ${
            added
              ? "bg-[#3ddc84] text-black shadow-[0_0_8px_rgba(61,220,132,0.4)]"
              : "bg-white/10 text-zinc-300"
          }`}
        >
          {added ? "✓ Added to Cart" : "+ Add to Bag"}
        </span>
      </div>
    </div>
  );
}

// 4. Portfolio Mini Live Demo: Masonry Tiles Stagger
function MiniPortfolioDemo() {
  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden p-2 text-left">
      <div className="flex items-center justify-between font-mono text-[9px] text-zinc-400">
        <span>CURATED PROJECTS</span>
        <span className="text-[#A78BFA]">4 WORKS</span>
      </div>

      <div className="grid grid-cols-2 gap-1.5 py-1">
        <div className="h-7 rounded bg-[#A78BFA]/20 border border-[#A78BFA]/40 flex items-center justify-center text-[8px] font-mono text-white">
          Brand
        </div>
        <div className="h-7 rounded bg-white/10 border border-white/15 flex items-center justify-center text-[8px] font-mono text-zinc-300">
          UI / UX
        </div>
        <div className="h-7 rounded bg-white/10 border border-white/15 flex items-center justify-center text-[8px] font-mono text-zinc-300">
          Product
        </div>
        <div className="h-7 rounded bg-[#A78BFA]/30 border border-[#A78BFA]/50 flex items-center justify-center text-[8px] font-mono text-[#A78BFA]">
          Motion
        </div>
      </div>
    </div>
  );
}

// 5. Booking Site Mini Live Demo: Calendar Slot + Confirmation check
function MiniBookingDemo({ reducedMotion }: { reducedMotion: boolean }) {
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setConfirmed((prev) => !prev);
    }, 2500);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden p-2 text-left">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] text-[#EC4899] font-bold">CLINIC & SALON BOOKING</span>
        <Calendar className="w-3 h-3 text-[#EC4899]" />
      </div>

      <div className="flex items-center gap-1.5 py-1">
        <span className="px-2 py-1 rounded bg-white/10 font-mono text-[9px] text-zinc-300">
          09:00 AM
        </span>
        <span className="px-2 py-1 rounded bg-[#EC4899] font-mono text-[9px] font-bold text-white shadow-[0_0_10px_rgba(236,72,153,0.4)]">
          11:30 AM
        </span>
        <span className="px-2 py-1 rounded bg-white/10 font-mono text-[9px] text-zinc-300">
          02:00 PM
        </span>
      </div>

      <div className="flex items-center justify-between text-[9px] font-mono">
        <span className="text-zinc-400">Dr. Sarah Vance</span>
        <span className={confirmed ? "text-[#3ddc84] font-bold" : "text-zinc-500"}>
          {confirmed ? "✓ Confirmed" : "Select Slot"}
        </span>
      </div>
    </div>
  );
}

// 6. Restaurant Mini Live Demo: Sliding Menu Items
function MiniRestaurantDemo() {
  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden p-2 text-left">
      <div className="flex items-center justify-between font-mono text-[9px]">
        <span className="text-[#F97316] font-bold">DINING RESERVATIONS</span>
        <span className="text-zinc-400">Tonight 7:30 PM</span>
      </div>

      <div className="space-y-1.5 py-1">
        <div className="flex justify-between items-center text-[9px] bg-white/5 p-1 rounded">
          <span className="text-white">Handmade Truffle Pasta</span>
          <span className="text-[#F97316] font-mono font-bold">$28</span>
        </div>
        <div className="flex justify-between items-center text-[9px] bg-white/5 p-1 rounded">
          <span className="text-zinc-300">Heirloom Burrata</span>
          <span className="text-[#F97316] font-mono font-bold">$19</span>
        </div>
      </div>
    </div>
  );
}

// 7. AI Tool Mini Live Demo: Simulated LLM Stream
function MiniAIToolDemo({ reducedMotion }: { reducedMotion: boolean }) {
  const answer = "Qualified: Tier 1 Founder ($10k+ budget)";
  const [streamed, setStreamed] = useState("");

  useEffect(() => {
    if (reducedMotion) {
      const timer = setTimeout(() => setStreamed(answer), 0);
      return () => clearTimeout(timer);
    }
    let idx = 0;
    const interval = setInterval(() => {
      setStreamed(answer.slice(0, idx + 1));
      idx = (idx + 1) % (answer.length + 10);
      if (idx === 0) setStreamed("");
    }, 100);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden p-2 text-left">
      <div className="flex items-center gap-1 font-mono text-[9px] text-[#10B981]">
        <Bot className="w-3 h-3" />
        <span>AI INBOUND TRIAGE</span>
      </div>

      <div className="bg-white/5 border border-white/10 rounded p-1.5 space-y-1">
        <div className="text-[8px] font-mono text-zinc-400">{">"} Analyze form inquiry...</div>
        <div className="text-[9px] font-mono font-bold text-[#3ddc84] leading-tight">
          {streamed}
          {!reducedMotion && <span className="inline-block w-1.5 h-2.5 bg-[#3ddc84] ml-0.5 animate-pulse" />}
        </div>
      </div>
    </div>
  );
}

// 8. Workflow Automation Mini Live Demo: Animated pipeline nodes with glowing packet
function MiniAutomationDemo({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden p-2 text-left">
      <div className="flex items-center justify-between font-mono text-[9px]">
        <span className="text-[#3ddc84] font-bold">PIPELINE AUTOMATION</span>
        <span className="text-zinc-400">{"< 500ms SLA"}</span>
      </div>

      <div className="flex items-center justify-between gap-1 py-1">
        <div className="px-1.5 py-1 rounded bg-white/10 border border-white/20 text-[8px] font-mono text-center">
          Form
        </div>
        <div className="flex-1 h-0.5 bg-gradient-to-r from-white/20 via-[#3ddc84] to-white/20 relative">
          {!reducedMotion && (
            <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#3ddc84] shadow-[0_0_8px_#3ddc84] animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]" />
          )}
        </div>
        <div className="px-1.5 py-1 rounded bg-[#3ddc84]/20 border border-[#3ddc84]/50 text-[8px] font-mono text-[#3ddc84] font-bold text-center">
          AI CRM
        </div>
        <div className="flex-1 h-0.5 bg-gradient-to-r from-white/20 via-[#3ddc84] to-white/20" />
        <div className="px-1.5 py-1 rounded bg-white/10 border border-white/20 text-[8px] font-mono text-center">
          Slack
        </div>
      </div>
    </div>
  );
}

export default function BuildShowcase() {
  const [activeSample, setActiveSample] = useState<BuildSample | null>(null);
  const reducedMotion = useReducedMotion();

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveSample(null);
    };
    if (activeSample) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeSample]);

  // Technology chips for each demo
  const techMap: Record<string, string> = {
    "landing-page": "Next.js • Tailwind",
    "saas-dashboard": "Canvas • React",
    "online-store": "Three.js • R3F",
    "portfolio-site": "Framer Motion",
    "booking-site": "React State",
    "restaurant-site": "Motion • UI",
    "ai-tool": "LLM API • Stream",
    "workflow-automation": "SVG Pipelines",
  };

  return (
    <section id="build" className="py-24 sm:py-32 bg-transparent text-white border-b border-white/[0.08] relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
            <div className="space-y-3 max-w-2xl">
              <span className="font-mono text-xs text-[#3ddc84] uppercase tracking-wider block">
                {"// WHAT WE CAN BUILD"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Websites & Products We Deliver.
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl">
                Explore 8 common archetypes we design and engineer. Click any sample to inspect features, timelines, and sample architecture.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 self-start md:self-end">
              <span className="w-2 h-2 rounded-full bg-[#3ddc84]" />
              <span>8 Interactive Live Demos</span>
            </div>
          </div>
        </Reveal>

        {/* Bento Grid Mix with Varied Card Sizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SITE_CONFIG.buildSamples.map((sample, idx) => {
            // Bento sizing: SaaS dashboard and Automation get featured span
            const isFeatured = sample.id === "saas-dashboard" || sample.id === "workflow-automation";
            const colSpan = isFeatured ? "lg:col-span-2" : "lg:col-span-1";

            return (
              <Reveal key={sample.id} delay={idx * 0.04}>
                <div
                  onClick={() => setActiveSample(sample)}
                  className={`group h-full rounded-2xl bg-[#111115]/90 backdrop-blur-md border border-white/10 p-5 flex flex-col justify-between hover:border-[#3ddc84]/50 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-[0_12px_40px_rgba(61,220,132,0.08)] ${colSpan}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveSample(sample);
                    }
                  }}
                  aria-label={`Open ${sample.title} interactive demo`}
                >
                  <div className="space-y-4">
                    {/* Top Bar with Badge, Timeline, and Tech Chip */}
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-[#3ddc84]/10 border border-[#3ddc84]/30 px-2 py-0.5 text-[10px] text-[#3ddc84] uppercase font-bold">
                          {sample.badge}
                        </span>
                        <span className="rounded bg-white/5 border border-white/10 px-2 py-0.5 text-[9px] text-zinc-400">
                          {techMap[sample.id] || "Next.js"}
                        </span>
                      </div>
                      <span className="text-zinc-500 text-[11px]">{sample.typicalTimeline}</span>
                    </div>

                    {/* Animated Live Mini Mockup Frame */}
                    <div className="relative aspect-[16/10] w-full rounded-xl bg-[#16161c] border border-white/[0.08] overflow-hidden p-2.5 flex flex-col justify-between group-hover:border-white/20 transition-colors">
                      {/* Browser Chrome Bar */}
                      <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.06]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-500/60" />
                          <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                          <span className="w-2 h-2 rounded-full bg-green-500/60" />
                        </div>
                        <div className="h-1.5 w-14 rounded-full bg-white/10" />
                      </div>

                      {/* Live Micro Demo */}
                      <div className="flex-1 flex flex-col justify-center">
                        {sample.id === "landing-page" && <MiniLandingPageDemo reducedMotion={reducedMotion} />}
                        {sample.id === "saas-dashboard" && <MiniSaaSDashboardDemo reducedMotion={reducedMotion} />}
                        {sample.id === "online-store" && <MiniOnlineStoreDemo reducedMotion={reducedMotion} />}
                        {sample.id === "portfolio-site" && <MiniPortfolioDemo />}
                        {sample.id === "booking-site" && <MiniBookingDemo reducedMotion={reducedMotion} />}
                        {sample.id === "restaurant-site" && <MiniRestaurantDemo />}
                        {sample.id === "ai-tool" && <MiniAIToolDemo reducedMotion={reducedMotion} />}
                        {sample.id === "workflow-automation" && <MiniAutomationDemo reducedMotion={reducedMotion} />}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-[#3ddc84] transition-colors">
                        {sample.title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                        {sample.oneLineDesc}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Trigger Action */}
                  <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-white">
                    <span>Inspect Demo</span>
                    <ArrowUpRight className="w-4 h-4 text-[#3ddc84] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Interactive Modal Dialog */}
      {activeSample && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveSample(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl bg-[#111115] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/[0.08]">
              <div>
                <span className="font-mono text-xs text-[#3ddc84] uppercase tracking-wider block">
                  {activeSample.type} • {activeSample.badge}
                </span>
                <h3 id="modal-title" className="text-2xl font-bold text-white mt-1">
                  {activeSample.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveSample(null)}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Target Audience & Overview */}
            <div className="space-y-4">
              <div>
                <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                  WHAT THIS IS
                </h4>
                <p className="text-sm text-zinc-200 mt-1 leading-relaxed">
                  {activeSample.whatItIs}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                  BUILT FOR
                </h4>
                <p className="text-sm text-zinc-300 mt-1 leading-relaxed">
                  {activeSample.targetAudience}
                </p>
              </div>

              {/* Features List */}
              <div>
                <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-wider mb-2">
                  KEY FEATURES WE DELIVER
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeSample.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-[#3ddc84] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline & Quote Pill */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                    TYPICAL TIMELINE
                  </span>
                  <span className="text-sm font-mono font-bold text-white">
                    {activeSample.typicalTimeline}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                    {activeSample.keyMetrics.label}
                  </span>
                  <span className="text-sm font-mono font-bold text-[#3ddc84]">
                    {activeSample.keyMetrics.value}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
              <button
                onClick={() => setActiveSample(null)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-white/10 text-xs font-mono font-semibold text-zinc-300 hover:bg-white/5 transition-colors cursor-pointer"
              >
                Close
              </button>
              <Link
                href={`/contact?type=${encodeURIComponent(activeSample.quoteCategory)}`}
                prefetch={true}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#3ddc84] text-xs font-mono font-bold text-black uppercase tracking-wider hover:bg-[#34c776] transition-colors"
              >
                <span>Get a quote like this</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
