import { GuideLayout } from "@/components/guides/GuideLayout";

const comparisonSections = [
  {
    title: "The Hermès Constance — Shape & H-Clasp Hardware",
    context: "The Constance is defined by its clean geometry and signature H-clasp. Counterfeits often fail at replicating the precision of the hardware and the structure of the silhouette.",
    image: "/images/blog/legitgrails_hermes.jpg",
    imageAlt: "Hermès Constance real vs fake comparison — shape and H-clasp hardware",
    authentic: [
      "Perfectly structured rectangular silhouette with sharp, clean edges",
      "H-clasp sits flush and centred, polished palladium finish with fine brushed texture",
      "Saddle stitching is tight, even, and hand-done — slight variations are intentional",
      "Leather grain is fine, consistent, and deeply textured (Epsom)",
    ],
    counterfeit: [
      "Silhouette appears slightly puffier or less defined along the flap",
      "H-clasp looks flat, dull, or sits slightly off-centre",
      "Stitching is machine-perfect but lacks depth — or visibly uneven",
      "Leather grain feels plasticky or too uniform",
    ],
  },
  {
    title: "The Hermès Kelly — Overall Silhouette & Structure",
    context: "A genuine Kelly holds its architectural form with confidence. The construction, toggle mechanism, and handle alignment are hallmarks of authentic craftsmanship.",
    image: "/images/blog/mini_kelly_fake_real.jpg",
    imageAlt: "Hermès Kelly real vs fake comparison — silhouette and structure",
    authentic: [
      "Rigid, architectural shape that holds its form even when empty",
      "Corner seams are crisp and reinforced — no puckering",
      "Turn-lock clasp (toggle) has a solid, weighted feel",
      "Handle alignment is perfectly centred and symmetrical",
    ],
    counterfeit: [
      "Bag slumps or loses shape when set down",
      "Corners show soft puckering or uneven seam work",
      "Toggle feels lightweight, hollow, or spins too loosely",
      "Handle may sit slightly off-centre",
    ],
  },
  {
    title: "Interior Hot Stamp — \"Hermès Paris Made in France\"",
    context: "The hot stamp is one of the most telling authentication markers. Authentic stamps are deeply embossed with proprietary lettering that counterfeiters consistently fail to replicate.",
    image: "/images/blog/legitgrails_fake_real_1.jpg",
    imageAlt: "Hermès interior stamp real vs fake comparison — Made in France",
    authentic: [
      "Hot stamp is deeply embossed into the leather — you can feel it with your fingertip",
      "Lettering is in cream or white, perfectly spaced, consistent weight",
      "Font is a specific proprietary serif — \"É\" in Hermès has a distinctive accent",
      "Reads exactly: HERMÈS / PARIS / MADE IN FRANCE (three lines, centred)",
    ],
    counterfeit: [
      "Stamp may appear in a wrong colour (turquoise, bright blue, off-gold)",
      "Letters feel printed-on rather than embossed — no tactile depth",
      "Inconsistent letter spacing or font weight between characters",
      "\"HERMÈS\" may be misspelled or the accent mark may be missing or incorrect",
    ],
  },
  {
    title: "Hardware Screws & Clasp Mechanism",
    context: "Hermès hardware is engineered to the same standard as fine watchmaking. The screws, clasps, and metal finishing reveal the difference between genuine and counterfeit at close inspection.",
    image: "/images/blog/legitgrails_fake_and_real.jpg",
    imageAlt: "Hermès hardware screws real vs fake comparison",
    authentic: [
      "Screws are perfectly flat-headed and flush with the hardware surface",
      "Screw head slot is clean, single-line, precisely cut",
      "Metal has a brushed satin finish — not mirror-bright",
      "No visible adhesive, rough filing marks, or gap between hardware and leather",
    ],
    counterfeit: [
      "Screws may appear raised, slightly tilted, or unevenly spaced",
      "Screw slot is often wider, shallower, or cross-hatched",
      "Hardware has a shinier, cheaper finish that catches light differently",
      "Visible seam lines or glue residue around hardware edges",
    ],
  },
];

export default function HermesAuthentication() {
  return (
    <GuideLayout
      title="How to Authenticate a Hermès Bag"
      description="A definitive visual guide to identifying genuine Hermès craftsmanship — covering the Birkin, Kelly, and Constance."
      heroImage="/images/blog/mini_kelly_front_view.jpg"
      readTime="8 min read"
      publishDate="2026-03-24T00:00:00Z"
      slug="hermes-authentication"
      keywords="Hermès authentication, real vs fake Hermès, Birkin authentication, Kelly authentication, Hermès fake, luxury bag authentication"
      relatedGuides={[
        { slug: "chanel-authentication", title: "How to Authenticate a Chanel Bag", image: "/images/blog/chanel_fake_real.jpg" },
        { slug: "hermes-leather-types", title: "How to Identify Hermès Leather Types", image: "/images/blog/bags_upper_view.jpg" },
      ]}
    >
      {/* Attribution banner */}
      <div style={attributionStyle}>
        <p style={{ margin: 0, fontStyle: 'italic' }}>
          All authentication comparison images in this guide are sourced from and credited to{' '}
          <a href="https://legitgrails.com" target="_blank" rel="noopener noreferrer" style={{ color: '#866758', textDecoration: 'underline' }}>
            LegitGrails.com
          </a>{' '}
          — a trusted platform for luxury bag authentication. We recommend their services for professional verification.
        </p>
      </div>

      <p style={bodyStyle}>
        Hermès bags are among the most counterfeited luxury goods in the world. Whether you're buying a Birkin, Kelly, or Constance on the secondary market, knowing how to spot a fake can save you tens of thousands of dirhams — and protect your investment. This guide walks you through the most important authentication checkpoints, with real comparison imagery.
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
        Authenticating a Hermès bag requires attention to detail at every level — from the architecture of the silhouette to the depth of a screw head. When in doubt, always seek professional authentication before purchasing on the secondary market.
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
          Authenticate Your Bag with LegitGrails →
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
