"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import VideoHero from "@/components/sections/VideoHero";
import About from "@/components/sections/About";
import Bedrooms from "@/components/sections/Bedrooms";
import CommonAreas from "@/components/sections/CommonAreas";
import PoolGarden from "@/components/sections/PoolGarden";
import Amenities from "@/components/sections/Amenities";
import Meals from "@/components/sections/Meals";
import Experiences from "@/components/sections/Experiences";
import Location from "@/components/sections/Location";
import HouseRules from "@/components/sections/HouseRules";
import BookingSection from "@/components/sections/BookingSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Navbar scrolled={scrolled} />
      <main>
        <VideoHero />
        <About />
        <Bedrooms />
        <CommonAreas />
        <PoolGarden />
        <Amenities />
        <Meals />
        <Experiences />
        <Location />
        <HouseRules />
        <BookingSection />
      </main>
      <Footer />
    </>
  );
}