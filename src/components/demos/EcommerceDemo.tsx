"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Star, X, Check, Shield, RotateCw } from "lucide-react";

interface Colorway {
  name: string;
  hex: string;
  accent: string;
  imageBg: string;
}

export default function EcommerceDemo() {
  const colorways: Colorway[] = [
    { name: "Obsidian Onyx", hex: "#18181B", accent: "#CCFF00", imageBg: "from-zinc-900 to-black" },
    { name: "Raw Titanium", hex: "#71717A", accent: "#E4E4E7", imageBg: "from-zinc-800 to-zinc-950" },
    { name: "Cyber Volt", hex: "#CCFF00", accent: "#000000", imageBg: "from-lime-950/60 to-black" },
  ];

  const [selectedColor, setSelectedColor] = useState<Colorway>(colorways[0]);
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const handleAddToCart = () => {
    setCartCount((c) => c + 1);
    setIsAddedRecently(true);
    setIsCartOpen(true);
    setTimeout(() => setIsAddedRecently(false), 2000);
  };

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-[#0A0A0E] shadow-2xl font-sans text-xs">
      {/* Navigation Bar inside Demo */}
      <div className="flex items-center justify-between border-b border-white/5 bg-[#121217] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-black tracking-widest text-[#CCFF00]">AURA // 01</span>
          <span className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] font-mono text-white/40">COLLECTION 2026</span>
        </div>

        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="relative flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-white hover:bg-white/10 transition-colors"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-[#CCFF00]" />
          <span className="font-mono text-[11px]">Bag ({cartCount})</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#CCFF00]" />
          )}
        </button>
      </div>

      {/* Product Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 p-5 sm:p-7 gap-6 items-center">
        {/* Interactive 3D Mockup Container */}
        <motion.div
          key={selectedColor.name}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className={`relative aspect-square w-full rounded-2xl bg-gradient-to-br ${selectedColor.imageBg} border border-white/10 flex flex-col items-center justify-center p-6 overflow-hidden group`}
        >
          <div className="absolute top-3 left-3 flex items-center gap-1 rounded bg-black/50 px-2 py-1 text-[9px] font-mono text-white/70 backdrop-blur-md">
            <RotateCw className="w-3 h-3 text-[#CCFF00] animate-spin" style={{ animationDuration: "10s" }} />
            <span>360° ACOUSTIC BAFFLE</span>
          </div>

          {/* Minimalist Acoustic Speaker Cylinder Representation */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
            {/* Outer sound rings */}
            <div className="absolute inset-0 rounded-full border border-white/10 animate-ping opacity-25" style={{ animationDuration: "3s" }} />
            <div className="absolute -inset-4 rounded-full border border-[#CCFF00]/20" />

            {/* Core Cylinder */}
            <div
              className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full shadow-2xl flex items-center justify-center transition-colors duration-500"
              style={{
                backgroundColor: selectedColor.hex === "#CCFF00" ? "#1A2200" : selectedColor.hex,
                border: `2px solid ${selectedColor.accent}`,
                boxShadow: `0 0 50px -10px ${selectedColor.accent}33`,
              }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/20 flex items-center justify-center bg-black/40">
                <div
                  className="w-8 h-8 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: selectedColor.accent }}
                />
              </div>
            </div>
          </div>

          <div className="absolute bottom-3 text-center">
            <span className="font-mono text-[10px] text-white/50 tracking-widest uppercase">
              Selected Finish: {selectedColor.name}
            </span>
          </div>
        </motion.div>

        {/* Product Details & Actions */}
        <div className="space-y-4">
          <div className="flex items-center gap-1 text-[#CCFF00]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
            <span className="text-white/40 text-[10px] ml-1.5 font-mono">(4.9/5 • 128 Reviews)</span>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Aura Resonator One
            </h3>
            <p className="text-white/50 text-[11px] mt-1 leading-relaxed">
              Precision-milled aerospace aluminum acoustic driver. Designed for tactile spatial sound without visual clutter.
            </p>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-mono font-bold text-[#CCFF00]">₹39,999</span>
            <span className="text-white/30 line-through text-xs">₹45,000</span>
            <span className="rounded bg-[#CCFF00]/10 text-[#CCFF00] px-2 py-0.5 text-[10px] font-mono">
              PRE-ORDER TIER 1
            </span>
          </div>

          {/* Colorway selector buttons */}
          <div className="space-y-1.5 pt-2">
            <span className="text-[11px] font-mono text-white/60 uppercase tracking-wider">
              Finish selection:
            </span>
            <div className="flex gap-2">
              {colorways.map((cw) => (
                <button
                  key={cw.name}
                  onClick={() => setSelectedColor(cw)}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 border transition-all ${
                    selectedColor.name === cw.name
                      ? "border-[#CCFF00] bg-white/5 text-white"
                      : "border-white/10 text-white/40 hover:text-white"
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-white/30"
                    style={{ backgroundColor: cw.hex }}
                  />
                  <span className="text-[10px] font-mono">{cw.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* CTA Add to Bag */}
          <div className="pt-2">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#CCFF00] py-3 text-black font-bold tracking-wider uppercase text-[11px] hover:bg-[#B3E600] active:scale-[0.98] transition-all shadow-lg shadow-[#CCFF00]/10"
            >
              {isAddedRecently ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added To Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Bag • ₹39,999</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-4 text-[10px] text-white/40 pt-1 font-mono">
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-[#CCFF00]" />
              <span>3-Year Warranty</span>
            </div>
            <span>•</span>
            <span>All-India Express Delivery</span>
          </div>
        </div>
      </div>

      {/* Slide-over Cart Drawer Modal */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="absolute inset-y-0 right-0 w-full sm:w-80 bg-[#14141A] border-l border-white/10 p-5 shadow-2xl z-30 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  Your Bag ({cartCount})
                </span>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="rounded p-1 text-white/60 hover:text-white hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {cartCount === 0 ? (
                <div className="py-12 text-center text-white/40 text-[11px]">
                  Your bag is currently empty.
                </div>
              ) : (
                <div className="py-4 space-y-3">
                  <div className="flex items-center gap-3 bg-white/5 rounded-lg p-2.5">
                    <div
                      className="w-10 h-10 rounded border border-white/10 flex items-center justify-center"
                      style={{ backgroundColor: selectedColor.hex }}
                    >
                      <div className="w-3 h-3 rounded-full bg-[#CCFF00]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-white text-[11px]">Aura Resonator One</div>
                      <div className="text-[10px] text-white/40 font-mono">{selectedColor.name}</div>
                    </div>
                    <div className="font-mono font-bold text-[#CCFF00]">₹39,999</div>
                  </div>
                </div>
              )}
            </div>

            {cartCount > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex justify-between text-white font-mono text-xs">
                  <span>Subtotal:</span>
                  <span className="text-[#CCFF00] font-bold">₹{(cartCount * 39999).toLocaleString("en-IN")}</span>
                </div>
                <button
                  onClick={() => alert("Concept Checkout Triggered — Built by GrowHaus")}
                  className="w-full rounded bg-white text-black font-bold py-2.5 text-[11px] uppercase tracking-wider hover:bg-[#CCFF00] transition-colors"
                >
                  Checkout (Demo)
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
