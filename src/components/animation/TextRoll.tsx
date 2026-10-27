"use client";

interface TextRollProps {
  children: string;
  className?: string;
}

export default function TextRoll({ children, className = "" }: TextRollProps) {
  return (
    <span className={`inline-block overflow-hidden relative group/roll select-none ${className}`}>
      <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/roll:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute top-full left-0 inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/roll:-translate-y-full text-[#ff5500]"
      >
        {children}
      </span>
    </span>
  );
}
