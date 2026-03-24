import { GuideLayout } from "@/components/guides/GuideLayout";

const comparisonSections = [
  {
    title: "The CC Turn-Lock Hardware",
    context: "The interlocking CC clasp is the most iconic element of any Chanel bag — and the first place counterfeiters get caught. Precision, weight, and finish are everything.",
    image: "/images/blog/chanel_fake_real_1.jpg",
    imageAlt: "Chanel CC turn-lock hardware real vs fake comparison",
    authentic: [
      "CC logo is precisely symmetrical — both C's are equal in weight and curve",
      "Hardware finish is silver-toned (for silver hardware styles) — matte-satin, not chrome-shiny",
      "Back plate engraving reads \"CHANEL PARIS\" in fine, crisp lettering — deeply cut",
      "Turn mechanism rotates smoothly with a solid, weighted click",
    ],
    counterfeit: [
      "One C may appear slightly thicker or the overlap is asymmetrical",
      "Hardware is often gold when it should be silver, or has a plastic-bright finish",
      "\"CHANEL PARIS\" engraving is shallow, blurry, or has inconsistent letter depth",
      "Rotation feels loose, sticky, or makes no satisfying click",
    ],
  },
  {
    title: "Classic Flap — Quilting & Leather Texture",
    context: "Chanel's diamond quilting and caviar leather are meticulously crafted. At close inspection, the geometry and texture reveal the truth.",
    image: "/images/blog/chanel_fake_real.jpg",
    imageAlt: "Chanel Classic Flap quilting and leather real vs fake comparison",
    authentic: [
      "Caviar leather has a fine, even pebbled texture — each grain is roughly the same size",
      "Diamond quilting is perfectly symmetrical: all diamonds are equal in size, with precise alignment edge-to-edge",
      "Stitching runs through the centre of each quilted ridge — consistent depth and tension",
      "Bag holds its shape firmly; the flap lies flat and even",
    ],
    counterfeit: [
      "Leather texture is either too coarse, too uniform, or has a slightly rubbery sheen",
      "Quilting diamonds may be uneven in size, misaligned at the edges, or slightly skewed",
      "Stitching sits off-centre on the ridge or has inconsistent tension",
      "Flap may have slight warping or fail to lie completely flat",
    ],
  },
  {
    title: "The Chanel Paris Plate",
    context: "Found on the interior of many Chanel bags, the \"CHANEL PARIS\" plate is a precision-engineered component that counterfeiters struggle to replicate faithfully.",
    image: "/images/blog/chanel_paris_fake_real.jpg",
    imageAlt: "Chanel Paris plate real vs fake comparison",
    authentic: [
      "Rectangular plate has sharp, bevelled edges — precise engineering",
      "\"CHANEL PARIS\" lettering is deeply engraved with consistent font weight",
      "Oval button mechanism has fine detailing and a polished surface",
      "Screws on either side of the button are symmetrical, flat, and flush",
    ],
    counterfeit: [
      "Plate edges may appear slightly rounded or have rough filing marks",
      "Lettering is often shallower, with inconsistent spacing between letters",
      "Oval button looks flat, plasticky, or has visible mould lines",
      "Screw placement is asymmetrical or screws appear raised",
    ],
  },
];

