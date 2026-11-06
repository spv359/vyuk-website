import type { Metadata } from "next";
import { ArrowLeft, MapPin, MessageCircle, PackageCheck, ShoppingBag, Store, Target, UsersRound } from "lucide-react";
import { BrandHomeLink } from "../../brand-home-link";
import { ContactSection } from "../../contact-section";
import { SalesHeroMotion } from "./hero-motion";
import { SalesFlowMotion } from "./flow-motion";
import "./field-sales.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Sales Throughput Improvement | Vyuk — Archived",
  description: "Organisational intelligence translated into outlet-specific action. A completed field pilot and statewide deployment underway for 140 sales officers.",
};

export default function FieldSalesThroughput() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header project-header">
        <BrandHomeLink />
        <a className="project-back" href="/#work"><ArrowLeft size={17} aria-hidden="true" /> Applied AI use cases</a>
      </header>
      <main id="main-content" className="sales-page">
        <section className="analytics-hero" aria-labelledby="sales-title">
          <div className="analytics-hero-inner">
            <div className="analytics-hero-lede">
              <div>
                <p className="project-kicker">FIELD SALES / APPLIED AI</p>
                <h1 id="sales-title">Sales throughput improvement.</h1>
              </div>
              <p>Daily outlet recommendations bring leadership priorities, commercial context and sales data into the sales officer’s next conversation.</p>
            </div>
            <SalesHeroMotion />
          </div>
        </section>
        <section className="project-story sales-challenge" aria-labelledby="sales-challenge-title">
          <div className="project-section-inner">
            <div className="project-section-heading">
              <h2 id="sales-challenge-title">A regular pitch can still miss an opportunity.</h2>
              <p>Sales officers bring experience and established routines to each visit. Yet the opportunities they spot depend on individual familiarity and judgement. Bringing leadership wisdom, wider business context and growing operational data into every outlet conversation takes substantial management effort.</p>
            </div>
          </div>
        </section>
        <section className="sales-approach" aria-labelledby="sales-approach-title">
          <div className="project-section-inner">
            <div className="project-section-heading">
              <h2 id="sales-approach-title">Leadership judgement, applied daily.</h2>
              <p>Vyuk built an AI system grounded in leadership priorities, using an editable, expandable and auditable Boxes and Lines of Thought architecture. It analyses outlets each day and recommends additional pitches that surface overlooked opportunities.</p>
            </div>
            <SalesFlowMotion>
              <li>
                <span className="sales-flow-sweep-line" aria-hidden="true" />
                <div className="sales-flow-marker"><Target className="sales-card-icon" size={24} strokeWidth={1.8} aria-hidden="true" /><span>01</span></div>
                <h3>Leadership priorities</h3>
                <p>Commercial judgement defines the opportunities that matter to the business.</p>
              </li>
              <li>
                <span className="sales-flow-sweep-line" aria-hidden="true" />
                <div className="sales-flow-marker"><Store className="sales-card-icon" size={24} strokeWidth={1.8} aria-hidden="true" /><span>02</span></div>
                <h3>Outlet context</h3>
                <p>Operational data and business context shape recommendations for each outlet.</p>
              </li>
              <li>
                <span className="sales-flow-sweep-line" aria-hidden="true" />
                <div className="sales-flow-marker"><MessageCircle className="sales-card-icon" size={24} strokeWidth={1.8} aria-hidden="true" /><span>03</span></div>
                <h3>Additional pitches</h3>
                <p>Short outlet missions complement the sales officer’s regular pitch.</p>
              </li>
            </SalesFlowMotion>
          </div>
        </section>
        <section className="project-evidence" aria-labelledby="sales-evidence-title">
          <div className="project-section-inner">
            <div className="project-section-heading">
              <div>
                <p className="project-kicker">COMPLETED FIELD PILOT</p>
                <h2 id="sales-evidence-title">Tested in live outlet visits.</h2>
              </div>
              <p>A field pilot with two sales officers at a leading consumer goods company tested practical relevance and checked recommendations against recorded outcomes.</p>
            </div>
            <div className="project-metrics">
              <div><div className="sales-metric-value"><strong>220</strong><MapPin className="sales-card-icon" size={26} strokeWidth={1.8} aria-hidden="true" /></div><span>completed outlet visits</span></div>
              <div><div className="sales-metric-value"><strong>26%</strong><ShoppingBag className="sales-card-icon" size={26} strokeWidth={1.8} aria-hidden="true" /></div><span>of completed visits resulted in a sale matching a recommendation</span><p className="sales-metric-detail">58 of 220 visits</p></div>
              <div><div className="sales-metric-value"><strong>9.5%</strong><PackageCheck className="sales-card-icon" size={26} strokeWidth={1.8} aria-hidden="true" /></div><span>of recommendations at completed visits matched a recorded sale</span><p className="sales-metric-detail">73 of 767 recommendations</p></div>
            </div>
            <p className="sales-analysis-scope">Verified analysis: 24 August to 10 September 2026.</p>
            <div className="project-evidence-note sales-evidence-note">
              <span>MEASURING IMPACT</span>
              <p>These figures reflect same-day matches between recommendations and recorded sales. The wider rollout will measure incremental business impact.</p>
            </div>
          </div>
        </section>
        <section className="sales-feedback" aria-labelledby="sales-feedback-title">
          <div className="project-section-inner">
            <div className="project-section-heading">
              <h2 id="sales-feedback-title">What the field teams reported.</h2>
              <p>Feedback highlighted more consistent attention to product opportunities during busy outlet visits.</p>
            </div>
            <div className="sales-feedback-grid">
              <article className="sales-feedback-card">
                <p className="project-kicker">SALES OFFICER FEEDBACK</p>
                <h3>Support for daily lines sold targets.</h3>
                <p>Sales officers said the missions helped them meet daily targets for product lines sold, with greater consistency, focus and product-level diagnosis.</p>
              </article>
              <article className="sales-feedback-card">
                <p className="project-kicker">TERRITORY SALES MANAGER FEEDBACK</p>
                <h3>Fewer repeated misses at outlets.</h3>
                <p>A territory sales manager reported that the system helped avoid repeated misses during outlet visits.</p>
              </article>
            </div>
          </div>
        </section>
        <section className="sales-rollout" aria-labelledby="sales-rollout-title">
          <div className="project-section-inner sales-rollout-inner">
            <div>
              <p className="project-kicker">STATEWIDE DEPLOYMENT UNDERWAY</p>
              <h2 id="sales-rollout-title">From field pilot to wider deployment.</h2>
              <p>The completed pilot is now informing a statewide deployment for 140 sales officers at the same consumer goods company.</p>
            </div>
            <div className="sales-rollout-number"><div className="sales-rollout-value"><strong>140</strong><UsersRound size={32} strokeWidth={1.8} aria-hidden="true" /></div><span>sales officers in the planned deployment</span></div>
          </div>
        </section>
        <ContactSection />
      </main>
    </>
  );
}
