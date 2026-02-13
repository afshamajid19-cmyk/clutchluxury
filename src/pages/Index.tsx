import { Navigation } from "@/components/landing/Navigation";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TrendingCarousel } from "@/components/landing/TrendingCarousel";
import { About } from "@/components/landing/About";
import { Contact } from "@/components/landing/Contact";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <HowItWorks />
        <TrendingCarousel />
        <About />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
