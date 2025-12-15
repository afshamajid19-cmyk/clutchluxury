export function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-8">
            About Clutch
          </h2>

          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Clutch is an independent luxury sourcing platform, established in
              Dubai in 2017. We specialize in sourcing highly sought-after pieces
              from the world's most prestigious maisons.
            </p>

            <p>
              Our boutique personal shopping experience is built on discretion,
              authenticity, and a global network of trusted sources. From limited
              editions to waitlist-only pieces, we help our clients attain the
              unattainable.
            </p>

            <p>
              With international shipping to over 50 countries, we bring luxury
              directly to your door—wherever you are.
            </p>
          </div>

          <div className="mt-10 pt-10 border-t border-border">
            <p className="text-xs text-muted-foreground/70 italic">
              Clutch is an independent platform. We are in no way affiliated
              with any of the brands we source.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
