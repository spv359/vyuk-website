import type { Metadata } from "next";
import { LegalPage } from "../legal-page";
import { siteDetails } from "../site-details";

export const metadata: Metadata = {
  title: "Privacy Policy | Vyuk",
  description: "How Vyuk handles website enquiries, hosting information and privacy requests.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" intro={`This policy explains how ${siteDetails.legalName} (Vyuk) handles information collected through this website and direct business enquiries.`}>
      <section className="legal-summary" aria-labelledby="privacy-summary">
        <h2 id="privacy-summary">In brief</h2>
        <ul>
          <li>We use the details you share to understand and respond to your enquiry.</li>
          <li>Our retention period for website enquiries is {siteDetails.enquiryRetentionMonths} months from submission.</li>
          <li>You can contact <a href={`mailto:${siteDetails.email}`}>{siteDetails.email}</a> about your information.</li>
        </ul>
      </section>
      <section aria-labelledby="privacy-information">
        <h2 id="privacy-information">Information you provide</h2>
        <p>The contact form collects your name, work email, company name and the description of the use case you are considering. We also record when the enquiry was submitted. If you email us, we receive your email address and the contents of your message.</p>
      </section>
      <section aria-labelledby="privacy-use">
        <h2 id="privacy-use">How we use your information</h2>
        <p>We use enquiry details to assess your request, respond to you and manage the resulting business discussion. Submitting this form does not subscribe you to a mailing list.</p>
        <p>Information may also be used where necessary to maintain website security, resolve a dispute or meet an applicable legal obligation.</p>
      </section>
      <section aria-labelledby="privacy-providers">
        <h2 id="privacy-providers">Hosting, cookies and service providers</h2>
        <p>This website is hosted using ChatGPT Sites, with application hosting and enquiry storage on Cloudflare infrastructure. Hosting, sign-in and email providers may process information needed to deliver their services, including technical information such as IP addresses, browser details and access logs.</p>
        <p>Vyuk has not added advertising pixels or optional analytics trackers to these pages. Hosting and sign-in services may use cookies or similar technologies under their own policies. Any additional tracking introduced by Vyuk will be explained here, with consent controls where required.</p>
        <p>These providers may process information outside your country. Their privacy notices explain their own practices: <a href="https://openai.com/policies/privacy-policy/">OpenAI Privacy Policy</a> and <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare Privacy Policy</a>. Email is also handled by the providers used by you and Vyuk.</p>
      </section>
      <section aria-labelledby="privacy-retention">
        <h2 id="privacy-retention">Retention and your requests</h2>
        <p>Our policy is to retain website enquiry records for {siteDetails.enquiryRetentionMonths} months from submission. Records that become part of an ongoing client relationship are handled separately under the relevant agreements and applicable legal requirements.</p>
        <p>To request access, correction or deletion, or to raise a privacy concern, email <a href={`mailto:${siteDetails.email}`}>{siteDetails.email}</a>. We may need information to verify your request. Any information that must be retained under applicable law will remain subject to those requirements.</p>
      </section>
      <section aria-labelledby="privacy-client-data">
        <h2 id="privacy-client-data">Client data and AI products</h2>
        <p>This policy covers website enquiries. Processing of operational data within a client project or AI product is governed by the relevant client agreement and data-processing terms.</p>
      </section>
      <section aria-labelledby="privacy-changes">
        <h2 id="privacy-changes">Updates and contact</h2>
        <p>We will update this page when our website data practices change. The date at the top identifies the latest version. Contact <a href={`mailto:${siteDetails.email}`}>{siteDetails.email}</a> with any questions. Our registered company details appear in the footer.</p>
      </section>
    </LegalPage>
  );
}
