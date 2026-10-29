import HomeHero from "@/components/home/HomeHero";
import BuildShowcase from "@/components/effects/BuildShowcase";
import FeaturedWork from "@/components/home/FeaturedWork";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import TeamSection from "@/components/home/TeamSection";
import FaqSection from "@/components/home/FaqSection";
import FinalCta from "@/components/home/FinalCta";
import SectionBackgrounds from "@/components/effects/SectionBackgrounds";
import ScrollVelocityMarquee from "@/components/effects/ScrollVelocityMarquee";
import PersistentCanvas from "@/components/three/PersistentCanvas";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* 0. Layered Ambient Section Shaders & Deep Gradient */}
      <SectionBackgrounds />

      {/* 0. Persistent Fixed 3D Scene Behind Content */}
      <PersistentCanvas />

      {/* Foreground Content Layer: Elevated so text is 100% readable over 3D background */}
      <div className="relative z-10">
        {/* 1. Hero */}
        <HomeHero />

        {/* Marquee Strip */}
        <ScrollVelocityMarquee />

        {/* 2. What we can build */}
        <BuildShowcase />

        {/* 3. Featured work gallery */}
        <FeaturedWork />

        {/* Marquee Strip */}
        <ScrollVelocityMarquee />

        {/* 4. Services */}
        <ServicesSection />

        {/* 5. How we work */}
        <ProcessSection />

        {/* 6. Why GrowHaus */}
        <WhyUsSection />

        {/* 7. Team */}
        <TeamSection />

        {/* 8. FAQ */}
        <FaqSection />

        {/* 10. Final CTA */}
        <FinalCta />
      </div>
    </main>
  );
}
