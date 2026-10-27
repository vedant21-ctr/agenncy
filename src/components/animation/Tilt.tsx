"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "./useReducedMotion";

interface TiltProps {
  children: React.ReactNode;
  maxTilt?: number; // 4 to 6 degrees max
  className?: string;
}

export default function Tilt({
  children,
  maxTilt = 5,
  className = "",
}: TiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isTouch, setIsTouch] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const checkTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(checkTouch);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -maxTilt;
    const tiltY = ((x - centerX) / centerX) * maxTilt;

    setRotateX(tiltX);
    setRotateY(tiltY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  if (isTouch || reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", damping: 25, stiffness: 220, mass: 0.15 }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
