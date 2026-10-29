"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import GrowHausLogo from "@/components/ui/GrowHausLogo";

export default function NotFound() {
  return (
    <main className="min-h-screen pt-36 pb-24 bg-[#09090b] text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <GrowHausLogo size="lg" />
        </div>

        <div className="space-y-3">
          <div className="font-mono text-xs text-[#3ddc84] uppercase tracking-wider font-semibold">
            ERROR 404
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Page Not Found.
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-sm mx-auto">
            This page does not exist or has been moved. You can head back to our homepage to explore what we build.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#3ddc84] px-6 py-3 font-mono text-xs font-bold text-black uppercase tracking-wider hover:bg-[#34c776] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
