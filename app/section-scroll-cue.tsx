export function SectionScrollCue({ href, label, ariaLabel }: {
  href: string;
  label: string;
  ariaLabel: string;
}) {
  return (
    <div className="section-next-section">
      <a className="section-scroll-cue" href={href} aria-label={ariaLabel}>
        <span>{label}</span>
        <svg width="44" height="26" viewBox="0 0 56 32" fill="none" aria-hidden="true" focusable="false">
          <path d="M6 8 28 24 50 8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}
