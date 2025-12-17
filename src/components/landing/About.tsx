export function About() {
  return (
    <section id="about" className="py-32 md:py-40 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-clutch-elevated/40" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-luxury uppercase text-accent/70 mb-6 font-medium">
            Our Story
          </p>
          <h2 className="font-display text-display text-gold-gradient mb-8 uppercase">
            About Clutch
          </h2>
          <div className="ornate-divider w-32 mx-auto mb-12" />

          <div className="space-y-8 text-muted-foreground leading-loose text-base md:text-lg font-light">
            <p>
              Established in Dubai in 2017, Clutch is a boutique sourcing platform 
              for discerning clients seeking exceptional luxury pieces. We specialize 
              in locating rare and sought-after items from the world's most prestigious maisons.
            </p>

            <p>
              Our global network and discreet approach have earned the trust of 
              collectors and connoisseurs worldwide. With international shipping 
              to over 50 countries, we bring exclusivity directly to your door.
            </p>
          </div>

          <div className="mt-16 pt-12 border-t border-accent/20">
            <p className="text-xs text-accent/50 tracking-luxury uppercase">
              Independent sourcing · No brand affiliation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
