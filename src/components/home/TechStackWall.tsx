"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Code2, Layers, Cpu, Database, Wrench } from "lucide-react";
import TextScramble from "@/components/animation/TextScramble";

interface TechItem {
  name: string;
  category: "frontend" | "backend" | "ai" | "infra";
  services: string[]; // "Websites" | "Web Apps" | "Automation" | "UI/UX"
  desc: string;
}

const TECH_ITEMS: TechItem[] = [
  {
    name: "Next.js 16 App Router",
    category: "frontend",
    services: ["Websites", "Web Apps"],
    desc: "Turbopack compilation, React Server Components & Streaming SSR.",
  },
  {
    name: "TypeScript Strict",
    category: "frontend",
    services: ["Websites", "Web Apps", "Automation"],
    desc: "End-to-end type safety across client, server actions, and schemas.",
  },
  {
    name: "Tailwind CSS & Vanilla CSS",
    category: "frontend",
    services: ["Websites", "Web Apps", "UI/UX"],
    desc: "Zero-runtime bespoke design system and micro-motion styling.",
  },
  {
    name: "GSAP & Framer Motion",
    category: "frontend",
    services: ["Websites", "UI/UX"],
    desc: "ScrollTrigger pinning, scrubbed sequences, and physics springs.",
  },
  {
    name: "PostgreSQL & Supabase",
    category: "backend",
    services: ["Web Apps", "Automation"],
    desc: "ACID-compliant relational database with real-time change streams.",
  },
  {
    name: "Redis & Upstash",
    category: "backend",
    services: ["Web Apps", "Automation"],
    desc: "Sub-millisecond memory caching, rate-limiting, and queue pipelines.",
  },
  {
    name: "Claude 3.7 & OpenAI API",
    category: "ai",
    services: ["Automation", "Web Apps"],
    desc: "Autonomous workflow agents, multi-step tool calls, and scoring.",
  },
  {
    name: "Stripe Billing & Connect",
    category: "backend",
    services: ["Web Apps", "Websites"],
    desc: "SaaS subscriptions, checkout sessions, and webhook processing.",
  },
  {
    name: "Docker & Cloudflare Edge",
    category: "infra",
    services: ["Websites", "Web Apps", "Automation"],
    desc: "Worldwide edge compute distribution with zero cold starts.",
  },
  {
    name: "Figma & Token Studio",
    category: "frontend",
    services: ["UI/UX", "Websites"],
    desc: "Design tokens mapped 1:1 to production code variables.",
  },
];

const SERVICE_TAGS = ["All", "Websites", "Web Apps", "Automation", "UI/UX"];

export default function TechStackWall() {
  const [selectedService, setSelectedService] = useState("All");
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null);

  return (
    <section className="py-24 sm:py-32 bg-[#09090b] text-white border-b-2 border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b-2 border-white/10">
          <div className="space-y-4 max-w-2xl">
            <span className="font-mono text-xs text-[#ff5500] uppercase font-bold tracking-wider block">
              <TextScramble text="// PRODUCTION TOOLCHAIN" />
            </span>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white">
              Tech Stack Wall.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
              Hover over any tool to inspect which client service pipelines it powers. We deliberately choose proven, zero-bloat technologies.
            </p>
          </div>

          {/* Service Filter Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#121216] border border-white/10 shadow-[3px_3px_0px_#000]">
            {SERVICE_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedService(tag)}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold uppercase transition-all ${
                  selectedService === tag
                    ? "bg-[#ccff00] text-black shadow-[2px_2px_0px_#000]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECH_ITEMS.map((item) => {
            const matchesService =
              selectedService === "All" || item.services.includes(selectedService);
            const isHovered = hoveredTech?.name === item.name;

            return (
              <motion.div
                key={item.name}
                onMouseEnter={() => setHoveredTech(item)}
                onMouseLeave={() => setHoveredTech(null)}
                animate={{
                  opacity: matchesService ? 1 : 0.25,
                  scale: matchesService ? 1 : 0.98,
                }}
                transition={{ duration: 0.25 }}
                className={`relative rounded-2xl p-6 border-2 transition-all duration-300 ${
                  isHovered
                    ? "bg-[#18181f] border-[#ff5500] shadow-[5px_5px_0px_#ff5500]"
                    : "bg-[#121216] border-white/10 shadow-[4px_4px_0px_#000]"
                }`}
              >
                <div className="flex items-center justify-between pb-3">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    {item.category}
                  </span>
                  <div className="flex gap-1">
                    {item.services.map((srv) => (
                      <span
                        key={srv}
                        className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                          selectedService === srv || isHovered
                            ? "bg-[#ff5500] text-black"
                            : "bg-white/10 text-zinc-400"
                        }`}
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-lg font-black uppercase tracking-tight text-white mt-1">
                  {item.name}
                </h3>
                <p className="text-xs text-zinc-400 font-normal leading-relaxed mt-2">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
