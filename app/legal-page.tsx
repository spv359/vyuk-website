import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { BrandHomeLink } from "./brand-home-link";
import { siteDetails } from "./site-details";

export function LegalPage({ title, intro, children }: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header project-header">
        <BrandHomeLink />
        <a className="project-back" href="/"><ArrowLeft size={17} aria-hidden="true" /> Back to home</a>
      </header>
      <main className="legal-page" id="main-content" tabIndex={-1}>
        <div className="legal-inner">
          <div className="legal-heading">
            <h1>{title}</h1>
            <p className="legal-date">Last updated: <time dateTime={siteDetails.policyUpdated}>{siteDetails.policyUpdatedLabel}</time></p>
            <p className="legal-intro">{intro}</p>
          </div>
          <div className="legal-body">{children}</div>
        </div>
      </main>
    </>
  );
}
