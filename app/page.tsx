import Navbar from "@/components/Navbar";
import WhatsAppFab from "@/components/WhatsAppFab";
import VideoHero from "@/components/VideoHero";
import About from "@/components/About";
import StatsBar from "@/components/StatsBar";
import Spaces from "@/components/Spaces";
import LivingAreas from "@/components/LivingAreas";
import PoolGarden from "@/components/PoolGarden";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <VideoHero />
        <About />
        <StatsBar />
        <Spaces />
        <LivingAreas />
        <PoolGarden />
        {/* Spacer for scroll test */}
        <section className="min-h-[50vh] bg-cream" />
      </main>
      <WhatsAppFab />
    </>
  );
}
