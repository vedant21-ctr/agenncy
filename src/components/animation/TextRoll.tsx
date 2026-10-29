"use client";

import React from "react";

export default function TextRoll({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className={`relative inline-block overflow-hidden group/roll ${className}`}>
      <span className="inline-block transition-transform duration-300 ease-out group-hover/roll:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute top-full left-0 inline-block transition-transform duration-300 ease-out group-hover/roll:-translate-y-full text-[#3ddc84]"
      >
        {children}
      </span>
    </span>
  );
}
