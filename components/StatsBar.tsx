"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItemProps {
  value: number;
  suffix?: string;
  label: string;
  prefix?: string;
}

function StatItem({ value, suffix = "", label, prefix = "" }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = value / 30;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 40);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center px-4 py-6 md:py-0">
      <p className="font-outfit text-3xl md:text-4xl tracking-tight text-stone-950 font-semibold">
        {prefix}
        {count}
        {suffix}
      </p>
      <p className="text-sm text-stone-500 mt-1 font-satoshi">{label}</p>
    </div>
  );
}

export default function StatsBar() {
  return (
    <motion.section
      className="bg-stone-100 border-y border-stone-200"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-stone-300">
          <StatItem value={18} label="Guests" prefix="Up to " />
          <StatItem value={6} label="Bedrooms" />
          <StatItem value={7} label="Bathrooms" />
          <StatItem value={12} suffix=":00 PM" label="Check-out" />
        </div>
      </div>
    </motion.section>
  );
}
