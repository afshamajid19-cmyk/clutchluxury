import { forwardRef } from "react";
import { useSettings } from "@/hooks/useSettings";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const Footer = forwardRef<HTMLElement>(function Footer(_, ref) {
  const { data: settings } = useSettings();
  const { ref: revealRef, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <footer 
      ref={ref} 
      className="py-20 sm:py-28 md:py-32"
      style={{ 
        background: '#E9E4DE',
        borderTop: '1px solid rgba(134,103,88,0.2)'
      }}
    >
      <div ref={revealRef} className="container mx-auto px-5 sm:px-6">
        <div className="max-w-[800px] mx-auto text-center">
          {/* Logo */}
          <div 
            className={`uppercase mb-10 sm:mb-14 blur-reveal ${isVisible ? 'revealed' : ''}`}
            style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: '24px',
              letterSpacing: '0.25em',
              background: 'linear-gradient(135deg, #928377 0%, #866758 50%, #6b5345 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Clutch
          </div>

          {/* Disclaimer */}
          <p 
            className={`mb-10 sm:mb-14 max-w-lg mx-auto px-4 scroll-reveal ${isVisible ? 'revealed' : ''}`}
            style={{ 
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              fontSize: '12px',
              lineHeight: 1.8,
              color: '#928377',
              transitionDelay: '0.15s',
            }}
          >
            {settings?.disclaimer_text ||
              "Clutch is an independent luxury sourcing platform. We are in no way affiliated with any of the brands we source."}
          </p>

          {/* Logo Divider */}
          <div className={`flex justify-center mb-8 sm:mb-12 scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{ transitionDelay: '0.25s' }}>
            <img 
              src="/images/clutch-logo-4c.png" 
              alt="Clutch" 
              className="gentle-float"
              style={{ width: '50px', height: '50px', opacity: 0.35 }}
            />
          </div>

          {/* Privacy & Copyright */}
          <div className={`space-y-4 sm:space-y-5 scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{ transitionDelay: '0.35s' }}>
            <p 
              className="px-4"
              style={{ 
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
                fontSize: '12px',
                color: '#928377', 
                letterSpacing: '0.05em' 
              }}
            >
              We use your details only to respond to your request.
            </p>
            <p 
              className="uppercase"
              style={{ 
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
                fontSize: '10px',
                color: '#928377', 
                letterSpacing: '0.15em' 
              }}
            >
              © {new Date().getFullYear()} Clutch Luxury Sourcing
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});
