"use client";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export default function TestimonialsSlot({ testimonials = [] }: { testimonials?: Testimonial[] }) {
  // Respecting strict rule: NO fake clients, NO fake testimonials.
  // The component is completely hidden until genuine client testimonials exist.
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-[#09090b] text-white border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        <div className="space-y-2">
          <span className="font-mono text-xs text-[#ff5500] uppercase tracking-wider block">
            {"// CLIENT FEEDBACK"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            What Founders Say.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="rounded-2xl bg-[#121216] border border-white/10 p-8 space-y-4">
              <p className="text-base text-zinc-300 leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <div className="font-bold text-white text-sm">{t.author}</div>
                <div className="text-xs font-mono text-zinc-500">
                  {t.role} • {t.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
