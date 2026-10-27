"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, Check, Copy, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { GithubIcon, LinkedinIcon, XTwitterIcon } from "@/components/ui/SocialIcons";

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

  const colors = ["#ff5500", "#ccff00", "#ffffff", "#ff8800"];
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

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height * 0.75,
      vx: (Math.random() - 0.5) * 16,
      vy: -Math.random() * 18 - 8,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12,
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
      p.vy += 0.5; // gravity
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
  const [currentTime, setCurrentTime] = useState("");
  const [easterEggClicks, setEasterEggClicks] = useState(0);

  useEffect(() => {
    setYear(new Date().getFullYear());

    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date());
        setCurrentTime(`${timeStr} IST`);
      } catch {
        setCurrentTime("14:30 IST");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(SITE_CONFIG.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWordmarkClick = () => {
    const nextClicks = easterEggClicks + 1;
    if (nextClicks >= 5) {
      fireConfetti();
      setEasterEggClicks(0);
    } else {
      setEasterEggClicks(nextClicks);
    }
  };

  return (
    <footer className="bg-[#09090b] border-t-2 border-white/10 text-white pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Top Pitch Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-16 border-b-2 border-white/10">
          <div className="lg:col-span-7 space-y-4">
            <span className="font-mono text-xs text-[#ff5500] uppercase font-bold tracking-wider block">
              // LET&apos;S COLLABORATE
            </span>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95]">
              HAVE AN AMBITIOUS BUILD? <br />
              <span className="text-zinc-500">LET&apos;S ENGINEER IT.</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl leading-relaxed font-normal">
              Direct partner collaboration with Buzdil Mirza, Vedant Satbhai, and Prajjwal Tripathi. Weekly staging releases and transparent fixed-price proposals.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {/* Direct Email quick copy card */}
            <div className="rounded-2xl bg-[#121216] border-2 border-white/10 p-5 flex items-center justify-between shadow-[4px_4px_0px_#000]">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase block tracking-widest font-bold">
                  DIRECT STUDIO INBOX
                </span>
                <span className="font-mono text-sm sm:text-base font-bold text-white">
                  {SITE_CONFIG.contact.email}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-xl bg-white/10 border border-white/10 px-3.5 py-2 text-xs font-mono text-zinc-200 hover:text-white hover:bg-white/20 transition-colors"
                title="Copy email"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#ccff00]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <div className="flex gap-3">
              <Link
                href="/contact"
                data-cursor="Start"
                className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-[#ff5500] py-4 text-xs font-mono font-black text-black uppercase tracking-wider hover:bg-white transition-all shadow-[4px_4px_0px_#fff] border-2 border-black"
              >
                <span>Start A Project Brief</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Links Navigation & Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-mono">
          <div className="space-y-3">
            <span className="text-zinc-500 uppercase tracking-widest font-bold block">NAVIGATION</span>
            <ul className="space-y-2 text-zinc-400 font-medium">
              <li><Link href="/" className="hover:text-white transition-colors">01 // Home</Link></li>
              <li><Link href="/work" className="hover:text-white transition-colors">02 // Selected Work</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">03 // Capabilities & Stack</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">04 // Studio & Story</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">05 // Project Estimator</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-zinc-500 uppercase tracking-widest font-bold block">CONNECT</span>
            <ul className="space-y-2 text-zinc-400 font-medium">
              <li>
                <a href={SITE_CONFIG.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <LinkedinIcon className="w-3.5 h-3.5 text-[#ff5500]" />
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
            <span className="text-zinc-500 uppercase tracking-widest font-bold block">STUDIO METRICS</span>
            <div className="space-y-1.5 text-zinc-400 leading-relaxed">
              <div>Studio Local Time: <span className="text-white font-bold">{currentTime}</span></div>
              <div>Turnaround SLA: <span className="text-[#ccff00] font-bold">Within 24 Hours</span></div>
              <div className="text-zinc-500 text-[11px] pt-1">SF • London • Mumbai</div>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-zinc-500 uppercase tracking-widest font-bold block">CLIENT ASSURANCES</span>
            <ul className="space-y-1.5 text-zinc-400 text-[11px]">
              <li>✓ 100% Code & Asset Ownership</li>
              <li>✓ 30-Day Post-Launch Warranty</li>
              <li>✓ Direct Slack Channel With Partners</li>
            </ul>
          </div>
        </div>

        {/* Large Wordmark that reveals on scroll + Easter Egg */}
        <div className="pt-8 select-none overflow-hidden">
          <div className="text-center">
            <button
              onClick={handleWordmarkClick}
              type="button"
              data-cursor="Click"
              className="text-[17vw] font-black tracking-tighter leading-none text-white/[0.05] hover:text-[#ff5500]/25 transition-all duration-300 block w-full text-center cursor-pointer font-mono"
              title="Click 5 times for confetti"
            >
              {SITE_CONFIG.name}
            </button>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 border-t-2 border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {year} {SITE_CONFIG.legalName}. All rights reserved.
          </div>

          <div className="text-[11px] text-zinc-500 text-center">
            All portfolio items clearly labeled as Concept Projects.
          </div>

          <button
            onClick={scrollToTop}
            data-cursor="Top"
            className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors cursor-pointer font-bold"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#ff5500]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
