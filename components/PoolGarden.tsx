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
