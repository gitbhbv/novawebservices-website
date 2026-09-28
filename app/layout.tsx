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
  ["About", "/#why-nova"],
  ["Made by NOVA Web Services", "/#work"],
  ["Packages", "/#packages"],
  ["Maintenance", "/#maintenance"],
  ["FAQ", "/#faq"],
];

function Brand() {
  return (
    <Link className="brand" href="/" aria-label="NOVA Web Services home">
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
        <div className="footer-main">
          <div className="footer-brand-block">
            <Brand />
            <p className="footer-tagline">
              Professional websites for small businesses, made more accessible.
            </p>
          </div>
          <div className="footer-links">
            <nav aria-label="Footer navigation">
              <span>Menu</span>
              <Link href="/">Home</Link>
              <Link href="/#why-nova">About</Link>
              <Link href="/#work">Made by NOVA Web Services</Link>
              <Link href="/#packages">Packages</Link>
              <Link href="/#maintenance">Maintenance</Link>
              <Link href="/#faq">FAQ</Link>
              <Link href="/#get-started">Get Started</Link>
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
