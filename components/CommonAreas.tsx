"use client";

import Image from "next/image";
import SectionLabel from "./SectionLabel";

interface Area {
  title: string;
  desc: string;
  image: string;
  tag: string;
}

const AREAS: Area[] = [
  {
    title: "Living Area",
    desc: "An expansive living room that seamlessly extends to the outdoor pool area. Comfortably seats up to 15 people, furnished with sofas and equipped with AC, Wi-Fi, TV, a cosy fireplace, and a portable music system.",
    image: "/images/single/sofa-ground.jpg",
    tag: "Seats 15",
  },
  {
    title: "Dining",
    desc: "Positioned adjacent to the living room, this cosy space seats up to 10 people. The perfect setting for long conversations over home-cooked meals, equipped with AC and TV.",
    image: "/images/single/main-dining.jpg",
    tag: "Seats 10",
  },
  {
    title: "Lounge & Game Room",
    desc: "A first-floor lounge featuring a game centre with table tennis and carrom. Seats up to 15 people, equipped with AC, Wi-Fi, TV, and a wired music system — ideal for spirited tournaments.",
    image: "/images/single/tt-table-sofa-up.jpg",
    tag: "Seats 15",
  },
  {
    title: "Terrace",
    desc: "A beautiful and expansive private terrace with alfresco seating. Perfect for midnight stargazing and tranquil dewy mornings, offering breathtaking views of the surrounding landscape.",
    image: "/images/single/main-big-balcony.jpeg",
    tag: "Alfresco",
  },
];

export default function CommonAreas() {
  return (
    <section
      id="common-areas"
      className="py-24 lg:py-32 bg-cream dark:bg-surface"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex justify-center mb-4">
          <SectionLabel>Common Areas</SectionLabel>
        </div>
        <h2 className="font-outfit text-4xl lg:text-5xl font-light text-stone-800 dark:text-on-surface text-center mt-4 mb-16">
          Gather, dine,{" "}
          <span className="italic text-amber-600 dark:text-primary-bright">
            unwind
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {AREAS.map((area) => (
            <div
              key={area.title}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <Image
                  src={area.image}
                  alt={area.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute top-4 right-4 bg-amber-600/90 text-white text-xs px-3 py-1 rounded-full tracking-widest uppercase">
                {area.tag}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <h3 className="text-white text-xl font-semibold mb-2">
                  {area.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {area.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
