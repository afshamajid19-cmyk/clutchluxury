"use client";

import { GuideLayout } from "@/components/guides/GuideLayout";

export default function QuotaVsNonQuotaBags() {
  return (
    <GuideLayout
      title="Quota Bags vs Non-Quota Bags: What You Need to Know"
      description="Understanding the Hermès purchasing system — which bags require a purchase history, the 2-bag rule, and how to source quota bags through trusted resellers."
      heroImage="/images/blog/birkin_with_clutch_logo.jpg"
      readTime="9 min read"
      publishDate="2026-02-26T00:00:00Z"
      slug="quota-vs-non-quota-bags"
      keywords="Hermès quota bags, non-quota bags, Birkin quota, Kelly quota, Hermès purchasing system, luxury bag sourcing"
      relatedGuides={[
        { slug: "hermes-leather-types", title: "How to Identify Hermès Leather Types", image: "/images/blog/bags_upper_view.jpg" },
        { slug: "hermes-color-guide", title: "Hermès Color Guide", image: "/images/blog/birkin_coloured_bags.jpg" },
      ]}
    >
      <p style={bodyStyle}>
        One of the most frequently asked questions in the world of Hermès is: "Why can't I just walk into a boutique and buy a Birkin?" The answer lies in the quota system — an unwritten but widely understood purchasing framework that governs access to the most coveted Hermès bags.
      </p>

      <h2 style={h2Style}>What Are Quota Bags?</h2>
      <img
        src="/images/blog/birkin_coloured_bags.jpg"
        alt="Hermès Birkin quota bags in various colors from Clutch collection"
        className="w-full rounded-lg my-8"
        loading="lazy"
        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
      />
      <p style={bodyStyle}>
        Quota bags are the iconic Hermès styles that cannot be purchased on demand — they require an established relationship with a boutique and a demonstrated purchase history. The three primary quota bags are:
      </p>
      <ul style={{ ...bodyStyle, paddingLeft: '24px', listStyleType: 'disc' }}>
        <li className="mb-2"><strong>Birkin</strong> — The most iconic handbag in the world</li>
        <li className="mb-2"><strong>Kelly</strong> — Elegant and structured, named after Grace Kelly</li>
        <li className="mb-2"><strong>Constance</strong> — The crossbody favourite with its signature H clasp</li>
      </ul>

      <h2 style={h2Style}>What Are Non-Quota Bags?</h2>
      <p style={bodyStyle}>
        Non-quota bags are Hermès handbags that can be purchased freely without a prior purchase history. These include many beautiful and well-crafted styles:
      </p>
      <ul style={{ ...bodyStyle, paddingLeft: '24px', listStyleType: 'disc' }}>
        <li className="mb-2"><strong>Picotin</strong> — A casual, bucket-style bag</li>
        <li className="mb-2"><strong>Evelyne</strong> — Recognizable by its perforated H</li>
        <li className="mb-2"><strong>Garden Party</strong> — A spacious tote for everyday use</li>
        <li className="mb-2"><strong>Herbag</strong> — Canvas and leather combination</li>
        <li className="mb-2"><strong>Bolide</strong> — The original Hermès bag with a zipper</li>
      </ul>

      <h2 style={h2Style}>How the Quota System Works</h2>
      <p style={bodyStyle}>
        While Hermès has never officially confirmed the quota system, the widely accepted understanding is that clients are limited to purchasing <strong>two quota bags per year</strong> (per boutique). To be offered a quota bag, clients typically need to demonstrate loyalty through consistent purchases of other Hermès products — leather goods, scarves, ready-to-wear, homeware, and jewellery.
      </p>
      <p style={bodyStyle}>
        The ratio varies by boutique and region, but a general guideline is a 1:1 or higher spend ratio — meaning you may need to spend an amount equal to or greater than the bag's retail price on non-quota items before being offered a Birkin or Kelly.
      </p>

      <h2 style={h2Style}>Building a Boutique Relationship</h2>
      <p style={bodyStyle}>
        Success in obtaining quota bags often comes down to relationship-building. Visit your local boutique regularly, work with a dedicated sales associate (SA), and make genuine purchases. Be patient and express your interest without being overly aggressive. Many clients wait 6–18 months before receiving their first quota bag offer.
      </p>
      <img
        src="/images/blog/cute_mini_kellys.jpg"
        alt="Hermès Kelly quota bags collection from Clutch"
        className="w-full rounded-lg my-8"
        loading="lazy"
        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
      />

      <h2 style={h2Style}>The Alternative: Trusted Resellers</h2>
      <p style={bodyStyle}>
        For those who prefer not to navigate the boutique system, working with a trusted luxury sourcing service like Clutch offers several advantages:
      </p>
      <ul style={{ ...bodyStyle, paddingLeft: '24px', listStyleType: 'disc' }}>
        <li className="mb-2"><strong>Immediate availability</strong> — No waiting periods or purchase history required</li>
        <li className="mb-2"><strong>Specific requests</strong> — Choose your exact colour, leather, and hardware combination</li>
        <li className="mb-2"><strong>Authentication guaranteed</strong> — Every piece is verified for authenticity</li>
        <li className="mb-2"><strong>Global sourcing</strong> — Access to inventory from boutiques and collections worldwide</li>
      </ul>

      {/* Autoplay video showcase */}
      <div className="my-12">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/videos/bags-poster.jpg"
          className="w-full rounded-lg"
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
        >
          <source src="/videos/bags-collection.mp4" type="video/mp4" />
        </video>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '13px', color: '#928377', textAlign: 'center', marginTop: '12px', fontStyle: 'italic' }}>
          Clutch's curated Hermès quota bag collection
        </p>
      </div>

      <h2 style={h2Style}>Market Pricing: Quota vs Non-Quota</h2>
      <p style={bodyStyle}>
        On the secondary market, quota bags consistently trade above retail price — often 1.5x to 3x for standard leathers, and significantly more for exotic and rare combinations. Non-quota bags typically trade at or slightly below retail, making them excellent entry points into the Hermès world.
      </p>
      <p style={bodyStyle}>
        Whether you're starting your collection or seeking a specific dream piece, understanding the quota system helps you make informed decisions about how to approach your purchase.
      </p>
    </GuideLayout>
  );
}

const h2Style: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontWeight: 300,
  fontSize: '32px',
  color: '#291E15',
  letterSpacing: '0.05em',
  marginTop: '48px',
  marginBottom: '16px',
};

const bodyStyle: React.CSSProperties = {
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 300,
  fontSize: '16px',
  lineHeight: 1.8,
  color: '#565250',
  marginBottom: '20px',
};

