"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, ArrowDownLeft, ArrowUpRight, Lock, Unlock, TrendingUp, Bell } from "lucide-react";

export default function FintechAppDemo() {
  const [isCardFrozen, setIsCardFrozen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<"W" | "M" | "Y">("M");

  const transactions = [
    { title: "Supabase Compute", category: "Cloud Infrastructure", amount: "-$142.00", time: "Today 14:20", icon: ArrowUpRight, color: "#CCFF00" },
    { title: "Client Wire (Stripe)", category: "Project Milestone", amount: "+$12,500.00", time: "Yesterday", icon: ArrowDownLeft, color: "#34D399" },
    { title: "Linear Software", category: "Subscription", amount: "-$35.00", time: "Oct 24", icon: ArrowUpRight, color: "#CCFF00" },
    { title: "OpenAI API Usage", category: "AI Workflows", amount: "-$280.40", time: "Oct 22", icon: ArrowUpRight, color: "#CCFF00" },
  ];

  return (
    <div className="w-full flex items-center justify-center p-2 sm:p-4">
      {/* Phone Mockup Frame */}
      <div className="relative w-full max-w-[340px] rounded-[42px] bg-[#000000] p-3.5 shadow-2xl border-4 border-[#23232A] ring-1 ring-white/10">
        {/* Dynamic Island / Notch */}
        <div className="mx-auto h-5 w-24 rounded-full bg-black border border-white/10 flex items-center justify-center mb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#18181B] mr-2" />
          <div className="w-2 h-2 rounded-full bg-blue-500/80" />
        </div>

        {/* Screen Content */}
        <div className="rounded-[30px] bg-[#0C0C10] p-4 text-white overflow-hidden text-xs space-y-4">
          {/* Top Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#CCFF00]/15 flex items-center justify-center text-[#CCFF00] font-bold text-[10px]">
                VA
              </div>
              <div>
                <div className="font-bold text-[11px]">Vault Private</div>
                <div className="text-[9px] text-white/40 font-mono">Founders Tier</div>
              </div>
            </div>
            <button className="rounded-full bg-white/5 p-1.5 text-white/70 hover:text-white">
              <Bell className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Balance Block */}
          <div className="pt-1">
            <span className="text-[10px] text-white/40 font-mono uppercase tracking-wider">Total Liquid Portfolio</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-bold font-mono tracking-tight">$342,890.40</span>
              <span className="text-[10px] text-[#34D399] font-mono flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" /> +14.2%
              </span>
            </div>
          </div>

          {/* Interactive Card Graphic with 3D feel */}
          <motion.div
            animate={{
              filter: isCardFrozen ? "grayscale(90%) contrast(90%)" : "grayscale(0%)",
              scale: isCardFrozen ? 0.98 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="relative aspect-[1.58/1] w-full rounded-xl bg-gradient-to-tr from-[#16161C] via-[#23232E] to-[#121216] border border-white/15 p-4 flex flex-col justify-between shadow-lg overflow-hidden"
          >
            {/* Ambient Lime Accent on card */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#CCFF00]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-widest text-[#CCFF00] font-black">
                VAULT // BLACK
              </span>
              <CreditCard className="w-4 h-4 text-white/70" />
            </div>

            <div className="space-y-1 font-mono">
              <div className="text-[11px] tracking-widest text-white/90">•••• •••• •••• 9012</div>
              <div className="flex items-center justify-between text-[9px] text-white/40">
                <span>FOUNDER ACCESS</span>
                <span>EXP 08/30</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Card Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => setIsCardFrozen(!isCardFrozen)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border font-mono text-[10px] transition-all ${
                isCardFrozen
                  ? "bg-red-500/15 border-red-500/40 text-red-400 font-bold"
                  : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
              }`}
            >
              {isCardFrozen ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3 text-[#CCFF00]" />}
              <span>{isCardFrozen ? "Card Frozen" : "Freeze Card"}</span>
            </button>

            {/* Period selector */}
            <div className="flex items-center rounded-lg bg-white/5 p-0.5 border border-white/5 font-mono text-[9px]">
              {(["W", "M", "Y"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPeriod(p)}
                  className={`px-2 py-1 rounded transition-colors ${
                    selectedPeriod === p ? "bg-[#CCFF00] text-black font-bold" : "text-white/40"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity List */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-[10px] text-white/40 font-mono">
              <span>RECENT TRANSACTIONS</span>
              <span className="text-[#CCFF00] hover:underline cursor-pointer">View All</span>
            </div>

            <div className="space-y-1.5">
              {transactions.map((tx, idx) => {
                const Icon = tx.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${tx.color}15`, color: tx.color }}
                      >
                        <Icon className="w-3 h-3" />
                      </div>
                      <div>
                        <div className="font-semibold text-[10px] text-white">{tx.title}</div>
                        <div className="text-[8px] text-white/40 font-mono">{tx.time}</div>
                      </div>
                    </div>
                    <div className="font-mono text-[10px] font-bold text-white">{tx.amount}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
