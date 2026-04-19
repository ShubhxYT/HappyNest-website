"use client";

import Image from "next/image";
import { Users, BedDouble, Bath, Clock } from "lucide-react";
import SectionLabel from "./SectionLabel";

const STATS = [
  { icon: Users, value: "18", label: "Max Guests" },
  { icon: BedDouble, value: "6", label: "Bedrooms" },
  { icon: Bath, value: "7", label: "Bathrooms" },
  { icon: Clock, value: "12 PM", label: "Check-out" },
] as const;

export default function About() {
  return (
    <section id="about" className="bg-cream dark:bg-surface py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text + Stats */}
          <div>
            <div className="mb-6">
              <SectionLabel>About HappyNest</SectionLabel>
            </div>
            <h2 className="font-outfit text-3xl md:text-5xl tracking-tighter leading-[1.1] text-stone-950 dark:text-on-surface mb-6">
              More than a home —
              <br />
              an opulent retreat
            </h2>
            <div className="space-y-4 text-base text-stone-500 dark:text-on-surface-dim leading-relaxed max-w-[55ch] mb-10">
              <p>
                Nestled in the serene embrace of Sohna, HappyNest Blanc Belle
                is a handcrafted luxury farm stay offering an unmatched blend
                of comfort, nature, and curated experiences.
              </p>
              <p>
                A haven for weekend getaways, family gatherings, and milestone
                celebrations — our six uniquely designed bedroom suites,
                private pool, and expansive gardens await your arrival.
              </p>
              <p>Furry companions are welcomed with open arms.</p>
            </div>

            {/* Inline stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 p-4 bg-stone-100 dark:bg-surface-container rounded-xl"
                >
                  <Icon
                    size={20}
                    className="text-amber-600 dark:text-primary-bright"
                  />
                  <span className="font-outfit font-semibold text-lg text-stone-950 dark:text-on-surface">
                    {value}
                  </span>
                  <span className="text-xs text-stone-500 dark:text-on-surface-dim text-center">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image with 5★ badge */}
          <div className="relative">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.06)]">
              <Image
                src="/images/garden/drone-2.jpg"
                alt="Aerial view of HappyNest Blanc Belle"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-4 left-4 bg-amber-600 text-white px-4 py-3 rounded-xl shadow-lg">
              <div className="text-lg font-bold leading-none">5★</div>
              <div className="text-xs font-medium mt-0.5">Luxury Farm Stay</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
