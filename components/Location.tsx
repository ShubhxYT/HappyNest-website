"use client";

import { MapPin, Navigation } from "lucide-react";
import SectionLabel from "./SectionLabel";

const ATTRACTIONS = [
  { name: "Sohna Hot Springs", dist: "5 min drive" },
  { name: "Aravalli Hills", dist: "10 min drive" },
  { name: "Damdama Lake", dist: "15 min drive" },
  { name: "Gurugram (Gurgaon)", dist: "25 min drive" },
  { name: "IGI Airport, Delhi", dist: "50 min drive" },
  { name: "Connaught Place, Delhi", dist: "55 min drive" },
];

export default function Location() {
  return (
    <section id="location" className="py-24 lg:py-32 bg-cream dark:bg-surface">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info + Attractions */}
          <div>
            <SectionLabel>Location</SectionLabel>
            <h2 className="font-outfit text-4xl lg:text-5xl font-light text-stone-800 dark:text-on-surface mt-4 mb-6">
              Getting{" "}
              <span className="italic text-amber-600 dark:text-primary-bright">
                here
              </span>
            </h2>
            <p className="text-stone-500 dark:text-on-surface-dim font-light leading-relaxed mb-8">
              Nestled amidst the verdant embrace of the Aravalli Hills in Sohna
              — a charming town known for its rejuvenating hot springs, scenic
              landscapes, and mystical legends. Close enough to the city, far
              enough to truly unwind.
            </p>

            <div className="flex items-start gap-3 mb-8 p-4 bg-amber-50 dark:bg-amber-600/10 rounded-xl">
              <MapPin
                size={18}
                className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0"
              />
              <div>
                <div className="font-medium text-stone-700 dark:text-on-surface text-sm">
                  HappyNest Blanc Belle
                </div>
                <div className="text-stone-500 dark:text-on-surface-dim text-sm font-light mt-0.5">
                  Sohna, Haryana — Near New Delhi, India
                </div>
              </div>
            </div>

            <h3 className="text-sm font-semibold text-stone-700 dark:text-on-surface tracking-widest uppercase mb-4">
              Nearby Attractions
            </h3>
            <div className="grid sm:grid-cols-2 gap-0">
              {ATTRACTIONS.map(({ name, dist }) => (
                <div
                  key={name}
                  className="flex items-center justify-between py-3 border-b border-stone-100 dark:border-outline-faint/15 last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <Navigation
                      size={13}
                      className="text-amber-500 dark:text-amber-400"
                    />
                    <span className="text-stone-600 dark:text-on-surface-dim text-sm">
                      {name}
                    </span>
                  </div>
                  <span className="text-stone-400 dark:text-on-surface-dim text-xs">
                    {dist}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Google Maps iframe */}
          <div className="relative h-80 lg:h-[500px] rounded-2xl overflow-hidden dark:ring-1 dark:ring-outline-faint/15 shadow-[0_0_60px_rgba(0,0,0,0.06)] bg-stone-200 dark:bg-surface-container">
            <iframe
              title="HappyNest Blanc Belle Location"
              src="https://maps.google.com/maps?q=28.234944,77.165250&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
