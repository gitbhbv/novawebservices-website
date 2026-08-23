"use client";

/* The carousel uses pre-compressed static WebP assets inside fixed-size mockups. */
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useRef, useState } from "react";
import { Arrow } from "./shared";

const sampleSites = [
  { id: "auto", name: "Blackline Auto Spa", label: "Bold auto-detailing concept" },
  { id: "barber", name: "Heritage Cut Co.", label: "Modern-classic barbershop concept" },
  { id: "beauty", name: "Vela Beauty Studio", label: "Soft luxury beauty concept" },
  { id: "coffee", name: "Ember & Oak", label: "Editorial coffee-shop concept" },
  { id: "home", name: "Northline Home Co.", label: "Architectural renovation concept" },
] as const;

type SampleSiteId = (typeof sampleSites)[number]["id"];

function SampleWebsite({ id }: { id: SampleSiteId }) {
  if (id === "auto") {
    return (
      <div className="concept-site concept-auto">
        <header className="auto-site-header">
          <strong>BLACKLINE</strong>
          <nav aria-label="Blackline sample navigation">
            <span>Packages</span><span>Results</span><span>Studio</span>
          </nav>
          <span>Book a detail ↗</span>
        </header>
        <div className="auto-site-body">
          <aside className="auto-site-rail">
            <b>01</b><small>Premium auto care</small><span>FL</span>
          </aside>
          <div className="auto-site-copy">
            <small>Paint correction · ceramic protection</small>
            <h2>Detail<br /><em>without</em><br />compromise.</h2>
            <p>Obsessive workmanship and long-lasting protection for vehicles worth noticing.</p>
            <span>Explore packages <b>→</b></span>
          </div>
          <figure className="auto-site-photo">
            <img
              src="/images/nova-sample-auto-detailing.webp"
              alt="Black performance car being polished in a professional detailing bay"
              width="1600"
              height="900"
              loading="eager"
              decoding="async"
            />
            <figcaption><span>Mirror finish</span><small>Professional protection</small></figcaption>
          </figure>
        </div>
        <footer className="auto-site-footer">
          <span>Paint correction</span><span>Ceramic coating</span><span>Interior renewal</span>
        </footer>
      </div>
    );
  }

  if (id === "barber") {
    return (
      <div className="concept-site concept-barber">
        <header className="barber-site-header">
          <span>Est. 2014</span>
          <strong>HERITAGE / CUT CO.</strong>
          <span>Ocala, Florida</span>
        </header>
        <div className="barber-site-body">
          <div className="barber-site-poster">
            <small>The neighborhood barbershop</small>
            <h2>Good cuts.<br /><em>Good company.</em></h2>
            <div className="barber-service-list">
              <span><b>Classic cut</b><small>$35</small></span>
              <span><b>Cut + beard</b><small>$48</small></span>
            </div>
            <span className="barber-site-cta">Book a chair →</span>
          </div>
          <figure className="barber-site-photo">
            <img
              src="/images/nova-sample-barbershop.webp"
              alt="Warm modern-classic neighborhood barbershop interior"
              width="1600"
              height="900"
              loading="eager"
              decoding="async"
            />
            <figcaption><span>Walk-ins welcome</span><b>Tue to Sat</b></figcaption>
          </figure>
          <div className="barber-site-seal"><b>HC</b><small>Local craft</small></div>
        </div>
        <footer className="barber-site-footer">
          <span>Services</span><span>Our barbers</span><span>The shop</span><b>Book online ↗</b>
        </footer>
      </div>
    );
  }

  if (id === "beauty") {
    return (
      <div className="concept-site concept-beauty">
        <header className="beauty-site-header">
          <strong>vela</strong>
          <nav aria-label="Vela sample navigation"><span>Treatments</span><span>About</span><span>Journal</span></nav>
          <span>Book an appointment</span>
        </header>
        <div className="beauty-site-body">
          <img
            src="/images/nova-sample-beauty-studio.webp"
            alt="Elegant blush and ivory beauty treatment studio"
            width="1600"
            height="900"
            loading="eager"
            decoding="async"
          />
          <div className="beauty-site-copy">
            <small>Welcome to your softer era</small>
            <h2>Beauty,<br /><em>beautifully</em><br />personal.</h2>
            <p>Thoughtful lash and brow treatments designed around your features, not a trend.</p>
            <span>Discover treatments ↗</span>
          </div>
          <aside className="beauty-booking-card">
            <small>Next available</small>
            <b>Thursday · 2:30 PM</b>
            <span>Lash lift + tint</span>
            <i>Reserve this time</i>
          </aside>
          <div className="beauty-treatment-pills"><span>Lashes</span><span>Brows</span><span>Skin</span></div>
        </div>
      </div>
    );
  }

  if (id === "coffee") {
    return (
      <div className="concept-site concept-coffee">
        <img
          className="coffee-site-photo"
          src="/images/nova-sample-coffee-business-v2.webp"
          alt="Warm independent coffee shop interior"
          width="1536"
          height="1024"
          loading="eager"
          decoding="async"
        />
        <header className="coffee-site-header">
          <strong>EMBER<br />&amp; OAK</strong>
          <nav aria-label="Ember and Oak sample navigation"><span>Our story</span><span>Menu</span><span>Visit</span></nav>
          <span>Open 7 AM to 6 PM daily</span>
        </header>
        <div className="coffee-site-title">
          <small>Independent coffee · thoughtfully made</small>
          <h2>A place<br /><em>worth</em><br />slowing down for.</h2>
        </div>
        <aside className="coffee-feature-card">
          <small>Today&apos;s pour</small>
          <b>Ethiopia · Guji</b>
          <p>Peach, bergamot, and honey with a clean finish.</p>
          <span>View the menu ↗</span>
        </aside>
        <footer className="coffee-site-footer"><span>Roasted with care</span><span>Made for the neighborhood</span></footer>
      </div>
    );
  }

  return (
    <div className="concept-site concept-home">
      <header className="home-site-header">
        <strong>NORTHLINE<span>HOME CO.</span></strong>
        <nav aria-label="Northline sample navigation"><span>Projects</span><span>Services</span><span>Studio</span></nav>
        <span>Start a project ↗</span>
      </header>
      <div className="home-site-body">
        <div className="home-site-copy">
          <small>Residential renovation · Ocala, FL</small>
          <h2>Well made.<br />Made for living.</h2>
          <p>Quietly beautiful renovations, built with clear communication and lasting craft.</p>
          <span>View our projects →</span>
          <div><b>12+</b><small>Years of craft</small><b>86</b><small>Homes renewed</small></div>
        </div>
        <figure className="home-site-photo">
          <img
            src="/images/nova-sample-home-renovation.webp"
            alt="Craftsperson measuring warm oak cabinetry in a bright modern kitchen"
            width="1600"
            height="900"
            loading="eager"
            decoding="async"
          />
          <figcaption><span>Oak Kitchen</span><small>Residential · 2026</small></figcaption>
        </figure>
        <aside className="home-site-index">
          <small>Project 04</small>
          <b>Warm oak<br />kitchen</b>
          <span>Material-led design</span>
          <span>Custom cabinetry</span>
          <span>Built to last</span>
        </aside>
      </div>
    </div>
  );
}

