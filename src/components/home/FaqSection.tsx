"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import Reveal from "@/components/animation/Reveal";

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#09090b] text-white border-t border-white/[0.08]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-16">
        <Reveal>
          <div className="space-y-3 text-center">
            <span className="font-mono text-xs text-[#ff5500] uppercase tracking-wider block">
              // QUESTIONS & ANSWERS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Frequently Asked Questions.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-lg mx-auto leading-relaxed font-normal">
              Direct answers regarding our timeline, process, and working agreements.
            </p>
          </div>
        </Reveal>

        {/* Accordion List */}
        <div className="space-y-3">
          {SITE_CONFIG.faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <Reveal key={idx} delay={idx * 0.05}>
                <div className="rounded-xl border border-white/[0.08] bg-[#121216] overflow-hidden hover:border-white/20 transition-colors">
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-bold tracking-tight text-white">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-[#ff5500] text-white border-[#ff5500]" : "text-zinc-400"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-4 font-normal">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
