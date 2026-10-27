"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ServiceTabs from "./ServiceTabs";
import Reveal from "@/components/animation/Reveal";

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 sm:py-32 bg-[#09090b] text-white border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="font-mono text-xs text-[#ff5500] uppercase tracking-wider block">
                // WHAT WE DO
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Capabilities & Services.
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
                From high-conversion websites to multi-tenant SaaS MVPs and custom automation pipelines. Select a service below to view deliverables.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#121216] px-5 py-2.5 text-xs font-mono text-zinc-300 hover:text-white hover:border-white/30 transition-all self-start"
            >
              <span>Full services overview</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#ff5500]" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <ServiceTabs />
        </Reveal>
      </div>
    </section>
  );
}
