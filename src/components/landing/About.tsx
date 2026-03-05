export function About() {
  return (
    <section id="about" className="py-24 sm:py-40 md:py-56 relative" style={{ background: '#E9E4DE' }}>
      {/* Section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(146,131,119,0.25), transparent)' }} />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-[800px] mx-auto text-center">
          <p className="section-overline mb-5">Our Story</p>
          <h2 className="section-title mb-14">About Clutch</h2>
          <div className="section-divider mb-12 sm:mb-16" />

          <div className="space-y-8 sm:space-y-12 max-w-[680px] mx-auto">
            <p 
              style={{ 
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
                fontSize: '15px',
                lineHeight: 1.9,
                color: '#565250' 
              }}
            >
              Established in Dubai in 2017, Clutch is a boutique sourcing platform 
              for discerning clients seeking exceptional luxury pieces. We specialize 
              in locating rare and sought-after items from the world's most prestigious maisons.
            </p>

            <p 
              style={{ 
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
                fontSize: '15px',
                lineHeight: 1.9,
                color: '#565250' 
              }}
            >
              Our global network and discreet approach have earned the trust of 
              collectors and connoisseurs worldwide. With international shipping 
              to over 50 countries, we bring exclusivity directly to your door.
            </p>
          </div>

          <div className="mt-14 sm:mt-20 pt-12 sm:pt-16 relative" style={{ borderTop: '1px solid rgba(134,103,88,0.2)' }}>
            <p 
              className="uppercase"
              style={{ 
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
                fontSize: '10px',
                letterSpacing: '0.2em', 
                color: '#928377' 
              }}
            >
              Independent sourcing · No brand affiliation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
