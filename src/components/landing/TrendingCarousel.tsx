import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";
import { useZohoTrendingItems } from "@/hooks/useZohoTrendingItems";

function getImageUrl(item: { hero_image_url: string | null; id: string }): string | null {
  const url = item.hero_image_url;
  if (!url) return null;
  // If it's a Zoho API URL, proxy it through our edge function
  if (url.includes("zohoapis.com")) {
    const match = url.match(/items\/(\d+)\/image/);
    const itemId = match ? match[1] : item.id;
    return `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/zoho-item-image?item_id=${itemId}`;
  }
  return url;
}

// ====================
// TRENDING ITEMS - UPDATE THIS SECTION TO CHANGE DISPLAYED PRODUCTS
// ====================
//
// This carousel pulls items from your database where availability_status = "trending".
// To add/remove trending items, update the availability_status field in your admin panel.
//
// If no database items are found, the fallback array below is used instead.
// You can also hardcode items here by editing this array directly.
//
/**
 * DAILY TRENDING ITEMS UPDATE GUIDE
 *
 * To update Trending Now section:
 * 1. Prepare images: 800px × 800px, JPG/WebP, under 200KB
 * 2. Upload to: /public/images/trending/
 * 3. Update the fallbackTrendingItems array below with new item details
 * 4. Keep 4-8 items for optimal display
 * 5. Test on preview before publishing
 *
 * TO ADD A NEW ITEM:
 *   Copy one of the objects below, increment the id, and fill in the details.
 *
 * TO REMOVE AN ITEM:
 *   Delete the entire object (including the trailing comma).
 *
 * IMAGE SPECS:
 *   - Dimensions: 800px × 800px (square)
 *   - Format: JPG or WebP
 *   - Max file size: 200KB
 *   - Location: /public/images/trending/
 */
// No fallback items - only Zoho API data
// ====================

