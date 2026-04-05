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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400;500;700;900&f[]=outfit@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
