import { forwardRef } from "react";
import { useSettings } from "@/hooks/useSettings";

export const Footer = forwardRef<HTMLElement>(function Footer(_, ref) {
  const { data: settings } = useSettings();

  return (
    <footer 
      ref={ref} 
      className="py-20 md:py-24 border-t border-sage/15"
      style={{ background: '#291E15' }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-[800px] mx-auto text-center">
          {/* Logo - Playfair Display, centered */}
          <div 
            className="font-display text-2xl uppercase mb-12 text-ivory"
            style={{ letterSpacing: '0.3em' }}
          >
            Clutch
          </div>

          {/* Disclaimer */}
          <p 
            className="text-[12px] leading-[1.8] mb-12 max-w-lg mx-auto font-sans font-light"
            style={{ color: 'rgba(146,131,119,0.6)' }}
          >
            {settings?.disclaimer_text ||
              "Clutch is an independent luxury sourcing platform. We are in no way affiliated with any of the brands we source."}
          </p>

          {/* Ornate Divider */}
          <div className="ornate-divider w-24 mx-auto mb-10" />

          {/* Privacy & Copyright */}
          <div className="space-y-4">
            <p 
              className="text-[12px] font-sans font-light"
              style={{ color: 'rgba(146,131,119,0.5)', letterSpacing: '1px' }}
            >
              We use your details only to respond to your request.
            </p>
            <p 
              className="text-[11px] uppercase font-sans font-light"
              style={{ color: 'rgba(146,131,119,0.4)', letterSpacing: '2px', fontVariant: 'small-caps' }}
            >
              © {new Date().getFullYear()} Clutch Luxury Sourcing
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});