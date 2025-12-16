export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Share Your Wishlist",
      description: "Tell us what you're looking for – a specific item or a general request.",
    },
    {
      number: "02",
      title: "We Source Options",
      description: "Our team sources verified options and presents you with curated quotes.",
    },
    {
      number: "03",
      title: "Confirm & Pay",
      description: "Review the options, confirm your selection, and complete payment securely.",
    },
    {
      number: "04",
      title: "Delivery",
      description: "Receive your item via secure shipping – international delivery available.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-luxury uppercase text-muted-foreground mb-4">
            The Process
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            How It Works
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            {steps.map((step) => (
              <div key={step.number} className="text-center md:text-left">
                <div className="text-accent font-serif text-3xl md:text-4xl mb-4">
                  {step.number}
                </div>
                <h3 className="text-sm font-medium text-foreground mb-2 tracking-wide">
                  {step.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          
          <p className="text-center text-xs text-muted-foreground/60 mt-12 tracking-wide">
            Concierge-level sourcing with curated options.
          </p>
        </div>
      </div>
    </section>
  );
}