export function OpeningSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const activeSlideRef = useRef(0);
  const [activeSlide, setActiveSlide] = useState(0);

  const syncActiveSlide = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const slides = Array.from(
      carousel.querySelectorAll<HTMLElement>("[data-showcase-slide]"),
    );
    if (!slides.length) return;

    const viewportCenter = carousel.scrollLeft + carousel.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(slideCenter - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeSlideRef.current) {
      activeSlideRef.current = closestIndex;
      setActiveSlide(closestIndex);
    }
  };

  const handleCarouselScroll = () => {
    if (scrollFrameRef.current !== null) return;

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      scrollFrameRef.current = null;
      syncActiveSlide();
    });
  };

  const moveCarousel = (direction: -1 | 1) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const slides = Array.from(
      carousel.querySelectorAll<HTMLElement>("[data-showcase-slide]"),
    );
    if (!slides.length) return;

    const viewportCenter = carousel.scrollLeft + carousel.clientWidth / 2;
    let currentIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(slideCenter - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        currentIndex = index;
      }
    });

    const nextIndex = (currentIndex + direction + slides.length) % slides.length;
    const target = slides[nextIndex];
    const targetLeft = target.offsetLeft - (carousel.clientWidth - target.offsetWidth) / 2;

    carousel.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
  };

  return (
    <section id="opening" className="editorial-hero section-dark">
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="container editorial-hero-inner">
        <div className="hero-kicker-row">
          <span>Web design for local &amp; growing businesses</span>
          <span className="hero-kicker-right">Design · Build · Support</span>
        </div>

        <h1>
          <span>Websites built</span>
          <span>for business.</span>
          <span className="hero-purple">Designed to stand out.</span>
        </h1>

        <div className="hero-lower">
          <p>
            We create modern, responsive websites that help
            businesses look credible, communicate clearly, and turn visits into next steps...like this one!
          </p>
          <div className="hero-actions">
            <Link className="button button-primary button-large hero-get-started" href="/pricing">
              Get Started <Arrow />
            </Link>
          </div>
        </div>
      </div>

      <div className="portfolio-stage" aria-label="Sample website design carousel">
        <div className="portfolio-label">
          <div className="portfolio-label-copy">
            <span>Sample business websites</span>
            <small>Original demonstration concepts · not client work</small>
          </div>
          <div className="showcase-controls">
            <span>Swipe or use arrows</span>
            <button type="button" onClick={() => moveCarousel(-1)} aria-label="Previous sample website">
              ←
            </button>
            <button type="button" onClick={() => moveCarousel(1)} aria-label="Next sample website">
              →
            </button>
          </div>
        </div>
        <div className="portfolio-track">
          <div
            ref={carouselRef}
            className="showcase-carousel"
            tabIndex={0}
            aria-label="Five sample websites for different types of businesses"
            onScroll={handleCarouselScroll}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                moveCarousel(-1);
              }
              if (event.key === "ArrowRight") {
                event.preventDefault();
                moveCarousel(1);
              }
            }}
          >
            {sampleSites.map((site, index) => (
              <article
                key={site.id}
                className={`showcase-slide ${
                  index === activeSlide
                    ? "is-current"
                    : index < activeSlide
                      ? "is-before"
                      : "is-after"
                }`}
                data-showcase-slide
                aria-label={`${site.name}: ${site.label}`}
                aria-current={index === activeSlide ? "true" : undefined}
              >
                <div className="showcase-card-face">
                  <SampleWebsite id={site.id} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-feature-strip" aria-label="NOVA Web Services priorities">
        <article><div><strong>Custom design</strong><small>Built for your business</small></div></article>
        <article><div><strong>Mobile-friendly</strong><small>Polished on every screen</small></div></article>
        <article><div><strong>Business-ready</strong><small>Useful tools connected</small></div></article>
        <article><div><strong>Made to grow</strong><small>Support beyond launch</small></div></article>
      </div>
    </section>
  );
}
