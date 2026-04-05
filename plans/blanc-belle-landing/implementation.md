# HappyNest — Blanc Belle Landing Page

## Goal
Build a premium single-page landing site for HappyNest — Blanc Belle luxury villa using Next.js 15, Tailwind CSS v4, GSAP ScrollTrigger (video scrubbing hero + horizontal gallery), and Framer Motion (UI interactions), with a warm & earthy palette and WhatsApp/Phone CTAs for bookings.

## Prerequisites
Make sure you are currently on the `blanc-belle-landing` branch before beginning implementation.
If not, move to the correct branch. If the branch does not exist, create it from main.

---

### Step-by-Step Instructions

---

#### Step 1: Project Scaffold — Next.js 15, Dependencies, Asset Organization

- [x] Initialize Next.js 15 project (from within the repo root):

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --turbopack
```

> **Note:** If prompted about overwriting existing files, proceed — the only existing files are content/assets that won't conflict.

- [x] Install all required dependencies:

```bash
npm install gsap framer-motion @phosphor-icons/react
```

- [x] Move assets into `public/` organized directories:

```bash
mkdir -p public/images/bedrooms public/images/garden public/images/bathrooms public/images/single public/video

cp happynest/Bedrooms/* public/images/bedrooms/
cp happynest/Garden/* public/images/garden/
cp happynest/bathrooms/* public/images/bathrooms/
cp happynest/single/* public/images/single/
cp drone-entrance.mp4 public/video/drone-entrance.mp4
```

- [x] Replace `app/globals.css` with custom Tailwind v4 + theme tokens:

```css
@import "tailwindcss";

@theme {
  --color-cream: #FAF7F2;
  --color-stone-950: #1C1917;
  --color-stone-800: #292524;
  --color-stone-500: #78716C;
  --color-stone-300: #D6D3D1;
  --color-stone-200: #E7E5E4;
  --color-stone-100: #F5F5F4;
  --color-gold: #B8860B;
  --color-gold-light: #D4A843;
  --color-white: #FFFFFF;

  --font-satoshi: "Satoshi", sans-serif;
  --font-outfit: "Outfit", sans-serif;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-satoshi);
    background-color: var(--color-cream);
    color: var(--color-stone-950);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background-color: var(--color-gold);
    color: var(--color-white);
  }
}
```

- [x] Replace `app/layout.tsx` with the root layout including fonts and metadata:

```tsx
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
```

- [x] Replace `app/page.tsx` with a placeholder to verify scaffold works:

```tsx
export default function Home() {
  return (
    <main className="min-h-[100dvh] flex items-center justify-center bg-cream">
      <h1 className="font-outfit text-4xl md:text-6xl tracking-tighter leading-none text-stone-950">
        HappyNest — Blanc Belle
      </h1>
    </main>
  );
}
```

##### Step 1 Verification Checklist
- [x] `npm run dev` starts without errors
- [x] Browser shows "HappyNest — Blanc Belle" centered on a warm cream background
- [x] Satoshi and Outfit fonts load (inspect network tab for fontshare)
- [x] All images are accessible at `/images/bedrooms/blue1.jpg`, `/video/drone-entrance.mp4`, etc.
- [x] No TypeScript errors (`npx tsc --noEmit`)

#### Step 1 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

---

#### Step 2: Navbar + WhatsApp FAB

- [x] Create `components/Navbar.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { WhatsappLogo, Phone, List, X } from "@phosphor-icons/react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Spaces", href: "#spaces" },
  { label: "Amenities", href: "#amenities" },
  { label: "Location", href: "#location" },
];

const WHATSAPP_URL =
  "https://wa.me/919999999999?text=Hi%2C%20I%27d%20like%20to%20book%20HappyNest%20Blanc%20Belle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-cream/80 backdrop-blur-xl border-b border-stone-200/50 shadow-[0_1px_3px_rgba(28,25,23,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a
          href="#"
          className="font-outfit font-semibold text-lg md:text-xl tracking-tight text-stone-950"
        >
          HappyNest
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-stone-500 hover:text-stone-950 transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-950 text-cream text-sm font-medium rounded-full hover:bg-stone-800 active:scale-[0.98] transition-all duration-200"
          >
            <WhatsappLogo size={18} weight="fill" />
            Book Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-stone-950"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <List size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-cream/95 backdrop-blur-xl border-t border-stone-200/50 px-6 pb-6 pt-4">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-stone-500 hover:text-stone-950 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-stone-950 text-cream text-sm font-medium rounded-full"
            >
              <WhatsappLogo size={18} weight="fill" />
              Book Now
            </a>
            <a
              href="tel:+919999999999"
              className="inline-flex items-center justify-center gap-2 text-sm text-stone-500"
            >
              <Phone size={16} />
              +91 99999 99999
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
```

- [x] Create `components/WhatsAppFab.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsappLogo } from "@phosphor-icons/react";

const WHATSAPP_URL =
  "https://wa.me/919999999999?text=Hi%2C%20I%27d%20like%20to%20book%20HappyNest%20Blanc%20Belle";

export default function WhatsAppFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl active:scale-[0.95] transition-shadow duration-200"
          aria-label="Chat on WhatsApp"
        >
          <WhatsappLogo size={28} weight="fill" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
```

- [x] Update `app/page.tsx` to include Navbar and FAB:

```tsx
import Navbar from "@/components/Navbar";
import WhatsAppFab from "@/components/WhatsAppFab";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section className="min-h-[100dvh] flex items-center justify-center bg-cream">
          <h1 className="font-outfit text-4xl md:text-6xl tracking-tighter leading-none text-stone-950">
            HappyNest — Blanc Belle
          </h1>
        </section>
        {/* Spacer to test scroll behavior */}
        <section className="h-[200vh] bg-cream" />
      </main>
      <WhatsAppFab />
    </>
  );
}
```

##### Step 2 Verification Checklist
- [x] Navbar is transparent at top, becomes glass-blur on scroll
- [x] Desktop: anchor links visible, "Book Now" button with WhatsApp icon
- [x] Mobile (< 768px): hamburger menu toggles mobile nav
- [x] WhatsApp FAB appears after scrolling past the hero section
- [x] FAB has spring animation on appear
- [x] Both WhatsApp links open correct URL in new tab
- [x] No hydration warnings in console

#### Step 2 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

---

#### Step 3: Video Hero — GSAP Scroll-Scrubbed Drone

- [x] Create `components/VideoHero.tsx`:

```tsx
"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideoHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    const title = titleRef.current;
    const tagline = taglineRef.current;

    if (!container || !video || !title || !tagline) return;

    let ctx = gsap.context(() => {
      // Wait for video metadata to load
      const onLoaded = () => {
        const duration = video.duration;

        // Scrub video with scroll
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          pin: false,
          onUpdate: (self) => {
            if (video.duration) {
              video.currentTime = self.progress * video.duration;
            }
          },
        });

        // Pin the video viewport
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          pin: ".video-pin-target",
          pinSpacing: false,
        });

        // Fade out title
        gsap.to(title, {
          opacity: 0,
          y: -40,
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "20% top",
            scrub: true,
          },
        });

        // Fade in tagline
        gsap.fromTo(
          tagline,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: container,
              start: "15% top",
              end: "35% top",
              scrub: true,
            },
          }
        );

        // Fade out tagline
        gsap.to(tagline, {
          opacity: 0,
          scrollTrigger: {
            trigger: container,
            start: "60% top",
            end: "80% top",
            scrub: true,
          },
        });
      };

      if (video.readyState >= 1) {
        onLoaded();
      } else {
        video.addEventListener("loadedmetadata", onLoaded);
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="video-pin-target sticky top-0 min-h-[100dvh] w-full overflow-hidden">
        <video
          ref={videoRef}
          src="/video/drone-entrance.mp4"
          preload="auto"
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-stone-950/30" />

        {/* Title */}
        <div
          ref={titleRef}
          className="absolute inset-0 flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-16 lg:px-24"
        >
          <p className="font-satoshi text-sm md:text-base uppercase tracking-[0.3em] text-cream/70 mb-3">
            A Luxury Farm Stay
          </p>
          <h1 className="font-outfit text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9] text-cream font-bold">
            HappyNest
          </h1>
          <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[0.9] text-gold-light font-light mt-2">
            Blanc Belle
          </h2>
        </div>

        {/* Tagline */}
        <div
          ref={taglineRef}
          className="absolute inset-0 flex items-center justify-center opacity-0"
        >
          <p className="font-outfit text-2xl md:text-4xl lg:text-5xl tracking-tight text-cream text-center max-w-[65ch] px-6 font-light">
            Nestled in the serene embrace of Sohna
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [x] Update `app/page.tsx` to add the VideoHero:

```tsx
import Navbar from "@/components/Navbar";
import WhatsAppFab from "@/components/WhatsAppFab";
import VideoHero from "@/components/VideoHero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <VideoHero />
        {/* Spacer sections for scrolling test */}
        <section className="min-h-[100dvh] flex items-center justify-center bg-cream">
          <p className="font-satoshi text-stone-500 text-lg">
            Content sections coming soon
          </p>
        </section>
      </main>
      <WhatsAppFab />
    </>
  );
}
```

##### Step 3 Verification Checklist
- [x] Hero occupies full viewport on load with drone video visible
- [x] Scrolling down scrubs through the video smoothly (frames advance with scroll position)
- [x] "HappyNest" / "Blanc Belle" title is visible initially, fades out on scroll
- [x] "Nestled in the serene embrace of Sohna" tagline fades in mid-scroll, then fades out
- [x] Video section unpins cleanly after 3x viewport scroll distance
- [x] On mobile: video scales with `object-cover`, text remains readable
- [x] No console errors, no GSAP warnings

#### Step 3 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

---

#### Step 4: About Section + Stats Bar

- [x] Create `components/About.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="bg-cream py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16 items-center">
          {/* Text — takes 3 of 5 columns */}
          <motion.div
            className="md:col-span-3 order-2 md:order-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-satoshi text-sm uppercase tracking-[0.25em] text-gold mb-4">
              About HappyNest
            </p>
            <h2 className="font-outfit text-3xl md:text-5xl tracking-tighter leading-[1.1] text-stone-950 mb-6">
              More than a home — an opulent retreat
            </h2>
            <div className="space-y-4 text-base text-stone-500 leading-relaxed max-w-[65ch]">
              <p>
                Nestled in the serene embrace of Sohna, HappyNest — Blanc Belle
                — stands as a testament to luxury and elegance. Its name draws
                from its immaculate white interiors and a gleaming facade that
                shines like a pearl in the sun.
              </p>
              <p>
                A haven for weekend getaways, the property delights every visitor
                with its inviting pool, bubbling jacuzzi, sprawling lawns, and
                outdoor games. Close enough to urban centres, yet far enough to
                truly unwind.
              </p>
              <p>
                Furry companions are welcomed with open arms, making this the
                ultimate destination for unforgettable getaways.
              </p>
            </div>

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {[
                "Private Pool & Jacuzzi",
                "Sprawling Lawns",
                "Pet Friendly",
                "Curated Experiences",
                "Senior Citizen Friendly",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 text-xs font-medium tracking-wide uppercase bg-stone-100 text-stone-500 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Image — takes 2 of 5 columns */}
          <motion.div
            className="md:col-span-2 order-1 md:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="/images/garden/drone-2.jpg"
                alt="Aerial view of HappyNest Blanc Belle property"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [x] Create `components/StatsBar.tsx`:

```tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItemProps {
  value: number;
  suffix?: string;
  label: string;
  prefix?: string;
}

function StatItem({ value, suffix = "", label, prefix = "" }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = value / 30;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 40);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center px-4 py-6 md:py-0">
      <p className="font-outfit text-3xl md:text-4xl tracking-tight text-stone-950 font-semibold">
        {prefix}
        {count}
        {suffix}
      </p>
      <p className="text-sm text-stone-500 mt-1 font-satoshi">{label}</p>
    </div>
  );
}

