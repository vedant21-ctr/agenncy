"use client";

import React from "react";

interface TiltProps {
  children: React.ReactNode;
  maxTilt?: number;
  className?: string;
}

/**
 * Clean card wrapper with subtle hover elevation (no mouse-tracking effects).
 */
export default function Tilt({
  children,
  className = "",
}: TiltProps) {
  return (
    <div
      className={`transition-transform duration-300 ease-out hover:-translate-y-1 ${className}`}
    >
      {children}
    </div>
  );
}
