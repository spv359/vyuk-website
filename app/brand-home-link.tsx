export function BrandHomeLink() {
  return (
    <a className="wordmark" href="/" aria-label="Vyuk home">
      <svg
        className="wordmark-mark"
        width="36"
        height="36"
        viewBox="0 0 800 800"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="112" cy="120" r="52" />
        <circle cx="688" cy="120" r="52" />
        <circle cx="208" cy="308" r="56" />
        <circle cx="592" cy="308" r="56" />
        <circle cx="304" cy="500" r="60" />
        <circle cx="496" cy="500" r="60" />
        <circle cx="400" cy="688" r="68" fill="#ff5a1f" />
      </svg>
      <span>vyuk</span>
    </a>
  );
}
