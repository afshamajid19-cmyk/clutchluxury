import { Send, Search, CreditCard, Package } from "lucide-react";

const steps = [
  {
    icon: Send,
    title: "Share your wishlist",
    description: "Tell us what you're looking for, from rare Hermès to limited editions.",
  },
  {
    icon: Search,
    title: "We source options",
    description: "Our network finds authentic pieces and provides detailed quotes.",
  },
  {
    icon: CreditCard,
    title: "Confirm and pay",
    description: "Review your options, confirm your choice, and we handle the rest.",
  },
  {
    icon: Package,
    title: "Delivery worldwide",
    description: "Discreet packaging with international shipping to your door.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            A seamless sourcing experience in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="text-center group"
            >
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-background border border-border group-hover:border-accent transition-colors luxury-shadow">
                <step.icon className="h-6 w-6 text-foreground" />
              </div>
              <div className="text-sm text-accent font-medium mb-2 tracking-widest">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="font-serif text-lg font-medium text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
