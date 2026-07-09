"use client";

import { useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { Play, Pause } from "@phosphor-icons/react";

export default function VirtualTour() {
  const [active, setActive] = useState(false);

  return (
    <section id="virtual-tour" className="pt-0 pb-24 lg:pb-32 bg-stone-50 dark:bg-surface-low">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <SectionLabel>360° Tour</SectionLabel>
        <h2 className="font-outfit text-4xl lg:text-5xl font-light text-stone-800 dark:text-on-surface mt-4 mb-16">
          Walk Through{" "}
          <span className="italic text-amber-600 dark:text-primary-bright">
            Blanc Belle
          </span>
        </h2>

        <div className="relative w-full rounded-xl overflow-hidden shadow-lg group">
          <iframe
            src="https://tour.happynestfarm.in"
            title="HappyNest Blanc Belle 360° Virtual Tour"
            className="w-full border-0 aspect-[3/4] md:aspect-video"
            allowFullScreen
            loading="lazy"
          />

          {active && (
            <button
              onClick={(e) => { e.stopPropagation(); setActive(false); }}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center backdrop-blur-sm transition-colors"
              aria-label="Pause virtual tour"
            >
              <Pause size={18} weight="fill" className="text-white" />
            </button>
          )}

          {!active && (
            <div
              className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer backdrop-blur-sm transition-opacity"
              onClick={() => setActive(true)}
            >
              <div className="flex flex-col items-center gap-4 text-white">
                <div className="w-16 h-16 rounded-full bg-amber-500/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play size={28} weight="fill" className="text-white ml-1" />
                </div>
                <span className="text-sm tracking-widest uppercase font-medium">
                  Tap to Explore
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
