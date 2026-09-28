import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import "./nova-one-page.css";

export const metadata: Metadata = {
  title: {
    default: "NOVA Web Services",
    template: "%s | NOVA Web Services",
  },
  description:
    "Affordable, professional websites for small businesses, with custom design, business integrations, and on-demand website updates.",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "512x512" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
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

function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/#home"><span>NOVA Web Services</span></Link>
      <nav aria-label="Primary navigation">
        {navItems.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
      </nav>
      <details className="mobile-nav">
        <summary>Menu</summary>
        <nav aria-label="Mobile navigation">
          {navItems.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          <Link href="/#get-started">Get Started</Link>
        </nav>
      </details>
      <Link className="header-cta" href="/#get-started">Get Started</Link>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer>
      <div className="container footer-main">
        <div className="footer-brand-block"><strong>NOVA Web Services</strong><p>Professional websites for small businesses, made more accessible.</p></div>
        <div className="footer-links">
          <nav aria-label="Footer menu"><span>Menu</span><Link href="/#home">Home</Link><Link href="/#why-nova">About</Link><Link href="/#work">Made by NOVA Web Services</Link><Link href="/#packages">Packages</Link><Link href="/#maintenance">Maintenance</Link><Link href="/#faq">FAQ</Link><Link href="/#get-started">Get Started</Link></nav>
          <nav aria-label="Legal menu"><span>Legal</span><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms of Service</Link></nav>
        </div>
      </div>
      <div className="container footer-bottom"><span>© 2026 NOVA Web Services. Operated by Michael Bellony.</span></div>
    </footer>
  );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
