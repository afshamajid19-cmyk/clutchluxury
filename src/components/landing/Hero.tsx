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
      className="min-h-screen flex flex-col justify-center pt-20 md:pt-24 relative texture-grain"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight text-foreground mb-8 animate-fade-up">
            Attaining the Unattainable.
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto animate-fade-up leading-relaxed"
            style={{ animationDelay: "0.1s" }}
          >
            Luxury personal shopping & discreet sourcing. Dubai-based. Worldwide delivery.
          </p>

          {/* Supporting line */}
          <p
            className="text-sm text-muted-foreground/70 mb-12 max-w-md mx-auto animate-fade-up tracking-wide"
            style={{ animationDelay: "0.15s" }}
          >
            For clients who value discretion, speed, and access.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Button
              variant="premium"
              size="xl"
              className="w-full sm:w-auto min-w-[220px]"
              onClick={scrollToRequest}
            >
              Request an Item
            </Button>
            <Button
              variant="premium-outline"
              size="xl"
              className="w-full sm:w-auto min-w-[220px]"
              onClick={() => {
                if (settings?.whatsapp_link) {
                  window.open(settings.whatsapp_link, "_blank");
                }
              }}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp Us
            </Button>
          </div>

          {/* Divider */}
          <div 
            className="w-16 h-px bg-border mx-auto mb-8 animate-fade-up"
            style={{ animationDelay: "0.25s" }}
          />

          {/* Trust Row */}
          <div
            className="animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-xs text-muted-foreground/60 tracking-editorial uppercase">
              <span>Licensed</span>
              <span className="w-px h-3 bg-border hidden md:block" />
              <span>Since 2017</span>
              <span className="w-px h-3 bg-border hidden md:block" />
              <span>International Shipping</span>
              <span className="w-px h-3 bg-border hidden md:block" />
              <span>Discreet Sourcing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
