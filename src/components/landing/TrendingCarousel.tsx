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
        <p className="text-muted-foreground text-sm font-sans">No trending items at the moment.</p>
      </div>
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

  return (
    <section 
      id="trending" 
      className="py-32 md:py-44 overflow-hidden relative"
      style={{ background: '#1F1916' }}
    >
      {/* Spotlight gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle at center, rgba(146,131,119,0.05), transparent 70%)' 
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
            className="text-[16px] max-w-md mx-auto animate-fade-up font-sans font-light mt-8"
            style={{ animationDelay: "0.2s", color: 'rgba(233,234,222,0.7)' }}
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
                    transition: isDragging ? "none" : "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <div 
                    className="relative overflow-hidden rounded-lg"
                    style={{
                      background: 'rgba(86,82,80,0.2)',
                      boxShadow: isActive 
                        ? '0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(146,131,119,0.2)' 
                        : '0 16px 50px -12px rgba(0,0,0,0.6)',
                      border: isActive ? '1px solid rgba(146,131,119,0.3)' : '1px solid rgba(146,131,119,0.1)'
                    }}
                  >
                    {/* Image */}
                    <div className="aspect-[3/4] relative overflow-hidden">
                      {item.hero_image_url ? (
                        <div 
                          className="w-full h-full flex items-center justify-center"
                          style={{ 
                            padding: '24px',
                            background: 'linear-gradient(to br, rgba(86,82,80,0.3), rgba(41,30,21,0.5))' 
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
                          style={{ background: 'linear-gradient(to br, rgba(86,82,80,0.3), rgba(41,30,21,0.5))' }}
                        >
                          <span className="font-display text-7xl md:text-8xl" style={{ color: 'rgba(146,131,119,0.2)', letterSpacing: '0.05em' }}>
                            {item.brand.charAt(0)}
                          </span>
                          <span className="text-[10px] tracking-luxury uppercase mt-4 font-sans font-medium" style={{ color: 'rgba(146,131,119,0.3)' }}>
                            {item.brand}
                          </span>
                        </div>
                      )}
                      
                      {/* Gradient overlay */}
                      <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{ 
                          background: 'linear-gradient(to top, rgba(41,30,21,0.98) 0%, rgba(41,30,21,0.85) 50%, transparent 100%)'
                        }}
                      />
                      
                      {/* Trending Badge */}
                      <div className="absolute top-5 left-5 z-10">
                        <span 
                          className="inline-block px-4 py-2 text-[10px] font-sans font-semibold uppercase rounded-sm"
                          style={{ 
                            letterSpacing: '2px',
                            background: '#928377',
                            color: '#291E15'
                          }}
                        >
                          Trending
                        </span>
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                        <div 
                          className="text-[14px] font-sans font-medium uppercase mb-2"
                          style={{ letterSpacing: '3px', color: '#866758' }}
                        >
                          {item.brand}
                        </div>
                        <div className="w-12 h-px mb-4" style={{ background: 'linear-gradient(to right, rgba(146,131,119,0.6), transparent)' }} />
                        <h3 
                          className="font-serif text-xl md:text-2xl text-ivory mb-3 line-clamp-2 font-light"
                          style={{ lineHeight: 1.3 }}
                        >
                          {item.item_name}
                        </h3>
                        <p 
                          className="text-xs uppercase font-sans font-light mb-5"
                          style={{ letterSpacing: '1.5px', color: 'rgba(233,234,222,0.5)' }}
                        >
                          {item.category}
                        </p>
                        
                        {isActive && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEnquire(item);
                            }}
                            className="inline-flex items-center h-10 px-6 text-[12px] uppercase font-sans font-medium transition-all duration-400 rounded-sm btn-luxury"
                            style={{
                              letterSpacing: '1.5px',
                              color: '#E9EADE',
                              background: 'rgba(233,234,222,0.05)',
                              border: '1px solid rgba(233,234,222,0.3)',
                              backdropFilter: 'blur(10px)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(146,131,119,0.2)';
                              e.currentTarget.style.borderColor = 'rgba(146,131,119,0.5)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'rgba(233,234,222,0.05)';
                              e.currentTarget.style.borderColor = 'rgba(233,234,222,0.3)';
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
                className="absolute left-4 md:left-20 top-1/2 -translate-y-1/2 z-40 h-[72px] w-[72px] rounded-full transition-all duration-500"
                style={{
                  background: 'rgba(86,82,80,0.3)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(146,131,119,0.2)'
                }}
                onClick={handlePrev}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(146,131,119,0.15)';
                  e.currentTarget.style.transform = 'translateY(-50%) translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(86,82,80,0.3)';
                  e.currentTarget.style.transform = 'translateY(-50%)';
                }}
              >
                <ChevronLeft className="h-6 w-6" style={{ color: '#928377' }} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 md:right-20 top-1/2 -translate-y-1/2 z-40 h-[72px] w-[72px] rounded-full transition-all duration-500"
                style={{
                  background: 'rgba(86,82,80,0.3)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(146,131,119,0.2)'
                }}
                onClick={handleNext}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(146,131,119,0.15)';
                  e.currentTarget.style.transform = 'translateY(-50%) translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(86,82,80,0.3)';
                  e.currentTarget.style.transform = 'translateY(-50%)';
                }}
              >
                <ChevronRight className="h-6 w-6" style={{ color: '#928377' }} />
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
                    : 'rgba(146,131,119,0.3)',
                  boxShadow: index === activeIndex ? '0 0 20px rgba(146,131,119,0.3)' : 'none'
                }}
              />
            ))}
          </div>
        )}

        {/* Instagram Link */}
        {settings?.instagram_url && (
          <div className="text-center mt-16">
            <p className="text-sm font-sans font-light" style={{ color: 'rgba(233,234,222,0.6)' }}>
              For daily updates, view the latest on{" "}
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-400 border-b pb-0.5 link-underline"
                style={{ 
                  color: 'rgba(146,131,119,0.8)',
                  borderColor: 'rgba(146,131,119,0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#928377';
                  e.currentTarget.style.borderColor = 'rgba(146,131,119,0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(146,131,119,0.8)';
                  e.currentTarget.style.borderColor = 'rgba(146,131,119,0.3)';
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