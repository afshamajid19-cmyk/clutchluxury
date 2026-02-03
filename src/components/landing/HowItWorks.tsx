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
    <section id="how-it-works" className="py-32 md:py-44 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-clutch-elevated/30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 md:mb-24">
          <p className="section-overline mb-5">
            The Process
          </p>
          <h2 className="section-title">
            How It Works
          </h2>
          <div className="section-divider" />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-10">
            {steps.map((step, index) => (
              <div 
                key={step.number} 
                className="text-center group animate-fade-up cursor-default"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div 
                  className="font-display text-[56px] mb-6 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(139,127,116,0.3)]"
                  style={{ 
                    color: 'rgba(139,127,116,0.3)',
                    letterSpacing: '0.05em',
                    fontWeight: 300,
                    lineHeight: 1
                  }}
                >
                  {step.number}
                </div>
                <h3 
                  className="text-[18px] font-medium text-foreground mb-4 uppercase"
                  style={{ letterSpacing: '2px' }}
                >
                  {step.title}
                </h3>
                <p 
                  className="text-[15px] leading-[1.7] font-light max-w-[280px] mx-auto"
                  style={{ color: 'rgba(245,239,224,0.65)' }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="section-divider w-48 mt-20" />
          <p 
            className="text-center text-[11px] mt-8 uppercase"
            style={{ letterSpacing: '3px', color: 'rgba(139,127,116,0.5)' }}
          >
            Concierge-level sourcing with curated options
          </p>
        </div>
      </div>
    </section>
  );
}
