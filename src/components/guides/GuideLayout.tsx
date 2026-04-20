import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

interface GuideLayoutProps {
  title: string;
  description: string;
  heroImage: string;
  readTime: string;
  publishDate: string;
  slug: string;
  keywords: string;
  children: React.ReactNode;
  relatedGuides?: Array<{ slug: string; title: string; image: string }>;
}

// Attribution removed

export function GuideLayout({
  title,
  description,
  heroImage,
  readTime,
  publishDate,
  slug,
  keywords,
  children,
  relatedGuides,
}: GuideLayoutProps) {
  const canonicalUrl = `https://clutchluxury.lovable.app/guides/${slug}`;

  return (
    <>
      <Helmet>
        <title>{title} | Clutch Luxury Guides</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={heroImage} />
        <meta property="article:published_time" content={publishDate} />
        <meta property="article:author" content="Clutch Concierge" />
        <meta property="article:section" content="Luxury Guides" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: title,
            image: heroImage,
            datePublished: publishDate,
            dateModified: publishDate,
            author: { "@type": "Organization", name: "Clutch Concierge" },
            publisher: {
              "@type": "Organization",
              name: "Clutch",
              logo: { "@type": "ImageObject", url: "/images/clutch-logo-ccc.jpg" },
            },
            description,
            mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
          })}
        </script>
      </Helmet>

      <article className="min-h-screen" style={{ background: '#F9F7F5' }}>
        {/* Hero */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img src={heroImage} alt={title} className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent 60%)' }}
          />
          <div className="absolute top-6 left-6 z-10">
            <Link
              to="/#guides"
              className="inline-flex items-center gap-2 rounded-sm border transition-all duration-300 hover:-translate-y-px"
              style={{
                padding: '10px 16px',
                background: 'rgba(22, 18, 16, 0.14)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                borderColor: 'rgba(255,255,255,0.28)',
                boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
                color: '#FFFFFF',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
                fontSize: '11px',
                letterSpacing: '0.1em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(22, 18, 16, 0.24)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.42)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(22, 18, 16, 0.14)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)';
              }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Guides
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <span
                  className="uppercase"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 500,
                    fontSize: '10px',
                    letterSpacing: '0.15em',
                    color: 'rgba(255,255,255,0.7)',
                  }}
                >
                  {readTime}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
                <span
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 300,
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.7)',
                  }}
                >
                  By Clutch Concierge Team
                </span>
              </div>
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: 'clamp(28px, 5vw, 48px)',
                  color: '#FFFFFF',
                  lineHeight: 1.2,
                  letterSpacing: '0.05em',
                }}
              >
                {title}
              </h1>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-3xl mx-auto px-6 sm:px-6 py-16 md:py-24">
          <div className="guide-content">{children}</div>

          {/* Attribution removed */}

          {/* CTA */}
          <div
            className="mt-16 p-10 rounded-lg text-center"
            style={{
              background: '#E9E4DE',
              border: '1px solid rgba(134,103,88,0.2)',
            }}
          >
            <h3
              className="mb-4"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: '28px',
                color: '#6B6B6B',
                letterSpacing: '0.08em',
              }}
            >
              Need Help Sourcing?
            </h3>
            <p
              className="mb-6"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
                fontSize: '14px',
                color: '#565250',
              }}
            >
              Let Clutch source your dream piece — get in touch with our concierge team.
            </p>
            <button
              onClick={() => {
                window.location.href = "/#contact";
              }}
              className="inline-block rounded-[2px] uppercase transition-all duration-[400ms] hover:scale-[1.02]"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
                fontSize: '11px',
                letterSpacing: '0.18em',
                padding: '14px 36px',
                background: '#6B6B6B',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#4A4A4A'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#6B6B6B'; }}
            >
              Contact Us
            </button>
          </div>

          {/* Related */}
          {relatedGuides && relatedGuides.length > 0 && (
            <div className="mt-16">
              <h3
                className="mb-8 text-center"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: '24px',
                  color: '#6B6B6B',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Related Guides
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedGuides.map((g) => (
                  <Link
                    key={g.slug}
                    to={`/guides/${g.slug}`}
                    className="group rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: '#F5F2EE',
                      border: '1px solid rgba(134,103,88,0.15)',
                    }}
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={g.image}
                        alt={g.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <p
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 500,
                          fontSize: '14px',
                          color: '#291E15',
                        }}
                      >
                        {g.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
