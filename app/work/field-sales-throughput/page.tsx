import type { Metadata } from "next";
import { ArrowDown, ArrowLeft, ListChecks, Mail, Plus, SquarePen } from "lucide-react";
import { BrandHomeLink } from "../../brand-home-link";
import { siteDetails } from "../../site-details";
import { FieldDemoForm } from "./demo-form";
import { FieldWalkthrough } from "./product-walkthrough";
import shared from "../conversational-analytics/page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Field Sales Intelligence | Vyuk",
  description: "Capture leadership intelligence and business context, then apply them through daily outlet recommendations that help sales officers uncover missed opportunities.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/work/field-sales-throughput" },
};

const architectureBenefits = [
  { title: "Editable", description: "Refine the reasoning with your leadership as priorities change.", Icon: SquarePen },
  { title: "Expandable", description: "Add new priorities and opportunities as your business evolves.", Icon: Plus },
  { title: "Auditable", description: "Review the reasoning behind an outlet recommendation.", Icon: ListChecks },
];

const implementation = [
  { title: "Problem", description: "Regular pitches reflected each sales officer’s experience and routines. Applying leadership judgement, wider business context and growing operational data during outlet visits required substantial management effort." },
  { title: "Solution", description: <>Vyuk worked with leadership to capture priorities in a Boxes and Lines of Thought architecture, implementing <strong>6 boxes</strong> and <strong>13 leadership-approved Lines of Thought</strong>. The AI system applies them to every outlet daily, generating additional pitches grounded in each outlet’s context.</> },
  { title: "Early impact", description: "The field pilot is complete. Sales officers and territory managers reported more consistent attention to opportunities. A statewide rollout for 140 sales officers is underway." },
];

