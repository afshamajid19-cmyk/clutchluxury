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
    <section id="how-it-works" className="py-32 md:py-40 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-clutch-elevated/30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <p className="text-xs tracking-luxury uppercase text-accent/70 mb-6 font-medium">
            The Process
          </p>
          <h2 className="font-display text-display text-gold-gradient mb-6 uppercase">
            How It Works
          </h2>
          <div className="ornate-divider w-32 mx-auto" />
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
            {steps.map((step, index) => (
              <div 
                key={step.number} 
                className="text-center group animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-gold-gradient font-display text-5xl md:text-6xl mb-6 group-hover:scale-110 transition-transform duration-500">
                  {step.number}
                </div>
                <h3 className="text-sm font-medium text-foreground mb-3 tracking-wide uppercase">
                  {step.title}
                </h3>
                <p className="text-xs text-muted-foreground/70 leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="ornate-divider w-48 mx-auto mt-16" />
          <p className="text-center text-xs text-muted-foreground/50 mt-8 tracking-luxury uppercase">
            Concierge-level sourcing with curated options
          </p>
        </div>
      </div>
    </section>
  );
}
