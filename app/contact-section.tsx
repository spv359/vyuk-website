import { Mail } from "lucide-react";
import { ContactMotion } from "./contact-motion";
import { DiscoveryForm } from "./discovery-form";

export function ContactSection() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title" tabIndex={-1}>
      <ContactMotion />
      <div className="contact-inner">
        <div className="contact-intro">
          <h2 id="contact-title">Discuss a use case.</h2>
          <p>Tell us the persistent problem in your business. Choose the short form or email us directly.</p>
          <div className="email-option">
            <a href="mailto:hello@vyukai.in?subject=Discuss%20a%20use%20case">
              <span className="contact-icon email-icon" aria-hidden="true"><Mail size={22} strokeWidth={1.8} /></span>
              <span className="email-address">hello@vyukai.in</span>
            </a>
          </div>
        </div>
        <DiscoveryForm />
      </div>
    </section>
  );
}
