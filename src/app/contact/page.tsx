"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, Calendar, Clock, Mail, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/config/site";
import QuoteConfigurator from "@/components/ui/QuoteConfigurator";
import TextScramble from "@/components/animation/TextScramble";

const projectTypes = [
  "Custom Website",
  "Web App / SaaS MVP",
  "Business Automation",
  "Product Design Sprint",
  "Other / Advisory",
];

const budgetRanges = [
  "Under $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+",
];

interface FloatingFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  isTextarea?: boolean;
  placeholder?: string;
}

function FloatingField({
  label,
  type = "text",
  value,
  onChange,
  required,
  isTextarea,
  placeholder,
}: FloatingFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;
  const isElevated = isFocused || hasValue;

  return (
    <div className="relative group">
      <div className="relative rounded-2xl bg-[#18181f] border-2 border-white/[0.08] transition-colors focus-within:border-[#ff5500] overflow-hidden">
        <label
          className={`absolute left-4 font-mono text-xs transition-all pointer-events-none duration-200 ${
            isElevated
              ? "top-2 text-[10px] text-[#ff5500] font-bold"
              : "top-4 text-zinc-400 text-xs"
          }`}
        >
          {label} {required && <span className="text-[#ff5500]">*</span>}
        </label>

        {isTextarea ? (
          <textarea
            required={required}
            rows={4}
            value={value}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => onChange(e.target.value)}
            placeholder={isElevated ? placeholder : ""}
            className="w-full bg-transparent px-4 pt-6 pb-3 text-sm text-white focus:outline-none resize-none font-sans"
          />
        ) : (
          <input
            type={type}
            required={required}
            value={value}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => onChange(e.target.value)}
            placeholder={isElevated ? placeholder : ""}
            className="w-full bg-transparent px-4 pt-6 pb-2 text-sm text-white focus:outline-none font-sans"
          />
        )}

        {/* Animated focus underline */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff5500]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0 }}
        />
      </div>
    </div>
  );
}

