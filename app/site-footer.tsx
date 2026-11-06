import { ArrowUpRight, Mail } from "lucide-react";
import { BrandHomeLink } from "./brand-home-link";
import { siteDetails } from "./site-details";

const links = [
  { label: "Areas of Focus", href: "/#where-vyuk-operates" },
  { label: "Applied AI use cases", href: "/#work" },
  { label: "Conversational analytics", href: "/work/conversational-analytics" },
  { label: "Field sales intelligence", href: "/work/field-sales-throughput" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  const copyrightYear = year > siteDetails.firstPublicationYear
    ? `${siteDetails.firstPublicationYear}–${year}`
    : String(siteDetails.firstPublicationYear);

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-brand">
            <BrandHomeLink />
            <p>Applied AI for consumer companies.</p>
          </div>
          <nav className="footer-navigation" aria-label="Footer navigation">
            <h2>Explore</h2>
            <ul>
              {links.map(({ label, href }) => <li key={href}><a href={href}>{label}</a></li>)}
            </ul>
          </nav>
          <div className="footer-contact">
            <h2>Say hello</h2>
            <a href={`mailto:${siteDetails.email}`}>
              <Mail size={18} strokeWidth={1.8} aria-hidden="true" />
              <span>{siteDetails.email}</span>
            </a>
            <a href={siteDetails.linkedin}>
              <span>LinkedIn</span><ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="footer-company">
          <p className="footer-company-name">{siteDetails.legalName}</p>
          <dl className="footer-disclosures">
            <div><dt>CIN</dt><dd>{siteDetails.cin}</dd></div>
            <div><dt>Registered office</dt><dd><address>{siteDetails.registeredOffice}</address></dd></div>
          </dl>
        </div>
        <div className="footer-bottom">
          <p>© {copyrightYear} {siteDetails.legalName}. All rights reserved.</p>
          <nav aria-label="Legal information">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Use</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
