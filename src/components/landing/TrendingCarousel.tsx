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

    if (diff === 0) {
      // Center card - Royal treatment
      scale = 1.1;
      zIndex = 30;
      opacity = 1;
      blur = 0;
    } else if (absD === 1) {
      // Adjacent cards
      scale = 0.75;
      rotateY = diff > 0 ? -20 : 20;
      translateXVal = diff > 0 ? 70 : -70;
      zIndex = 20;
      opacity = 0.5;
      blur = 2;
    } else if (absD === 2) {
      // Far cards
      scale = 0.6;
      rotateY = diff > 0 ? -30 : 30;
      translateXVal = diff > 0 ? 130 : -130;
      zIndex = 10;
      opacity = 0.25;
      blur = 4;
    } else {
      // Hidden cards
      opacity = 0;
      zIndex = 0;
    }

    return {
      transform: `translateX(${translateXVal}%) scale(${scale}) rotateY(${rotateY}deg)`,
      zIndex,
      opacity,
      filter: blur > 0 ? `blur(${blur}px) brightness(0.7)` : 'none',
    };
  };

  return (
    <section id="trending" className="py-32 md:py-40 overflow-hidden relative">
      {/* Spotlight gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-clutch-elevated/30 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs tracking-luxury uppercase text-taupe-DEFAULT/70 mb-6 animate-fade-up font-medium">
            Curated Selection
          </p>
          <h2 className="font-display text-display text-taupe-gradient mb-6 animate-fade-up uppercase" style={{ animationDelay: "0.1s" }}>
            Trending Now
          </h2>
          <div className="ornate-divider w-32 mx-auto mb-8 animate-fade-up" style={{ animationDelay: "0.15s" }} />
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto animate-fade-up font-light" style={{ animationDelay: "0.2s" }}>
            The most sought-after pieces of the moment
          </p>
        </div>

        {/* 3D Carousel */}
        <div 
          ref={containerRef}
          className="relative carousel-3d h-[520px] md:h-[620px] mx-auto max-w-6xl"
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
                  <div className={`relative overflow-hidden ${
                    isActive 
                      ? 'taupe-glow luxury-shadow-xl' 
                      : 'border border-taupe-DEFAULT/10 luxury-shadow'
                  }`}>
                    {/* Ornate corner decorations for active card */}
                    {isActive && (
                      <>
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-taupe-DEFAULT/60 z-20" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-taupe-DEFAULT/60 z-20" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-taupe-DEFAULT/60 z-20" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-taupe-DEFAULT/60 z-20" />
                      </>
                    )}

                    {/* Image - FIXED: object-contain with padding */}
                    <div className="aspect-[3/4] bg-clutch-surface relative overflow-hidden">
                      {item.hero_image_url ? (
                        <div className="w-full h-full p-4 md:p-6 flex items-center justify-center bg-gradient-to-br from-clutch-surface to-clutch-elevated">
                          <img
                            src={item.hero_image_url}
                            alt={`${item.brand} ${item.item_name}`}
                            className="max-w-full max-h-full object-contain"
                            loading="lazy"
                            draggable={false}
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-clutch-surface to-clutch-elevated">
                          <span className="font-display text-7xl md:text-8xl text-taupe-DEFAULT/20 tracking-tight">
                            {item.brand.charAt(0)}
                          </span>
                          <span className="text-[10px] tracking-luxury uppercase text-taupe-DEFAULT/30 mt-4 font-medium">
                            {item.brand}
                          </span>
                        </div>
                      )}
                      
                      {/* Cinematic gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A] via-[#0D0B0A]/60 to-transparent opacity-90 pointer-events-none" />
                      
                      {/* Trending Badge - TAUPE color */}
                      <div className="absolute top-5 left-5 z-10">
                        <span className="inline-block px-4 py-2 text-[10px] font-medium tracking-luxury uppercase bg-taupe-DEFAULT text-taupe-cream border border-taupe-light/30">
                          Trending
                        </span>
                      </div>

                      {/* Content positioned over gradient */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                        <div className="text-[10px] text-taupe-light font-semibold tracking-luxury uppercase mb-2">
                          {item.brand}
                        </div>
                        <div className="w-12 h-px bg-gradient-to-r from-taupe-DEFAULT/60 to-transparent mb-3" />
                        <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2 line-clamp-2 leading-tight">
                          {item.item_name}
                        </h3>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-5">
                          {item.category}
                        </p>
                        
                        {isActive && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEnquire(item);
                            }}
                            className="group inline-flex items-center gap-2 text-sm text-taupe-light font-medium tracking-wide transition-all duration-500 hover:gap-4"
                          >
                            <span className="border-b border-taupe-DEFAULT/50 pb-0.5 group-hover:border-taupe-light">Enquire</span>
                            <span className="text-taupe-DEFAULT/60 group-hover:text-taupe-light transition-colors">→</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows - TAUPE styled */}
          {itemCount > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-40 h-16 w-16 rounded-full bg-background/40 backdrop-blur-sm border border-taupe-DEFAULT/30 hover:bg-taupe-DEFAULT/20 hover:border-taupe-DEFAULT/60 hover:shadow-taupe-soft transition-all duration-500 group"
                onClick={handlePrev}
              >
                <ChevronLeft className="h-6 w-6 text-taupe-light group-hover:scale-110 transition-transform" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-40 h-16 w-16 rounded-full bg-background/40 backdrop-blur-sm border border-taupe-DEFAULT/30 hover:bg-taupe-DEFAULT/20 hover:border-taupe-DEFAULT/60 hover:shadow-taupe-soft transition-all duration-500 group"
                onClick={handleNext}
              >
                <ChevronRight className="h-6 w-6 text-taupe-light group-hover:scale-110 transition-transform" />
              </Button>
            </>
          )}
        </div>

        {/* Dots - TAUPE styled */}
        {itemCount > 1 && (
          <div className="flex items-center justify-center gap-3 mt-12">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-full transition-all duration-500 ${
                  index === activeIndex 
                    ? 'w-10 h-2 bg-gradient-to-r from-taupe-light to-taupe-DEFAULT shadow-taupe-soft' 
                    : 'w-2 h-2 bg-taupe-DEFAULT/30 hover:bg-taupe-DEFAULT/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Instagram Link */}
        {settings?.instagram_url && (
          <div className="text-center mt-16">
            <p className="text-sm text-muted-foreground/60 font-light">
              For daily updates, view the latest on{" "}
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-taupe-light/80 hover:text-taupe-light transition-colors duration-300 border-b border-taupe-DEFAULT/30 hover:border-taupe-DEFAULT/60 pb-0.5"
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