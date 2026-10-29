"use client";

export default function SectionBackgrounds() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Deep layered emerald-to-ink gradient background */}
      <div
        className="absolute inset-0 bg-[#09090b]"
        style={{
          backgroundImage: `
            radial-gradient(circle 900px at 80% 25%, rgba(61, 220, 132, 0.18), transparent 70%),
            radial-gradient(circle 700px at 15% 65%, rgba(16, 185, 129, 0.10), transparent 60%),
            radial-gradient(circle 800px at 50% 95%, rgba(61, 220, 132, 0.15), transparent 70%)
          `,
        }}
      />
      {/* Ambient Animated Shimmer Mesh running on GPU Compositor Thread */}
      <div
        className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full blur-[140px] pointer-events-none opacity-25 animate-pulse"
        style={{
          background: "radial-gradient(circle, rgba(61, 220, 132, 0.35) 0%, rgba(16, 185, 129, 0.08) 50%, transparent 70%)",
          animationDuration: "8s",
        }}
      />
      <div
        className="absolute top-[40%] -left-[15%] w-[60vw] h-[60vw] rounded-full blur-[130px] pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.28) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[5%] right-[10%] w-[55vw] h-[55vw] rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(61, 220, 132, 0.3) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
