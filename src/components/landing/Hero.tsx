import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";
import type { HomepageSettings } from "@/lib/server/homepage";

type HeroProps = {
  settings?: HomepageSettings | null;
};

export function Hero({ settings: initialSettings }: HeroProps) {
  const { data: settingsFromQuery } = useSettings();
  const settings = initialSettings ?? settingsFromQuery;

  return (
    <section
      id="home"
      className="min-h-[100dvh] flex flex-col justify-center pt-20 pb-12 relative texture-grain vignette particles overflow-hidden bg-[#1A1A1A]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/HeorImage1.jpeg"
          alt="Hero Background"
          fill
          priority
          className="object-cover object-center opacity-80"
          quality={100}
        />
        {/* Dark overlay for depth and readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Subtle light effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_40%,_rgba(255,255,255,0.05),_transparent)] pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center" style={{ paddingTop: '10vh' }}>
          {/* Main Headline */}
          <h1
            className="animate-scale-up uppercase"
            style={{
              fontFamily: "var(--font-heading), serif",
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(24px, 6vw, 58px)',
              color: '#FFFFFF',
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
              letterSpacing: '0.2em',
              lineHeight: 1.2,
              marginBottom: '2.5rem',
            }}
          >
            Attaining the Unattainable
          </h1>

          {/* Clutch logo */}
          <div
            className="flex justify-center mx-auto mb-8 md:mb-12 animate-fade-up w-full max-w-[180px] md:max-w-[240px]"
            style={{ animationDelay: "0.2s" }}
          >
            <Image
              src="/Clutch2.png"
              alt="Clutch"
              width={320}
              height={140}
              priority
              style={{
                width: '100%',
                height: 'auto',
                filter: 'brightness(0) invert(1)',
                display: 'block',
              }}
            />
          </div>

          {/* Subheadline */}
          <p
            className="mb-6 max-w-2xl mx-auto animate-fade-up leading-relaxed"
            style={{
              animationDelay: "0.3s",
              fontFamily: "var(--font-body), sans-serif",
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(15px, 3vw, 22px)',
              letterSpacing: '0.05em',
              color: 'rgba(255, 255, 255, 0.95)',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
            }}
          >
            Luxury personal shopping & sourcing
          </p>

          {/* Supporting line */}
          <p
            className="mb-16 sm:mb-24 md:mb-28 max-w-md mx-auto animate-fade-up"
            style={{
              animationDelay: "0.4s",
              fontFamily: "var(--font-body), sans-serif",
              fontWeight: 500,
              fontSize: '9px',
              letterSpacing: '0.2em',
              color: 'rgba(255, 255, 255, 0.5)',
              textTransform: 'uppercase',
            }}
          >
            Dubai-based · Worldwide delivery · Since 2017
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-20 sm:mb-32 md:mb-36 animate-fade-up px-4 sm:px-0"
            style={{ animationDelay: "0.5s" }}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto min-w-[240px] rounded-[2px] uppercase transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] border-0"
              style={{
                background: '#FFFFFF',
                color: '#000000',
                fontFamily: "var(--font-body), sans-serif",
                fontWeight: 500,
                fontSize: '11px',
                letterSpacing: '0.2em',
                padding: '14px 40px',
                height: '48px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F0F0F0';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,255,255,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
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
              className="w-full sm:w-auto min-w-[240px] rounded-[2px] uppercase transition-all duration-300 hover:scale-[1.02]"
              style={{
                border: '2px solid rgba(255,255,255,0.8)',
                background: 'transparent',
                color: '#FFFFFF',
                fontFamily: "var(--font-body), sans-serif",
                fontWeight: 500,
                fontSize: '11px',
                letterSpacing: '0.2em',
                padding: '14px 40px',
                height: '48px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.color = '#000000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#FFFFFF';
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
            <div
              className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-5 uppercase"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontWeight: 500,
                fontSize: '9px',
                letterSpacing: '0.2em',
                color: 'rgba(255, 255, 255, 0.4)'
              }}
            >
              <span className="hover:text-white transition-colors duration-400">The Clutch Experience</span>
              <span className="hidden sm:inline" style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
              <span className="hover:text-white transition-colors duration-400">Private Sourcing</span>
              <span className="hidden sm:inline" style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
              <span className="hover:text-white transition-colors duration-400">International delivery</span>
              <span className="hidden sm:inline" style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
              <span className="hover:text-white transition-colors duration-400">Since 2017</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
