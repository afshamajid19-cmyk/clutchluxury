import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { Providers } from "@/app/providers";
import { SITE_URL } from "@/lib/env";
import "@/index.css";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Clutch Concierge | Luxury Sourcing Dubai — Brand New Items, Worldwide Delivery",
    template: "%s | CLUTCH",
  },
  description:
    "Clutch is a luxury concierge that sources brand-new Hermes, Chanel, and Rolex for buyers worldwide. Submit a sourcing request. Ships from Dubai.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "CLUTCH",
    type: "website",
    locale: "en_AE",
  },
  icons: {
    icon: "/clutch.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