export default function StatsBar() {
  return (
    <motion.section
      className="bg-stone-100 border-y border-stone-200"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-stone-300">
          <StatItem value={18} label="Guests" prefix="Up to " />
          <StatItem value={6} label="Bedrooms" />
          <StatItem value={7} label="Bathrooms" />
          <StatItem value={2} suffix=":00 PM" label="Check-in & Check-out" />
        </div>
      </div>
    </motion.section>
  );
}
```

- [x] Update `app/page.tsx`:

```tsx
import Navbar from "@/components/Navbar";
import WhatsAppFab from "@/components/WhatsAppFab";
import VideoHero from "@/components/VideoHero";
import About from "@/components/About";
import StatsBar from "@/components/StatsBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <VideoHero />
        <About />
        <StatsBar />
        {/* Spacer for scroll test */}
        <section className="min-h-[50vh] bg-cream" />
      </main>
      <WhatsAppFab />
    </>
  );
}
```

##### Step 4 Verification Checklist
- [x] About section: text left (60%), aerial image right (40%) on desktop
- [x] About section: collapses to single column on mobile (image on top)
- [x] Tags ("Private Pool & Jacuzzi", etc.) appear with slight delay
- [x] Text and image fade in as they enter viewport
- [x] Stats bar: numbers animate/count up when scrolled into view
- [x] Stats bar has warm stone-100 background band
- [x] "2:00 PM" stat animates correctly
- [x] All text uses Satoshi body / Outfit for headings

#### Step 4 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

---

#### Step 5: Spaces — Accordion Image Slider for Bedrooms

- [x] Create `components/Spaces.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Room {
  name: string;
  color: string;
  floor: string;
  features: string[];
  image1: string;
  image2: string;
}

