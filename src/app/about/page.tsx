import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { LinkedinIcon } from "@/components/ui/SocialIcons";
import Reveal from "@/components/animation/Reveal";
import Tilt from "@/components/animation/Tilt";

export const metadata = {
  title: `About Us & The Team | ${SITE_CONFIG.name}`,
  description: "Learn about the three founders behind Kinetic — an agile, work-first engineering studio.",
};

export default function AboutPage() {
  const values = [
    {
      number: "01",
      title: "Senior Craft Only",
      desc: "Every line of code and pixel of design is handled by Buzdil, Vedant, or Prajjwal. We don't hire junior subcontractors to pad margins.",
    },
    {
      number: "02",
      title: "Speed Through Simplicity",
      desc: "We avoid bloated frameworks and over-engineered architecture. We choose proven, high-performance tools that ship fast and stay reliable.",
    },
    {
      number: "03",
      title: "Zero-Handoff Transparency",
      desc: "No account executives or layers of communication. You work in direct shared Slack channels with the people actually building your software.",
    },
    {
      number: "04",
      title: "Complete Code Ownership",
      desc: "You own 100% of the repository, assets, and infrastructure from day one. Zero proprietary CMS lock-in or recurring hosting traps.",
    },
  ];

  return (
    <main className="min-h-screen pt-36 pb-24 bg-[#09090b] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-24">
        {/* Page Header */}
        <div className="max-w-4xl space-y-6">
          <span className="font-mono text-xs text-[#ff5500] uppercase tracking-wider block">
            // OUR STORY & PRINCIPLES
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            We started Kinetic to build software the right way.
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed font-normal">
            Most digital agencies are structured backwards: bloated sales tiers and account managers fronting junior offshore staff. We built an agile, senior-first studio pairing design craft with full-stack engineering.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12 border-y border-white/[0.08] items-start">
          <div className="lg:col-span-4 space-y-2">
            <span className="font-mono text-xs text-[#ff5500] uppercase tracking-wider block">
              // THE STORY
            </span>
            <span className="font-mono text-xs text-zinc-500">
              Founded in 2024 by 3 product builders in San Francisco & London.
            </span>
          </div>

          <div className="lg:col-span-8 space-y-6 text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
            <p>
              Having worked at venture-backed startups and hyper-growth scaleups, we experienced the same frustration repeatedly: founders with clear visions were forced to choose between massive agencies that take six months to launch an MVP, or low-cost freelancers that produce brittle, unmaintainable code.
            </p>
            <p>
              Kinetic was established as the antidote: a small, disciplined studio of senior specialists. We run disciplined weekly sprints with live staging builds delivered every Friday.
            </p>
            <p>
              Whether we are building a bespoke digital flagship, architecting a multi-tenant SaaS application, or engineering an autonomous operational pipeline, we treat every client project with the care of an owner.
            </p>
          </div>
        </div>

        {/* The 3 Founders */}
        <div className="space-y-12">
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#ff5500] uppercase tracking-wider block">
              // LEADERSHIP
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              The Founding Partners.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SITE_CONFIG.founders.map((founder, idx) => (
              <Tilt key={founder.name} maxTilt={5}>
                <div className="h-full rounded-3xl bg-[#121216] border-2 border-white/10 p-7 flex flex-col justify-between space-y-6 hover:border-[#ff5500] transition-colors shadow-[6px_6px_0px_#000]">
                  <div className="space-y-5">
                    <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-zinc-950 border-2 border-white/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-500 hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-white font-bold border border-white/20">
                        PARTNER 0{idx + 1}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                        {founder.name}
                      </h3>
                      <div className="text-xs font-mono font-bold text-[#ccff00] mt-1 uppercase">
                        {founder.role}
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-3 font-normal">
                        {founder.bio}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-zinc-300 hover:text-white font-bold transition-colors"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5 text-[#ff5500]" />
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href={`mailto:${founder.email}`}
                      className="text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      {founder.email}
                    </a>
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        </div>

        {/* Values Grid */}
        <div className="space-y-12">
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#ff5500] uppercase tracking-wider block">
              // PRINCIPLES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              How We Work.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div
                key={v.number}
                className="rounded-2xl bg-[#121216] border border-white/[0.08] p-8 space-y-3 hover:border-white/20 transition-colors"
              >
                <span className="font-mono text-xs text-[#ff5500]">{v.number} // PRINCIPLE</span>
                <h3 className="text-xl font-bold text-white tracking-tight">{v.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-normal">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl bg-[#121216] border border-white/10 p-10 sm:p-14 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Work with an agency that moves as fast as you do.
          </h2>
          <p className="text-sm text-zinc-400 max-w-lg mx-auto font-normal">
            Book an intro call with Buzdil, Vedant, or Prajjwal. We’ll review your product timeline and give actionable technical feedback immediately.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#ff5500] px-7 py-3.5 font-mono text-xs font-bold text-white uppercase tracking-wider hover:bg-[#e04b00] transition-colors"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
