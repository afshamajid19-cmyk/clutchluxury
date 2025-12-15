export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-secondary/40">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-10">
            About Clutch
          </h2>

          <div className="space-y-6 text-muted-foreground leading-relaxed text-base md:text-lg">
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

          <div className="mt-12 pt-10 border-t border-border">
            <p className="text-xs text-muted-foreground/60 tracking-wide">
              Independent sourcing. No brand affiliation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
