export const metadata = {
  title: "Pricing",
  description: "Current website pricing from NOVA Web Services.",
};

export default function PricingPage() {
  return (
    <main className="pricing-single-page">
      <section className="pricing-single-section section-dark">
        <div className="page-stars" aria-hidden="true" />
        <div className="container pricing-single-grid">
          <div className="pricing-single-copy">
            <span className="eyebrow eyebrow-dark">Website pricing</span>
            <h1>A website built to stand out.</h1>
            <p>
              A modern, responsive business website with original visual direction,
              clear messaging, and a strong foundation for your online presence.
            </p>
          </div>
          <article className="single-price-card" aria-label="99 dollar website design package">
            <div className="single-price-display" aria-label="Originally 199 dollars, now 99 dollars">
              <span className="single-price-old" aria-hidden="true"><sup>$</sup>199</span>
              <span className="single-price-now" aria-hidden="true"><sup>$</sup>99</span>
            </div>
            <ul className="single-price-inclusions" aria-label="Included with the 99 dollar website package">
              <li>Custom website design and build</li>
              <li>Responsive layout for mobile, tablet, and desktop</li>
              <li>Clear page structure and calls to action</li>
              <li>Contact and lead-generation paths</li>
              <li>Performance-minded, search-ready foundation</li>
              <li>Launch guidance and setup support</li>
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}
