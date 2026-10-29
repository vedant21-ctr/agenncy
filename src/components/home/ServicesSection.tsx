"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ServiceTabs from "./ServiceTabs";
import Reveal from "@/components/animation/Reveal";

export default function ServicesSection() {
  return (
    <section id="services" className="relative z-10 py-24 sm:py-32 bg-transparent text-white border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Header: Headline max 8 words, body max 2 short sentences */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
            <div className="space-y-3 max-w-xl">
              <span className="font-mono text-xs text-[#3ddc84] uppercase tracking-wider block font-semibold">
                {"// WHAT WE DO"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Websites, Web Apps & Automation.
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                We handle design, engineering, and automation in weekly cycles. Select any capability below to view deliverables.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#111115] px-5 py-2.5 text-xs font-mono text-zinc-300 hover:text-white hover:border-white/20 transition-all self-start sm:self-auto"
            >
              <span>All services</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#3ddc84]" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ServiceTabs />
        </Reveal>
      </div>
    </section>
  );
}