export default function FieldSalesIntelligence() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className={shared.header}>
        <div className={`${shared.inner} ${shared.headerInner}`}>
          <BrandHomeLink />
          <nav className={shared.headerLinks} aria-label="Product page navigation">
            <a className={shared.backLink} href="/#work"><ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" /> Applied AI use cases</a>
            <a className={shared.headerAction} href="#request-demo">Request a demo</a>
          </nav>
        </div>
      </header>

      <main id="main-content" className={shared.page}>
        <section className={`${shared.inner} ${shared.hero}`} aria-labelledby="field-title">
          <p className={shared.kicker}>Field sales intelligence</p>
          <h1 id="field-title">Leadership judgement,<br className={shared.heroBreak} /> at every outlet.</h1>
          <p className={shared.lead}>Turn leadership intelligence and business context into daily recommendations that help sales officers uncover valuable missed opportunities.</p>
          <a className={shared.primary} href="#request-demo">Request a demo</a>
          <a className={shared.quietLink} href="#field-in-action">See how it works <ArrowDown size={17} strokeWidth={1.8} aria-hidden="true" /></a>
        </section>

        <section id="field-in-action" className={shared.section} aria-labelledby="walkthrough-title">
          <div className={shared.inner}>
            <div className={shared.headingRow}>
              <h2 id="walkthrough-title">From leadership context<br /> to the next pitch.</h2>
              <p>An implemented example of the flow.</p>
            </div>
            <FieldWalkthrough />
          </div>
        </section>

        <section className={shared.section} aria-labelledby="field-conversation-title">
          <div className={shared.inner}>
            <h2 id="field-conversation-title">As if your VP of Sales is joining every outlet visit.</h2>
            <p className={`${shared.sectionLead} ${styles.conversationIntro}`}>Your sales officers bring experience. The recommendations add leadership context and fresh outlet intelligence, helping them surface opportunities alongside their regular pitch.</p>
            <figure className={`${shared.outletFigure} ${styles.conversationFigure}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/focus-sales-overview-v1.webp" width={1536} height={1024} loading="lazy" decoding="async" alt="An illustrative sales officer and outlet owner discussing an opportunity, with business data, outlet context and product information connected around the conversation." />
              <figcaption>An illustrative view of leadership intelligence reaching the outlet conversation.</figcaption>
            </figure>
          </div>
        </section>

        <section className={shared.section} aria-labelledby="architecture-title">
          <div className={shared.inner}>
            <p className={shared.kicker}>Boxes and Lines of Thought</p>
            <h2 id="architecture-title">A framework shaped with your leadership.</h2>
            <p className={`${shared.sectionLead} ${styles.architectureIntro}`}>Vyuk captures how your leadership reads business signals, identifies opportunities and decides what action matters.</p>
            <div className={shared.caseList}>
              <div className={shared.caseRow}>
                <h3>Boxes</h3>
                <p>The business areas from which opportunities emerge, such as product opportunities or outlet recovery.</p>
              </div>
              <div className={shared.caseRow}>
                <h3>Lines of Thought</h3>
                <p>The documented reasoning within each Box that connects business context to a relevant field action.</p>
              </div>
            </div>
            <ul className={shared.benefits}>
              {architectureBenefits.map(({ title, description, Icon }) => (
                <li key={title}>
                  <div className={shared.benefitHeading}><Icon size={18} strokeWidth={1.8} aria-hidden="true" /><h3>{title}</h3></div>
                  <p>{description}</p>
                </li>
              ))}
            </ul>
            <p className={styles.managedFramework}>Vyuk works with your leadership to develop, review and update this reasoning.</p>
          </div>
        </section>

        <section className={shared.section} aria-labelledby="implementation-title">
          <div className={shared.inner}>
            <p className={shared.kicker}>Customer implementation</p>
            <h2 id="implementation-title">Tested in live outlet visits.</h2>
            <p className={shared.sectionLead}>A completed field pilot with two sales officers at a leading consumer goods company.</p>
            <div className={shared.caseList}>
              {implementation.map(({ title, description }) => (
                <div className={shared.caseRow} key={title}><h3>{title}</h3><p>{description}</p></div>
              ))}
            </div>

            <div className={styles.pilotEvidence} aria-labelledby="pilot-results-title">
              <h3 id="pilot-results-title">What the pilot recorded.</h3>
              <div className={styles.primaryMetric}>
                <strong>26<span>%</span></strong>
                <div><p>of completed visits included a sale matching a recommendation.</p><span>58 of 220 completed outlet visits</span></div>
              </div>
              <p className={styles.secondaryMetric}><strong>73 of 767 recommendations (9.5%)</strong> at completed visits matched a recorded sale.</p>
              <p className={styles.analysisScope}>Verified analysis: 24 August to 10 September 2026.</p>
              <p className={styles.evidenceContext}>These figures compare recommendations with same-day recorded sales. The wider rollout will measure incremental business impact.</p>
            </div>

            <div className={styles.fieldFeedback}>
              <h3>What the field teams reported.</h3>
              <dl>
                <div><dt>Sales officers</dt><dd>Support for daily product-line targets, with more consistent attention to product opportunities.</dd></div>
                <div><dt>Territory manager</dt><dd>Help avoiding repeated misses during outlet visits.</dd></div>
              </dl>
            </div>
            <p className={styles.rolloutStatus}><span className={styles.statusDot} aria-hidden="true" /><span>Statewide rollout for <strong>140 sales officers</strong> is underway.</span></p>
          </div>
        </section>

        <section id="request-demo" className={`${shared.section} ${shared.demoSection}`} aria-labelledby="demo-title">
          <div className={`${shared.inner} ${shared.contactGrid}`}>
            <div className={shared.contactIntro}>
              <p className={shared.kicker}>Request a demo</p>
              <h2 id="demo-title" tabIndex={-1}>See field sales intelligence in action.</h2>
              <p>Explore how your leadership’s priorities could become recommendations for your sales team’s outlet visits.</p>
              <a className={shared.emailLink} href={`mailto:${siteDetails.email}`}><Mail size={20} strokeWidth={1.8} aria-hidden="true" />{siteDetails.email}</a>
            </div>
            <FieldDemoForm />
          </div>
        </section>
      </main>
    </>
  );
}
