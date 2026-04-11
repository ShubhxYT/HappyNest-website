import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HappyNest — Blanc Belle | Luxury Farm Stay, Sohna",
  description:
    "A luxury farm stay nestled in the serene embrace of Sohna, Haryana. 6 bedrooms, private pool, jacuzzi, sprawling lawns — the ultimate weekend retreat near New Delhi.",
  keywords: [
    "luxury farm stay",
    "Sohna",
    "Haryana",
    "villa rental",
    "weekend getaway",
    "near Delhi",
    "private pool",
    "HappyNest",
    "Blanc Belle",
  ],
  openGraph: {
    title: "HappyNest — Blanc Belle | Luxury Farm Stay, Sohna",
    description:
      "6 bedrooms, private pool, jacuzzi, sprawling lawns — a luxury retreat in Sohna, Haryana.",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/garden/drone-1.jpg",
        width: 1200,
        height: 630,
        alt: "Aerial view of HappyNest Blanc Belle villa",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "VacationRental",
  name: "HappyNest — Blanc Belle",
  description:
    "A luxury farm stay in Sohna, Haryana with 6 bedrooms, private pool, jacuzzi, and sprawling lawns.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sohna",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
  numberOfBedrooms: 6,
  numberOfBathroomsTotal: 7,
  occupancy: {
    "@type": "QuantitativeValue",
    maxValue: 18,
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Private Swimming Pool" },
    { "@type": "LocationFeatureSpecification", name: "Outdoor Jacuzzi" },
    { "@type": "LocationFeatureSpecification", name: "Wi-Fi" },
    { "@type": "LocationFeatureSpecification", name: "Air Conditioning" },
    { "@type": "LocationFeatureSpecification", name: "Pet Friendly" },
  ],
  checkinTime: "14:00",
  checkoutTime: "12:00",
  petsAllowed: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400;500;700;900&f[]=outfit@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
