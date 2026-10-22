import { Link } from "@tanstack/react-router";
import { Image } from "../image";

export const LOGO = "/generated-assets/9b04f10d403456a5dc17495d1e558b3c412862e34be805faae06e263a2668920.png";

export function Header() {
  return (
    <header className="site-header">
      <nav className="top-links" aria-label="Main">
        <a href="/#contacts">Contacts</a>
        <a href="/#about">About Us</a>
        <a href="/#faqs">FAQs</a>
        <Link to="/size-help">Size help</Link>
      </nav>
      <Link to="/" className="wordmark" aria-label="Primalora home">
        <Image src={LOGO} alt="" width={36} height={36} className="wordmark-mark" />
        <span>Primalora</span>
      </Link>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <span className="rule" />
      <Link to="/" className="footer-mark">Primalora</Link>
      <span className="rule" />
    </footer>
  );
}

export function Arrow() {
  return (
    <svg width="34" height="10" viewBox="0 0 34 10" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M0 5h32M28 1l4 4-4 4" />
    </svg>
  );
}
