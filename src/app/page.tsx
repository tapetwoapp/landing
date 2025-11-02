import ContactSection from "@/components/sections/contact-section";
import FooterSection from "@/components/sections/footer-section";
import HeroSection from "@/components/sections/hero-section";
import PhoneSection from "@/components/sections/phone-section";
import ScrollRevealText from "@/components/sections/scroll-reveal-text";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <div className="space-y-24">
        <ScrollRevealText />
        <PhoneSection />
        <ContactSection />
      </div>
      <FooterSection />
    </main>
  );
}
