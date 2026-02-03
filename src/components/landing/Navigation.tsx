import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Trending", href: "#trending" },
  { label: "About", href: "#about" },
  { label: "Request", href: "#request" },
  { label: "Contact", href: "#contact" },
  { label: "FAQ", href: "#faq" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-espresso/95 via-espresso/90 to-espresso/80 backdrop-blur-md border-b border-sage/10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo - Playfair Display, all caps, wide tracking */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="font-display text-xl md:text-2xl tracking-luxury text-ivory uppercase font-medium"
          >
            Clutch
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-[11px] font-sans font-light text-ivory/70 hover:text-ivory transition-colors duration-500 tracking-wide-custom uppercase link-underline"
                style={{ fontVariant: 'small-caps' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleNavClick("#request")}
              className="text-xs tracking-wide-custom h-11 px-6 border border-ivory/30 bg-transparent text-ivory hover:bg-ivory hover:text-espresso transition-all duration-400 uppercase font-light"
            >
              Request an Item
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-10 w-10 text-ivory">
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm bg-espresso border-l border-sage/20 p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-sage/20">
                  <span className="font-display text-xl tracking-luxury text-ivory uppercase">Clutch</span>
                </div>
                <div className="flex-1 py-8 px-6">
                  <div className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(link.href);
                        }}
                        className="py-4 text-base font-sans font-light text-ivory/80 hover:text-ivory transition-colors duration-500 tracking-wide border-b border-sage/10 last:border-0"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="p-6 border-t border-sage/20">
                  <Button
                    size="lg"
                    className="w-full bg-sage text-espresso hover:bg-taupe transition-all duration-400"
                    onClick={() => handleNavClick("#request")}
                  >
                    Request an Item
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}