"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, Check, Copy } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { LinkedinIcon, GithubIcon, XTwitterIcon } from "@/components/ui/SocialIcons";
import GrowHausLogo from "@/components/ui/GrowHausLogo";

function fireConfetti() {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "99999";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#3ddc84", "#22c55e", "#ffffff", "#10b981"];
  const particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    rotation: number;
    rotSpeed: number;
    life: number;
  }> = [];

  for (let i = 0; i < 70; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height * 0.75,
      vx: (Math.random() - 0.5) * 14,
      vy: -Math.random() * 16 - 6,
      size: Math.random() * 7 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
      life: 1,
    });
  }

  let animationFrame: number;
  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.45; // gravity
      p.rotation += p.rotSpeed;
      p.life -= 0.015;

      if (p.life > 0) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
    });

    if (alive) {
      animationFrame = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animationFrame);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    }
  };

  render();
}

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [year, setYear] = useState(2026);
  const [easterEggClicks, setEasterEggClicks] = useState(0);

  useEffect(() => {
    const current = new Date().getFullYear();
    const timer = setTimeout(() => {
      setYear(current);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(SITE_CONFIG.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogoClick = () => {
    const next = easterEggClicks + 1;
    if (next >= 5) {
      fireConfetti();
      setEasterEggClicks(0);
    } else {
      setEasterEggClicks(next);
    }
  };

  return (
    <footer className="bg-[#09090b] border-t border-white/10 text-white pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Top Pitch Row: Max 8 words headline, max 2 sentences body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-14 border-b border-white/10">
          <div className="lg:col-span-7 space-y-4">
            <span className="font-mono text-xs text-[#3ddc84] uppercase tracking-wider block">
              {"// LET'S TALK"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Ready to grow your business online?
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl leading-relaxed">
              Work directly with Buzdil Mirza, Vedant Satbhai, and Prajjwal Tripathi. We reply with a clear quote and timeline within 24 hours.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {/* Direct Email quick copy card */}
            <div className="rounded-xl bg-[#111115] border border-white/10 p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase block tracking-wider font-semibold">
                  DIRECT STUDIO INBOX
                </span>
                <span className="font-mono text-sm sm:text-base font-semibold text-white">
                  {SITE_CONFIG.contact.email}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg bg-white/10 border border-white/10 px-3 py-1.5 text-xs font-mono text-zinc-200 hover:text-white hover:bg-white/20 transition-colors"
                title="Copy email"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#3ddc84]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <div className="flex gap-3">
              <Link
                href="/contact"
                prefetch={true}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#3ddc84] py-3.5 text-xs font-mono font-bold text-black uppercase tracking-wider hover:bg-[#34c776] transition-colors"
              >
                <span>Start a project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation & Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-mono">
          <div className="space-y-3">
            <span className="text-zinc-500 uppercase tracking-wider block font-semibold">NAVIGATION</span>
            <ul className="space-y-2 text-zinc-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/#build" className="hover:text-white transition-colors">What We Build</Link></li>
              <li><Link href="/work" className="hover:text-white transition-colors">Selected Work</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-zinc-500 uppercase tracking-wider block font-semibold">CONNECT</span>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <a href={SITE_CONFIG.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <LinkedinIcon className="w-3.5 h-3.5 text-[#3ddc84]" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a href={SITE_CONFIG.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a href={SITE_CONFIG.contact.x} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <XTwitterIcon className="w-3 h-3" />
                  <span>X / Twitter</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-zinc-500 uppercase tracking-wider block font-semibold">FOUNDING TEAM</span>
            <div className="space-y-1.5 text-zinc-400">
              <div>Buzdil Mirza • Design</div>
              <div>Vedant Satbhai • Engineering</div>
              <div>Prajjwal Tripathi • Automation</div>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-zinc-500 uppercase tracking-wider block font-semibold">STANDARDS</span>
            <ul className="space-y-1.5 text-zinc-400">
              <li>✓ 100% Code & Asset Ownership</li>
              <li>✓ 30-Day Bug Warranty</li>
              <li>✓ Direct Slack Access</li>
              <li>✓ Reply in 24 Hours</li>
            </ul>
          </div>
        </div>

        {/* Huge Masked 3D Wordmark Revealing on Scroll */}
        <div className="relative w-full py-6 overflow-hidden select-none border-t border-white/[0.06]" onClick={handleLogoClick} title="Click 5 times for confetti">
          <svg viewBox="0 0 1000 150" className="w-full h-auto max-h-[130px] opacity-20 hover:opacity-45 transition-opacity duration-700 cursor-pointer">
            <defs>
              <linearGradient id="footerWordmarkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#3ddc84" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.7" />
              </linearGradient>
            </defs>
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="url(#footerWordmarkGrad)"
              className="font-black text-[125px] tracking-[-0.06em] uppercase"
              style={{ fontWeight: 900 }}
            >
              GROWHAUS
            </text>
          </svg>
        </div>

        {/* Brand Wordmark Click for easter egg */}
        <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
          <div onClick={handleLogoClick} className="cursor-pointer" title="Click 5 times for confetti">
            <GrowHausLogo size="sm" />
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#3ddc84]" />
          </button>
        </div>

        {/* Bottom copyright row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {year} {SITE_CONFIG.legalName}. All rights reserved.
          </div>
          <div className="text-[11px] text-zinc-500">
            Portfolio projects labeled honestly as Concept Projects.
          </div>
        </div>
      </div>
    </footer>
  );
}
