import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TrendingNow() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: items } = useQuery({
    queryKey: ["trending-items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trending_items")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  if (!items || items.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 320;
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
    <section id="trending-now" className="py-40 md:py-56 relative" style={{ background: '#E9E4DE' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(146,131,119,0.25), transparent)' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24 md:mb-28">
          <p className="section-overline mb-5">Curated</p>
          <h2 className="section-title mb-12">The Must-Have</h2>
          <div className="section-divider" />
          <p
            className="max-w-md mx-auto mt-10"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              fontSize: '16px',
              lineHeight: 1.9,
              color: '#928377',
            }}
          >
            The most sought-after pieces of the moment
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Arrows */}
          {items.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute -left-4 md:left-0 top-1/2 -translate-y-1/2 z-20 h-14 w-14 rounded-full transition-all duration-500"
                style={{
                  background: 'rgba(245,242,238,0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(134,103,88,0.2)',
                  opacity: canScrollLeft ? 1 : 0.3,
                }}
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
              >
                <ChevronLeft className="h-5 w-5" style={{ color: '#866758' }} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 z-20 h-14 w-14 rounded-full transition-all duration-500"
                style={{
                  background: 'rgba(245,242,238,0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(134,103,88,0.2)',
                  opacity: canScrollRight ? 1 : 0.3,
                }}
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
              >
                <ChevronRight className="h-5 w-5" style={{ color: '#866758' }} />
              </Button>
            </>
          )}

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-2 md:px-8 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="group flex-shrink-0 w-[300px] md:w-[380px] rounded-lg overflow-hidden transition-all duration-[400ms] hover:-translate-y-2 snap-start"
                style={{
                  background: '#F5F2EE',
                  border: '1px solid rgba(134,103,88,0.15)',
                  boxShadow: '0 16px 50px -12px rgba(41,30,21,0.1)',
                }}
              >
                {/* Image — same aspect ratio & fitting as Ready to Acquire */}
                <div className="aspect-[3/4] relative overflow-hidden">
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      padding: '24px',
                      background: 'linear-gradient(to br, #F5F2EE, #E9E4DE)',
                    }}
                  >
                    <img
                      src={item.image_url}
                      alt={item.title || "Luxury item"}
                      className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to top, rgba(245,242,238,0.98) 0%, rgba(245,242,238,0.7) 40%, transparent 100%)',
                    }}
                  />

                  {/* Content positioned over gradient */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                    {item.title && (
                      <>
                        <div className="w-12 h-px mb-4" style={{ background: 'linear-gradient(to right, rgba(134,103,88,0.5), transparent)' }} />
                        <h3
                          className="mb-3 line-clamp-2"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontWeight: 300,
                            fontSize: 'clamp(18px, 2vw, 24px)',
                            lineHeight: 1.3,
                            color: '#291E15',
                          }}
                        >
                          {item.title}
                        </h3>
                      </>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
