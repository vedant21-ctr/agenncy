"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CursorContextType {
  cursorText: string;
  cursorVariant: "default" | "project" | "drag" | "play" | "open" | "button";
  setCursorText: (text: string) => void;
  setCursorVariant: (variant: "default" | "project" | "drag" | "play" | "open" | "button") => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorText: "",
  cursorVariant: "default",
  setCursorText: () => {},
  setCursorVariant: () => {},
});

export const useCursor = () => useContext(CursorContext);

export default function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<
    "default" | "project" | "drag" | "play" | "open" | "button"
  >("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for lagging outer ring
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointers and no reduced motion
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!finePointer || prefersReducedMotion) {
      setIsTouch(true);
      return;
    }

    setIsTouch(false);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Declarative data-cursor attribute support on hover
    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (target) {
        const text = target.getAttribute("data-cursor") || "";
        const variant = target.getAttribute("data-cursor-variant") || "default";
        setCursorText(text);
        setCursorVariant(variant as CursorContextType["cursorVariant"]);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (target) {
        setCursorText("");
        setCursorVariant("default");
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouch) {
    return <>{children}</>;
  }

  const isExpanded = cursorText.length > 0 || cursorVariant !== "default";

  return (
    <CursorContext.Provider
      value={{ cursorText, cursorVariant, setCursorText, setCursorVariant }}
    >
      {children}

      {/* Custom Cursor Overlay */}
      {isVisible && (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
          {/* Small Center Dot */}
          <motion.div
            style={{
              x: mouseX,
              y: mouseY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            className="w-2 h-2 rounded-full bg-[#ff5500] fixed top-0 left-0"
            animate={{
              scale: isExpanded ? 0 : 1,
              opacity: isExpanded ? 0 : 1,
            }}
            transition={{ duration: 0.15 }}
          />

          {/* Trailing Outer Ring / Badge */}
          <motion.div
            style={{
              x: smoothX,
              y: smoothY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            className={`fixed top-0 left-0 rounded-full flex items-center justify-center font-mono font-bold tracking-wider uppercase transition-colors duration-200 ${
              isExpanded
                ? "bg-[#ff5500] text-black border border-black shadow-[2px_2px_0px_#000]"
                : "border border-white/50 bg-white/5 backdrop-blur-[1px]"
            }`}
            animate={{
              width: cursorText ? 84 : isExpanded ? 52 : 36,
              height: cursorText ? 84 : isExpanded ? 52 : 36,
              scale: isExpanded ? 1.05 : 1,
            }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {cursorText && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-[11px] font-black text-black select-none pointer-events-none text-center px-1"
              >
                {cursorText}
              </motion.span>
            )}
          </motion.div>
        </div>
      )}
    </CursorContext.Provider>
  );
}
