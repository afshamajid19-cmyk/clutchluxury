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
      <div className="text-center py-16">
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

    if (diff === 0) {
      // Center card
      scale = 1;
      zIndex = 30;
      opacity = 1;
    } else if (absD === 1) {
      // Adjacent cards
      scale = 0.85;
      rotateY = diff > 0 ? -15 : 15;
      translateXVal = diff > 0 ? 60 : -60;
      zIndex = 20;
      opacity = 0.7;
    } else if (absD === 2) {
      // Far cards
      scale = 0.7;
      rotateY = diff > 0 ? -25 : 25;
      translateXVal = diff > 0 ? 120 : -120;
      zIndex = 10;
      opacity = 0.4;
    } else {
      // Hidden cards
      opacity = 0;
      zIndex = 0;
    }

    return {
      transform: `translateX(${translateXVal}%) scale(${scale}) rotateY(${rotateY}deg)`,
      zIndex,
      opacity,
    };
  };

  return (
    <section id="trending" className="py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-luxury uppercase text-muted-foreground mb-4 animate-fade-up">
            Curated Selection
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 animate-fade-up" style={{ animationDelay: "0.05s" }}>
            Trending Now
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
            The most sought-after pieces of the moment
          </p>
        </div>

        {/* 3D Carousel */}
        <div 
          ref={containerRef}
          className="relative carousel-3d h-[480px] md:h-[560px] mx-auto max-w-5xl"
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
                  className="carousel-3d-item absolute w-[280px] md:w-[340px] cursor-grab active:cursor-grabbing select-none"
                  style={{
                    ...style,
                    transition: isDragging ? "none" : "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <div className={`bg-card border border-border overflow-hidden ${isActive ? 'luxury-shadow-xl' : 'luxury-shadow'}`}>
                    {/* Image */}
                    <div className="aspect-[3/4] bg-secondary relative overflow-hidden">
                      {item.hero_image_url ? (
                        <img
                          src={item.hero_image_url}
                          alt={`${item.brand} ${item.item_name}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          draggable={false}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-card to-secondary border border-border">
                          <span className="font-serif text-6xl md:text-7xl text-muted-foreground/15 tracking-tight">
                            {item.brand.charAt(0)}
                          </span>
                          <span className="text-[10px] tracking-luxury uppercase text-muted-foreground/30 mt-3">
                            {item.brand}
                          </span>
                        </div>
                      )}
                      
                      {/* Trending Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1.5 text-[10px] font-medium tracking-editorial uppercase bg-foreground/90 text-background">
                          Trending
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 md:p-6">
                      <div className="text-[10px] text-accent font-medium tracking-luxury uppercase mb-2">
                        {item.brand}
                      </div>
                      <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3 line-clamp-1">
                        {item.item_name}
                      </h3>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-4">
                        {item.category}
                      </p>
                      
                      {isActive && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEnquire(item);
                          }}
                          className="text-sm text-foreground font-medium tracking-wide hover:text-accent transition-colors duration-300 underline underline-offset-4 decoration-border hover:decoration-accent"
                        >
                          Enquire
                        </button>
                      )}
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
                className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-40 h-12 w-12 bg-background/80 backdrop-blur-sm border border-border hover:bg-background"
                onClick={handlePrev}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-40 h-12 w-12 bg-background/80 backdrop-blur-sm border border-border hover:bg-background"
                onClick={handleNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>

        {/* Dots */}
        {itemCount > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'w-8 bg-foreground' 
                    : 'w-2 bg-border hover:bg-muted-foreground'
                }`}
              />
            ))}
          </div>
        )}

        {/* Instagram Link */}
        {settings?.instagram_url && (
          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground">
              For daily updates, view the latest on{" "}
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 decoration-border hover:decoration-accent transition-colors"
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
