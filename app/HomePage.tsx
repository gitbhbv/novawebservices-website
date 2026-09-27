"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState, type CSSProperties } from "react";

const packages = [
  {
    name: "Essential",
    price: "$99",
    tagline: "Simple one-page professional website.",
    popular: false,
    features: [
      "Mobile responsive design",
      "Hero and call to action",
      "About and services sections",
      "Contact information",
      "Gallery, testimonials, and FAQ",
      "Basic contact form",
      "Basic SEO",
      "Domain connection",
    ],
  },
  {
    name: "Pro",
    price: "$199",
    tagline: "Complete informational multi-page business website.",
    popular: true,
    features: [
      "Home, About, Services, and Contact pages",
      "Other informational pages as needed",
      "Standard forms",
      "Mobile responsive design",
      "Basic SEO",
      "Launch setup",
    ],
  },
  {
    name: "Ultimate",
    price: "$299",
    tagline: "Complete website plus reasonable standard third-party integrations.",
    popular: false,
    features: [
      "Tally, Jotform, or Typeform",
      "Calendly, Acuity, or Booksy",
      "Square Appointments",
      "Hosted Stripe, Square, or PayPal checkout",
      "CRM and email tools",
      "CMS integrations",
    ],
  },
] as const;

const faqs = [
  {
    q: "How do I know which package I need?",
    a: "You do not need to figure out the technical side yourself. Tell us what you want your website to do and we will confirm the simplest reliable solution and the right package before development begins.",
  },
  {
    q: "Can I upgrade later?",
    a: "Yes. A website can grow with your business. If you later need more pages, integrations, or custom functionality, we can quote the additional work based on what you want to add.",
  },
  {
    q: "What counts as an integration?",
    a: "An integration connects your website to an existing service such as Tally, Calendly, Acuity, Booksy, Square Appointments, a hosted payment service, a CMS, or another established business tool.",
  },
  {
    q: "Do I have to pay NOVA every month?",
    a: "No. Website updates are available on demand when you request them. Routine updates are $9.99, technical updates are $29.99, and new development is quoted separately.",
  },
  {
    q: "Can I update the website myself?",
    a: "Yes. If you prefer to handle routine content changes yourself, ask about a CMS setup.",
  },
];

type LeadState = "idle" | "submitting" | "error";

