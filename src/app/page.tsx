import HeroSection from "@/components/sections/hero-section";
import ScrollRevealText from "@/components/sections/scroll-reveal-text";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <ScrollRevealText />
      <section className="flex  h-screen items-center justify-center">
        <h2 className="text-3xl md:text-5xl">Next section</h2>
      </section>
    </main>
  );
}
