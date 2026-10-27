import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/config/site";
import CursorProvider from "@/components/animation/CursorProvider";
import SmoothScroll from "@/components/animation/SmoothScroll";
import Preloader from "@/components/animation/Preloader";
import ScrollProgress from "@/components/animation/ScrollProgress";
import PageTransition from "@/components/animation/PageTransition";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} — Web & Product Development Agency`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.heroSubtext,
  keywords: [
    "Web Development Agency",
    "Product Development",
    "Next.js Developers",
    "SaaS MVP",
    "Workflow Automation",
    "Linear Inspired Design",
    "TypeScript",
  ],
  authors: [{ name: SITE_CONFIG.name, url: "https://kinetic.studio" }],
  creator: SITE_CONFIG.name,
  metadataBase: new URL("https://kinetic.studio"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kinetic.studio",
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.heroSubtext,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} Portfolio`,
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
    url: "https://kinetic.studio",
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
      "Client Product Development",
      "Business Automation",
    ],
  };

  return (
    <html lang="en" className={`${plusJakarta.variable} ${syne.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-[#09090b] text-[#fafafa] selection:bg-[#ff5500] selection:text-white antialiased">
        <CursorProvider>
          <SmoothScroll>
            <Preloader />
            <ScrollProgress />
            <Navbar />
            <PageTransition>
              {children}
            </PageTransition>
            <Footer />
          </SmoothScroll>
        </CursorProvider>
      </body>
    </html>
  );
}
