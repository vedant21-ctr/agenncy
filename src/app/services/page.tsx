import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import Reveal from "@/components/animation/Reveal";

export const metadata = {
  title: `Services & Deliverables | ${SITE_CONFIG.name}`,
  description: "Comprehensive breakdown of our custom website engineering, web app/SaaS development, and business automation services.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen pt-36 pb-24 bg-[#09090b] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-20">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="font-mono text-xs text-[#ff5500] uppercase tracking-wider block">
            // SCOPE & CAPABILITIES
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Services & Deliverables.
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-normal">
            We provide senior frontend, full-stack, and automation engineering for teams that value velocity and long-term code maintainability.
          </p>
        </div>

        {/* 4 In-Depth Service Sections */}
        <div className="space-y-16">
          {SITE_CONFIG.services.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className="rounded-2xl bg-[#121216] border border-white/[0.08] p-8 sm:p-12 space-y-8 hover:border-white/20 transition-colors"
            >
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
                <div>
                  <span className="font-mono text-xs text-[#ff5500] uppercase tracking-wider block">
                    CAPABILITY // {service.number}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                    {service.name}
                  </h2>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-400 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 self-start">
                  <Clock className="w-3.5 h-3.5 text-[#ff5500]" />
                  <span>Cadence: {service.timeline}</span>
                </div>
              </div>

              {/* Description & Use Cases Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-5">
                  <p className="text-base text-zinc-300 leading-relaxed font-normal">
                    {service.fullDesc}
                  </p>

                  <div className="rounded-xl bg-black/40 border border-white/[0.06] p-4 text-xs font-mono text-zinc-400">
                    <span className="text-[#ff5500] font-bold block mb-1">TYPICAL USE CASE / WHO THIS IS FOR:</span>
                    {service.forWhom}
                  </div>
                </div>

                {/* Deliverables Checklist */}
                <div className="lg:col-span-5 rounded-xl bg-black/30 border border-white/[0.08] p-6 space-y-3">
                  <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block">
                    INCLUDED DELIVERABLES:
                  </span>
                  <ul className="space-y-2.5">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-[#ff5500] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer Stack & CTA */}
              <div className="pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-zinc-500 mr-1">Stack:</span>
                  {service.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-white/[0.04] border border-white/5 px-2.5 py-1 font-mono text-xs text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/contact?service=${encodeURIComponent(service.name)}`}
                  className="flex items-center gap-1.5 rounded-full bg-[#ff5500] px-5 py-2.5 text-xs font-mono font-bold text-white uppercase tracking-wider hover:bg-[#e04b00] transition-colors"
                >
                  <span>Inquire for this service</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
