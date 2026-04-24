import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { HomepageTrendingItem } from "@/lib/server/homepage";

const PLACEHOLDER_ITEMS = [0, 1, 2];

function SectionHeader({ revealed }: { revealed: boolean }) {
  return (
    <div className={`text-center mb-16 sm:mb-24 md:mb-28 scroll-reveal ${revealed ? "revealed" : ""}`}>
      <p className="section-overline mb-5">Curated</p>
      <h2 className="section-title mb-12">The Must-Have</h2>
      <div className={`section-divider divider-reveal ${revealed ? "revealed" : ""}`} />
      <p
        className="max-w-md mx-auto mt-8 sm:mt-10"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 300,
          fontSize: "15px",
          lineHeight: 1.9,
          color: "#928377",
        }}
      >
        The most sought-after pieces of the moment
      </p>
    </div>
  );
}

function SkeletonCards() {
  return (
    <div className="flex gap-4 sm:gap-6 max-w-6xl mx-auto px-2 sm:px-4 md:px-8">
      {PLACEHOLDER_ITEMS.map((item) => (
        <div
          key={item}
          className="flex-shrink-0 w-[80vw] sm:w-[300px] md:w-[320px] lg:w-[340px] rounded-lg overflow-hidden"
          style={{ background: "#FFFFFF", border: "1px solid rgba(134,103,88,0.12)" }}
        >
          <div
            className="aspect-[3/4]"
            style={{
              background:
                "linear-gradient(110deg, rgba(134,103,88,0.06) 30%, rgba(134,103,88,0.12) 50%, rgba(134,103,88,0.06) 70%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
            }}
          />
          <div className="p-5 sm:p-6" style={{ borderTop: "1px solid rgba(134,103,88,0.1)" }}>
            <div className="h-5 w-3/4 rounded mb-2" style={{ background: "rgba(134,103,88,0.08)" }} />
            <div className="h-3 w-1/2 rounded" style={{ background: "rgba(134,103,88,0.06)" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyCards() {
  return (
    <div className="flex gap-4 sm:gap-6 max-w-6xl mx-auto px-2 sm:px-4 md:px-8">
      {PLACEHOLDER_ITEMS.map((item) => (
        <div
          key={item}
          className="flex-shrink-0 w-[80vw] sm:w-[300px] md:w-[320px] lg:w-[340px] rounded-lg overflow-hidden flex items-center justify-center aspect-[3/4]"
          style={{
            background: "rgba(245,242,238,0.95)",
            border: "1px solid rgba(134,103,88,0.12)",
          }}
        >
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
              fontSize: "11px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#928377",
            }}
          >
            Coming Soon
          </span>
        </div>
      ))}
    </div>
  );
}

export function TrendingNow({
  initialItems,
}: {
  initialItems?: HomepageTrendingItem[];
}) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [forceVisible, setForceVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  useEffect(() => {
    const timeout = window.setTimeout(() => setForceVisible(true), 250);
    return () => window.clearTimeout(timeout);
  }, []);

  const { data: items = [], isLoading, error } = useQuery({
    queryKey: ["trending-items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trending_items")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
    initialData: initialItems,
    staleTime: 60_000,
    retry: 1,
  });

  const hasItems = items.length > 0;
  const isRevealed = isVisible || forceVisible;

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.querySelector(':first-child')?.clientWidth || 320;
    const scrollAmount = cardWidth + 24;
    const newPos = direction === "left" 
      ? scrollRef.current.scrollLeft - scrollAmount 
      : scrollRef.current.scrollLeft + scrollAmount;
    scrollRef.current.scrollTo({ left: newPos, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = scrollRef.current 
    ? scrollPosition < scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10
    : true;

  return (
    <section id="trending-now" className="py-24 sm:py-40 md:py-56 relative" style={{ background: '#E9E4DE', minHeight: '600px' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(146,131,119,0.25), transparent)' }} />

      <div ref={sectionRef} className="container mx-auto px-5 sm:px-6 relative z-10">
        <SectionHeader revealed={isRevealed} />

        {isLoading ? (
          <SkeletonCards />
        ) : !hasItems || error ? (
          <EmptyCards />
        ) : (
        <div className={`relative max-w-6xl mx-auto scroll-reveal-scale ${isRevealed ? 'revealed' : ''}`} style={{ transitionDelay: '0.2s' }}>
          {/* Navigation Arrows */}
          {items.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute -left-2 sm:-left-4 md:left-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-14 sm:w-14 rounded-full transition-all duration-500"
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(134,103,88,0.2)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  opacity: canScrollLeft ? 1 : 0.3,
                }}
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: '#866758' }} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute -right-2 sm:-right-4 md:right-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-14 sm:w-14 rounded-full transition-all duration-500"
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(134,103,88,0.2)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  opacity: canScrollRight ? 1 : 0.3,
                }}
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: '#866758' }} />
              </Button>
            </>
          )}

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="trending-scroll flex gap-4 sm:gap-6 overflow-x-auto px-2 sm:px-4 md:px-8 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            <style>{`.trending-scroll::-webkit-scrollbar { display: none; }`}</style>
            {items.map((item) => (
              <div
                key={item.id}
                className="group flex-shrink-0 w-[80vw] sm:w-[300px] md:w-[320px] lg:w-[340px] rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 snap-start"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(134,103,88,0.12)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.04)';
                }}
              >
                {/* Image */}
                <div className="aspect-[3/4] relative overflow-hidden">
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ padding: '20px', background: '#FFFFFF' }}
                  >
                    <Image
                      src={`${item.image_url}?width=600&quality=75`}
                      alt={item.title || "Luxury item"}
                      className="max-w-full max-h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                      width={340}
                      height={453}
                      unoptimized
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6" style={{ borderTop: '1px solid rgba(134,103,88,0.1)' }}>
                  {item.title && (
                    <h3
                      className="mb-2 line-clamp-2"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 400,
                        fontSize: '18px',
                        lineHeight: 1.4,
                        color: '#291E15',
                      }}
                    >
                      {item.title}
                    </h3>
                  )}
                  {item.source_attribution && (
                    <p
                      className="uppercase"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 500,
                        fontSize: '9px',
                        letterSpacing: '0.2em',
                        color: '#928377',
                      }}
                    >
                      {item.source_attribution}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        )}
      </div>
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
    </section>
  );
}
