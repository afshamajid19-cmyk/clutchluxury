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
        <title>CLUTCH | Authenticated Pre-Owned Luxury Bags | Hermès, Chanel & More – Dubai</title>
        <meta name="description" content="Shop authenticated pre-owned Hermès, Chanel, and luxury handbags at CLUTCH. Transparent pricing, expert authentication, and curated selections for discerning buyers." />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="luxury sourcing, personal shopping, Dubai, Hermès, Chanel, Rolex, luxury bags, authenticated luxury, pre-owned luxury, Birkin, Kelly" />
        <link rel="canonical" href="https://clutchluxury.lovable.app" />
        <meta property="og:title" content="CLUTCH | Authenticated Pre-Owned Luxury Bags | Hermès, Chanel & More" />
        <meta property="og:description" content="Shop authenticated pre-owned Hermès, Chanel, and luxury handbags at CLUTCH. Transparent pricing, expert authentication, and curated selections for discerning buyers." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://clutchluxury.lovable.app" />
        <meta property="og:image" content="/images/clutch-logo-ccc.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "CLUTCH",
            alternateName: "Clutch Luxury Sourcing",
            description: "Authenticated pre-owned luxury handbags and accessories. Specializing in Hermès Birkin, Kelly, Chanel, and more. Based in Dubai with worldwide shipping.",
            url: "https://clutchluxury.lovable.app",
            logo: "/images/clutch-logo-ccc.jpg",
            foundingDate: "2017",
            address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+971-56-669-7372",
              contactType: "Customer Service",
              availableLanguage: ["English", "Arabic"],
              areaServed: "Worldwide",
            },
            serviceType: ["Luxury Shopping", "Personal Shopper", "Concierge Service", "Designer Bag Sourcing"],
            areaServed: { "@type": "Place", name: "Worldwide" },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What do you source?",
                acceptedAnswer: { "@type": "Answer", text: "We source luxury items from prestigious maisons including Hermès, Chanel, Rolex, Louis Vuitton, Cartier, Dior, and many more." },
              },
              {
                "@type": "Question",
                name: "How long does sourcing take?",
                acceptedAnswer: { "@type": "Answer", text: "Timelines vary based on item availability and rarity. Common pieces may take 1–2 weeks, while highly sought-after or limited items can take longer." },
              },
              {
                "@type": "Question",
                name: "Do you ship internationally?",
                acceptedAnswer: { "@type": "Answer", text: "Yes, we ship worldwide to over 50 countries. All shipments are fully insured and include tracking." },
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
