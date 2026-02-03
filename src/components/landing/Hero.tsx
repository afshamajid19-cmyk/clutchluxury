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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_40%,_rgba(45,38,34,0.4),_#1A1512)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,_rgba(139,127,116,0.06),_transparent)] pointer-events-none" />
      
      {/* Subtle warm spotlight effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[radial-gradient(ellipse_at_center,_rgba(139,127,116,0.04),_transparent)] blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center" style={{ paddingTop: '10vh' }}>
          {/* Main Headline - Cinzel, wide tracking, solid cream */}
          <h1 
            className="font-display text-hero-mobile md:text-hero text-taupe-cream mb-16 md:mb-24 animate-scale-up uppercase font-normal"
            style={{ 
              textShadow: '0 2px 30px rgba(139, 127, 116, 0.25)'
            }}
          >
            Attaining the Unattainable
          </h1>

          {/* Ornate divider */}
          <div 
            className="ornate-divider w-48 mx-auto mb-12 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          />

          {/* Subheadline - Italic serif, larger */}
          <p
            className="font-serif-italic text-[clamp(22px,3vw,30px)] text-taupe-light/85 mb-5 max-w-2xl mx-auto animate-fade-up leading-relaxed font-light"
            style={{ animationDelay: "0.3s", letterSpacing: '0.02em' }}
          >
            Luxury personal shopping & discreet sourcing
          </p>

          {/* Supporting line - more subtle */}
          <p
            className="text-[13px] mb-20 md:mb-24 max-w-md mx-auto animate-fade-up font-light"
            style={{ 
              animationDelay: "0.4s", 
              letterSpacing: '3px',
              color: 'rgba(245,239,224,0.5)',
              textTransform: 'uppercase'
            }}
          >
            Dubai-based · Worldwide delivery · Since 2017
          </p>

          {/* CTAs - Larger, more prominent */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-28 md:mb-32 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto min-w-[240px] h-16 px-14 text-[14px] tracking-[2.5px] uppercase font-semibold bg-taupe-DEFAULT text-[#1A1512] hover:bg-taupe-light hover:shadow-[0_12px_40px_rgba(139,127,116,0.5)] transition-all duration-500 hover:-translate-y-1.5 border-0 rounded-sm"
              onClick={scrollToRequest}
            >
              Request an Item
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto min-w-[240px] h-16 px-14 text-[14px] tracking-[2.5px] uppercase font-medium border-2 border-taupe-DEFAULT/40 bg-taupe-DEFAULT/[0.08] text-taupe-cream hover:bg-taupe-DEFAULT/20 hover:border-taupe-DEFAULT/70 transition-all duration-500 backdrop-blur-[10px] rounded-sm"
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

          {/* Trust Row - refined */}
          <div
            className="animate-fade-up"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5 text-[11px] uppercase" style={{ letterSpacing: '2.5px', color: 'rgba(139,127,116,0.6)' }}>
              <span className="hover:text-taupe-DEFAULT transition-colors duration-300">Licensed</span>
              <span className="text-taupe-DEFAULT/40">•</span>
              <span className="hover:text-taupe-DEFAULT transition-colors duration-300">Since 2017</span>
              <span className="text-taupe-DEFAULT/40">•</span>
              <span className="hover:text-taupe-DEFAULT transition-colors duration-300">International Shipping</span>
              <span className="text-taupe-DEFAULT/40">•</span>
              <span className="hover:text-taupe-DEFAULT transition-colors duration-300">Discreet Sourcing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
