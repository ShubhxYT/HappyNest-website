"use client";

import Image from "next/image";
import {
  Flame,
  UtensilsCrossed,
  Star,
  Gamepad2,
  Coffee,
  PartyPopper,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Experience {
  icon: LucideIcon;
  title: string;
  desc: string;
  image: string;
}

const EXPERIENCES: Experience[] = [
  {
    icon: Flame,
    title: "Bonfire Nights",
    desc: "Gather around a crackling bonfire under a canopy of stars. Available as an add-on for intimate evenings.",
    image:
      "https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
  },
  {
    icon: UtensilsCrossed,
    title: "BBQ Evenings",
    desc: "Sizzling barbeque by the lawn — the perfect way to wrap up a day of relaxation.",
    image:
      "https://images.pexels.com/photos/1105325/pexels-photo-1105325.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
  },
  {
    icon: Star,
    title: "Stargazing",
    desc: "The private terrace offers breathtaking views of the night sky, far from city light pollution.",
    image:
      "https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
  },
  {
    icon: Gamepad2,
    title: "Game Tournaments",
    desc: "Table tennis, carrom, board games — challenge your friends and family in spirited indoor tournaments.",
    image:
      "https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
  },
  {
    icon: Coffee,
    title: "Al Fresco Breakfast",
    desc: "Start your morning in the gazebo with a home-cooked breakfast surrounded by the garden's serenity.",
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
  },
  {
    icon: PartyPopper,
    title: "Private Celebrations",
    desc: "Host birthday parties, anniversaries, or intimate gatherings in a stunning private setting.",
    image:
      "https://images.pexels.com/photos/1483776/pexels-photo-1483776.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
  },
];

export default function Experiences() {
  return (
    <section
      id="experiences"
      className="py-24 lg:py-32 bg-stone-900 dark:bg-surface"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Centred heading with flanking amber lines */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-amber-500" />
            <span className="text-xs tracking-[0.3em] uppercase text-amber-400 font-medium">
              Experiences
            </span>
            <div className="w-8 h-px bg-amber-500" />
          </div>
          <h2 className="font-outfit text-4xl lg:text-5xl font-light text-white">
            Curated for{" "}
            <span className="italic text-amber-400">every mood</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERIENCES.map(({ icon: Icon, title, desc, image }) => (
            <div
              key={title}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-75"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-amber-500/20 border border-amber-500/40 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={15} className="text-amber-400" />
                  </div>
                  <h3 className="text-white font-semibold text-base">
                    {title}
                  </h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed font-light">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
