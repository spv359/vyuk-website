import type { Metadata } from "next";
import { ArrowDown, ArrowLeft, ChartNoAxesCombined, Mail, Store, Users } from "lucide-react";
import { BrandHomeLink } from "../../brand-home-link";
import { siteDetails } from "../../site-details";
import { DemoForm } from "./demo-form";
import { ProductWalkthrough } from "./product-walkthrough";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Meet vyu — Conversational Analytics | Vyuk",
  description: "Your business analyst, a question away. Explore how vyu turns natural language questions into actionable insights from your operational data.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/work/conversational-analytics" },
};

const benefits = [
  { title: "Leadership", description: "Prioritise where attention and support are needed.", Icon: Users },
  { title: "Sales management", description: "Explore team, territory and product performance.", Icon: ChartNoAxesCombined },
  { title: "Field teams", description: "Investigate outlet context and additional opportunities.", Icon: Store },
];

const implementation = [
  { title: "Problem", description: "The CEO and sales leadership relied on an overstretched MIS team for timely analysis. Ad hoc requests from multiple functions competed with routine reporting." },
  { title: "Solution", description: "Vyuk connected operational and organisational data in a production data warehouse and built vyu on top. Teams can ask questions in natural language and generate tailored insights and reports." },
  { title: "Early impact", description: "Internal teams have started using vyu for analysis and insights. Business impact measurement is underway." },
];

export default function ConversationalAnalytics() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className={styles.header}>
        <div className={`${styles.inner} ${styles.headerInner}`}>
          <BrandHomeLink />
          <nav className={styles.headerLinks} aria-label="Product page navigation">
            <a className={styles.backLink} href="/#work"><ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" /> Applied AI use cases</a>
            <a className={styles.headerAction} href="#request-demo">Request a demo</a>
          </nav>
        </div>
      </header>

      <main id="main-content" className={styles.page}>
        <section className={`${styles.inner} ${styles.hero}`} aria-labelledby="vyu-title">
          <p className={styles.kicker}>Meet vyu · Conversational analytics</p>
          <h1 id="vyu-title">Your business analyst,<br className={styles.heroBreak} /> a question away.</h1>
          <p className={styles.lead}>Talk to your operational data in natural language. Get clear, actionable insights for decisions across your team.</p>
          <a className={styles.primary} href="#request-demo">Request a demo</a>
          <a className={styles.quietLink} href="#vyu-in-action">See vyu in action <ArrowDown size={17} strokeWidth={1.8} aria-hidden="true" /></a>
        </section>

        <section id="vyu-in-action" className={styles.section} aria-labelledby="walkthrough-title">
          <div className={styles.inner}>
            <div className={styles.headingRow}>
              <h2 id="walkthrough-title">A question. An insight.<br /> A clearer next step.</h2>
              <p>Follow one real life sales leadership question example through analysis and a deeper follow-up.</p>
            </div>
            <ProductWalkthrough />
          </div>
        </section>

        <section className={styles.section} aria-labelledby="decisions-title">
          <div className={styles.inner}>
            <h2 id="decisions-title">Context for decisions at every level.</h2>
            <p className={styles.sectionLead}>Bring the conversation closer to the decisions your teams make each day.</p>
            <ul className={styles.benefits}>
              {benefits.map(({ title, description, Icon }) => (
                <li key={title}>
                  <div className={styles.benefitHeading}>
                    <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
                    <h3>{title}</h3>
                  </div>
                  <p>{description}</p>
                </li>
              ))}
            </ul>
            <figure className={styles.outletFigure}>
              <div className={styles.outletIllustration}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/vyu-walkthrough/outlet-scenario.webp" width={1672} height={941} loading="lazy" decoding="async" alt="Before vyu, the outlet owner asks the sales officer: ‘Can you increase the rack rent for my outlet?’ The officer checks separate reports and calls a manager. With vyu, connected data informs a contextual response to the request." />
                <svg className={styles.outletSpeech} viewBox="0 0 1672 941" width={1672} height={941} aria-hidden="true" focusable="false">
                  <path d="M 316 28 H 758 Q 784 28 784 54 V 116 Q 784 142 758 142 H 372 L 245 242 L 316 142 Q 290 142 290 116 V 54 Q 290 28 316 28 Z" fill="#fff9f1" stroke="#f3c58b" strokeWidth={2} />
                  <text x={318} y={74} fill="#252525" fontFamily="Arial, sans-serif" fontSize={30} fontWeight={500}>
                    <tspan x={318}>Can you increase the rack rent</tspan>
                    <tspan x={318} dy={39}>for my outlet?</tspan>
                  </text>
                </svg>
              </div>
              <figcaption>
                <span className={styles.outletMobileQuote}>Outlet owner: “Can you increase the rack rent for my outlet?”</span>
                An illustrative outlet conversation: connected data informs the next decision.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="implementation-title">
          <div className={styles.inner}>
            <p className={styles.kicker}>Customer implementation</p>
            <h2 id="implementation-title" className={styles.caseTitle}>An analyst at your fingertips.</h2>
            <p className={styles.sectionLead}>A leading consumer products company.</p>
            <div className={styles.caseList}>
              {implementation.map(({ title, description }) => (
                <div className={styles.caseRow} key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="request-demo" className={`${styles.section} ${styles.demoSection}`} aria-labelledby="demo-title">
          <div className={`${styles.inner} ${styles.contactGrid}`}>
            <div className={styles.contactIntro}>
              <p className={styles.kicker}>Request a demo</p>
              <h2 id="demo-title" tabIndex={-1}>See vyu work through your questions.</h2>
              <p>Request a demonstration around a question that matters to your business.</p>
              <a className={styles.emailLink} href={`mailto:${siteDetails.email}`}><Mail size={20} strokeWidth={1.8} aria-hidden="true" />{siteDetails.email}</a>
            </div>
            <DemoForm />
          </div>
        </section>
      </main>
    </>
  );
}
