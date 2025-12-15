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
      className="min-h-screen flex flex-col justify-center pt-20 md:pt-24"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight text-foreground mb-6 animate-fade-up">
            Attaining the Unattainable.
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Luxury personal shopping and sourcing. Dubai-based. International
            shipping.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto min-w-[200px] bg-foreground text-background hover:bg-foreground/90"
              onClick={scrollToRequest}
            >
              Request an item
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto min-w-[200px] border-foreground/20 hover:bg-foreground/5"
              onClick={() => {
                if (settings?.whatsapp_link) {
                  window.open(settings.whatsapp_link, "_blank");
                }
              }}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp us
            </Button>
          </div>

          {/* Trust Row */}
          <div
            className="animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-xs md:text-sm text-muted-foreground tracking-wide">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                Licensed
              </span>
              <span className="hidden md:inline text-border">|</span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                Since 2017
              </span>
              <span className="hidden md:inline text-border">|</span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                International Shipping
              </span>
              <span className="hidden md:inline text-border">|</span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                Discreet Sourcing
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
