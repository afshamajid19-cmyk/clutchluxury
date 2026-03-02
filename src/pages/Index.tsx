import { Navigation } from "@/components/landing/Navigation";
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
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Clutch – Luxury Sourcing | Dubai's Premier Personal Shopping Service</title>
        <meta name="description" content="Attaining the unattainable. Clutch is Dubai's premier luxury personal shopping and sourcing service. Hermès, Chanel, and more. International shipping. Since 2017." />
        <meta name="keywords" content="luxury sourcing, personal shopping, Dubai, Hermès, Chanel, Rolex, luxury bags, authenticated luxury" />
        <link rel="canonical" href="https://clutchluxury.lovable.app" />
        <meta property="og:title" content="Clutch – Luxury Sourcing" />
        <meta property="og:description" content="Attaining the unattainable. Dubai's premier luxury personal shopping and sourcing service." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://clutchluxury.lovable.app" />
        <meta property="og:image" content="/images/clutch-logo-ccc.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Clutch Concierge",
            alternateName: "Clutch",
            description: "Luxury personal shopping and sourcing service based in Dubai, specializing in rare Hermès bags and designer pieces",
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
