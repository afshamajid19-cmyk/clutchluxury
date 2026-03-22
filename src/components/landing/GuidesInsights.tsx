import { Link } from "react-router-dom";

const guides = [
  {
    slug: "hermes-leather-types",
    title: "How to Identify Hermès Leather Types",
    excerpt: "From Togo to Crocodile — a comprehensive guide to understanding the leathers that define Hermès craftsmanship.",
    image: "/images/blog/bags_upper_view.jpg",
    readTime: "8 min read",
  },
  {
    slug: "hermes-color-guide",
    title: "Hermès Color Guide: Understanding Hermès Bag Colors",
    excerpt: "Permanent vs. seasonal, color codes, and how hues affect resale value in the world of Hermès collecting.",
    image: "/images/blog/birkin_coloured_bags.jpg",
    readTime: "7 min read",
  },
  {
    slug: "hermes-date-stamps",
    title: "How to Read Hermès Date Stamps",
    excerpt: "Decode year codes, craftsman stamps, and authentication markers on your Hermès bag with this detailed guide.",
    image: "/images/blog/mini_kelly_front_view.jpg",
    readTime: "6 min read",
  },
  {
    slug: "quota-vs-non-quota-bags",
    title: "Quota Bags vs Non-Quota Bags: What You Need to Know",
    excerpt: "Understanding the Hermès purchasing system — which bags require a purchase history and which are freely available.",
    image: "/images/blog/birkin_with_clutch_logo.jpg",
    readTime: "9 min read",
  },
];

export function GuidesInsights() {
  return (
    <section id="guides" className="py-24 sm:py-40 md:py-56 relative" style={{ background: '#E9E4DE' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(146,131,119,0.25), transparent)' }} />

      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="text-center mb-16 sm:mb-24 md:mb-28">
          <p className="section-overline mb-5">Knowledge</p>
          <h2 className="section-title mb-12">Guides & Insights</h2>
          <div className="section-divider" />
          <p
            className="max-w-md mx-auto mt-8 sm:mt-10"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              fontSize: '15px',
              lineHeight: 1.9,
              color: '#928377',
            }}
          >
            Expert knowledge on luxury pieces
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 max-w-5xl mx-auto">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              to={`/guides/${guide.slug}`}
              className="group rounded-lg overflow-hidden transition-all duration-[400ms] hover:-translate-y-2"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(134,103,88,0.12)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.04)';
              }}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="uppercase"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 500,
                      fontSize: '9px',
                      letterSpacing: '0.2em',
                      color: '#928377',
                    }}
                  >
                    {guide.readTime}
                  </span>
                </div>
                <h3
                  className="mb-3 line-clamp-2"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 500,
                    fontSize: '16px',
                    color: '#291E15',
                    lineHeight: 1.5,
                  }}
                >
                  {guide.title}
                </h3>
                <p
                  className="mb-5 line-clamp-2"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 300,
                    fontSize: '14px',
                    lineHeight: 1.8,
                    color: '#565250',
                  }}
                >
                  {guide.excerpt}
                </p>
                <span
                  className="inline-flex items-center transition-colors duration-[400ms] group-hover:underline"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 500,
                    fontSize: '12px',
                    letterSpacing: '0.05em',
                    color: '#866758',
                  }}
                >
                  Read Guide →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
