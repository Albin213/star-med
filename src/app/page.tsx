import { BrandMarquee } from "@/components/home/BrandMarquee";
import { CategoryExplorer } from "@/components/home/CategoryExplorer";
import { CtaBand } from "@/components/home/CtaBand";
import { Hero } from "@/components/home/Hero";
import { NetworkSection } from "@/components/home/NetworkSection";
import { Pillars } from "@/components/home/Pillars";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { Stats } from "@/components/home/Stats";
import { WhyStarmed } from "@/components/home/WhyStarmed";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandMarquee />
      <Pillars />
      <CategoryExplorer />
      <ProductShowcase />
      <Stats />
      <WhyStarmed />
      <NetworkSection />
      <CtaBand />
    </>
  );
}
