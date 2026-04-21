"use client";

import {
  Clock,
  Calendar,
  Dog,
  Users,
  ChefHat,
  FileText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionLabel from "./SectionLabel";

interface Rule {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const RULES: Rule[] = [
  {
    icon: Clock,
    title: "Check-in & Check-out",
    desc: "Check-in: 2:00 PM · Check-out: 12:00 PM",
  },
  {
    icon: Calendar,
    title: "Early / Late Flexibility",
    desc: "Early check-in and late check-out subject to availability. Additional fee may apply.",
  },
  {
    icon: Dog,
    title: "Pets Welcome",
    desc: "Furry companions are welcomed with open arms at HappyNest.",
  },
  {
    icon: Users,
    title: "Visitor Charges",
    desc: "Non-staying guests: ₹1,000 + taxes per person per day (up to 4 hours). Meals excluded.",
  },
  {
    icon: ChefHat,
    title: "Kitchen Access",
    desc: "Guests do not have access to the villa kitchen.",
  },
  {
    icon: FileText,
    title: "House Policies",
    desc: "Please read all Home Truths, House Rules, and Policies thoroughly before your stay.",
  },
];

export default function HouseRules() {
  return (
    <section id="rules" className="py-24 lg:py-32 bg-stone-50 dark:bg-surface-low">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex justify-center mb-4">
          <SectionLabel>House Rules &amp; Policies</SectionLabel>
        </div>
        <h2 className="font-outfit text-4xl lg:text-5xl font-light text-stone-800 dark:text-on-surface text-center mt-4 mb-16">
          Before You{" "}
          <span className="italic text-amber-600 dark:text-primary-bright">
            Arrive
          </span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RULES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white dark:bg-surface-container rounded-2xl p-6 lg:p-8 shadow-sm border border-stone-100 dark:border-transparent hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-amber-50 dark:bg-amber-600/10 rounded-xl flex items-center justify-center mb-4">
                <Icon
                  size={20}
                  className="text-amber-600 dark:text-amber-400"
                />
              </div>
              <h3 className="font-semibold text-stone-800 dark:text-on-surface mb-2">
                {title}
              </h3>
              <p className="text-stone-500 dark:text-on-surface-dim text-sm leading-relaxed font-light">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA block */}
        <div className="mt-16 bg-amber-600 rounded-2xl p-8 lg:p-12 text-white text-center">
          <h3 className="font-outfit text-2xl lg:text-3xl font-light mb-4">
            Ready to experience Blanc Belle?
          </h3>
          <p className="text-amber-100 font-light mb-8 max-w-xl mx-auto">
            Reach out to us to check availability and plan your perfect getaway
            at HappyNest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919167928471?text=Hi%2C%20I%27d%20like%20to%20book%20HappyNest%20Blanc%20Belle"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-white text-amber-700 font-semibold text-sm tracking-widest uppercase rounded hover:bg-amber-50 transition-colors"
            >
              Book Now
            </a>
            <a
              href="mailto:stay@happynestfarm.in"
              className="px-8 py-3.5 border-2 border-white/60 text-white font-semibold text-sm tracking-widest uppercase rounded hover:border-white hover:bg-white/10 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
