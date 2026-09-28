"use client";

/* eslint-disable @next/next/no-img-element */

import { FormEvent, useEffect, useRef, useState, type CSSProperties } from "react";

const packages = [
  {
    name: "Essential",
    emoji: "✨",
    price: "$99",
    tagline: "Simple one-page professional website.",
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
    emoji: "⚡",
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
    emoji: "💎",
    price: "$299",
    tagline: "Complete website plus standard third-party integrations.",
    features: [
      "Tally, Jotform, or Typeform",
      "Calendly, Acuity, or Booksy",
      "Square Appointments",
      "Hosted Stripe, Square, or PayPal checkout",
      "CRM and email tools",
      "CMS integrations",
    ],
  },
  {
    name: "Super Nova",
    emoji: "☄️",
    price: "Custom Quote",
    tagline: "Advanced functionality and custom web applications built around your business.",
    features: [
      "Customer accounts and authentication",
      "Databases and dashboards",
      "Memberships and gated content",
      "Native booking",
      "Custom payment and order systems",
      "API-driven features and advanced automation",
      "File uploads and custom backend logic",
      "Dynamic web applications",
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

function smoothScrollTo(id: string, duration = 1050) {
  const target = document.getElementById(id);
  if (!target) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const start = window.scrollY;
  const end = target.getBoundingClientRect().top + start - 72;
  const distance = end - start;

  if (reduceMotion) {
    window.scrollTo(0, end);
    return;
  }

  const began = performance.now();
  const ease = (progress: number) =>
    progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

  const frame = (now: number) => {
    const progress = Math.min((now - began) / duration, 1);
    window.scrollTo(0, start + distance * ease(progress));
    if (progress < 1) window.requestAnimationFrame(frame);
  };

  window.requestAnimationFrame(frame);
}

export default function HomePage() {
  const [selectedPackage, setSelectedPackage] = useState("Not selected");
  const [leadState, setLeadState] = useState<LeadState>("idle");
  const [leadMessage, setLeadMessage] = useState("");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();

    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const standardNodes = nodes.filter((node) => node.dataset.reveal !== "center");
    const centeredNodes = nodes.filter((node) => node.dataset.reveal === "center");
    const handleAnchorClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href*="#"]');
      if (!link || link.target === "_blank") return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
      const id = decodeURIComponent(url.hash.slice(1));
      if (!document.getElementById(id)) return;
      event.preventDefault();
      history.replaceState(null, "", `#${id}`);
      smoothScrollTo(id);
    };

    document.addEventListener("click", handleAnchorClick);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((node) => node.classList.add("visible"));
      return () => document.removeEventListener("click", handleAnchorClick);
    }

    const revealNode = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => {
      if (!entry.isIntersecting) return;
      (entry.target as HTMLElement).classList.add("visible");
      observer.unobserve(entry.target);
    };

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => revealNode(entry, observer)),
      { threshold: 0.12, rootMargin: "0px 0px -5%" },
    );
    const centeredObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => revealNode(entry, centeredObserver)),
      { threshold: 0.28, rootMargin: "0px 0px -18%" },
    );

    standardNodes.forEach((node) => observer.observe(node));
    centeredNodes.forEach((node) => centeredObserver.observe(node));
    return () => {
      observer.disconnect();
      centeredObserver.disconnect();
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  const launchWith = (packageName: string) => {
    setSelectedPackage(packageName);
    window.setTimeout(() => {
      history.replaceState(null, "", "#get-started");
      smoothScrollTo("get-started");
    }, 20);
  };

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLeadState("submitting");
    setLeadMessage("");
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/project-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, selectedPackage, startedAt: startedAt.current }),
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
    <main>
      <section id="home" className="hero dark">
        <div className="stars" aria-hidden="true" />
        <div className="glow glow-one" aria-hidden="true" />
        <div className="glow glow-two" aria-hidden="true" />
        <div className="container hero-grid">
          <div data-reveal>
            <span className="eyebrow">Web development for small businesses</span>
            <h1>A stronger presence.<br /><em>Built to move your business forward.</em></h1>
            <p className="lede">Professional websites built around what your business actually needs, with packages starting at <span className="price-highlight">$99</span>.</p>
            <div className="actions"><a className="btn primary" href="#packages">Explore Packages</a><a className="btn ghost" href="#get-started">Start Your Site</a></div>
          </div>
        </div>
      </section>

      <section id="why-nova" className="light section-pad">
        <div className="container split">
          <div data-reveal><span className="kicker">Why NOVA Web Services</span><h2>A professional online presence should feel within reach.</h2></div>
          <div className="copy" data-reveal style={{ "--delay": "100ms" } as CSSProperties}>
            <p><span className="inline-brand">NOVA Web Services</span> is a web development business geared toward helping small business owners build a more professional, forward-looking presence online.</p>
            <p>We believe a strong website shouldn’t be out of reach. Our goal is to provide a more affordable option without sacrificing quality, design, or functionality.</p>
            <p>Whether you need a simple online presence or something more advanced, we focus on building the solution that makes the most sense for your business.</p>
          </div>
        </div>
      </section>

      <section id="work" className="dark section-pad work">
        <div className="container">
          <div className="heading" data-reveal><span className="kicker dark-kicker">Who We’ve Worked With</span><h2>A look at a business we’ve helped bring online.</h2></div>
          <a className="client-card" href="https://mariesminksnbeautybar.com" target="_blank" rel="noreferrer" data-reveal style={{ "--delay": "100ms" } as CSSProperties}>
            <div className="client-glow" aria-hidden="true" />
            <div className="client-browser"><img className="client-screenshot" src="/images/maries-website-preview-v2.webp" alt="Screenshot of Marie’s Minks n Beauty Bar website homepage" /></div>
            <div className="client-meta"><strong>Marie’s Minks n Beauty Bar</strong><span>Beauty services website</span></div>
          </a>
        </div>
      </section>

      <section id="packages" className="light section-pad">
        <div className="container">
          <div className="heading centered" data-reveal><span className="kicker">Website Packages</span><h2>Choose a starting point.</h2><p>You don’t need to know the technical answer. We’ll confirm the right package after reviewing what your website actually needs.</p></div>
          <div className="card-grid">
            {packages.map((pkg, index) => (
              <article key={pkg.name} className={`price-card${pkg.popular ? " popular" : ""}${pkg.name === "Super Nova" ? " super-card" : ""}`} data-reveal style={{ "--delay": `${index * 110}ms` } as CSSProperties}>
                {pkg.popular && <span className="popular-pill">Most Popular</span>}
                <h3>{pkg.name} {pkg.emoji}</h3>
                <div className={`price${pkg.name === "Super Nova" ? " custom-price" : ""}`}>{pkg.price}</div>
                <p>{pkg.tagline}</p>
                <small className="includes">Can include</small>
                <ul>{pkg.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                <button type="button" onClick={() => launchWith(pkg.name)}>🚀 Launch with {pkg.name}</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="maintenance" className="light section-pad">
        <div className="container">
          <div className="heading" data-reveal><span className="kicker">On-Demand Website Updates</span><h2>Pay for the update you actually need.</h2><p>Maintenance is available when you request a change or let us know about an issue.</p></div>
          <div className="maintenance-grid">
            <article className="maintenance-card" data-reveal><span className="level">Routine Update</span><div className="maintenance-price">$9.99</div><p>Simple content and information changes using the website you already have.</p><ul><li>Phone, email, address, hours, text, or pricing</li><li>Services, images, logos, testimonials, or FAQs</li><li>Social, booking, payment, and broken links</li><li>Simple form text or field edits</li></ul><div className="cms-note">Prefer to make routine content updates yourself? Ask about a CMS setup.</div></article>
            <article className="maintenance-card technical" data-reveal style={{ "--delay": "110ms" } as CSSProperties}><span className="level">Technical Update</span><div className="maintenance-price">$29.99</div><p>Requested changes or fixes that require code, troubleshooting, or technical adjustments.</p><ul><li>Layout, responsive, CSS, or animation changes</li><li>Integration, form, booking, or payment troubleshooting</li><li>Performance and technical SEO</li><li>DNS, domain, SSL, restoration, or code issues</li></ul></article>
            <article className="maintenance-card" data-reveal style={{ "--delay": "220ms" } as CSSProperties}><span className="level">New Development</span><div className="maintenance-price custom-price">Custom Quote</div><p>For requests that materially change the website.</p><ul><li>E-commerce, booking systems, or memberships</li><li>Accounts, databases, dashboards, or APIs</li><li>Major redesigns and new business workflows</li><li>Advanced custom functionality</li></ul></article>
          </div>
          <p className="maintenance-rule" data-reveal>Maintenance pricing is based on the most complex part of the request, not the website package originally purchased.</p>
        </div>
      </section>

      <section id="faq" className="light section-pad">
        <div className="container split faq-grid">
          <div data-reveal><span className="kicker">FAQ</span><h2>A few things you may want to know.</h2></div>
          <div className="faq-list" data-reveal style={{ "--delay": "100ms" } as CSSProperties}>
            {faqs.map((item) => <details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}
          </div>
        </div>
      </section>

      <section id="get-started" className="dark section-pad start">
        <div className="stars" aria-hidden="true" />
        <div className="container split start-grid">
          <div data-reveal>
            <span className="kicker dark-kicker">Start Your Project</span>
            <h2>Tell us who we’re building for.</h2>
            <p className="start-lede">Start with three quick details, then continue to the full project questionnaire.</p>
            {selectedPackage !== "Not selected" && <div className="selected-package">Selected package: <strong>{selectedPackage}</strong></div>}
          </div>
          <form id="lead-form" className="lead-form" onSubmit={submitLead} data-reveal style={{ "--delay": "100ms" } as CSSProperties}>
            <input type="hidden" name="companyWebsite" value="" readOnly />
            <label>Name<input name="name" autoComplete="name" required maxLength={80} /></label>
            <label>Business Name<input name="business" autoComplete="organization" required maxLength={100} /></label>
            <label>Email Address<input name="email" type="email" autoComplete="email" required maxLength={160} /></label>
            <button type="submit" disabled={leadState === "submitting"}>{leadState === "submitting" ? "Saving…" : "Save & Continue to Questionnaire"} <span aria-hidden="true">↗</span></button>
            {leadMessage && <p className={leadState === "error" ? "is-error" : ""} role={leadState === "error" ? "alert" : "status"}>{leadMessage}</p>}
            <small>Your package selection is a best guess, not a binding choice. NOVA will confirm the right package after reviewing your questionnaire.</small>
          </form>
        </div>
      </section>
    </main>
  );
}
