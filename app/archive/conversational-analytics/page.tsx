import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { BrandHomeLink } from "../../brand-home-link";
import { ContactSection } from "../../contact-section";
import { AnalyticsHeroMotion } from "./hero-motion";
import { QuestionsCarousel } from "./questions-carousel";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Conversational Analytics | Vyuk — Archived",
  description: "Ask questions of your operations data in plain language and bring business context into the next decision with vyu.",
};

export default function ConversationalAnalytics() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header project-header">
        <BrandHomeLink />
        <a className="project-back" href="/#work"><ArrowLeft size={17} aria-hidden="true" /> Applied AI use cases</a>
      </header>

      <main id="main-content">
        <section className="analytics-hero" aria-labelledby="analytics-title">
          <div className="analytics-hero-inner">
            <div className="analytics-hero-lede">
              <div>
                <p className="project-kicker">MEET VYU, OUR CONVERSATIONAL ANALYTICS PLATFORM</p>
                <h1 id="analytics-title">A direct line to your operations data.</h1>
              </div>
              <p>Ask business questions in plain language. vyu brings the relevant context into the answer so teams can decide what to do next.</p>
            </div>
            <AnalyticsHeroMotion />
          </div>
        </section>

        <section className="analytics-scenario" aria-labelledby="analytics-scenario-title">
          <div className="project-section-inner">
            <div className="project-section-heading">
              <h2 id="analytics-scenario-title">Ask what matters to your business.</h2>
            </div>
            <QuestionsCarousel />
          </div>
        </section>

        <section className="project-evidence" aria-labelledby="analytics-learning-title">
          <div className="project-section-inner">
            <div className="project-section-heading">
              <h2 id="analytics-learning-title">Connected data. Natural language querying. Faster field decisions.</h2>
              <p>Vyuk unified disconnected customer reports into a robust production database and built vyu, its conversational analytics solution, on top. Teams can query their operational data in natural language, reducing reliance on MIS reports and specialist analysis for faster, more confident field decisions.</p>
            </div>
            <div className="project-evidence-note analytics-evidence-note">
              <span>EARLY IMPLEMENTATION</span>
              <p>The capability is operational within the sales function of a leading consumer products brand, with business impact measurement underway.</p>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
    </>
  );
}
