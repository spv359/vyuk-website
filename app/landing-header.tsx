"use client";

import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandHomeLink } from "./brand-home-link";

const sections = [
  { label: "Focus", href: "#where-vyuk-operates" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function LandingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header
        className="site-header site-header--landing"
        id="top"
        onKeyDown={(event) => {
          if (event.key === "Escape" && menuOpen) {
            setMenuOpen(false);
            menuButton.current?.focus();
          }
        }}
      >
        <BrandHomeLink />
        <button
          ref={menuButton}
          className="site-menu-toggle"
          type="button"
          aria-controls="site-sections"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          <span>{menuOpen ? "Close menu" : "Menu"}</span>
        </button>
        <nav className="site-nav" id="site-sections" aria-label="Page sections" data-open={menuOpen}>
          {sections.map(({ label, href }) => (
            <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
      </header>
    </>
  );
}
