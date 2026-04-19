"use client";

import { useState } from "react";
import Image from "next/image";
import SectionLabel from "./SectionLabel";

interface Room {
  name: string;
  floor: string;
  image: string;
  desc: string;
}

const ROOMS: Room[] = [
  {
    name: "The Blue Room",
    floor: "Ground Floor",
    image: "/images/bedrooms/blue1.jpg",
    desc: "A serene retreat with cool blue tones, a plush king-size bed, and an ensuite bathroom.",
  },
  {
    name: "The Green Room",
    floor: "Ground Floor",
    image: "/images/bedrooms/green1.jpg",
    desc: "Earthy greens and natural textures bring the outdoors in — features an ensuite jacuzzi.",
  },
  {
    name: "The Grey Room",
    floor: "First Floor",
    image: "/images/bedrooms/grey1.jpg",
    desc: "Sophisticated grey tones with private balcony access and an ensuite jacuzzi.",
  },
  {
    name: "The Brown Room",
    floor: "First Floor",
    image: "/images/bedrooms/brown1.jpg",
    desc: "Warm browns and rich woods create a cosy, grounded atmosphere with balcony views.",
  },
  {
    name: "The Lime Room",
    floor: "First Floor",
    image: "/images/bedrooms/lime1.jpg",
    desc: "Fresh and vibrant lime accents energise this bright, cheerful room with balcony.",
  },
  {
    name: "The Pearl Room",
    floor: "First Floor",
    image: "/images/bedrooms/grey3.jpg",
    desc: "The crown jewel — pristine tones, ensuite bathroom, and balcony for the ultimate luxury stay.",
  },
];

export default function Bedrooms() {
  const [active, setActive] = useState(0);

  return (
    <section id="bedrooms" className="py-24 lg:py-32 bg-stone-50 dark:bg-surface-low">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex justify-center mb-4">
          <SectionLabel>Spaces</SectionLabel>
        </div>
        <h2 className="font-outfit text-4xl lg:text-5xl font-light text-stone-800 dark:text-on-surface text-center mt-4 mb-16">
          Six lavish bedrooms,{" "}
          <span className="italic text-amber-600 dark:text-primary-bright">
            each with its own character
          </span>
        </h2>

        <div className="grid lg:grid-cols-5 gap-4 lg:gap-6">
          {/* Sidebar list */}
          <div className="lg:col-span-2 flex flex-col gap-3 order-2 lg:order-1">
            {ROOMS.map((room, i) => (
              <button
                key={room.name}
                onClick={() => setActive(i)}
                className={`text-left px-5 py-4 rounded-xl transition-all duration-200 ${
                  active === i
                    ? "bg-white dark:bg-surface-container shadow-md border border-amber-300 dark:border-amber-600/40"
                    : "bg-white/60 dark:bg-surface-container/40 border border-stone-200 dark:border-outline-faint/30 hover:bg-white dark:hover:bg-surface-container hover:border-stone-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div
                      className={`font-semibold text-sm ${
                        active === i
                          ? "text-stone-800 dark:text-on-surface"
                          : "text-stone-600 dark:text-on-surface-dim"
                      }`}
                    >
                      {room.name}
                    </div>
                    <div className="text-xs text-stone-400 dark:text-on-surface-dim mt-0.5 tracking-wider">
                      {room.floor}
                    </div>
                  </div>
                  {active === i && (
                    <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Preview panel */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
              <Image
                key={active}
                src={ROOMS[active].image}
                alt={ROOMS[active].name}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <div className="text-amber-300 text-xs tracking-[0.3em] uppercase mb-2">
                  {ROOMS[active].floor}
                </div>
                <h3 className="font-outfit text-white text-2xl font-light mb-2">
                  {ROOMS[active].name}
                </h3>
                <p className="text-white/75 text-sm font-light">
                  {ROOMS[active].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
