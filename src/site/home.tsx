import { Link } from "@tanstack/react-router";
import { Image } from "../image";
import { Arrow, Footer, Header } from "./chrome";

export const PHOTO = {
  model: "/generated-assets/aaeb8e1363e2859a4ace5c4fbecfae488dcfdf39dca9d26760ebaa9663158b77.webp",
  noir: "/generated-assets/90ec59a7f8a7bb2845a5b1ac31b835f224ea6f023eeb1da761eb58e9a851703f.webp",
  cluster: "/generated-assets/8bd64f6fb50ba71030d23b9d50bd56e53defbe22c041d1365d3eb99b222e693e.webp",
  pearl: "/generated-assets/ba99222b817e3568030ff5cbe707afe7f1a3eeb9c82915c35bb6aadab2d286bb.webp",
};

export function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Fine jewelry</p>
            <h1>Primalora</h1>
            <span className="bar" />
            <p className="hero-line">Quiet light, worn close.</p>
            <Link to="/shop" className="shop-button">Shop now</Link>
          </div>
          <figure className="hero-photo">
            <Image src={PHOTO.model} alt="Woman wearing a pearl drop earring and a pearl ring" width={1001} height={1001} priority sizes="(max-width: 900px) 100vw, 55vw" />
          </figure>
        </section>

        <section className="block gallery" aria-labelledby="gallery-h">
          <div className="text">
            <h2 id="gallery-h">Editorial Gallery</h2>
            <span className="bar" />
            <p>A closer look at the moments that define our world — where light, texture and form become art.</p>
          </div>
          <div className="gallery-grid">
            <figure className="plate tall"><Image src={PHOTO.pearl} alt="Pearl pendant and matching drop earrings on cream" width={800} height={800} /></figure>
            <figure className="plate"><Image src={PHOTO.noir} alt="Dark-stone halo pendant on blue" width={800} height={800} /></figure>
            <figure className="plate"><Image src={PHOTO.cluster} alt="Cluster necklace of bright stones on blue" width={800} height={800} /></figure>
          </div>
        </section>

        <section className="feature craft" aria-labelledby="craft-h">
          <figure className="plate"><Image src={PHOTO.model} alt="Pearl earring and ring worn together" width={1001} height={1001} /></figure>
          <div className="text">
            <h2 id="craft-h">Craftsmanship &amp; Design</h2>
            <span className="bar" />
            <p>Thoughtful materials. Refined details. Every piece is shaped by a commitment to timeless craftsmanship and enduring beauty.</p>
          </div>
        </section>

        <section className="block collection" aria-labelledby="coll-h">
          <div className="text">
            <h2 id="coll-h">Collection Preview</h2>
            <span className="bar" />
            <p>A curated selection of pieces, crafted for your everyday and your extraordinary moments.</p>
          </div>
          <div className="collection-frame">
            <figure className="plate"><Image src={PHOTO.pearl} alt="Pearl pendant on cream" width={800} height={800} /></figure>
            <Link to="/shop" className="collection-link">
              <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="17" cy="17" r="16" />
                <path d="M17 8c1 6 3 8 9 9-6 1-8 3-9 9-1-6-3-8-9-9 6-1 8-3 9-9z" />
              </svg>
              <span>The collection</span>
              <Arrow />
            </Link>
          </div>
        </section>

        <section id="about" className="feature about reverse" aria-labelledby="about-h">
          <figure className="plate"><Image src={PHOTO.cluster} alt="Cluster necklace of bright stones" width={800} height={800} /></figure>
          <div className="text">
            <h2 id="about-h">About Us</h2>
            <span className="bar" />
            <p>Primalora exists for those who see beauty in the details — for those who value craftsmanship, meaning and lasting elegance.</p>
          </div>
        </section>

        <section id="faqs" className="block faqs" aria-labelledby="faqs-h">
          <div className="text">
            <h2 id="faqs-h">FAQs</h2>
            <span className="bar" />
            <p>Find answers to common questions about our collections, materials, care and more.</p>
          </div>
          <div className="faq-list">
            <details>
              <summary>Where can I browse the collection?</summary>
              <p>Every Primalora piece is presented in the <Link to="/shop">Shop</Link>.</p>
            </details>
            <details>
              <summary>How do I ask about a piece?</summary>
              <p>Write to us through the Contacts section — we're glad to help with questions about collections, materials and care.</p>
            </details>
            <a href="#contacts" className="arrow-link" aria-label="Go to Contacts"><Arrow /></a>
          </div>
        </section>

        <section id="contacts" className="feature contacts" aria-labelledby="contacts-h">
          <figure className="plate"><Image src={PHOTO.noir} alt="Dark-stone halo pendant" width={800} height={800} /></figure>
          <div className="text">
            <h2 id="contacts-h">Contacts</h2>
            <span className="bar" />
            <p>We'd love to hear from you. Reach out with any questions, ideas or feedback.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
