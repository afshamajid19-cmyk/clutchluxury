"use client";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navigation } from "@/components/landing/Navigation";
import { ScrollProgress } from "@/components/landing/ScrollProgress";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TrendingCarousel } from "@/components/landing/TrendingCarousel";
import { TrendingNow } from "@/components/landing/TrendingNow";
import { GuidesInsights } from "@/components/landing/GuidesInsights";
import { About } from "@/components/landing/About";
import { Contact } from "@/components/landing/Contact";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [location.hash]);
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Clutch Concierge | Luxury Sourcing Dubai — Brand New Items, Worldwide Delivery</title>
        <meta name="description" content="Clutch is a luxury concierge that sources brand-new Hermes, Chanel, and Rolex for buyers worldwide. Submit a sourcing request. Ships from Dubai." />
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="AE-DU" />
        <meta name="geo.placename" content="Dubai" />
        <link rel="canonical" href="https://www.clutchluxurysourcing.com/" />
        <meta property="og:title" content="Clutch Concierge | Luxury Sourcing Dubai — Brand New Items, Worldwide Delivery" />
        <meta property="og:description" content="Clutch is a luxury concierge that sources brand-new Hermes, Chanel, and Rolex for buyers worldwide. Submit a sourcing request. Ships from Dubai." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.clutchluxurysourcing.com/" />
        <meta property="og:image" content="https://www.clutchluxurysourcing.com/images/clutch-logo-ccc.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "CLUTCH",
            alternateName: "Clutch Luxury Sourcing",
            description: "Clutch is a luxury concierge that sources brand-new Hermes, Chanel, and Rolex for buyers worldwide. Submit a sourcing request. Ships from Dubai.",
            url: "https://www.clutchluxurysourcing.com",
            logo: "https://www.clutchluxurysourcing.com/images/clutch-logo-ccc.jpg",
            foundingDate: "2017",
            address: { "@type": "PostalAddress", addressRegion: "Dubai", addressCountry: "AE" },
            areaServed: { "@type": "Place", name: "Worldwide" },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+971-56-669-7372",
              contactType: "Customer Service",
              availableLanguage: ["English", "Arabic"],
              areaServed: "Worldwide",
            },
            sameAs: [],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Are the bags on CLUTCH authenticated?",
                acceptedAnswer: { "@type": "Answer", text: "Yes, every bag is verified authentic before listing." },
              },
              {
                "@type": "Question",
                name: "Does CLUTCH ship worldwide?",
                acceptedAnswer: { "@type": "Answer", text: "Yes, CLUTCH offers worldwide delivery from Dubai." },
              },
              {
                "@type": "Question",
                name: "What luxury brands does CLUTCH carry?",
                acceptedAnswer: { "@type": "Answer", text: "CLUTCH specialises in Hermès, Chanel, Louis Vuitton and other top-tier luxury brands." },
              },
              {
                "@type": "Question",
                name: "How do I buy a bag from CLUTCH?",
                acceptedAnswer: { "@type": "Answer", text: "Browse the shop or contact us via WhatsApp to enquire about specific pieces." },
              },
            ],
          })}
        </script>
      </Helmet>
      <ScrollProgress />
      <Navigation />
      <main>
        <Hero />
        <HowItWorks />
        <TrendingCarousel />
        <TrendingNow />
        <GuidesInsights />
        <About />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
