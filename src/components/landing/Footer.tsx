import { forwardRef } from "react";
import { useSettings } from "@/hooks/useSettings";

export const Footer = forwardRef<HTMLElement>(function Footer(_, ref) {
  const { data: settings } = useSettings();

  return (
    <footer ref={ref} className="py-16 md:py-20 bg-foreground text-background">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo */}
          <div className="font-serif text-2xl tracking-luxury uppercase mb-8">
            Clutch
          </div>

          {/* Disclaimer */}
          <p className="text-sm text-background/50 mb-8 leading-relaxed max-w-lg mx-auto">
            {settings?.disclaimer_text ||
              "Clutch is an independent luxury sourcing platform. We are in no way affiliated with any of the brands we source."}
          </p>

          {/* Divider */}
          <div className="w-12 h-px bg-background/20 mx-auto mb-8" />

          {/* Privacy & Copyright */}
          <div className="space-y-2">
            <p className="text-xs text-background/40">
              We use your details only to respond to your request.
            </p>
            <p className="text-xs text-background/40">
              © {new Date().getFullYear()} Clutch Luxury Sourcing. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});
