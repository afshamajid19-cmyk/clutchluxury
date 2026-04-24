import { GuideLayout } from "@/components/guides/GuideLayout";

export default function HermesColorGuide() {
  return (
    <GuideLayout
      title="Hermès Color Guide: Understanding Hermès Bag Colors"
      description="Permanent vs. seasonal colours, colour codes, resale value impact, and styling tips for Hermès bags."
      heroImage="/images/blog/birkin_coloured_bags.jpg"
      readTime="7 min read"
      publishDate="2026-02-26T00:00:00Z"
      slug="hermes-color-guide"
      keywords="Hermès colors, Hermès colour guide, Hermès bag colors, seasonal colors, Etoupe, Rose Sakura, luxury bags"
      relatedGuides={[
        { slug: "hermes-leather-types", title: "How to Identify Hermès Leather Types", image: "/images/blog/bags_upper_view.jpg" },
        { slug: "quota-vs-non-quota-bags", title: "Quota vs Non-Quota Bags", image: "/images/blog/birkin_with_clutch_logo.jpg" },
      ]}
    >
      <p style={bodyStyle}>
        Colour is one of the most important factors when collecting Hermès bags. The right shade can elevate a piece from beautiful to extraordinary — and significantly impact its resale value. Understanding how Hermès approaches colour is essential for any serious collector.
      </p>

      <h2 style={h2Style}>Permanent Colors vs Seasonal Colors</h2>
      <p style={bodyStyle}>
        Hermès maintains a core palette of <strong>permanent colours</strong> that are produced year-round. These include timeless neutrals like <strong>Black (Noir)</strong>, <strong>Gold</strong>, <strong>Etoupe</strong>, and <strong>Craie</strong>. These are the safest investments as they're always in demand and hold their value exceptionally well.
      </p>
      <p style={bodyStyle}>
        <strong>Seasonal colours</strong> are released twice a year (Spring/Summer and Fall/Winter) in limited quantities. These can range from soft pastels to vivid brights. Once a seasonal colour is discontinued, it becomes highly sought-after on the secondary market, often commanding premiums above retail.
      </p>

      <h2 style={h2Style}>Popular Color Families</h2>
      <h3 style={h3Style}>Neutrals</h3>
      <p style={bodyStyle}>
        Neutrals dominate the Hermès colour palette and are the most versatile. <strong>Etoupe</strong> — a warm grey-brown — is widely considered the perfect neutral. <strong>Gris</strong> shades offer cooler alternatives, while <strong>Chai</strong> and <strong>Biscuit</strong> have gained popularity for their warm, understated elegance.
      </p>

      <h3 style={h3Style}>Brights & Pinks</h3>
      <p style={bodyStyle}>
        Hermès pinks — from the iconic <strong>Rose Sakura</strong> to bold <strong>Rose Tyrien</strong> — are perennial favourites. Blues like <strong>Bleu Nuit</strong> and <strong>Bleu Électrique</strong> offer striking alternatives. <strong>Orange</strong>, the signature Hermès colour, remains a collector's staple.
      </p>

      <h3 style={h3Style}>Styling Your Hermès Colors</h3>
      <img
        src="/images/blog/cute_mini_kellys.jpg"
        alt="Hermès Mini Kelly bags in different colors from Clutch collection"
        className="w-full rounded-lg my-8"
        loading="lazy"
        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
      />
      <p style={bodyStyle}>
        When styling Hermès bags, consider contrast. Neutral bags pair effortlessly with any wardrobe, while bright colours work best as statement pieces against monochromatic outfits. Many collectors recommend starting with a neutral like Etoupe or Gold before adding colour to your collection.
      </p>

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
          Clutch curated Hermès collection
        </p>
      </div>

      <h2 style={h2Style}>How to Read Hermès Colour Codes</h2>
      <p style={bodyStyle}>
        Hermès uses a blind stamp system that includes a colour code embedded within the bag. Each colour has a specific alphanumeric identifier. For example, colours in the "CK" prefix (e.g., CK89 Noir) denote standard production colours. Understanding these codes helps with authentication and identifying exact shades.
      </p>

      <h2 style={h2Style}>Color Value in the Resale Market</h2>
      <p style={bodyStyle}>
        Rare seasonal colours typically appreciate the most, especially in exotic leathers. Black and neutral shades maintain steady value, while discontinued brights can see premiums of 50–200% above retail. Limited-edition collaborations or special order (SO) colours are the most valuable of all.
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

const h3Style: React.CSSProperties = {
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 600,
  fontSize: '18px',
  color: '#291E15',
  marginTop: '32px',
  marginBottom: '12px',
};

const bodyStyle: React.CSSProperties = {
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 300,
  fontSize: '16px',
  lineHeight: 1.8,
  color: '#565250',
  marginBottom: '20px',
};
