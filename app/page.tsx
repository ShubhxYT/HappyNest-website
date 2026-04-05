import Navbar from "@/components/Navbar";
import WhatsAppFab from "@/components/WhatsAppFab";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section className="min-h-[100dvh] flex items-center justify-center bg-cream">
          <h1 className="font-outfit text-4xl md:text-6xl tracking-tighter leading-none text-stone-950">
            HappyNest — Blanc Belle
          </h1>
        </section>
        {/* Spacer to test scroll behavior */}
        <section className="h-[200vh] bg-cream" />
      </main>
      <WhatsAppFab />
    </>
  );
}
