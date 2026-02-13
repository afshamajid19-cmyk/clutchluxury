import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";

export function Hero() {
  const { data: settings } = useSettings();

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center pt-20 md:pt-24 relative texture-grain vignette particles overflow-hidden"
      style={{ background: '#E9E4DE' }}
    >
      {/* Warm light gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_40%,_rgba(134,103,88,0.06),_#E9E4DE)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,_rgba(134,103,88,0.04),_transparent)] pointer-events-none" />
      
      {/* Subtle spotlight effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[radial-gradient(ellipse_at_center,_rgba(134,103,88,0.03),_transparent)] blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center" style={{ paddingTop: '10vh' }}>
          {/* Main Headline */}
          <h1 
            className="font-display text-hero-mobile md:text-hero mb-16 md:mb-24 animate-scale-up uppercase font-normal"
            style={{ 
              color: '#291E15',
              textShadow: '0 2px 30px rgba(134, 103, 88, 0.15)',
              letterSpacing: '0.1em'
            }}
          >
            Attaining the Unattainable
          </h1>

          {/* Ornate divider */}
          <div 
            className="ornate-divider w-48 mx-auto mb-12 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          />

          {/* Subheadline */}
          <p
            className="font-serif-italic text-[clamp(22px,3vw,30px)] mb-5 max-w-2xl mx-auto animate-fade-up leading-relaxed font-light"
            style={{ animationDelay: "0.3s", letterSpacing: '0.02em', color: '#565250' }}
          >
            Luxury personal shopping & discreet sourcing
          </p>

          {/* Supporting line */}
          <p
            className="text-[13px] mb-20 md:mb-24 max-w-md mx-auto animate-fade-up font-light"
            style={{ 
              animationDelay: "0.4s", 
              letterSpacing: '3px',
              color: '#928377',
              textTransform: 'uppercase'
            }}
          >
            Dubai-based · Worldwide delivery · Since 2017
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-28 md:mb-32 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto min-w-[240px] h-16 px-14 text-[14px] tracking-[2.5px] uppercase font-semibold transition-all duration-500 hover:-translate-y-1.5 border-0 rounded-sm"
              style={{
                background: '#866758',
                color: '#FFFFFF',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#6b5345';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(134,103,88,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#866758';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onClick={() => {
                const element = document.querySelector("#contact");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Contact Us
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto min-w-[240px] h-16 px-14 text-[14px] tracking-[2.5px] uppercase font-medium transition-all duration-500 rounded-sm"
              style={{
                border: '2px solid #866758',
                background: 'transparent',
                color: '#291E15',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#866758';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#291E15';
              }}
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
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5 text-[11px] uppercase" style={{ letterSpacing: '2.5px', color: '#928377' }}>
              <span className="hover:text-[#866758] transition-colors duration-300">Licensed</span>
              <span style={{ color: 'rgba(134,103,88,0.4)' }}>•</span>
              <span className="hover:text-[#866758] transition-colors duration-300">Since 2017</span>
              <span style={{ color: 'rgba(134,103,88,0.4)' }}>•</span>
              <span className="hover:text-[#866758] transition-colors duration-300">International Shipping</span>
              <span style={{ color: 'rgba(134,103,88,0.4)' }}>•</span>
              <span className="hover:text-[#866758] transition-colors duration-300">Discreet Sourcing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
