"use client";

import { GuideLayout } from "@/components/guides/GuideLayout";

export default function HermesLeatherTypes() {
  return (
    <GuideLayout
      title="How to Identify Hermès Leather Types"
      description="A comprehensive guide to understanding the leathers that define Hermès craftsmanship — from Togo and Clemence to exotic Crocodile and Ostrich."
      heroImage="/images/blog/bags_upper_view.jpg"
      readTime="8 min read"
      publishDate="2026-02-26T00:00:00Z"
      slug="hermes-leather-types"
      keywords="Hermès leather types, Togo leather, Clemence leather, Epsom, Swift, Box Calf, Crocodile, luxury bags, Hermès guide"
      relatedGuides={[
        { slug: "hermes-color-guide", title: "Hermès Color Guide", image: "/images/blog/birkin_coloured_bags.jpg" },
        { slug: "hermes-date-stamps", title: "How to Read Hermès Date Stamps", image: "/images/blog/mini_kelly_front_view.jpg" },
      ]}
    >
      <p style={bodyStyle}>
        Hermès is renowned for its unparalleled craftsmanship, and at the heart of every iconic bag is the leather. Understanding the different leather types used by the maison is essential for any collector or enthusiast — it affects the bag's look, feel, durability, and value on the resale market.
      </p>
      <p style={bodyStyle}>
        Each leather has unique characteristics that make it suited to different lifestyles and preferences. Here we break down the most important Hermès leathers you should know.
      </p>

      <h2 style={h2Style}>Togo Leather</h2>
      <p style={bodyStyle}>
        Togo is the most popular Hermès leather, crafted from baby calfskin. It features a distinctive pebbled grain that is soft to the touch yet remarkably resilient. Togo holds its shape well and is highly resistant to scratches, making it the ideal choice for everyday use.
      </p>
      <p style={bodyStyle}>
        Its matte finish and natural texture make it one of the most forgiving leathers in terms of wear and tear. Togo is available in virtually every Hermès colour and is most commonly seen on the Birkin and Kelly.
      </p>

      <h2 style={h2Style}>Clemence Leather</h2>
      <p style={bodyStyle}>
        Clemence is made from baby bull calfskin and shares a similar grained texture to Togo, but is slightly heavier and softer. It tends to slouch more over time, giving bags a more relaxed, lived-in appearance. Clemence is slightly less scratch-resistant than Togo but develops a beautiful patina with use.
      </p>

      <h2 style={h2Style}>Epsom Leather</h2>
      <p style={bodyStyle}>
        Epsom is a pressed, embossed leather with a crisp, structured feel. It's lightweight and holds its shape extremely well, making it popular for those who prefer a more formal, architectural look. Epsom is highly scratch-resistant and does not absorb colour as deeply, resulting in vibrant, saturated hues.
      </p>

      <h2 style={h2Style}>Swift Leather</h2>
      <p style={bodyStyle}>
        Swift is a smooth calfskin leather with a subtle sheen. It's buttery soft and lightweight, but more prone to scratches than grained leathers. Swift is often chosen for evening bags and smaller accessories where its luxurious feel can shine.
      </p>

      <h2 style={h2Style}>Box Calf Leather</h2>
      <p style={bodyStyle}>
        Box Calf (Veau Box) is the original Hermès leather, dating back to the early days of the maison. It has a smooth, polished surface with a distinctive lustre. While beautiful, it scratches easily and requires careful handling. Vintage collectors particularly prize Box Calf for its classic elegance.
      </p>

      <h2 style={h2Style}>Exotic Leathers</h2>
      <img
        src="/images/blog/birkin_with_clutch_logo.jpg"
        alt="Hermès Birkin exotic leather authenticated by Clutch"
        className="w-full rounded-lg my-8"
        loading="lazy"
        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
      />
      <p style={bodyStyle}>
        Hermès exotic leathers represent the pinnacle of luxury. <strong>Porosus Crocodile</strong> is the most prized, sourced from saltwater crocodiles and distinguished by its small, symmetrical scales. <strong>Niloticus Crocodile</strong> features slightly larger, more defined scales. <strong>Alligator</strong> has a wider scale pattern.
      </p>
      <p style={bodyStyle}>
        <strong>Ostrich</strong> is instantly recognizable by its distinctive quill bumps and is softer than most exotic leathers. <strong>Lizard</strong> features fine, uniform scales and is typically used for smaller accessories. Exotic leathers command significantly higher prices and are considered the most exclusive offerings from Hermès.
      </p>

      <img
        src="/images/blog/mini_kelly_top_view.jpg"
        alt="Hermès Kelly bag leather detail top view"
        className="w-full rounded-lg my-8"
        loading="lazy"
        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
      />

      <h2 style={h2Style}>Leather Detail & Finish</h2>
      <img
        src="/images/blog/mini_kelly_front_view.jpg"
        alt="Hermès Mini Kelly front view showing leather quality"
        className="w-full rounded-lg my-8"
        loading="lazy"
        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
      />

      <h2 style={h2Style}>Comparison Table</h2>
      <div className="overflow-x-auto my-8">
        <table className="w-full text-left" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid rgba(134,103,88,0.3)' }}>
              <th className="py-3 pr-4" style={{ fontWeight: 500, color: '#291E15' }}>Leather</th>
              <th className="py-3 pr-4" style={{ fontWeight: 500, color: '#291E15' }}>Texture</th>
              <th className="py-3 pr-4" style={{ fontWeight: 500, color: '#291E15' }}>Durability</th>
              <th className="py-3" style={{ fontWeight: 500, color: '#291E15' }}>Best For</th>
            </tr>
          </thead>
          <tbody style={{ color: '#565250', fontWeight: 300 }}>
            {[
              ["Togo", "Pebbled grain", "Excellent", "Everyday use"],
              ["Clemence", "Soft grain", "Very good", "Casual elegance"],
              ["Epsom", "Pressed/embossed", "Excellent", "Structured looks"],
              ["Swift", "Smooth, soft", "Moderate", "Evening/special"],
              ["Box Calf", "Polished smooth", "Delicate", "Collectors/vintage"],
              ["Crocodile", "Small scales", "Very good", "Ultimate luxury"],
              ["Ostrich", "Quill bumps", "Good", "Unique texture"],
            ].map(([leather, texture, durability, best]) => (
              <tr key={leather} style={{ borderBottom: '1px solid rgba(134,103,88,0.1)' }}>
                <td className="py-3 pr-4" style={{ fontWeight: 500 }}>{leather}</td>
                <td className="py-3 pr-4">{texture}</td>
                <td className="py-3 pr-4">{durability}</td>
                <td className="py-3">{best}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

