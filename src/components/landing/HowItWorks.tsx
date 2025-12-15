const steps = [
  {
    number: "01",
    title: "Share Your Wishlist",
    description: "Tell us what you're looking for—from rare Hermès to limited editions.",
  },
  {
    number: "02",
    title: "We Source Options",
    description: "Our network locates authentic pieces and provides detailed quotes.",
  },
  {
    number: "03",
    title: "Confirm & Pay",
    description: "Review your options, confirm your choice, and we handle the rest.",
  },
  {
    number: "04",
    title: "Worldwide Delivery",
    description: "Discreet packaging with international shipping to your door.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-secondary/40">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            A seamless sourcing experience
          </p>
        </div>

        {/* Editorial horizontal layout */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative text-center md:text-left group"
              >
                {/* Connector line - visible on desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-1/2 right-0 h-px bg-border -translate-x-1/2 w-full" />
                )}
                
                <div className="relative z-10 md:pr-8">
                  {/* Number */}
                  <span className="inline-block text-accent text-xs tracking-editorial font-medium mb-4">
                    {step.number}
                  </span>
                  
                  {/* Title */}
                  <h3 className="font-serif text-lg md:text-xl text-foreground mb-2">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Mobile divider */}
                {index < steps.length - 1 && (
                  <div className="md:hidden w-12 h-px bg-border mx-auto mt-8" />
                )}
              </div>
            ))}
          </div>

          {/* Concierge note */}
          <div className="mt-16 text-center">
            <p className="text-xs text-muted-foreground/60 tracking-editorial uppercase">
              Concierge-level sourcing with curated options
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