export function TrendingCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: settings } = useSettings();

  // Fetch trending items from Zoho API only
  const { data: zohoItems, isLoading: zohoLoading } = useZohoTrendingItems();
  
  const items = zohoItems || [];

  const itemCount = items.length;

  const goToSlide = useCallback((index: number) => {
    if (index < 0) {
      setActiveIndex(itemCount - 1);
    } else if (index >= itemCount) {
      setActiveIndex(0);
    } else {
      setActiveIndex(index);
    }
  }, [itemCount]);

  const handlePrev = () => goToSlide(activeIndex - 1);
  const handleNext = () => goToSlide(activeIndex + 1);

  // Touch/mouse handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setTranslateX(0);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setTranslateX(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 50;
    if (translateX > threshold) {
      handlePrev();
    } else if (translateX < -threshold) {
      handleNext();
    }
    setTranslateX(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, itemCount]);

  if (zohoLoading) {
    return (
      <section id="trending" className="py-40 md:py-56 relative" style={{ background: '#E9E4DE' }}>
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-sm" style={{ color: '#928377' }}>Loading items...</p>
          </div>
        </div>
      </section>
    );
  }

  if (itemCount === 0) {
    return (
      <section id="trending" className="py-40 md:py-56 relative" style={{ background: '#E9E4DE' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(146,131,119,0.25), transparent)' }} />
        <div className="container mx-auto px-6">
          <div className="text-center mb-24 md:mb-28">
            <p className="section-overline mb-5">Curated Selection</p>
            <h2 className="section-title mb-12">Ready to Acquire</h2>
            <div className="section-divider" />
          </div>
          <p className="text-center" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '15px', color: '#928377' }}>
            No items available at the moment. Check back soon.
          </p>
        </div>
      </section>
    );
  }

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const absD = Math.abs(diff);
    
    let scale = 1;
    let rotateY = 0;
    let translateXVal = 0;
    let zIndex = 10;
    let opacity = 1;
    let blur = 0;
    let grayscale = 0;

    if (diff === 0) {
      scale = 1.05;
      zIndex = 30;
      opacity = 1;
      blur = 0;
      grayscale = 0;
    } else if (absD === 1) {
      scale = 0.75;
      rotateY = diff > 0 ? -20 : 20;
      translateXVal = diff > 0 ? 70 : -70;
      zIndex = 20;
      opacity = 0.35;
      blur = 3;
      grayscale = 20;
    } else if (absD === 2) {
      scale = 0.6;
      rotateY = diff > 0 ? -30 : 30;
      translateXVal = diff > 0 ? 130 : -130;
      zIndex = 10;
      opacity = 0.2;
      blur = 5;
      grayscale = 30;
    } else {
      opacity = 0;
      zIndex = 0;
    }

    return {
      transform: `translateX(${translateXVal}%) scale(${scale}) rotateY(${rotateY}deg)`,
      zIndex,
      opacity,
      filter: blur > 0 ? `blur(${blur}px) brightness(0.6) grayscale(${grayscale}%)` : 'none',
    };
  };

  const handleEnquire = (item: typeof items[0]) => {
    const message = encodeURIComponent(`Hi, I'm interested in ${item.brand} ${item.item_name}`);
    if (settings?.whatsapp_link) {
      // Append pre-filled message to existing WhatsApp link
      const baseUrl = settings.whatsapp_link.split('?')[0];
      window.open(`${baseUrl}?text=${message}`, "_blank");
    } else {
      // Fallback: scroll to contact section
      const element = document.querySelector("#contact");
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="trending" 
      className="py-40 md:py-56 overflow-hidden relative"
      style={{ background: '#E9E4DE' }}
    >
      {/* Section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(146,131,119,0.25), transparent)' }} />
      
      {/* Subtle spotlight gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle at center, rgba(134,103,88,0.04), transparent 70%)' 
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-24 md:mb-28">
            <p className="section-overline mb-5 animate-fade-up">
            Curated Selection
          </p>
          <h2 className="section-title animate-fade-up mb-12" style={{ animationDelay: "0.1s" }}>
            Ready to Acquire
          </h2>
          <div className="section-divider animate-fade-up" style={{ animationDelay: "0.15s" }} />
          <p 
            className="max-w-md mx-auto animate-fade-up mt-10"
            style={{ 
              animationDelay: "0.2s", 
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              fontSize: '16px',
              lineHeight: 1.9,
              color: '#565250' 
            }}
          >
            A curated selection from our authenticated inventory
          </p>
        </div>

        {/* 3D Carousel */}
        <div 
          ref={containerRef}
          className="relative carousel-3d h-[520px] md:h-[640px] mx-auto max-w-6xl"
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {items.map((item, index) => {
              const style = getCardStyle(index);
              const isActive = index === activeIndex;

              return (
                <div
                  key={item.id}
                  className="carousel-3d-item absolute w-[300px] md:w-[380px] cursor-grab active:cursor-grabbing select-none"
                  style={{
                    ...style,
                    transition: isDragging ? "none" : "all 0.8s cubic-bezier(0.65, 0, 0.35, 1)",
                  }}
                >
                  <div 
                    className="relative overflow-hidden rounded-lg"
                    style={{
                      background: '#F5F2EE',
                      boxShadow: isActive 
                        ? '0 32px 80px rgba(41,30,21,0.15), 0 0 60px rgba(134,103,88,0.1), inset 0 0 0 1px rgba(134,103,88,0.3)' 
                        : '0 16px 50px -12px rgba(41,30,21,0.1)',
                      border: isActive ? 'none' : '1px solid rgba(134,103,88,0.1)'
                    }}
                  >
                    {/* Ornate corner decorations for active card */}
                    {isActive && (
                      <>
                        <div className="absolute top-0 left-0 w-8 h-8 z-20 rounded-tl-lg" style={{ borderTop: '2px solid rgba(134,103,88,0.5)', borderLeft: '2px solid rgba(134,103,88,0.5)' }} />
                        <div className="absolute top-0 right-0 w-8 h-8 z-20 rounded-tr-lg" style={{ borderTop: '2px solid rgba(134,103,88,0.5)', borderRight: '2px solid rgba(134,103,88,0.5)' }} />
                        <div className="absolute bottom-0 left-0 w-8 h-8 z-20 rounded-bl-lg" style={{ borderBottom: '2px solid rgba(134,103,88,0.5)', borderLeft: '2px solid rgba(134,103,88,0.5)' }} />
                        <div className="absolute bottom-0 right-0 w-8 h-8 z-20 rounded-br-lg" style={{ borderBottom: '2px solid rgba(134,103,88,0.5)', borderRight: '2px solid rgba(134,103,88,0.5)' }} />
                      </>
                    )}

                    {/* Image */}
                    <div className="aspect-[3/4] relative overflow-hidden">
                      {getImageUrl(item) ? (
                        <div 
                          className="w-full h-full flex items-center justify-center"
                          style={{ 
                            padding: '24px',
                            background: 'linear-gradient(to br, #F5F2EE, #E9E4DE)' 
                          }}
                        >
                          <img
                            src={getImageUrl(item) || ''}
                            alt={`${item.brand} ${item.item_name}`}
                            className="max-w-full max-h-full object-contain"
                            loading="lazy"
                            draggable={false}
                          />
                        </div>
                      ) : (
                        <div 
                          className="w-full h-full flex flex-col items-center justify-center"
                          style={{ background: 'linear-gradient(to br, #F5F2EE, #E9E4DE)' }}
                        >
                          <span className="font-display text-7xl md:text-8xl" style={{ color: 'rgba(134,103,88,0.15)', letterSpacing: '0.05em' }}>
                            {item.brand.charAt(0)}
                          </span>
                          <span className="text-[10px] tracking-luxury uppercase mt-4 font-medium" style={{ color: 'rgba(134,103,88,0.25)' }}>
                            {item.brand}
                          </span>
                        </div>
                      )}
                      
                      {/* Gradient overlay */}
                      <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{ 
                          background: 'linear-gradient(to top, rgba(245,242,238,0.98) 0%, rgba(245,242,238,0.7) 40%, transparent 100%)'
                        }}
                      />
                      
                      {/* Trending Badge */}
                      <div className="absolute top-5 left-5 z-10">
                        <span 
                          className="inline-block px-5 py-2.5 rounded-[2px] uppercase"
                          style={{ 
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 500,
                            fontSize: '9px',
                            letterSpacing: '0.2em',
                            background: '#565250',
                            color: '#FFFFFF'
                          }}
                        >
                          Trending
                        </span>
                      </div>

                      {/* Content positioned over gradient */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                        <div 
                          className="uppercase mb-2"
                          style={{ 
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 500,
                            fontSize: '10px',
                            letterSpacing: '0.2em', 
                            color: '#866758' 
                          }}
                        >
                          {item.brand}
                        </div>
                        <div className="w-12 h-px mb-4" style={{ background: 'linear-gradient(to right, rgba(134,103,88,0.5), transparent)' }} />
                        <h3 
                          className="mb-3 line-clamp-2"
                          style={{ 
                            fontFamily: "'Cormorant Garamond', serif",
                            fontWeight: 300,
                            fontSize: 'clamp(18px, 2vw, 24px)',
                            lineHeight: 1.3, 
                            color: '#291E15' 
                          }}
                        >
                          {item.item_name}
                        </h3>
                        <p 
                          className="uppercase mb-6"
                          style={{ 
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 500,
                            fontSize: '9px',
                            letterSpacing: '0.2em', 
                            color: '#928377' 
                          }}
                        >
                          {item.category}
                        </p>
                        
                        {isActive && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEnquire(item);
                            }}
                            className="inline-flex items-center rounded-[2px] uppercase transition-all duration-[400ms] hover:scale-[1.02]"
                            style={{
                              fontFamily: "'Montserrat', sans-serif",
                              fontWeight: 500,
                              fontSize: '10px',
                              letterSpacing: '0.18em',
                              padding: '12px 32px',
                              color: '#FFFFFF',
                              background: '#6B6B6B',
                              border: 'none',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#4A4A4A';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = '#6B6B6B';
                            }}
                          >
                            Enquire
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          {itemCount > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 md:left-20 top-1/2 -translate-y-1/2 z-40 h-[72px] w-[72px] rounded-full transition-all duration-500 group"
                style={{
                  background: 'rgba(245,242,238,0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(134,103,88,0.2)'
                }}
                onClick={handlePrev}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(134,103,88,0.1)';
                  e.currentTarget.style.transform = 'translateY(-50%) translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(245,242,238,0.9)';
                  e.currentTarget.style.transform = 'translateY(-50%)';
                }}
              >
                <ChevronLeft className="h-6 w-6 transition-colors" style={{ color: '#866758' }} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 md:right-20 top-1/2 -translate-y-1/2 z-40 h-[72px] w-[72px] rounded-full transition-all duration-500 group"
                style={{
                  background: 'rgba(245,242,238,0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(134,103,88,0.2)'
                }}
                onClick={handleNext}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(134,103,88,0.1)';
                  e.currentTarget.style.transform = 'translateY(-50%) translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(245,242,238,0.9)';
                  e.currentTarget.style.transform = 'translateY(-50%)';
                }}
              >
                <ChevronRight className="h-6 w-6 transition-colors" style={{ color: '#866758' }} />
              </Button>
            </>
          )}
        </div>

        {/* Dots */}
        {itemCount > 1 && (
          <div className="flex items-center justify-center gap-3 mt-14">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="rounded-full transition-all duration-500"
                style={{
                  width: index === activeIndex ? '40px' : '8px',
                  height: '8px',
                  background: index === activeIndex 
                    ? 'linear-gradient(to right, #928377, #866758)' 
                    : 'rgba(134,103,88,0.25)',
                  boxShadow: index === activeIndex ? '0 0 20px rgba(134,103,88,0.2)' : 'none'
                }}
              />
            ))}
          </div>
        )}

        {/* Instagram Link */}
        {settings?.instagram_url && (
          <div className="text-center mt-18">
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '14px', color: '#565250' }}>
              For daily updates, view the latest on{" "}
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-[400ms] border-b pb-0.5"
                style={{ 
                  color: '#866758',
                  borderColor: 'rgba(134,103,88,0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#6b5345';
                  e.currentTarget.style.borderColor = 'rgba(134,103,88,0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#866758';
                  e.currentTarget.style.borderColor = 'rgba(134,103,88,0.3)';
                }}
              >
                Instagram
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}