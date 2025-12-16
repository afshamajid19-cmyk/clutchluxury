import { useState } from "react";
import { Navigation } from "@/components/landing/Navigation";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TrendingCarousel } from "@/components/landing/TrendingCarousel";
import { AvailableItems } from "@/components/landing/AvailableItems";
import { About } from "@/components/landing/About";
import { RequestForm } from "@/components/landing/RequestForm";
import { Contact } from "@/components/landing/Contact";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { useItems, type Item } from "@/hooks/useItems";

const Index = () => {
  const [prefilledItem, setPrefilledItem] = useState<Item | null>(null);

  // Fetch trending items for carousel
  const { data: trendingItems } = useItems({ availability_status: "trending" });

  const handleEnquire = (item: Item) => {
    setPrefilledItem(item);
    // Scroll to request form
    const element = document.querySelector("#request");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClearPrefill = () => {
    setPrefilledItem(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <HowItWorks />
        
        {/* Trending Carousel - only trending items */}
        {trendingItems && trendingItems.length > 0 && (
          <TrendingCarousel items={trendingItems} onEnquire={handleEnquire} />
        )}
        
        {/* Available Items Grid */}
        <AvailableItems onEnquire={handleEnquire} />
        
        <About />
        <RequestForm
          prefilledItem={prefilledItem}
          onClearPrefill={handleClearPrefill}
        />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
