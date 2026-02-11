import { forwardRef } from "react";
import { useSettings } from "@/hooks/useSettings";

export const Footer = forwardRef<HTMLElement>(function Footer(_, ref) {
  const { data: settings } = useSettings();

  return (
    <footer 
      ref={ref} 
      className="py-20 md:py-24 border-t border-taupe-DEFAULT/20"
      style={{ background: '#151210' }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-[800px] mx-auto text-center">
          {/* Logo */}
          <div 
            className="font-display text-2xl uppercase mb-12"
            style={{ 
              letterSpacing: '0.25em',
              background: 'linear-gradient(135deg, #A89B8E 0%, #8B7F74 50%, #6B5E54 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Clutch
          </div>

          {/* Disclaimer */}
          <p 
            className="text-[12px] leading-[1.7] mb-12 max-w-lg mx-auto font-light"
            style={{ color: 'rgba(139,127,116,0.5)' }}
          >
            {settings?.disclaimer_text ||
              "Clutch is an independent luxury sourcing platform. We are in no way affiliated with any of the brands we source."}
          </p>

          {/* Ornate Divider */}
          <div className="ornate-divider w-24 mx-auto mb-10" />

          {/* Privacy & Copyright */}
          <div className="space-y-4">
            <p 
              className="text-[12px]"
              style={{ color: 'rgba(139,127,116,0.4)', letterSpacing: '1px' }}
            >
              We use your details only to respond to your request.
            </p>
            <p 
              className="text-[11px] uppercase"
              style={{ color: 'rgba(139,127,116,0.4)', letterSpacing: '2px' }}
            >
              © {new Date().getFullYear()} Clutch Luxury Sourcing
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});
