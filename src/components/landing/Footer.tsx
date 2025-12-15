import { useSettings } from "@/hooks/useSettings";

export function Footer() {
  const { data: settings } = useSettings();

  return (
    <footer className="py-12 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="font-serif text-2xl tracking-wide mb-6">CLUTCH</div>

          <p className="text-sm text-background/60 mb-6 leading-relaxed">
            {settings?.disclaimer_text ||
              "Clutch is an independent luxury sourcing platform. We are in no way affiliated with any of the brands we source."}
          </p>

          <div className="pt-6 border-t border-background/10">
            <p className="text-xs text-background/40 mb-2">
              We use your details only to respond to your request.
            </p>
            <p className="text-xs text-background/40">
              © {new Date().getFullYear()} Clutch Luxury Sourcing. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
