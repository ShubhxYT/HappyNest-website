"use client";

import {
  Wifi,
  Flame,
  Dumbbell,
  Car,
  Utensils,
  Music,
  Tv,
  Wind,
  Dog,
  Droplets,
  Sun,
  Gamepad2,
} from "lucide-react";
import SectionLabel from "./SectionLabel";

const outdoor = [
  { icon: Droplets, label: "Private Pool" },
  { icon: Droplets, label: "Jacuzzi" },
  { icon: Sun, label: "Sun Loungers" },
  { icon: Gamepad2, label: "Outdoor Games" },
  { icon: Flame, label: "Bonfire Setup" },
  { icon: Utensils, label: "BBQ Grill" },
];

const indoor = [
  { icon: Wifi, label: "High-Speed Wi-Fi" },
  { icon: Wind, label: "AC in All Rooms" },
  { icon: Tv, label: "Smart TVs" },
  { icon: Music, label: "Music Systems" },
  { icon: Flame, label: "Fireplace" },
  { icon: Gamepad2, label: "Table Tennis & Carrom" },
];

const convenience = [
  { icon: Car, label: "Parking" },
  { icon: Dog, label: "Pet Friendly" },
  { icon: Dumbbell, label: "Sports Equipment" },
  { icon: Utensils, label: "Dining Service" },
];

const CATEGORIES = [
  { label: "Outdoor", items: outdoor },
  { label: "Indoor", items: indoor },
  { label: "Convenience", items: convenience },
];

export default function Amenities() {
  return (
    <section id="amenities" className="py-24 lg:py-32 bg-cream dark:bg-surface">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex justify-center mb-4">
          <SectionLabel>Amenities</SectionLabel>
        </div>
        <h2 className="font-outfit text-4xl lg:text-5xl font-light text-stone-800 dark:text-on-surface text-center mt-4 mb-16">
          Everything you need,{" "}
          <span className="italic text-amber-600 dark:text-primary-bright">
            nothing you don&apos;t
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              className="bg-stone-50 dark:bg-surface-container rounded-2xl p-8"
            >
              <h3 className="text-xs tracking-[0.3em] uppercase text-amber-600 dark:text-primary-bright font-semibold mb-6">
                {cat.label}
              </h3>
              <div className="flex flex-col gap-4">
                {cat.items.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-9 h-9 bg-white dark:bg-surface-bright rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                      <Icon
                        size={16}
                        className="text-amber-600 dark:text-primary-bright"
                      />
                    </div>
                    <span className="text-stone-600 dark:text-on-surface-dim text-sm font-light">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-stone-400 dark:text-on-surface-dim text-xs mt-8 tracking-wide">
          All add-on costs subject to 18% GST.
        </p>
      </div>
    </section>
  );
}
