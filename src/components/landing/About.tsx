export function About() {
  return (
    <section id="about" className="py-32 md:py-44 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-clutch-elevated/40" />
      
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
              style={{ color: 'rgba(245,239,224,0.75)' }}
            >
              Established in Dubai in 2017, Clutch is a boutique sourcing platform 
              for discerning clients seeking exceptional luxury pieces. We specialize 
              in locating rare and sought-after items from the world's most prestigious maisons.
            </p>

            <p 
              className="text-[17px] leading-[1.9] font-light"
              style={{ color: 'rgba(245,239,224,0.75)' }}
            >
              Our global network and discreet approach have earned the trust of 
              collectors and connoisseurs worldwide. With international shipping 
              to over 50 countries, we bring exclusivity directly to your door.
            </p>
          </div>

          <div className="mt-16 pt-14 border-t border-taupe-DEFAULT/20 relative">
            {/* Decorative line above */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-taupe-DEFAULT/40 to-transparent" />
            <p 
              className="text-[11px] uppercase"
              style={{ letterSpacing: '3px', color: 'rgba(139,127,116,0.5)' }}
            >
              Independent sourcing · No brand affiliation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