function ContactFormInner() {
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [selectedType, setSelectedType] = useState<string>("Custom Website");
  const [selectedBudget, setSelectedBudget] = useState<string>("$5,000 – $10,000");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [shake, setShake] = useState(false);

  // Pre-fill from QuoteConfigurator query parameters if passed
  useEffect(() => {
    if (!searchParams) return;
    const typeParam = searchParams.get("type");
    const addonsParam = searchParams.get("addons");
    const estParam = searchParams.get("estimate");
    const speedParam = searchParams.get("speed");

    if (typeParam || addonsParam || estParam) {
      if (typeParam?.includes("Web App")) setSelectedType("Web App / SaaS MVP");
      else if (typeParam?.includes("Automation")) setSelectedType("Business Automation");
      else if (typeParam?.includes("Design")) setSelectedType("Product Design Sprint");
      else setSelectedType("Custom Website");

      let prefilledMsg = "";
      if (typeParam) prefilledMsg += `Target Archetype: ${typeParam}\n`;
      if (addonsParam) prefilledMsg += `Selected Modules: ${addonsParam}\n`;
      if (estParam) prefilledMsg += `Calculated Range: ${estParam}\n`;
      if (speedParam) prefilledMsg += `Pacing: ${speedParam}\n`;
      prefilledMsg += `\nBrief Notes: `;

      setMessage(prefilledMsg);
    }
  }, [searchParams]);

  const triggerShake = (msg: string) => {
    setErrorMsg(msg);
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      triggerShake("Please provide your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      triggerShake("Please provide a valid work email address.");
      return;
    }
    if (!message.trim()) {
      triggerShake("Please describe your project objectives.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <div className="rounded-3xl bg-[#121216] border-2 border-white/10 p-8 sm:p-10 shadow-[6px_6px_0px_#000] relative overflow-hidden">
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="submitted"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="py-16 text-center space-y-4"
          >
            {/* Animated Checkmark SVG */}
            <div className="w-16 h-16 rounded-full bg-[#ff5500]/10 border-2 border-[#ff5500] flex items-center justify-center text-[#ff5500] mx-auto shadow-[3px_3px_0px_#000]">
              <svg
                className="w-8 h-8 text-[#ff5500]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.circle
                  cx="12"
                  cy="12"
                  r="9"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                <motion.path
                  d="m9 12 2 2 4-4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
                />
              </svg>
            </div>

            <h3 className="text-3xl font-black uppercase tracking-tight text-white">
              Inquiry Received
            </h3>
            <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed font-normal">
              Thank you, <strong>{name}</strong>. Our founding partners have received your brief for <em>{selectedType}</em>. We will follow up with an architectural overview within <strong>{SITE_CONFIG.contact.sla}</strong>.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setName("");
                  setEmail("");
                  setCompany("");
                  setMessage("");
                }}
                className="rounded-xl bg-white/10 px-6 py-3 text-xs font-mono font-bold text-white uppercase hover:bg-white/20 transition-colors"
              >
                Submit another inquiry
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            animate={shake ? { x: [-6, 6, -5, 5, -3, 3, 0] } : { x: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight text-white">Project Inquiry</h2>
              <p className="text-xs text-zinc-400 mt-1 font-mono uppercase tracking-wider">
                Direct ingest • Reviewed by Buzdil, Vedant & Prajjwal
              </p>
            </div>

            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl bg-red-500/10 border-2 border-red-500/30 p-3 text-xs text-red-400 font-mono font-bold"
              >
                {errorMsg}
              </motion.div>
            )}

            {/* Project Type Chips */}
            <div className="space-y-2">
              <label className="block text-xs font-mono text-zinc-400 uppercase font-bold tracking-wider">
                What are you looking to build?
              </label>
              <div className="flex flex-wrap gap-2">
                {projectTypes.map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase transition-all ${
                      selectedType === type
                        ? "bg-[#ff5500] text-black font-black border-2 border-black shadow-[2px_2px_0px_#000]"
                        : "bg-[#18181f] border-2 border-white/[0.08] text-zinc-400 hover:text-white"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Floating Fields: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FloatingField
                label="Your Name"
                name="name"
                value={name}
                onChange={setName}
                required
                placeholder="Sarah Jenkins"
              />
              <FloatingField
                label="Work Email"
                name="email"
                type="email"
                value={email}
                onChange={setEmail}
                required
                placeholder="sarah@company.com"
              />
            </div>

            {/* Floating Field: Company */}
            <FloatingField
              label="Company or Current URL"
              name="company"
              value={company}
              onChange={setCompany}
              placeholder="Acme Inc. / https://example.com"
            />

            {/* Budget Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-mono text-zinc-400 uppercase font-bold tracking-wider">
                Target Project Budget
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {budgetRanges.map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setSelectedBudget(b)}
                    className={`p-2.5 rounded-xl text-xs font-mono text-center border-2 transition-all ${
                      selectedBudget === b
                        ? "bg-[#ccff00] text-black border-black font-black shadow-[2px_2px_0px_#000]"
                        : "bg-[#18181f] border-white/[0.08] text-zinc-400 hover:text-white"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Floating Field: Message */}
            <FloatingField
              label="Project Scope & Objectives"
              name="message"
              value={message}
              onChange={setMessage}
              required
              isTextarea
              placeholder="Briefly describe what you're building, target timeline, and technical requirements..."
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#ff5500] py-4 text-xs font-mono font-black text-black uppercase tracking-wider hover:bg-white active:scale-[0.99] disabled:opacity-50 transition-all shadow-[4px_4px_0px_#fff] border-2 border-black"
            >
              {isSubmitting ? (
                <span>Ingesting inquiry...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Project Brief</span>
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-36 pb-24 bg-[#09090b] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-24">
        {/* Main Ingest Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Booking Card */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-xs text-[#ff5500] uppercase font-bold tracking-wider block">
                <TextScramble text="// START A PROJECT" />
              </span>
              <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                LET&apos;S BUILD TOGETHER.
              </h1>
              <p className="text-base text-zinc-400 leading-relaxed font-normal">
                Tell us about what you&apos;re looking to launch. We will review your goals and provide an architectural roadmap, fixed-price quote, and timeline in 24 hours.
              </p>
            </div>

            {/* Direct Partner Response Guarantee */}
            <div className="rounded-2xl bg-[#121216] border-2 border-white/10 p-6 space-y-2 shadow-[4px_4px_0px_#000]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#ff5500] font-bold">
                <Clock className="w-4 h-4" />
                <span>DIRECT FOUNDER SLA</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                You will receive a response directly from Buzdil Mirza, Vedant Satbhai, or Prajjwal Tripathi within <strong>{SITE_CONFIG.contact.sla}</strong>.
              </p>
            </div>

            {/* Calendly Booking Card (Conditional - only shown if configured) */}
            {SITE_CONFIG.contact.showCalendly && SITE_CONFIG.contact.calendlyUrl && (
              <div className="rounded-2xl bg-[#121216] border-2 border-white/10 p-6 space-y-4 shadow-[4px_4px_0px_#000]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-400 uppercase font-bold">PREFER A QUICK CALL?</span>
                  <Calendar className="w-4 h-4 text-[#ff5500]" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Book a 20-Min Intro Call
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed font-normal">
                    Grab time directly on our shared calendar to discuss requirements live.
                  </p>
                </div>

                <a
                  href={SITE_CONFIG.contact.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 px-4 py-2.5 text-xs font-mono text-white hover:bg-[#ff5500] hover:text-black transition-colors"
                >
                  <span>Open Calendly calendar</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* Direct Email Contact */}
            <div className="flex items-center gap-2.5 text-xs font-mono text-zinc-400 pt-1">
              <Mail className="w-4 h-4 text-[#ff5500]" />
              <span>Or email directly:</span>
              <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-white hover:underline font-bold">
                {SITE_CONFIG.contact.email}
              </a>
            </div>
          </div>

          {/* Right Column: Clean Inquiry Form */}
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="p-8 text-zinc-400 font-mono text-xs">Loading brief ingest...</div>}>
              <ContactFormInner />
            </Suspense>
          </div>
        </div>

        {/* Embedded Interactive Build Your Quote Section */}
        <div className="pt-12 border-t-2 border-white/10">
          <QuoteConfigurator />
        </div>
      </div>
    </main>
  );
}
