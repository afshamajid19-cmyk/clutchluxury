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
      {/* Background with subtle gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(41,30,21,0.3) 0%, rgba(41,30,21,0.6) 100%)'
        }}
      />
      
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
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'backwards' }}
              >
                <div 
                  className="font-display text-[56px] mb-6 transition-all duration-500 group-hover:scale-110"
                  style={{ 
                    color: 'rgba(146,131,119,0.3)',
                    letterSpacing: '0.05em',
                    fontWeight: 300,
                    lineHeight: 1
                  }}
                >
                  {step.number}
                </div>
                <h3 
                  className="text-[18px] font-sans font-medium text-ivory mb-4 uppercase"
                  style={{ letterSpacing: '2px' }}
                >
                  {step.title}
                </h3>
                <p 
                  className="text-[15px] leading-[1.7] font-sans font-light max-w-[280px] mx-auto"
                  style={{ color: 'rgba(233,234,222,0.65)' }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="section-divider w-48 mt-20" />
          <p 
            className="text-center text-[11px] mt-8 uppercase font-sans font-light"
            style={{ letterSpacing: '3px', color: 'rgba(146,131,119,0.6)', fontVariant: 'small-caps' }}
          >
            Concierge-level sourcing with curated options
          </p>
        </div>
      </div>
    </section>
  );
}