const ROOMS: Room[] = [
  {
    name: "The Blue Room",
    color: "blue",
    floor: "Ground Floor",
    features: ["King-size bed", "Ensuite bathroom", "AC, TV, Wi-Fi"],
    image1: "/images/bedrooms/blue1.jpg",
    image2: "/images/bedrooms/blue2.jpg",
  },
  {
    name: "The Green Room",
    color: "green",
    floor: "Ground Floor",
    features: ["King-size bed", "Ensuite with jacuzzi", "AC, TV, Wi-Fi"],
    image1: "/images/bedrooms/green1.jpg",
    image2: "/images/bedrooms/green2.jpg",
  },
  {
    name: "The Grey Room",
    color: "grey",
    floor: "First Floor",
    features: ["King-size bed", "Balcony", "Ensuite with jacuzzi"],
    image1: "/images/bedrooms/grey1.jpg",
    image2: "/images/bedrooms/grey2.jpg",
  },
  {
    name: "The Brown Room",
    color: "brown",
    floor: "First Floor",
    features: ["King-size bed", "Balcony", "Ensuite bathroom"],
    image1: "/images/bedrooms/brown1.jpg",
    image2: "/images/bedrooms/brown2.jpg",
  },
  {
    name: "The Lime Room",
    color: "lime",
    floor: "First Floor",
    features: ["King-size bed", "Balcony", "Ensuite bathroom"],
    image1: "/images/bedrooms/lime1.jpg",
    image2: "/images/bedrooms/lime2.jpg",
  },
];

