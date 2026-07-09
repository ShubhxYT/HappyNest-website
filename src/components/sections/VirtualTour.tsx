"use client";

import SectionLabel from "@/components/ui/SectionLabel";

export default function VirtualTour() {
  return (
    <section id="virtual-tour" className="py-24 lg:py-32 bg-stone-50 dark:bg-surface-low">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <SectionLabel>360° Tour</SectionLabel>
        <h2 className="font-outfit text-4xl lg:text-5xl font-light text-stone-800 dark:text-on-surface mt-4 mb-16">
          Walk Through{" "}
          <span className="italic text-amber-600 dark:text-primary-bright">
            Blanc Belle
          </span>
        </h2>

        <div className="relative w-full rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://tour.happynestfarm.in"
            title="HappyNest Blanc Belle 360° Virtual Tour"
            className="w-full border-0"
            style={{ aspectRatio: "16 / 9" }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
