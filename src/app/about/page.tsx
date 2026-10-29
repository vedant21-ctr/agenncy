import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { LinkedinIcon } from "@/components/ui/SocialIcons";

export const metadata = {
  title: `About Us & The Team | ${SITE_CONFIG.name}`,
  description: "Learn about GrowHaus and the three founders: Buzdil Mirza, Vedant Satbhai, and Prajjwal Tripathi.",
};

export default function AboutPage() {
  const principles = [
    {
      number: "01",
      title: "Senior Craft Only",
      desc: "Every line of code and design screen is handled directly by Buzdil, Vedant, or Prajjwal. We never hand off work to junior subcontractors.",
    },
    {
      number: "02",
      title: "Speed Through Simplicity",
      desc: "We avoid unnecessary layers and bloated frameworks. We use clean, modern tools that ship quickly and stay reliable.",
    },
    {
      number: "03",
      title: "Direct Founder Access",
      desc: "You collaborate in shared Slack channels with the founders building your product. No middle managers or lost messages.",
    },
    {
      number: "04",
      title: "Complete Code Ownership",
      desc: "You own 100% of your code, design tokens, and deployment accounts from day one. No vendor lock-in or recurring platform traps.",
    },
  ];

  return (
    <main className="min-h-screen pt-36 pb-24 bg-[#09090b] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-20">
        {/* Page Header: Headline max 8 words, body max 2 short sentences */}
        <div className="max-w-3xl space-y-3">
          <span className="font-mono text-xs text-[#3ddc84] uppercase tracking-wider block font-semibold">
            {"// ABOUT GROWHAUS"}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            We Help Growing Businesses Build Software.
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            GrowHaus is an independent studio founded by three builders. We combine product design, full-stack engineering, and workflow automation.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-10 border-y border-white/[0.08] items-start">
          <div className="lg:col-span-4 space-y-1">
            <span className="font-mono text-xs text-[#3ddc84] uppercase tracking-wider block font-semibold">
              {"// OUR STORY"}
            </span>
            <span className="font-mono text-xs text-zinc-500">
              Founded in 2024 • Bengaluru & Mumbai, India • Available Worldwide
            </span>
          </div>

          <div className="lg:col-span-8 space-y-4 text-base text-zinc-300 leading-relaxed">
            <p>
              We started GrowHaus after seeing founders struggle with slow agencies that spend months in meetings before shipping a single line of code.
            </p>
            <p>
              We do things differently: small senior teams, weekly working software on private staging, and transparent fixed-price quotes.
            </p>
          </div>
        </div>

        {/* The 3 Founders */}
        <div className="space-y-10">
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#3ddc84] uppercase tracking-wider block font-semibold">
              {"// THE FOUNDERS"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              The Three Partners.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SITE_CONFIG.founders.map((founder, idx) => (
              <div
                key={founder.name}
                className="group rounded-2xl bg-[#111115] border border-white/10 p-7 flex flex-col justify-between space-y-6 hover:border-[#3ddc84]/40 transition-colors shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#3ddc84] font-semibold bg-[#3ddc84]/10 border border-[#3ddc84]/20 px-2.5 py-1 rounded-md">
                      PARTNER 0{idx + 1}
                    </span>
                    <span className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-zinc-300">
                      {founder.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-[#3ddc84] transition-colors">
                      {founder.name}
                    </h3>
                    <div className="text-xs font-mono font-medium text-[#3ddc84] mt-0.5">
                      {founder.role}
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mt-2.5">
                      {founder.bio}
                    </p>
                  </div>

                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 text-xs font-mono text-zinc-400">
                    <span className="text-[10px] text-zinc-500 uppercase block font-semibold mb-0.5">{"// FOCUS"}</span>
                    {founder.funFact}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-zinc-300 hover:text-white font-medium transition-colors"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5 text-[#3ddc84]" />
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
            ))}
          </div>
        </div>

        {/* Principles Grid */}
        <div className="space-y-10">
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#3ddc84] uppercase tracking-wider block font-semibold">
              {"// HOW WE OPERATE"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Our Core Principles.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {principles.map((p) => (
              <div
                key={p.number}
                className="rounded-2xl bg-[#111115] border border-white/10 p-7 space-y-2 hover:border-white/20 transition-colors"
              >
                <span className="font-mono text-xs text-[#3ddc84]">{p.number} {"// PRINCIPLE"}</span>
                <h3 className="text-lg font-bold text-white tracking-tight">{p.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl bg-[#111115] border border-white/10 p-8 sm:p-12 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Work with an agile team that moves fast.
          </h2>
          <p className="text-sm text-zinc-400 max-w-md mx-auto">
            Send us a note about your product idea. We will review your goals and reply within 24 hours.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#3ddc84] px-6 py-3 font-mono text-xs font-bold text-black uppercase tracking-wider hover:bg-[#34c776] transition-colors"
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
