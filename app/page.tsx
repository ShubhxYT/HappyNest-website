"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import WhatsAppFab from "@/components/WhatsAppFab";
import VideoHero from "@/components/VideoHero";
import About from "@/components/About";
import Spaces from "@/components/Spaces";
import LivingAreas from "@/components/LivingAreas";
import PoolGarden from "@/components/PoolGarden";
import Amenities from "@/components/Amenities";
import Meals from "@/components/Meals";
import Experiences from "@/components/Experiences";
import Location from "@/components/Location";
import HouseRules from "@/components/HouseRules";
import Footer from "@/components/Footer";

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
        <Spaces />
        <LivingAreas />
        <PoolGarden />
        <Amenities />
        <Meals />
        <Experiences />
        <Location />
        <HouseRules />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
