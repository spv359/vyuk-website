import { SectionScrollCue } from "./section-scroll-cue";

export function AboutVyuk() {
  return (
    <section className="about-vyuk" id="about" aria-labelledby="about-title" tabIndex={-1}>
      <div className="about-inner">
        <div className="about-intro">
          <h2 id="about-title">intelligence, in formation</h2>
          <p className="about-origin">Vyuk draws on <em>Vyuh Yukthi</em>, the art of strategic formation, and <em>Vyapar Yukthi</em>, the logic of business.</p>
        </div>
        <div className="about-mission">
          <p className="about-lead">Applied AI should be within reach of every ambitious consumer product company.</p>
        </div>
        <div className="about-story">
          <p className="about-detail">Our team of IIT, IIM and NIT alumni brings decades of business expertise across industries, from Fortune 500 enterprises to startups.</p>
          <p className="about-detail">We’ve seen AI at work in large enterprises. We build that capability around your data, decisions and way of working.</p>
        </div>
        <SectionScrollCue href="#contact" label="say hello" ariaLabel="Continue to contact Vyuk" />
      </div>
    </section>
  );
}
