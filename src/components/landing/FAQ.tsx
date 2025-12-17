import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What do you source?",
    answer:
      "We source luxury items from prestigious maisons including Hermès, Chanel, Rolex, Louis Vuitton, Cartier, Dior, and many more. From bags and watches to accessories and ready-to-wear, we can help locate most luxury items.",
  },
  {
    question: "How long does sourcing take?",
    answer:
      "Timelines vary based on item availability and rarity. Common pieces may take 1–2 weeks, while highly sought-after or limited items can take longer. We provide realistic estimates once we assess your request.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship worldwide to over 50 countries. All shipments are fully insured and include tracking. Shipping costs and times vary by destination.",
  },
  {
    question: "How do quotes work?",
    answer:
      "After receiving your request, we source options and provide a detailed quote including the item price, our service fee, and shipping. There's no obligation until you confirm.",
  },
  {
    question: "Are you affiliated with the brands you source?",
    answer:
      "No, Clutch is an independent luxury sourcing platform. We are in no way affiliated with any of the brands we source. All items are authenticated and sourced through our network.",
  },
  {
    question: "How do I share my wishlist?",
    answer:
      "You can submit a request through our form above, message us on WhatsApp, or reach out via Instagram. Share as many details as possible—model, size, colour, hardware preference—to help us find exactly what you're looking for.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept bank transfers, wire transfers, and select payment methods. Payment details are provided once you confirm your order. We do not accept cryptocurrency at this time.",
  },
  {
    question: "Can I return or exchange items?",
    answer:
      "Due to the nature of luxury sourcing, returns and exchanges are evaluated on a case-by-case basis. We ensure all items are authenticated and as described before shipment.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-32 md:py-40 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-luxury uppercase text-accent/70 mb-6 font-medium">
              Questions
            </p>
            <h2 className="font-display text-display text-gold-gradient mb-6 uppercase">
              Frequently Asked
            </h2>
            <div className="ornate-divider w-32 mx-auto" />
          </div>

          <Accordion type="single" collapsible className="space-y-0">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-accent/20 first:border-t"
              >
                <AccordionTrigger className="py-6 hover:no-underline text-left pr-4 text-foreground hover:text-accent transition-colors duration-500 font-serif text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground/80 pb-6 leading-relaxed text-sm font-light">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
