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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="font-serif text-xl md:text-2xl tracking-luxury text-foreground uppercase"
          >
            Clutch
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-editorial uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button
              variant="premium"
              size="sm"
              onClick={() => handleNavClick("#request")}
              className="tracking-wide"
            >
              Request an Item
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-10 w-10">
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm bg-background border-l border-border p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-border">
                  <span className="font-serif text-xl tracking-luxury uppercase">Clutch</span>
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
                        className="py-4 text-base font-medium text-foreground hover:text-accent transition-colors duration-300 tracking-wide border-b border-border/50 last:border-0"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="p-6 border-t border-border">
                  <Button
                    variant="premium"
                    size="lg"
                    className="w-full tracking-wide"
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