export default function ChanelAuthentication() {
  return (
    <GuideLayout
      title="How to Authenticate a Chanel Bag"
      description="What separates a genuine Classic Flap from a very convincing fake — a visual authentication guide."
      heroImage="/images/blog/chanel_fake_real.jpg"
      readTime="7 min read"
      publishDate="2026-03-24T00:00:00Z"
      slug="chanel-authentication"
      keywords="Chanel authentication, real vs fake Chanel, Classic Flap authentication, Chanel fake, luxury bag authentication"
      relatedGuides={[
        { slug: "hermes-authentication", title: "How to Authenticate a Hermès Bag", image: "/images/blog/mini_kelly_fake_real.jpg" },
        { slug: "hermes-color-guide", title: "Hermès Color Guide", image: "/images/blog/birkin_coloured_bags.jpg" },
      ]}
    >
      {/* Attribution banner */}
      <div style={attributionStyle}>
        <p style={{ margin: 0, fontStyle: 'italic' }}>
          All authentication comparison images in this guide are sourced from and credited to{' '}
          <a href="https://legitgrails.com" target="_blank" rel="noopener noreferrer" style={{ color: '#866758', textDecoration: 'underline' }}>
            LegitGrails.com
          </a>
          . We recommend their services for professional verification.
        </p>
      </div>

      <p style={bodyStyle}>
        The Chanel Classic Flap is one of the most replicated bags in the world. High-quality counterfeits have become increasingly convincing — but the details always give them away. This guide focuses on the three most critical checkpoints any buyer should examine before committing to a purchase.
      </p>

      {comparisonSections.map((section, i) => (
        <div key={i}>
          <h2 style={h2Style}>{section.title}</h2>
          <p style={bodyStyle}>{section.context}</p>

          <img
            src={section.image}
            alt={section.imageAlt}
            className="w-full mx-auto my-8 block"
            loading="lazy"
            style={{ maxWidth: '900px', borderRadius: '4px', border: '1px solid #e0d9d0', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8" style={{ maxWidth: '900px', margin: '32px auto' }}>
            <div style={cardStyle}>
              <h4 style={authenticLabel}>✓ AUTHENTIC</h4>
              <ul style={listStyle}>
                {section.authentic.map((point, j) => (
                  <li key={j} style={listItemStyle}>{point}</li>
                ))}
              </ul>
            </div>
            <div style={cardStyle}>
              <h4 style={counterfeitLabel}>✗ COUNTERFEIT</h4>
              <ul style={listStyle}>
                {section.counterfeit.map((point, j) => (
                  <li key={j} style={listItemStyle}>{point}</li>
                ))}
              </ul>
            </div>
          </div>

          {i < comparisonSections.length - 1 && (
            <div style={{ width: '80px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(139,115,85,0.3), transparent)', margin: '48px auto' }} />
          )}
        </div>
      ))}

      <p style={{ ...bodyStyle, marginTop: '48px' }}>
        A genuine Chanel bag is the product of extraordinary craftsmanship — and that craftsmanship is visible at every scale. Trust your instincts, examine the details, and always verify before you buy.
      </p>

      <div className="text-center my-12">
        <a
          href="https://legitgrails.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-[2px] uppercase transition-all duration-[400ms] hover:scale-[1.02]"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 500,
            fontSize: '11px',
            letterSpacing: '0.18em',
            padding: '14px 36px',
            background: '#6B6B6B',
            color: '#FFFFFF',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#4A4A4A'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#6B6B6B'; }}
        >
          Authenticate Your Chanel with LegitGrails →
        </a>
      </div>

      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '13px', color: '#928377', textAlign: 'center', fontStyle: 'italic', marginTop: '48px' }}>
        All real vs. fake comparison images courtesy of{' '}
        <a href="https://legitgrails.com" target="_blank" rel="noopener noreferrer" style={{ color: '#866758' }}>LegitGrails.com</a>{' '}
        — a trusted platform for luxury bag authentication.
      </p>
    </GuideLayout>
  );
}

const attributionStyle: React.CSSProperties = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '13px',
  color: '#928377',
  lineHeight: 1.7,
  padding: '16px 20px',
  marginBottom: '32px',
  border: '1px solid rgba(139,115,85,0.15)',
  borderRadius: '2px',
  background: 'rgba(233,228,222,0.4)',
};

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

const cardStyle: React.CSSProperties = {
  background: '#F9F7F5',
  border: '1px solid rgba(139,115,85,0.12)',
  borderRadius: '4px',
  padding: '24px',
};

const authenticLabel: React.CSSProperties = {
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 600,
  fontSize: '12px',
  letterSpacing: '0.12em',
  color: '#5B7A5B',
  marginBottom: '16px',
  textTransform: 'uppercase',
};

const counterfeitLabel: React.CSSProperties = {
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 600,
  fontSize: '12px',
  letterSpacing: '0.12em',
  color: '#8B5A5A',
  marginBottom: '16px',
  textTransform: 'uppercase',
};

const listStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const listItemStyle: React.CSSProperties = {
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 300,
  fontSize: '14px',
  lineHeight: 1.7,
  color: '#565250',
  marginBottom: '10px',
  paddingLeft: '12px',
  borderLeft: '2px solid rgba(139,115,85,0.15)',
};
