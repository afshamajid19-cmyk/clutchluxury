import { forwardRef } from "react";
import { useSettings } from "@/hooks/useSettings";

export const Footer = forwardRef<HTMLElement>(function Footer(_, ref) {
  const { data: settings } = useSettings();

  return (
    <footer 
      ref={ref} 
      className="py-20 md:py-24"
      style={{ background: '#DDD7CF', borderTop: '1px solid rgba(134,103,88,0.15)' }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-[800px] mx-auto text-center">
          {/* Logo */}
          <div 
            className="font-display text-2xl uppercase mb-12"
            style={{ 
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
            className="text-[12px] leading-[1.7] mb-12 max-w-lg mx-auto font-light"
            style={{ color: '#928377' }}
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
              style={{ color: '#928377', letterSpacing: '1px' }}
            >
              We use your details only to respond to your request.
            </p>
            <p 
              className="text-[11px] uppercase"
              style={{ color: 'rgba(146,131,119,0.7)', letterSpacing: '2px' }}
            >
              © {new Date().getFullYear()} Clutch Luxury Sourcing
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});
