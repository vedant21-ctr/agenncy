"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import Magnetic from "@/components/animation/Magnetic";
import TextRoll from "@/components/animation/TextRoll";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState("");
  const pathname = usePathname();

  // Live IST Clock (Asia/Kolkata)
  useEffect(() => {
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

  // Hide on scroll down, return on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 25);

      if (currentScrollY > lastScrollY && currentScrollY > 120 && !menuOpen) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  // Trap escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const navLinks = [
    { name: "Work", href: "/work", number: "01", tag: "SELECTED CLIENT & CONCEPT BUILDS" },
    { name: "Services", href: "/services", number: "02", tag: "CAPABILITIES, ARCHITECTURE & AI" },
    { name: "About", href: "/about", number: "03", tag: "STUDIO STORY & FOUNDING PARTNERS" },
    { name: "Contact", href: "/contact", number: "04", tag: "PROJECT ESTIMATOR & BRIEF INGEST" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        } ${
          isScrolled
            ? "py-3 bg-[#09090b]/90 backdrop-blur-md border-b border-white/[0.08]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Animated Logo Wordmark: Letters slide in from mask on load, shrinks smoothly on scroll */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            data-cursor="Home"
            className="flex items-center gap-2.5 group z-50"
          >
            <motion.span
              layout
              className={`rounded-lg bg-[#ff5500] text-black font-mono font-black flex items-center justify-center transition-all duration-300 shadow-[2px_2px_0px_#000] ${
                isScrolled ? "w-7 h-7 text-xs" : "w-8 h-8 text-sm"
              }`}
            >
              K
            </motion.span>

            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-1.5"
              >
                <span className="font-black text-sm sm:text-base tracking-tight text-white group-hover:text-[#ff5500] transition-colors uppercase font-mono">
                  {SITE_CONFIG.name}
                </span>
                {!isScrolled && (
                  <span className="font-mono text-[9px] text-[#ccff00] bg-[#ccff00]/10 px-1.5 py-0.5 rounded border border-[#ccff00]/30 font-bold uppercase tracking-widest hidden sm:inline">
                    LABS
                  </span>
                )}
              </motion.div>
            </div>
          </Link>

          {/* Desktop Navigation Links with Text Roll Hover */}
          <nav className="hidden md:flex items-center gap-1.5 rounded-full bg-[#121216]/90 border border-white/[0.1] px-5 py-1.5 shadow-[3px_3px_0px_#000]">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  data-cursor="Open"
                  className={`px-3 py-1 text-xs font-mono tracking-wider uppercase transition-colors rounded-full ${
                    isActive ? "text-[#ff5500] font-black" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <TextRoll>{link.name}</TextRoll>
                </Link>
              );
            })}
          </nav>

          {/* Live Clock, Available dot, Theme toggle, Morphing Menu Button */}
          <div className="flex items-center gap-3">
            {/* Live IST clock + availability dot */}
            <div className="hidden lg:flex items-center gap-2.5 font-mono text-[11px] text-zinc-400 border border-white/10 rounded-full px-3.5 py-1.5 bg-[#121216]/80">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ccff00] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ccff00]" />
              </span>
              <span className="text-white font-medium">AVAILABLE</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">{currentTime || "IST"}</span>
            </div>

            <ThemeToggle />

            {/* Morphing Hamburger / X Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              data-cursor={menuOpen ? "Close" : "Menu"}
              aria-label="Toggle full-screen navigation"
              className="relative w-10 h-10 rounded-full border border-white/20 bg-[#121216] flex items-center justify-center text-white hover:border-[#ff5500] hover:text-[#ff5500] transition-colors z-50 shadow-[2px_2px_0px_#000]"
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-[2px] bg-current rounded-full origin-center"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.15 }}
                  className="w-3/4 h-[2px] bg-current rounded-full"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-[2px] bg-current rounded-full origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Neo-Editorial Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#09090b] text-white flex flex-col justify-between p-6 sm:p-12 pt-28 sm:pt-32 overflow-y-auto"
          >
            {/* Top Menu Meta */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6 text-xs font-mono">
              <span className="text-[#ff5500] uppercase font-bold tracking-widest">
                // FULL-SCREEN DIRECTORY
              </span>
              <span className="text-zinc-500 hidden sm:inline">
                {currentTime} • SAN FRANCISCO / LONDON / MUMBAI
              </span>
            </div>

            {/* Giant Staggered Navigation Links */}
            <div className="py-8 space-y-4 max-w-5xl">
              {navLinks.map((link, idx) => {
                const isHovered = hoveredIndex === idx;
                const isAnyHovered = hoveredIndex !== null;

                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.08, duration: 0.4 }}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="relative group border-b border-white/5 pb-4"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      data-cursor="Visit"
                      className={`flex flex-col sm:flex-row sm:items-baseline justify-between transition-all duration-300 ${
                        isAnyHovered && !isHovered ? "opacity-25" : "opacity-100"
                      }`}
                    >
                      <div className="flex items-baseline gap-4 sm:gap-8">
                        <span className="font-mono text-sm sm:text-lg text-[#ff5500] font-black">
                          {link.number}
                        </span>
                        <span className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter hover:text-[#ff5500] transition-colors">
                          <TextRoll>{link.name}</TextRoll>
                        </span>
                      </div>

                      <span className="font-mono text-xs sm:text-sm text-zinc-400 group-hover:text-white transition-colors mt-2 sm:mt-0">
                        {link.tag}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Footer Info inside Menu */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono">
              <div>
                <span className="text-zinc-500 uppercase block mb-1">FOUNDING PARTNERS</span>
                <span className="text-white font-bold block">
                  Buzdil Mirza • Vedant Satbhai • Prajjwal Tripathi
                </span>
              </div>

              <div>
                <span className="text-zinc-500 uppercase block mb-1">DIRECT INQUIRIES</span>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="text-white hover:text-[#ff5500] transition-colors font-bold block"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </div>

              <div className="flex sm:justify-end items-center">
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#ff5500] px-5 py-3 text-black font-bold uppercase text-xs tracking-wider shadow-[3px_3px_0px_#fff]"
                >
                  <span>Build A Quote</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
