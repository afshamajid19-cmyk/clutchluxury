import { GuideLayout } from "@/components/guides/GuideLayout";

export default function HermesDateStamps() {
  return (
    <GuideLayout
      title="How to Read Hermès Date Stamps"
      description="Decode year codes, craftsman stamps, and authentication markers on your Hermès bag with this detailed guide."
      heroImage="/images/blog/hermes-kelly-clutch-black.jpeg"
      readTime="6 min read"
      publishDate="2026-02-26T00:00:00Z"
      slug="hermes-date-stamps"
      keywords="Hermès date stamps, Hermès year codes, blind stamp, craftsman stamp, Hermès authentication, Hermès bag year"
      relatedGuides={[
        { slug: "hermes-leather-types", title: "How to Identify Hermès Leather Types", image: "/images/blog/hermes-himalaya-birkin.jpeg" },
        { slug: "hermes-color-guide", title: "Hermès Color Guide", image: "/images/blog/hermes-color-trends.jpeg" },
      ]}
    >
      <p style={bodyStyle}>
        Every Hermès bag carries a series of stamps that tell its story — when it was made, which craftsman built it, and what materials were used. Learning to read these stamps is fundamental to authentication and understanding the provenance of your bag.
      </p>

      <h2 style={h2Style}>History of Hermès Stamps</h2>
      <p style={bodyStyle}>
        Hermès began stamping bags with year identifiers in 1945, using a letter system that cycles through the alphabet. Each letter corresponds to a specific year of production. This system has evolved over the decades, with the most recent change occurring in 2015 when Hermès transitioned from open to enclosed stamps.
      </p>

      <h2 style={h2Style}>Understanding Letter Stamps</h2>
      <p style={bodyStyle}>
        The year stamp consists of a single letter, which may be enclosed within a shape. From 1945 to 1970, letters A through Z were used without enclosure. From 1971 to 1996, letters were encircled. From 1997 to 2014, letters appeared within a square. Since 2015, Hermès has used a single letter preceded by a letter — for example, "T" for 2019, "Y" for 2020, and continuing sequentially.
      </p>
      <div className="overflow-x-auto my-8">
        <table className="w-full text-left" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid rgba(134,103,88,0.3)' }}>
              <th className="py-3 pr-6" style={{ fontWeight: 500, color: '#291E15' }}>Period</th>
              <th className="py-3 pr-6" style={{ fontWeight: 500, color: '#291E15' }}>Style</th>
              <th className="py-3" style={{ fontWeight: 500, color: '#291E15' }}>Example</th>
            </tr>
          </thead>
          <tbody style={{ color: '#565250', fontWeight: 300 }}>
            {[
              ["1945–1970", "Letter only (no enclosure)", "A = 1945"],
              ["1971–1996", "Letter in circle", "A○ = 1971"],
              ["1997–2014", "Letter in square", "A□ = 1997"],
              ["2015–present", "Single letter (no enclosure)", "X = 2016, D = 2019"],
            ].map(([period, style, example]) => (
              <tr key={period} style={{ borderBottom: '1px solid rgba(134,103,88,0.1)' }}>
                <td className="py-3 pr-6" style={{ fontWeight: 500 }}>{period}</td>
                <td className="py-3 pr-6">{style}</td>
                <td className="py-3">{example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>Craftsman Stamps</h2>
      <p style={bodyStyle}>
        Each Hermès bag is made by a single craftsman from start to finish — a process that takes approximately 18–24 hours for a Birkin. The craftsman's personal stamp (a series of letters and numbers) is embossed alongside the date stamp. This means every bag is traceable back to its maker, and if the bag ever requires repair, it is returned to the original craftsman whenever possible.
      </p>

      <h2 style={h2Style}>Blind Stamps vs Hot Stamps</h2>
      <p style={bodyStyle}>
        <strong>Blind stamps</strong> are embossed into the leather without ink, creating an indentation. These include the year stamp and craftsman stamp. <strong>Hot stamps</strong> are the gold or silver foil stamps you see on the front of the bag — typically "HERMÈS PARIS MADE IN FRANCE." Hot stamps are applied using heated metal dies and metallic foil.
      </p>

      <h2 style={h2Style}>Where to Find Stamps</h2>
      <p style={bodyStyle}>
        On a <strong>Birkin</strong>, the blind stamps are found on the front strap, just below the hardware. On a <strong>Kelly</strong>, check the interior tab near the turn-lock. For the <strong>Constance</strong>, stamps are typically found on the interior strap. The location can vary slightly between production years, so it's important to know what to expect for the specific era of your bag.
      </p>

      <h2 style={h2Style}>Authentication Red Flags</h2>
      <p style={bodyStyle}>
        When examining stamps, watch for: inconsistent font or spacing, stamps that are too deep or too shallow, misaligned year and craftsman stamps, or stamps that appear to have been re-applied. Authentic stamps should be clean, evenly pressed, and consistent with the production year of the bag.
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
