import Navbar from "@/components/Navbar";
import WhatsAppFab from "@/components/WhatsAppFab";
import VideoHero from "@/components/VideoHero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <VideoHero />
        {/* Spacer sections for scrolling test */}
        <section className="min-h-[100dvh] flex items-center justify-center bg-cream">
          <p className="font-satoshi text-stone-500 text-lg">
            Content sections coming soon
          </p>
        </section>
      </main>
      <WhatsAppFab />
    </>
  );
}
