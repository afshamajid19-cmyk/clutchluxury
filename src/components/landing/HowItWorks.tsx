import { useScrollReveal } from "@/hooks/useScrollReveal";

export function HowItWorks() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

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
    <section id="how-it-works" className="py-24 sm:py-40 md:py-56 relative" style={{ background: '#E9E4DE' }}>
      {/* Section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(146,131,119,0.25), transparent)' }} />
      
      <div ref={sectionRef} className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className={`text-center mb-16 sm:mb-24 md:mb-28 scroll-reveal ${isVisible ? 'revealed' : ''}`}>
          <p className="section-overline mb-5">
            The Process
          </p>
          <h2 className="section-title mb-12">
            How It Works
          </h2>
          <div className={`section-divider divider-reveal ${isVisible ? 'revealed' : ''}`} />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 sm:gap-14 md:gap-14 scroll-reveal ${isVisible ? 'revealed' : ''}`}>
            {steps.map((step) => (
              <div 
                key={step.number} 
                className="text-center group cursor-default reveal-child"
              >
                {/* Step number */}
                <div 
                  className="mb-6 sm:mb-8 transition-all duration-[400ms] group-hover:scale-110 number-reveal"
                  style={{ 
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: 'clamp(56px, 8vw, 64px)',
                    color: 'rgba(134,103,88,0.3)',
                    letterSpacing: '0.05em',
                    lineHeight: 1,
                  }}
                >
                  {step.number}
                </div>
                {/* Step title */}
                <h3 
                  className="mb-4 sm:mb-5 uppercase"
                  style={{ 
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 500,
                    fontSize: '13px',
                    letterSpacing: '0.15em', 
                    color: '#6B6B6B' 
                  }}
                >
                  {step.title}
                </h3>
                {/* Step description */}
                <p 
                  className="max-w-[280px] mx-auto"
                  style={{ 
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 300,
                    fontSize: '14px',
                    lineHeight: 1.9,
                    color: '#565250' 
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className={`section-divider w-48 mt-16 sm:mt-24 divider-reveal ${isVisible ? 'revealed' : ''}`} style={{ transitionDelay: '0.5s' }} />
          <p 
            className={`text-center mt-8 sm:mt-10 uppercase scroll-reveal ${isVisible ? 'revealed' : ''}`}
            style={{ 
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
              fontSize: '10px',
              letterSpacing: '0.2em', 
              color: '#928377',
              transitionDelay: '0.6s',
            }}
          >
            Concierge-level sourcing with curated options
          </p>
        </div>
      </div>
    </section>
  );
}
