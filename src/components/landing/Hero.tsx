import { MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";

export function Hero() {
  const { data: settings } = useSettings();

  const scrollToRequest = () => {
    const element = document.querySelector("#request");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center pt-20 md:pt-24 relative texture-grain vignette particles overflow-hidden"
    >
      {/* Espresso background with subtle sage/taupe radial gradients */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 30%, rgba(146, 131, 119, 0.08), transparent),
            radial-gradient(ellipse 60% 40% at 30% 70%, rgba(134, 103, 88, 0.05), transparent),
            radial-gradient(ellipse 100% 100% at 50% 50%, #291E15, #291E15)
          `
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center" style={{ paddingTop: '12vh' }}>
          {/* Main Headline - Playfair Display, gradient ivory to sage */}
          <h1 
            className="font-display text-hero-mobile md:text-hero text-gradient-luxury mb-8 md:mb-10 uppercase font-normal animate-fade-up"
            style={{ 
              animationDelay: '0.3s',
              animationFillMode: 'backwards'
            }}
          >
            Attaining the Unattainable
          </h1>

          {/* Ornate divider */}
          <div 
            className="ornate-divider w-32 mx-auto mb-10 animate-fade-up"
            style={{ animationDelay: "0.5s", animationFillMode: 'backwards' }}
          />

          {/* Subheadline - Cormorant Garamond italic, sage color */}
          <p
            className="font-serif-italic text-[clamp(20px,3vw,28px)] text-sage mb-6 max-w-2xl mx-auto animate-fade-up leading-relaxed font-light"
            style={{ animationDelay: "0.7s", animationFillMode: 'backwards' }}
          >
            Luxury personal shopping & discreet sourcing
          </p>

          {/* Tagline - Small caps, wide spacing, sage */}
          <p
            className="text-[12px] mb-16 md:mb-20 max-w-md mx-auto animate-fade-up font-sans font-light"
            style={{ 
              animationDelay: "0.9s", 
              animationFillMode: 'backwards',
              letterSpacing: '3px',
              color: '#928377',
              textTransform: 'uppercase',
              fontVariant: 'small-caps'
            }}
          >
            Dubai-based · Worldwide delivery · Since 2017
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20 md:mb-24 animate-fade-up"
            style={{ animationDelay: "1.1s", animationFillMode: 'backwards' }}
          >
            {/* Primary - Sage bg, espresso text */}
            <Button
              size="lg"
              className="w-full sm:w-auto min-w-[220px] h-16 px-12 text-[13px] tracking-wide-custom uppercase font-medium bg-sage text-espresso hover:bg-taupe hover:shadow-hover-lift transition-all duration-400 border-0 rounded-sm btn-luxury"
              onClick={scrollToRequest}
            >
              Request an Item
            </Button>
            {/* Secondary - Ivory border, transparent bg */}
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto min-w-[220px] h-16 px-12 text-[13px] tracking-wide-custom uppercase font-light border border-ivory/40 bg-transparent text-ivory hover:bg-ivory hover:text-espresso transition-all duration-400 backdrop-blur-sm rounded-sm btn-luxury"
              onClick={() => {
                if (settings?.whatsapp_link) {
                  window.open(settings.whatsapp_link, "_blank");
                }
              }}
            >
              <MessageCircle className="mr-3 h-4 w-4" />
              WhatsApp Us
            </Button>
          </div>

          {/* Trust Badges - Small caps, sage */}
          <div
            className="animate-fade-up"
            style={{ animationDelay: "1.3s", animationFillMode: 'backwards' }}
          >
            <div 
              className="flex flex-wrap items-center justify-center gap-5 md:gap-6 text-[11px] uppercase font-sans font-light"
              style={{ letterSpacing: '2.5px', color: '#928377' }}
            >
              <span className="hover:text-ivory transition-colors duration-300">Licensed</span>
              <span style={{ color: 'rgba(146,131,119,0.4)' }}>•</span>
              <span className="hover:text-ivory transition-colors duration-300">Since 2017</span>
              <span style={{ color: 'rgba(146,131,119,0.4)' }}>•</span>
              <span className="hover:text-ivory transition-colors duration-300">International Shipping</span>
              <span style={{ color: 'rgba(146,131,119,0.4)' }}>•</span>
              <span className="hover:text-ivory transition-colors duration-300">Discreet Sourcing</span>
            </div>
          </div>

          {/* Floating scroll indicator */}
          <div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-scroll-indicator"
          >
            <div className="flex flex-col items-center gap-2 text-sage/60">
              <span className="text-[10px] uppercase tracking-widest font-light">Scroll</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}