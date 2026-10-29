"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import GrowHausLogo from "@/components/ui/GrowHausLogo";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Scroll listener for sticky elevation and auto-hide
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

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

  // Trap escape key to close mobile menu
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
    { name: "What We Build", href: "/#build" },
    { name: "Work", href: "/work" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        } ${
          isScrolled
            ? "py-3 bg-[#09090b]/90 backdrop-blur-md border-b border-white/[0.08]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo Mark */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center group z-50"
          >
            <GrowHausLogo size={isScrolled ? "sm" : "md"} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 rounded-full bg-[#111115]/85 border border-white/10 px-4 py-1.5 backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && !link.href.startsWith("/#") && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  prefetch={true}
                  className={`px-3 py-1 text-xs font-mono transition-colors rounded-full ${
                    isActive
                      ? "text-[#3ddc84] font-semibold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Availability Status, Theme Toggle, Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Availability pill */}
            <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-zinc-400 border border-white/10 rounded-full px-3 py-1 bg-[#111115]/80">
              <span className="w-2 h-2 rounded-full bg-[#3ddc84] animate-pulse" />
              <span className="text-white font-medium">Available</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">Reply in 24h</span>
            </div>

            <ThemeToggle />

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              aria-label="Toggle navigation menu"
              className="md:hidden relative w-9 h-9 rounded-xl border border-white/15 bg-[#121216] flex items-center justify-center text-white hover:border-[#3ddc84] transition-colors z-50"
            >
              <div className="w-4 h-3.5 relative flex flex-col justify-between">
                <span
                  className={`w-full h-[2px] bg-current rounded-full transition-transform duration-200 ${
                    menuOpen ? "rotate-45 translate-y-[5px]" : ""
                  }`}
                />
                <span
                  className={`w-full h-[2px] bg-current rounded-full transition-opacity duration-150 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`w-full h-[2px] bg-current rounded-full transition-transform duration-200 ${
                    menuOpen ? "-rotate-45 -translate-y-[5px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-[#09090b]/98 backdrop-blur-xl md:hidden flex flex-col justify-between p-6 pt-24"
          >
            <div className="space-y-6">
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                NAVIGATION
              </div>
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    prefetch={true}
                    onClick={() => setMenuOpen(false)}
                    className="text-2xl font-semibold text-white hover:text-[#3ddc84] transition-colors flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-500" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/10 font-mono text-xs">
              <div className="text-zinc-400">
                Direct reply within 24 hours: <br />
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-white hover:underline">
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
              <Link
                href="/contact"
                prefetch={true}
                onClick={() => setMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#3ddc84] py-3.5 text-xs font-mono font-bold text-black uppercase tracking-wider"
              >
                <span>Start a project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
