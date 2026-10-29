"use client";

import React from "react";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

/**
 * Clean wrapper component with normal hover states (no pointer tracking / magnetic cursor physics).
 */
export default function Magnetic({
  children,
  className = "",
}: MagneticProps) {
  return <div className={`inline-block ${className}`}>{children}</div>;
}
