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
      {/* Cinematic gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-clutch-elevated via-background to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-clutch-elevated/50 via-transparent to-transparent pointer-events-none" />
      
      {/* Subtle spotlight effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-accent/5 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline with golden gradient */}
          <h1 className="font-display text-hero text-gold-gradient mb-8 animate-scale-up tracking-tight uppercase">
            Attaining the Unattainable
          </h1>

          {/* Ornate divider */}
          <div 
            className="ornate-divider w-48 mx-auto mb-10 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          />

          {/* Subheadline */}
          <p
            className="font-serif text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-4 max-w-2xl mx-auto animate-fade-up leading-relaxed italic"
            style={{ animationDelay: "0.3s" }}
          >
            Luxury personal shopping & discreet sourcing
          </p>

          {/* Supporting line */}
          <p
            className="text-sm md:text-base text-muted-foreground/60 mb-16 max-w-md mx-auto animate-fade-up tracking-wide"
            style={{ animationDelay: "0.4s" }}
          >
            Dubai-based · Worldwide delivery · Since 2017
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-24 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto min-w-[220px] h-14 md:h-16 text-sm tracking-luxury uppercase font-medium bg-gradient-to-r from-royal-gold via-royal-gold-light to-royal-gold text-royal-midnight hover:shadow-royal transition-all duration-500 hover:scale-[1.02] border-0"
              onClick={scrollToRequest}
            >
              Request an Item
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto min-w-[220px] h-14 md:h-16 text-sm tracking-luxury uppercase font-medium border-accent/30 text-foreground hover:bg-accent/10 hover:border-accent/60 hover:shadow-royal-soft transition-all duration-500 backdrop-blur-sm"
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
              <span className="hover:text-accent/60 transition-colors duration-300">Licensed</span>
              <span className="w-1 h-1 rounded-full bg-accent/30 hidden md:block" />
              <span className="hover:text-accent/60 transition-colors duration-300">Since 2017</span>
              <span className="w-1 h-1 rounded-full bg-accent/30 hidden md:block" />
              <span className="hover:text-accent/60 transition-colors duration-300">International Shipping</span>
              <span className="w-1 h-1 rounded-full bg-accent/30 hidden md:block" />
              <span className="hover:text-accent/60 transition-colors duration-300">Discreet Sourcing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
