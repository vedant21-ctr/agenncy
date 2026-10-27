import HomeHero from "@/components/home/HomeHero";
import ScrollHighlightStatement from "@/components/home/ScrollHighlightStatement";
import TechMarqueeStrip from "@/components/home/TechMarqueeStrip";
import ShowcaseCenterpiece from "@/components/home/ShowcaseCenterpiece";
import PinnedServices from "@/components/home/PinnedServices";
import QuoteConfigurator from "@/components/ui/QuoteConfigurator";
import ProcessSection from "@/components/home/ProcessSection";
import TechStackWall from "@/components/home/TechStackWall";
import WhyUsSection from "@/components/home/WhyUsSection";
import TeamSection from "@/components/home/TeamSection";
import PricingSection from "@/components/home/PricingSection";
import TestimonialsSlot from "@/components/home/TestimonialsSlot";
import FaqSection from "@/components/home/FaqSection";
import FinalCta from "@/components/home/FinalCta";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090b]">
      {/* 1. Loud Editorial Hero with Draggable Stickers */}
      <HomeHero />

      {/* 2. Scroll Velocity Marquee Strip */}
      <TechMarqueeStrip />

      {/* 3. Progressive Scroll-Scrubbed Statement */}
      <ScrollHighlightStatement />

      {/* 4. Showcase Centerpiece (Giant Typography List with Floating Preview + Grid) */}
      <ShowcaseCenterpiece />

      {/* 5. Pinned Services 01-05 Swapper */}
      <PinnedServices />

      {/* 6. Interactive Scope & Ballpark Quote Configurator */}
      <section className="py-24 sm:py-32 max-w-7xl mx-auto px-6 sm:px-8 border-b-2 border-white/10">
        <QuoteConfigurator />
      </section>

      {/* 7. Process Timeline with SVG Scroll-Driven Drawing Line */}
      <ProcessSection />

      {/* 8. Interactive Tech Stack Wall */}
      <TechStackWall />

      {/* 9. Foundational Studio Values */}
      <WhyUsSection />

      {/* 10. Founding Partners (Buzdil, Vedant, Prajjwal) with 3D Tilt & Fun Fact */}
      <TeamSection />

      {/* 11. Transparent Confirmed "From" Pricing */}
      <PricingSection />

      {/* 12. Verified Reviews Slot */}
      <TestimonialsSlot />

      {/* 13. Frequently Asked Questions */}
      <FaqSection />

      {/* 14. Magnetic Final CTA */}
      <FinalCta />
    </main>
  );
}
