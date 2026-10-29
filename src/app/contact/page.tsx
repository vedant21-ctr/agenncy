"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Clock, Mail, Send, Calendar, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/config/site";

const serviceNeeds = [
  "Website",
  "Web App / SaaS",
  "Product Development",
  "Business Automation",
  "UI/UX Design",
];

function ContactFormInner() {
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedNeed, setSelectedNeed] = useState<string>("Website");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Pre-fill from query params if coming from QuoteConfigurator or Sample card
  useEffect(() => {
    if (!searchParams) return;
    const timer = setTimeout(() => {
      const typeParam = searchParams.get("type");
      const addonsParam = searchParams.get("addons");
      const estParam = searchParams.get("estimate");
      const packageParam = searchParams.get("package");

      if (typeParam || packageParam) {
        const target = typeParam || packageParam || "";
        if (target.toLowerCase().includes("web app") || target.toLowerCase().includes("saas")) {
          setSelectedNeed("Web App / SaaS");
        } else if (target.toLowerCase().includes("automation")) {
          setSelectedNeed("Business Automation");
        } else if (target.toLowerCase().includes("design")) {
          setSelectedNeed("UI/UX Design");
        } else {
          setSelectedNeed("Website");
        }

        let prefilledMsg = `Interested in: ${target}\n`;
        if (addonsParam && addonsParam !== "None") prefilledMsg += `Selected modules: ${addonsParam}\n`;
        if (estParam) prefilledMsg += `Ballpark estimate: ${estParam}\n`;
        prefilledMsg += `\nProject notes: `;
        setMessage(prefilledMsg);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Please provide your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please provide a valid email address.");
      return;
    }
    if (!message.trim()) {
      setErrorMsg("Please provide a brief message about what you need.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="rounded-2xl bg-[#111115] border border-white/10 p-6 sm:p-9 shadow-xl relative overflow-hidden">
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="submitted"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="py-12 text-center space-y-4"
          >
            <div className="w-14 h-14 rounded-full bg-[#3ddc84]/15 border border-[#3ddc84] flex items-center justify-center text-[#3ddc84] mx-auto">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-white">
              Message Received
            </h3>
            <p className="text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong>{name}</strong>. We received your note and will review it and reply within <strong>24 hours</strong>.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setName("");
                  setEmail("");
                  setMessage("");
                }}
                className="rounded-xl bg-white/10 px-5 py-2.5 text-xs font-mono font-medium text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                Send another message
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">Start a Project</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Direct founder review • We reply within 24 hours
              </p>
            </div>

            {errorMsg && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-400 font-mono">
                {errorMsg}
              </div>
            )}

            {/* 1. What do you need? */}
            <div className="space-y-2">
              <label className="block text-xs font-mono text-zinc-400 uppercase font-semibold">
                What do you need?
              </label>
              <div className="flex flex-wrap gap-2">
                {serviceNeeds.map((need) => (
                  <button
                    type="button"
                    key={need}
                    onClick={() => setSelectedNeed(need)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      selectedNeed === need
                        ? "bg-[#3ddc84] text-black font-bold"
                        : "bg-[#16161c] border border-white/10 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {need}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-zinc-400 uppercase font-semibold">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Aarav Sharma"
                  className="w-full rounded-xl bg-[#16161c] border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#3ddc84]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-zinc-400 uppercase font-semibold">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aarav@startup.in"
                  className="w-full rounded-xl bg-[#16161c] border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#3ddc84]"
                />
              </div>
            </div>

            {/* 3. One Message Box */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-zinc-400 uppercase font-semibold">
                Your Message *
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what you're building, target timeline, and any special features..."
                className="w-full rounded-xl bg-[#16161c] border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#3ddc84] resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#3ddc84] py-3.5 text-xs font-mono font-bold text-black uppercase tracking-wider hover:bg-[#34c776] disabled:opacity-50 transition-colors cursor-pointer"
            >
              {isSubmitting ? (
                <span>Sending message...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send inquiry</span>
                </>
              )}
            </button>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-36 pb-24 bg-[#09090b] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-20">
        {/* Main Ingest Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="font-mono text-xs text-[#3ddc84] uppercase tracking-wider block font-semibold">
                {"// CONTACT US"}
              </span>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                Let&apos;s Build Together.
              </h1>
              <p className="text-base text-zinc-400 leading-relaxed">
                Tell us about your project. We review your goals and reply with a fixed quote and timeline within 24 hours.
              </p>
            </div>

            {/* Direct Founder Reply Guarantee */}
            <div className="rounded-xl bg-[#111115] border border-white/10 p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#3ddc84] font-semibold">
                <Clock className="w-4 h-4" />
                <span>DIRECT FOUNDER SLA</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                You will receive a response directly from Buzdil Mirza, Vedant Satbhai, or Prajjwal Tripathi within <strong>24 hours</strong>.
              </p>
            </div>

            {/* Booking Card (Hidden until real booking link configured) */}
            {SITE_CONFIG.contact.showCalendly && SITE_CONFIG.contact.calendlyUrl && (
              <div className="rounded-xl bg-[#111115] border border-white/10 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-400 uppercase font-semibold">BOOK INTRO CALL</span>
                  <Calendar className="w-4 h-4 text-[#3ddc84]" />
                </div>
                <p className="text-xs text-zinc-400">
                  Pick time directly on our shared calendar to discuss your scope.
                </p>
                <a
                  href={SITE_CONFIG.contact.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-4 py-2 text-xs font-mono text-white hover:bg-[#3ddc84] hover:text-black transition-colors"
                >
                  <span>Open calendar</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* Direct Email */}
            <div className="flex items-center gap-2.5 text-xs font-mono text-zinc-400 pt-1">
              <Mail className="w-4 h-4 text-[#3ddc84]" />
              <span>Or email directly:</span>
              <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-white hover:underline font-semibold">
                {SITE_CONFIG.contact.email}
              </a>
            </div>
          </div>

          {/* Right Column: Clean Short Inquiry Form */}
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="p-8 text-zinc-400 font-mono text-xs">Loading form...</div>}>
              <ContactFormInner />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
