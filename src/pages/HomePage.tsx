import { AtelierHero } from '@/components/atelier/AtelierHero';
import { WingsSection } from '@/components/atelier/WingsSection';
import { ArtifactGallery } from '@/components/atelier/ArtifactGallery';
import {
  ShopTeaser,
  LightPath,
  TestimonialWall,
  PricingVaults,
  FinalCTA,
} from '@/components/atelier/AtelierSections';
import { ExitPortal } from '@/components/atelier/AtelierSections';

export function HomePage() {

  return (
    <div className="relative">
      {/* SECTION 1 — Hero: Entering the Atelier */}
      <AtelierHero />

      {/* SECTION 2 — The Wings: scroll-pinned category showcase */}
      <WingsSection />

      {/* SECTION 3 — Featured Artifacts: floating gallery */}
      <ArtifactGallery />

      {/* SECTION 4 — Browse the Full Collection */}
      <ShopTeaser />

      {/* SECTION 5 — How It Works: light path */}
      <LightPath />

      {/* SECTION 6 — Voices from the Gallery */}
      <TestimonialWall />

      {/* SECTION 7 — Membership Vaults */}
      <PricingVaults />

      {/* SECTION 8 — Final CTA */}
      <FinalCTA />

      {/* SECTION 9 — Exit Portal (footer) */}
      <ExitPortal />
    </div>
  );
}
