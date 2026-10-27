"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface SectionDot {
  id: string;
  label: string;
}

const sections: SectionDot[] = [
  { id: "hero", label: "Intro" },
  { id: "statement", label: "Philosophy" },
  { id: "selected-work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "team", label: "Team" },
  { id: "pricing", label: "Packages" },
  { id: "faq", label: "FAQ" },
];

export default function ScrollProgress() {
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-4 pointer-events-auto">
      {/* Background tracking track */}
      <div className="relative w-[2px] h-32 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="w-full h-full bg-[#ff5500]"
        />
      </div>

      {/* Section dots */}
      <div className="flex flex-col gap-2.5">
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="group relative flex items-center justify-end p-1 cursor-pointer focus:outline-none"
              aria-label={`Jump to ${sec.label}`}
            >
              {/* Tooltip on hover */}
              <span className="pointer-events-none absolute right-5 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] text-zinc-300 bg-black/80 px-2 py-0.5 rounded border border-white/10 whitespace-nowrap">
                {sec.label}
              </span>
              <span
                className={`block rounded-full transition-all duration-200 ${
                  isActive
                    ? "w-2.5 h-2.5 bg-[#ff5500]"
                    : "w-1.5 h-1.5 bg-white/20 group-hover:bg-white/50"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
