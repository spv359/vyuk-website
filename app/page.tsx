import { ContactSection } from "./contact-section";
import { HeroCarousel } from "./hero-carousel";
import { OperatingScope } from "./operating-scope";
import { WorkStrip } from "./work-strip";
import { AboutVyuk } from "./about-vyuk";
import { LandingHeader } from "./landing-header";

export default function Home() {
  return (
    <>
      <LandingHeader />

      <main id="main-content" tabIndex={-1}>
        <HeroCarousel />
        <OperatingScope />

        <WorkStrip />
        <AboutVyuk />

        <ContactSection />
      </main>
    </>
  );
}
