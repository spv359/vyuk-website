import type { Metadata } from "next";
import { LegalPage } from "../legal-page";
import { siteDetails } from "../site-details";

export const metadata: Metadata = {
  title: "Terms of Use | Vyuk",
  description: "Terms for using the Vyuk website, sharing its content and making business enquiries.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" intro={`These terms explain the use of this website, operated by ${siteDetails.legalName} (Vyuk).`}>
      <section className="legal-summary" aria-labelledby="terms-summary">
        <h2 id="terms-summary">In brief</h2>
        <ul>
          <li>You are welcome to explore the website and share links to its pages.</li>
          <li>Content and branding remain subject to the rights of their respective owners.</li>
          <li>Client services and commitments are agreed separately in writing.</li>
        </ul>
      </section>
      <section aria-labelledby="terms-purpose">
        <h2 id="terms-purpose">Website information and business enquiries</h2>
        <p>This website introduces Vyuk’s capabilities and work. Sending an enquiry starts a conversation; it does not create a contract for services. Scope, pricing, delivery and other client commitments are established in separate written agreements.</p>
        <p>We aim to keep website information accurate and current. Content, capabilities and availability may change over time.</p>
      </section>
      <section aria-labelledby="terms-content">
        <h2 id="terms-content">Content and intellectual property</h2>
        <p>Website text, branding, images and other materials belong to Vyuk or their respective rights holders. You may share links and brief attributed excerpts. Reproduction or commercial use of substantial content requires permission unless applicable law permits it.</p>
      </section>
      <section aria-labelledby="terms-use">
        <h2 id="terms-use">Responsible use</h2>
        <p>Use the website lawfully. Do not submit misleading enquiries, attempt unauthorised access, interfere with the website or use it to harm others.</p>
      </section>
      <section aria-labelledby="terms-links">
        <h2 id="terms-links">External links and privacy</h2>
        <p>Linked third-party websites operate under their own terms and privacy practices. Information you submit to Vyuk through this website is described in our <a href="/privacy">Privacy Policy</a>.</p>
      </section>
      <section aria-labelledby="terms-contact">
        <h2 id="terms-contact">Updates and contact</h2>
        <p>We may update these terms as the website changes. The date at the top identifies the latest version. For questions or permission to use content, email <a href={`mailto:${siteDetails.email}`}>{siteDetails.email}</a>.</p>
      </section>
    </LegalPage>
  );
}
