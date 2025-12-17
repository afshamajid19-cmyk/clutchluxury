import { forwardRef } from "react";
import { useSettings } from "@/hooks/useSettings";

export const Footer = forwardRef<HTMLElement>(function Footer(_, ref) {
  const { data: settings } = useSettings();

  return (
    <footer ref={ref} className="py-20 md:py-24 bg-clutch-surface border-t border-accent/20">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo */}
          <div className="font-display text-2xl tracking-luxury text-gold-gradient uppercase mb-10">
            Clutch
          </div>

          {/* Disclaimer */}
          <p className="text-sm text-muted-foreground/60 mb-10 leading-relaxed max-w-lg mx-auto font-light">
            {settings?.disclaimer_text ||
              "Clutch is an independent luxury sourcing platform. We are in no way affiliated with any of the brands we source."}
          </p>

          {/* Ornate Divider */}
          <div className="ornate-divider w-24 mx-auto mb-10" />

          {/* Privacy & Copyright */}
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground/40 tracking-wide">
              We use your details only to respond to your request.
            </p>
            <p className="text-xs text-accent/40 tracking-luxury uppercase">
              © {new Date().getFullYear()} Clutch Luxury Sourcing
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});