export default function Spaces() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="spaces" className="bg-cream py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <p className="font-satoshi text-sm uppercase tracking-[0.25em] text-gold mb-4">
            Spaces
          </p>
          <h2 className="font-outfit text-3xl md:text-5xl tracking-tighter leading-[1.1] text-stone-950">
            Six lavish bedrooms,
            <br />
            each with its own character
          </h2>
        </motion.div>

        {/* Desktop: Accordion strips */}
        <div className="hidden md:flex gap-2 h-[70vh] min-h-[500px]">
          {ROOMS.map((room, i) => {
            const isActive = activeIndex === i;
            return (
              <motion.div
                key={room.color}
                className="relative cursor-pointer overflow-hidden rounded-xl"
                animate={{
                  flex: isActive ? 4 : 1,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <Image
                  src={isActive ? room.image2 : room.image1}
                  alt={room.name}
                  fill
                  sizes={isActive ? "60vw" : "15vw"}
                  className="object-cover transition-all duration-700"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

                {/* Collapsed label */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      className="absolute bottom-6 left-0 right-0 flex flex-col items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span
                        className="font-outfit text-sm text-cream/90 tracking-wider uppercase"
                        style={{ writingMode: "vertical-lr" }}
                      >
                        {room.name}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expanded details */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-gold-light mb-2">
                        {room.floor}
                      </p>
                      <h3 className="font-outfit text-2xl text-cream tracking-tight mb-3">
                        {room.name}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {room.features.map((f) => (
                          <span
                            key={f}
                            className="text-xs text-cream/70 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: Vertical stack */}
        <div className="flex flex-col gap-4 md:hidden">
          {ROOMS.map((room, i) => (
            <motion.div
              key={room.color}
              className="relative rounded-xl overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() =>
                setActiveIndex(activeIndex === i ? null : i)
              }
            >
              <div
                className={`relative transition-all duration-500 ${
                  activeIndex === i ? "aspect-[4/3]" : "aspect-[16/7]"
                }`}
              >
                <Image
                  src={activeIndex === i ? room.image2 : room.image1}
                  alt={room.name}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gold-light mb-1">
                  {room.floor}
                </p>
                <h3 className="font-outfit text-xl text-cream tracking-tight">
                  {room.name}
                </h3>
                <AnimatePresence>
                  {activeIndex === i && (
                    <motion.div
                      className="flex flex-wrap gap-2 mt-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {room.features.map((f) => (
                        <span
                          key={f}
                          className="text-xs text-cream/70 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full"
                        >
                          {f}
                        </span>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [x] Update `app/page.tsx`:

```tsx
import Navbar from "@/components/Navbar";
import WhatsAppFab from "@/components/WhatsAppFab";
import VideoHero from "@/components/VideoHero";
import About from "@/components/About";
import StatsBar from "@/components/StatsBar";
import Spaces from "@/components/Spaces";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <VideoHero />
        <About />
        <StatsBar />
        <Spaces />
        {/* Spacer for scroll test */}
        <section className="min-h-[50vh] bg-cream" />
      </main>
      <WhatsAppFab />
    </>
  );
}
```

##### Step 5 Verification Checklist
- [x] Desktop: 5 narrow vertical image strips side by side
- [x] Hovering a strip expands it smoothly (flex: 1 → 4) revealing room name, floor, and features
- [x] Room names appear vertically on collapsed strips
- [x] Expanded state shows second image (e.g., `blue2.jpg` instead of `blue1.jpg`)
- [x] Mobile: rooms stack vertically, tap to expand/collapse
- [x] Mobile: expanded room shows taller aspect ratio with features
- [x] All 5 rooms render: Blue, Green, Grey, Brown, Lime
- [x] No layout shift or horizontal overflow

#### Step 5 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

---

#### Step 6: Living & Dining — Zig-Zag Layout

- [x] Create `components/LivingAreas.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface AreaBlock {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageFirst: boolean;
}

const AREAS: AreaBlock[] = [
  {
    title: "Living Area",
    description:
      "An expansive living room that seamlessly extends to the outdoor pool area. Comfortably seats up to 15 people, furnished with sofas and equipped with AC, Wi-Fi, TV, a cosy fireplace, and a portable music system.",
    image: "/images/single/sofa-ground.jpg",
    imageAlt: "Ground floor living area with sofas and fireplace",
    imageFirst: true,
  },
  {
    title: "Dining",
    description:
      "Positioned adjacent to the living room, this cosy space seats up to 10 people. The perfect setting for long conversations over home-cooked meals, equipped with AC and TV.",
    image: "/images/single/main-dining.jpg",
    imageAlt: "Dining area with seating for ten guests",
    imageFirst: false,
  },
  {
    title: "Lounge & Game Room",
    description:
      "A first-floor lounge featuring a game centre with table tennis and carrom. Seats up to 15 people, equipped with AC, Wi-Fi, TV, a wired music system. The ideal spot for spirited game tournaments.",
    image: "/images/single/tt-table-sofa-up.jpg",
    imageAlt: "First floor lounge with table tennis and seating",
    imageFirst: true,
  },
];

export default function LivingAreas() {
  return (
    <section className="bg-cream py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <p className="font-satoshi text-sm uppercase tracking-[0.25em] text-gold mb-4">
            Common Areas
          </p>
          <h2 className="font-outfit text-3xl md:text-5xl tracking-tighter leading-[1.1] text-stone-950">
            Gather, dine, unwind
          </h2>
        </motion.div>

        <div className="space-y-20 md:space-y-32">
          {AREAS.map((area, i) => (
            <div
              key={area.title}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${
                !area.imageFirst ? "md:[direction:rtl]" : ""
              }`}
            >
              {/* Image */}
              <motion.div
                className="md:[direction:ltr]"
                initial={{ opacity: 0, x: area.imageFirst ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src={area.image}
                    alt={area.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Text */}
              <motion.div
                className="md:[direction:ltr]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.1,
                }}
              >
                <h3 className="font-outfit text-2xl md:text-3xl tracking-tight text-stone-950 mb-4">
                  {area.title}
                </h3>
                <p className="text-base text-stone-500 leading-relaxed max-w-[65ch]">
                  {area.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [x] Update `app/page.tsx`:

```tsx
import Navbar from "@/components/Navbar";
import WhatsAppFab from "@/components/WhatsAppFab";
import VideoHero from "@/components/VideoHero";
import About from "@/components/About";
import StatsBar from "@/components/StatsBar";
import Spaces from "@/components/Spaces";
import LivingAreas from "@/components/LivingAreas";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <VideoHero />
        <About />
        <StatsBar />
        <Spaces />
        <LivingAreas />
        {/* Spacer for scroll test */}
        <section className="min-h-[50vh] bg-cream" />
      </main>
      <WhatsAppFab />
    </>
  );
}
```

##### Step 6 Verification Checklist
- [x] Three blocks: Living Area (image left), Dining (image right), Lounge (image left)
- [x] Zig-zag pattern — text and image alternate sides on desktop
- [x] Mobile: all collapse to single column (image on top, text below)
- [x] Images fade in from their respective side, text fades in from below
- [x] Photos load correctly: `sofa-ground.jpg`, `main-dining.jpg`, `tt-table-sofa-up.jpg`
- [x] Rounded corners on all images

#### Step 6 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

---

#### Step 7: Pool & Garden — Horizontal Scroll Gallery

- [ ] Create `components/PoolGarden.tsx`:

```tsx
"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  {
    src: "/images/garden/pool1.jpg",
    alt: "Private swimming pool at HappyNest",
  },
  {
    src: "/images/garden/pool2.jpg",
    alt: "Pool area with loungers",
  },
  {
    src: "/images/garden/pool3.jpg",
    alt: "Evening view of the pool",
  },
  {
    src: "/images/garden/garden.jpg",
    alt: "Lush green garden and lawn",
  },
  {
    src: "/images/garden/garden2.jpg",
    alt: "Garden seating area with gazebo",
  },
  {
    src: "/images/garden/garden3.jpg",
    alt: "Expansive garden at Blanc Belle",
  },
  {
    src: "/images/garden/drone-1.jpg",
    alt: "Aerial drone view of the property",
  },
  {
    src: "/images/garden/drone-3.jpg",
    alt: "Drone view showing pool and garden",
  },
];

export default function PoolGarden() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden bg-stone-950"
    >
      {/* Pinned title */}
      <div className="absolute top-8 md:top-12 left-6 md:left-10 z-10">
        <p className="font-satoshi text-sm uppercase tracking-[0.25em] text-gold-light mb-3">
          Pool & Garden
        </p>
        <h2 className="font-outfit text-3xl md:text-5xl tracking-tighter leading-[1.1] text-cream">
          Immerse & Unwind
        </h2>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex items-center gap-4 md:gap-6 h-[100dvh] pl-6 md:pl-10 pr-6 md:pr-10 pt-28 md:pt-32"
        style={{ width: "fit-content" }}
      >
        {GALLERY_IMAGES.map((img, i) => (
          <div
            key={img.src}
            className={`relative flex-shrink-0 rounded-xl overflow-hidden ${
              i % 3 === 0
                ? "w-[75vw] md:w-[45vw] aspect-[16/10]"
                : i % 3 === 1
                ? "w-[60vw] md:w-[35vw] aspect-[3/4]"
                : "w-[70vw] md:w-[40vw] aspect-[4/3]"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 75vw, 45vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] Update `app/page.tsx`:

```tsx
import Navbar from "@/components/Navbar";
import WhatsAppFab from "@/components/WhatsAppFab";
import VideoHero from "@/components/VideoHero";
import About from "@/components/About";
import StatsBar from "@/components/StatsBar";
import Spaces from "@/components/Spaces";
import LivingAreas from "@/components/LivingAreas";
import PoolGarden from "@/components/PoolGarden";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <VideoHero />
        <About />
        <StatsBar />
        <Spaces />
        <LivingAreas />
        <PoolGarden />
        {/* Spacer for scroll test */}
        <section className="min-h-[50vh] bg-cream" />
      </main>
      <WhatsAppFab />
    </>
  );
}
```

##### Step 7 Verification Checklist
- [x] Section has dark (stone-950) background — visual contrast from cream sections
- [x] "Immerse & Unwind" title pinned in top-left corner
- [x] Scrolling down causes the gallery to pan horizontally
- [x] 8 images with varying aspect ratios (not a uniform grid)
- [x] Gallery moves smoothly — no jank or jumping
- [x] Section unpins cleanly when gallery reaches the end
- [x] Mobile: images are large enough to see detail (75vw wide)
- [x] No GSAP console warnings

#### Step 7 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

---

#### Step 8: Amenities + Experiences

- [ ] Create `components/Amenities.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import {
  SwimmingPool,
  Bathtub,
  Fire,
  CookingPot,
  WifiHigh,
  Television,
  Snowflake,
  MonitorPlay,
  SpeakerHigh,
  GameController,
  TShirt,
  Flashlight,
  SecurityCamera,
  Wheelchair,
  Flame,
  Warehouse,
  Kettle,
  Lockers,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

interface AmenityItem {
  icon: Icon;
  label: string;
  note?: string;
}

interface AmenityGroup {
  title: string;
  items: AmenityItem[];
}

const AMENITY_GROUPS: AmenityGroup[] = [
  {
    title: "Outdoor",
    items: [
      { icon: SwimmingPool, label: "Private Swimming Pool" },
      { icon: Bathtub, label: "Outdoor Jacuzzi" },
      { icon: Warehouse, label: "Lawn & Gazebo" },
      { icon: Fire, label: "Bonfire", note: "Add-on" },
      { icon: CookingPot, label: "BBQ / Barbeque", note: "Add-on" },
    ],
  },
  {
    title: "Indoor",
    items: [
      { icon: Snowflake, label: "AC in all rooms" },
      { icon: WifiHigh, label: "Wi-Fi throughout" },
      { icon: Television, label: "TV in all rooms" },
      { icon: Flame, label: "Fireplace" },
      { icon: MonitorPlay, label: "Projector", note: "Add-on" },
      { icon: SpeakerHigh, label: "Music System" },
      { icon: GameController, label: "Indoor & Outdoor Games" },
    ],
  },
  {
    title: "Convenience",
    items: [
      { icon: Lockers, label: "Wardrobe in all rooms" },
      { icon: Kettle, label: "Electric Kettle" },
      { icon: TShirt, label: "Washing Machine & Iron" },
      { icon: Flashlight, label: "Torch" },
      { icon: SecurityCamera, label: "CCTV Security" },
      { icon: Wheelchair, label: "Wheelchair Friendly" },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Amenities() {
  return (
    <section id="amenities" className="bg-cream py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-satoshi text-sm uppercase tracking-[0.25em] text-gold mb-4">
            Amenities
          </p>
          <h2 className="font-outfit text-3xl md:text-5xl tracking-tighter leading-[1.1] text-stone-950">
            Everything you need,
            <br />
            nothing you don&apos;t
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 md:gap-20">
          {/* Left column — first two groups */}
          <div className="space-y-12">
            {AMENITY_GROUPS.slice(0, 2).map((group) => (
              <div key={group.title}>
                <h3 className="font-outfit text-lg text-stone-950 tracking-tight mb-6">
                  {group.title}
                </h3>
                <motion.div
                  className="space-y-0"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {group.items.map((item) => (
                    <motion.div
                      key={item.label}
                      variants={itemVariants}
                      className="flex items-center gap-4 py-4 border-t border-stone-200"
                    >
                      <item.icon
                        size={22}
                        weight="regular"
                        className="text-stone-500 flex-shrink-0"
                      />
                      <span className="text-base text-stone-950 font-medium">
                        {item.label}
                      </span>
                      {item.note && (
                        <span className="text-xs text-stone-400 ml-auto">
                          {item.note}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>

          {/* Right column — third group */}
          <div>
            {AMENITY_GROUPS.slice(2).map((group) => (
              <div key={group.title}>
                <h3 className="font-outfit text-lg text-stone-950 tracking-tight mb-6">
                  {group.title}
                </h3>
                <motion.div
                  className="space-y-0"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {group.items.map((item) => (
                    <motion.div
                      key={item.label}
                      variants={itemVariants}
                      className="flex items-center gap-4 py-4 border-t border-stone-200"
                    >
                      <item.icon
                        size={22}
                        weight="regular"
                        className="text-stone-500 flex-shrink-0"
                      />
                      <span className="text-base text-stone-950 font-medium">
                        {item.label}
                      </span>
                      {item.note && (
                        <span className="text-xs text-stone-400 ml-auto">
                          {item.note}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] Create `components/Experiences.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import {
  Fire,
  CookingPot,
  GameController,
  Star,
  Sun,
  Champagne,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

interface Experience {
  icon: Icon;
  title: string;
  description: string;
}

const EXPERIENCES: Experience[] = [
  {
    icon: Fire,
    title: "Bonfire Nights",
    description:
      "Gather around a crackling bonfire under a canopy of stars. Available as an add-on for intimate evenings.",
  },
  {
    icon: CookingPot,
    title: "BBQ Evenings",
    description:
      "Sizzling barbeque by the lawn — the perfect way to wrap up a day of relaxation.",
  },
  {
    icon: Star,
    title: "Stargazing",
    description:
      "The private terrace offers breathtaking views of the night sky, far from city light pollution.",
  },
  {
    icon: GameController,
    title: "Game Tournaments",
    description:
      "Table tennis, carrom, board games — challenge your friends and family in spirited indoor tournaments.",
  },
  {
    icon: Sun,
    title: "Al Fresco Breakfast",
    description:
      "Start your morning in the gazebo with a home-cooked breakfast surrounded by the garden's serenity.",
  },
  {
    icon: Champagne,
    title: "Private Celebrations",
    description:
      "Host birthday parties, anniversaries, or intimate gatherings in a stunning private setting.",
  },
];

export default function Experiences() {
  return (
    <section className="bg-stone-100 py-24 md:py-36 border-y border-stone-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-satoshi text-sm uppercase tracking-[0.25em] text-gold mb-4">
            Experiences
          </p>
          <h2 className="font-outfit text-3xl md:text-5xl tracking-tighter leading-[1.1] text-stone-950">
            Curated for every mood
          </h2>
        </motion.div>

        <div className="space-y-0">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={exp.title}
              className="flex items-start gap-6 py-8 border-t border-stone-300 last:border-b"
              initial={{
                opacity: 0,
                x: i % 2 === 0 ? -30 : 30,
              }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.05,
              }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cream flex items-center justify-center mt-1">
                <exp.icon size={20} weight="regular" className="text-gold" />
              </div>
              <div>
                <h3 className="font-outfit text-lg md:text-xl text-stone-950 tracking-tight mb-1">
                  {exp.title}
                </h3>
                <p className="text-base text-stone-500 leading-relaxed max-w-[55ch]">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] Update `app/page.tsx`:

```tsx
import Navbar from "@/components/Navbar";
import WhatsAppFab from "@/components/WhatsAppFab";
import VideoHero from "@/components/VideoHero";
import About from "@/components/About";
import StatsBar from "@/components/StatsBar";
import Spaces from "@/components/Spaces";
import LivingAreas from "@/components/LivingAreas";
import PoolGarden from "@/components/PoolGarden";
import Amenities from "@/components/Amenities";
import Experiences from "@/components/Experiences";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <VideoHero />
        <About />
        <StatsBar />
        <Spaces />
        <LivingAreas />
        <PoolGarden />
        <Amenities />
        <Experiences />
        {/* Spacer for scroll test */}
        <section className="min-h-[50vh] bg-cream" />
      </main>
      <WhatsAppFab />
    </>
  );
}
```

##### Step 8 Verification Checklist
- [x] Amenities: asymmetric 2-column layout (2fr / 1fr) on desktop — Outdoor + Indoor left, Convenience right
- [x] Amenities: no card boxes — items separated by `border-t` dividers
- [x] Amenities: Phosphor icons render correctly for each item
- [x] Amenities: "Add-on" labels appear right-aligned for bonfire, BBQ, projector
- [x] Amenities: staggered reveal animation on scroll
- [x] Experiences: items slide in from alternating sides (left, right, left...)
- [x] Experiences: warm stone-100 background band with borders
- [x] Experiences: each item has icon in cream circle, title, and description
- [x] Mobile: both sections collapse cleanly to single column

#### Step 8 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

---

#### Step 9: Location + Footer

- [ ] Create `components/Location.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Airplane,
  Train,
  Mountains,
  Drop,
  Tree,
  Church,
} from "@phosphor-icons/react";

const NEARBY = [
  { icon: Drop, label: "Sohna Hot Springs" },
  { icon: Mountains, label: "Aravalli Hills Trekking" },
  { icon: Tree, label: "Damdama Lake" },
  { icon: Church, label: "Ancient Shiva Temple" },
  { icon: Mountains, label: "Badkhal Lake" },
  { icon: Church, label: "Thakur Raghunath Temple & Rani Mahal" },
];

export default function Location() {
  return (
    <section id="location" className="bg-stone-100 py-24 md:py-36 border-t border-stone-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <p className="font-satoshi text-sm uppercase tracking-[0.25em] text-gold mb-4">
            Location
          </p>
          <h2 className="font-outfit text-3xl md:text-5xl tracking-tighter leading-[1.1] text-stone-950">
            Getting here
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-base text-stone-500 leading-relaxed max-w-[55ch] mb-8">
              Nestled amidst the verdant embrace of the Aravalli Hills in Sohna
              — a charming town known for its rejuvenating hot springs, scenic
              landscapes, and mystical legends.
            </p>

            {/* Distance markers */}
            <div className="flex flex-col gap-4 mb-10">
              <div className="flex items-center gap-4 py-3 border-t border-stone-300">
                <Airplane
                  size={20}
                  weight="regular"
                  className="text-stone-500 flex-shrink-0"
                />
                <span className="text-base text-stone-950 font-medium">
                  IGI Airport
                </span>
                <span className="text-sm text-stone-400 ml-auto">55 km</span>
              </div>
              <div className="flex items-center gap-4 py-3 border-t border-stone-300">
                <Train
                  size={20}
                  weight="regular"
                  className="text-stone-500 flex-shrink-0"
                />
                <span className="text-base text-stone-950 font-medium">
                  New Delhi Railway Station
                </span>
                <span className="text-sm text-stone-400 ml-auto">60 km</span>
              </div>
            </div>

            {/* Nearby attractions */}
            <h3 className="font-outfit text-lg text-stone-950 tracking-tight mb-4">
              Nearby Attractions
            </h3>
            <div className="space-y-0">
              {NEARBY.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 py-3 border-t border-stone-200"
                >
                  <item.icon
                    size={18}
                    weight="regular"
                    className="text-stone-400 flex-shrink-0"
                  />
                  <span className="text-sm text-stone-500">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-stone-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56342.82455585!2d76.87!3d28.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d3defcb3d97f3%3A0xd07a0343a4e8ca58!2sSohna%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="HappyNest Blanc Belle location — Sohna, Haryana"
                className="absolute inset-0"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] Create `components/Footer.tsx`:

```tsx
import { WhatsappLogo, Phone, MapPin } from "@phosphor-icons/react";

const WHATSAPP_URL =
  "https://wa.me/919999999999?text=Hi%2C%20I%27d%20like%20to%20book%20HappyNest%20Blanc%20Belle";

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-cream py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-outfit text-2xl tracking-tight mb-3">
              HappyNest
            </h3>
            <p className="text-sm text-stone-400 leading-relaxed max-w-[35ch]">
              Blanc Belle — A Luxury Farm Stay in Sohna, Haryana. Close enough
              to the city, far enough to unwind.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-outfit text-sm uppercase tracking-[0.2em] text-stone-400 mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-stone-300 hover:text-cream transition-colors"
              >
                <WhatsappLogo size={18} weight="fill" />
                WhatsApp — Book Now
              </a>
              <a
                href="tel:+919999999999"
                className="flex items-center gap-3 text-sm text-stone-300 hover:text-cream transition-colors"
              >
                <Phone size={18} />
                +91 99999 99999
              </a>
              <p className="flex items-start gap-3 text-sm text-stone-300">
                <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                Sohna, Haryana (Near New Delhi)
              </p>
            </div>
          </div>

          {/* House Rules */}
          <div>
            <h4 className="font-outfit text-sm uppercase tracking-[0.2em] text-stone-400 mb-4">
              House Rules
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>Check-in: 2:00 PM</li>
              <li>Check-out: 2:00 PM</li>
              <li>Pets welcome</li>
              <li>No access to villa kitchen</li>
              <li>Visitor charges apply</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-stone-800">
          <p className="text-xs text-stone-500 text-center">
            HappyNest — Blanc Belle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] Update `app/page.tsx` — final version with all sections:

```tsx
import Navbar from "@/components/Navbar";
import WhatsAppFab from "@/components/WhatsAppFab";
import VideoHero from "@/components/VideoHero";
import About from "@/components/About";
import StatsBar from "@/components/StatsBar";
import Spaces from "@/components/Spaces";
import LivingAreas from "@/components/LivingAreas";
import PoolGarden from "@/components/PoolGarden";
import Amenities from "@/components/Amenities";
import Experiences from "@/components/Experiences";
import Location from "@/components/Location";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <VideoHero />
        <About />
        <StatsBar />
        <Spaces />
        <LivingAreas />
        <PoolGarden />
        <Amenities />
        <Experiences />
        <Location />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
```

##### Step 9 Verification Checklist
- [x] Location: split layout — text/attractions left, Google Maps iframe right
- [x] Location: IGI Airport (55 km) and Railway Station (60 km) distances shown
- [x] Location: 6 nearby attractions listed with icons
- [x] Location: map loads and shows Sohna, Haryana area
- [x] Footer: dark stone-950 background, 3-column layout (brand, contact, house rules)
- [x] Footer: WhatsApp and phone links work correctly
- [x] Footer: house rules list matches property data
- [x] Mobile: location and footer collapse to single column cleanly
- [x] All nav anchor links (#about, #spaces, #amenities, #location) scroll to correct sections

#### Step 9 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

---

#### Step 10: SEO, Performance Polish & Final Cleanup

- [x] Create `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://happynest-blancbelle.com/sitemap.xml
```

- [x] Create `app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://happynest-blancbelle.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
```

- [x] Update `app/layout.tsx` to add structured data for vacation rental:

```tsx
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
  checkoutTime: "14:00",
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
```

- [x] Add a `.gitignore` file at the project root:

```
# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

- [x] Run final build check:

```bash
npm run build
```

##### Step 10 Verification Checklist
- [x] `npm run build` completes with zero errors
- [x] `npm run dev` — full page loads with all 9 sections rendering correctly
- [x] Video hero: scroll scrubbing works smoothly
- [x] Accordion slider: bedroom strips expand/collapse on desktop hover, mobile tap
- [x] Horizontal gallery: pool/garden section scrolls horizontally
- [x] All images use Next.js `<Image>` component with proper `alt` and `sizes`
- [x] Nav anchor links scroll to correct sections
- [x] WhatsApp FAB appears after scrolling past hero
- [x] Mobile (375px width): no horizontal overflow, all sections collapse cleanly
- [x] View page source: structured data JSON-LD is present in `<head>`
- [x] `public/robots.txt` is accessible at `/robots.txt`
- [x] No console errors, no hydration warnings
- [x] GSAP and Framer Motion are never mixed in the same component

#### Step 10 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

---

## Summary

| Step | What It Delivers |
|---|---|
| 1 | Next.js 15 scaffold, dependencies, assets organized, Tailwind v4 theme |
| 2 | Glassmorphism navbar + floating WhatsApp CTA |
| 3 | GSAP scroll-scrubbed drone video hero with animated typography |
| 4 | About section (asymmetric split) + animated stats counter bar |
| 5 | Accordion image slider for 5 themed bedrooms |
| 6 | Zig-zag living/dining/lounge sections |
| 7 | GSAP horizontal scroll gallery for pool & garden photos |
| 8 | Amenities (icon list with dividers) + Experiences (staggered list) |
| 9 | Location with map + Footer with contact/house rules |
| 10 | SEO (structured data, sitemap, robots.txt), final build check |
