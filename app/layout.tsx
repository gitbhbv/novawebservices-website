import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import MobileMenuBehavior from "./MobileMenuBehavior";
import "./globals.css";
import "./nova-one-page.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NOVA Web Services",
    template: "%s | NOVA Web Services",
  },
  description:
    "Affordable, professional websites for small businesses, with custom design, business integrations, and on-demand website updates.",
  other: {
    "codex-preview": "development",
  },
};

const navItems = [
  ["Why NOVA", "/#why-nova"],
  ["Work", "/#work"],
  ["Packages", "/#packages"],
  ["Maintenance", "/#maintenance"],
  ["FAQ", "/#faq"],
];

function Brand() {
  return (
    <Link className="brand" href="/" aria-label="NOVA Web Services home">
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-neutron-star" />
      </span>
      <span className="brand-name">NOVA Web Services</span>
    </Link>
  );
}

function SiteHeader() {
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Brand />

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>

        <Link className="header-quote desktop-quote" href="/#get-started">
          Get Started <span aria-hidden="true">↗</span>
        </Link>

        <details className="mobile-menu">
          <summary aria-label="Open navigation menu">
            <span />
            <span />
          </summary>
          <nav aria-label="Mobile navigation">
            {navItems.map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
            <Link href="/#get-started">Get Started</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-top">
          <div>
            <h2>Let&apos;s make your business look as good online as it does in real life.</h2>
          </div>
          <Link className="footer-cta" href="/#get-started" aria-label="Start a Project">
            <strong>Start a Project</strong>
            <b aria-hidden="true">↗</b>
          </Link>
        </div>

        <div className="footer-main">
          <div className="footer-brand-block">
            <Brand />
            <p className="footer-tagline">
              Professional websites for small businesses, made more accessible.
            </p>
          </div>
          <div className="footer-links">
            <nav aria-label="Footer navigation">
              <span>Explore</span>
              <Link href="/#why-nova">Why NOVA</Link>
              <Link href="/#work">Work</Link>
              <Link href="/#packages">Packages</Link>
              <Link href="/#maintenance">Maintenance</Link>
              <Link href="/#get-started">Start a Project</Link>
            </nav>
            <nav aria-label="Legal navigation">
              <span>Legal</span>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 NOVA Web Services. Operated by Michael Bellony.</p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SiteHeader />
        <MobileMenuBehavior />
        <div className="site-content-and-footer">
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
