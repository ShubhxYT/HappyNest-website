import Navbar from "@/components/Navbar";
import WhatsAppFab from "@/components/WhatsAppFab";
import VideoHero from "@/components/VideoHero";
import About from "@/components/About";
import StatsBar from "@/components/StatsBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <VideoHero />
        <About />
        <StatsBar />
        {/* Spacer for scroll test */}
        <section className="min-h-[50vh] bg-cream" />
      </main>
      <WhatsAppFab />
    </>
  );
}
