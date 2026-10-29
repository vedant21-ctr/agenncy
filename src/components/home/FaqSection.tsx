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
    <section id="faq" className="relative z-10 py-24 sm:py-32 bg-transparent text-white border-b border-white/[0.08]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Header: Headline max 8 words, body max 2 short sentences */}
        <Reveal>
          <div className="space-y-3 text-center">
            <span className="font-mono text-xs text-[#3ddc84] uppercase tracking-wider block font-semibold">
              {"// FAQ"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Frequently Asked Questions.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-lg mx-auto leading-relaxed">
              Clear answers about our process, timelines, and guarantees.
            </p>
          </div>
        </Reveal>

        {/* Accordion List */}
        <div className="space-y-3">
          {SITE_CONFIG.faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <Reveal key={idx} delay={idx * 0.05}>
                <div className="rounded-xl border border-white/10 bg-[#111115] overflow-hidden hover:border-white/20 transition-colors">
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-semibold tracking-tight text-white">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 bg-[#3ddc84] text-black border-[#3ddc84]" : "text-zinc-400"
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
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm text-zinc-300 leading-relaxed border-t border-white/[0.04] pt-4">
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
