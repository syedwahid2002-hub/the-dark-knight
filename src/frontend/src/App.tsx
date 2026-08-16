import CursorTrail from "@/components/CursorTrail";
import Navbar from "@/components/Navbar";
import RainEffect from "@/components/RainEffect";
import AlliesSection from "@/components/sections/AlliesSection";
import ArsenalSection from "@/components/sections/ArsenalSection";
import FooterSection from "@/components/sections/FooterSection";
import HeroSection from "@/components/sections/HeroSection";
import OriginSection from "@/components/sections/OriginSection";
import RoguesSection from "@/components/sections/RoguesSection";

/**
 * The Dark Knight — single-page Batman experience.
 * Composes all sections in narrative order with persistent atmospheric layers.
 */
export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-background text-foreground">
      {/* Atmospheric layers — fixed, behind content */}
      <RainEffect />
      <CursorTrail />

      {/* Persistent navigation */}
      <Navbar />

      {/* Narrative sections in order */}
      <main className="relative z-10">
        <HeroSection />
        <OriginSection />
        <RoguesSection />
        <AlliesSection />
        <ArsenalSection />
      </main>

      <FooterSection />
    </div>
  );
}
