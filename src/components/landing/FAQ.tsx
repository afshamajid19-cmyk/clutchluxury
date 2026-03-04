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
      "To share your wishlist or inquire about specific luxury items, please contact us on WhatsApp at +971 56 669 7372. Our concierge team will personally review your request and respond with curated options, pricing, and sourcing timelines within 24-48 hours.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept bank transfers, wire transfers, cryptocurrency, and select payment methods. Payment details are provided once you confirm your order.",
  },
  {
    question: "Can I return or exchange items?",
    answer:
      "Due to the nature of luxury sourcing, returns and exchanges are evaluated on a case-by-case basis. We ensure all items are authenticated and as described before shipment.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-40 md:py-56 relative" style={{ background: '#E9E4DE' }}>
      {/* Section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(146,131,119,0.25), transparent)' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <p className="section-overline mb-5">
              Questions
            </p>
            <h2 className="section-title mb-12">
              Frequently Asked
            </h2>
            <div className="section-divider" />
          </div>

          <Accordion type="single" collapsible className="space-y-5">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-md overflow-hidden"
                style={{
                  background: '#F5F2EE',
                  border: '1px solid rgba(134,103,88,0.15)',
                  transition: 'all 400ms ease',
                }}
              >
                <AccordionTrigger 
                  className="py-7 px-8 hover:no-underline text-left transition-colors duration-[400ms]"
                  style={{ 
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 400,
                    fontSize: '19px',
                    color: '#291E15',
                    letterSpacing: '0.03em',
                  }}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent 
                  className="px-8 pb-8"
                  style={{ 
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 300,
                    fontSize: '15px',
                    lineHeight: 1.9,
                    color: '#565250',
                  }}
                >
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
