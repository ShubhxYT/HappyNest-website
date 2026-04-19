"use client";

import { useState } from "react";
import Image from "next/image";
import SectionLabel from "./SectionLabel";

interface GardenImage {
  src: string;
  alt: string;
  span: string;
}

const IMAGES: GardenImage[] = [
  {
    src: "/images/garden/pool1.jpg",
    alt: "Private swimming pool",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    src: "/images/garden/pool2.jpg",
    alt: "Pool area",
    span: "",
  },
  {
    src: "/images/garden/garden.jpg",
    alt: "Garden view",
    span: "",
  },
  {
    src: "/images/garden/garden2.jpg",
    alt: "Garden seating",
    span: "",
  },
  {
    src: "/images/garden/drone-1.jpg",
    alt: "Aerial view of property",
    span: "",
  },
];

const TAGS = [
  "Private Jacuzzi",
  "Poolside Loungers",
  "Garden Gazebo",
  "Alfresco Seating",
  "Outdoor Games",
];

export default function PoolGarden() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="pool" className="py-24 lg:py-32 bg-stone-50 dark:bg-surface-low">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <SectionLabel>Pool &amp; Garden</SectionLabel>
            <h2 className="font-outfit text-4xl lg:text-5xl font-light text-stone-800 dark:text-on-surface mt-4">
              Immerse &amp;{" "}
              <span className="italic text-amber-600 dark:text-primary-bright">
                Unwind
              </span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 lg:gap-10 lg:text-right">
            <div>
              <div className="text-2xl font-semibold text-stone-800 dark:text-on-surface">
                50 × 10m
              </div>
              <div className="text-xs text-stone-400 dark:text-on-surface-dim tracking-widest uppercase mt-1">
                Private Pool
              </div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-stone-800 dark:text-on-surface">
                4 ft
              </div>
              <div className="text-xs text-stone-400 dark:text-on-surface-dim tracking-widest uppercase mt-1">
                Pool Depth
              </div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-stone-800 dark:text-on-surface">
                400 sq ft
              </div>
              <div className="text-xs text-stone-400 dark:text-on-surface-dim tracking-widest uppercase mt-1">
                Private Lawn
              </div>
            </div>
          </div>
        </div>

        {/* Mosaic grid */}
        <div className="grid lg:grid-cols-4 lg:grid-rows-2 gap-4 lg:gap-6 lg:h-[560px]">
          {IMAGES.map((img, i) => (
            <div
              key={img.src}
              className={`rounded-xl overflow-hidden cursor-pointer group relative ${img.span} ${
                i === 0 ? "h-64 lg:h-auto" : "h-48 lg:h-auto"
              }`}
              onClick={() => setLightbox(img.src)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={
                  i === 0
                    ? "(max-width: 1024px) 100vw, 50vw"
                    : "(max-width: 1024px) 100vw, 25vw"
                }
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* Feature tags */}
        <div className="mt-8 flex flex-wrap gap-4">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 border border-amber-200 dark:border-amber-600/40 text-amber-700 dark:text-amber-400 text-xs tracking-wider uppercase rounded-full bg-amber-50 dark:bg-amber-600/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative w-full max-w-5xl aspect-video">
            <Image
              src={lightbox}
              alt="Garden or pool gallery image"
              fill
              className="object-contain rounded-lg"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </section>
  );
}
