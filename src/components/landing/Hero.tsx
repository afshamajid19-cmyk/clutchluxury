import { MessageCircle } from "lucide-react";
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
      {/* Warm cinematic gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#241E1A_0%,_#1A1512_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,_rgba(139,127,116,0.08),_transparent)] pointer-events-none" />
      
      {/* Subtle warm spotlight effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(139,127,116,0.06),_transparent)] blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline - Cinzel, wide tracking, solid cream */}
          <h1 
            className="font-display text-hero-mobile md:text-hero text-taupe-cream mb-6 md:mb-8 animate-scale-up uppercase font-normal"
            style={{ 
              textShadow: '0 2px 30px rgba(139, 127, 116, 0.25)'
            }}
          >
            Attaining the Unattainable
          </h1>

          {/* Ornate divider */}
          <div 
            className="ornate-divider w-48 mx-auto mb-10 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          />

          {/* Subheadline - Italic serif */}
          <p
            className="font-serif-italic text-xl md:text-2xl lg:text-[1.75rem] text-taupe-light/85 mb-4 max-w-2xl mx-auto animate-fade-up leading-relaxed font-light"
            style={{ animationDelay: "0.3s", letterSpacing: '0.02em' }}
          >
            Luxury personal shopping & discreet sourcing
          </p>

          {/* Supporting line */}
          <p
            className="text-sm md:text-base text-muted-foreground/60 mb-16 max-w-md mx-auto animate-fade-up tracking-wide font-light"
            style={{ animationDelay: "0.4s" }}
          >
            Dubai-based · Worldwide delivery · Since 2017
          </p>

          {/* CTAs - TAUPE styled */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-24 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto min-w-[220px] h-14 md:h-16 text-sm tracking-luxury uppercase font-semibold bg-taupe-DEFAULT text-[#1A1512] hover:bg-taupe-light hover:shadow-[0_8px_32px_rgba(139,127,116,0.4)] transition-all duration-500 hover:translate-y-[-4px] border-0 rounded-sm"
              onClick={scrollToRequest}
            >
              Request an Item
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto min-w-[220px] h-14 md:h-16 text-sm tracking-luxury uppercase font-medium border-taupe-DEFAULT/40 bg-taupe-DEFAULT/10 text-taupe-cream hover:bg-taupe-DEFAULT hover:text-[#1A1512] hover:border-taupe-DEFAULT transition-all duration-500 backdrop-blur-sm rounded-sm"
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

          {/* Trust Row */}
          <div
            className="animate-fade-up"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-[11px] text-muted-foreground/40 tracking-luxury uppercase">
              <span className="hover:text-taupe-DEFAULT/60 transition-colors duration-300">Licensed</span>
              <span className="w-1 h-1 rounded-full bg-taupe-DEFAULT/30 hidden md:block" />
              <span className="hover:text-taupe-DEFAULT/60 transition-colors duration-300">Since 2017</span>
              <span className="w-1 h-1 rounded-full bg-taupe-DEFAULT/30 hidden md:block" />
              <span className="hover:text-taupe-DEFAULT/60 transition-colors duration-300">International Shipping</span>
              <span className="w-1 h-1 rounded-full bg-taupe-DEFAULT/30 hidden md:block" />
              <span className="hover:text-taupe-DEFAULT/60 transition-colors duration-300">Discreet Sourcing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}