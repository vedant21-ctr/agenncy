import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata = {
  title: `Services & Deliverables | ${SITE_CONFIG.name}`,
  description: "Explore our services: custom websites, web applications, product development, business automation, and UI/UX design.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen pt-36 pb-24 bg-[#09090b] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Header: Headline max 8 words, body max 2 short sentences */}
        <div className="max-w-3xl space-y-3">
          <span className="font-mono text-xs text-[#3ddc84] uppercase tracking-wider block font-semibold">
            {"// SERVICES & SCOPE"}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            What We Build and Deliver.
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            We provide senior engineering and design for founders who value speed. Every project is built in weekly cycles with direct communication.
          </p>
        </div>

        {/* 5 Service Sections */}
        <div className="space-y-12">
          {SITE_CONFIG.services.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className="rounded-2xl bg-[#111115] border border-white/10 p-8 sm:p-10 space-y-8 hover:border-white/20 transition-colors"
            >
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                <div>
                  <span className="font-mono text-xs text-[#3ddc84] uppercase tracking-wider block font-semibold">
                    CAPABILITY // {service.number}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                    {service.name}
                  </h2>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-400 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 self-start">
                  <Clock className="w-3.5 h-3.5 text-[#3ddc84]" />
                  <span>Cadence: {service.timeline}</span>
                </div>
              </div>

              {/* Description & Use Cases Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <p className="text-base text-zinc-300 leading-relaxed">
                    {service.fullDesc}
                  </p>

                  <div className="rounded-xl bg-black/40 border border-white/[0.06] p-4 text-xs font-mono text-zinc-400 space-y-1">
                    <span className="text-[#3ddc84] font-bold block uppercase">WHO THIS IS FOR:</span>
                    <p className="text-zinc-300 font-sans">{service.forWhom}</p>
                  </div>

                  <div className="pt-2">
                    <span className="text-xs font-mono text-zinc-500 block mb-2 uppercase">TECH STACK:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-white/[0.04] border border-white/10 px-2.5 py-1 font-mono text-xs text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Deliverables Checklist */}
                <div className="lg:col-span-5 rounded-xl bg-black/30 border border-white/10 p-6 space-y-3">
                  <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block font-semibold">
                    INCLUDED DELIVERABLES:
                  </span>
                  <ul className="space-y-2.5">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-[#3ddc84] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-white/[0.06]">
                    <Link
                      href={`/contact?type=${encodeURIComponent(service.name)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#3ddc84] hover:underline"
                    >
                      <span>Request a quote for {service.name}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
