import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/layout/ChatWidget";
import AgentationWrapper from "@/components/layout/AgentationWrapper";

export const metadata: Metadata = {
  metadataBase: new URL("https://happynestfarm.in"),
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
        url: "/images/garden/drone-1.webp",
        width: 1200,
        height: 630,
        alt: "Aerial view of HappyNest Blanc Belle villa",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "VacationRental",
  additionalType: "Villa",
  identifier: "happynest-blanc-belle-sohna-hr",
  name: "HappyNest — Blanc Belle",
  description:
    "A luxury farm stay in Sohna, Haryana with 6 bedrooms, private pool, jacuzzi, and sprawling lawns.",
  image: [
    "https://happynestfarm.in/images/garden/drone-1.webp",
    "https://happynestfarm.in/images/garden/pool1.webp",
    "https://happynestfarm.in/images/garden/pool2.webp",
    "https://happynestfarm.in/images/garden/garden.webp",
    "https://happynestfarm.in/images/bedrooms/blue1.webp",
    "https://happynestfarm.in/images/bedrooms/green1.webp",
    "https://happynestfarm.in/images/bathrooms/happy-nest-dc6a2e.jpg",
    "https://happynestfarm.in/images/single/main-dining.webp",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sohna",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.234944,
    longitude: 77.16525,
  },
  containsPlace: {
    "@type": "Accommodation",
    additionalType: "EntirePlace",
    numberOfBedrooms: 6,
    numberOfBathroomsTotal: 7,
    occupancy: {
      "@type": "QuantitativeValue",
      value: 18,
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "ac", value: true },
      { "@type": "LocationFeatureSpecification", name: "fireplace", value: true },
      { "@type": "LocationFeatureSpecification", name: "hotTub", value: true },
      { "@type": "LocationFeatureSpecification", name: "outdoorGrill", value: true },
      { "@type": "LocationFeatureSpecification", name: "petsAllowed", value: true },
      { "@type": "LocationFeatureSpecification", name: "pool", value: true },
      { "@type": "LocationFeatureSpecification", name: "poolType", value: "Outdoor" },
      { "@type": "LocationFeatureSpecification", name: "tv", value: true },
      { "@type": "LocationFeatureSpecification", name: "washerDryer", value: true },
      { "@type": "LocationFeatureSpecification", name: "wheelchairAccessible", value: true },
      { "@type": "LocationFeatureSpecification", name: "wifi", value: true },
    ],
  },
  checkinTime: "14:00:00+05:30",
  checkoutTime: "12:00:00+05:30",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
      <body className="antialiased">
        {children}
        <AgentationWrapper />
        <ChatWidget />
      </body>
    </html>
  );
}
