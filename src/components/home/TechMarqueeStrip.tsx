"use client";

import Marquee from "@/components/animation/Marquee";

export default function TechMarqueeStrip() {
  const lineOne = [
    "Next.js App Router",
    "React 19",
    "TypeScript",
    "GSAP ScrollTrigger",
    "Lenis Smooth Scrolling",
    "Tailwind CSS",
    "Framer Motion",
    "PostgreSQL",
    "Supabase",
    "Python & FastAPI",
  ];

  const lineTwo = [
    "Web Application MVPs",
    "Digital Flagships",
    "Autonomous AI Workflows",
    "Stripe Billing Systems",
    "Pragmatic Automation",
    "Core Web Vitals 95+",
    "Zero Junior Handoffs",
  ];

  return (
    <div className="py-6 bg-[#09090b] border-y border-white/[0.08] overflow-hidden">
      <Marquee items={lineOne} speed={28} />
      <Marquee items={lineTwo} speed={32} reverse />
    </div>
  );
}
