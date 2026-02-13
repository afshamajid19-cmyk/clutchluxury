import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Trending", href: "#trending" },
  { label: "About", href: "#about" },
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
    <nav 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{ 
        background: 'rgba(233, 228, 222, 0.85)',
        borderBottom: '1px solid rgba(134, 103, 88, 0.15)'
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-18 md:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="font-display text-xl md:text-2xl tracking-luxury text-taupe-gradient uppercase"
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
                className="text-[11px] font-medium tracking-luxury uppercase transition-colors duration-500"
                style={{ color: '#291E15' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#866758'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#291E15'; }}
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
              onClick={() => handleNavClick("#contact")}
              className="text-xs tracking-luxury h-10"
              style={{
                border: '1px solid rgba(134,103,88,0.4)',
                color: '#291E15',
                background: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#866758';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.borderColor = '#866758';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#291E15';
                e.currentTarget.style.borderColor = 'rgba(134,103,88,0.4)';
              }}
            >
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-10 w-10" style={{ color: '#291E15' }}>
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-full max-w-sm p-0"
              style={{ 
                background: '#F5F2EE',
                borderLeft: '1px solid rgba(134,103,88,0.2)'
              }}
            >
              <div className="flex flex-col h-full">
                <div className="p-6" style={{ borderBottom: '1px solid rgba(134,103,88,0.15)' }}>
                  <span className="font-display text-xl tracking-luxury text-taupe-gradient uppercase">Clutch</span>
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
                        className="py-4 text-base font-medium transition-colors duration-500 tracking-wide"
                        style={{ 
                          color: '#291E15',
                          borderBottom: '1px solid rgba(134,103,88,0.1)'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#866758'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#291E15'; }}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="p-6" style={{ borderTop: '1px solid rgba(134,103,88,0.15)' }}>
                  <Button
                    size="lg"
                    className="w-full"
                    style={{ background: '#866758', color: '#FFFFFF' }}
                    onClick={() => handleNavClick("#contact")}
                  >
                    Contact Us
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
