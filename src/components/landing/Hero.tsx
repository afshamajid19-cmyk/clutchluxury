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
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-foreground mb-8 animate-fade-up tracking-tight">
            Attaining the Unattainable.
          </h1>

          {/* Subheadline */}
          <p
            className="text-base md:text-lg text-muted-foreground mb-4 max-w-xl mx-auto animate-fade-up leading-relaxed"
            style={{ animationDelay: "0.1s" }}
          >
            Luxury personal shopping & discreet sourcing. Dubai-based. Worldwide delivery.
          </p>

          {/* Supporting line */}
          <p
            className="text-sm text-muted-foreground/60 mb-14 max-w-md mx-auto animate-fade-up tracking-wide"
            style={{ animationDelay: "0.15s" }}
          >
            For clients who value discretion, speed, and access.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto min-w-[200px] h-13 text-sm tracking-wide"
              onClick={scrollToRequest}
            >
              Request an Item
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto min-w-[200px] h-13 text-sm tracking-wide border-border hover:bg-secondary"
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
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-[11px] text-muted-foreground/50 tracking-editorial uppercase">
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
