export function About() {
  return (
    <section id="about" className="py-32 md:py-44 relative" style={{ background: '#E9E4DE' }}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-[800px] mx-auto text-center">
          <p className="section-overline mb-5">
            Our Story
          </p>
          <h2 className="section-title mb-12">
            About Clutch
          </h2>
          <div className="section-divider mb-14" />

          <div className="space-y-10 max-w-[680px] mx-auto">
            <p 
              className="text-[17px] leading-[1.9] font-light"
              style={{ color: '#565250' }}
            >
              Established in Dubai in 2017, Clutch is a boutique sourcing platform 
              for discerning clients seeking exceptional luxury pieces. We specialize 
              in locating rare and sought-after items from the world's most prestigious maisons.
            </p>

            <p 
              className="text-[17px] leading-[1.9] font-light"
              style={{ color: '#565250' }}
            >
              Our global network and discreet approach have earned the trust of 
              collectors and connoisseurs worldwide. With international shipping 
              to over 50 countries, we bring exclusivity directly to your door.
            </p>
          </div>

          <div className="mt-16 pt-14 relative" style={{ borderTop: '1px solid rgba(134,103,88,0.2)' }}>
            {/* Decorative line above */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(134,103,88,0.3), transparent)' }} />
            <p 
              className="text-[11px] uppercase"
              style={{ letterSpacing: '3px', color: '#928377' }}
            >
              Independent sourcing · No brand affiliation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
