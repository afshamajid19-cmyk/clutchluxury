import type { Metadata } from "next";
import { HomePageShell } from "@/components/landing/HomePageShell";
import { SITE_URL } from "@/lib/env";
import { getHomepageData } from "@/lib/server/homepage";

export const dynamic = "force-dynamic";

const homepageTitle = "Clutch Luxury Fashion Sourcing | Dubai";
const homepageDescription =
  "Luxury fashion sourcing in Dubai for authenticated Hermes, Chanel, and designer handbags with worldwide delivery.";

export const metadata: Metadata = {
  title: homepageTitle,
  description: homepageDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: homepageTitle,
    description: homepageDescription,
    url: SITE_URL,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/clutch-logo-ccc.jpg`,
        width: 1200,
        height: 630,
        alt: "CLUTCH luxury sourcing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homepageTitle,
    description: homepageDescription,
    images: [`${SITE_URL}/images/clutch-logo-ccc.jpg`],
  },
  keywords: [
    "pre-owned Hermes Dubai",
    "pre-owned Chanel Dubai",
    "luxury bags Dubai",
    "authenticated luxury handbags",
    "Birkin Dubai",
    "Kelly Dubai",
  ],
};

export default async function HomePage() {
  const homepageData = await getHomepageData();

  const storeStructuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "CLUTCH",
    alternateName: "Clutch Luxury Sourcing",
    description: homepageDescription,
    url: SITE_URL,
    logo: `${SITE_URL}/images/clutch-logo-ccc.jpg`,
    foundingDate: "2017",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+971-56-669-7372",
      contactType: "customer service",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Arabic"],
    },
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are the bags on CLUTCH authenticated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Every bag is checked for authenticity before it is presented or listed.",
        },
      },
      {
        "@type": "Question",
        name: "Does CLUTCH ship worldwide?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. CLUTCH offers worldwide delivery from Dubai.",
        },
      },
      {
        "@type": "Question",
        name: "What brands does CLUTCH source?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CLUTCH specializes in Hermes, Chanel, and other luxury brands.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storeStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <HomePageShell {...homepageData} />
    </>
  );
}