export default function HomePage() {
  const [selectedPackage, setSelectedPackage] = useState("Not selected");
  const [leadState, setLeadState] = useState<LeadState>("idle");
  const [leadMessage, setLeadMessage] = useState("");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();

    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -5% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const launchWith = (packageName: string) => {
    setSelectedPackage(packageName);
    window.setTimeout(() => {
      document.getElementById("get-started")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 20);
  };

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLeadState("submitting");
    setLeadMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/project-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          selectedPackage,
          startedAt: startedAt.current,
        }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "Please try again.");

      const params = new URLSearchParams({
        name: String(payload.name || ""),
        business: String(payload.business || ""),
        email: String(payload.email || ""),
        package: selectedPackage,
      });
      window.location.href = `https://tally.so/r/QKlRWp?${params.toString()}`;
    } catch (error) {
      setLeadState("error");
      setLeadMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <main className="nova-one-page">
      <section id="home" className="nova-hero nova-dark-section">
        <div className="nova-stars" aria-hidden="true" />
        <div className="nova-orb nova-orb-one" aria-hidden="true" />
        <div className="nova-orb nova-orb-two" aria-hidden="true" />
        <div className="container nova-hero-inner">
          <div className="nova-hero-copy" data-reveal>
            <span className="nova-eyebrow">Web development for small businesses</span>
            <h1>
              A stronger presence.<br />
              <span>Built to move your business forward.</span>
            </h1>
            <p>
              Professional websites built around what your business actually needs, with packages starting at $99.
            </p>
            <div className="nova-hero-actions">
              <a className="nova-btn nova-btn-primary" href="#packages">Explore Packages</a>
              <button className="nova-btn nova-btn-ghost" type="button" onClick={() => launchWith("Not selected")}>Start Your Site</button>
            </div>
          </div>
          <div className="nova-hero-visual" data-reveal style={{ "--reveal-delay": "120ms" } as CSSProperties} aria-hidden="true">
            <div className="nova-browser-shell">
              <div className="nova-browser-bar"><i /><i /><i /><span>novawebservices.net</span></div>
              <div className="nova-browser-screen">
                <div className="nova-browser-star" />
                <strong>NOVA</strong>
                <span>DESIGN · BUILD · SUPPORT</span>
                <b>Professional websites.<br />Made more accessible.</b>
                <div className="nova-browser-lines"><i /><i /><i /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="why-nova" className="nova-light-section nova-why-section">
        <div className="container nova-why-grid">
          <div data-reveal>
            <span className="nova-section-kicker">Why NOVA Web Services</span>
            <h2>A professional online presence should feel within reach.</h2>
          </div>
          <div className="nova-why-copy" data-reveal style={{ "--reveal-delay": "100ms" } as CSSProperties}>
            <p>NOVA Web Services is a web development business geared toward helping small business owners build a more professional, forward-looking presence online.</p>
            <p>We believe a strong website shouldn’t be out of reach. Our goal is to provide a more affordable option without sacrificing quality, design, or functionality.</p>
            <p>Whether you need a simple online presence or something more advanced, we focus on building the solution that makes the most sense for your business.</p>
          </div>
        </div>
      </section>

      <section id="work" className="nova-dark-section nova-work-section">
        <div className="container">
          <div className="nova-section-heading" data-reveal>
            <span className="nova-section-kicker nova-section-kicker-dark">Who We’ve Worked With</span>
            <h2>A look at a business we’ve helped bring online.</h2>
          </div>
          <a
            className="nova-client-card"
            href="https://mariesminksnbeautybar.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Marie's Minks n Beauty Bar website"
            data-reveal
            style={{ "--reveal-delay": "100ms" } as CSSProperties}
          >
            <div className="nova-client-glow" aria-hidden="true" />
            <div className="nova-client-browser" aria-hidden="true">
              <div className="nova-client-browser-bar"><i /><i /><i /><span>mariesminksnbeautybar.com</span></div>
              <div className="nova-client-preview">
                <div className="nova-client-nav"><b>Marie’s Minks &amp; Beauty Bar</b><span>Services&nbsp;&nbsp; About&nbsp;&nbsp; Book</span></div>
                <div className="nova-client-preview-body">
                  <small>BEAUTY · LASHES · EDUCATION</small>
                  <strong>Beauty,<br />with intention.</strong>
                  <div className="nova-client-preview-button">BOOK YOUR APPOINTMENT</div>
                </div>
              </div>
            </div>
            <div className="nova-client-meta">
              <strong>Marie’s Minks n Beauty Bar</strong>
              <span>Beauty services website</span>
            </div>
          </a>
        </div>
      </section>

      <section id="packages" className="nova-light-section nova-packages-section">
        <div className="container">
          <div className="nova-section-heading nova-section-heading-centered" data-reveal>
            <span className="nova-section-kicker">Website Packages</span>
            <h2>Choose a starting point.</h2>
            <p>You don’t need to know the technical answer. We’ll confirm the right package after reviewing what your website actually needs.</p>
          </div>
          <div className="nova-package-grid">
            {packages.map((pkg, index) => (
              <article
                key={pkg.name}
                className={`nova-package-card${pkg.popular ? " is-popular" : ""}`}
                data-reveal
                style={{ "--reveal-delay": `${index * 110}ms` } as CSSProperties}
              >
                {pkg.popular && <span className="nova-popular-pill">Most Popular</span>}
                <div className="nova-package-top">
                  <h3>{pkg.name}</h3>
                  <div className="nova-package-price">{pkg.price}</div>
                  <p>{pkg.tagline}</p>
                </div>
                <span className="nova-includes-label">Can include</span>
                <ul>
                  {pkg.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                <button className="nova-package-button" type="button" onClick={() => launchWith(pkg.name)}>
                  🚀 Launch with {pkg.name}
                </button>
              </article>
            ))}
          </div>
          <div className="nova-classification" data-reveal>
            <div>
              <span className="nova-classification-label">The NOVA standard</span>
              <h3>The simplest reliable solution wins.</h3>
              <p>We do not classify a project as custom just because custom development is possible.</p>
            </div>
            <div className="nova-classification-options">
              <article>
                <span>Usually Ultimate</span>
                <p>An established third-party service owns the logic and data, and NOVA connects it to your site.</p>
              </article>
              <article>
                <span>Usually Super Nova</span>
                <p>NOVA builds or manages the application logic, data, workflow, or backend.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="nova-dark-section nova-supernova-section">
        <div className="nova-supernova-glow" aria-hidden="true" />
        <div className="container nova-supernova-grid">
          <div data-reveal>
            <span className="nova-section-kicker nova-section-kicker-dark">Beyond the standard packages</span>
            <h2>Super Nova</h2>
            <p className="nova-supernova-price">Custom Quote</p>
          </div>
          <div className="nova-supernova-copy" data-reveal style={{ "--reveal-delay": "100ms" } as CSSProperties}>
            <p>For advanced functionality and custom web applications built around your business.</p>
            <div className="nova-supernova-tags">
              <span>Customer accounts</span><span>Login and authentication</span><span>Databases</span><span>Dashboards</span><span>Memberships</span><span>Gated content</span><span>Native booking</span><span>Custom payments and ordering</span><span>API-driven features</span><span>Advanced automation</span><span>File uploads</span><span>Custom backend logic</span><span>Dynamic web applications</span>
            </div>
            <p className="nova-supernova-rule">When NOVA builds and manages the application logic or data, the project usually falls under Super Nova.</p>
            <button className="nova-btn nova-btn-light" type="button" onClick={() => launchWith("Super Nova")}>🚀 Launch with Super Nova</button>
          </div>
        </div>
      </section>

      <section id="maintenance" className="nova-light-section nova-maintenance-section">
        <div className="container">
          <div className="nova-section-heading" data-reveal>
            <span className="nova-section-kicker">On-Demand Website Updates</span>
            <h2>Pay for the update you actually need.</h2>
            <p>Maintenance is available when you request a change or let us know about an issue. Pricing is based on the complexity of the requested work.</p>
          </div>
          <div className="nova-maintenance-grid">
            <article className="nova-maintenance-card" data-reveal>
              <span className="nova-maintenance-level">Routine Update</span>
              <div className="nova-maintenance-price">$9.99</div>
              <p>Simple content and information changes using the website you already have.</p>
              <ul>
                <li>Phone, email, address, hours, text, or pricing</li>
                <li>Services, images, logos, testimonials, or FAQs</li>
                <li>Social, booking, payment, and broken links</li>
                <li>Simple form text or field edits</li>
              </ul>
              <div className="nova-cms-note">Prefer to make routine content updates yourself? Ask about a CMS setup.</div>
            </article>
            <article className="nova-maintenance-card nova-maintenance-card-technical" data-reveal style={{ "--reveal-delay": "110ms" } as CSSProperties}>
              <span className="nova-maintenance-level">Technical Update</span>
              <div className="nova-maintenance-price">$29.99</div>
              <p>Requested changes or fixes that require code, troubleshooting, or technical adjustments.</p>
              <ul>
                <li>Layout, responsive, CSS, or animation changes</li>
                <li>Integration, form, booking, or payment troubleshooting</li>
                <li>Performance and technical SEO</li>
                <li>DNS, domain, SSL, restoration, or code issues</li>
              </ul>
            </article>
            <article className="nova-maintenance-card" data-reveal style={{ "--reveal-delay": "220ms" } as CSSProperties}>
              <span className="nova-maintenance-level">New Development</span>
              <div className="nova-maintenance-price nova-maintenance-custom">Custom Quote</div>
              <p>For requests that materially expand what the website was originally built to do.</p>
              <ul>
                <li>E-commerce, booking systems, or memberships</li>
                <li>Accounts, databases, dashboards, or APIs</li>
                <li>Major redesigns and new business workflows</li>
                <li>Advanced custom functionality</li>
              </ul>
            </article>
          </div>
          <p className="nova-maintenance-rule" data-reveal>Maintenance pricing is based on the most complex part of the request, not the website package originally purchased.</p>
        </div>
      </section>

      <section id="get-started" className="nova-dark-section nova-start-section">
        <div className="nova-stars" aria-hidden="true" />
        <div className="container nova-start-grid">
          <div className="nova-start-copy" data-reveal>
            <span className="nova-section-kicker nova-section-kicker-dark">Start Your Project</span>
            <h2>Tell us who we’re building for.</h2>
            <p>Start with three quick details, then continue to the full project questionnaire.</p>
            {selectedPackage !== "Not selected" && (
              <div className="nova-selected-package">Selected package: <strong>{selectedPackage}</strong></div>
            )}
          </div>
          <form className="nova-lead-form" onSubmit={submitLead} data-reveal style={{ "--reveal-delay": "100ms" } as CSSProperties}>
            <input type="hidden" name="companyWebsite" value="" readOnly />
            <label><span>Name</span><input name="name" type="text" autoComplete="name" required maxLength={80} /></label>
            <label><span>Business Name</span><input name="business" type="text" autoComplete="organization" required maxLength={100} /></label>
            <label><span>Email Address</span><input name="email" type="email" autoComplete="email" required maxLength={160} /></label>
            <button type="submit" disabled={leadState === "submitting"}>{leadState === "submitting" ? "Saving…" : "Save & continue to questionnaire"}<span aria-hidden="true">↗</span></button>
            <p className={`nova-lead-status${leadState === "error" ? " is-error" : ""}`} role={leadState === "error" ? "alert" : "status"}>{leadMessage}</p>
            <small>Your package selection is a preference, not a binding choice. NOVA will confirm the right package after reviewing your questionnaire. By continuing, you agree that NOVA may use these details to respond to your project inquiry. <Link href="/privacy">Privacy Policy</Link></small>
          </form>
        </div>
      </section>

      <section id="faq" className="nova-light-section nova-faq-section">
        <div className="container nova-faq-grid">
          <div data-reveal>
            <span className="nova-section-kicker">FAQ</span>
            <h2>A few things you may want to know.</h2>
          </div>
          <div className="nova-faq-list" data-reveal style={{ "--reveal-delay": "100ms" } as CSSProperties}>
            {faqs.map((item) => (
              <details key={item.q}>
                <summary>{item.q}<span aria-hidden="true">+</span></summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
