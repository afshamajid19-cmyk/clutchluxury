"use client";

import dynamic from "next/dynamic";
import { Navigation } from "@/components/landing/Navigation";
import { ScrollProgress } from "@/components/landing/ScrollProgress";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { GuidesInsights } from "@/components/landing/GuidesInsights";
import { About } from "@/components/landing/About";
import { Contact } from "@/components/landing/Contact";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { MessageCircle } from "lucide-react";
import type {
  HomepageSettings,
  HomepageTrendingItem,
  HomepageZohoItem,
} from "@/lib/server/homepage";

const TrendingCarousel = dynamic(
  () =>
    import("@/components/landing/TrendingCarousel").then((module) => ({
      default: module.TrendingCarousel,
    })),
  {
    loading: () => (
      <section
        id="trending"
        className="py-40 md:py-56"
        style={{ background: "#E9E4DE" }}
      />
    ),
  },
);

const TrendingNow = dynamic(
  () =>
    import("@/components/landing/TrendingNow").then((module) => ({
      default: module.TrendingNow,
    })),
  {
    loading: () => (
      <section
        id="trending-now"
        className="py-24 sm:py-40 md:py-56"
        style={{ background: "#E9E4DE" }}
      />
    ),
  },
);

type HomePageShellProps = {
  settings: HomepageSettings | null;
  trendingItems: HomepageTrendingItem[];
  zohoItems: HomepageZohoItem[];
};

export function HomePageShell({
  settings,
  trendingItems,
  zohoItems,
}: HomePageShellProps) {
  return (
    <div className="min-h-screen bg-background pb-[80px] md:pb-0 relative">
      <ScrollProgress />
      <Navigation />
      <main>
        <Hero settings={settings} />
        <HowItWorks />
        <TrendingCarousel initialItems={zohoItems} />
        <TrendingNow initialItems={trendingItems} />
        <GuidesInsights />
        <About />
        <Contact settings={settings} />
        <FAQ />
      </main>
      <Footer settings={settings} />

      {/* Mobile Sticky Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1A1A1A] border-t border-white/10 px-4 py-3 flex gap-3 shadow-[0_-8px_30px_rgba(0,0,0,0.4)]">
        <button
          onClick={() => {
            if (settings?.whatsapp_link) {
              window.open(settings.whatsapp_link, "_blank");
            }
          }}
          className="flex-1 flex items-center justify-center gap-2 h-12 bg-transparent text-white border border-white/30 rounded-[2px] uppercase transition-colors hover:bg-white/10 active:bg-white/20"
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontWeight: 500,
            fontSize: '11px',
            letterSpacing: '0.15em',
          }}
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </button>
        <button
          onClick={() => {
            const element = document.querySelector("#contact");
            if (element) element.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex-1 flex items-center justify-center gap-2 h-12 bg-white text-black rounded-[2px] uppercase transition-colors hover:bg-gray-100 active:bg-gray-200"
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontWeight: 500,
            fontSize: '11px',
            letterSpacing: '0.15em',
          }}
        >
          Request
        </button>
      </div>
    </div>
  );
}
