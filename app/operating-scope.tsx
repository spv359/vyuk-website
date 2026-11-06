"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Megaphone, TrendingUp, WalletCards } from "lucide-react";
import { focusAreas } from "./focus-content";
import { SectionScrollCue } from "./section-scroll-cue";

const areaIcons = { sales: TrendingUp, marketing: Megaphone, finance: WalletCards };

export function OperatingScope() {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number;
    switch (event.key) {
      case "ArrowRight": nextIndex = (index + 1) % focusAreas.length; break;
      case "ArrowLeft": nextIndex = (index - 1 + focusAreas.length) % focusAreas.length; break;
      case "Home": nextIndex = 0; break;
      case "End": nextIndex = focusAreas.length - 1; break;
      default: return;
    }
    event.preventDefault();
    setActiveTab(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section className="operating-scope" id="where-vyuk-operates" aria-labelledby="operating-scope-title" tabIndex={-1}>
      <div className="focus-inner">
        <h1 id="operating-scope-title">Areas of Focus</h1>
        <div className="focus-tabs" role="tablist" aria-label="Business areas">
          {focusAreas.map(({ id, name }, index) => {
            const Icon = areaIcons[id];
            return (
              <button
                className="focus-tab" key={id} id={`focus-tab-${id}`}
                ref={(element) => { tabRefs.current[index] = element; }}
                type="button" role="tab" aria-selected={activeTab === index}
                aria-controls={`focus-panel-${id}`} tabIndex={activeTab === index ? 0 : -1}
                onClick={() => setActiveTab(index)} onFocus={() => setActiveTab(index)}
                onKeyDown={(event) => handleTabKey(event, index)}
              >
                <Icon className="focus-tab-icon" size={21} strokeWidth={1.8} aria-hidden="true" />
                {name}
              </button>
            );
          })}
        </div>
        {focusAreas.map(({ id, name, capabilities, image, imageAlt }, index) => (
          <div
            className="focus-panel" key={id} id={`focus-panel-${id}`}
            role="tabpanel" aria-labelledby={`focus-tab-${id}`} tabIndex={0}
            hidden={activeTab !== index}
          >
            <div className="focus-overview">
              <img className="focus-overview-image" src={image} alt={imageAlt} width={1536} height={1024} loading="eager" decoding="async" />
              <ul className="focus-capabilities" role="list" aria-label={`${name} capabilities`}>
                {capabilities.map(({ title }) => (
                  <li key={title}><h2>{title}</h2></li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <SectionScrollCue href="#work" label="Learn more" ariaLabel="Learn more about Vyuk's applied AI use cases" />
      </div>
    </section>
  );
}
