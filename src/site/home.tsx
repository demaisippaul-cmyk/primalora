import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Image } from "../image";
import { Arrow, Footer, Header } from "./chrome";
import { startJewelryScene } from "./scene";

export const PHOTO = {
  model: "/generated-assets/aaeb8e1363e2859a4ace5c4fbecfae488dcfdf39dca9d26760ebaa9663158b77.webp",
  noir: "/generated-assets/90ec59a7f8a7bb2845a5b1ac31b835f224ea6f023eeb1da761eb58e9a851703f.webp",
  cluster: "/generated-assets/8bd64f6fb50ba71030d23b9d50bd56e53defbe22c041d1365d3eb99b222e693e.webp",
  pearl: "/generated-assets/ba99222b817e3568030ff5cbe707afe7f1a3eeb9c82915c35bb6aadab2d286bb.webp",
};

const IMG = {
  hero: "/generated-assets/07fb211cd478fffac2c0fdd58dedbb60b53f43227c169e857cbde3eb57617c55.webp",
  ring: "/generated-assets/6334e44499ddd8e26c71c0cfedfa92b062a8eccba549a4fe35665b25175546b0.webp",
  clasp: "/generated-assets/aff89df15bebae265758bc8eb21ab4a0f22fd354bd4fe45fa92e93edf05b3c23.webp",
  earrings: "/generated-assets/608f93ec7f0c52c2a437bd8cd8caf1d507b02fb3908027f7dc44f61d3a52e323.webp",
  opal: "/generated-assets/55d8a2857cd17a318bb44011b4dce0467091a9dfaf93103c082632ccb4b79308.webp",
  pendant: "/generated-assets/fd67f125f1a034b497a73b23bf81b335e6ec1812fec3e187e4178d83fe1f5b04.webp",
  sculpt: "/generated-assets/ba5bb9604c83c40683de223d744916b003c6d378044e120ac7232300521e1e60.webp",
  pave: "/generated-assets/e317d831aa21e4d20049461e4da8ce13a2b5b4dc88da590ed63fc0eff750a68a.webp",
  dome: "/generated-assets/d76ea8b62f3b165365fa405bb64e9f91dea230229286b4a01d7c479167d12b7f.webp",
};

export function Home() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => (canvas.current ? startJewelryScene(canvas.current) : undefined), []);

  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <Image src={IMG.hero} alt="" width={1440} height={1080} className="hero-bg" />
          <figure className="hero-photo">
            <Image src={PHOTO.model} alt="Woman wearing a pearl drop earring and a pearl ring" width={1001} height={1001} priority sizes="(max-width: 900px) 100vw, 55vw" />
          </figure>
          <canvas ref={canvas} className="hero-scene" aria-label="Turning gold rings on a fine chain" role="img" />
          <div className="hero-copy">
            <h1 className="visually-hidden">Primalora fine jewelry</h1>
            <Link to="/shop" className="shop-button">Shop now</Link>
          </div>
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

        <section className="band craft" aria-labelledby="craft-h">
          <Image src={IMG.opal} alt="Opal held in a gold setting" width={1560} height={910} className="band-img" />
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
            <Image src={IMG.pendant} alt="Gold pendant on a stone block" width={1320} height={682} />
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

        <section id="about" className="block about" aria-labelledby="about-h">
          <div className="text">
            <h2 id="about-h">About Us</h2>
            <span className="bar" />
            <p>Primalora exists for those who see beauty in the details — for those who value craftsmanship, meaning and lasting elegance.</p>
          </div>
          <figure className="plate wide"><Image src={IMG.sculpt} alt="Sculptural gold ring resting on rock" width={1564} height={544} /></figure>
        </section>

        <section id="faqs" className="band faqs" aria-labelledby="faqs-h">
          <Image src={IMG.pave} alt="Interlocking gold rings with pavé stones" width={994} height={576} className="band-img left" />
          <div className="text">
            <h2 id="faqs-h">FAQs</h2>
            <span className="bar" />
            <p>Find answers to common questions about our collections, materials, care and more.</p>
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

        <section id="contacts" className="band contacts" aria-labelledby="contacts-h">
          <Image src={IMG.dome} alt="Polished gold dome ring on dark rock" width={1312} height={534} className="band-img" />
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
