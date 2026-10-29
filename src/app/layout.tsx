import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_CONFIG } from "@/config/site";
import SmoothScroll from "@/components/animation/SmoothScroll";
import Preloader from "@/components/animation/Preloader";
import ScrollProgress from "@/components/animation/ScrollProgress";
import PageTransition from "@/components/animation/PageTransition";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://growhaus.onrender.com";

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} — Web & Product Development`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.heroSubtext,
  keywords: [
    "GrowHaus",
    "Web Development Agency",
    "Product Development",
    "Next.js Developers",
    "SaaS MVP",
    "Business Automation",
    "AI Workflows",
    "UI UX Design",
  ],
  authors: [{ name: SITE_CONFIG.name, url: siteUrl }],
  creator: SITE_CONFIG.name,
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.heroSubtext,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} Web & Product Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.heroSubtext,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    description: SITE_CONFIG.heroSubtext,
    url: siteUrl,
    email: SITE_CONFIG.contact.email,
    founders: SITE_CONFIG.founders.map((f) => ({
      "@type": "Person",
      name: f.name,
      jobTitle: f.role,
    })),
    areaServed: "Worldwide",
    serviceType: [
      "Custom Websites",
      "Web App & SaaS Development",
      "Product Development",
      "Business Automation & AI",
      "UI/UX Design",
    ],
    priceRange: "$$",
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#09090b] text-[#fafafa] antialiased selection:bg-[#3ddc84] selection:text-[#09090b]">
        {/* Subtle Scroll Progress Indicator */}
        <ScrollProgress />

        {/* Short, skippable preloader (max 1.2s, first visit only) */}
        <Preloader />

        {/* Lenis Smooth Scrolling Engine */}
        <SmoothScroll>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <PageTransition>
              <div className="flex-1">{children}</div>
            </PageTransition>
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
