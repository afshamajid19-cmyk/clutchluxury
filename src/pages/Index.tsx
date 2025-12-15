import { useState } from "react";
import { Navigation } from "@/components/landing/Navigation";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TrendingItems } from "@/components/landing/TrendingItems";
import { About } from "@/components/landing/About";
import { RequestForm } from "@/components/landing/RequestForm";
import { Contact } from "@/components/landing/Contact";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import type { Item } from "@/hooks/useItems";

const Index = () => {
  const [prefilledItem, setPrefilledItem] = useState<Item | null>(null);

  const handleEnquire = (item: Item) => {
    setPrefilledItem(item);
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
        <TrendingItems onEnquire={handleEnquire} />
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
