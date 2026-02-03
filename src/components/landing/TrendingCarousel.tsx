import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Item } from "@/hooks/useItems";
import { useSettings } from "@/hooks/useSettings";

interface TrendingCarouselProps {
  items: Item[];
  onEnquire: (item: Item) => void;
}

export function TrendingCarousel({ items, onEnquire }: TrendingCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: settings } = useSettings();

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

  if (itemCount === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-muted-foreground text-sm">No trending items at the moment.</p>
      </div>
    );
  }

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const absD = Math.abs(diff);
    
    // Base values
    let scale = 1;
    let rotateY = 0;
    let translateXVal = 0;
    let zIndex = 10;
    let opacity = 1;
    let blur = 0;
    let grayscale = 0;

    if (diff === 0) {
      // Center card - Royal treatment
      scale = 1.05;
      zIndex = 30;
      opacity = 1;
      blur = 0;
      grayscale = 0;
    } else if (absD === 1) {
      // Adjacent cards
      scale = 0.75;
      rotateY = diff > 0 ? -20 : 20;
      translateXVal = diff > 0 ? 70 : -70;
      zIndex = 20;
      opacity = 0.35;
      blur = 3;
      grayscale = 20;
    } else if (absD === 2) {
      // Far cards
      scale = 0.6;
      rotateY = diff > 0 ? -30 : 30;
      translateXVal = diff > 0 ? 130 : -130;
      zIndex = 10;
      opacity = 0.2;
      blur = 5;
      grayscale = 30;
    } else {
      // Hidden cards
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

  return (
    <section 
      id="trending" 
      className="py-32 md:py-44 overflow-hidden relative"
      style={{ background: '#151210' }}
    >
      {/* Spotlight gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle at center, rgba(139,127,116,0.05), transparent 70%)' 
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 md:mb-24">
          <p className="section-overline mb-5 animate-fade-up">
            Curated Selection
          </p>
          <h2 className="section-title animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Trending Now
          </h2>
          <div className="section-divider animate-fade-up" style={{ animationDelay: "0.15s" }} />
          <p 
            className="text-[16px] max-w-md mx-auto animate-fade-up font-light mt-8"
            style={{ animationDelay: "0.2s", color: 'rgba(245,239,224,0.7)' }}
          >
            The most sought-after pieces of the moment
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
                      background: '#241E1A',
                      boxShadow: isActive 
                        ? '0 32px 80px rgba(0,0,0,0.9), 0 0 60px rgba(139,127,116,0.3), inset 0 0 0 1px rgba(139,127,116,0.4)' 
                        : '0 16px 50px -12px rgba(0,0,0,0.8)',
                      border: isActive ? 'none' : '1px solid rgba(139,127,116,0.1)'
                    }}
                  >
                    {/* Ornate corner decorations for active card */}
                    {isActive && (
                      <>
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-taupe-DEFAULT/60 z-20 rounded-tl-lg" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-taupe-DEFAULT/60 z-20 rounded-tr-lg" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-taupe-DEFAULT/60 z-20 rounded-bl-lg" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-taupe-DEFAULT/60 z-20 rounded-br-lg" />
                      </>
                    )}

                    {/* Image - object-contain with padding, warm background */}
                    <div className="aspect-[3/4] relative overflow-hidden">
                      {item.hero_image_url ? (
                        <div 
                          className="w-full h-full flex items-center justify-center"
                          style={{ 
                            padding: '24px',
                            background: 'linear-gradient(to br, #241E1A, rgba(31,26,22,0.5))' 
                          }}
                        >
                          <img
                            src={item.hero_image_url}
                            alt={`${item.brand} ${item.item_name}`}
                            className="max-w-full max-h-full object-contain"
                            loading="lazy"
                            draggable={false}
                          />
                        </div>
                      ) : (
                        <div 
                          className="w-full h-full flex flex-col items-center justify-center"
                          style={{ background: 'linear-gradient(to br, #241E1A, #1F1A16)' }}
                        >
                          <span className="font-display text-7xl md:text-8xl text-taupe-DEFAULT/20" style={{ letterSpacing: '0.05em' }}>
                            {item.brand.charAt(0)}
                          </span>
                          <span className="text-[10px] tracking-luxury uppercase text-taupe-DEFAULT/30 mt-4 font-medium">
                            {item.brand}
                          </span>
                        </div>
                      )}
                      
                      {/* Cinematic gradient overlay */}
                      <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{ 
                          background: 'linear-gradient(to top, rgba(26,21,18,0.98) 0%, rgba(26,21,18,0.85) 50%, transparent 100%)'
                        }}
                      />
                      
                      {/* Trending Badge */}
                      <div className="absolute top-5 left-5 z-10">
                        <span 
                          className="inline-block px-4 py-2 text-[10px] font-semibold uppercase rounded-sm"
                          style={{ 
                            letterSpacing: '2px',
                            background: '#8B7F74',
                            color: '#1A1512'
                          }}
                        >
                          Trending
                        </span>
                      </div>

                      {/* Content positioned over gradient */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                        <div 
                          className="text-[14px] font-medium uppercase mb-2"
                          style={{ letterSpacing: '3px', color: '#8B7F74' }}
                        >
                          {item.brand}
                        </div>
                        <div className="w-12 h-px bg-gradient-to-r from-taupe-DEFAULT/60 to-transparent mb-4" />
                        <h3 
                          className="font-serif text-xl md:text-2xl text-foreground mb-3 line-clamp-2 font-light"
                          style={{ lineHeight: 1.3 }}
                        >
                          {item.item_name}
                        </h3>
                        <p 
                          className="text-xs uppercase mb-5"
                          style={{ letterSpacing: '1.5px', color: 'rgba(245,239,224,0.5)' }}
                        >
                          {item.category}
                        </p>
                        
                        {isActive && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEnquire(item);
                            }}
                            className="inline-flex items-center h-10 px-6 text-[12px] uppercase font-medium transition-all duration-300 rounded-sm"
                            style={{
                              letterSpacing: '1.5px',
                              color: '#F5EFE0',
                              background: 'rgba(245,239,224,0.05)',
                              border: '1px solid rgba(245,239,224,0.3)',
                              backdropFilter: 'blur(10px)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(139,127,116,0.2)';
                              e.currentTarget.style.borderColor = 'rgba(139,127,116,0.5)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'rgba(245,239,224,0.05)';
                              e.currentTarget.style.borderColor = 'rgba(245,239,224,0.3)';
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

          {/* Navigation Arrows - Larger, more premium */}
          {itemCount > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 md:left-20 top-1/2 -translate-y-1/2 z-40 h-[72px] w-[72px] rounded-full transition-all duration-500 group"
                style={{
                  background: 'rgba(36,30,26,0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(139,127,116,0.25)'
                }}
                onClick={handlePrev}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(139,127,116,0.15)';
                  e.currentTarget.style.transform = 'translateY(-50%) translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(36,30,26,0.8)';
                  e.currentTarget.style.transform = 'translateY(-50%)';
                }}
              >
                <ChevronLeft className="h-6 w-6 transition-colors" style={{ color: '#A89B8E' }} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 md:right-20 top-1/2 -translate-y-1/2 z-40 h-[72px] w-[72px] rounded-full transition-all duration-500 group"
                style={{
                  background: 'rgba(36,30,26,0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(139,127,116,0.25)'
                }}
                onClick={handleNext}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(139,127,116,0.15)';
                  e.currentTarget.style.transform = 'translateY(-50%) translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(36,30,26,0.8)';
                  e.currentTarget.style.transform = 'translateY(-50%)';
                }}
              >
                <ChevronRight className="h-6 w-6 transition-colors" style={{ color: '#A89B8E' }} />
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
                    ? 'linear-gradient(to right, #A89B8E, #8B7F74)' 
                    : 'rgba(139,127,116,0.3)',
                  boxShadow: index === activeIndex ? '0 0 20px rgba(139,127,116,0.3)' : 'none'
                }}
              />
            ))}
          </div>
        )}

        {/* Instagram Link */}
        {settings?.instagram_url && (
          <div className="text-center mt-16">
            <p className="text-sm font-light" style={{ color: 'rgba(245,239,224,0.6)' }}>
              For daily updates, view the latest on{" "}
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 border-b pb-0.5"
                style={{ 
                  color: 'rgba(168,155,142,0.8)',
                  borderColor: 'rgba(139,127,116,0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#A89B8E';
                  e.currentTarget.style.borderColor = 'rgba(139,127,116,0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(168,155,142,0.8)';
                  e.currentTarget.style.borderColor = 'rgba(139,127,116,0.3)';
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
