import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";

export function Hero() {
  const { data: settings } = useSettings();

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
        <div className="max-w-5xl mx-auto text-center" style={{ paddingTop: '12vh' }}>
          {/* Main Headline — Cormorant Garamond 300, reduced size */}
          <h1 
            className="animate-scale-up uppercase font-light"
            style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(32px, 5.5vw, 62px)',
              color: '#6B6B6B',
              textShadow: '0 2px 30px rgba(134, 103, 88, 0.15)',
              letterSpacing: '0.1em',
              lineHeight: 1.2,
              marginBottom: '4rem',
            }}
          >
            Attaining the Unattainable
          </h1>

          {/* Clutch logo divider */}
          <div className="flex justify-center mb-14 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <img 
              src="/images/clutch-logo-ccc.jpg" 
              alt="Clutch logo" 
              className="block"
              style={{ width: '55px', height: '55px', opacity: 0.35, filter: 'grayscale(20%)' }}
            />
          </div>

          {/* Subheadline — Montserrat Light Italic */}
          <p
            className="mb-6 max-w-2xl mx-auto animate-fade-up leading-relaxed"
            style={{ 
              animationDelay: "0.3s", 
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(18px, 2.5vw, 24px)',
              letterSpacing: '0.05em', 
              color: '#565250' 
            }}
          >
            Luxury personal shopping & sourcing
          </p>

          {/* Supporting line — Montserrat Medium */}
          <p
            className="mb-24 md:mb-28 max-w-md mx-auto animate-fade-up"
            style={{ 
              animationDelay: "0.4s", 
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
              fontSize: '10px',
              letterSpacing: '0.2em',
              color: '#928377',
              textTransform: 'uppercase',
            }}
          >
            Dubai-based · Worldwide delivery · Since 2017
          </p>

          {/* CTAs — Montserrat Medium */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-32 md:mb-36 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto min-w-[240px] rounded-[2px] uppercase transition-all duration-[400ms] hover:-translate-y-1 hover:scale-[1.02] border-0"
              style={{
                background: '#9B9B9B',
                color: '#FFFFFF',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
                fontSize: '11px',
                letterSpacing: '0.18em',
                padding: '16px 40px',
                height: 'auto',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#7A7A7A';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(107,107,107,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#9B9B9B';
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
              className="w-full sm:w-auto min-w-[240px] rounded-[2px] uppercase transition-all duration-[400ms] hover:scale-[1.02]"
              style={{
                border: '2px solid #6B6B6B',
                background: 'transparent',
                color: '#6B6B6B',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
                fontSize: '11px',
                letterSpacing: '0.18em',
                padding: '16px 40px',
                height: 'auto',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#6B6B6B';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#6B6B6B';
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

          {/* Trust Row — Montserrat Medium */}
          <div
            className="animate-fade-up"
            style={{ animationDelay: "0.6s" }}
          >
            <div 
              className="flex flex-wrap items-center justify-center gap-4 md:gap-5 uppercase"
              style={{ 
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
                fontSize: '10px',
                letterSpacing: '0.2em', 
                color: '#928377' 
              }}
            >
              <span className="hover:text-[#866758] transition-colors duration-400">The Clutch Experience</span>
              <span style={{ color: 'rgba(134,103,88,0.4)' }}>·</span>
              <span className="hover:text-[#866758] transition-colors duration-400">Private Sourcing</span>
              <span style={{ color: 'rgba(134,103,88,0.4)' }}>·</span>
              <span className="hover:text-[#866758] transition-colors duration-400">International delivery</span>
              <span style={{ color: 'rgba(134,103,88,0.4)' }}>·</span>
              <span className="hover:text-[#866758] transition-colors duration-400">Since 2017</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
