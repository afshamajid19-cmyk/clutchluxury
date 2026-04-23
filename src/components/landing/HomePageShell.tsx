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
    <div className="min-h-screen bg-background">
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
    </div>
  );
}
